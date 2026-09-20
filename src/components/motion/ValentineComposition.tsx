"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { DECOR_SLOTS, ValentineDecor, normalizeValentineDecor, DecorSlotName } from "@/types/decor";

const BLOOM_GLYPHS: Record<ValentineDecor["blooms"], string> = {
  rose: "🌹",
  wildflower: "🌼",
  peony: "🪷",
};

const CHARM_GLYPHS: Record<ValentineDecor["charms"], string> = {
  heart: "♡",
  star: "✦",
  sparkle: "✧",
};

const PAPER_CLASSES: Record<ValentineDecor["paper"], string> = {
  "ivory-cream": "bg-[#FFFDF8] text-[#2D1720] border-[#EEDFD2]",
  "petal-blush": "bg-[#FFF1F4] text-[#321820] border-[#F3D2DA]",
  "deckled-parchment": "bg-[linear-gradient(135deg,#F3E8D3_0%,#FFFBF1_48%,#E9D8BC_100%)] text-[#332218] border-[#D9C6A7]",
  "soft-lavender": "bg-[#F8F3FF] text-[#2B2038] border-[#DDD0F0]",
};

const RIBBON_CLASSES: Record<ValentineDecor["ribbon"], string> = {
  "velvet-crimson": "bg-[linear-gradient(90deg,#650D1F,#B51F3C_50%,#650D1F)] shadow-[0_8px_18px_rgba(101,13,31,0.28)]",
  "satin-rose": "bg-[linear-gradient(90deg,#9F3551,#E58A9F_50%,#9F3551)] shadow-[0_8px_18px_rgba(159,53,81,0.22)]",
  "silk-ivory": "bg-[linear-gradient(90deg,#B8A38E,#F8F1E7_50%,#B8A38E)] shadow-[0_8px_18px_rgba(120,98,77,0.18)]",
  "plum-mist": "bg-[linear-gradient(90deg,#4E274D,#8F648C_50%,#4E274D)] shadow-[0_8px_18px_rgba(78,39,77,0.24)]",
};

const WAX_CLASSES: Record<ValentineDecor["waxSeal"], { bg: string; border: string; glyph: string; shadow: string }> = {
  "crimson-heart": {
    bg: "bg-[radial-gradient(circle_at_30%_25%,#D44763,#8B142D_72%)]",
    border: "border-[#F58BA0]",
    glyph: "♥",
    shadow: "shadow-[0_10px_30px_rgba(112,20,46,0.42)]",
  },
  "rose-quartz": {
    bg: "bg-[radial-gradient(circle_at_30%_25%,#F09FB0,#B24D68_72%)]",
    border: "border-[#FFD1DA]",
    glyph: "✿",
    shadow: "shadow-[0_10px_30px_rgba(178,77,104,0.35)]",
  },
  "royal-burgundy": {
    bg: "bg-[radial-gradient(circle_at_30%_25%,#7F1D3A,#4A071D_72%)]",
    border: "border-[#D76A87]",
    glyph: "♜",
    shadow: "shadow-[0_10px_30px_rgba(74,7,29,0.5)]",
  },
  "champagne-gold": {
    bg: "bg-[radial-gradient(circle_at_30%_25%,#E8C27B,#9A6D2B_72%)]",
    border: "border-[#F8E8BA]",
    glyph: "✦",
    shadow: "shadow-[0_10px_30px_rgba(154,109,43,0.3)]",
  },
};

export interface ValentineCompositionProps {
  decor: unknown;
  showWaxSealAdornment?: boolean;
  recipient?: string;
  sender?: string;
  message?: string;
  greeting?: string;
  signOff?: string;
  children?: React.ReactNode;
  className?: string;
}

function slotStyle(slot: DecorSlotName): React.CSSProperties {
  const [x, y, rotate, scale, zIndex] = DECOR_SLOTS[slot];
  return {
    left: `${x}%`,
    top: `${y}%`,
    transform: `translate(-50%, -50%) rotate(${rotate}deg) scale(${scale})`,
    zIndex,
  };
}

