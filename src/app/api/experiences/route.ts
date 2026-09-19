import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import {
  generatePublicId,
  generateEditCredential,
  hashEditCredential,
} from "@/lib/security";
import { buildSetCookieHeader } from "@/lib/session";
import { validateOrigin } from "@/lib/csrf";
import { rateLimiter, getAnonymizedKey } from "@/lib/rate-limiter";
import { midnightRoseV1 } from "@/templates/registry";
import { logger } from "@/lib/logger";

export async function POST(req: NextRequest) {
  // 1. CSRF Origin validation
  const originCheck = validateOrigin(req);
  if (!originCheck.valid) {
    logger.warn("Create experience rejected due to Origin check", { reason: originCheck.reason });
    return NextResponse.json({ error: originCheck.reason }, { status: 403 });
  }

  // 2. Rate limiting (~10/hour per IP)
  const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "127.0.0.1";
  const rateLimitKey = getAnonymizedKey("create-exp", clientIp);
  const limitResult = await rateLimiter.check(rateLimitKey, 10, 60 * 60 * 1000);

  if (!limitResult.allowed) {
    return NextResponse.json(
      { error: "Too many experiences created. Please try again later." },
      {
        status: 429,
        headers: {
          "Retry-After": limitResult.resetSeconds.toString(),
          "Cache-Control": "no-store",
        },
      }
    );
  }

  try {
    const publicId = generatePublicId();
    const rawCredential = generateEditCredential();
    const credentialHash = hashEditCredential(rawCredential);
    const issuedAt = new Date();

    const defaultConfigJson = JSON.stringify(midnightRoseV1.defaultConfig);

    await db.experience.create({
      data: {
        publicId,
        editCredentialHash: credentialHash,
        editCredentialVersion: 1,
        editCredentialIssuedAt: issuedAt,
        templateId: midnightRoseV1.id,
        templateVersion: midnightRoseV1.version,
        draftConfig: defaultConfigJson,
        draftRevision: 1,
        status: "DRAFT",
      },
    });

    const cookieData = buildSetCookieHeader(publicId, rawCredential, issuedAt);

    const response = NextResponse.json(
      { publicId },
      {
        status: 201,
        headers: {
          "Cache-Control": "no-store",
          "X-Content-Type-Options": "nosniff",
        },
      }
    );

    response.cookies.set(cookieData.name, cookieData.value, cookieData.options as any);

    logger.info("Created experience successfully", { publicId });
    return response;
  } catch (error) {
    logger.error("Failed to create experience", { error: String(error) });
    return NextResponse.json(
      { error: "Failed to create experience" },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }
}
