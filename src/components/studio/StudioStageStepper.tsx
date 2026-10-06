"use client";

import React from "react";

export type StudioStageId =
  | "world"
  | "story"
  | "moments"
  | "personalize"
  | "mood"
  | "preview"
  | "send";

export interface StudioStage {
  id: StudioStageId;
  stepNumber: string;
  label: string;
  shortLabel: string;
  icon: string;
  description: string;
}

export const STUDIO_STAGES: StudioStage[] = [
  {
    id: "world",
    stepNumber: "01",
    label: "Visual World",
    shortLabel: "World",
    icon: "🌐",
    description: "Atmosphere they step into",
  },
  {
    id: "story",
    stepNumber: "02",
    label: "Story Chapters",
    shortLabel: "Story",
    icon: "📖",
    description: "Narrative journey & pacing",
  },
  {
    id: "moments",
    stepNumber: "03",
    label: "Interactive Moments",
    shortLabel: "Moments",
    icon: "✨",
    description: "Discovered surprises",
  },
  {
    id: "personalize",
    stepNumber: "04",
    label: "Personalize & Love Letter",
    shortLabel: "Letter",
    icon: "💌",
    description: "Core words & dedication",
  },
  {
    id: "mood",
    stepNumber: "05",
    label: "Mood & Physical Styling",
    shortLabel: "Style",
    icon: "🎨",
    description: "Stationery, seals & blooms",
  },
  {
    id: "preview",
    stepNumber: "06",
    label: "Recipient Experience",
    shortLabel: "Preview",
    icon: "👁️",
    description: "Experience verification",
  },
  {
    id: "send",
    stepNumber: "07",
    label: "Seal & Send",
    shortLabel: "Send",
    icon: "🚀",
    description: "Soundtrack & private link",
  },
];

interface StudioStageStepperProps {
  activeStage: StudioStageId;
  onSelectStage: (stage: StudioStageId) => void;
  completedStages?: Record<StudioStageId, boolean>;
  worldId?: string;
  className?: string;
}

export const StudioStageStepper: React.FC<StudioStageStepperProps> = ({
  activeStage,
  onSelectStage,
  completedStages = {} as Record<StudioStageId, boolean>,
  worldId = "midnight-rose",
  className = "",
}) => {
  // World-derived accent lighting tokens
  const getAccentTokens = (id: string) => {
    switch (id) {
      case "cloud-nine":
        return {
          text: "text-amber-200",
          bar: "bg-amber-300",
          glow: "shadow-[0_0_10px_rgba(252,211,77,0.5)]",
        };
      case "kage":
        return {
          text: "text-purple-300",
          bar: "bg-purple-400",
          glow: "shadow-[0_0_10px_rgba(167,139,250,0.5)]",
        };
      case "apricot-film":
        return {
          text: "text-amber-300",
          bar: "bg-amber-500",
          glow: "shadow-[0_0_10px_rgba(245,158,11,0.5)]",
        };
      case "wildflower-paper":
        return {
          text: "text-emerald-300",
          bar: "bg-emerald-400",
          glow: "shadow-[0_0_10px_rgba(52,211,153,0.5)]",
        };
      case "ocean-letter":
        return {
          text: "text-sky-300",
          bar: "bg-sky-400",
          glow: "shadow-[0_0_10px_rgba(56,189,248,0.5)]",
        };
      case "midnight-rose":
      default:
        return {
          text: "text-rose-300",
          bar: "bg-rose-500",
          glow: "shadow-[0_0_10px_rgba(244,63,94,0.5)]",
        };
    }
  };

  const accents = getAccentTokens(worldId);

  return (
    <nav
      data-testid="studio-stage-stepper"
      aria-label="Studio creation stages"
      className={`border-b border-white/[0.06] bg-[#0E0C12]/95 backdrop-blur-md select-none px-3 sm:px-6 py-2.5 overflow-x-auto scrollbar-none shrink-0 ${className}`}
    >
      <div className="flex items-center justify-between gap-1 sm:gap-2 min-w-max mx-auto max-w-2xl">
        {STUDIO_STAGES.map((stage) => {
          const isActive = activeStage === stage.id;
          const isComplete = completedStages[stage.id];

          return (
            <button
              key={stage.id}
              type="button"
              data-testid={`stage-tab-${stage.id}`}
              onClick={() => onSelectStage(stage.id)}
              className={`group relative py-1.5 px-2 sm:px-3 flex items-center gap-1.5 transition-all cursor-pointer select-none rounded-md ${
                isActive ? "text-white" : "text-white/40 hover:text-white/80"
              }`}
              title={`${stage.stepNumber} · ${stage.label}: ${stage.description}`}
            >
              <span
                className={`text-[10px] font-mono transition-colors ${
                  isActive ? accents.text : "text-white/30 group-hover:text-white/50"
                }`}
              >
                {stage.stepNumber}
              </span>
              <span
                className={`text-xs font-serif uppercase tracking-wider transition-colors ${
                  isActive ? "text-white font-medium" : "font-normal"
                }`}
              >
                {stage.shortLabel}
              </span>
              {isComplete && !isActive && (
                <span className="w-1 h-1 rounded-full bg-emerald-400/80 shrink-0" title="Completed" />
              )}
              {/* Active stage micro accent line */}
              {isActive && (
                <span
                  className={`absolute -bottom-2.5 left-2 right-2 h-0.5 rounded-full ${accents.bar} ${accents.glow} transition-all duration-300`}
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
