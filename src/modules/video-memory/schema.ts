import { z } from "zod";

export const videoMemoryDraftSchema = z.object({
  enabled: z.boolean().default(false),
  url: z.string().max(500).default(""),
  mediaId: z.string().max(100).optional(),
  posterUrl: z.string().max(500).optional().default(""),
  caption: z.string().max(300).optional().default("A motion memory preserved in time"),
  title: z.string().max(100).optional().default("Video Memory"),
});

export const videoMemoryPublishSchema = z.object({
  enabled: z.boolean(),
  url: z.string().max(500),
  mediaId: z.string().max(100).optional(),
  posterUrl: z.string().max(500).optional(),
  caption: z.string().max(300).optional(),
  title: z.string().max(100).optional(),
});

export type VideoMemoryDraftConfig = z.infer<typeof videoMemoryDraftSchema>;
export type VideoMemoryPublishedConfig = z.infer<typeof videoMemoryPublishSchema>;

export function normalizeVideoMemoryConfig(
  raw: unknown,
  isPublic: boolean = false
): VideoMemoryPublishedConfig {
  const parsed = videoMemoryDraftSchema.safeParse(raw);
  if (!parsed.success || !parsed.data.url) {
    return {
      enabled: false,
      url: "",
      caption: "A motion memory preserved in time",
      title: "Video Memory",
    };
  }

  let url = parsed.data.url;
  if (isPublic && parsed.data.mediaId && url.includes("/api/experiences/")) {
    url = url.replace(/\/api\/experiences\/([^/]+)\/media\//, "/api/media/$1/");
  }

  let posterUrl = parsed.data.posterUrl;
  if (isPublic && posterUrl && posterUrl.includes("/api/experiences/")) {
    posterUrl = posterUrl.replace(/\/api\/experiences\/([^/]+)\/media\//, "/api/media/$1/");
  }

  return {
    enabled: parsed.data.enabled,
    url,
    mediaId: parsed.data.mediaId,
    posterUrl,
    caption: parsed.data.caption || "A motion memory preserved in time",
    title: parsed.data.title || "Video Memory",
  };
}
