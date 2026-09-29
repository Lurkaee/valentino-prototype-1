"use client";

import React, { useState } from "react";
import { ModuleRenderProps } from "../types";
import { PromisesPublishedConfig } from "./schema";
import { ModuleHeader } from "../primitives/ModuleHeader";

export const PromisesModule: React.FC<ModuleRenderProps<PromisesPublishedConfig>> = ({
  config,
  theme = "midnight-rose",
  className = "",
}) => {
  const [acknowledged, setAcknowledged] = useState<Set<string>>(new Set());

  if (!config.enabled || config.items.length === 0) {
    return null;
  }

  const toggleAcknowledge = (id: string) => {
    setAcknowledged((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
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

  const cardBg = isCloudNine
    ? "bg-white/95 border-pink-200 text-pink-950 shadow-sm"
    : isKage
    ? "bg-black/50 border-emerald-500/20 text-emerald-50"
    : "bg-black/50 border-rose-500/25 text-rose-50";

  const sealColor = isCloudNine
    ? "text-pink-600 font-semibold"
    : isKage
    ? "text-emerald-400"
    : "text-rose-400";

  const textBody = isCloudNine ? "text-pink-950" : isKage ? "text-emerald-50" : "text-rose-50";
  const textMuted = isCloudNine ? "text-pink-900/60" : isKage ? "text-emerald-300/50" : "text-rose-300/50";
  const borderDivider = isCloudNine ? "border-pink-100" : isKage ? "border-emerald-500/10" : "border-rose-500/15";

  return (
    <div
      data-testid="promises-module-container"
      className={`p-6 sm:p-8 rounded-3xl border backdrop-blur-xl transition-all duration-300 ${containerBg} ${className}`}
    >
      <ModuleHeader
        title={config.title}
        subtitle={config.subtitle}
        icon="💍"
        theme={theme}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {config.items.map((item, idx) => {
          const isLoved = acknowledged.has(item.id);
          return (
            <div
              key={item.id}
              data-testid={`promise-card-${item.id}`}
              onClick={() => toggleAcknowledge(item.id)}
              className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer relative group flex flex-col justify-between ${cardBg} hover:scale-[1.02]`}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  toggleAcknowledge(item.id);
                }
              }}
              aria-label={`Promise ${idx + 1}: ${item.text}. Tap to acknowledge.`}
            >
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className={`text-[11px] font-mono uppercase tracking-wider ${sealColor}`}>
                  Vow #{idx + 1}
                </span>
                <span className={`text-base select-none transition-transform ${isLoved ? "scale-125" : "opacity-40 group-hover:opacity-75"}`}>
                  {isLoved ? "❤️" : "🤍"}
                </span>
              </div>

              <p className={`font-romantic text-base sm:text-lg leading-relaxed italic my-1 ${textBody}`}>
                &ldquo;{item.text}&rdquo;
              </p>

              <div className={`mt-3 pt-2 border-t flex items-center justify-between text-[10px] font-mono ${borderDivider} ${textMuted}`}>
                <span>SEALED</span>
                <span>{isLoved ? "HELD IN HEART" : "TAP TO CHERISH"}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
