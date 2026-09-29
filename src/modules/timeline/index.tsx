"use client";

import React, { useState } from "react";
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
  const [selectedMilestone, setSelectedMilestone] = useState<string | null>(null);

  if (!config.enabled || !config.items || config.items.length === 0) {
    return null;
  }

  const isCloudNine =
    theme === "cloud-nine" ||
    theme === "blush-sky" ||
    theme === "peach-sorbet" ||
    theme === "lavender-mist";
  const isKage = theme === "kage" || theme.includes("kyoto") || theme.includes("sanctuary");

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

  const categoryBadgeColor = isCloudNine
    ? "bg-pink-100 text-pink-700 border-pink-300"
    : isKage
    ? "bg-emerald-950/60 text-emerald-300 border-emerald-800"
    : "bg-rose-950/60 text-rose-300 border-rose-800/80";

  return (
    <ModuleShell
      testId="timeline-module-container"
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

      <div className="relative max-w-lg mx-auto pl-6 sm:pl-8 space-y-8 my-4" data-testid="timeline-items-track">
        {/* Continuous timeline vertical track */}
        <div
          aria-hidden="true"
          className={`absolute left-2.5 sm:left-3.5 top-3 bottom-3 w-0.5 ${pathColor} rounded-full`}
        />

        {config.items.map((item, index) => {
          const isExpanded = selectedMilestone === item.id;
          return (
            <div
              key={item.id || `timeline-item-${index}`}
              data-testid={`timeline-item-${index}`}
              className="relative flex flex-col gap-2"
            >
              {/* Timeline Milestone Node Marker */}
              <div
                aria-hidden="true"
                className={`absolute -left-6 sm:-left-8 top-1.5 w-5 h-5 rounded-full border-2 flex items-center justify-center text-[10px] select-none font-semibold ${nodeColor}`}
              >
                {index + 1}
              </div>

              {/* Header Info: Date & Category & Location */}
              <div className="flex flex-wrap items-center gap-2">
                {item.date && (
                  <span className="text-[11px] font-sans font-medium uppercase tracking-widest opacity-80" data-testid={`milestone-date-${index}`}>
                    {item.date}
                  </span>
                )}
                {item.category && (
                  <span
                    className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded-full border ${categoryBadgeColor}`}
                    data-testid={`milestone-category-${index}`}
                  >
                    {item.category}
                  </span>
                )}
                {item.location && (
                  <span className="text-[11px] font-sans opacity-70 italic flex items-center gap-0.5" data-testid={`milestone-location-${index}`}>
                    <span>📍</span>
                    <span>{item.location}</span>
                  </span>
                )}
              </div>

              {/* Milestone Interactive Card */}
              <div
                tabIndex={0}
                role="button"
                aria-expanded={isExpanded}
                onClick={() => setSelectedMilestone(isExpanded ? null : item.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedMilestone(isExpanded ? null : item.id);
                  }
                }}
                data-testid={`milestone-card-${index}`}
                className={`p-4 sm:p-5 rounded-xl border shadow-sm transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-rose-400/50 ${cardBg}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-base sm:text-lg font-serif font-medium leading-snug" data-testid={`milestone-title-${index}`}>
                    {item.title}
                  </h3>
                  <span className="text-xs opacity-50 shrink-0 select-none">
                    {isExpanded ? "▲" : "▼"}
                  </span>
                </div>

                <p className="text-xs sm:text-sm font-light leading-relaxed whitespace-pre-wrap opacity-90 mt-1.5" data-testid={`milestone-desc-${index}`}>
                  {item.description}
                </p>

                {/* Optional Milestone Media */}
                {item.mediaId && (
                  <div className="mt-3 overflow-hidden rounded-lg max-h-48 w-full border border-black/10" data-testid={`milestone-media-${index}`}>
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

                {/* Connection to related Photo Memory */}
                {item.relatedMemoryId && (
                  <div className="mt-3 pt-2.5 border-t border-white/[0.1] flex items-center justify-between">
                    <span className="text-[11px] opacity-75 font-sans">Cherished memory linked</span>
                    <a
                      href="#module-memories"
                      onClick={(e) => {
                        e.stopPropagation();
                        const el = document.getElementById("module-memories") || document.querySelector('[data-testid="module-memories"]');
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="text-[11px] font-sans font-medium text-rose-300 hover:text-rose-200 underline flex items-center gap-1"
                      data-testid={`milestone-memory-link-${index}`}
                    >
                      <span>📸 View Photo Memory →</span>
                    </a>
                  </div>
                )}

                {/* Next Step Connection Message */}
                {item.nextStepMessage && (
                  <div className="mt-2 text-[11px] font-serif italic text-rose-200/80 bg-black/20 px-2.5 py-1 rounded-md" data-testid={`milestone-next-step-${index}`}>
                    ✨ {item.nextStepMessage}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </ModuleShell>
  );
};
