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
    glow: "from-rose-600/20 via-pink-600/10 to-transparent",
    seal: "bg-rose-700 border-rose-500 shadow-rose-900/50",
    border: "border-rose-500/30",
    badge: "text-rose-300 bg-rose-950/60 border-rose-800/50",
    accentText: "text-rose-400",
  },
  "midnight-violet": {
    glow: "from-purple-600/20 via-indigo-600/10 to-transparent",
    seal: "bg-purple-700 border-purple-500 shadow-purple-900/50",
    border: "border-purple-500/30",
    badge: "text-purple-300 bg-purple-950/60 border-purple-800/50",
    accentText: "text-purple-400",
  },
  "champagne-gold": {
    glow: "from-amber-600/20 via-yellow-600/10 to-transparent",
    seal: "bg-amber-700 border-amber-500 shadow-amber-900/50",
    border: "border-amber-500/30",
    badge: "text-amber-300 bg-amber-950/60 border-amber-800/50",
    accentText: "text-amber-400",
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
        setIsSealed(false); // Automatically unseal for reduced motion
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
      className="relative min-h-[100dvh] w-full bg-[#0B0B12] text-slate-100 overflow-x-hidden flex flex-col items-center justify-center p-4 sm:p-8"
      style={{ overflowWrap: "anywhere" }}
    >
      {/* Ambient background glow */}
      <div
        className={`pointer-events-none absolute inset-0 bg-radial-gradient ${styles.glow} bg-no-repeat bg-center opacity-70`}
      />

      <div className="relative z-10 w-full max-w-lg mx-auto flex flex-col items-center">
        {mode === "preview" && (
          <div className="mb-4 px-3 py-1 rounded-full text-xs tracking-wider uppercase bg-white/10 text-white/70 border border-white/15">
            Interactive Live Preview
          </div>
        )}

        {/* Envelope & Letter Container */}
        <div
          className={`w-full rounded-2xl bg-white/[0.04] backdrop-blur-md border ${styles.border} p-6 sm:p-8 shadow-2xl transition-all duration-700 ease-out`}
        >
          {/* Header Greeting */}
          <div className="text-center mb-6">
            <span
              className={`inline-block text-xs uppercase tracking-widest px-3 py-1 rounded-full border mb-3 ${styles.badge}`}
            >
              {config.greeting || "To My Favorite Person"}
            </span>
            <h1
              data-testid="recipient-name"
              className="text-2xl sm:text-3xl font-serif font-medium text-white tracking-wide"
            >
              {config.partnerName || "Dearest"}
            </h1>
          </div>

          {/* Media Slot (optional, handles missing gracefully) */}
          {config.heroMediaId && (
            <div className="mb-6">
              <MediaSlot media={null} fallbackText="Shared Photo" />
            </div>
          )}

          {/* Signature Moment: Wax Seal and Revealed Letter */}
          <div
            data-testid="seal-container"
            className={isSealed && !prefersReducedMotion ? "flex flex-col items-center justify-center py-10 px-4 text-center" : "hidden"}
          >
            <button
              type="button"
              data-testid="wax-seal-button"
              onClick={() => setIsSealed(false)}
              className={`relative group flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 shadow-xl cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95 ${styles.seal}`}
              aria-label="Break the wax seal to read letter"
            >
              <span className="text-3xl sm:text-4xl select-none">💌</span>
              <span className="absolute -bottom-7 text-xs text-white/60 tracking-wider uppercase whitespace-nowrap font-sans">
                Tap to open
              </span>
            </button>
          </div>

          <div
            data-testid="unsealed-letter"
            className={`space-y-6 text-slate-300 leading-relaxed font-sans text-base sm:text-lg ${
              isSealed && !prefersReducedMotion ? "hidden" : prefersReducedMotion ? "" : "animate-fadeIn"
            }`}
          >
            <div
              data-testid="letter-message"
              className="whitespace-pre-wrap rounded-xl bg-black/20 p-5 sm:p-6 border border-white/5 font-light"
            >
              {config.message || "My heart is fuller every day because of you."}
            </div>

            <div className="text-right pt-2">
              <p className="text-xs text-white/50 uppercase tracking-widest mb-1">
                {config.signOff || "With all my love"}
              </p>
              <p
                data-testid="sender-name"
                className={`text-xl sm:text-2xl font-serif font-medium ${styles.accentText}`}
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
