import { sanitizeText } from "@/lib/sanitize";
import { WildflowerPaperPublishedConfig, WildflowerTheme, WILDFLOWER_THEMES } from "./schema";
import { normalizeValentineDecor, DEFAULT_VALENTINE_DECOR } from "@/types/decor";
import { normalizeAllModules } from "@/modules/registry";
import { normalizeNarrativeConfig } from "@/narrative/schema";

export function normalizeWildflowerPaperConfig(
  raw: unknown,
  isPublic: boolean = false
): WildflowerPaperPublishedConfig {
  if (!raw || typeof raw !== "object") {
    return {
      partnerName: "Dearest",
      senderName: "Yours Always",
      greeting: "To my gentlest blossom",
      message: "Our love feels like pressed wildflowers inside an artisan journal — quiet, enduring, and honest.",
      signOff: "Grown in love",
      accentTheme: "sage-botanical",
      heroMediaId: null,
      soundtrackUrl: null,
      decor: DEFAULT_VALENTINE_DECOR,
      modules: {},
      moduleOrder: ["timeline", "secret", "openWhen"],
      narrative: normalizeNarrativeConfig(undefined),
    };
  }

  const obj = raw as Record<string, any>;

  const partnerName = sanitizeText(
    typeof obj.partnerName === "string" ? obj.partnerName.trim() : ""
  );
  const senderName = sanitizeText(
    typeof obj.senderName === "string" ? obj.senderName.trim() : ""
  );
  const greeting = sanitizeText(
    typeof obj.greeting === "string" ? obj.greeting.trim() : ""
  );
  const message = sanitizeText(
    typeof obj.message === "string" ? obj.message.trim() : ""
  );
  const signOff = sanitizeText(
    typeof obj.signOff === "string" ? obj.signOff.trim() : ""
  );

  let accentTheme: WildflowerTheme = "sage-botanical";
  if (typeof obj.accentTheme === "string" && WILDFLOWER_THEMES.includes(obj.accentTheme as WildflowerTheme)) {
    accentTheme = obj.accentTheme as WildflowerTheme;
  }

  let heroMediaId: string | null = null;
  if (typeof obj.heroMediaId === "string" && obj.heroMediaId.trim()) {
    heroMediaId = obj.heroMediaId.trim();
  }

  let soundtrackUrl: string | null = null;
  if (typeof obj.soundtrackUrl === "string" && obj.soundtrackUrl.trim()) {
    soundtrackUrl = obj.soundtrackUrl.trim();
  }

  const decor = normalizeValentineDecor(obj.decor);
  const modules = normalizeAllModules(obj.modules);
  const narrative = normalizeNarrativeConfig(obj.narrative);

  return {
    partnerName: isPublic ? partnerName || "Dearest" : partnerName,
    senderName: isPublic ? senderName || "Yours Always" : senderName,
    greeting: greeting || "To my gentlest blossom",
    message: isPublic ? message || "Our love feels like pressed wildflowers inside an artisan journal — quiet, enduring, and honest." : message,
    signOff: signOff || "Grown in love",
    accentTheme,
    heroMediaId,
    soundtrackUrl,
    decor,
    modules,
    moduleOrder: Array.isArray(obj.moduleOrder) ? obj.moduleOrder : ["timeline", "secret", "openWhen"],
    narrative,
  };
}
