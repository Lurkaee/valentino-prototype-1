import { sanitizeText } from "@/lib/sanitize";
import { KagePublishedConfig, KageTheme, KAGE_THEMES } from "./schema";
import { normalizeValentineDecor, DEFAULT_VALENTINE_DECOR } from "@/types/decor";
import { normalizeAllModules } from "@/modules/registry";

export function normalizeKageConfig(
  raw: unknown,
  isPublic: boolean = false
): KagePublishedConfig {
  if (!raw || typeof raw !== "object") {
    return {
      partnerName: "Dearest",
      senderName: "Yours Always",
      greeting: "Where stillness reveals the unseen",
      message: "In the quiet of the night, every thought of you is a light through the shadows.",
      signOff: "With all my heart",
      accentTheme: "kyoto-crimson",
      heroMediaId: null,
      decor: DEFAULT_VALENTINE_DECOR,
      modules: {},
      moduleOrder: ["timeline", "quiz", "secret", "openWhen"],
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

  let accentTheme: KageTheme = "kyoto-crimson";
  if (typeof obj.accentTheme === "string" && KAGE_THEMES.includes(obj.accentTheme as KageTheme)) {
    accentTheme = obj.accentTheme as KageTheme;
  }

  let heroMediaId: string | null = null;
  if (typeof obj.heroMediaId === "string" && obj.heroMediaId.trim()) {
    heroMediaId = obj.heroMediaId.trim();
  }

  const decor = normalizeValentineDecor(obj.decor);
  const modules = normalizeAllModules(obj.modules, isPublic);

  const moduleOrder = Array.isArray(obj.moduleOrder)
    ? obj.moduleOrder.filter((m: any) => typeof m === "string")
    : ["timeline", "quiz", "secret", "openWhen"];

  return {
    partnerName: partnerName || "Dearest",
    senderName: senderName || "Yours Always",
    greeting: greeting || "Where stillness reveals the unseen",
    message: message || "In the quiet of the night, every thought of you is a light through the shadows.",
    signOff: signOff || "With all my heart",
    accentTheme,
    heroMediaId,
    decor,
    modules,
    moduleOrder,
  };
}
