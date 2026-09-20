"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Badge } from "@/components/ui/Badge";

interface StoryScene {
  id: string;
  step: string;
  title: string;
  description: string;
  icon: string;
  accent: string;
  preview: {
    tag: string;
    subtitle: string;
    body: string;
  };
}

const SCENES: StoryScene[] = [
  {
    id: "scene-1",
    step: "Scene 01",
    title: "Choose the mood",
    description:
      "Select a romantic atmosphere that mirrors your shared memories — from deep midnight rose to warm sunset champagne.",
    icon: "✨",
    accent: "from-rose-600/30 to-rose-950/40 border-rose-500/30",
    preview: {
      tag: "Atmosphere",
      subtitle: "Midnight Rose v1",
      body: "Deep berry, rose candlelight, and starlight skies.",
    },
  },
  {
    id: "scene-2",
    step: "Scene 02",
    title: "Write what's in your heart",
    description:
      "A calm, distraction-free writing desk with real-time preview and instant autosave. No rush, just your thoughts.",
    icon: "✍️",
    accent: "from-pink-600/30 to-purple-950/40 border-pink-500/30",
    preview: {
      tag: "Private Studio",
      subtitle: "Dearest Maya",
      body: "“Every quiet moment with you feels like starlight...”",
    },
  },
  {
    id: "scene-3",
    step: "Scene 03",
    title: "Seal the surprise",
    description:
      "Your letter is placed inside a beautiful digital envelope, sealed with realistic crimson wax before sending.",
    icon: "💌",
    accent: "from-amber-600/30 to-rose-950/40 border-amber-500/30",
    preview: {
      tag: "Signature Touch",
      subtitle: "Sealed with Wax",
      body: "Tactile digital seal locks the letter until tapped.",
    },
  },
  {
    id: "scene-4",
    step: "Scene 04",
    title: "Send the private link",
    description:
      "One secret, unguessable link. No app downloads, no accounts, and never indexed by search engines.",
    icon: "🔒",
    accent: "from-emerald-600/30 to-slate-950/40 border-emerald-500/30",
    preview: {
      tag: "Total Privacy",
      subtitle: "valentino.love/v/...",
      body: "Encrypted token access stored only on your devices.",
    },
  },
  {
    id: "scene-5",
    step: "Scene 05",
    title: "Watch them open it",
    description:
      "They break the wax seal with a single tap, watching your letter unfold in a quiet, cinematic reveal.",
    icon: "🌹",
    accent: "from-rose-500/30 to-pink-950/40 border-rose-400/40",
    preview: {
      tag: "The Moment",
      subtitle: "Unsealed with Love",
      body: "“You turned ordinary days into poetry.”",
    },
  },
];

