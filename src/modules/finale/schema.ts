import { z } from "zod";
import { graphemeMax } from "@/lib/security";

export const finaleDraftSchema = z
  .object({
    enabled: z.boolean().default(true),
    title: graphemeMax(100).optional().default("Forever Yours"),
    subtitle: graphemeMax(200).optional(),
    personalReflection: graphemeMax(1500).optional(),
    declaration: graphemeMax(1000).optional().default("In every lifetime, across every galaxy, my heart would always find you."),
    signature: graphemeMax(100).optional().default("Always & Forever"),
    closingDate: graphemeMax(50).optional(),
    closingPromise: graphemeMax(300).optional(),
    promisesHighlight: graphemeMax(300).optional(),
    sealText: graphemeMax(100).optional(),
    showKeepsakeAction: z.boolean().optional(),
    showKeepsakePrompt: z.boolean().optional().default(true),
  })
  .passthrough();

export const finalePublishSchema = z
  .object({
    enabled: z.boolean(),
    title: graphemeMax(100).optional().default("Forever Yours"),
    subtitle: graphemeMax(200).optional(),
    personalReflection: graphemeMax(1500).optional(),
    declaration: graphemeMax(1000).optional().default("In every lifetime, across every galaxy, my heart would always find you."),
    signature: graphemeMax(100).optional(),
    closingDate: graphemeMax(50).optional(),
    closingPromise: graphemeMax(300).optional(),
    promisesHighlight: graphemeMax(300).optional(),
    sealText: graphemeMax(100).optional(),
    showKeepsakeAction: z.boolean().optional(),
    showKeepsakePrompt: z.boolean().optional().default(true),
  })
  .passthrough();

export type FinaleDraftConfig = z.infer<typeof finaleDraftSchema>;
export type FinalePublishedConfig = z.infer<typeof finalePublishSchema>;

export function normalizeFinaleConfig(raw: unknown, _isPublic: boolean = false): FinalePublishedConfig {
  if (!raw || typeof raw !== "object") {
    return {
      enabled: false,
      title: "Forever Yours",
      declaration: "In every lifetime, across every galaxy, my heart would always find you.",
      signature: "Always & Forever",
      showKeepsakePrompt: true,
    };
  }

  const obj = raw as Record<string, any>;
  const declaration =
    typeof obj.declaration === "string" && obj.declaration.trim()
      ? obj.declaration.trim().slice(0, 1000)
      : "In every lifetime, across every galaxy, my heart would always find you.";

  return {
    enabled: Boolean(obj.enabled),
    title: typeof obj.title === "string" && obj.title.trim() ? obj.title.trim().slice(0, 100) : "Forever Yours",
    subtitle: typeof obj.subtitle === "string" ? obj.subtitle.trim().slice(0, 200) : undefined,
    personalReflection: typeof obj.personalReflection === "string" && obj.personalReflection.trim() ? obj.personalReflection.trim().slice(0, 1500) : undefined,
    declaration,
    signature: typeof obj.signature === "string" && obj.signature.trim() ? obj.signature.trim().slice(0, 100) : "Always & Forever",
    closingDate: typeof obj.closingDate === "string" && obj.closingDate.trim() ? obj.closingDate.trim().slice(0, 50) : undefined,
    closingPromise: typeof obj.closingPromise === "string" && obj.closingPromise.trim() ? obj.closingPromise.trim().slice(0, 300) : undefined,
    promisesHighlight: typeof obj.promisesHighlight === "string" ? obj.promisesHighlight.trim().slice(0, 300) : undefined,
    sealText: typeof obj.sealText === "string" ? obj.sealText.trim().slice(0, 100) : undefined,
    showKeepsakeAction: Boolean(obj.showKeepsakeAction ?? obj.showKeepsakePrompt ?? true),
    showKeepsakePrompt: Boolean(obj.showKeepsakePrompt ?? obj.showKeepsakeAction ?? true),
  };
}
