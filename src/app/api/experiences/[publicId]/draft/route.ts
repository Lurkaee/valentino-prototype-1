import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyEditCredential } from "@/lib/security";
import {
  getEditCredentialFromRequest,
  isSessionExpired,
  buildSetCookieHeader,
} from "@/lib/session";
import { validateOrigin, validateJsonContentType } from "@/lib/csrf";
import { rateLimiter, getAnonymizedKey } from "@/lib/rate-limiter";
import { getTemplateDefinition } from "@/templates/registry";
import { logger } from "@/lib/logger";

interface RouteParams {
  params: Promise<{ publicId: string }>;
}

export async function GET(req: NextRequest, { params }: RouteParams) {
  const { publicId } = await params;

  // 1. Rate limiting
  const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "127.0.0.1";
  const rateLimitKey = getAnonymizedKey("get-draft", `${clientIp}:${publicId}`);
  const limitResult = await rateLimiter.check(rateLimitKey, 120, 60 * 1000);

  if (!limitResult.allowed) {
    return NextResponse.json(
      { error: "Too many requests" },
      { status: 429, headers: { "Retry-After": limitResult.resetSeconds.toString(), "Cache-Control": "no-store" } }
    );
  }

  // 2. Fetch experience
  const experience = await db.experience.findUnique({
    where: { publicId },
  });

  if (!experience) {
    return NextResponse.json(
      { error: "Experience not found" },
      { status: 401, headers: { "Cache-Control": "no-store" } }
    );
  }

  // 3. Authenticate via cookie
  const token = getEditCredentialFromRequest(req, publicId);
  if (!token || !verifyEditCredential(token, experience.editCredentialHash)) {
    return NextResponse.json(
      { error: "Unauthorized: Invalid or missing edit token" },
      { status: 401, headers: { "Cache-Control": "no-store" } }
    );
  }

  // 4. Server-side 180-day absolute expiration check
  if (isSessionExpired(experience.editCredentialIssuedAt)) {
    return NextResponse.json(
      { error: "Session expired (180-day maximum lifetime reached)" },
      { status: 401, headers: { "Cache-Control": "no-store" } }
    );
  }

  let draftConfig: unknown = {};
  try {
    draftConfig = JSON.parse(experience.draftConfig);
  } catch {
    draftConfig = {};
  }

  return NextResponse.json(
    {
      publicId: experience.publicId,
      templateId: experience.templateId,
      templateVersion: experience.templateVersion,
      draftConfig,
      draftRevision: experience.draftRevision,
      status: experience.status,
      publishedAt: experience.publishedAt?.toISOString() || null,
      editCredentialIssuedAt: experience.editCredentialIssuedAt.toISOString(),
    },
    {
      headers: {
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff",
      },
    }
  );
}

export async function PUT(req: NextRequest, { params }: RouteParams) {
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

  // 2. Rate limiting (~60/min per experience)
  const rateLimitKey = getAnonymizedKey("save-draft", publicId);
  const limitResult = await rateLimiter.check(rateLimitKey, 60, 60 * 1000);

  if (!limitResult.allowed) {
    return NextResponse.json(
      { error: "Saving too rapidly. Please wait a moment." },
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

  // 5. Server-side 180-day absolute expiration check
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

  const { draftConfig, baseRevision } = body;
  if (typeof baseRevision !== "number") {
    return NextResponse.json(
      { error: "baseRevision number is required for optimistic concurrency" },
      { status: 400, headers: { "Cache-Control": "no-store" } }
    );
  }

  // 7. Optimistic concurrency check
  if (baseRevision !== experience.draftRevision) {
    logger.warn("Draft write conflict detected", {
      publicId,
      expected: baseRevision,
      actual: experience.draftRevision,
    });
    return NextResponse.json(
      {
        error: "Draft changed elsewhere",
        currentRevision: experience.draftRevision,
      },
      { status: 409, headers: { "Cache-Control": "no-store" } }
    );
  }

  // 8. Validate draftConfig against template's lenient draftSchema
  const template = getTemplateDefinition(experience.templateId, experience.templateVersion);
  if (!template) {
    return NextResponse.json({ error: "Template definition not found" }, { status: 400 });
  }

  const parseResult = template.draftSchema.safeParse(draftConfig);
  if (!parseResult.success) {
    return NextResponse.json(
      {
        error: "Draft validation failed",
        issues: parseResult.error.flatten(),
      },
      { status: 400, headers: { "Cache-Control": "no-store" } }
    );
  }

  // 9. Update draft in database
  const updatedExperience = await db.experience.update({
    where: { publicId, draftRevision: baseRevision },
    data: {
      draftConfig: JSON.stringify(parseResult.data),
      draftRevision: { increment: 1 },
    },
  });

  // 10. Re-issue sliding cookie (clamped to remaining absolute lifetime)
  const cookieData = buildSetCookieHeader(
    publicId,
    token,
    experience.editCredentialIssuedAt
  );

  const response = NextResponse.json(
    {
      success: true,
      draftRevision: updatedExperience.draftRevision,
      savedAt: new Date().toISOString(),
    },
    {
      headers: {
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff",
      },
    }
  );

  response.cookies.set(cookieData.name, cookieData.value, cookieData.options as any);

  return response;
}
