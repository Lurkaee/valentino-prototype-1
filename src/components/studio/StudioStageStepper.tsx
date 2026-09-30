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
  className?: string;
}

export const StudioStageStepper: React.FC<StudioStageStepperProps> = ({
  activeStage,
  onSelectStage,
  completedStages = {} as Record<StudioStageId, boolean>,
  className = "",
}) => {
  return (
    <nav
      data-testid="studio-stage-stepper"
      aria-label="Studio creation stages"
      className={`bg-[#0A090C] border-white/[0.08] select-none flex flex-row lg:flex-col overflow-x-auto lg:overflow-y-auto scrollbar-none border-b lg:border-b-0 lg:border-r lg:w-[68px] lg:py-3 lg:px-1.5 px-3 py-2 shrink-0 ${className}`}
    >
      <div className="flex flex-row lg:flex-col items-center gap-1.5 min-w-max lg:min-w-0 w-full">
        {STUDIO_STAGES.map((stage) => {
          const isActive = activeStage === stage.id;
          const isComplete = completedStages[stage.id];

          return (
            <button
              key={stage.id}
              type="button"
              data-testid={`stage-tab-${stage.id}`}
              onClick={() => onSelectStage(stage.id)}
              className={`group relative rounded-xl text-xs font-ui transition-all flex flex-row lg:flex-col items-center justify-center gap-1.5 lg:gap-1 cursor-pointer px-2.5 py-1.5 lg:px-1 lg:py-2.5 lg:w-full select-none ${
                isActive
                  ? "bg-rose-500/20 border border-rose-500/40 text-white shadow-xs font-medium"
                  : "text-white/60 hover:text-white hover:bg-white/[0.06] border border-transparent"
              }`}
              title={`${stage.stepNumber} · ${stage.label}: ${stage.description}`}
            >
              <span className="text-base select-none shrink-0">{stage.icon}</span>
              <span className="text-[10px] tracking-tight font-medium leading-none whitespace-nowrap">
                {stage.shortLabel}
              </span>
              {isComplete && !isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 lg:absolute lg:top-1.5 lg:right-1.5" title="Completed" />
              )}
              {isActive && (
                <span className="w-1.5 h-1.5 lg:w-3 lg:h-0.5 rounded-full bg-rose-400 shrink-0 lg:absolute lg:bottom-1 animate-pulse" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
