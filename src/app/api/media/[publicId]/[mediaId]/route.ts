import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import { db } from "@/lib/db";
import { getPrivateMediaFilePath } from "@/lib/media";
import { mediaStorage } from "@/lib/storage";

interface RouteParams {
  params: Promise<{ publicId: string; mediaId: string }>;
}

export async function GET(req: NextRequest, { params }: RouteParams) {
  const { publicId, mediaId } = await params;

  // 1. Lookup experience
  const experience = await db.experience.findUnique({
    where: { publicId },
  });
  if (!experience) {
    return new NextResponse("Not Found", { status: 404 });
  }

  // 2. Access boundary: MUST be published
  if (experience.status !== "PUBLISHED") {
    return new NextResponse("Forbidden: Experience is not published", { status: 403 });
  }

  // 3. Scheduled Reveal boundary: MUST be unlocked if scheduled
  if (experience.scheduledUnlockAt) {
    const unlockTime = new Date(experience.scheduledUnlockAt).getTime();
    if (Date.now() < unlockTime) {
      return new NextResponse("Forbidden: Experience is locked until scheduled reveal", {
        status: 403,
      });
    }
  }

  // 4. Lookup media: MUST belong to experience and be marked PUBLISHED
  const media = await db.experienceMedia.findFirst({
    where: {
      id: mediaId,
      experienceId: experience.id,
      status: "PUBLISHED",
    },
  });
  if (!media) {
    return new NextResponse("Not Found or Private", { status: 404 });
  }

  // 5. Read from storage service adapter
  const localPath = mediaStorage.getFilePath(media.storageKey);
  if (localPath && fs.existsSync(localPath)) {
    const fileStream = fs.createReadStream(localPath);
    const stream = new ReadableStream({
      start(controller) {
        fileStream.on("data", (chunk) => controller.enqueue(chunk));
        fileStream.on("end", () => controller.close());
        fileStream.on("error", (err) => controller.error(err));
      },
    });

    return new NextResponse(stream as any, {
      status: 200,
      headers: {
        "Content-Type": media.mimeType,
        "Content-Length": media.sizeBytes.toString(),
        "X-Content-Type-Options": "nosniff",
        "Cache-Control": "public, max-age=86400, immutable",
      },
    });
  }

  // Fallback to memory or custom storage adapter read
  const buffer = await mediaStorage.read(media.storageKey);
  if (!buffer) {
    return new NextResponse("File missing", { status: 404 });
  }

  return new NextResponse(new Uint8Array(buffer), {
    status: 200,
    headers: {
      "Content-Type": media.mimeType,
      "Content-Length": buffer.length.toString(),
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": "public, max-age=86400, immutable",
    },
  });
}
