import { z } from "zod";
import { countGraphemes } from "@/lib/sanitize";

const graphemeMax = (max: number) =>
  z.string().refine((val) => countGraphemes(val) <= max, {
    message: `Must not exceed ${max} characters`,
  });

export const timelineItemDraftSchema = z.object({
  id: z.string().default(() => Math.random().toString(36).substring(2, 9)),
  title: graphemeMax(100).default(""),
  date: graphemeMax(60).default(""),
  description: graphemeMax(1000).default(""),
  mediaId: z.string().max(200).optional().nullable(),
  location: graphemeMax(80).optional(),
  accent: z.string().max(50).optional(),
});

export const timelineDraftSchema = z.object({
  enabled: z.boolean().default(false),
  title: graphemeMax(100).default("Our Journey Together"),
  subtitle: graphemeMax(200).default("The moments that brought us here"),
  items: z.array(timelineItemDraftSchema).default([]),
});

export type TimelineDraftConfig = z.infer<typeof timelineDraftSchema>;
export type TimelineItemConfig = z.infer<typeof timelineItemDraftSchema>;

export const timelineItemPublishSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Milestone title required").max(100),
  date: z.string().min(1, "Milestone date required").max(60),
  description: z.string().min(1, "Milestone description required").max(1000),
  mediaId: z.string().max(200).optional().nullable(),
  location: z.string().max(80).optional(),
  accent: z.string().max(50).optional(),
});

export const timelinePublishSchema = z.object({
  enabled: z.boolean().default(false),
  title: z.string().max(100).default("Our Journey Together"),
  subtitle: z.string().max(200).default("The moments that brought us here"),
  items: z.array(timelineItemPublishSchema).default([]),
});

export type TimelinePublishedConfig = z.infer<typeof timelinePublishSchema>;

export function normalizeTimelineConfig(raw: unknown): TimelinePublishedConfig {
  if (!raw || typeof raw !== "object") {
    return {
      enabled: false,
      title: "Our Journey Together",
      subtitle: "The moments that brought us here",
      items: [],
    };
  }

  const obj = raw as Record<string, any>;
  const rawItems = Array.isArray(obj.items) ? obj.items : [];
  const normalizedItems: TimelineItemConfig[] = rawItems
    .filter((item: any) => item && typeof item === "object")
    .map((item: any, idx: number) => ({
      id: typeof item.id === "string" ? item.id : `item-${idx}`,
      title: typeof item.title === "string" ? item.title.trim() : "",
      date: typeof item.date === "string" ? item.date.trim() : "",
      description: typeof item.description === "string" ? item.description.trim() : "",
      mediaId: typeof item.mediaId === "string" ? item.mediaId.trim() : null,
      location: typeof item.location === "string" ? item.location.trim() : undefined,
      accent: typeof item.accent === "string" ? item.accent.trim() : undefined,
    }))
    .filter((item) => item.title.length > 0 || item.description.length > 0);

  return {
    enabled: Boolean(obj.enabled && normalizedItems.length > 0),
    title: typeof obj.title === "string" && obj.title.trim() ? obj.title.trim() : "Our Journey Together",
    subtitle: typeof obj.subtitle === "string" && obj.subtitle.trim() ? obj.subtitle.trim() : "The moments that brought us here",
    items: normalizedItems,
  };
}
