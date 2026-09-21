import { sanitizeText } from "@/lib/sanitize";
import {
  CloudNinePublishedConfig,
  CLOUD_NINE_THEMES,
  CloudNineTheme,
} from "./schema";
import { normalizeValentineDecor } from "@/types/decor";
import { normalizeAllModules } from "@/modules/registry";

export function normalizeCloudNineConfig(
  raw: unknown,
  isPublic: boolean = false
): CloudNinePublishedConfig {
  const obj = typeof raw === "object" && raw !== null ? (raw as Record<string, unknown>) : {};

  const partnerName = sanitizeText(typeof obj.partnerName === "string" ? obj.partnerName : "");
  const senderName = sanitizeText(typeof obj.senderName === "string" ? obj.senderName : "");
  const greeting = sanitizeText(
    typeof obj.greeting === "string" && obj.greeting.trim()
      ? obj.greeting
      : "To my sweetest soul"
  );
  const message = sanitizeText(typeof obj.message === "string" ? obj.message : "", {
    allowNewlines: true,
  });
  const signOff = sanitizeText(
    typeof obj.signOff === "string" && obj.signOff.trim()
      ? obj.signOff
      : "Forever in the clouds"
  );

  let accentTheme: CloudNineTheme = "blush-sky";
  if (
    typeof obj.accentTheme === "string" &&
    CLOUD_NINE_THEMES.includes(obj.accentTheme as CloudNineTheme)
  ) {
    accentTheme = obj.accentTheme as CloudNineTheme;
  }

  const heroMediaId =
    typeof obj.heroMediaId === "string" && obj.heroMediaId.trim()
      ? obj.heroMediaId.trim()
      : null;

  const decor = normalizeValentineDecor(obj.decor);
  const modules = normalizeAllModules(obj.modules, isPublic);
  const moduleOrder = Array.isArray(obj.moduleOrder)
    ? (obj.moduleOrder as string[])
    : ["timeline", "quiz", "secret", "openWhen"];

  return {
    partnerName,
    senderName,
    greeting,
    message,
    signOff,
    accentTheme,
    heroMediaId,
    decor,
    modules,
    moduleOrder,
  };
}

