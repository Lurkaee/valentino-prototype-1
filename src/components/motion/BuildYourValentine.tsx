"use client";

import React, { useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ValentineComposition } from "./ValentineComposition";
import {
  BLOOM_STYLES,
  CHARM_STYLES,
  PAPER_FINISHES,
  RIBBON_BANDS,
  WAX_SEALS,
  ValentineDecor,
  DEFAULT_VALENTINE_DECOR,
} from "@/types/decor";

const PRESETS: Array<{ id: string; label: string; decor: ValentineDecor; description: string }> = [
  {
    id: "classic-romance",
    label: "Classic Romance",
    description: "Crimson roses, velvet, and a timeless wax seal.",
    decor: {
      blooms: "rose",
      charms: "heart",
      paper: "ivory-cream",
      ribbon: "velvet-crimson",
      waxSeal: "crimson-heart",
    },
  },
  {
    id: "wildflower-dream",
    label: "Wildflower Dream",
    description: "Soft garden blooms with blush details and playful sparkle.",
    decor: {
      blooms: "wildflower",
      charms: "sparkle",
      paper: "petal-blush",
      ribbon: "satin-rose",
      waxSeal: "rose-quartz",
    },
  },
  {
    id: "royal-devotion",
    label: "Royal Devotion",
    description: "Deep plum, parchment warmth, and a dramatic burgundy seal.",
    decor: {
      blooms: "peony",
      charms: "star",
      paper: "deckled-parchment",
      ribbon: "plum-mist",
      waxSeal: "royal-burgundy",
    },
  },
];

const LABELS: Record<string, Record<string, string>> = {
  blooms: { rose: "Roses", wildflower: "Wildflowers", peony: "Peonies" },
  charms: { heart: "Hearts", star: "Stars", sparkle: "Sparkles" },
  paper: {
    "ivory-cream": "Ivory Cream",
    "petal-blush": "Petal Blush",
    "deckled-parchment": "Deckled Parchment",
    "soft-lavender": "Soft Lavender",
  },
  ribbon: {
    "velvet-crimson": "Velvet Crimson",
    "satin-rose": "Satin Rose",
    "silk-ivory": "Silk Ivory",
    "plum-mist": "Plum Mist",
  },
  waxSeal: {
    "crimson-heart": "Crimson Heart",
    "rose-quartz": "Rose Quartz",
    "royal-burgundy": "Royal Burgundy",
    "champagne-gold": "Champagne Gold",
  },
};

const GLYPHS: Record<string, string> = {
  rose: "🌹",
  wildflower: "🌼",
  peony: "🪷",
  heart: "♡",
  star: "✦",
  sparkle: "✧",
  "ivory-cream": "🤍",
  "petal-blush": "🌸",
  "deckled-parchment": "📜",
  "soft-lavender": "🪻",
  "velvet-crimson": "🎀",
  "satin-rose": "🎀",
  "silk-ivory": "🤍",
  "plum-mist": "🪻",
  "crimson-heart": "♥",
  "rose-quartz": "✿",
  "royal-burgundy": "♜",
  "champagne-gold": "✦",
};

function OptionButton({
  testId,
  selected,
  label,
  glyph,
  onClick,
}: {
  testId: string;
  selected: boolean;
  label: string;
  glyph: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      data-testid={testId}
      aria-pressed={selected}
      onClick={onClick}
      className={`group flex items-center gap-2 rounded-xl border px-3 py-2 text-left text-xs transition-all ${selected
        ? "border-rose-300/70 bg-rose-500/15 text-white shadow-[0_0_24px_rgba(244,63,94,0.12)]"
        : "border-white/10 bg-white/[0.035] text-white/70 hover:border-white/25 hover:bg-white/[0.06]"}`}
    >
      <span className="text-base" aria-hidden="true">{glyph}</span>
      <span className="leading-tight">{label}</span>
    </button>
  );
}

