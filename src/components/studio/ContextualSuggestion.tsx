"use client";

import React, { useState } from "react";
import { FeatureDefinition } from "@/features/types";

export interface ContextualSuggestionProps {
  messageLength: number;
  activeMomentCount: number;
  hasTimeline: boolean;
  hasQuiz: boolean;
  hasSecret: boolean;
  hasOpenWhen: boolean;
  hasCustomDecor: boolean;
  onAction: (action: { type: "scroll" | "module"; target: string }) => void;
}

export const ContextualSuggestion: React.FC<ContextualSuggestionProps> = ({
  messageLength,
  activeMomentCount,
  hasTimeline,
  hasQuiz,
  hasSecret,
  hasOpenWhen,
  hasCustomDecor,
  onAction,
}) => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  // Deterministic priority suggestions
  let suggestion: {
    headline: string;
    body: string;
    actionLabel: string;
    actionType: "scroll" | "module";
    actionTarget: string;
    icon: string;
  } | null = null;

  if (messageLength >= 20 && activeMomentCount === 0) {
    suggestion = {
      headline: "Your words are in place.",
      body: "Add an interactive moment around your letter to make it unforgettable.",
      actionLabel: "+ Add First Moment",
      actionType: "scroll",
      actionTarget: "moments",
      icon: "✨",
    };
  } else if (hasTimeline && !hasQuiz) {
    suggestion = {
      headline: "Your story has a beginning.",
      body: "Want to turn your shared memories into a playful Love Quiz?",
      actionLabel: "+ Add Love Quiz",
      actionType: "module",
      actionTarget: "quiz",
      icon: "💘",
    };
  } else if (hasCustomDecor && activeMomentCount === 0) {
    suggestion = {
      headline: "The mood is beautifully set.",
      body: "Now give your partner an interactive chapter to uncover.",
      actionLabel: "Explore Moments",
      actionType: "scroll",
      actionTarget: "moments",
      icon: "🕯️",
    };
  } else if (hasTimeline && hasQuiz && !hasSecret) {
    suggestion = {
      headline: "A private whisper?",
      body: "Hide a secret note sealed behind a tap-to-reveal blur.",
      actionLabel: "+ Add Secret Note",
      actionType: "module",
      actionTarget: "secret",
      icon: "🔐",
    };
  }

  if (!suggestion) return null;

  return (
    <aside
      aria-label="Contextual creation guidance"
      data-testid="contextual-suggestion-card"
      className="relative flex items-start sm:items-center justify-between gap-3 p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-rose-950/25 via-[#16121C] to-purple-950/20 border border-rose-500/20 shadow-lg backdrop-blur-md transition-all duration-300"
    >
      <div className="flex items-start sm:items-center gap-3 min-w-0">
        <div className="w-8 h-8 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-sm shrink-0">
          {suggestion.icon}
        </div>
        <div className="min-w-0">
          <p className="text-xs font-display font-medium text-rose-200 tracking-wide truncate">
            {suggestion.headline}
          </p>
          <p className="text-[11px] text-white/60 font-ui font-light leading-relaxed line-clamp-1 sm:line-clamp-none">
            {suggestion.body}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button
          type="button"
          data-testid="contextual-suggestion-action"
          onClick={() =>
            onAction({
              type: suggestion!.actionType,
              target: suggestion!.actionTarget,
            })
          }
          className="px-3 py-1.5 rounded-full bg-white/[0.08] hover:bg-white/[0.15] border border-white/20 text-white text-xs font-ui font-medium transition-all hover:scale-105 active:scale-95 shadow-sm"
        >
          {suggestion.actionLabel}
        </button>

        <button
          type="button"
          aria-label="Dismiss suggestion"
          data-testid="dismiss-contextual-suggestion"
          onClick={() => setDismissed(true)}
          className="w-7 h-7 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/[0.08] transition-colors text-xs"
        >
          ✕
        </button>
      </div>
    </aside>
  );
};
