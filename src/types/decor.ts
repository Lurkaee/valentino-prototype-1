/**
 * Reusable Valentine Decoration & Composition Types
 * Shared across the landing builder, create flow, editor, and templates.
 */

export interface FlowerOption {
  id: string;
  name: string;
  emoji: string;
  color: string;
  description: string;
}

export interface CharmOption {
  id: string;
  name: string;
  emoji: string;
  symbol: string;
  description: string;
}

export interface PaperOption {
  id: string;
  name: string;
  bgClass: string;
  textClass: string;
  borderClass: string;
  previewColor: string;
}

export interface RibbonOption {
  id: string;
  name: string;
  gradientClass: string;
  stitchClass: string;
  previewColor: string;
}

export interface SealOption {
  id: string;
  name: string;
  gradientClass: string;
  borderClass: string;
  emblem: string;
  previewColor: string;
}

export interface ValentineDecor {
  flowers: string[]; // flower IDs
  charms: string[];  // charm IDs
  paper: string;     // paper ID
  ribbon: string;    // ribbon ID
  seal: string;      // seal ID
}

export const CURATED_FLOWERS: FlowerOption[] = [
  { id: "rose", name: "Crimson Rose", emoji: "🌹", color: "#BE123C", description: "Deep devotion & romance" },
  { id: "tulip", name: "French Tulip", emoji: "🌷", color: "#FB7185", description: "Perfect heartfelt love" },
  { id: "peony", name: "Blush Peony", emoji: "🌸", color: "#F472B6", description: "Tenderness & honor" },
  { id: "lavender", name: "Wild Lavender", emoji: "🪻", color: "#A855F7", description: "Serenity & quiet devotion" },
  { id: "daisy", name: "Spring Daisy", emoji: "🌼", color: "#FBBF24", description: "Innocence & joy" },
  { id: "lily", name: "White Lily", emoji: "💮", color: "#FFFFFF", description: "Purity & sincerity" },
];

export const CURATED_CHARMS: CharmOption[] = [
  { id: "sparkles", name: "Gold Sparkles", emoji: "✨", symbol: "✦", description: "Magical moments" },
  { id: "hearts", name: "Floating Hearts", emoji: "💖", symbol: "♡", description: "Pure affection" },
  { id: "butterfly", name: "Silk Butterfly", emoji: "🦋", symbol: "ƸӜƷ", description: "Transformation" },
  { id: "bow", name: "Velvet Bow", emoji: "🎀", symbol: "୨୧", description: "Tied with grace" },
  { id: "envelope", name: "Secret Note", emoji: "💌", symbol: "✉", description: "Intimate dispatch" },
];

export const CURATED_PAPERS: PaperOption[] = [
  {
    id: "cream",
    name: "Ivory Cream",
    bgClass: "bg-[#FFFDF9]",
    textClass: "text-[#2A0615]",
    borderClass: "border-[#F5E6DC]",
    previewColor: "#FFFDF9",
  },
  {
    id: "blush",
    name: "Petal Blush",
    bgClass: "bg-[#FFF0F5]",
    textClass: "text-[#3D0A1E]",
    borderClass: "border-[#FBCFE8]",
    previewColor: "#FFF0F5",
  },
  {
    id: "vintage",
    name: "Deckled Parchment",
    bgClass: "bg-[#FAF5ED]",
    textClass: "text-[#331C0E]",
    borderClass: "border-[#E8DFC8]",
    previewColor: "#FAF5ED",
  },
  {
    id: "lavender",
    name: "Soft Lavender",
    bgClass: "bg-[#FAF5FF]",
    textClass: "text-[#2E1065]",
    borderClass: "border-[#E9D5FF]",
    previewColor: "#FAF5FF",
  },
];

export const CURATED_RIBBONS: RibbonOption[] = [
  {
    id: "crimson",
    name: "Velvet Crimson",
    gradientClass: "from-[#9F1239] via-[#E11D48] to-[#9F1239]",
    stitchClass: "bg-[#FDE68A]/70",
    previewColor: "#E11D48",
  },
  {
    id: "rose",
    name: "Satin Rose",
    gradientClass: "from-[#BE185D] via-[#F43F5E] to-[#FB7185]",
    stitchClass: "bg-white/70",
    previewColor: "#FB7185",
  },
  {
    id: "ivory",
    name: "Silk Ivory",
    gradientClass: "from-[#D97706] via-[#FBBF24] to-[#D97706]",
    stitchClass: "bg-[#FEF3C7]/90",
    previewColor: "#FBBF24",
  },
  {
    id: "lavender",
    name: "Plum Mist",
    gradientClass: "from-[#701A75] via-[#A21CAF] to-[#701A75]",
    stitchClass: "bg-[#F5D0FE]/70",
    previewColor: "#A21CAF",
  },
];

export const CURATED_SEALS: SealOption[] = [
  {
    id: "crimson",
    name: "Crimson Heart",
    gradientClass: "from-[#E11D48] via-[#BE123C] to-[#6B0C23]",
    borderClass: "border-[#FCA5A5]/80",
    emblem: "💖",
    previewColor: "#BE123C",
  },
  {
    id: "rose",
    name: "Rose Quartz",
    gradientClass: "from-[#F43F5E] via-[#FB7185] to-[#BE185D]",
    borderClass: "border-[#FECDD3]/80",
    emblem: "🌸",
    previewColor: "#FB7185",
  },
  {
    id: "burgundy",
    name: "Royal Burgundy",
    gradientClass: "from-[#881337] via-[#4C0519] to-[#25030C]",
    borderClass: "border-[#F43F5E]/60",
    emblem: "💌",
    previewColor: "#4C0519",
  },
  {
    id: "champagne",
    name: "Champagne Gold",
    gradientClass: "from-[#D97706] via-[#B45309] to-[#78350F]",
    borderClass: "border-[#FDE68A]/80",
    emblem: "✨",
    previewColor: "#B45309",
  },
];

export const DEFAULT_VALENTINE_DECOR: ValentineDecor = {
  flowers: ["rose", "tulip"],
  charms: ["sparkles", "hearts"],
  paper: "cream",
  ribbon: "crimson",
  seal: "crimson",
};
