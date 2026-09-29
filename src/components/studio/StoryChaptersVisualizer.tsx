"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/Badge";

export interface StoryChaptersVisualizerProps {
  welcomeEnabled: boolean;
  onToggleWelcome: () => void;
  welcomeGreeting: string;
  welcomeMessage: string;
  onWelcomeGreetingChange: (val: string) => void;
  onWelcomeMessageChange: (val: string) => void;
  pacing: "calm" | "balanced" | "cinematic";
  onPacingChange: (pacing: "calm" | "balanced" | "cinematic") => void;
  activeMomentsCount: number;
}

export const StoryChaptersVisualizer: React.FC<StoryChaptersVisualizerProps> = ({
  welcomeEnabled,
  onToggleWelcome,
  welcomeGreeting,
  welcomeMessage,
  onWelcomeGreetingChange,
  onWelcomeMessageChange,
  pacing,
  onPacingChange,
  activeMomentsCount,
}) => {
  const [expandedChapter, setExpandedChapter] = useState<string | null>(null);

  const chapters = [
    {
      id: "welcome",
      order: "01",
      name: "Welcome Greeting",
      status: welcomeEnabled ? "Customized" : "Default Entrance",
      desc: "The quiet threshold where they first see your dedication.",
      badge: "Atmospheric",
      interactive: true,
    },
    {
      id: "story",
      order: "02",
      name: "The Core Love Letter",
      status: "Personal Message",
      desc: "Your words unfold in romantic calligraphy and tactile vellum.",
      badge: "Heart of World",
    },
    {
      id: "memories",
      order: "03",
      name: "Shared Milestones",
      status: "Timeline & Photographs",
      desc: "The dates and memories that shaped your path together.",
      badge: "Milestones",
    },
    {
      id: "moments",
      order: "04",
      name: "Interactive Moments",
      status: activeMomentsCount > 0 ? `${activeMomentsCount} Active` : "Optional Keepsakes",
      desc: "Playful quizzes, hidden secret notes, and open-when letters.",
      badge: "Discovered",
    },
    {
      id: "promises",
      order: "05",
      name: "Sacred Promises",
      status: "Devotion",
      desc: "Tender vows and quiet promises sealed in your private world.",
      badge: "Vows",
    },
    {
      id: "future",
      order: "06",
      name: "Future Adventures",
      status: "The Unwritten Story",
      desc: "Adventures, bucket list dreams, and journeys yet to come.",
      badge: "Tomorrow",
    },
    {
      id: "finale",
      order: "07",
      name: "Starlight Finale",
      status: "Culmination",
      desc: "A breathtaking romantic finale celebrating your love story.",
      badge: "Culmination",
    },
  ];

  return (
    <div data-testid="story-chapters-visualizer" className="space-y-6">
      {/* Emotional Pacing Selector */}
      <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-display font-medium text-white block">
              Emotional Narrative Pacing
            </span>
            <span className="text-[11px] text-white/50 font-ui">
              Controls scroll rhythm, atmosphere reveals, and cinematic pauses
            </span>
          </div>
          <Badge variant="rose" size="sm" className="text-[10px]">
            {pacing === "cinematic" ? "Dramatic" : pacing === "calm" ? "Spacious" : "Natural"}
          </Badge>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {[
            { id: "calm", label: "Calm", desc: "Gentle & spacious pauses" },
            { id: "balanced", label: "Balanced", desc: "Natural romantic flow" },
            { id: "cinematic", label: "Cinematic", desc: "Dramatic, theatrical reveals" },
          ].map((p) => {
            const isSelected = pacing === p.id;
            return (
              <button
                key={p.id}
                type="button"
                data-testid={`pacing-option-${p.id}`}
                onClick={() => onPacingChange(p.id as any)}
                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? "border-rose-400 bg-rose-950/60 text-white font-medium shadow-xs"
                    : "border-white/[0.08] bg-white/[0.03] text-white/70 hover:bg-white/[0.06]"
                }`}
              >
                <div className="text-xs font-medium text-white">{p.label}</div>
                <div className="text-[10px] text-white/50">{p.desc}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Chapter 1: Personal Welcome Customizer */}
      <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-base select-none">✨</span>
            <div>
              <span className="text-xs font-display font-medium text-white block">
                Chapter 1 · Welcome Threshold
              </span>
              <span className="text-[11px] text-white/50 font-ui">
                Personalized entrance before the envelope opens
              </span>
            </div>
          </div>
          <button
            type="button"
            data-testid="toggle-narrative-welcome"
            onClick={onToggleWelcome}
            className={`text-[11px] px-3 py-1 rounded-full font-ui cursor-pointer border transition-colors ${
              welcomeEnabled
                ? "bg-rose-500/20 border-rose-400/40 text-rose-200 font-medium"
                : "bg-white/[0.04] border-white/10 text-white/60 hover:text-white"
            }`}
          >
            {welcomeEnabled ? "✓ Customized" : "+ Customize Welcome"}
          </button>
        </div>

        {welcomeEnabled && (
          <div className="space-y-2.5 pt-2 animate-fadeIn border-t border-white/[0.06]">
            <div>
              <label
                htmlFor="welcome-greeting"
                className="block text-[11px] uppercase tracking-wider text-white/60 font-ui mb-1"
              >
                Entrance Greeting
              </label>
              <input
                id="welcome-greeting"
                type="text"
                placeholder="e.g. Welcome, My Love"
                data-testid="input-welcome-greeting"
                value={welcomeGreeting}
                onChange={(e) => onWelcomeGreetingChange(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/[0.1] text-white font-ui placeholder-white/25 focus:outline-none focus:border-rose-400"
              />
            </div>
            <div>
              <label
                htmlFor="welcome-message"
                className="block text-[11px] uppercase tracking-wider text-white/60 font-ui mb-1"
              >
                Personal Invitation Line
              </label>
              <input
                id="welcome-message"
                type="text"
                placeholder="e.g. Walk slowly through these quiet memories we made together."
                data-testid="input-welcome-message"
                value={welcomeMessage}
                onChange={(e) => onWelcomeMessageChange(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/[0.1] text-white font-ui placeholder-white/25 focus:outline-none focus:border-rose-400"
              />
            </div>
          </div>
        )}
      </div>

      {/* 7-Chapter Roadmap */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs uppercase tracking-wider text-white/60 font-ui font-medium">
            Story Chapter Architecture
          </span>
          <span className="text-[11px] text-white/40 font-mono">7 Chapters</span>
        </div>

        <div className="space-y-2">
          {chapters.map((ch, idx) => (
            <div
              key={ch.id}
              data-testid={`chapter-step-${ch.id}`}
              className="p-3 sm:p-3.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.06] transition-colors flex items-center justify-between gap-3 text-xs font-ui"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-[10px] font-mono text-rose-300/70 w-5 shrink-0">
                  {ch.order}
                </span>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-white truncate">{ch.name}</span>
                    <span className="text-[10px] text-white/35 hidden sm:inline">
                      • {ch.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-white/50 truncate font-light">
                    {ch.desc}
                  </p>
                </div>
              </div>
              <Badge variant="rose" size="sm" className="text-[9px] px-2 py-0.5 shrink-0 bg-white/[0.03] border-white/10 text-white/60">
                {ch.badge}
              </Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
