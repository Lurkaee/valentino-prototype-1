"use client";

import React, { useState } from "react";
import { ModuleRenderProps } from "../types";
import { FutureAdventuresPublishedConfig, AdventureItem } from "./schema";
import { ModuleHeader } from "../primitives/ModuleHeader";

export const FutureAdventuresModule: React.FC<ModuleRenderProps<FutureAdventuresPublishedConfig>> = ({
  config,
  theme = "midnight-rose",
  className = "",
}) => {
  const [filter, setFilter] = useState<"all" | "completed" | "planned" | "someday">("all");

  if (!config.enabled || config.items.length === 0) {
    return null;
  }

  const filteredItems = config.items.filter((item) => {
    if (filter === "all") return true;
    return item.status === filter;
  });

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
    ? "bg-[#0b120f]/90 border-emerald-500/25 shadow-2xl text-emerald-100"
    : "bg-[#180816]/90 border-rose-500/30 shadow-2xl text-rose-100";

  const cardBg = isCloudNine
    ? "bg-white/95 border-pink-200 text-pink-950 shadow-sm"
    : isKage
    ? "bg-black/50 border-emerald-500/20 text-emerald-50"
    : "bg-black/50 border-rose-500/25 text-rose-50";

  const statusMeta: Record<AdventureItem["status"], { label: string; icon: string; badgeClass: string }> = {
    completed: {
      label: "Memories Made",
      icon: "✨",
      badgeClass: isCloudNine
        ? "bg-emerald-100 text-emerald-800 border-emerald-300"
        : "bg-emerald-950 text-emerald-300 border-emerald-600/40",
    },
    planned: {
      label: "Coming Up",
      icon: "🗓️",
      badgeClass: isCloudNine
        ? "bg-pink-100 text-pink-800 border-pink-300"
        : "bg-rose-950 text-rose-300 border-rose-600/40",
    },
    someday: {
      label: "Someday Dream",
      icon: "💫",
      badgeClass: isCloudNine
        ? "bg-purple-100 text-purple-800 border-purple-300"
        : "bg-purple-950 text-purple-300 border-purple-600/40",
    },
  };

  const textHeading = isCloudNine ? "text-pink-950" : isKage ? "text-emerald-50" : "text-rose-50";
  const textNotes = isCloudNine ? "text-pink-900/70" : isKage ? "text-emerald-200/70" : "text-rose-200/70";
  const unselectedTab = isCloudNine
    ? "bg-pink-100/60 text-pink-900/70 border-pink-200 hover:bg-pink-100"
    : "bg-white/[0.04] text-white/60 border-white/[0.1] hover:bg-white/[0.08]";

  return (
    <div
      data-testid="future-adventures-module-container"
      className={`p-6 sm:p-8 rounded-3xl border backdrop-blur-xl transition-all duration-300 ${containerBg} ${className}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <ModuleHeader
          title={config.title}
          subtitle={config.subtitle}
          icon="🗺️"
          theme={theme}
        />

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 flex-wrap self-start sm:self-center" data-testid="adventure-filter-bar">
          {[
            { id: "all", label: "All" },
            { id: "completed", label: "Completed" },
            { id: "planned", label: "Planned" },
            { id: "someday", label: "Someday" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              data-testid={`adventure-filter-${tab.id}`}
              onClick={() => setFilter(tab.id as any)}
              className={`px-3 py-1 rounded-full text-xs font-ui transition-all cursor-pointer border ${
                filter === tab.id
                  ? isCloudNine
                    ? "bg-pink-500 text-white border-pink-600 shadow-sm"
                    : isKage
                    ? "bg-emerald-700 text-white border-emerald-500"
                    : "bg-rose-600 text-white border-rose-500"
                  : unselectedTab
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filteredItems.map((item) => {
          const meta = statusMeta[item.status];
          return (
            <div
              key={item.id}
              data-testid={`adventure-card-${item.id}`}
              className={`p-5 rounded-2xl border transition-all ${cardBg}`}
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className={`text-[10px] uppercase font-mono px-2.5 py-0.5 rounded-full border flex items-center gap-1 ${meta.badgeClass}`}>
                  <span>{meta.icon}</span>
                  <span>{meta.label}</span>
                </span>
              </div>
              <h4 className={`font-display font-medium text-base my-1 ${textHeading}`}>
                {item.title}
              </h4>
              {item.notes && (
                <p className={`text-xs font-ui leading-relaxed mt-1 ${textNotes}`}>
                  {item.notes}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
