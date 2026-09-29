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
  preview: {
    tag: string;
    subtitle: string;
    body: string;
  };
}

const SCENES: StoryScene[] = [
  {
    id: "scene-1",
    step: "01 · Entrance",
    title: "A world created just for them",
    description:
      "They arrive at a private romantic sanctuary. Floating sunset clouds, candlelit midnight roses, or a quiet Kyoto mountain temple establish an atmosphere that belongs only to the two of you.",
    icon: "🌌",
    preview: {
      tag: "The Welcome",
      subtitle: "To My Favorite Person",
      body: "“Before you read what is inside, know that this entire space was built for you.”",
    },
  },
  {
    id: "scene-2",
    step: "02 · Narrative",
    title: "The story of how you grew",
    description:
      "Tell your love story through dedicated chapters. Pair words with shared photographs, unspoken memories, and the quiet moments that turned strangers into everything.",
    icon: "📖",
    preview: {
      tag: "Story Chapters",
      subtitle: "Where It All Began",
      body: "“It wasn't a sudden spark — it was a thousand little conversations that felt like coming home.”",
    },
  },
  {
    id: "scene-3",
    step: "03 · Timeline",
    title: "Every milestone preserved in time",
    description:
      "Map the path you walked together — that nervous first date, late-night phone calls, the first trip away, and the milestones that define your bond.",
    icon: "🕰️",
    preview: {
      tag: "Shared Timeline",
      subtitle: "October 14th · First Coffee",
      body: "“The cups grew cold because neither of us wanted the evening to end.”",
    },
  },
  {
    id: "scene-4",
    step: "04 · Moments",
    title: "Playful memories & sweet discoveries",
    description:
      "Bring your story to life with tactile moments — playful relationship trivia, scratch cards with hidden compliments, and reasons why you love them.",
    icon: "✨",
    preview: {
      tag: "Interactive Moments",
      subtitle: "Who Fell First?",
      body: "“You still claim it was mutual, but your smile gave it away the moment we said goodbye.”",
    },
  },
  {
    id: "scene-5",
    step: "05 · Secrets",
    title: "Open When envelopes for future days",
    description:
      "Leave sealed envelopes waiting for the moments they need you most — Open When you miss me, Open When you have had a hard day, or Open when you need reminding of how loved you are.",
    icon: "💌",
    preview: {
      tag: "Open When",
      subtitle: "Open When You Miss Me",
      body: "“Close your eyes. Take a deep breath. I am always closer than you think.”",
    },
  },
  {
    id: "scene-6",
    step: "06 · Future",
    title: "Whispers for the road ahead",
    description:
      "Seal heartfelt vows and dream together of future adventures — trips you will take, dreams you will build, and quiet evenings yet to come.",
    icon: "💫",
    preview: {
      tag: "Promises & Future",
      subtitle: "My Promise to You",
      body: "“To choose you every morning, even on the quiet days when words are few.”",
    },
  },
  {
    id: "scene-7",
    step: "07 · Keepsake",
    title: "A lasting digital keepsake",
    description:
      "Conclude with an emotional finale. A bespoke digital wax seal and tactile keepsake they can return to whenever they want to feel close to you.",
    icon: "🌹",
    preview: {
      tag: "The Finale",
      subtitle: "Forever Yours",
      body: "“With all my heart, now and in every chapter yet to come.”",
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
      className={`w-full max-w-6xl mx-auto px-6 py-20 sm:py-28 relative z-10 ${className}`}
    >
      {/* Header with Warm Candlelit Eyebrow */}
      <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-18">
        <Badge
          variant="rose"
          size="sm"
          className="mb-4 tracking-widest uppercase text-[11px] bg-rose-100/90 border-rose-300 text-[#881337] shadow-2xs font-medium font-sans"
        >
          ✦ Relationship Storytelling ✦
        </Badge>
        <h2 className="text-3xl sm:text-5xl font-serif font-medium text-[#240412] tracking-tight mb-4 leading-tight">
          Build a story that unfolds like a memory.
        </h2>
        <p className="text-sm sm:text-base text-[#4A0E2E] font-normal leading-relaxed">
          Valentino is not a static webpage. It is an emotional progression that moves from your very first moments to your shared future.
        </p>
      </div>

      {/* Scrollytelling Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start relative">
        {/* Left: Interactive & Scroll-Sensitive Scene Steps */}
        <div className="lg:col-span-6 space-y-3.5">
          {SCENES.map((scene, idx) => {
            const isActive = idx === activeSceneIndex;
            return (
              <motion.div
                key={scene.id}
                onViewportEnter={() => {
                  if (typeof window !== "undefined" && window.innerWidth >= 1024) {
                    setActiveSceneIndex(idx);
                  }
                }}
                viewport={{ margin: "-30% 0px -40% 0px" }}
                onClick={() => setActiveSceneIndex(idx)}
                className={`p-4 sm:p-5 rounded-2xl border transition-all duration-300 cursor-pointer select-none ${
                  isActive
                    ? "bg-white/90 border-rose-400 shadow-[0_8px_28px_-8px_rgba(225,29,72,0.18)] -translate-y-0.5"
                    : "bg-white/40 border-rose-100/80 hover:bg-white/70 hover:border-rose-200"
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
                <div className="flex items-start gap-3.5">
                  <span
                    className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm shrink-0 border transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-br from-rose-500 to-rose-700 border-rose-300 text-white shadow-sm scale-105"
                        : "bg-rose-50 border-rose-100 text-[#881337]"
                    }`}
                  >
                    {scene.icon}
                  </span>
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] uppercase tracking-[0.18em] font-mono text-[#881337] font-semibold">
                        {scene.step}
                      </span>
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shadow-[0_0_6px_#FB7185]" />
                      )}
                    </div>
                    <h3 className="text-base sm:text-lg font-serif font-medium text-[#240412]">
                      {scene.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#4A0E2E]/85 font-normal leading-relaxed">
                      {scene.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Right: Sticky Pinned Visual Card Canvas */}
        <div className="lg:col-span-6 lg:sticky lg:top-28 flex items-center justify-center">
          <div className="w-full max-w-md relative">
            {/* Ambient backlight glow */}
            <div className="absolute -inset-6 rounded-3xl bg-gradient-to-r from-rose-400/25 via-pink-300/20 to-transparent blur-3xl opacity-75 pointer-events-none" />

            {/* Visual Frame */}
            <div className="relative rounded-3xl bg-gradient-to-br from-[#2A0619] via-[#1F0413] to-[#14020C] border border-rose-400/30 p-7 sm:p-9 shadow-2xl text-white min-h-[380px] flex flex-col justify-between overflow-hidden">
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
                  transition={{ duration: 0.28, ease: "easeOut" }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between border-b border-white/[0.1] pb-4">
                    <span className="text-[11px] uppercase tracking-[0.2em] px-3.5 py-1 rounded-full bg-rose-950/80 border border-rose-400/40 text-rose-200 font-medium font-sans">
                      {currentScene.preview.tag}
                    </span>
                    <span className="text-xs font-mono text-white/60 font-medium">
                      {currentScene.step}
                    </span>
                  </div>

                  <div className="space-y-3 py-3">
                    <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-rose-600 to-pink-700 border border-rose-300/40 shadow-lg shadow-rose-950/60 flex items-center justify-center text-2xl">
                      {currentScene.icon}
                    </div>
                    <h4 className="text-2xl font-serif font-medium text-white">
                      {currentScene.preview.subtitle}
                    </h4>
                    <p className="text-sm sm:text-base text-white/85 font-light leading-relaxed italic">
                      {currentScene.preview.body}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs text-white/60 font-sans">
                    <span>A private world for two</span>
                    <span className="text-rose-300 font-serif font-medium">Valentino Experience</span>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Step Indicator Dots */}
              <div className="flex items-center justify-center gap-1.5 pt-6">
                {SCENES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveSceneIndex(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === activeSceneIndex ? "w-7 bg-rose-400 shadow-[0_0_8px_#FB7185]" : "w-1.5 bg-white/20 hover:bg-white/40"
                    }`}
                    aria-label={`Go to step ${i + 1}`}
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
