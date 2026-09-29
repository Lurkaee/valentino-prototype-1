"use client";

import React, { useState } from "react";
import { ModuleRenderProps } from "../types";
import { FinalePublishedConfig } from "./schema";
import { PrintKeepsake } from "@/components/keepsakes/PrintKeepsake";

export const FinaleModule: React.FC<ModuleRenderProps<FinalePublishedConfig>> = ({
  config,
  publicId,
  theme = "midnight-rose",
  className = "",
}) => {
  const [sealed, setSealed] = useState(false);

  if (!config.enabled || !config.declaration) {
    return null;
  }

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
    ? "bg-gradient-to-b from-white/80 to-pink-50/90 border-pink-200 shadow-2xl text-slate-800"
    : isKage
    ? "bg-gradient-to-b from-[#0a120e]/95 to-black/95 border-emerald-500/30 shadow-2xl text-emerald-100"
    : "bg-gradient-to-b from-[#1b0816]/95 to-black/95 border-rose-500/35 shadow-2xl text-rose-100";

  const sealColor = isCloudNine
    ? "bg-pink-500 text-white shadow-pink-300"
    : isKage
    ? "bg-emerald-700 text-emerald-100 shadow-emerald-950"
    : "bg-rose-700 text-rose-100 shadow-rose-950";

  const textHeading = isCloudNine ? "text-pink-950" : isKage ? "text-emerald-50" : "text-white/95";
  const textBody = isCloudNine ? "text-pink-950/90" : isKage ? "text-emerald-100/90" : "text-white/90";
  const textSign = isCloudNine ? "text-pink-900/70" : isKage ? "text-emerald-300/70" : "text-white/70";
  const keepsakeBtn = isCloudNine
    ? "border-pink-300 bg-pink-100/80 hover:bg-pink-200/80 text-pink-900"
    : "border-white/20 bg-white/5 hover:bg-white/10 text-white/80";

  return (
    <div
      data-testid="finale-module-container"
      className={`p-8 sm:p-12 rounded-3xl border backdrop-blur-2xl transition-all duration-500 text-center relative overflow-hidden ${containerBg} ${className}`}
    >
      {/* Decorative Starlight / Lantern Elements */}
      <div className="absolute top-4 left-6 text-xl opacity-30 select-none">✦</div>
      <div className="absolute top-6 right-8 text-xl opacity-30 select-none">✦</div>
      <div className="absolute bottom-6 left-12 text-sm opacity-20 select-none">✦</div>

      <div className="max-w-xl mx-auto space-y-6">
        <span className="text-3xl sm:text-4xl select-none block animate-bounce">
          {isCloudNine ? "☁️💖" : isKage ? "⛩️🏮" : "🌹✨"}
        </span>

        {config.title && (
          <h3 className={`font-display font-medium text-2xl sm:text-3xl tracking-tight ${textHeading}`}>
            {config.title}
          </h3>
        )}

        <div className="relative py-4">
          <p className={`font-romantic text-xl sm:text-2xl leading-relaxed italic ${textBody}`}>
            &ldquo;{config.declaration}&rdquo;
          </p>
        </div>

        {config.signature && (
          <p className={`font-display text-base sm:text-lg italic ${textSign}`}>
            — {config.signature}
          </p>
        )}

        {/* Seal Our Journey Interactive Button */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            data-testid="finale-seal-journey-btn"
            onClick={() => setSealed((s) => !s)}
            className={`px-6 py-3 rounded-full text-xs font-ui font-medium shadow-xl transition-all transform active:scale-95 cursor-pointer flex items-center gap-2 ${sealColor}`}
          >
            <span>{sealed ? "✓ Sealed in My Heart" : "Seal Our Journey Forever"}</span>
            <span>{sealed ? "💖" : "💌"}</span>
          </button>

          {config.showKeepsakePrompt && (
            <PrintKeepsake
              className={`text-xs font-ui border px-4 py-2.5 rounded-full ${keepsakeBtn}`}
            />
          )}
        </div>
      </div>
    </div>
  );
};
