"use client";

import React from "react";
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
  const chapters = [
    {
      id: "welcome",
      order: "01",
      name: "Welcome Greeting",
      status: welcomeEnabled ? "Customized" : "Default Entrance",
      badge: "Atmospheric",
    },
    {
      id: "story",
      order: "02",
      name: "The Core Love Letter",
      status: "Personal Message",
      badge: "Heart of World",
    },
    {
      id: "memories",
      order: "03",
      name: "Shared Milestones",
      status: "Timeline & Photographs",
      badge: "Milestones",
    },
    {
      id: "moments",
      order: "04",
      name: "Interactive Moments",
      status: activeMomentsCount > 0 ? `${activeMomentsCount} Active` : "Optional Keepsakes",
      badge: "Discovered",
    },
    {
      id: "promises",
      order: "05",
      name: "Sacred Promises",
      status: "Quiet Devotion",
      badge: "Vows",
    },
    {
      id: "future",
      order: "06",
      name: "Future Adventures",
      status: "The Unwritten Story",
      badge: "Tomorrow",
    },
    {
      id: "finale",
      order: "07",
      name: "Starlight Finale",
      status: "Emotional Culmination",
      badge: "Finale",
    },
  ];

  return (
    <div data-testid="story-chapters-visualizer" className="space-y-6">
      {/* 1. Narrative Pacing (Top Placement) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-serif uppercase tracking-wider text-white/70">
            Narrative Pacing
          </span>
          <span className="text-[10px] font-mono text-white/40">
            {pacing === "cinematic" ? "Theatrical pauses" : pacing === "calm" ? "Gentle rhythm" : "Natural flow"}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {[
            { id: "calm", label: "Calm", desc: "Gentle & spacious" },
            { id: "balanced", label: "Balanced", desc: "Natural flow" },
            { id: "cinematic", label: "Cinematic", desc: "Dramatic pauses" },
          ].map((p) => {
            const isSelected = pacing === p.id;
            return (
              <button
                key={p.id}
                type="button"
                data-testid={`pacing-option-${p.id}`}
                onClick={() => onPacingChange(p.id as any)}
                className={`py-2 px-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                  isSelected
                    ? "border-rose-400/60 bg-rose-950/40 text-white shadow-xs"
                    : "border-white/[0.06] bg-white/[0.02] text-white/60 hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                <div className="text-xs font-medium text-white">{p.label}</div>
                <div className="text-[10px] text-white/40 truncate">{p.desc}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Welcome Chapter Customization */}
      <div className="pt-2 border-t border-white/[0.06] space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-serif text-white block">
              Chapter 01 · Welcome Greeting
            </span>
            <span className="text-[11px] text-white/45 font-light">
              Personalized entrance threshold before envelope unfolds
            </span>
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
            {welcomeEnabled ? "✓ Customized" : "+ Customize"}
          </button>
        </div>

        {welcomeEnabled && (
          <div className="space-y-2.5 pt-2 animate-fadeIn pl-2 border-l border-rose-500/30">
            <div>
              <label
                htmlFor="welcome-greeting"
                className="block text-[11px] uppercase tracking-wider text-white/50 font-mono mb-1"
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
                className="w-full text-xs px-3 py-2 rounded-lg bg-black/40 border border-white/[0.1] text-white placeholder-white/25 focus:outline-none focus:border-rose-400"
              />
            </div>
            <div>
              <label
                htmlFor="welcome-message"
                className="block text-[11px] uppercase tracking-wider text-white/50 font-mono mb-1"
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
                className="w-full text-xs px-3 py-2 rounded-lg bg-black/40 border border-white/[0.1] text-white placeholder-white/25 focus:outline-none focus:border-rose-400"
              />
            </div>
          </div>
        )}
      </div>

      {/* 3. Compact Chapter Architecture (Editorial Rows, NOT Large Cards) */}
      <div className="pt-2 border-t border-white/[0.06] space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-serif uppercase tracking-wider text-white/70">
            Chapter Architecture
          </span>
          <span className="text-[10px] font-mono text-white/40">7 Chapters</span>
        </div>

        <div className="divide-y divide-white/[0.04] border-y border-white/[0.04]">
          {chapters.map((ch) => (
            <div
              key={ch.id}
              data-testid={`chapter-step-${ch.id}`}
              className="py-2.5 px-1 flex items-center justify-between gap-3 text-xs group hover:bg-white/[0.02] transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-[10px] font-mono text-rose-300/70 w-5 shrink-0">
                  {ch.order}
                </span>
                <div className="min-w-0 flex items-baseline gap-2">
                  <span className="font-serif text-white truncate text-sm">{ch.name}</span>
                  <span className="text-[11px] text-white/40 truncate font-light hidden sm:inline">
                    · {ch.status}
                  </span>
                </div>
              </div>
              <Badge
                variant="rose"
                size="sm"
                className="text-[9px] px-2 py-0.5 shrink-0 bg-white/[0.03] border-white/10 text-white/60 font-mono"
              >
                {ch.badge}
              </Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
