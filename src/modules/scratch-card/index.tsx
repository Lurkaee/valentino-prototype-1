"use client";

import React, { useState, useRef, useEffect } from "react";
import { ModuleRenderProps } from "../types";
import { ScratchCardPublishedConfig } from "./schema";
import { ModuleHeader } from "../primitives/ModuleHeader";

export const ScratchCardModule: React.FC<ModuleRenderProps<ScratchCardPublishedConfig>> = ({
  config,
  theme = "midnight-rose",
  className = "",
}) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isScratching = useRef(false);

  // Draw silver/rose foil on mount
  useEffect(() => {
    if (!config.enabled || !config.hiddenMessage) return;
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Foil gradient
    const grad = ctx.createLinearGradient(0, 0, width, height);
    if (theme.includes("cloud")) {
      grad.addColorStop(0, "#FBCFE8");
      grad.addColorStop(0.5, "#F472B6");
      grad.addColorStop(1, "#FBCFE8");
    } else if (theme.includes("kage")) {
      grad.addColorStop(0, "#334155");
      grad.addColorStop(0.5, "#1E293B");
      grad.addColorStop(1, "#475569");
    } else {
      grad.addColorStop(0, "#9F1239");
      grad.addColorStop(0.3, "#E11D48");
      grad.addColorStop(0.7, "#BE123C");
      grad.addColorStop(1, "#881337");
    }

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Front text
    ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
    ctx.font = "bold 14px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(config.frontMessage || "Scratch to Reveal ✦", width / 2, height / 2);
  }, [theme, isRevealed, config.frontMessage, config.enabled, config.hiddenMessage]);

  if (!config.enabled || !config.hiddenMessage) {
    return null;
  }

  const scratch = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    isScratching.current = true;
    scratch(e.clientX, e.clientY);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isScratching.current) return;
    scratch(e.clientX, e.clientY);
  };

  const handlePointerUp = () => {
    isScratching.current = false;
  };

  const handleRevealAll = () => {
    setIsRevealed(true);
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
    ? "bg-[#0c120f]/90 border-emerald-500/25 shadow-2xl text-emerald-100"
    : "bg-[#180a14]/90 border-rose-500/30 shadow-2xl text-rose-100";

  return (
    <div
      data-testid="scratch-card-module-container"
      className={`p-6 sm:p-8 rounded-3xl border backdrop-blur-xl transition-all duration-300 text-center ${containerBg} ${className}`}
    >
      <ModuleHeader
        title={config.title}
        subtitle={config.subtitle}
        icon="✨"
        theme={theme}
      />

      <div className="my-6 flex flex-col items-center justify-center">
        <div
          data-testid="scratch-card-wrapper"
          className="relative w-full max-w-sm h-48 rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-black/60 flex items-center justify-center p-6 select-none"
        >
          {/* Hidden Message Layer */}
          <div
            data-testid="scratch-hidden-content"
            className="text-center font-romantic text-xl sm:text-2xl leading-relaxed text-white font-medium"
          >
            &ldquo;{config.hiddenMessage}&rdquo;
          </div>

          {/* Canvas Foil Overlay */}
          {!isRevealed && (
            <canvas
              ref={canvasRef}
              width={384}
              height={192}
              data-testid="scratch-canvas"
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              className="absolute inset-0 w-full h-full cursor-crosshair touch-none"
              aria-label="Scratch card foil surface. Scratch with mouse or finger to reveal message."
            />
          )}
        </div>
      </div>

      <div className="flex items-center justify-center gap-3">
        {!isRevealed ? (
          <button
            type="button"
            data-testid="scratch-reveal-btn"
            onClick={handleRevealAll}
            className="px-5 py-2 rounded-full text-xs font-ui font-medium border border-rose-400/40 bg-rose-500/20 text-rose-200 hover:bg-rose-500/30 transition-all cursor-pointer"
          >
            Reveal Hidden Surprise ✦
          </button>
        ) : (
          <span className="text-xs text-emerald-400 font-ui font-medium flex items-center gap-1.5">
            <span>✓</span> <span>Surprise Uncovered!</span>
          </span>
        )}
      </div>
    </div>
  );
};
