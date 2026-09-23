import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifySessionCookie } from "@/lib/session";
import { validateOrigin } from "@/lib/csrf";
import { validateMediaBuffer, savePrivateMedia, deletePrivateMedia } from "@/lib/media";
import { serverLogger } from "@/lib/logger";

interface RouteParams {
  params: Promise<{ publicId: string }>;
}

export async function POST(req: NextRequest, { params }: RouteParams) {
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
  if (!experience) {
    return NextResponse.json({ error: "Experience not found" }, { status: 404 });
  }

  // 3. Creator Authorization via Session Cookie
  const auth = await verifySessionCookie(req, publicId, experience.editCredentialHash);
  if (!auth.authenticated) {
    serverLogger.warn("Media upload rejected: Unauthorized", { publicId });
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 4. Parse FormData
  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  const file = formData.get("file");
  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: "Missing or invalid file" }, { status: 400 });
  }

  const caption = (formData.get("caption") as string) || undefined;
  const altText = (formData.get("altText") as string) || undefined;
  const displayOrderStr = formData.get("displayOrder") as string;
  const displayOrder = displayOrderStr ? parseInt(displayOrderStr, 10) : 0;

  // 5. Read buffer and validate magic bytes and size
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const validation = validateMediaBuffer(buffer, file.type, file.name);
  if (!validation.valid || !validation.mediaType || !validation.detectedMime) {
    serverLogger.warn("Media file validation failed", {
      publicId,
      filename: file.name,
      reason: validation.error,
    });
    return NextResponse.json({ error: validation.error || "Invalid file" }, { status: 422 });
  }

  // 6. Save to private storage
  try {
    const saved = await savePrivateMedia(experience.id, buffer, {
      mediaType: validation.mediaType,
      filename: file.name,
      mimeType: validation.detectedMime,
      caption,
      altText,
      displayOrder: isNaN(displayOrder) ? 0 : displayOrder,
    });

    serverLogger.info("Media uploaded successfully", {
      publicId,
      mediaId: saved.id,
      mediaType: saved.mediaType,
    });

    return NextResponse.json(
      {
        success: true,
        media: {
          id: saved.id,
          mediaType: saved.mediaType,
          filename: saved.filename,
          mimeType: saved.mimeType,
          sizeBytes: saved.sizeBytes,
          caption: saved.caption,
          altText: saved.altText,
          displayOrder: saved.displayOrder,
          // Creator draft URL
          draftUrl: `/api/experiences/${publicId}/media/${saved.id}`,
          // Published recipient URL (active only after publishing)
          publishedUrl: `/api/media/${publicId}/${saved.id}`,
        },
      },
      { status: 201 }
    );
  } catch (err: any) {
    serverLogger.error("Failed to save media", { publicId, error: err.message });
    return NextResponse.json({ error: "Failed to process media file" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: RouteParams) {
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
  if (!experience) {
    return NextResponse.json({ error: "Experience not found" }, { status: 404 });
  }

  // 3. Creator Authorization
  const auth = await verifySessionCookie(req, publicId, experience.editCredentialHash);
  if (!auth.authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { mediaId } = body || {};
  if (!mediaId || typeof mediaId !== "string") {
    return NextResponse.json({ error: "mediaId is required" }, { status: 400 });
  }

  const deleted = await deletePrivateMedia(mediaId, experience.id);
  if (!deleted) {
    return NextResponse.json(
      { error: "Media not found or not owned by this experience" },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true });
}
