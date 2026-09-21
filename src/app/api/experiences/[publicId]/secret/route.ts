import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { ExperienceStatus } from "@prisma/client";
import { rateLimiter, getAnonymizedKey } from "@/lib/rate-limiter";

export const dynamic = "force-dynamic";

interface RouteParams {
  params: Promise<{ publicId: string }>;
}

export async function GET(req: NextRequest, { params }: RouteParams) {
  const { publicId } = await params;

  // 1. Rate limiting (max 60 requests per minute per IP/experience)
  const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "127.0.0.1";
  const rateLimitKey = getAnonymizedKey("secret-reveal", `${clientIp}:${publicId}`);
  const limitResult = await rateLimiter.check(rateLimitKey, 60, 60 * 1000);

  if (!limitResult.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a moment." },
      { status: 429, headers: { "Retry-After": limitResult.resetSeconds.toString(), "Cache-Control": "no-store" } }
    );
  }

  // 2. Fetch experience
  const experience = await db.experience.findUnique({
    where: { publicId },
    select: {
      status: true,
      publishedConfig: true,
    },
  });

  if (!experience) {
    return NextResponse.json({ error: "Experience not found" }, { status: 404 });
  }

  // 3. Only published experiences can reveal public secret
  if (experience.status !== ExperienceStatus.PUBLISHED || !experience.publishedConfig) {
    return NextResponse.json({ error: "Experience not published" }, { status: 403 });
  }

  try {
    const config = JSON.parse(experience.publishedConfig);
    const secretConfig = config?.modules?.secret;

    if (!secretConfig || !secretConfig.enabled) {
      return NextResponse.json({ error: "Secret module not enabled" }, { status: 404 });
    }

    const rawContent = typeof secretConfig.secretContent === "string" ? secretConfig.secretContent : "";

    return NextResponse.json(
      {
        secretContent: rawContent,
      },
      {
        headers: {
          "Cache-Control": "no-store",
          "X-Content-Type-Options": "nosniff",
        },
      }
    );
  } catch {
    return NextResponse.json({ error: "Failed to parse secret content" }, { status: 500 });
  }
}
