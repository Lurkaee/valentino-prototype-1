import { sanitizeText } from "@/lib/sanitize";
import { ApricotFilmPublishedConfig, ApricotTheme, APRICOT_THEMES } from "./schema";
import { normalizeValentineDecor, DEFAULT_VALENTINE_DECOR } from "@/types/decor";
import { normalizeAllModules } from "@/modules/registry";
import { normalizeNarrativeConfig } from "@/narrative/schema";

export function normalizeApricotFilmConfig(
  raw: unknown,
  isPublic: boolean = false
): ApricotFilmPublishedConfig {
  if (!raw || typeof raw !== "object") {
    return {
      partnerName: "Dearest",
      senderName: "Yours Always",
      greeting: "To my favorite memory",
      message: "Some moments feel like warm 16mm film under golden afternoon sun.",
      signOff: "Forever in golden hour",
      accentTheme: "apricot-amber",
      heroMediaId: null,
      soundtrackUrl: null,
      decor: DEFAULT_VALENTINE_DECOR,
      modules: {},
      moduleOrder: ["timeline", "quiz", "openWhen"],
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

  let accentTheme: ApricotTheme = "apricot-amber";
  if (typeof obj.accentTheme === "string" && APRICOT_THEMES.includes(obj.accentTheme as ApricotTheme)) {
    accentTheme = obj.accentTheme as ApricotTheme;
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
    greeting: greeting || "To my favorite memory",
    message: isPublic ? message || "Some moments feel like warm 16mm film under golden afternoon sun." : message,
    signOff: signOff || "Forever in golden hour",
    accentTheme,
    heroMediaId,
    soundtrackUrl,
    decor,
    modules,
    moduleOrder: Array.isArray(obj.moduleOrder) ? obj.moduleOrder : ["timeline", "quiz", "openWhen"],
    narrative,
  };
}
