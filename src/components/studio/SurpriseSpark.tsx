"use client";

import React, { useState } from "react";
import { getFeatureById } from "@/features/registry";
import { FeatureDefinition } from "@/features/types";

export interface SurpriseSparkProps {
  activeModuleKeys: string[];
  onSelectFeature: (feature: FeatureDefinition) => void;
  className?: string;
}

export const SurpriseSpark: React.FC<SurpriseSparkProps> = ({
  activeModuleKeys,
  onSelectFeature,
  className = "",
}) => {
  const [sparkResult, setSparkResult] = useState<FeatureDefinition | null>(null);

  const handleSpark = () => {
    // Deterministic progression for reliability and testing
    let nextFeatureId = "timeline";
    if (!activeModuleKeys.includes("timeline")) {
      nextFeatureId = "timeline";
    } else if (!activeModuleKeys.includes("quiz")) {
      nextFeatureId = "quiz";
    } else if (!activeModuleKeys.includes("secret")) {
      nextFeatureId = "secret";
    } else if (!activeModuleKeys.includes("openWhen")) {
      nextFeatureId = "openWhen";
    } else {
      nextFeatureId = "paper-wax-craft";
    }

    const feature = getFeatureById(nextFeatureId);
    if (feature) {
      setSparkResult(feature);
    }
  };

  return (
    <div className={`space-y-2.5 ${className}`}>
      <div className="flex items-center gap-2">
        <button
          type="button"
          data-testid="surprise-feature-trigger"
          onClick={handleSpark}
          className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-rose-950/50 to-purple-950/50 hover:from-rose-900/60 hover:to-purple-900/60 border border-rose-500/30 hover:border-rose-400/50 text-rose-200 text-xs font-ui font-medium transition-all shadow-sm active:scale-95"
        >
          <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse group-hover:scale-125 transition-transform" />
          <span>Surprise Me</span>
          <span className="text-white/40 text-[11px] font-light">· Spark an idea</span>
        </button>
      </div>

      {sparkResult && (
        <div
          data-testid="surprise-feature-result"
          className="p-3.5 rounded-xl bg-[#17141E] border border-rose-500/30 shadow-md flex items-center justify-between gap-3 animate-fadeIn"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="text-lg select-none">{sparkResult.icon}</span>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-xs font-display font-medium text-white truncate">
                  {sparkResult.name}
                </p>
                <span className="px-1.5 py-0.5 rounded text-[10px] uppercase font-mono tracking-wider bg-rose-500/10 text-rose-300 border border-rose-500/20">
                  Sparked
                </span>
              </div>
              <p className="text-[11px] text-white/60 font-ui truncate">
                {sparkResult.tagline}
              </p>
            </div>
          </div>

          <button
            type="button"
            data-testid="apply-spark-feature"
            onClick={() => onSelectFeature(sparkResult)}
            className="px-3 py-1 rounded-full bg-rose-600 hover:bg-rose-500 text-white text-xs font-ui font-medium transition-all shrink-0 shadow-sm"
          >
            + Add to Story
          </button>
        </div>
      )}
    </div>
  );
};