export function BuildYourValentine() {
  const reducedMotion = useReducedMotion();
  const [decor, setDecor] = useState<ValentineDecor>({ ...DEFAULT_VALENTINE_DECOR });

  const applyPreset = (preset: ValentineDecor) => {
    setDecor({ ...preset });
  };

  const patchDecor = <K extends keyof ValentineDecor>(key: K, value: ValentineDecor[K]) => {
    setDecor((prev) => ({ ...prev, [key]: value }));
  };

  const createHref = useMemo(() => {
    const encoded = encodeURIComponent(JSON.stringify(decor));
    return `/create?decor=${encoded}`;
  }, [decor]);

  const handleCreate = () => {
    try {
      sessionStorage.setItem("valentino:initial-decor", JSON.stringify(decor));
    } catch {
      // Search params remain the primary transfer path.
    }
    window.location.assign(createHref);
  };

  return (
    <section id="build-your-valentine" className="w-full max-w-6xl mx-auto px-6 py-20 relative z-10">
      <div className="grid grid-cols-1 xl:grid-cols-[1.05fr_0.95fr] gap-8 items-stretch">
        <div className="rounded-[2rem] border border-rose-500/20 bg-[#1A0512]/75 backdrop-blur-xl p-6 sm:p-8 shadow-2xl">
          <div className="space-y-2 mb-7">
            <p className="text-[11px] uppercase tracking-[0.2em] text-rose-300/80">Build Your Valentine</p>
            <h2 className="text-3xl sm:text-4xl font-serif font-medium text-white">Make the letter feel like yours.</h2>
            <p className="text-sm text-[#FAF8F5]/70 leading-relaxed max-w-xl">
              Choose the tiny details now. They travel all the way into the editor, live preview, and the private page your partner receives.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5 mb-8">
            {PRESETS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                data-testid={`preset-${preset.id}`}
                onClick={() => applyPreset(preset.decor)}
                className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs text-white/75 transition-all hover:border-rose-400/35 hover:bg-rose-500/10"
              >
                {preset.label}
              </button>
            ))}
          </div>

          <div className="space-y-6">
            <ChoiceGroup title="Blooms" options={BLOOM_STYLES} labels={LABELS.blooms} glyphs={GLYPHS} selected={decor.blooms} onSelect={(v) => patchDecor("blooms", v as ValentineDecor["blooms"])} prefix="builder-bloom" />
            <ChoiceGroup title="Charms" options={CHARM_STYLES} labels={LABELS.charms} glyphs={GLYPHS} selected={decor.charms} onSelect={(v) => patchDecor("charms", v as ValentineDecor["charms"])} prefix="builder-charm" />
            <ChoiceGroup title="Paper finish" options={PAPER_FINISHES} labels={LABELS.paper} glyphs={GLYPHS} selected={decor.paper} onSelect={(v) => patchDecor("paper", v as ValentineDecor["paper"])} prefix="builder-paper" />
            <ChoiceGroup title="Ribbon" options={RIBBON_BANDS} labels={LABELS.ribbon} glyphs={GLYPHS} selected={decor.ribbon} onSelect={(v) => patchDecor("ribbon", v as ValentineDecor["ribbon"])} prefix="builder-ribbon" />
            <ChoiceGroup title="Wax seal" options={WAX_SEALS} labels={LABELS.waxSeal} glyphs={GLYPHS} selected={decor.waxSeal} onSelect={(v) => patchDecor("waxSeal", v as ValentineDecor["waxSeal"])} prefix="builder-wax-seal" />
          </div>

          <div className="pt-7 mt-7 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-[11px] text-white/45">Your selections stay private until you publish.</span>
            <button
              type="button"
              data-testid="create-this-valentine"
              onClick={handleCreate}
              className="w-full sm:w-auto rounded-full bg-gradient-to-r from-rose-500 to-pink-500 px-6 py-3 text-sm font-medium text-white shadow-xl shadow-rose-950/60 transition-transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Create This Valentine 💌
            </button>
          </div>
        </div>

        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 22 }}
          whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-[2rem] border border-rose-500/20 bg-[#12030A]/65 backdrop-blur-xl p-4 sm:p-6 shadow-2xl flex items-center justify-center overflow-hidden"
        >
          <ValentineComposition
            decor={decor}
            recipient="Your Favorite Person"
            message="Every little detail should feel like it was placed there just for them."
            sender="Yours"
            className="max-w-xl"
          />
        </motion.div>
      </div>
    </section>
  );
}

function ChoiceGroup({
  title,
  options,
  labels,
  glyphs,
  selected,
  onSelect,
  prefix,
}: {
  title: string;
  options: readonly string[];
  labels: Record<string, string>;
  glyphs: Record<string, string>;
  selected: string;
  onSelect: (value: string) => void;
  prefix: string;
}) {
  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-wider text-rose-100/75 font-medium">{title}</span>
        <span className="text-[10px] text-white/35">{labels[selected]}</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        {options.map((option) => (
          <OptionButton
            key={option}
            testId={`${prefix}-${option}`}
            selected={selected === option}
            label={labels[option]}
            glyph={glyphs[option]}
            onClick={() => onSelect(option)}
          />
        ))}
      </div>
    </div>
  );
}
