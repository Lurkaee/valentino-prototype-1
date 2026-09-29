"use client";

import React, { useState } from "react";
import { ModuleRenderProps } from "../types";
import { ComplimentsPublishedConfig } from "./schema";
import { ModuleHeader } from "../primitives/ModuleHeader";

export const ComplimentsModule: React.FC<ModuleRenderProps<ComplimentsPublishedConfig>> = ({
  config,
  theme = "midnight-rose",
  className = "",
}) => {
  const [currentCompliment, setCurrentCompliment] = useState<string | null>(null);
  const [seenIndices, setSeenIndices] = useState<number[]>([]);
  const [sparkleAnim, setSparkleAnim] = useState(false);

  if (!config.enabled || config.items.length === 0) {
    return null;
  }

  const items = config.items;

  const triggerCompliment = () => {
    let pool = items.map((_, i) => i).filter((i) => !seenIndices.includes(i));
    if (pool.length === 0) {
      // All seen, reset pool
      pool = items.map((_, i) => i);
      setSeenIndices([]);
    }

    const randomIdx = pool[Math.floor(Math.random() * pool.length)];
    setCurrentCompliment(items[randomIdx]);
    setSeenIndices((prev) => [...prev, randomIdx]);
    setSparkleAnim(true);
    setTimeout(() => setSparkleAnim(false), 800);
  };

  const isCloudNine =
    theme === "cloud-nine" ||
    theme === "blush-sky" ||
    theme === "peach-sorbet" ||
    theme === "lavender-mist";
  const isKage =
    theme === "kage" ||
    theme === "sanctuary-emerald" ||
    theme === "moonlit-stone" ||
    theme === "kyoto-crimson";

  const containerBg = isCloudNine
    ? "bg-white/70 border-pink-200 shadow-pink-100/50 text-slate-800"
    : isKage
    ? "bg-[#0a120e]/90 border-emerald-500/25 shadow-2xl text-emerald-100"
    : "bg-[#180816]/90 border-rose-500/30 shadow-2xl text-rose-100";

  const cardBg = isCloudNine
    ? "bg-white/90 border-pink-200 text-pink-950 shadow-md"
    : isKage
    ? "bg-emerald-950/60 border-emerald-500/30 text-emerald-100"
    : "bg-rose-950/60 border-rose-500/30 text-rose-100";

  const buttonStyle = isCloudNine
    ? "bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-white shadow-pink-200/50"
    : isKage
    ? "bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-emerald-50 shadow-emerald-900/40"
    : "bg-gradient-to-r from-rose-600 to-pink-700 hover:from-rose-500 hover:to-pink-600 text-white shadow-rose-950/50";

  const textBody = isCloudNine ? "text-pink-950" : isKage ? "text-emerald-50" : "text-rose-50";
  const textMuted = isCloudNine ? "text-pink-900/60" : isKage ? "text-emerald-300/60" : "text-rose-300/60";

  return (
    <div
      data-testid="compliments-module-container"
      className={`p-6 sm:p-8 rounded-3xl border backdrop-blur-xl transition-all duration-300 text-center ${containerBg} ${className}`}
    >
      <ModuleHeader
        title={config.title}
        subtitle={config.subtitle}
        icon="✨"
        theme={theme}
      />

      <div className="my-6 min-h-[120px] flex items-center justify-center">
        {currentCompliment ? (
          <div
            data-testid="compliment-display"
            className={`p-6 sm:p-8 rounded-2xl border max-w-lg mx-auto transform transition-all duration-300 ${cardBg} ${
              sparkleAnim ? "scale-105" : "scale-100"
            }`}
          >
            <span className="text-xl sm:text-2xl select-none block mb-2">💖</span>
            <p className={`font-romantic text-lg sm:text-2xl leading-relaxed italic ${textBody}`}>
              &ldquo;{currentCompliment}&rdquo;
            </p>
          </div>
        ) : (
          <div
            data-testid="compliment-placeholder"
            className={`text-xs sm:text-sm font-ui italic py-4 ${textMuted}`}
          >
            Tap below whenever you want a sweet little thought from me...
          </div>
        )}
      </div>

      <button
        type="button"
        data-testid="compliment-trigger-btn"
        onClick={triggerCompliment}
        className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-ui font-medium shadow-lg transition-all transform active:scale-95 cursor-pointer ${buttonStyle}`}
      >
        <span className="text-base select-none">✨</span>
        <span>{config.buttonLabel || "Tell Me Something Sweet"}</span>
      </button>

      {seenIndices.length > 0 && (
        <p className={`text-[11px] font-mono mt-3 ${textMuted}`}>
          Shared {seenIndices.length} of {items.length} little thoughts
        </p>
      )}
    </div>
  );
};