export function ScrollStorytelling({ className = "" }: { className?: string }) {
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const currentScene = SCENES[activeSceneIndex];

  return (
    <section
      id="how-it-works"
      className={`w-full max-w-6xl mx-auto px-6 py-20 sm:py-32 relative z-10 ${className}`}
    >
      {/* Header with Warm Candlelit Eyebrow */}
      <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-20">
        <Badge
          variant="rose"
          size="sm"
          className="mb-4 tracking-widest uppercase text-[11px] bg-[#3B0C1E]/80 border-rose-400/40 text-rose-200 shadow-[0_2px_12px_rgba(225,29,72,0.2)]"
        >
          Made for the moment
        </Badge>
        <h2 className="text-3xl sm:text-5xl font-serif font-medium text-[#FAF8F5] tracking-tight mb-4 leading-[1.18]">
          A love letter that feels as intentional as paper.
        </h2>
        <p className="text-sm sm:text-base text-[#FAF8F5]/75 font-light leading-relaxed">
          From the first word to the moment they break the wax seal, every detail was designed to make someone feel truly cherished.
        </p>
      </div>

      {/* Scrollytelling Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start relative">
        {/* Left: Interactive & Scroll-Sensitive Scene Steps */}
        <div className="lg:col-span-6 space-y-4">
          {SCENES.map((scene, idx) => {
            const isActive = idx === activeSceneIndex;
            return (
              <motion.div
                key={scene.id}
                onViewportEnter={() => {
                  // Only auto-advance on larger screens so mobile scrolling remains completely unhindered
                  if (typeof window !== "undefined" && window.innerWidth >= 1024) {
                    setActiveSceneIndex(idx);
                  }
                }}
                viewport={{ margin: "-30% 0px -40% 0px" }}
                onClick={() => setActiveSceneIndex(idx)}
                className={`p-5 sm:p-6 rounded-2xl border transition-all duration-500 cursor-pointer select-none ${
                  isActive
                    ? "bg-gradient-to-r from-[#2F081B]/95 via-[#230514]/90 to-[#1D0411]/90 border-rose-400/50 shadow-[0_12px_36px_-10px_rgba(225,29,72,0.25)] -translate-y-0.5"
                    : "bg-[#14030B]/40 border-white/[0.06] hover:bg-[#1C0510]/60 hover:border-white/15"
                }`}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveSceneIndex(idx);
                  }
                }}
              >
                <div className="flex items-start gap-4">
                  <span
                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-base shrink-0 border transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-br from-rose-500 to-rose-700 border-rose-300/80 text-white shadow-md shadow-rose-950/60 scale-105"
                        : "bg-white/[0.04] border-white/10 text-white/50"
                    }`}
                  >
                    {scene.icon}
                  </span>
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2.5">
                      <span className="text-[10px] uppercase tracking-[0.2em] font-mono text-rose-300/90 font-medium">
                        {scene.step}
                      </span>
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shadow-[0_0_8px_#FB7185]" />
                      )}
                    </div>
                    <h3 className="text-lg font-serif font-medium text-[#FAF8F5]">
                      {scene.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#FAF8F5]/70 font-light leading-relaxed">
                      {scene.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Right: Sticky Pinned Visual Card Canvas (Desktop) / Fluid Canvas (Mobile) */}
        <div className="lg:col-span-6 lg:sticky lg:top-32 flex items-center justify-center">
          <div className="w-full max-w-md relative">
            {/* Ambient backlight glow matching the scene palette */}
            <div className="absolute -inset-6 rounded-3xl bg-gradient-to-r from-rose-600/20 via-pink-500/15 to-transparent blur-3xl opacity-75 pointer-events-none" />

            {/* Visual Frame */}
            <div className="relative rounded-3xl bg-[#1A0510]/85 border border-rose-500/25 p-7 sm:p-9 shadow-2xl backdrop-blur-xl min-h-[380px] flex flex-col justify-between overflow-hidden">
              {/* Scene Content Transition: Crossfade & Subtle Depth Dissolve (No 3D flips) */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentScene.id}
                  initial={{
                    opacity: shouldReduceMotion ? 1 : 0,
                    scale: shouldReduceMotion ? 1 : 0.98,
                    y: shouldReduceMotion ? 0 : 8,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: shouldReduceMotion ? 1 : 0,
                    scale: shouldReduceMotion ? 1 : 0.98,
                    y: shouldReduceMotion ? 0 : -8,
                  }}
                  transition={{ duration: 0.32, ease: "easeOut" }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                    <span className="text-[11px] uppercase tracking-[0.2em] px-3.5 py-1 rounded-full bg-rose-950/70 border border-rose-400/40 text-rose-200 font-medium font-sans">
                      {currentScene.preview.tag}
                    </span>
                    <span className="text-xs font-mono text-[#FAF8F5]/60 font-medium">
                      {currentScene.step}
                    </span>
                  </div>

                  <div className="space-y-3 py-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-600 to-pink-700 border border-rose-400/60 shadow-lg shadow-rose-950/60 flex items-center justify-center text-2xl">
                      {currentScene.icon}
                    </div>
                    <h4 className="text-2xl font-serif font-medium text-[#FAF8F5]">
                      {currentScene.preview.subtitle}
                    </h4>
                    <p className="text-sm sm:text-base text-[#FAF8F5]/80 font-light leading-relaxed italic">
                      {currentScene.preview.body}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-[#FAF8F5]/60">
                    <span>Crafted with devotion</span>
                    <span className="text-rose-300 font-serif font-medium">Valentino Experience</span>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Step Indicator Dots */}
              <div className="flex items-center justify-center gap-2 pt-6">
                {SCENES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveSceneIndex(i)}
                    className={`h-1.5 rounded-full transition-all duration-400 ${
                      i === activeSceneIndex ? "w-8 bg-rose-400 shadow-[0_0_8px_#FB7185]" : "w-1.5 bg-white/20 hover:bg-white/40"
                    }`}
                    aria-label={`Go to scene ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
