"use client";

import React, { useState, useEffect, type CSSProperties } from "react";
import { ShaderButtons } from "@/shaders/ShaderButtons";

export type ValentinePlasmaTheme =
  | "valentine"
  | "midnightRose"
  | "cloudNine"
  | "goldenHour"
  | "stardust";

export interface ValentinePlasmaThemeConfig {
  hue: number;
  saturation: number;
  brightness: number;
  mode: "light" | "dark";
  glowColor: string;
  borderColor: string;
  textColor: string;
}

export const VALENTINE_PLASMA_THEMES: Record<
  ValentinePlasmaTheme,
  ValentinePlasmaThemeConfig
> = {
  // Baby Pink ↓ Soft Blush ↓ Rose ↓ Lavender (Primary Valentine visual direction)
  valentine: {
    hue: 118,
    saturation: 1.05,
    brightness: 1.08,
    mode: "dark",
    glowColor: "rgba(255, 110, 180, 0.35)",
    borderColor: "rgba(255, 182, 217, 0.3)",
    textColor: "#FFF0F6",
  },
  // Deep Rose + Crimson + Violet
  midnightRose: {
    hue: 132,
    saturation: 1.25,
    brightness: 0.96,
    mode: "dark",
    glowColor: "rgba(225, 29, 72, 0.4)",
    borderColor: "rgba(244, 63, 94, 0.35)",
    textColor: "#FFE4E6",
  },
  // Baby Pink + Lavender + Pearl
  cloudNine: {
    hue: 102,
    saturation: 0.95,
    brightness: 1.15,
    mode: "dark",
    glowColor: "rgba(216, 194, 255, 0.38)",
    borderColor: "rgba(220, 200, 255, 0.35)",
    textColor: "#FAF5FF",
  },
  // Peach + Coral + Champagne
  goldenHour: {
    hue: -175,
    saturation: 1.1,
    brightness: 1.05,
    mode: "dark",
    glowColor: "rgba(251, 146, 60, 0.35)",
    borderColor: "rgba(253, 186, 116, 0.35)",
    textColor: "#FFF7ED",
  },
  // Violet + Orchid + Pink
  stardust: {
    hue: 82,
    saturation: 1.15,
    brightness: 1.05,
    mode: "dark",
    glowColor: "rgba(185, 149, 232, 0.4)",
    borderColor: "rgba(192, 132, 252, 0.35)",
    textColor: "#F3E8FF",
  },
};

export interface ValentinePlasmaButtonProps {
  /** Optional element id */
  id?: string;
  /** Visual theme for the plasma shader and surrounding aura */
  theme?: ValentinePlasmaTheme;
  /** Semantic label for the button */
  label?: string;
  /** Optional secondary subtitle or hint */
  sublabel?: string;
  /** Click handler */
  onClick?: () => void;
  /** Disable interactions */
  disabled?: boolean;
  /** Additional container classes */
  className?: string;
  /** Custom style overrides */
  style?: CSSProperties;
  /** Explicit hue override (-180 to 180) */
  hue?: number;
  /** Explicit saturation override (0 to 2) */
  saturation?: number;
  /** Explicit brightness override (0.35 to 1.65) */
  brightness?: number;
  /** Explicit mode override */
  mode?: "light" | "dark";
  /** Sizing variant */
  size?: "sm" | "md" | "lg";
  /** Show ambient romantic atmospheric glow behind button */
  showGlow?: boolean;
}

/**
 * ValentinePlasmaButton
 * Valentino Adapter for ThreeUI ShaderButtons (plasma-button).
 * Transforms the deep-blue laboratory aesthetic into romantic, soft,
 * luminous Valentine baby-pink/lavender/plum visual technology.
 */
