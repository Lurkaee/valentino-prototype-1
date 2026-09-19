import { sanitizeText } from "@/lib/sanitize";
import {
  MidnightRosePublishedConfig,
  ACCENT_THEMES,
  AccentTheme,
} from "./schema";

export function normalizeMidnightRoseConfig(raw: unknown): MidnightRosePublishedConfig {
  const obj = typeof raw === "object" && raw !== null ? (raw as Record<string, unknown>) : {};

  const partnerName = sanitizeText(typeof obj.partnerName === "string" ? obj.partnerName : "");
  const senderName = sanitizeText(typeof obj.senderName === "string" ? obj.senderName : "");
  const greeting = sanitizeText(
    typeof obj.greeting === "string" && obj.greeting.trim()
      ? obj.greeting
      : "To my favorite person"
  );
  const message = sanitizeText(typeof obj.message === "string" ? obj.message : "", {
    allowNewlines: true,
  });
  const signOff = sanitizeText(
    typeof obj.signOff === "string" && obj.signOff.trim()
      ? obj.signOff
      : "With all my love"
  );

  let accentTheme: AccentTheme = "crimson-rose";
  if (
    typeof obj.accentTheme === "string" &&
    ACCENT_THEMES.includes(obj.accentTheme as AccentTheme)
  ) {
    accentTheme = obj.accentTheme as AccentTheme;
  }

  const heroMediaId =
    typeof obj.heroMediaId === "string" && obj.heroMediaId.trim()
      ? obj.heroMediaId.trim()
      : null;

  return {
    partnerName,
    senderName,
    greeting,
    message,
    signOff,
    accentTheme,
    heroMediaId,
  };
}
