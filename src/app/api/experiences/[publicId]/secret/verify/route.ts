import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { db } from "@/lib/db";
import { validateOrigin } from "@/lib/csrf";
import { serverLogger } from "@/lib/logger";
import { decryptSecretPayload } from "@/lib/security";

interface RouteParams {
  params: Promise<{ publicId: string }>;
}

// In-memory rate limiting map: ip -> { count: number, resetAt: number }
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 60 * 1000; // 1 minute

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(key);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_ATTEMPTS;
}

export async function POST(req: NextRequest, { params }: RouteParams) {
  const { publicId } = await params;

  // 1. Origin verification
  const originCheck = validateOrigin(req);
  if (!originCheck.valid) {
    return NextResponse.json({ error: "Request origin not allowed" }, { status: 403 });
  }

  // 2. Client IP rate limit
  const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const rateLimitKey = `${publicId}:${clientIp}`;
  if (isRateLimited(rateLimitKey)) {
    serverLogger.warn("Secret verification rate-limited", { publicId, clientIp });
    return NextResponse.json(
      { error: "Too many attempts. Please wait a minute before trying again." },
      { status: 429 }
    );
  }

  // 3. Lookup experience
  const experience = await db.experience.findUnique({
    where: { publicId },
  });
  if (!experience || experience.status !== "PUBLISHED" || !experience.publishedConfig) {
    return NextResponse.json({ error: "Experience not available" }, { status: 404 });
  }

  // 4. Scheduled Reveal check
  if (experience.scheduledUnlockAt) {
    const unlockTime = new Date(experience.scheduledUnlockAt).getTime();
    if (Date.now() < unlockTime) {
      return NextResponse.json(
        { error: "Experience is locked until scheduled reveal" },
        { status: 403 }
      );
    }
  }

  // 5. Parse published config
  let config: any;
  try {
    config = JSON.parse(experience.publishedConfig);
  } catch {
    return NextResponse.json({ error: "Invalid experience data" }, { status: 500 });
  }

  const secretConfig = config.modules?.secret;
  if (!secretConfig || !secretConfig.enabled) {
    return NextResponse.json({ error: "No secret note available" }, { status: 404 });
  }

  let plainContent = "";
  if (secretConfig.encryptedSecret) {
    try {
      plainContent = decryptSecretPayload(secretConfig.encryptedSecret);
    } catch {
      plainContent = "";
    }
  } else if (secretConfig.secretContent) {
    plainContent = secretConfig.secretContent;
  } else if (secretConfig.concealedSecret) {
    plainContent = secretConfig.concealedSecret;
  }

  const salt = secretConfig.salt || secretConfig.questionLock?.answerSalt || "";
  const expectedHash = secretConfig.answerHash || secretConfig.questionLock?.answerHash || "";

  // If no question lock enabled, return secret directly
  if (!expectedHash) {
    return NextResponse.json({
      success: true,
      concealedSecret: plainContent,
      secretContent: plainContent,
    });
  }

  // Parse candidate answer
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request payload" }, { status: 400 });
  }

  const candidate = typeof body?.answer === "string" ? body.answer.trim().toLowerCase() : "";
  if (!candidate) {
    return NextResponse.json({ error: "Answer is required" }, { status: 400 });
  }

  const computedHash = crypto
    .createHash("sha256")
    .update(salt + candidate)
    .digest("hex");

  // Constant-time comparison to prevent timing attacks
  const computedBuf = Buffer.from(computedHash, "hex");
  const expectedBuf = Buffer.from(expectedHash, "hex");

  let isMatch = false;
  if (computedBuf.length === expectedBuf.length && computedBuf.length > 0) {
    isMatch = crypto.timingSafeEqual(computedBuf, expectedBuf);
  }

  if (!isMatch) {
    return NextResponse.json({ success: false, error: "Incorrect answer" }, { status: 401 });
  }

  serverLogger.info("Secret note unlocked via Question Lock", { publicId });
  return NextResponse.json({
    success: true,
    concealedSecret: plainContent,
    secretContent: plainContent,
  });
}
