import fs from "fs";
import path from "path";
import crypto from "crypto";
import { db } from "@/lib/db";
import { MediaType, MediaStatus, ExperienceMedia } from "@prisma/client";

// Private storage directory outside public/
export const PRIVATE_MEDIA_DIR =
  process.env.MEDIA_STORAGE_DIR || path.join(process.cwd(), "storage", "media");

export const MAX_PHOTO_SIZE = 5 * 1024 * 1024;   // 5 MB
export const MAX_AUDIO_SIZE = 10 * 1024 * 1024;  // 10 MB
export const MAX_VIDEO_SIZE = 25 * 1024 * 1024;  // 25 MB

export const MAX_SIZES: Record<MediaType, number> = {
  PHOTO: MAX_PHOTO_SIZE,
  AUDIO: MAX_AUDIO_SIZE,
  VIDEO: MAX_VIDEO_SIZE,
};

export type AllowedMediaType = "photo" | "audio" | "video";

export function ensureStorageDir(): void {
  if (!fs.existsSync(PRIVATE_MEDIA_DIR)) {
    fs.mkdirSync(PRIVATE_MEDIA_DIR, { recursive: true, mode: 0o700 });
  }
}

export function getMediaDiskPath(mediaIdOrKey: string, ext: string = ""): string {
  // Prevent path traversal
  const safeBase = path.basename(mediaIdOrKey).replace(/[^a-zA-Z0-9_-]/g, "");
  const safeExt = ext ? (ext.startsWith(".") ? ext : `.${ext}`) : "";
  return path.join(PRIVATE_MEDIA_DIR, `${safeBase}${safeExt}`);
}

export interface MediaValidationResult {
  valid: boolean;
  mediaType?: MediaType;
  detectedMime?: string;
  mimeType?: string;
  extension?: string;
  error?: string;
}

/**
 * Validates buffer using magic numbers and strict size ceilings.
 * Rejects disguised files, executable formats, and scriptable SVGs.
 */
