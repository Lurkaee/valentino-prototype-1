import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifySessionCookie } from "@/lib/session";
import { validateOrigin } from "@/lib/csrf";
import { serverLogger } from "@/lib/logger";

interface RouteParams {
  params: Promise<{ publicId: string }>;
}

const replyRateMap = new Map<string, { count: number; resetAt: number }>();
function isReplyRateLimited(key: string): boolean {
  const now = Date.now();
  const entry = replyRateMap.get(key);
  if (!entry || now > entry.resetAt) {
    replyRateMap.set(key, { count: 1, resetAt: now + 5 * 60000 }); // 5 minutes
    return false;
  }
  entry.count += 1;
  return entry.count > 3; // Max 3 replies per 5 min
}

export async function POST(req: NextRequest, { params }: RouteParams) {
  const { publicId } = await params;

  // 1. Origin verification
  const originCheck = validateOrigin(req);
  if (!originCheck.valid) {
    return NextResponse.json({ error: "Request origin not allowed" }, { status: 403 });
  }

  // 2. Rate limit
  const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (isReplyRateLimited(`${publicId}:${clientIp}`)) {
    return NextResponse.json(
      { error: "Too many replies submitted. Please wait a few minutes." },
      { status: 429 }
    );
  }

  // 3. Lookup experience
  const experience = await db.experience.findUnique({
    where: { publicId },
  });
  if (!experience || experience.status !== "PUBLISHED") {
    return NextResponse.json({ error: "Experience not available" }, { status: 404 });
  }

  // 4. Parse body
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const content = typeof body?.content === "string" ? body.content : (typeof body?.message === "string" ? body.message : "");
  const senderName = typeof body?.senderName === "string" ? body.senderName : (typeof body?.authorName === "string" ? body.authorName : null);

  if (!content || content.trim().length === 0) {
    return NextResponse.json({ error: "Reply content cannot be empty" }, { status: 400 });
  }

  const cleanContent = content.slice(0, 1000).trim();
  const cleanSender = senderName ? senderName.slice(0, 60).trim() : null;

  try {
    const saved = await db.experienceReply.create({
      data: {
        experienceId: experience.id,
        content: cleanContent,
        senderName: cleanSender,
      },
    });

    serverLogger.info("Recipient reply recorded", { publicId });
    return NextResponse.json({ success: true, id: saved.id }, { status: 201 });
  } catch (err: any) {
    serverLogger.error("Failed to save reply", { publicId, error: err.message });
    return NextResponse.json({ error: "Failed to submit reply" }, { status: 500 });
  }
}

export async function GET(req: NextRequest, { params }: RouteParams) {
  const { publicId } = await params;

  // 1. Lookup experience
  const experience = await db.experience.findUnique({
    where: { publicId },
  });
  if (!experience) {
    return NextResponse.json({ error: "Experience not found" }, { status: 404 });
  }

  // 2. Creator Authorization: ONLY creator can view replies
  const auth = await verifySessionCookie(req, publicId, experience.editCredentialHash);
  if (!auth.authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const replies = await db.experienceReply.findMany({
    where: { experienceId: experience.id },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return NextResponse.json({
    replies: replies.map((r) => ({
      id: r.id,
      content: r.content,
      message: r.content,
      senderName: r.senderName,
      authorName: r.senderName,
      createdAt: r.createdAt.toISOString(),
    })),
  });
}
