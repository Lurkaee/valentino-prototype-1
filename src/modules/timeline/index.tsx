"use client";

import React from "react";
import { TimelinePublishedConfig } from "./schema";
import { ModuleRenderProps } from "../types";
import { ModuleShell } from "../primitives/ModuleShell";
import { ModuleHeader } from "../primitives/ModuleHeader";
import { MediaSlot } from "@/templates/shared/MediaSlot";

export const TimelineModule: React.FC<ModuleRenderProps<TimelinePublishedConfig>> = ({
  config,
  theme = "midnight-rose",
  className = "",
}) => {
  if (!config.enabled || !config.items || config.items.length === 0) {
    return null;
  }

  const isCloudNine = theme === "cloud-nine" || theme === "blush-sky" || theme === "peach-sorbet" || theme === "lavender-mist";
  const isKage = theme === "kage";

  const pathColor = isCloudNine
    ? "bg-pink-300/40"
    : isKage
    ? "bg-emerald-700/40"
    : "bg-rose-500/30";

  const nodeColor = isCloudNine
    ? "bg-white border-pink-400 text-pink-700 shadow-sm"
    : isKage
    ? "bg-[#16221c] border-emerald-500 text-emerald-300 shadow-md"
    : "bg-[#25081b] border-rose-500 text-rose-300 shadow-md";

  const cardBg = isCloudNine
    ? "bg-white/85 border-pink-200/80 text-pink-950"
    : isKage
    ? "bg-[#111814]/90 border-emerald-900/40 text-[#e4ede7]"
    : "bg-[#200615]/85 border-rose-500/25 text-[#FAF8F5]";

  return (
    <ModuleShell
      testId="module-timeline"
      theme={theme}
      badgeIcon="⏳"
      badgeText="Timeline of Us"
      className={className}
    >
      <ModuleHeader
        title={config.title}
        subtitle={config.subtitle}
        theme={theme}
      />

      <div className="relative max-w-lg mx-auto pl-6 sm:pl-8 space-y-8 my-4">
        {/* Continuous timeline vertical track */}
        <div
          aria-hidden="true"
          className={`absolute left-2.5 sm:left-3.5 top-3 bottom-3 w-0.5 ${pathColor} rounded-full`}
        />

        {config.items.map((item, index) => (
          <div
            key={item.id || `timeline-item-${index}`}
            data-testid={`timeline-item-${index}`}
            className="relative flex flex-col gap-2"
          >
            {/* Timeline Milestone Node Marker */}
            <div
              aria-hidden="true"
              className={`absolute -left-6 sm:-left-8 top-1.5 w-5 h-5 rounded-full border-2 flex items-center justify-center text-[10px] select-none ${nodeColor}`}
            >
              {index + 1}
            </div>

            {/* Date Tag */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-sans font-medium uppercase tracking-widest opacity-75">
                {item.date}
              </span>
              {item.location && (
                <>
                  <span className="text-[10px] opacity-40">·</span>
                  <span className="text-[11px] font-sans opacity-70 italic">
                    📍 {item.location}
                  </span>
                </>
              )}
            </div>

            {/* Milestone Card */}
            <div className={`p-4 sm:p-5 rounded-xl border shadow-sm transition-all duration-300 ${cardBg}`}>
              <h3 className="text-base sm:text-lg font-serif font-medium mb-1.5 leading-snug">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm font-light leading-relaxed whitespace-pre-wrap opacity-90">
                {item.description}
              </p>

              {/* Optional Milestone Media */}
              {item.mediaId && (
                <div className="mt-3 overflow-hidden rounded-lg max-h-48 w-full border border-black/10">
                  <MediaSlot
                    media={
                      item.mediaId.startsWith("http") || item.mediaId.startsWith("/")
                        ? { url: item.mediaId, altText: item.title }
                        : null
                    }
                    fallbackText={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </ModuleShell>
  );
};
