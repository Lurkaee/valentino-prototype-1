import { z } from "zod";
import { countGraphemes } from "@/lib/sanitize";

const graphemeMax = (max: number) =>
  z.string().refine((val) => countGraphemes(val) <= max, {
    message: `Must not exceed ${max} characters`,
  });

export const secretDraftSchema = z.object({
  enabled: z.boolean().default(false),
  title: graphemeMax(100).default("A Little Secret"),
  prompt: graphemeMax(100).default("Tap to reveal what's hidden inside"),
  hint: graphemeMax(100).optional().default("Only for your eyes"),
  secretContent: graphemeMax(2000).default(""),
});

export type SecretDraftConfig = z.infer<typeof secretDraftSchema>;

export const secretPublishSchema = z.object({
  enabled: z.boolean().default(false),
  title: z.string().max(100).default("A Little Secret"),
  prompt: z.string().min(1, "Prompt required").max(100).default("Tap to reveal what's hidden inside"),
  hint: z.string().max(100).optional(),
  secretContent: z.string().max(2000).optional(),
  isRevealed: z.boolean().optional(),
});


export interface SecretPublishedConfig {
  enabled: boolean;
  title: string;
  prompt: string;
  hint?: string;
  /**
   * Real privacy boundary:
   * secretContent is OMITTED in public SSR & initial payload.
   * It is fetched via /api/experiences/[publicId]/secret only upon recipient reveal.
   */
  secretContent?: string;
  isRevealed?: boolean;
}

export function normalizeSecretConfig(raw: unknown, isPublic: boolean = false): SecretPublishedConfig {
  if (!raw || typeof raw !== "object") {
    return {
      enabled: false,
      title: "A Little Secret",
      prompt: "Tap to reveal what's hidden inside",
      hint: "Only for your eyes",
    };
  }

  const obj = raw as Record<string, any>;
  const rawContent = typeof obj.secretContent === "string" ? obj.secretContent.trim() : "";
  const hasContent = rawContent.length > 0;

  const base = {
    enabled: Boolean(obj.enabled && hasContent),
    title: typeof obj.title === "string" && obj.title.trim() ? obj.title.trim() : "A Little Secret",
    prompt: typeof obj.prompt === "string" && obj.prompt.trim() ? obj.prompt.trim() : "Tap to reveal what's hidden inside",
    hint: typeof obj.hint === "string" && obj.hint.trim() ? obj.hint.trim() : undefined,
  };

  // When public, DO NOT expose secretContent in the initial payload
  if (isPublic) {
    return {
      ...base,
      isRevealed: false,
    };
  }

  // When in editor / draft preview, creator can see the secret content
  return {
    ...base,
    secretContent: rawContent,
    isRevealed: false,
  };
}
