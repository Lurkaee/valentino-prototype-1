"use client";

import React, { useState, useEffect } from "react";
import {
  FEATURES,
  getAvailableFeatures,
  getRoadmapFeatures,
} from "@/features/registry";
import {
  FeatureDefinition,
  FeatureCategory,
  FEATURE_CATEGORIES,
} from "@/features/types";

export interface FeatureDiscoveryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectFeature: (feature: FeatureDefinition) => void;
  activeModuleKeys?: string[];
  activeTemplateId?: string;
}

export const FeatureDiscoveryDrawer: React.FC<FeatureDiscoveryDrawerProps> = ({
  isOpen,
  onClose,
  onSelectFeature,
  activeModuleKeys = [],
  activeTemplateId = "midnight-rose",
}) => {
  const [selectedCategory, setSelectedCategory] = useState<FeatureCategory | "all">("all");

  // Keyboard accessibility: Escape key to close
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const allAvailable = getAvailableFeatures();
  const allRoadmap = getRoadmapFeatures();

  const filteredAvailable =
    selectedCategory === "all"
      ? allAvailable
      : allAvailable.filter((f) => f.category === selectedCategory);

  const filteredRoadmap =
    selectedCategory === "all"
      ? allRoadmap
      : allRoadmap.filter((f) => f.category === selectedCategory);

  const categories: { id: FeatureCategory | "all"; label: string }[] = [
    { id: "all", label: "All Capabilities" },
    { id: "moments", label: "Add a Moment" },
    { id: "personal", label: "Make It Personal" },
    { id: "mood", label: "Set the Mood" },
    { id: "immersive", label: "Make It Immersive" },
    { id: "keepsake", label: "Make It Last" },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm transition-opacity duration-300 animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="feature-discovery-title"
      data-testid="feature-discovery-drawer"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full sm:max-w-xl md:max-w-2xl h-full bg-[#0E0C12] border-l border-white/10 shadow-2xl flex flex-col text-white overflow-hidden animate-slideLeft">
        {/* Header */}
        <div className="px-5 sm:px-7 py-5 border-b border-white/10 flex items-center justify-between shrink-0 bg-[#131118]">
          <div className="space-y-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-base select-none">✨</span>
              <h2
                id="feature-discovery-title"
                className="text-base sm:text-lg font-serif font-medium text-white tracking-wide"
              >
                Explore More For Your Story
              </h2>
            </div>
            <p className="text-xs text-white/60 font-ui font-light">
              Discover interactive moments, physical craft decor, and future keepsakes.
            </p>
          </div>

          <button
            type="button"
            data-testid="close-feature-drawer"
            aria-label="Close feature discovery drawer"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/[0.05] hover:bg-white/[0.12] border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors text-sm shrink-0"
          >
            ✕
          </button>
        </div>

        {/* Category Navigation Tabs */}
        <div className="px-5 sm:px-7 py-3 border-b border-white/[0.08] bg-[#110F16] overflow-x-auto no-scrollbar shrink-0">
          <div className="flex items-center gap-1.5 min-w-max">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                data-testid={`filter-category-${cat.id}`}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-ui font-medium transition-all ${
                  selectedCategory === cat.id
                    ? "bg-white text-black shadow-md scale-105"
                    : "bg-white/[0.04] text-white/60 hover:text-white hover:bg-white/[0.08]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto px-5 sm:px-7 py-6 space-y-8">
          {/* ================================================================= */}
          {/* SECTION 1: AVAILABLE CAPABILITIES                                 */}
          {/* ================================================================= */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <h3 className="text-xs font-ui font-semibold uppercase tracking-wider text-emerald-300">
                  Available Now ({filteredAvailable.length})
                </h3>
              </div>
              <span className="text-[11px] text-white/40 font-light">
                Ready to compose in your story
              </span>
            </div>

            {filteredAvailable.length === 0 ? (
              <p className="text-xs text-white/40 italic py-2">
                No active features in this category.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filteredAvailable.map((feature) => {
                  const isModuleActive =
                    feature.targetModuleKey &&
                    activeModuleKeys.includes(feature.targetModuleKey);

                  return (
                    <div
                      key={feature.id}
                      data-testid={`feature-card-${feature.id}`}
                      className="p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.05] border border-white/[0.08] hover:border-white/20 transition-all flex flex-col justify-between space-y-3 group"
                    >
                      <div className="space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2.5">
                            <span className="text-xl select-none group-hover:scale-110 transition-transform">
                              {feature.icon}
                            </span>
                            <div>
                              <h4 className="text-xs font-display font-medium text-white group-hover:text-rose-200 transition-colors">
                                {feature.name}
                              </h4>
                              <p className="text-[10px] text-white/40 uppercase tracking-widest font-mono">
                                {FEATURE_CATEGORIES[feature.category]?.name}
                              </p>
                            </div>
                          </div>

                          {isModuleActive && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-ui font-medium bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 shrink-0">
                              Active
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-white/70 font-ui font-light leading-relaxed">
                          {feature.tagline}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-white/[0.05] flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          {feature.badges?.map((badge) => (
                            <span
                              key={badge}
                              className="px-1.5 py-0.5 rounded text-[10px] font-mono text-white/50 bg-white/[0.04]"
                            >
                              {badge}
                            </span>
                          ))}
                        </div>

                        <button
                          type="button"
                          data-testid={`activate-feature-${feature.id}`}
                          onClick={() => {
                            onSelectFeature(feature);
                            onClose();
                          }}
                          className="px-3 py-1 rounded-full text-xs font-ui font-medium bg-white/[0.08] hover:bg-white text-white hover:text-black border border-white/15 transition-all shadow-sm active:scale-95"
                        >
                          {isModuleActive ? "Edit" : "+ Add"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* ================================================================= */}
          {/* SECTION 2: ROADMAP & COMING SOON CAPABILITIES                     */}
          {/* ================================================================= */}
          <div className="space-y-4 pt-4 border-t border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-400" />
                <h3 className="text-xs font-ui font-semibold uppercase tracking-wider text-purple-300">
                  Coming Soon ({filteredRoadmap.length})
                </h3>
              </div>
              <span className="text-[11px] text-white/40 font-light">
                Informed roadmap · Not yet active
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filteredRoadmap.map((feature) => (
                <div
                  key={feature.id}
                  data-testid={`roadmap-card-${feature.id}`}
                  className="p-4 rounded-2xl bg-white/[0.015] border border-white/[0.06] flex flex-col justify-between space-y-3 opacity-80"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <span className="text-xl select-none opacity-70">
                          {feature.icon}
                        </span>
                        <div>
                          <h4 className="text-xs font-display font-medium text-white/90">
                            {feature.name}
                          </h4>
                          <p className="text-[10px] text-white/40 uppercase tracking-widest font-mono">
                            {FEATURE_CATEGORIES[feature.category]?.name}
                          </p>
                        </div>
                      </div>

                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono tracking-wider uppercase font-semibold bg-purple-950/50 text-purple-300 border border-purple-500/30 shrink-0">
                        Coming Soon
                      </span>
                    </div>

                    <p className="text-xs text-white/60 font-ui font-light leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-white/[0.04] flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {feature.badges?.map((badge) => (
                        <span
                          key={badge}
                          className="px-1.5 py-0.5 rounded text-[10px] font-mono text-white/40 bg-white/[0.03]"
                        >
                          {badge}
                        </span>
                      ))}
                    </div>

                    <span className="text-[11px] text-white/40 italic font-ui">
                      Roadmap preview
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reassurance Footer */}
        <div className="px-5 sm:px-7 py-3.5 border-t border-white/10 bg-[#131118] flex items-center justify-between text-[11px] text-white/50 font-ui shrink-0">
          <span>All active features seamlessly combine across devices.</span>
          <button
            type="button"
            onClick={onClose}
            className="text-white hover:underline font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
