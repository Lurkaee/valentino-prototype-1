import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { ExperienceStatus } from "@prisma/client";
import { verifyEditCredential } from "@/lib/security";
import {
  getEditCredentialFromRequest,
  isSessionExpired,
} from "@/lib/session";
import { validateOrigin, validateJsonContentType } from "@/lib/csrf";
import { rateLimiter, getAnonymizedKey } from "@/lib/rate-limiter";
import { getTemplateDefinition } from "@/templates/registry";
import { logger } from "@/lib/logger";

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

  // 9. Normalize config and snapshot in transaction
  const normalizedConfig = template.normalizeConfig(strictResult.data);
  const now = new Date();

  await db.experience.update({
    where: { publicId, draftRevision: expectedRevision },
    data: {
      publishedConfig: JSON.stringify(normalizedConfig),
      publishedRevision: experience.draftRevision,
      publishedAt: now,
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
