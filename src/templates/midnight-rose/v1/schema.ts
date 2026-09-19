import { z } from "zod";
import { countGraphemes } from "@/lib/sanitize";

export const ACCENT_THEMES = ["crimson-rose", "midnight-violet", "champagne-gold"] as const;
export type AccentTheme = (typeof ACCENT_THEMES)[number];

const graphemeMax = (max: number) =>
  z.string().refine((val) => countGraphemes(val) <= max, {
    message: `Must not exceed ${max} characters`,
  });

const graphemeMinMax = (min: number, max: number, fieldName: string) =>
  z
    .string()
    .refine((val) => countGraphemes(val.trim()) >= min, {
      message: `${fieldName} is required`,
    })
    .refine((val) => countGraphemes(val) <= max, {
      message: `${fieldName} must not exceed ${max} characters`,
    });

// Lenient schema for draft saves (everything optional, length caps enforced)
export const midnightRoseDraftSchema = z.object({
  partnerName: graphemeMax(60).optional().default(""),
  senderName: graphemeMax(60).optional().default(""),
  greeting: graphemeMax(100).optional().default(""),
  message: graphemeMax(2000).optional().default(""),
  signOff: graphemeMax(100).optional().default(""),
  accentTheme: z.enum(ACCENT_THEMES).optional().default("crimson-rose"),
  heroMediaId: z.string().max(200).optional().nullable(),
});

export type MidnightRoseDraftConfig = z.infer<typeof midnightRoseDraftSchema>;

// Strict schema for publishing
export const midnightRosePublishSchema = z.object({
  partnerName: graphemeMinMax(1, 60, "Partner name"),
  senderName: graphemeMinMax(1, 60, "Your name"),
  greeting: graphemeMax(100).optional().default("To my favorite person"),
  message: graphemeMinMax(1, 2000, "Letter / message"),
  signOff: graphemeMax(100).optional().default("With all my love"),
  accentTheme: z.enum(ACCENT_THEMES).default("crimson-rose"),
  heroMediaId: z.string().max(200).optional().nullable(),
});

export type MidnightRosePublishedConfig = z.infer<typeof midnightRosePublishSchema>;
