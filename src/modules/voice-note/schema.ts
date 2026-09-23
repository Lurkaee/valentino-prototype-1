import { z } from "zod";

export const voiceNoteDraftSchema = z.object({
  enabled: z.boolean().default(false),
  url: z.string().max(500).default(""),
  mediaId: z.string().max(100).optional(),
  title: z.string().max(100).optional().default("Voice Note"),
  caption: z.string().max(300).optional().default("A personal message from my heart to yours"),
  duration: z.number().nonnegative().optional().default(0),
});

export const voiceNotePublishSchema = z.object({
  enabled: z.boolean(),
  url: z.string().max(500),
  mediaId: z.string().max(100).optional(),
  title: z.string().max(100).optional(),
  caption: z.string().max(300).optional(),
  duration: z.number().nonnegative().optional(),
});

export type VoiceNoteDraftConfig = z.infer<typeof voiceNoteDraftSchema>;
export type VoiceNotePublishedConfig = z.infer<typeof voiceNotePublishSchema>;

export function normalizeVoiceNoteConfig(
  raw: unknown,
  isPublic: boolean = false
): VoiceNotePublishedConfig {
  const parsed = voiceNoteDraftSchema.safeParse(raw);
  if (!parsed.success || !parsed.data.url) {
    return {
      enabled: false,
      url: "",
      title: "Voice Note",
      caption: "A personal message from my heart to yours",
      duration: 0,
    };
  }

  let url = parsed.data.url;
  if (isPublic && parsed.data.mediaId && url.includes("/api/experiences/")) {
    url = url.replace(/\/api\/experiences\/([^/]+)\/media\//, "/api/media/$1/");
  }

  return {
    enabled: parsed.data.enabled,
    url,
    mediaId: parsed.data.mediaId,
    title: parsed.data.title || "Voice Note",
    caption: parsed.data.caption || "A personal message from my heart to yours",
    duration: parsed.data.duration || 0,
  };
}