export function validateMediaBuffer(
  buffer: Buffer,
  declaredMimeType: string = "",
  filename: string = ""
): MediaValidationResult {
  if (!buffer || buffer.length === 0) {
    return { valid: false, error: "Empty file payload" };
  }

  const ext = filename ? path.extname(filename).toLowerCase() : "";

  // Explicitly reject executable or scriptable extensions
  const forbiddenExts = [
    ".svg", ".html", ".htm", ".xhtml", ".xml", ".js", ".mjs", ".ts",
    ".php", ".phtml", ".exe", ".sh", ".bat", ".cmd", ".ps1", ".vbs",
    ".py", ".rb", ".jar", ".wasm", ".dll", ".so",
  ];
  if (forbiddenExts.includes(ext)) {
    return { valid: false, error: `File type ${ext} is not allowed` };
  }

  let detectedType: MediaType | null = null;
  let detectedMime: string | null = null;

  // 1. JPEG: FF D8 FF
  if (
    buffer.length >= 3 &&
    buffer[0] === 0xff &&
    buffer[1] === 0xd8 &&
    buffer[2] === 0xff
  ) {
    if (buffer.length > MAX_SIZES.PHOTO) {
      return { valid: false, error: `Photo exceeds maximum size of 5MB` };
    }
    detectedType = "PHOTO";
    detectedMime = "image/jpeg";
  }

  // 2. PNG: 89 50 4E 47 0D 0A 1A 0A
  else if (
    buffer.length >= 8 &&
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47 &&
    buffer[4] === 0x0d &&
    buffer[5] === 0x0a &&
    buffer[6] === 0x1a &&
    buffer[7] === 0x0a
  ) {
    if (buffer.length > MAX_SIZES.PHOTO) {
      return { valid: false, error: `Photo exceeds maximum size of 5MB` };
    }
    detectedType = "PHOTO";
    detectedMime = "image/png";
  }

  // 3. WEBP: RIFF....WEBP
  else if (
    buffer.length >= 12 &&
    buffer.toString("ascii", 0, 4) === "RIFF" &&
    buffer.toString("ascii", 8, 12) === "WEBP"
  ) {
    if (buffer.length > MAX_SIZES.PHOTO) {
      return { valid: false, error: `Photo exceeds maximum size of 5MB` };
    }
    detectedType = "PHOTO";
    detectedMime = "image/webp";
  }

  // 4. MP3: ID3 or FF FB/F3/F2
  else if (
    (buffer.length >= 3 && buffer.toString("ascii", 0, 3) === "ID3") ||
    (buffer.length >= 2 &&
      buffer[0] === 0xff &&
      (buffer[1] & 0xe0) === 0xe0)
  ) {
    if (buffer.length > MAX_SIZES.AUDIO) {
      return { valid: false, error: `Audio exceeds maximum size of 10MB` };
    }
    detectedType = "AUDIO";
    detectedMime = "audio/mpeg";
  }

  // 5. WAV: RIFF....WAVE
  else if (
    buffer.length >= 12 &&
    buffer.toString("ascii", 0, 4) === "RIFF" &&
    buffer.toString("ascii", 8, 12) === "WAVE"
  ) {
    if (buffer.length > MAX_SIZES.AUDIO) {
      return { valid: false, error: `Audio exceeds maximum size of 10MB` };
    }
    detectedType = "AUDIO";
    detectedMime = "audio/wav";
  }

  // 6. OGG: OggS
  else if (buffer.length >= 4 && buffer.toString("ascii", 0, 4) === "OggS") {
    if (buffer.length > MAX_SIZES.AUDIO) {
      return { valid: false, error: `Audio exceeds maximum size of 10MB` };
    }
    detectedType = "AUDIO";
    detectedMime = "audio/ogg";
  }

  // 7. MP4 / M4A: ....ftyp
  else if (
    buffer.length >= 12 &&
    buffer.toString("ascii", 4, 8) === "ftyp"
  ) {
    const brand = buffer.toString("ascii", 8, 12).toLowerCase();
    const isAudio = brand.includes("m4a");
    const mediaType: MediaType = isAudio ? "AUDIO" : "VIDEO";
    const maxSize = isAudio ? MAX_SIZES.AUDIO : MAX_SIZES.VIDEO;

    if (buffer.length > maxSize) {
      return {
        valid: false,
        error: `${mediaType === "AUDIO" ? "Audio" : "Video"} exceeds maximum allowed size`,
      };
    }
    detectedType = mediaType;
    detectedMime = isAudio ? "audio/mp4" : "video/mp4";
  }

  // 8. WEBM: 1A 45 DF A3 (Matroska / WebM)
  else if (
    buffer.length >= 4 &&
    buffer[0] === 0x1a &&
    buffer[1] === 0x45 &&
    buffer[2] === 0xdf &&
    buffer[3] === 0xa3
  ) {
    const isAudio = declaredMimeType.includes("audio") || ext === ".weba";
    const mediaType: MediaType = isAudio ? "AUDIO" : "VIDEO";
    const maxSize = isAudio ? MAX_SIZES.AUDIO : MAX_SIZES.VIDEO;

    if (buffer.length > maxSize) {
      return {
        valid: false,
        error: `${mediaType === "AUDIO" ? "Audio" : "Video"} exceeds maximum allowed size`,
      };
    }
    detectedType = mediaType;
    detectedMime = isAudio ? "audio/webm" : "video/webm";
  }

  if (!detectedType || !detectedMime) {
    return {
      valid: false,
      error: "Unsupported file signature or unrecognized media format",
    };
  }

  // Category mismatch check if declared is simple type
  const lowerDeclared = declaredMimeType.toLowerCase();
  if (
    (lowerDeclared === "photo" && detectedType !== "PHOTO") ||
    (lowerDeclared === "audio" && detectedType !== "AUDIO") ||
    (lowerDeclared === "video" && detectedType !== "VIDEO")
  ) {
    return {
      valid: false,
      error: "Magic bytes do not match expected category",
    };
  }

  return {
    valid: true,
    mediaType: detectedType,
    detectedMime,
    mimeType: detectedMime,
    extension: getSafeExtension(detectedMime),
  };
}

/**
 * Saves media file to private disk and registers in DB.
 */
