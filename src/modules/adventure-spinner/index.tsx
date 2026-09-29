"use client";

import React, { useState } from "react";
import { ModuleRenderProps } from "../types";
import { AdventureSpinnerPublishedConfig } from "./schema";
import { ModuleHeader } from "../primitives/ModuleHeader";

export const AdventureSpinnerModule: React.FC<ModuleRenderProps<AdventureSpinnerPublishedConfig>> = ({
  config,
  theme = "midnight-rose",
  className = "",
}) => {
  const [selectedWinner, setSelectedWinner] = useState<string | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotationDegrees, setRotationDegrees] = useState(0);

  if (!config.enabled || config.options.length < 2) {
    return null;
  }

  const options = config.options;
  const segmentAngle = 360 / options.length;

  const handleSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setSelectedWinner(null);

    // Pick random index
    const winnerIdx = Math.floor(Math.random() * options.length);
    // Extra full spins (4-6 rotations)
    const extraRotations = (4 + Math.floor(Math.random() * 3)) * 360;
    // Align segment to top needle (270 deg or 0 deg offset)
    const targetDeg = rotationDegrees + extraRotations + (360 - (winnerIdx * segmentAngle + segmentAngle / 2));
    setRotationDegrees(targetDeg);

    setTimeout(() => {
      setSelectedWinner(options[winnerIdx].label);
      setIsSpinning(false);
    }, 3200);
  };

  const handleQuickPick = () => {
    const winnerIdx = Math.floor(Math.random() * options.length);
    setSelectedWinner(options[winnerIdx].label);
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
    ? "bg-[#0b120e]/90 border-emerald-500/25 shadow-2xl text-emerald-100"
    : "bg-[#180915]/90 border-rose-500/30 shadow-2xl text-rose-100";

  const winnerCardBg = isCloudNine
    ? "bg-pink-100/95 border-pink-300 text-pink-950"
    : isKage
    ? "bg-emerald-950/80 border-emerald-500/40 text-emerald-100"
    : "bg-rose-950/80 border-rose-500/40 text-rose-100";

  const textWinner = isCloudNine ? "text-pink-950" : isKage ? "text-emerald-50" : "text-white";
  const fallbackBtn = isCloudNine
    ? "border-pink-300 bg-pink-100/80 hover:bg-pink-200/80 text-pink-900"
    : "border-white/20 bg-white/5 hover:bg-white/10 text-white/80";

  const spinColors = isCloudNine
    ? ["#FBCFE8", "#F472B6", "#DDD6FE", "#BAE6FD", "#FED7AA"]
    : isKage
    ? ["#064E3B", "#047857", "#0F766E", "#1E293B", "#334155"]
    : ["#881337", "#9F1239", "#BE123C", "#E11D48", "#4C0519"];

  return (
    <div
      data-testid="adventure-spinner-module-container"
      className={`p-6 sm:p-8 rounded-3xl border backdrop-blur-xl transition-all duration-300 text-center ${containerBg} ${className}`}
    >
      <ModuleHeader
        title={config.title}
        subtitle={config.subtitle}
        icon="🎡"
        theme={theme}
      />

      <div className="my-8 flex flex-col items-center justify-center">
        {/* SVG Wheel */}
        <div className="relative w-64 h-64 sm:w-72 sm:h-72 select-none">
          {/* Top Indicator Needle */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 text-2xl select-none filter drop-shadow">
            🔻
          </div>

          <svg
            data-testid="spinner-wheel-svg"
            viewBox="0 0 200 200"
            className="w-full h-full transform transition-transform"
            style={{
              transform: `rotate(${rotationDegrees}deg)`,
              transitionDuration: isSpinning ? "3200ms" : "0ms",
              transitionTimingFunction: "cubic-bezier(0.15, 0.9, 0.25, 1)",
            }}
          >
            <circle cx="100" cy="100" r="98" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="4" />
            {options.map((opt, i) => {
              const startAngle = (i * 360) / options.length;
              const endAngle = ((i + 1) * 360) / options.length;
              const x1 = 100 + 96 * Math.cos((Math.PI * (startAngle - 90)) / 180);
              const y1 = 100 + 96 * Math.sin((Math.PI * (startAngle - 90)) / 180);
              const x2 = 100 + 96 * Math.cos((Math.PI * (endAngle - 90)) / 180);
              const y2 = 100 + 96 * Math.sin((Math.PI * (endAngle - 90)) / 180);
              const largeArc = endAngle - startAngle > 180 ? 1 : 0;
              const pathData = `M 100 100 L ${x1} ${y1} A 96 96 0 ${largeArc} 1 ${x2} ${y2} Z`;
              const fillColor = spinColors[i % spinColors.length];

              const midAngle = startAngle + segmentAngle / 2;
              const textX = 100 + 60 * Math.cos((Math.PI * (midAngle - 90)) / 180);
              const textY = 100 + 60 * Math.sin((Math.PI * (midAngle - 90)) / 180);

              return (
                <g key={opt.id}>
                  <path d={pathData} fill={fillColor} stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                  <text
                    x={textX}
                    y={textY}
                    fill="#ffffff"
                    fontSize="7"
                    fontWeight="bold"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    transform={`rotate(${midAngle}, ${textX}, ${textY})`}
                    className="select-none font-ui"
                  >
                    {opt.label.length > 15 ? opt.label.slice(0, 14) + "…" : opt.label}
                  </text>
                </g>
              );
            })}
            {/* Center Cap */}
            <circle cx="100" cy="100" r="16" fill="#111827" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
            <text x="100" y="100" fill="#ffffff" fontSize="9" textAnchor="middle" dominantBaseline="middle" className="select-none">
              ✦
            </text>
          </svg>
        </div>

        {/* Winner Announcement Card */}
        {selectedWinner && (
          <div
            data-testid="spinner-result-card"
            className={`mt-6 p-5 rounded-2xl border shadow-xl max-w-sm mx-auto transform animate-in fade-in zoom-in-95 duration-300 ${winnerCardBg}`}
          >
            <span className="text-[10px] uppercase font-mono tracking-widest block opacity-70 mb-1">
              ✦ Destiny Has Chosen ✦
            </span>
            <p className={`font-display font-medium text-lg ${textWinner}`}>
              &ldquo;{selectedWinner}&rdquo;
            </p>
          </div>
        )}
      </div>

      <div className="flex items-center justify-center gap-3">
        <button
          type="button"
          data-testid="spinner-spin-btn"
          onClick={handleSpin}
          disabled={isSpinning}
          className="px-6 py-2.5 rounded-full text-xs font-ui font-medium border border-rose-400/50 bg-rose-600 text-white hover:bg-rose-500 active:scale-95 transition-all shadow-lg cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {isSpinning ? "Spinning..." : "Spin the Wheel 🎡"}
        </button>
        <button
          type="button"
          data-testid="spinner-fallback-btn"
          onClick={handleQuickPick}
          disabled={isSpinning}
          className={`px-4 py-2.5 rounded-full text-xs font-ui border transition-all cursor-pointer ${fallbackBtn}`}
        >
          Pick Random 🎲
        </button>
      </div>
    </div>
  );
};
