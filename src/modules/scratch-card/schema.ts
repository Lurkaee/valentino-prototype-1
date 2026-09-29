import { z } from "zod";
import { graphemeMax } from "@/lib/security";

export const scratchCardDraftSchema = z
  .object({
    enabled: z.boolean().default(false),
    title: graphemeMax(100).optional().default("A Mystery Surprise"),
    subtitle: graphemeMax(200).optional().default("Scratch off the silver foil to uncover what's waiting for you"),
    frontMessage: graphemeMax(150).optional().default("Scratch to Reveal ✦"),
    hiddenMessage: graphemeMax(500).optional().default(""),
    coverColor: z.string().max(50).optional(),
  })
  .passthrough();

export const scratchCardPublishSchema = z
  .object({
    enabled: z.boolean(),
    title: graphemeMax(100).optional().default("A Mystery Surprise"),
    subtitle: graphemeMax(200).optional(),
    frontMessage: graphemeMax(150).optional().default("Scratch to Reveal ✦"),
    hiddenMessage: graphemeMax(500).optional().default(""),
    coverColor: z.string().max(50).optional(),
  })
  .passthrough();

export type ScratchCardDraftConfig = z.infer<typeof scratchCardDraftSchema>;
export type ScratchCardPublishedConfig = z.infer<typeof scratchCardPublishSchema>;

export function normalizeScratchCardConfig(raw: unknown, _isPublic: boolean = false): ScratchCardPublishedConfig {
  if (!raw || typeof raw !== "object") {
    return {
      enabled: false,
      title: "A Mystery Surprise",
      subtitle: "Scratch off the silver foil to uncover what's waiting for you",
      frontMessage: "Scratch to Reveal ✦",
      hiddenMessage: "",
    };
  }

  const obj = raw as Record<string, any>;
  const hiddenMessage = typeof obj.hiddenMessage === "string" ? obj.hiddenMessage.trim().slice(0, 500) : "";

  return {
    enabled: Boolean(obj.enabled && hiddenMessage.length > 0),
    title: typeof obj.title === "string" && obj.title.trim() ? obj.title.trim().slice(0, 100) : "A Mystery Surprise",
    subtitle: typeof obj.subtitle === "string" && obj.subtitle.trim() ? obj.subtitle.trim().slice(0, 200) : "Scratch off the silver foil to uncover what's waiting for you",
    frontMessage: typeof obj.frontMessage === "string" && obj.frontMessage.trim() ? obj.frontMessage.trim().slice(0, 150) : "Scratch to Reveal ✦",
    hiddenMessage,
  };
}
