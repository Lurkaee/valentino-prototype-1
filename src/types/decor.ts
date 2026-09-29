/**
 * Reusable Valentine Decoration & Composition Types & Shared Helpers
 * Single source of truth across the landing builder, create flow, editor, and recipient renderers.
 */

export interface FlowerOption {
  id: string;
  aliases?: string[];
  name: string;
  emoji: string;
  color: string;
  description: string;
}

export interface CharmOption {
  id: string;
  aliases?: string[];
  name: string;
  emoji: string;
  symbol: string;
  description: string;
}

export interface PaperOption {
  id: string;
  aliases?: string[];
  name: string;
  bgClass: string;
  textClass: string;
  borderClass: string;
  previewColor: string;
  // Inline styles for SSR HTML parity
  inlineBg: string;
  inlineText: string;
  inlineBorder: string;
}

export interface RibbonOption {
  id: string;
  aliases?: string[];
  name: string;
  gradientClass: string;
  stitchClass: string;
  previewColor: string;
  // Inline styles for SSR HTML parity
  inlineGradient: string;
  inlineStitch: string;
}

export interface SealOption {
  id: string;
  aliases?: string[];
  name: string;
  gradientClass: string;
  borderClass: string;
  emblem: string;
  previewColor: string;
  // Inline styles for SSR HTML parity
  inlineGradient: string;
  inlineBorder: string;
}

export interface ValentineDecor {
  blooms: string[];   // Canonical bloom IDs
  flowers?: string[]; // Backward-compatible alias
  charms: string[];   // Charm IDs
  paper: string;      // Paper ID
  ribbon: string;     // Ribbon ID
  waxSeal: string;    // Canonical wax seal ID
  seal?: string;      // Backward-compatible alias
}

export const CURATED_FLOWERS: FlowerOption[] = [
  { id: "crimson-rose", aliases: ["rose"], name: "Crimson Rose", emoji: "🌹", color: "#BE123C", description: "Deep devotion & romance" },
  { id: "french-tulip", aliases: ["tulip"], name: "French Tulip", emoji: "🌷", color: "#FB7185", description: "Perfect heartfelt love" },
  { id: "blush-peony", aliases: ["peony"], name: "Blush Peony", emoji: "🌸", color: "#F472B6", description: "Tenderness & honor" },
  { id: "wild-lavender", aliases: ["lavender"], name: "Wild Lavender", emoji: "🪻", color: "#A855F7", description: "Serenity & quiet devotion" },
  { id: "wild-daisy", aliases: ["daisy", "spring-daisy"], name: "Wild Daisy", emoji: "🌼", color: "#FBBF24", description: "Innocence & joy" },
  { id: "white-lily", aliases: ["lily"], name: "White Lily", emoji: "💮", color: "#FFFFFF", description: "Purity & sincerity" },
];

export const CURATED_CHARMS: CharmOption[] = [
  { id: "sparkle", aliases: ["sparkles", "gold-sparkles"], name: "Gold Sparkles", emoji: "✨", symbol: "✦", description: "Magical moments" },
  { id: "heart", aliases: ["hearts", "floating-hearts"], name: "Floating Hearts", emoji: "💖", symbol: "♡", description: "Pure affection" },
  { id: "butterfly", aliases: ["silk-butterfly"], name: "Silk Butterfly", emoji: "🦋", symbol: "ƸӜƷ", description: "Transformation" },
  { id: "bow", aliases: ["velvet-bow"], name: "Velvet Bow", emoji: "🎀", symbol: "୨୧", description: "Tied with grace" },
  { id: "envelope", aliases: ["secret-note"], name: "Secret Note", emoji: "💌", symbol: "✉", description: "Intimate dispatch" },
];

