import { sanitizeText } from "@/lib/sanitize";
import { OceanLetterPublishedConfig, OceanTheme, OCEAN_THEMES } from "./schema";
import { normalizeValentineDecor, DEFAULT_VALENTINE_DECOR } from "@/types/decor";
import { normalizeAllModules } from "@/modules/registry";
import { normalizeNarrativeConfig } from "@/narrative/schema";

export function normalizeOceanLetterConfig(
  raw: unknown,
  isPublic: boolean = false
): OceanLetterPublishedConfig {
  if (!raw || typeof raw !== "object") {
    return {
      partnerName: "Dearest",
      senderName: "Yours Always",
      greeting: "To my steady anchor",
      message: "Our devotion is as vast, calm, and enduring as the twilight sea.",
      signOff: "With every tide",
      accentTheme: "fog-blue",
      heroMediaId: null,
      soundtrackUrl: null,
      decor: DEFAULT_VALENTINE_DECOR,
      modules: {},
      moduleOrder: ["timeline", "quiz", "secret", "openWhen"],
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

  let accentTheme: OceanTheme = "fog-blue";
  if (typeof obj.accentTheme === "string" && OCEAN_THEMES.includes(obj.accentTheme as OceanTheme)) {
    accentTheme = obj.accentTheme as OceanTheme;
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
    greeting: greeting || "To my steady anchor",
    message: isPublic ? message || "Our devotion is as vast, calm, and enduring as the twilight sea." : message,
    signOff: signOff || "With every tide",
    accentTheme,
    heroMediaId,
    soundtrackUrl,
    decor,
    modules,
    moduleOrder: Array.isArray(obj.moduleOrder) ? obj.moduleOrder : ["timeline", "quiz", "secret", "openWhen"],
    narrative,
  };
}
