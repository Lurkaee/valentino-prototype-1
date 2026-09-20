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
    glow: "from-rose-600/30 via-pink-600/15 to-transparent",
    sealBg: "bg-gradient-to-br from-rose-600 via-rose-700 to-[#7A1428]",
    sealBorder: "border-rose-400/80",
    sealShadow: "shadow-[0_0_40px_rgba(225,29,72,0.45),0_14px_28px_rgba(0,0,0,0.6)]",
    border: "border-rose-500/30",
    badge: "text-rose-200 bg-rose-950/70 border-rose-500/40",
    accentText: "text-rose-700",
    divider: "border-rose-500/20",
  },
  "midnight-violet": {
    glow: "from-purple-600/30 via-indigo-600/15 to-transparent",
    sealBg: "bg-gradient-to-br from-purple-600 via-purple-700 to-[#581C87]",
    sealBorder: "border-purple-400/80",
    sealShadow: "shadow-[0_0_40px_rgba(147,51,234,0.45),0_14px_28px_rgba(0,0,0,0.6)]",
    border: "border-purple-500/30",
    badge: "text-purple-200 bg-purple-950/70 border-purple-500/40",
    accentText: "text-purple-700",
    divider: "border-purple-500/20",
  },
  "champagne-gold": {
    glow: "from-amber-600/30 via-yellow-600/15 to-transparent",
    sealBg: "bg-gradient-to-br from-amber-600 via-amber-700 to-[#78350F]",
    sealBorder: "border-amber-400/80",
    sealShadow: "shadow-[0_0_40px_rgba(217,119,6,0.4),0_14px_28px_rgba(0,0,0,0.6)]",
    border: "border-amber-500/30",
    badge: "text-amber-200 bg-amber-950/70 border-amber-500/40",
    accentText: "text-amber-700",
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
      className="relative min-h-[100dvh] w-full bg-[#12030A] text-[#FAF8F5] overflow-x-hidden flex flex-col items-center justify-center p-4 sm:p-8 selection:bg-rose-500/30"
      style={{ overflowWrap: "anywhere" }}
    >
      {/* Ambient background sky glow */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 bg-gradient-to-b ${styles.glow} opacity-60 blur-3xl`}
      />

      <div className="relative z-10 w-full max-w-lg mx-auto flex flex-col items-center">
        {mode === "preview" && (
          <div className="mb-4 px-3 py-1 rounded-full text-[10px] tracking-widest uppercase bg-rose-950/70 text-rose-200 border border-rose-500/30 backdrop-blur-md">
            Live Preview
          </div>
        )}

        {/* Envelope & Letter Container */}
        <div
          className={`w-full rounded-3xl bg-[#1C0512]/90 backdrop-blur-2xl border ${styles.border} p-6 sm:p-10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] transition-all duration-700 ease-out`}
        >
          {/* Header Greeting */}
          <div className="text-center mb-8">
            <span
              className={`inline-block text-[11px] uppercase tracking-widest px-4 py-1 rounded-full border mb-3.5 shadow-sm ${styles.badge}`}
            >
              {config.greeting || "To My Favorite Person"}
            </span>
            <h1
              data-testid="recipient-name"
              className="text-3xl sm:text-4xl font-serif font-medium text-[#FAF8F5] tracking-wide leading-tight"
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
              {/* Pulsing ambient halo */}
              <div className="absolute -inset-4 rounded-full bg-rose-500/25 blur-lg animate-pulse" />

              <button
                type="button"
                data-testid="wax-seal-button"
                onClick={() => setIsSealed(false)}
                className={`relative group flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 ${styles.sealBg} ${styles.sealBorder} ${styles.sealShadow}`}
                aria-label="Break the wax seal to read letter"
              >
                {/* 3D debossed inner ring with handmade bevel */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-white/30 flex items-center justify-center bg-black/15 shadow-inner">
                  <span className="text-3xl sm:text-4xl select-none filter drop-shadow-md">💌</span>
                </div>
                <span className="absolute -bottom-8 text-xs text-rose-200/90 tracking-widest uppercase whitespace-nowrap font-sans font-medium">
                  Tap to open
                </span>
              </button>
            </div>
          </div>

          {/* Revealed Letter Content: Physical Cream Stationery Feel */}
          <div
            data-testid="unsealed-letter"
            className={`space-y-6 ${
              isSealed && !prefersReducedMotion ? "hidden" : prefersReducedMotion ? "" : "animate-fadeIn"
            }`}
          >
            {/* Tactile Warm Cream Paper Card */}
            <div className="relative rounded-2xl bg-[#FFFDF9] text-[#240B13] p-7 sm:p-9 border border-[#F3E8DC] shadow-[0_15px_35px_-10px_rgba(0,0,0,0.35)] overflow-hidden">
              {/* Paper grain subtle texture */}
              <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply bg-[radial-gradient(#800020_1px,transparent_1px)] [background-size:12px_12px]"
                aria-hidden="true"
              />

              {/* Gold rim accent on top */}
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />

              <div
                data-testid="letter-message"
                className="whitespace-pre-wrap font-serif font-normal text-base sm:text-lg leading-relaxed text-[#2C0D17] relative z-10"
              >
                {config.message || "My heart is fuller every day because of you."}
              </div>

              {/* Sign-off within the letter */}
              <div className="text-right pt-6 mt-6 border-t border-[#E8DCCF]/70 relative z-10">
                <p className="text-[11px] text-[#A06E7D] uppercase tracking-widest mb-1.5 font-sans">
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
    </div>
  );
};
