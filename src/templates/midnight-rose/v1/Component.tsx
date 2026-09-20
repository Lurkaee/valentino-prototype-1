"use client";

import React, { useState, useEffect } from "react";
import { MidnightRosePublishedConfig } from "./schema";
import { RenderMode } from "../../types";
import { MediaSlot } from "../../shared/MediaSlot";

interface ComponentProps {
  config: MidnightRosePublishedConfig;
  mode: RenderMode;
}

const ACCENT_STYLES = {
  "crimson-rose": {
    glow: "from-rose-600/25 via-pink-600/10 to-transparent",
    sealBg: "bg-gradient-to-br from-rose-600 via-rose-700 to-crimson-800",
    sealBorder: "border-rose-400/80",
    sealShadow: "shadow-[0_0_35px_rgba(225,29,72,0.4),0_12px_24px_rgba(0,0,0,0.6)]",
    border: "border-rose-500/25",
    badge: "text-rose-300 bg-rose-950/60 border-rose-800/50",
    accentText: "text-rose-300",
    divider: "border-rose-500/20",
  },
  "midnight-violet": {
    glow: "from-purple-600/25 via-indigo-600/10 to-transparent",
    sealBg: "bg-gradient-to-br from-purple-600 via-purple-700 to-violet-800",
    sealBorder: "border-purple-400/80",
    sealShadow: "shadow-[0_0_35px_rgba(147,51,234,0.4),0_12px_24px_rgba(0,0,0,0.6)]",
    border: "border-purple-500/25",
    badge: "text-purple-300 bg-purple-950/60 border-purple-800/50",
    accentText: "text-purple-300",
    divider: "border-purple-500/20",
  },
  "champagne-gold": {
    glow: "from-amber-600/25 via-yellow-600/10 to-transparent",
    sealBg: "bg-gradient-to-br from-amber-600 via-amber-700 to-champagne-800",
    sealBorder: "border-amber-400/80",
    sealShadow: "shadow-[0_0_35px_rgba(217,119,6,0.35),0_12px_24px_rgba(0,0,0,0.6)]",
    border: "border-amber-500/25",
    badge: "text-amber-300 bg-amber-950/60 border-amber-800/50",
    accentText: "text-amber-300",
    divider: "border-amber-500/20",
  },
};

export const MidnightRoseComponent: React.FC<ComponentProps> = ({ config, mode }) => {
  const [isSealed, setIsSealed] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(mediaQuery.matches);
      if (mediaQuery.matches) {
        setIsSealed(false);
      }

      const listener = (e: MediaQueryListEvent) => {
        setPrefersReducedMotion(e.matches);
        if (e.matches) setIsSealed(false);
      };
      mediaQuery.addEventListener("change", listener);
      return () => mediaQuery.removeEventListener("change", listener);
    }
  }, []);

  const styles = ACCENT_STYLES[config.accentTheme] || ACCENT_STYLES["crimson-rose"];

  return (
    <div
      data-testid="experience-container"
      className="relative min-h-[100dvh] w-full bg-[#07070A] text-[#FAF8F5] overflow-x-hidden flex flex-col items-center justify-center p-4 sm:p-8"
      style={{ overflowWrap: "anywhere" }}
    >
      {/* Ambient background glow */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 bg-gradient-to-b ${styles.glow} opacity-60 blur-3xl`}
      />

      <div className="relative z-10 w-full max-w-lg mx-auto flex flex-col items-center">
        {mode === "preview" && (
          <div className="mb-4 px-3 py-1 rounded-full text-[10px] tracking-widest uppercase bg-white/10 text-white/70 border border-white/15 backdrop-blur-sm">
            Live Preview
          </div>
        )}

        {/* Envelope & Letter Container */}
        <div
          className={`w-full rounded-3xl bg-white/[0.03] backdrop-blur-xl border ${styles.border} p-6 sm:p-10 shadow-2xl transition-all duration-700 ease-out`}
        >
          {/* Header Greeting */}
          <div className="text-center mb-8">
            <span
              className={`inline-block text-[11px] uppercase tracking-widest px-3.5 py-1 rounded-full border mb-3.5 ${styles.badge}`}
            >
              {config.greeting || "To My Favorite Person"}
            </span>
            <h1
              data-testid="recipient-name"
              className="text-3xl sm:text-4xl font-serif font-medium text-white tracking-wide leading-tight"
            >
              {config.partnerName || "Dearest"}
            </h1>
          </div>

          {/* Media Slot */}
          {config.heroMediaId && (
            <div className="mb-6">
              <MediaSlot media={null} fallbackText="Shared Photo" />
            </div>
          )}

          {/* Signature Moment: Wax Seal and Revealed Letter */}
          <div
            data-testid="seal-container"
            className={isSealed && !prefersReducedMotion ? "flex flex-col items-center justify-center py-12 px-4 text-center" : "hidden"}
          >
            <div className="relative">
              {/* Pulsing ambient ring */}
              <div className="absolute -inset-3 rounded-full bg-rose-500/20 blur-md animate-pulse" />

              <button
                type="button"
                data-testid="wax-seal-button"
                onClick={() => setIsSealed(false)}
                className={`relative group flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 ${styles.sealBg} ${styles.sealBorder} ${styles.sealShadow}`}
                aria-label="Break the wax seal to read letter"
              >
                {/* 3D debossed inner ring */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-white/20 flex items-center justify-center bg-black/10 shadow-inner">
                  <span className="text-3xl sm:text-4xl select-none filter drop-shadow-md">💌</span>
                </div>
                <span className="absolute -bottom-8 text-xs text-ivory-300 tracking-wider uppercase whitespace-nowrap font-sans font-medium">
                  Tap to open
                </span>
              </button>
            </div>
          </div>

          {/* Revealed Letter Content */}
          <div
            data-testid="unsealed-letter"
            className={`space-y-8 text-ivory-200 leading-relaxed font-sans ${
              isSealed && !prefersReducedMotion ? "hidden" : prefersReducedMotion ? "" : "animate-fadeIn"
            }`}
          >
            <div
              data-testid="letter-message"
              className="whitespace-pre-wrap rounded-2xl bg-black/30 p-6 sm:p-8 border border-white/[0.06] font-light text-base sm:text-lg leading-relaxed shadow-inner"
            >
              {config.message || "My heart is fuller every day because of you."}
            </div>

            <div className="text-right pt-4 border-t border-white/[0.06]">
              <p className="text-xs text-ivory-400 uppercase tracking-widest mb-1.5 font-sans">
                {config.signOff || "With all my love"}
              </p>
              <p
                data-testid="sender-name"
                className={`text-2xl sm:text-3xl font-serif font-medium ${styles.accentText}`}
              >
                {config.senderName || "Yours Always"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