export const ValentinePlasmaButton: React.FC<ValentinePlasmaButtonProps> = ({
  id,
  theme = "valentine",
  label = "SURPRISE ME",
  sublabel,
  onClick,
  disabled = false,
  className = "",
  style,
  hue,
  saturation,
  brightness,
  mode,
  size = "md",
  showGlow = true,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const media = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(media.matches);
      const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
      media.addEventListener("change", listener);
      return () => media.removeEventListener("change", listener);
    }
  }, []);

  const config = VALENTINE_PLASMA_THEMES[theme] ?? VALENTINE_PLASMA_THEMES.valentine;
  const effectiveHue = hue !== undefined ? hue : config.hue;
  const effectiveSaturation = saturation !== undefined ? saturation : config.saturation;
  const effectiveBrightness = brightness !== undefined ? brightness : config.brightness;
  const effectiveMode = mode ?? config.mode;

  // Sizing dimensions matching ThreeUI authored button proportions (250x70)
  const sizeStyles = {
    sm: {
      width: "w-[220px]",
      height: "h-[62px]",
      scale: "scale-[0.88]",
      fontSize: "text-xs",
    },
    md: {
      width: "w-[260px]",
      height: "h-[74px]",
      scale: "scale-100",
      fontSize: "text-sm",
    },
    lg: {
      width: "w-[290px]",
      height: "h-[82px]",
      scale: "scale-[1.12]",
      fontSize: "text-base",
    },
  }[size];

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsPressed(true);
      onClick?.();
      setTimeout(() => setIsPressed(false), 200);
    }
  };

  return (
    <div
      className={`relative inline-flex flex-col items-center justify-center max-w-full select-none ${className}`}
      style={style}
    >
      {/* 1. Surrounding Atmospheric Romantic Glow (Gaussian Aura) */}
      {showGlow && (
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-3xl pointer-events-none transition-all duration-700 ease-out"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${config.glowColor} 0%, rgba(0,0,0,0) 70%)`,
            filter: "blur(20px)",
            opacity: disabled ? 0.2 : isHovered ? 0.9 : 0.55,
            transform: isHovered && !prefersReducedMotion ? "scale(1.15)" : "scale(1)",
          }}
        />
      )}

      {/* 2. Interactive Semantic Container */}
      <div
        id={id}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-label={label}
        aria-disabled={disabled}
        onClick={disabled ? undefined : onClick}
        onKeyDown={handleKeyDown}
        onMouseEnter={() => !disabled && setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setIsPressed(false);
        }}
        onMouseDown={() => !disabled && setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onTouchStart={() => !disabled && setIsPressed(true)}
        onTouchEnd={() => setIsPressed(false)}
        className={`relative ${sizeStyles.width} ${sizeStyles.height} rounded-2xl overflow-hidden cursor-pointer
          transition-all duration-300 ease-[cubic-bezier(0.34,1.4,0.5,1)]
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#12030A]
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}
          ${isHovered && !disabled && !prefersReducedMotion ? "-translate-y-0.5 shadow-xl shadow-rose-950/40" : ""}
          ${isPressed && !disabled && !prefersReducedMotion ? "translate-y-0.5 scale-[0.98]" : ""}
        `}
        style={{
          border: `1px solid ${config.borderColor}`,
          boxShadow: isHovered
            ? `0 16px 36px -8px ${config.glowColor}, inset 0 1px 0 rgba(255,255,255,0.2)`
            : `0 8px 24px -6px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)`,
        }}
      >
        {/* 3. ThreeUI ShaderButtons Visual Primitive Canvas */}
        <div
          aria-hidden="true"
          className="absolute inset-0 w-full h-full pointer-events-none flex items-center justify-center overflow-hidden"
        >
          <div
            className={`w-[260px] h-[74px] flex items-center justify-center transform ${sizeStyles.scale} transition-transform duration-300`}
          >
            <ShaderButtons
              variant="plasma-button"
              mode={effectiveMode}
              hue={effectiveHue}
              saturation={effectiveSaturation}
              brightness={effectiveBrightness}
              className="w-full h-full border-0 pointer-events-none"
              style={{
                borderRadius: "1rem",
              }}
            />
          </div>
        </div>

        {/* 4. Semantic Surface Typography Overlay */}
        <div
          aria-hidden="true"
          className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none px-4 text-center"
        >
          <div
            className="px-4 py-1 rounded-full flex flex-col items-center justify-center transition-all duration-300"
            style={{
              background: "rgba(12, 2, 8, 0.82)",
              backdropFilter: "blur(6px)",
              border: `1px solid ${config.borderColor}`,
              boxShadow: isHovered
                ? `0 4px 16px rgba(0, 0, 0, 0.7), 0 0 12px ${config.glowColor}`
                : "0 2px 10px rgba(0, 0, 0, 0.6)",
            }}
          >
            <span
              className={`font-semibold tracking-[0.22em] indent-[0.22em] uppercase transition-all duration-300 ${sizeStyles.fontSize}`}
              style={{
                color: config.textColor,
                textShadow: isHovered
                  ? "0 0 12px rgba(255, 180, 215, 0.9)"
                  : "0 0 8px rgba(255, 150, 195, 0.6)",
              }}
            >
              {label}
            </span>
            {sublabel && (
              <span
                className="text-[9px] tracking-wider uppercase opacity-80"
                style={{ color: config.textColor }}
              >
                {sublabel}
              </span>
            )}
          </div>
        </div>

        {/* 5. Delicate Glass Rim Highlight */}
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 40%, rgba(0,0,0,0.15) 100%)",
          }}
        />
      </div>
    </div>
  );
};

export default ValentinePlasmaButton;
