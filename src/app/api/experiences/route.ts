import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { ExperienceStatus } from "@prisma/client";
import {
  generatePublicId,
  generateEditCredential,
  hashEditCredential,
} from "@/lib/security";
import { buildSetCookieHeader } from "@/lib/session";
import { validateOrigin } from "@/lib/csrf";
import { rateLimiter, getAnonymizedKey } from "@/lib/rate-limiter";
import { logger } from "@/lib/logger";
import { midnightRoseV1 } from "@/templates/registry";

export async function POST(request: NextRequest) {
  try {
    const originCheck = validateOrigin(request);
    if (!originCheck.valid) {
      logger.warn("Create experience rejected due to Origin check", {
        reason: originCheck.reason,
      });
      return NextResponse.json({ error: originCheck.reason }, { status: 403 });
    }

    const clientIp = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "127.0.0.1";
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
        status: ExperienceStatus.DRAFT,
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
