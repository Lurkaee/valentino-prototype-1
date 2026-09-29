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
    label: "World",
    shortLabel: "World",
    icon: "🌐",
    description: "Choose visual world",
  },
  {
    id: "story",
    stepNumber: "02",
    label: "Story",
    shortLabel: "Story",
    icon: "📖",
    description: "7-Chapter narrative",
  },
  {
    id: "moments",
    stepNumber: "03",
    label: "Moments",
    shortLabel: "Moments",
    icon: "✨",
    description: "Interactive moments",
  },
  {
    id: "personalize",
    stepNumber: "04",
    label: "Personalize",
    shortLabel: "Personal",
    icon: "💌",
    description: "Letter & names",
  },
  {
    id: "mood",
    stepNumber: "05",
    label: "Mood & Decor",
    shortLabel: "Decor",
    icon: "🎨",
    description: "Physical styling",
  },
  {
    id: "preview",
    stepNumber: "06",
    label: "Preview",
    shortLabel: "Preview",
    icon: "👁️",
    description: "Recipient canvas",
  },
  {
    id: "send",
    stepNumber: "07",
    label: "Seal & Send",
    shortLabel: "Send",
    icon: "🚀",
    description: "Ready to gift",
  },
];

interface StudioStageStepperProps {
  activeStage: StudioStageId;
  onSelectStage: (stage: StudioStageId) => void;
  completedStages?: Record<StudioStageId, boolean>;
}

export const StudioStageStepper: React.FC<StudioStageStepperProps> = ({
  activeStage,
  onSelectStage,
  completedStages = {} as Record<StudioStageId, boolean>,
}) => {
  return (
    <nav
      data-testid="studio-stage-stepper"
      aria-label="Studio creation stages"
      className="sticky top-0 z-20 bg-[#0E0C12]/95 backdrop-blur-md px-3 sm:px-6 py-2.5 border-b border-white/[0.08] overflow-x-auto scrollbar-none"
    >
      <div className="flex items-center gap-1.5 min-w-max">
        {STUDIO_STAGES.map((stage) => {
          const isActive = activeStage === stage.id;
          const isComplete = completedStages[stage.id];

          return (
            <button
              key={stage.id}
              type="button"
              data-testid={`stage-tab-${stage.id}`}
              onClick={() => onSelectStage(stage.id)}
              className={`group relative px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-ui transition-all flex items-center gap-1.5 cursor-pointer select-none ${
                isActive
                  ? "bg-rose-500/15 border border-rose-500/35 text-white shadow-xs font-medium"
                  : "text-white/55 hover:text-white/90 hover:bg-white/[0.04] border border-transparent"
              }`}
            >
              <span className="text-sm select-none shrink-0">{stage.icon}</span>
              <span className="text-[10px] font-mono opacity-50 shrink-0 hidden lg:inline">
                {stage.stepNumber}
              </span>
              <span className="whitespace-nowrap font-medium text-xs">
                {stage.label}
              </span>
              {isComplete && !isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" title="Completed" />
              )}
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0 animate-pulse" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