export async function savePrivateMedia(
  experienceId: string,
  buffer: Buffer,
  meta: {
    mediaType: MediaType;
    filename: string;
    mimeType: string;
    caption?: string;
    altText?: string;
    displayOrder?: number;
  }
): Promise<ExperienceMedia> {
  ensureStorageDir();

  const highEntropySuffix = crypto.randomBytes(18).toString("hex");
  const safeExt = getSafeExtension(meta.mimeType);
  const storageKey = `${meta.mediaType.toLowerCase()}_${Date.now()}_${highEntropySuffix}${safeExt}`;
  const filePath = path.join(PRIVATE_MEDIA_DIR, storageKey);

  await fs.promises.writeFile(filePath, buffer, { mode: 0o600 });

  const record = await db.experienceMedia.create({
    data: {
      experienceId,
      mediaType: meta.mediaType,
      filename: path.basename(meta.filename).slice(0, 100),
      storageKey,
      mimeType: meta.mimeType,
      sizeBytes: buffer.length,
      caption: meta.caption?.slice(0, 500) || null,
      altText: meta.altText?.slice(0, 200) || null,
      displayOrder: meta.displayOrder ?? 0,
      status: "DRAFT",
    },
  });

  return record;
}

export function getPrivateMediaFilePath(storageKey: string): string {
  // Prevent any directory traversal attacks
  const safeKey = path.basename(storageKey);
  return path.join(PRIVATE_MEDIA_DIR, safeKey);
}

/**
 * Validates whether an authenticated experience owns a given media ID.
 */
export async function verifyMediaOwnership(
  mediaId: string,
  experienceId: string
): Promise<ExperienceMedia | null> {
  const media = await db.experienceMedia.findFirst({
    where: {
      id: mediaId,
      experienceId,
      status: { not: "DELETED" },
    },
  });
  return media;
}

/**
 * Soft-deletes a media record and marks file as DELETED.
 */
export async function deletePrivateMedia(
  mediaId: string,
  experienceId: string
): Promise<boolean> {
  const media = await verifyMediaOwnership(mediaId, experienceId);
  if (!media) return false;

  await db.experienceMedia.update({
    where: { id: mediaId },
    data: { status: "DELETED" },
  });

  const filePath = getPrivateMediaFilePath(media.storageKey);
  if (fs.existsSync(filePath)) {
    try {
      await fs.promises.unlink(filePath);
    } catch {
      // Ignored non-fatal unlink error
    }
  }

  return true;
}

/**
 * Publication snapshot: marks active referenced media as PUBLISHED.
 * Ensures unpublished draft media remains private.
 */
export async function snapshotPublishedMedia(
  experienceId: string,
  referencedMediaIds: string[]
): Promise<void> {
  if (referencedMediaIds.length === 0) return;

  await db.experienceMedia.updateMany({
    where: {
      experienceId,
      id: { in: referencedMediaIds },
      status: "DRAFT",
    },
    data: {
      status: "PUBLISHED",
    },
  });
}

export function getSafeExtension(mimeType: string): string {
  switch (mimeType) {
    case "image/jpeg":
      return ".jpg";
    case "image/png":
      return ".png";
    case "image/webp":
      return ".webp";
    case "audio/mpeg":
      return ".mp3";
    case "audio/wav":
      return ".wav";
    case "audio/ogg":
      return ".ogg";
    case "audio/mp4":
      return ".m4a";
    case "video/mp4":
      return ".mp4";
    case "video/webm":
      return ".webm";
    case "audio/webm":
      return ".weba";
    default:
      return ".bin";
  }
}

export interface ResolvedMedia {
  url: string;
  altText?: string;
  width?: number;
  height?: number;
}

export interface MediaStore {
  resolve(mediaIdOrKey?: string | null): Promise<ResolvedMedia | null>;
}

export class SafeMediaStore implements MediaStore {
  async resolve(mediaIdOrKey?: string | null): Promise<ResolvedMedia | null> {
    if (!mediaIdOrKey || typeof mediaIdOrKey !== "string") {
      return null;
    }
    if (
      mediaIdOrKey.startsWith("https://") ||
      mediaIdOrKey.startsWith("http://") ||
      mediaIdOrKey.startsWith("/api/media/") ||
      mediaIdOrKey.startsWith("/api/experiences/")
    ) {
      return { url: mediaIdOrKey, altText: "Valentine Media" };
    }
    return null;
  }
}

export const mediaStore: MediaStore = new SafeMediaStore();
