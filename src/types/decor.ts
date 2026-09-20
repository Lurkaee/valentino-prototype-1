import { z } from "zod";

export const BLOOM_STYLES = ["rose", "wildflower", "peony"] as const;
export type BloomStyle = (typeof BLOOM_STYLES)[number];

export const CHARM_STYLES = ["heart", "star", "sparkle"] as const;
export type CharmStyle = (typeof CHARM_STYLES)[number];

export const PAPER_FINISHES = [
  "ivory-cream",
  "petal-blush",
  "deckled-parchment",
  "soft-lavender",
] as const;
export type PaperFinish = (typeof PAPER_FINISHES)[number];

export const RIBBON_BANDS = ["velvet-crimson", "satin-rose", "silk-ivory", "plum-mist"] as const;
export type RibbonBand = (typeof RIBBON_BANDS)[number];

export const WAX_SEALS = ["crimson-heart", "rose-quartz", "royal-burgundy", "champagne-gold"] as const;
export type WaxSeal = (typeof WAX_SEALS)[number];

export interface ValentineDecor {
  blooms: BloomStyle;
  charms: CharmStyle;
  paper: PaperFinish;
  ribbon: RibbonBand;
  waxSeal: WaxSeal;
}

export const DEFAULT_VALENTINE_DECOR: ValentineDecor = {
  blooms: "rose",
  charms: "heart",
  paper: "ivory-cream",
  ribbon: "velvet-crimson",
  waxSeal: "crimson-heart",
};

export const DECOR_SLOTS = {
  "top-left": [7, 7, -18, 0.86, 30],
  "top-right": [93, 8, 16, 0.86, 30],
  "mid-left": [2, 43, -10, 0.7, 26],
  "mid-right": [98, 48, 11, 0.7, 26],
  "bottom-left": [9, 92, 13, 0.76, 30],
  "bottom-right": [91, 92, -14, 0.76, 30],
} as const satisfies Record<string, readonly [number, number, number, number, number]>;

export type DecorSlotName = keyof typeof DECOR_SLOTS;
export type DecorSlot = (typeof DECOR_SLOTS)[DecorSlotName];

export const valentineDecorSchema = z.object({
  blooms: z.enum(BLOOM_STYLES).default(DEFAULT_VALENTINE_DECOR.blooms),
  charms: z.enum(CHARM_STYLES).default(DEFAULT_VALENTINE_DECOR.charms),
  paper: z.enum(PAPER_FINISHES).default(DEFAULT_VALENTINE_DECOR.paper),
  ribbon: z.enum(RIBBON_BANDS).default(DEFAULT_VALENTINE_DECOR.ribbon),
  waxSeal: z.enum(WAX_SEALS).default(DEFAULT_VALENTINE_DECOR.waxSeal),
});

const isStringIn = <T extends readonly string[]>(value: unknown, values: T): value is T[number] =>
  typeof value === "string" && values.includes(value);

function readLegacyValue(
  raw: Record<string, unknown>,
  canonicalKey: keyof ValentineDecor,
  legacyKey: "flowers" | "seal"
): unknown {
  if (raw[canonicalKey] !== undefined) return raw[canonicalKey];
  return raw[legacyKey];
}

export function normalizeValentineDecor(raw: unknown): ValentineDecor {
  if (typeof raw !== "object" || raw === null) {
    return { ...DEFAULT_VALENTINE_DECOR };
  }

  const source = raw as Record<string, unknown>;
  const bloomsValue = readLegacyValue(source, "blooms", "flowers");
  const waxSealValue = readLegacyValue(source, "waxSeal", "seal");

  return {
    blooms: isStringIn(bloomsValue, BLOOM_STYLES) ? bloomsValue : DEFAULT_VALENTINE_DECOR.blooms,
    charms: isStringIn(source.charms, CHARM_STYLES) ? source.charms : DEFAULT_VALENTINE_DECOR.charms,
    paper: isStringIn(source.paper, PAPER_FINISHES) ? source.paper : DEFAULT_VALENTINE_DECOR.paper,
    ribbon: isStringIn(source.ribbon, RIBBON_BANDS) ? source.ribbon : DEFAULT_VALENTINE_DECOR.ribbon,
    waxSeal: isStringIn(waxSealValue, WAX_SEALS) ? waxSealValue : DEFAULT_VALENTINE_DECOR.waxSeal,
  };
}