export const CURATED_PAPERS: PaperOption[] = [
  {
    id: "petal-blush",
    aliases: ["blush"],
    name: "Petal Blush",
    bgClass: "bg-[#FFF0F5]",
    textClass: "text-[#3D0A1E]",
    borderClass: "border-[#FBCFE8]",
    previewColor: "#FFF0F5",
    inlineBg: "#FFF0F5",
    inlineText: "#3D0A1E",
    inlineBorder: "#FBCFE8",
  },
  {
    id: "handmade-cream",
    aliases: ["cream", "ivory-cream"],
    name: "Handmade Cream",
    bgClass: "bg-[#FFFDF9]",
    textClass: "text-[#2A0615]",
    borderClass: "border-[#F5E6DC]",
    previewColor: "#FFFDF9",
    inlineBg: "#FFFDF9",
    inlineText: "#2A0615",
    inlineBorder: "#F5E6DC",
  },
  {
    id: "deckled-parchment",
    aliases: ["vintage", "parchment"],
    name: "Deckled Parchment",
    bgClass: "bg-[#FAF5ED]",
    textClass: "text-[#331C0E]",
    borderClass: "border-[#E8DFC8]",
    previewColor: "#FAF5ED",
    inlineBg: "#FAF5ED",
    inlineText: "#331C0E",
    inlineBorder: "#E8DFC8",
  },
  {
    id: "soft-lavender",
    aliases: ["lavender"],
    name: "Soft Lavender",
    bgClass: "bg-[#FAF5FF]",
    textClass: "text-[#2E1065]",
    borderClass: "border-[#E9D5FF]",
    previewColor: "#FAF5FF",
    inlineBg: "#FAF5FF",
    inlineText: "#2E1065",
    inlineBorder: "#E9D5FF",
  },
];

export const CURATED_RIBBONS: RibbonOption[] = [
  {
    id: "satin-rose",
    aliases: ["rose"],
    name: "Satin Rose",
    gradientClass: "from-[#BE185D] via-[#F43F5E] to-[#FB7185]",
    stitchClass: "bg-white/70",
    previewColor: "#FB7185",
    inlineGradient: "linear-gradient(90deg, #BE185D 0%, #F43F5E 50%, #FB7185 100%)",
    inlineStitch: "rgba(255, 255, 255, 0.7)",
  },
  {
    id: "velvet-crimson",
    aliases: ["crimson"],
    name: "Velvet Crimson",
    gradientClass: "from-[#9F1239] via-[#E11D48] to-[#9F1239]",
    stitchClass: "bg-[#FDE68A]/70",
    previewColor: "#E11D48",
    inlineGradient: "linear-gradient(90deg, #9F1239 0%, #E11D48 50%, #9F1239 100%)",
    inlineStitch: "rgba(253, 230, 138, 0.7)",
  },
  {
    id: "silk-ivory",
    aliases: ["ivory"],
    name: "Silk Ivory",
    gradientClass: "from-[#D97706] via-[#FBBF24] to-[#D97706]",
    stitchClass: "bg-[#FEF3C7]/90",
    previewColor: "#FBBF24",
    inlineGradient: "linear-gradient(90deg, #D97706 0%, #FBBF24 50%, #D97706 100%)",
    inlineStitch: "rgba(254, 243, 199, 0.9)",
  },
  {
    id: "plum-mist",
    aliases: ["lavender"],
    name: "Plum Mist",
    gradientClass: "from-[#701A75] via-[#A21CAF] to-[#701A75]",
    stitchClass: "bg-[#F5D0FE]/70",
    previewColor: "#A21CAF",
    inlineGradient: "linear-gradient(90deg, #701A75 0%, #A21CAF 50%, #701A75 100%)",
    inlineStitch: "rgba(245, 208, 254, 0.7)",
  },
];

export const CURATED_SEALS: SealOption[] = [
  {
    id: "crimson-heart",
    aliases: ["crimson"],
    name: "Crimson Heart",
    gradientClass: "from-[#E11D48] via-[#BE123C] to-[#6B0C23]",
    borderClass: "border-[#FCA5A5]/80",
    emblem: "💖",
    previewColor: "#BE123C",
    inlineGradient: "linear-gradient(135deg, #E11D48 0%, #BE123C 60%, #6B0C23 100%)",
    inlineBorder: "#FCA5A5",
  },
  {
    id: "rose-quartz",
    aliases: ["rose"],
    name: "Rose Quartz",
    gradientClass: "from-[#F43F5E] via-[#FB7185] to-[#BE185D]",
    borderClass: "border-[#FECDD3]/80",
    emblem: "🌸",
    previewColor: "#FB7185",
    inlineGradient: "linear-gradient(135deg, #F43F5E 0%, #FB7185 60%, #BE185D 100%)",
    inlineBorder: "#FECDD3",
  },
  {
    id: "royal-burgundy",
    aliases: ["burgundy"],
    name: "Royal Burgundy",
    gradientClass: "from-[#881337] via-[#4C0519] to-[#25030C]",
    borderClass: "border-[#F43F5E]/60",
    emblem: "💌",
    previewColor: "#4C0519",
    inlineGradient: "linear-gradient(135deg, #881337 0%, #4C0519 60%, #25030C 100%)",
    inlineBorder: "#F43F5E",
  },
  {
    id: "champagne-gold",
    aliases: ["champagne", "champagne-monogram"],
    name: "Champagne Gold",
    gradientClass: "from-[#D97706] via-[#B45309] to-[#78350F]",
    borderClass: "border-[#FDE68A]/80",
    emblem: "✨",
    previewColor: "#B45309",
    inlineGradient: "linear-gradient(135deg, #D97706 0%, #B45309 60%, #78350F 100%)",
    inlineBorder: "#FDE68A",
  },
];

