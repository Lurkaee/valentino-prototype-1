"use client";

import React, { useState, useEffect } from "react";

interface RevealCardProps {
  isRevealed?: boolean;
  onReveal?: () => void;
  prompt: string;
  hint?: string;
  theme?: string;
  icon?: string;
  children: React.ReactNode;
  testId?: string;
}

export const RevealCard: React.FC<RevealCardProps> = ({
  isRevealed: controlledRevealed,
  onReveal,
  prompt,
  hint,
  theme = "midnight-rose",
  icon = "🔐",
  children,
  testId,
}) => {
  const [internalRevealed, setInternalRevealed] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const revealed = controlledRevealed !== undefined ? controlledRevealed : internalRevealed;

  useEffect(() => {
    if (typeof window !== "undefined") {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(mq.matches);
      const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    }
  }, []);

  const handleReveal = () => {
    if (onReveal) {
      onReveal();
    } else {
      setInternalRevealed(true);
    }
  };

  const isCloudNine = theme === "cloud-nine" || theme === "blush-sky" || theme === "peach-sorbet" || theme === "lavender-mist";
  const isKage = theme === "kage";

  if (revealed) {
    return (
      <div
        data-testid={testId ? `${testId}-revealed` : "reveal-card-revealed"}
        className={`w-full transition-all duration-500 ${
          prefersReducedMotion ? "" : "animate-fadeIn"
        }`}
      >
        {children}
      </div>
    );
  }

  let lockedButtonStyles = "group relative w-full flex flex-col items-center justify-center p-8 rounded-2xl border transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 ";
  if (isCloudNine) {
    lockedButtonStyles += "bg-pink-50/70 hover:bg-pink-100/80 border-pink-200/80 hover:border-pink-300 text-pink-900 focus:ring-pink-400 shadow-sm";
  } else if (isKage) {
    lockedButtonStyles += "bg-[#111915]/80 hover:bg-[#16221c]/90 border-emerald-800/40 hover:border-emerald-600/50 text-[#d8e4dc] focus:ring-emerald-400 shadow-inner";
  } else {
    lockedButtonStyles += "bg-[#200615]/80 hover:bg-[#2b081c]/95 border-rose-500/30 hover:border-rose-400/50 text-rose-100 focus:ring-rose-400 shadow-lg";
  }

  return (
    <button
      type="button"
      data-testid={testId || "reveal-card-trigger"}
      onClick={handleReveal}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleReveal();
        }
      }}
      className={lockedButtonStyles}
      aria-expanded={revealed}
      aria-label={`${prompt}. Tap to reveal.`}
    >
      <div className="text-3xl sm:text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <p className="text-base sm:text-lg font-serif font-medium mb-1.5 text-center">
        {prompt}
      </p>
      {hint && (
        <span className="text-xs uppercase tracking-widest opacity-70 font-sans">
          {hint}
        </span>
      )}
      <div className="mt-4 px-4 py-1 rounded-full text-[11px] font-sans uppercase tracking-wider bg-white/10 group-hover:bg-white/20 transition-colors">
        Tap to Reveal
      </div>
    </button>
  );
};
