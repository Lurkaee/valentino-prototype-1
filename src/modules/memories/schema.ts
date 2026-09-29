import { z } from "zod";

export const memoryItemSchema = z.object({
  id: z.string().min(1),
  type: z.literal("photo").default("photo"),
  url: z.string().min(1),
  mediaId: z.string().optional(),
  caption: z.string().max(500).optional().default(""),
  date: z.string().max(50).optional().default(""),
  title: z.string().max(100).optional().default(""),
  order: z.number().int().default(0),
});

export type MemoryItem = z.infer<typeof memoryItemSchema>;

export const memoriesDraftSchema = z.object({
  enabled: z.boolean().default(false),
  title: z.string().max(100).optional().default("Our Cherished Memories"),
  subtitle: z.string().max(200).optional().default("Fragments of light and laughter we hold forever"),
  items: z.array(memoryItemSchema).max(24).default([]),
});

export const memoriesPublishSchema = z.object({
  enabled: z.boolean(),
  title: z.string().max(100).optional(),
  subtitle: z.string().max(200).optional(),
  items: z.array(memoryItemSchema).max(24).default([]),
});

export type MemoriesDraftConfig = z.infer<typeof memoriesDraftSchema>;
export type MemoriesPublishedConfig = z.infer<typeof memoriesPublishSchema>;

export function normalizeMemoriesConfig(
  raw: unknown,
  isPublic: boolean = false
): MemoriesPublishedConfig {
  const parsed = memoriesDraftSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      enabled: false,
      title: "Our Cherished Memories",
      subtitle: "Fragments of light and laughter we hold forever",
      items: [],
    };
  }

  const sortedItems = [...parsed.data.items].sort((a, b) => a.order - b.order);

  // When publishing, ensure recipient URLs point to the public /api/media route
  const formattedItems = sortedItems.map((item, idx) => {
    let url = item.url;
    if (isPublic && item.mediaId && url.includes("/api/experiences/")) {
      // Replace draft URL with published recipient URL
      url = url.replace(/\/api\/experiences\/([^/]+)\/media\//, "/api/media/$1/");
    }
    return {
      ...item,
      order: idx,
      url,
      caption: item.caption?.trim() || "",
      title: item.title?.trim() || "",
      date: item.date?.trim() || "",
    };
  });

  return {
    enabled: parsed.data.enabled,
    title: parsed.data.title || "Our Cherished Memories",
    subtitle: parsed.data.subtitle || "Fragments of light and laughter we hold forever",
    items: formattedItems,
  };
}