export const DEFAULT_VALENTINE_DECOR: ValentineDecor = {
  blooms: ["crimson-rose", "french-tulip"],
  flowers: ["crimson-rose", "french-tulip"],
  charms: ["sparkle", "heart"],
  paper: "petal-blush",
  ribbon: "satin-rose",
  waxSeal: "crimson-heart",
  seal: "crimson-heart",
};

/**
 * Intelligent bloom slot coordinates based on total bloom count
 */
export interface BloomSlot {
  slotId: string;
  x: number;
  y: number;
  rotate: number;
  scale: number;
  zIndex: number;
}

export function getBloomSlots(totalCount: number): BloomSlot[] {
  if (totalCount <= 1) {
    return [{ slotId: "hero-top", x: 0, y: -95, rotate: 0, scale: 1.15, zIndex: 15 }];
  }
  if (totalCount === 2) {
    return [
      { slotId: "balanced-left", x: -80, y: -85, rotate: -18, scale: 1.05, zIndex: 14 },
      { slotId: "balanced-right", x: 80, y: -85, rotate: 18, scale: 1.05, zIndex: 14 },
    ];
  }
  if (totalCount === 3) {
    return [
      { slotId: "triangle-top", x: 0, y: -105, rotate: 0, scale: 1.1, zIndex: 15 },
      { slotId: "triangle-bottom-left", x: -85, y: -65, rotate: -22, scale: 1.0, zIndex: 14 },
      { slotId: "triangle-bottom-right", x: 85, y: -65, rotate: 22, scale: 1.0, zIndex: 14 },
    ];
  }
  if (totalCount === 4) {
    return [
      { slotId: "quad-top-left", x: -75, y: -95, rotate: -16, scale: 1.05, zIndex: 14 },
      { slotId: "quad-top-right", x: 75, y: -95, rotate: 16, scale: 1.05, zIndex: 14 },
      { slotId: "quad-bottom-left", x: -115, y: -30, rotate: -28, scale: 0.95, zIndex: 13 },
      { slotId: "quad-bottom-right", x: 115, y: -30, rotate: 28, scale: 0.95, zIndex: 13 },
    ];
  }
  // 5 or 6 bouquet
  return [
    { slotId: "bouquet-top-left", x: -75, y: -100, rotate: -16, scale: 1.05, zIndex: 14 },
    { slotId: "bouquet-top-right", x: 75, y: -100, rotate: 16, scale: 1.05, zIndex: 14 },
    { slotId: "bouquet-mid-left", x: -115, y: -35, rotate: -28, scale: 0.95, zIndex: 13 },
    { slotId: "bouquet-mid-right", x: 115, y: -35, rotate: 28, scale: 0.95, zIndex: 13 },
    { slotId: "bouquet-low-left", x: -65, y: 60, rotate: -14, scale: 0.9, zIndex: 12 },
    { slotId: "bouquet-low-right", x: 65, y: 60, rotate: 14, scale: 0.9, zIndex: 12 },
  ];
}

// Preset positions for charms
export const CHARM_POSITIONS = [
  { x: -95, y: -130, delay: 0 },
  { x: 95, y: -130, delay: 0.3 },
  { x: 0, y: -150, delay: 0.6 },
  { x: -130, y: 40, delay: 0.9 },
  { x: 130, y: 40, delay: 1.2 },
];

/**
 * Normalizes any incoming raw object into a validated ValentineDecor
 */
