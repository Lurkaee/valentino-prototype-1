import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { validateOrigin } from "@/lib/csrf";
import { serverLogger } from "@/lib/logger";
import { decryptSecretPayload } from "@/lib/security";

interface RouteParams {
  params: Promise<{ publicId: string }>;
}

export const dynamic = "force-dynamic";

/**
 * Public Secret Note Reveal Endpoint.
 * Serves secret note content only if the experience is PUBLISHED,
 * scheduled reveal has elapsed, and questionLock is NOT enabled.
 * If questionLock IS enabled, callers must use /secret/verify with the correct answer.
 */
export async function GET(req: NextRequest, { params }: RouteParams) {
  const { publicId } = await params;

  // 1. Origin verification
  const originCheck = validateOrigin(req);
  if (!originCheck.valid) {
    return NextResponse.json({ error: "Request origin not allowed" }, { status: 403 });
  }

  // 2. Lookup experience
  const experience = await db.experience.findUnique({
    where: { publicId },
  });
  if (!experience || experience.status !== "PUBLISHED" || !experience.publishedConfig) {
    return NextResponse.json({ error: "Experience not available" }, { status: 404 });
  }

  // 3. Scheduled Reveal check
  if (experience.scheduledUnlockAt) {
    const unlockTime = new Date(experience.scheduledUnlockAt).getTime();
    if (Date.now() < unlockTime) {
      return NextResponse.json(
        { error: "Experience is locked until scheduled reveal" },
        { status: 403 }
      );
    }
  }

  // 4. Parse published config
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

  // 5. Question Lock enforcement: if enabled or answerHash present, cannot reveal via plain GET
  if (secretConfig.questionLock?.enabled || secretConfig.answerHash) {
    return NextResponse.json(
      { error: "This secret note is protected by a secret question. Verification required." },
      { status: 403 }
    );
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

  if (!plainContent) {
    return NextResponse.json({ error: "No secret note available" }, { status: 404 });
  }

  serverLogger.info("Public secret note revealed", { publicId });

  return NextResponse.json({
    success: true,
    secretContent: plainContent,
    concealedSecret: plainContent,
  });
}