export function ValentineComposition({
  decor: rawDecor,
  recipient,
  sender,
  message,
  greeting,
  signOff,
  children,
  className = "",
  showWaxSealAdornment = true,
}: ValentineCompositionProps) {
  const decor = normalizeValentineDecor(rawDecor);
  const wax = WAX_CLASSES[decor.waxSeal];
  const reducedMotion = useReducedMotion();

  return (
    <div
      data-testid="decor-composition"
      data-decor-blooms={decor.blooms}
      data-decor-charms={decor.charms}
      data-decor-paper={decor.paper}
      data-decor-ribbon={decor.ribbon}
      data-decor-wax-seal={decor.waxSeal}
      className={`relative w-full overflow-hidden rounded-[2rem] p-5 sm:p-8 ${className}`}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.18),transparent_52%)]" />

      {Object.keys(DECOR_SLOTS).map((slot, index) => (
        <div
          key={slot}
          data-testid={`composition-bloom-${slot}`}
          data-slot={slot}
          className="pointer-events-none absolute select-none text-4xl sm:text-5xl drop-shadow-[0_8px_12px_rgba(40,10,20,0.18)] will-change-transform"
          style={slotStyle(slot as DecorSlotName)}
        >
          <motion.span
            className="inline-block"
            initial={
              reducedMotion
                ? { opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }
                : { opacity: 0, x: -10, y: 8, rotate: -8, scale: 0.72 }
            }
            animate={
              reducedMotion
                ? { opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }
                : { opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }
            }
            transition={
              reducedMotion
                ? { duration: 0 }
                : { type: "spring", stiffness: 180, damping: 16, mass: 0.7, delay: index * 0.05 }
            }
          >
            {BLOOM_GLYPHS[decor.blooms]}
          </motion.span>
        </div>
      ))}

      <div className="pointer-events-none absolute inset-0 z-20">
        <span className="absolute left-[16%] top-[19%] text-xl opacity-65">{CHARM_GLYPHS[decor.charms]}</span>
        <span className="absolute right-[16%] top-[25%] text-lg opacity-55">{CHARM_GLYPHS[decor.charms]}</span>
        <span className="absolute left-[18%] bottom-[18%] text-lg opacity-45">{CHARM_GLYPHS[decor.charms]}</span>
        <span className="absolute right-[18%] bottom-[20%] text-xl opacity-60">{CHARM_GLYPHS[decor.charms]}</span>
      </div>

      <div className={`relative z-30 rounded-[1.6rem] p-5 sm:p-7 shadow-[0_25px_60px_rgba(24,6,12,0.32)] ${PAPER_CLASSES[decor.paper]}`}>
        <div className="pointer-events-none absolute inset-x-5 top-4 h-5 rounded-full opacity-90">
          <div
            data-testid="decor-ribbon"
            className={`h-5 rounded-full border border-black/10 ${RIBBON_CLASSES[decor.ribbon]}`}
            aria-hidden="true"
          />
        </div>

        {children || (
          <div className="relative z-10 pt-5 space-y-4">
            {greeting && <p className="text-xs uppercase tracking-[0.18em] opacity-60">{greeting}</p>}
            {recipient && <h2 className="text-2xl sm:text-3xl font-serif font-medium">{recipient}</h2>}
            {message && <p data-testid="letter-message" className="whitespace-pre-wrap pt-3 text-base leading-relaxed">{message}</p>}
            {signOff && <p className="pt-4 text-right text-sm italic">{signOff}{sender ? `, ${sender}` : ""}</p>}
          </div>
        )}

        {showWaxSealAdornment && (
        <div className="pointer-events-none absolute right-5 bottom-5 z-40">
          <div
            data-testid="decor-wax-seal"
            data-wax-seal={decor.waxSeal}
            className={`flex h-14 w-14 items-center justify-center rounded-full border-2 text-xl text-white ${wax.bg} ${wax.border} ${wax.shadow}`}
            aria-hidden="true"
          >
            <span className="font-serif">{wax.glyph}</span>
          </div>
        </div>
        )}
      </div>
    </div>
  );
}