export function normalizeValentineDecor(raw: unknown): ValentineDecor {
  const obj = typeof raw === "object" && raw !== null ? (raw as Record<string, unknown>) : {};

  // Normalize blooms / flowers
  let blooms: string[] = [];
  const rawBlooms = Array.isArray(obj.blooms)
    ? obj.blooms
    : Array.isArray(obj.flowers)
    ? obj.flowers
    : [];

  for (const item of rawBlooms) {
    if (typeof item === "string") {
      const needle = item.toLowerCase().trim();
      const match = CURATED_FLOWERS.find((f) => f.id === needle || f.aliases?.includes(needle));
      if (match && !blooms.includes(match.id)) {
        blooms.push(match.id);
      }
    }
  }
  if (blooms.length === 0) {
    blooms = ["crimson-rose", "french-tulip"];
  }

  // Normalize charms
  let charms: string[] = [];
  const rawCharms = Array.isArray(obj.charms) ? obj.charms : [];
  for (const item of rawCharms) {
    if (typeof item === "string") {
      const needle = item.toLowerCase().trim();
      const match = CURATED_CHARMS.find((c) => c.id === needle || c.aliases?.includes(needle));
      if (match && !charms.includes(match.id)) {
        charms.push(match.id);
      }
    }
  }
  if (charms.length === 0) {
    charms = ["sparkle", "heart"];
  }

  // Normalize paper
  const paperVal = typeof obj.paper === "string" ? obj.paper.toLowerCase().trim() : "";
  const matchedPaper = CURATED_PAPERS.find((p) => p.id === paperVal || p.aliases?.includes(paperVal));
  const paper = matchedPaper ? matchedPaper.id : "petal-blush";

  // Normalize ribbon
  const ribbonVal = typeof obj.ribbon === "string" ? obj.ribbon.toLowerCase().trim() : "";
  const matchedRibbon = CURATED_RIBBONS.find((r) => r.id === ribbonVal || r.aliases?.includes(ribbonVal));
  const ribbon = matchedRibbon ? matchedRibbon.id : "satin-rose";

  // Normalize waxSeal / seal
  const sealVal = typeof obj.waxSeal === "string"
    ? obj.waxSeal.toLowerCase().trim()
    : typeof obj.seal === "string"
    ? obj.seal.toLowerCase().trim()
    : "";
  const matchedSeal = CURATED_SEALS.find((s) => s.id === sealVal || s.aliases?.includes(sealVal));
  const waxSeal = matchedSeal ? matchedSeal.id : "crimson-heart";

  return {
    blooms,
    flowers: blooms,
    charms,
    paper,
    ribbon,
    waxSeal,
    seal: waxSeal,
  };
}

/**
 * Compact URL encoder: blooms|charms|paper|ribbon|waxSeal
 * e.g. "crimson-rose,blush-peony|sparkle,heart|petal-blush|satin-rose|crimson-heart"
 */
export function encodeDecorParam(decor: ValentineDecor): string {
  const normalized = normalizeValentineDecor(decor);
  return `${normalized.blooms.join(",")}|${normalized.charms.join(",")}|${normalized.paper}|${normalized.ribbon}|${normalized.waxSeal}`;
}

/**
 * Compact URL decoder (safe fallback to DEFAULT_VALENTINE_DECOR)
 */
export function decodeDecorParam(param: string | null | undefined): ValentineDecor {
  if (!param || typeof param !== "string") return DEFAULT_VALENTINE_DECOR;
  const parts = param.split("|");
  if (parts.length < 5) return DEFAULT_VALENTINE_DECOR;

  const blooms = parts[0].split(",").filter(Boolean);
  const charms = parts[1].split(",").filter(Boolean);
  const paper = parts[2];
  const ribbon = parts[3];
  const waxSeal = parts[4];

  return normalizeValentineDecor({
    blooms,
    charms,
    paper,
    ribbon,
    waxSeal,
  });
}

export function getPaperOption(id: string): PaperOption {
  return CURATED_PAPERS.find((p) => p.id === id || p.aliases?.includes(id)) || CURATED_PAPERS[0];
}

export function getRibbonOption(id: string): RibbonOption {
  return CURATED_RIBBONS.find((r) => r.id === id || r.aliases?.includes(id)) || CURATED_RIBBONS[0];
}

export function getSealOption(id: string): SealOption {
  return CURATED_SEALS.find((s) => s.id === id || s.aliases?.includes(id)) || CURATED_SEALS[0];
}

