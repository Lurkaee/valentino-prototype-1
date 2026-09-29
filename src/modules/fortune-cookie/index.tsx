"use client";

import React, { useState } from "react";
import { ModuleRenderProps } from "../types";
import { FortuneCookiePublishedConfig } from "./schema";
import { ModuleHeader } from "../primitives/ModuleHeader";

export const FortuneCookieModule: React.FC<ModuleRenderProps<FortuneCookiePublishedConfig>> = ({
  config,
  theme = "midnight-rose",
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentFortune, setCurrentFortune] = useState<string>(() => config.fortunes[0] || "");

  if (!config.enabled || config.fortunes.length === 0) {
    return null;
  }

  const handleCrack = () => {
    if (!isOpen) {
      const randomFortune = config.fortunes[Math.floor(Math.random() * config.fortunes.length)];
      setCurrentFortune(randomFortune);
      setIsOpen(true);
    } else {
      // Crack a new one
      const randomFortune = config.fortunes[Math.floor(Math.random() * config.fortunes.length)];
      setCurrentFortune(randomFortune);
    }
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
    ? "bg-[#0b130f]/90 border-emerald-500/25 shadow-2xl text-emerald-100"
    : "bg-[#180a14]/90 border-rose-500/30 shadow-2xl text-rose-100";

  return (
    <div
      data-testid="fortune-cookie-module-container"
      className={`p-6 sm:p-8 rounded-3xl border backdrop-blur-xl transition-all duration-300 text-center ${containerBg} ${className}`}
    >
      <ModuleHeader
        title={config.title}
        subtitle={config.subtitle}
        icon="🥠"
        theme={theme}
      />

      <div className="my-8 flex flex-col items-center justify-center">
        {/* Virtual Cookie Visual */}
        <div
          data-testid="cookie-visual"
          onClick={handleCrack}
          className="relative cursor-pointer transition-transform hover:scale-105 active:scale-95 select-none"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleCrack();
            }
          }}
          aria-label={isOpen ? "Cookie cracked open. Tap for another fortune." : "Tap to crack open the fortune cookie."}
        >
          <div className="text-6xl sm:text-7xl filter drop-shadow-lg animate-pulse">
            {isOpen ? "🥠✨" : "🥠"}
          </div>
        </div>

        {/* Revealed Fortune Slip */}
        {isOpen && (
          <div
            data-testid="fortune-slip"
            className="mt-6 p-6 sm:p-8 bg-[#FFFBF0] text-[#3D2817] rounded-xl border border-amber-300/80 shadow-2xl max-w-md mx-auto transform transition-all duration-500 animate-in fade-in zoom-in-95"
          >
            <div className="text-xs uppercase font-mono tracking-widest text-amber-700/70 mb-2">
              ✦ Romantic Prediction ✦
            </div>
            <p className="font-romantic text-lg sm:text-xl leading-relaxed italic font-medium">
              &ldquo;{currentFortune}&rdquo;
            </p>
            <div className="mt-4 text-[10px] text-amber-900/40 font-mono tracking-widest uppercase">
              Lucky numbers: 2 · 14 · ∞
            </div>
          </div>
        )}
      </div>

      <button
        type="button"
        data-testid="crack-cookie-btn"
        onClick={handleCrack}
        className="px-6 py-2.5 rounded-full text-xs font-ui font-medium border border-amber-400/40 bg-amber-500/20 text-amber-200 hover:bg-amber-500/30 transition-all cursor-pointer"
      >
        {isOpen ? "Crack Another Cookie 🥠" : "Break Cookie to Reveal ✦"}
      </button>
    </div>
  );
};
