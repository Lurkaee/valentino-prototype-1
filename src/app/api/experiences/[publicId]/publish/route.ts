import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { ExperienceStatus } from "@prisma/client";
import { verifyEditCredential, encryptSecretPayload } from "@/lib/security";
import {
  getEditCredentialFromRequest,
  isSessionExpired,
} from "@/lib/session";
import { validateOrigin, validateJsonContentType } from "@/lib/csrf";
import { rateLimiter, getAnonymizedKey } from "@/lib/rate-limiter";
import { getTemplateDefinition } from "@/templates/registry";
import { logger } from "@/lib/logger";
import { snapshotPublishedMedia } from "@/lib/media";

export const dynamic = "force-dynamic";

interface RouteParams {
  params: Promise<{ publicId: string }>;
}

export async function POST(req: NextRequest, { params }: RouteParams) {
  const { publicId } = await params;

  // 1. CSRF Origin validation
  const originCheck = validateOrigin(req);
  if (!originCheck.valid) {
    return NextResponse.json({ error: originCheck.reason }, { status: 403, headers: { "Cache-Control": "no-store" } });
  }

  const jsonCheck = validateJsonContentType(req);
  if (!jsonCheck.valid) {
    return NextResponse.json({ error: jsonCheck.reason }, { status: 400, headers: { "Cache-Control": "no-store" } });
  }

  // 2. Rate limiting (~10/min per experience)
  const rateLimitKey = getAnonymizedKey("publish-exp", publicId);
  const limitResult = await rateLimiter.check(rateLimitKey, 10, 60 * 1000);

  if (!limitResult.allowed) {
    return NextResponse.json(
      { error: "Too many publish requests. Please wait a moment." },
      { status: 429, headers: { "Retry-After": limitResult.resetSeconds.toString(), "Cache-Control": "no-store" } }
    );
  }

  // 3. Find experience
  const experience = await db.experience.findUnique({
    where: { publicId },
  });

  if (!experience) {
    return NextResponse.json(
      { error: "Experience not found" },
      { status: 401, headers: { "Cache-Control": "no-store" } }
    );
  }

  // 4. Authenticate via cookie
  const token = getEditCredentialFromRequest(req, publicId);
  if (!token || !verifyEditCredential(token, experience.editCredentialHash)) {
    return NextResponse.json(
      { error: "Unauthorized: Invalid or missing edit token" },
      { status: 401, headers: { "Cache-Control": "no-store" } }
    );
  }

  // 5. Server-side 180-day absolute cutoff check
  if (isSessionExpired(experience.editCredentialIssuedAt)) {
    return NextResponse.json(
      { error: "Session expired (180-day maximum lifetime reached)" },
      { status: 401, headers: { "Cache-Control": "no-store" } }
    );
  }

  // 6. Parse and validate body
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { expectedRevision } = body;
  if (typeof expectedRevision !== "number") {
    return NextResponse.json(
      { error: "expectedRevision is required for publish" },
      { status: 400, headers: { "Cache-Control": "no-store" } }
    );
  }

  // 7. Check revision consistency
  if (expectedRevision !== experience.draftRevision) {
    return NextResponse.json(
      {
        error: "Draft changed, review and publish again",
        currentRevision: experience.draftRevision,
      },
      { status: 409, headers: { "Cache-Control": "no-store" } }
    );
  }

  // 8. Template lookup & Strict publish validation
  const template = getTemplateDefinition(experience.templateId, experience.templateVersion);
  if (!template) {
    return NextResponse.json({ error: "Template not found" }, { status: 400 });
  }

  let draftConfig: unknown = {};
  try {
    draftConfig = JSON.parse(experience.draftConfig);
  } catch {
    draftConfig = {};
  }

  const strictResult = template.publishSchema.safeParse(draftConfig);
  if (!strictResult.success) {
    return NextResponse.json(
      {
        error: "Cannot publish incomplete draft",
        validationErrors: strictResult.error.flatten(),
      },
      { status: 422, headers: { "Cache-Control": "no-store" } }
    );
  }

  // 9. Extract referenced media IDs for stable snapshotting
  const referencedMediaIds: string[] = [];
  const rawDraft = draftConfig as any;

  function extractMediaId(val: unknown): string | null {
    if (typeof val !== "string" || !val) return null;
    const match = val.match(/\/media\/([a-zA-Z0-9_-]+)$/);
    if (match) return match[1];
    if (!val.startsWith("http") && !val.startsWith("/")) return val;
    return null;
  }

  function toPublicMediaUrl(val: string | null | undefined): string | null | undefined {
    if (!val || typeof val !== "string") return val;
    const mId = extractMediaId(val);
    if (mId) return `/api/media/${publicId}/${mId}`;
    return val;
  }

  if (rawDraft?.heroMediaId) {
    const id = extractMediaId(rawDraft.heroMediaId);
    if (id) referencedMediaIds.push(id);
  }

  const draftModules = rawDraft?.modules;
  if (draftModules && typeof draftModules === "object") {
    if (Array.isArray(draftModules.memories?.items)) {
      for (const item of draftModules.memories.items) {
        const id = item?.mediaId || extractMediaId(item?.url);
        if (id) referencedMediaIds.push(id);
      }
    }
    if (draftModules.voiceNote) {
      const id = draftModules.voiceNote.mediaId || extractMediaId(draftModules.voiceNote.url);
      if (id) referencedMediaIds.push(id);
    }
    if (draftModules.videoMemory) {
      const id = draftModules.videoMemory.mediaId || extractMediaId(draftModules.videoMemory.url);
      if (id) referencedMediaIds.push(id);
    }
  }

  if (rawDraft?.soundtrackUrl) {
    const id = extractMediaId(rawDraft.soundtrackUrl);
    if (id) referencedMediaIds.push(id);
  }

  // 10. Extract server-side scheduled unlock
  let scheduledUnlockDate: Date | null = null;
  const rawScheduled = rawDraft?.delivery?.scheduledUnlockAt || rawDraft?.scheduledUnlockAt;
  if (rawScheduled) {
    const parsed = new Date(rawScheduled);
    if (!isNaN(parsed.getTime())) {
      scheduledUnlockDate = parsed;
    }
  }

  // 11. Normalize config and snapshot in transaction
  const normalizedConfig = template.normalizeConfig(strictResult.data) as any;

  if (normalizedConfig?.heroMediaId) {
    normalizedConfig.heroMediaId = toPublicMediaUrl(normalizedConfig.heroMediaId);
  }
  if (normalizedConfig?.soundtrackUrl) {
    normalizedConfig.soundtrackUrl = toPublicMediaUrl(normalizedConfig.soundtrackUrl);
  }
  if (normalizedConfig?.modules) {
    if (Array.isArray(normalizedConfig.modules.memories?.items)) {
      normalizedConfig.modules.memories.items = normalizedConfig.modules.memories.items.map((item: any) => ({
        ...item,
        url: toPublicMediaUrl(item.url),
      }));
    }
    if (normalizedConfig.modules.voiceNote?.url) {
      normalizedConfig.modules.voiceNote.url = toPublicMediaUrl(normalizedConfig.modules.voiceNote.url);
    }
    if (normalizedConfig.modules.videoMemory?.url) {
      normalizedConfig.modules.videoMemory.url = toPublicMediaUrl(normalizedConfig.modules.videoMemory.url);
    }
  }

  // Handle Secret Module & Question Lock cryptographically: salt + sha256 + AES-256-GCM
  if (normalizedConfig?.modules?.secret) {
    const rawSecret = rawDraft?.modules?.secret;
    if (rawSecret && rawSecret.enabled) {
      const question = (rawSecret.question || rawSecret.questionLock?.question || "").trim();
      const rawAnswer = (rawSecret.answer || rawSecret.questionLock?.answer || "").trim();
      const plainSecret = (rawSecret.concealedSecret || rawSecret.secretContent || "").trim();

      normalizedConfig.modules.secret.enabled = true;
      if (rawSecret.prompt) {
        normalizedConfig.modules.secret.prompt = rawSecret.prompt.trim();
      }

      if (question && rawAnswer) {
        const salt = crypto.randomBytes(16).toString("hex");
        const answerHash = crypto
          .createHash("sha256")
          .update(salt + rawAnswer.toLowerCase())
          .digest("hex");

        normalizedConfig.modules.secret.question = question;
        normalizedConfig.modules.secret.salt = salt;
        normalizedConfig.modules.secret.answerHash = answerHash;
        normalizedConfig.modules.secret.questionLock = {
          enabled: true,
          question,
          answerHash,
          answerSalt: salt,
        };
      }

      if (plainSecret) {
        normalizedConfig.modules.secret.encryptedSecret = encryptSecretPayload(plainSecret);
      }

      // Security: ensure raw answer and plain-text secret are completely removed from publishedConfig
      delete normalizedConfig.modules.secret.answer;
      delete normalizedConfig.modules.secret.concealedSecret;
      delete normalizedConfig.modules.secret.secretContent;
      if (normalizedConfig.modules.secret.questionLock) {
        delete normalizedConfig.modules.secret.questionLock.answer;
      }
    }
  }

  // Snapshot media records to PUBLISHED status
  await snapshotPublishedMedia(experience.id, referencedMediaIds);

  const now = new Date();

  await db.experience.update({
    where: { publicId, draftRevision: expectedRevision },
    data: {
      publishedConfig: JSON.stringify(normalizedConfig),
      publishedRevision: experience.draftRevision,
      publishedAt: now,
      scheduledUnlockAt: scheduledUnlockDate,
      status: ExperienceStatus.PUBLISHED,
    },
  });

  const appUrl = process.env.APP_URL || "http://localhost:3000";
  const publicUrl = `${appUrl}/v/${publicId}`;

  logger.info("Experience published successfully", { publicId });

  return NextResponse.json(
    {
      success: true,
      publicUrl,
      publishedAt: now.toISOString(),
      publishedRevision: experience.draftRevision,
    },
    {
      headers: {
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff",
      },
    }
  );
}
