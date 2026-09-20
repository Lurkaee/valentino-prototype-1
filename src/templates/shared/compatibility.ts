/**
 * Template Compatibility Layer
 *
 * Translates canonical ValentineDecor semantic tokens into template-aware visual treatments
 * without mutating the canonical user customization state.
 *
 * Guarantees:
 * - Deterministic, pure function execution (no side effects)
 * - Canonical ValentineDecor remains the single source of truth
 * - Seamless adaptation across different romantic world atmospheres
 */

import {
  ValentineDecor,
  normalizeValentineDecor,
  getPaperOption,
  getRibbonOption,
  getSealOption,
  getBloomSlots,
  CURATED_FLOWERS,
  CURATED_CHARMS,
  CHARM_POSITIONS,
  PaperOption,
  RibbonOption,
  SealOption,
  FlowerOption,
  CharmOption,
} from "@/types/decor";

export interface TemplateDecorPresentation {
  paper: PaperOption & {
    ambientTextureClass?: string;
  };
  ribbon: RibbonOption & {
    accentGlowClass?: string;
  };
  waxSeal: SealOption & {
    haloClass?: string;
    bezelClass?: string;
  };
  blooms: Array<{
    option: FlowerOption;
    slot: { x: number; y: number; rotate: number; scale: number; zIndex: number };
    filterClass?: string;
  }>;
  charms: Array<{
    option: CharmOption;
    pos: { x: number; y: number };
  }>;
  atmosphereGlowClass: string;
}

/**
 * resolveTemplateDecor:
 * Pure presentation resolver. Maps canonical ValentineDecor to a template-specific presentation model.
 */
export function resolveTemplateDecor(
  decorInput: unknown,
  templateId: string = "midnight-rose"
): TemplateDecorPresentation {
  // Normalize canonical decor without mutating the original input
  const decor = normalizeValentineDecor(decorInput);

  const basePaper = getPaperOption(decor.paper);
  const baseRibbon = getRibbonOption(decor.ribbon);
  const baseSeal = getSealOption(decor.waxSeal);

  // Derive template-specific presentation treatments
  let atmosphereGlowClass = "from-rose-600/30 via-pink-600/15 to-transparent";
  let paperAmbientTexture = "mix-blend-multiply bg-[radial-gradient(#800020_1px,transparent_1px)] [background-size:12px_12px]";
  let sealHaloClass = "bg-rose-500/25";
  let sealBezelClass = "border-white/30 bg-black/15";

  switch (templateId) {
    case "cloud-nine":
      atmosphereGlowClass = "from-pink-400/35 via-sky-300/20 to-transparent";
      paperAmbientTexture = "mix-blend-overlay bg-[radial-gradient(#FFB6C1_1px,transparent_1px)] [background-size:14px_14px]";
      sealHaloClass = "bg-pink-400/35";
      sealBezelClass = "border-pink-200/50 bg-white/20";
      break;

    case "golden-hour":
      atmosphereGlowClass = "from-amber-500/30 via-orange-400/20 to-transparent";
      paperAmbientTexture = "mix-blend-multiply bg-[radial-gradient(#B45309_1px,transparent_1px)] [background-size:10px_10px]";
      sealHaloClass = "bg-amber-400/30";
      sealBezelClass = "border-amber-200/40 bg-amber-950/20";
      break;

    case "love-letter":
      atmosphereGlowClass = "from-rose-900/30 via-amber-900/20 to-transparent";
      paperAmbientTexture = "mix-blend-multiply bg-[radial-gradient(#451A03_1px,transparent_1px)] [background-size:8px_8px]";
      sealHaloClass = "bg-rose-700/25";
      sealBezelClass = "border-amber-100/30 bg-black/25";
      break;

    case "stardust":
      atmosphereGlowClass = "from-indigo-600/35 via-purple-500/20 to-transparent";
      paperAmbientTexture = "mix-blend-color-dodge bg-[radial-gradient(#E0E7FF_1px,transparent_1px)] [background-size:16px_16px]";
      sealHaloClass = "bg-purple-400/30";
      sealBezelClass = "border-purple-200/40 bg-indigo-950/30";
      break;

    case "midnight-rose":
    default:
      atmosphereGlowClass = "from-rose-600/30 via-pink-600/15 to-transparent";
      paperAmbientTexture = "mix-blend-multiply bg-[radial-gradient(#800020_1px,transparent_1px)] [background-size:12px_12px]";
      sealHaloClass = "bg-rose-500/25";
      sealBezelClass = "border-white/30 bg-black/15";
      break;
  }

  // Deterministic bloom slot assignment
  const bloomSlots = getBloomSlots(decor.blooms.length);
  const resolvedBlooms = decor.blooms
    .map((bloomId, index) => {
      const flower = CURATED_FLOWERS.find((f) => f.id === bloomId);
      if (!flower) return null;
      const slot = bloomSlots[index % bloomSlots.length];
      return {
        option: flower,
        slot,
        filterClass: "drop-shadow-[0_8px_18px_rgba(0,0,0,0.35)]",
      };
    })
    .filter(Boolean) as TemplateDecorPresentation["blooms"];

  // Deterministic charm position assignment
  const resolvedCharms = decor.charms
    .map((charmId, index) => {
      const charm = CURATED_CHARMS.find((c) => c.id === charmId);
      if (!charm) return null;
      const pos = CHARM_POSITIONS[index % CHARM_POSITIONS.length];
      return {
        option: charm,
        pos,
      };
    })
    .filter(Boolean) as TemplateDecorPresentation["charms"];

  return {
    paper: {
      ...basePaper,
      ambientTextureClass: paperAmbientTexture,
    },
    ribbon: {
      ...baseRibbon,
    },
    waxSeal: {
      ...baseSeal,
      haloClass: sealHaloClass,
      bezelClass: sealBezelClass,
    },
    blooms: resolvedBlooms,
    charms: resolvedCharms,
    atmosphereGlowClass,
  };
}
