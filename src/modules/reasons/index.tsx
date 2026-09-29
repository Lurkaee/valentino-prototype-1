"use client";

import React, { useState } from "react";
import { ModuleRenderProps } from "../types";
import { ReasonsPublishedConfig } from "./schema";
import { ModuleHeader } from "../primitives/ModuleHeader";

export const ReasonsModule: React.FC<ModuleRenderProps<ReasonsPublishedConfig>> = ({
  config,
  theme = "midnight-rose",
  className = "",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [revealedIds, setRevealedIds] = useState<Set<string>>(() => new Set([config.items[0]?.id || ""]));
  const [viewMode, setViewMode] = useState<"step" | "all">("step");

  if (!config.enabled || config.items.length === 0) {
    return null;
  }

  const items = config.items;
  const currentItem = items[currentIndex] || items[0];

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % items.length;
    setCurrentIndex(nextIdx);
    setRevealedIds((prev) => new Set([...prev, items[nextIdx].id]));
  };

  const handlePrev = () => {
    const prevIdx = (currentIndex - 1 + items.length) % items.length;
    setCurrentIndex(prevIdx);
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

  const cardBg = isCloudNine
    ? "bg-white border-pink-100 shadow-md text-pink-950"
    : isKage
    ? "bg-black/40 border-emerald-500/20 text-emerald-50"
    : "bg-black/40 border-rose-500/25 text-rose-50";

  const accentPill = isCloudNine
    ? "bg-pink-100 text-pink-800 border-pink-200"
    : isKage
    ? "bg-emerald-950 text-emerald-300 border-emerald-600/40"
    : "bg-rose-950 text-rose-300 border-rose-600/40";

  const textHeading = isCloudNine ? "text-pink-950" : isKage ? "text-emerald-50" : "text-rose-50";
  const textBody = isCloudNine ? "text-pink-950/90" : isKage ? "text-emerald-100/90" : "text-rose-100/95";
  const textMuted = isCloudNine ? "text-pink-900/50" : isKage ? "text-emerald-300/50" : "text-rose-300/50";

  return (
    <div
      data-testid="reasons-module-container"
      className={`p-6 sm:p-8 rounded-3xl border backdrop-blur-xl transition-all duration-300 ${containerBg} ${className}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <ModuleHeader
          title={config.title}
          subtitle={config.subtitle}
          icon="💌"
          theme={theme}
        />
        <div className="flex items-center gap-2 self-start sm:self-center">
          <button
            type="button"
            data-testid="reasons-toggle-view"
            onClick={() => setViewMode((m) => (m === "step" ? "all" : "step"))}
            className={`px-3 py-1 text-xs rounded-full border transition-all cursor-pointer font-ui ${accentPill}`}
          >
            {viewMode === "step" ? "View All" : "One by One"}
          </button>
        </div>
      </div>

      {viewMode === "step" ? (
        <div className="space-y-6">
          <div
            data-testid="current-reason-card"
            className={`p-6 rounded-2xl border transition-all transform duration-300 ${cardBg}`}
          >
            <div className="flex items-center justify-between gap-3 mb-3">
              <span className={`text-[11px] uppercase tracking-wider font-mono px-2.5 py-0.5 rounded-full border ${accentPill}`}>
                Reason #{currentIndex + 1} of {items.length}
              </span>
              {currentItem.title && (
                <span className={`font-display font-medium text-sm truncate max-w-[200px] ${textHeading}`}>
                  {currentItem.title}
                </span>
              )}
            </div>

            <p className={`font-romantic text-lg sm:text-xl leading-relaxed italic my-4 ${textBody}`}>
              &ldquo;{currentItem.text}&rdquo;
            </p>

            {currentItem.mediaUrl && (
              <div className="mt-4 rounded-xl overflow-hidden border border-white/10 max-h-48">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={currentItem.mediaUrl}
                  alt={currentItem.title || "Romantic memory"}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            )}
          </div>

          <div className="flex items-center justify-between gap-4 pt-2">
            <button
              type="button"
              data-testid="reasons-prev-btn"
              onClick={handlePrev}
              disabled={items.length <= 1}
              className={`px-4 py-2 rounded-xl text-xs font-ui border transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed ${cardBg}`}
              aria-label="Previous reason"
            >
              ← Previous
            </button>
            <span className={`text-xs font-mono ${textMuted}`}>
              {currentIndex + 1} / {items.length}
            </span>
            <button
              type="button"
              data-testid="reasons-next-btn"
              onClick={handleNext}
              disabled={items.length <= 1}
              className={`px-4 py-2 rounded-xl text-xs font-ui font-medium border transition-all cursor-pointer shadow-md active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed ${accentPill}`}
              aria-label="Next reason"
            >
              Next Reason →
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" data-testid="reasons-all-grid">
          {items.map((item, idx) => (
            <div
              key={item.id}
              className={`p-5 rounded-2xl border transition-all ${cardBg}`}
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded-full border ${accentPill}`}>
                  #{idx + 1}
                </span>
                {item.title && (
                  <span className={`text-xs font-display font-medium truncate ${textHeading}`}>
                    {item.title}
                  </span>
                )}
              </div>
              <p className={`font-romantic text-sm leading-relaxed italic ${textBody}`}>
                &ldquo;{item.text}&rdquo;
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
