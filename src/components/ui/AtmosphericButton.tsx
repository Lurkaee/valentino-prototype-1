"use client";

import React from "react";
import Link from "next/link";

export interface AtmosphericButtonConfig {
  mode: "light" | "dark";
  container: string;
  text: string;
  arrow: string;
  hoverHighlight: string;
}

export const ATMOSPHERIC_BUTTON_THEMES: Record<string, AtmosphericButtonConfig> = {
  "cloud-nine": {
    mode: "light",
    container:
      "bg-[#FFF8F3]/95 hover:bg-white text-[#1A0311] border border-pink-900/15 shadow-[0_4px_16px_rgba(244,114,182,0.25)] hover:shadow-[0_6px_22px_rgba(244,114,182,0.38)]",
    text: "text-[#1A0311] group-hover:text-[#9F1239]",
    arrow: "text-[#9F1239]",
    hoverHighlight: "rgba(244, 114, 182, 0.2)",
  },
  "midnight-rose": {
    mode: "dark",
    container:
      "bg-[#250414]/92 hover:bg-[#32061B]/95 text-[#FFF5F7] border border-rose-400/40 shadow-[0_4px_20px_rgba(225,29,72,0.4)] hover:shadow-[0_6px_26px_rgba(225,29,72,0.55)]",
    text: "text-[#FFF5F7] group-hover:text-white",
    arrow: "text-rose-300",
    hoverHighlight: "rgba(225, 29, 72, 0.35)",
  },
  kage: {
    mode: "dark",
    container:
      "bg-[#091512]/92 hover:bg-[#0E201B]/95 text-[#F0FDF4] border border-emerald-400/35 shadow-[0_4px_20px_rgba(16,185,129,0.3)] hover:shadow-[0_6px_26px_rgba(16,185,129,0.45)]",
    text: "text-[#F0FDF4] group-hover:text-white",
    arrow: "text-emerald-300",
    hoverHighlight: "rgba(16, 185, 129, 0.3)",
  },
  "apricot-film": {
    mode: "dark",
    container:
      "bg-[#200F05]/92 hover:bg-[#2D1608]/95 text-[#FFFBEB] border border-amber-400/40 shadow-[0_4px_20px_rgba(245,158,11,0.35)] hover:shadow-[0_6px_26px_rgba(245,158,11,0.5)]",
    text: "text-[#FFFBEB] group-hover:text-white",
    arrow: "text-amber-300",
    hoverHighlight: "rgba(245, 158, 11, 0.35)",
  },
  "wildflower-paper": {
    mode: "light",
    container:
      "bg-[#FAF6EE]/95 hover:bg-[#FFFDF9] text-[#1A0311] border border-amber-900/15 shadow-[0_4px_16px_rgba(180,120,50,0.2)] hover:shadow-[0_6px_22px_rgba(180,120,50,0.32)]",
    text: "text-[#1A0311] group-hover:text-[#854D0E]",
    arrow: "text-amber-700",
    hoverHighlight: "rgba(234, 179, 8, 0.25)",
  },
  "ocean-letter": {
    mode: "dark",
    container:
      "bg-[#06182B]/92 hover:bg-[#0A243F]/95 text-[#F0F9FF] border border-blue-400/40 shadow-[0_4px_20px_rgba(59,130,246,0.35)] hover:shadow-[0_6px_26px_rgba(59,130,246,0.5)]",
    text: "text-[#F0F9FF] group-hover:text-white",
    arrow: "text-sky-300",
    hoverHighlight: "rgba(59, 130, 246, 0.35)",
  },
};

export interface AtmosphericButtonProps {
  href: string;
  worldId: string;
  worldName: string;
  className?: string;
  ariaLabel?: string;
}

/**
 * AtmosphericButton (Phase 6.4.2)
 *
 * Environment-aware tactile portal button.
 * - LIGHT ENVIRONMENTS (Cloud Nine, Wildflower Paper):
 *   Warm deckled paper / ivory surface, deep espresso-berry text, visible edge, gentle shadow.
 * - DARK ENVIRONMENTS (Midnight Rose, Kage, Apricot Film, Ocean Letter):
 *   Translucent tinted velvet / ink / glass surface, ivory foreground, luminous edge, controlled shadow.
 *
 * Features:
 * - Medium-small footprint
 * - Elegant tactile radius with inner ambient light
 * - Crisp WCAG-compliant typography
 * - Smooth 4-6px arrow translation on hover
 * - Fast, non-magnetic interaction
 */
export const AtmosphericButton: React.FC<AtmosphericButtonProps> = ({
  href,
  worldId,
  worldName,
  className = "",
  ariaLabel,
}) => {
  const theme =
    ATMOSPHERIC_BUTTON_THEMES[worldId] ?? ATMOSPHERIC_BUTTON_THEMES["cloud-nine"];

  return (
    <Link
      href={href}
      aria-label={ariaLabel || `Enter ${worldName} atmosphere`}
      className={`group relative inline-flex items-center gap-2.5 px-6 py-2.5 sm:px-7 sm:py-3 rounded-full text-sm font-semibold tracking-wide backdrop-blur-md transition-all duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] ${theme.container} ${className}`}
      style={{
        boxShadow:
          theme.mode === "light"
            ? "0 4px 16px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.9)"
            : "0 6px 20px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.12)",
      }}
    >
      <span className={`transition-colors duration-300 ${theme.text}`}>
        Enter {worldName}
      </span>
      <span
        aria-hidden="true"
        className={`inline-block transition-transform duration-300 ease-out group-hover:translate-x-1.5 ${theme.arrow}`}
      >
        →
      </span>
    </Link>
  );
};

export default AtmosphericButton;
