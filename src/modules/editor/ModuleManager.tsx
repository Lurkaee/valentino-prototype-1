"use client";

import React, { useState, useEffect } from "react";
import { SurpriseSpark } from "@/components/studio/SurpriseSpark";
import { FeatureDefinition } from "@/features/types";

interface ModuleManagerProps {
  modules?: any;
  hasHeroMedia?: boolean;
  onChange: (updater: (prevModules: any) => any) => void;
  onOpenFeatureDrawer?: () => void;
  onSelectFeature?: (feature: FeatureDefinition) => void;
  externalActiveMoment?: ActiveMoment;
}

export type ActiveMoment =
  | "timeline"
  | "quiz"
  | "secret"
  | "openWhen"
  | "reasons"
  | "compliments"
  | "fortuneCookie"
  | "scratchCard"
  | "promises"
  | "futureAdventures"
  | "adventureSpinner"
  | "finale"
  | null;

export const ModuleManager: React.FC<ModuleManagerProps> = ({
  modules = {},
  hasHeroMedia = false,
  onChange,
  onOpenFeatureDrawer,
  onSelectFeature,
  externalActiveMoment,
}) => {
  const [activeMoment, setActiveMoment] = useState<ActiveMoment>(null);
  const [isLibraryOpen, setIsLibraryOpen] = useState(true);

  useEffect(() => {
    if (externalActiveMoment) {
      setActiveMoment(externalActiveMoment);
    }
  }, [externalActiveMoment]);

  const timelineEnabled = Boolean(modules?.timeline?.enabled);
  const quizEnabled = Boolean(modules?.quiz?.enabled);
  const secretEnabled = Boolean(modules?.secret?.enabled);
  const openWhenEnabled = Boolean(modules?.openWhen?.enabled);
  const reasonsEnabled = Boolean(modules?.reasons?.enabled);
  const complimentsEnabled = Boolean(modules?.compliments?.enabled);
  const fortuneCookieEnabled = Boolean(modules?.fortuneCookie?.enabled);
  const scratchCardEnabled = Boolean(modules?.scratchCard?.enabled);
  const promisesEnabled = Boolean(modules?.promises?.enabled);
  const futureAdventuresEnabled = Boolean(modules?.futureAdventures?.enabled);
  const adventureSpinnerEnabled = Boolean(modules?.adventureSpinner?.enabled);
  const finaleEnabled = Boolean(modules?.finale?.enabled);

  const activeMomentList = [
    timelineEnabled && { key: "timeline", name: "Our Story", icon: "⏳", desc: "Chronological journey" },
    quizEnabled && { key: "quiz", name: "Love Quiz", icon: "💘", desc: "Playful trivia" },
    secretEnabled && { key: "secret", name: "Secret Note", icon: "💌", desc: "Hidden confession" },
    openWhenEnabled && { key: "openWhen", name: "Open When", icon: "✉️", desc: "Sealed messages" },
    reasonsEnabled && { key: "reasons", name: "Reasons I Love You", icon: "❤️", desc: "Infinite reasons" },
    complimentsEnabled && { key: "compliments", name: "Compliment Machine", icon: "✨", desc: "Daily love generator" },
    fortuneCookieEnabled && { key: "fortuneCookie", name: "Fortune Cookie", icon: "🥠", desc: "Crisp romantic destiny" },
    scratchCardEnabled && { key: "scratchCard", name: "Scratch Card", icon: "🎟️", desc: "Gold foil mystery" },
    promisesEnabled && { key: "promises", name: "Promise Wall", icon: "💍", desc: "Lifelong vows" },
    futureAdventuresEnabled && { key: "futureAdventures", name: "Future Adventures", icon: "🗺️", desc: "Shared bucket list" },
    adventureSpinnerEnabled && { key: "adventureSpinner", name: "Adventure Spinner", icon: "🎡", desc: "Date night roulette" },
    finaleEnabled && { key: "finale", name: "Emotional Finale", icon: "🌹", desc: "Grand declaration" },
  ].filter(Boolean) as { key: string; name: string; icon: string; desc: string }[];

  const anyEnabled =
    timelineEnabled ||
    quizEnabled ||
    secretEnabled ||
    openWhenEnabled ||
    reasonsEnabled ||
    complimentsEnabled ||
    fortuneCookieEnabled ||
    scratchCardEnabled ||
    promisesEnabled ||
    futureAdventuresEnabled ||
    adventureSpinnerEnabled ||
    finaleEnabled;

  const activeCount =
    (timelineEnabled ? 1 : 0) +
    (quizEnabled ? 1 : 0) +
    (secretEnabled ? 1 : 0) +
    (openWhenEnabled ? 1 : 0) +
    (reasonsEnabled ? 1 : 0) +
    (complimentsEnabled ? 1 : 0) +
    (fortuneCookieEnabled ? 1 : 0) +
    (scratchCardEnabled ? 1 : 0) +
    (promisesEnabled ? 1 : 0) +
    (futureAdventuresEnabled ? 1 : 0) +
    (adventureSpinnerEnabled ? 1 : 0) +
    (finaleEnabled ? 1 : 0);

  const toggleModule = (key: string, defaultData: any) => {
    onChange((prev: any) => {
      const current = prev?.[key] || {};
      const nextEnabled = !current.enabled;
      return {
        ...prev,
        [key]: {
          ...defaultData,
          ...current,
          enabled: nextEnabled,
        },
      };
    });
    if (!modules?.[key]?.enabled) {
      setActiveMoment(key as ActiveMoment);
    } else if (activeMoment === key) {
      setActiveMoment(null);
    }
  };

  return (
    <div className="space-y-5" data-testid="experience-module-manager">
      {/* Header & Emotional Purpose */}
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-base select-none">✨</span>
            <h2 className="text-base font-display font-medium text-white">
              Moments & Interactive Experiences
            </h2>
          </div>
          <p className="text-xs text-white/60 font-ui font-light">
            Compose surprising, multi-layered chapters for your partner to explore.
          </p>
        </div>

        {/* Experience Flow Badges */}
        <div className="flex items-center gap-2 text-xs font-ui shrink-0">
          <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 text-[11px]">
            <span>✓</span>
            <span>Love Letter</span>
          </div>
          <div
            className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full border text-[11px] ${
              hasHeroMedia
                ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                : "bg-white/[0.04] text-white/40 border-white/[0.08]"
            }`}
          >
            <span>{hasHeroMedia ? "✓" : "○"}</span>
            <span>Memory Photo</span>
          </div>
        </div>
      </div>

      {/* Editorial Empty State (Inviting, warm, non-broken) */}
      {!anyEnabled && (
        <div className="p-6 rounded-2xl bg-white/[0.02] border border-dashed border-white/[0.12] text-center space-y-3">
          <div className="w-10 h-10 mx-auto rounded-full bg-white/[0.05] border border-white/[0.1] flex items-center justify-center text-lg select-none">
            📖
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-display font-medium text-white">
              Your story is still blank.
            </h3>
            <p className="text-xs text-white/60 font-ui font-light max-w-sm mx-auto">
              Add the first little moment to make this an unforgettable interactive experience.
            </p>
          </div>
        </div>
      )}

      {/* Selected Moments: Progressive Disclosure */}
      {anyEnabled && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-serif uppercase tracking-wider text-white/70">
              Your Moments
            </span>
            <span className="text-[10px] font-mono text-white/40">
              {activeCount} Active
            </span>
          </div>

          <div className="divide-y divide-white/[0.04] border-y border-white/[0.04]">
            {activeMomentList.map((m) => (
              <div
                key={m.key}
                className="py-2 px-1 flex items-center justify-between gap-3 text-xs group hover:bg-white/[0.02] transition-colors"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="text-base select-none">{m.icon}</span>
                  <div className="min-w-0">
                    <span className="font-serif text-white block text-sm truncate">{m.name}</span>
                    <span className="text-[10px] text-white/40 truncate block">{m.desc}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={() => setActiveMoment(activeMoment === m.key ? null : (m.key as ActiveMoment))}
                    className="text-xs font-mono uppercase tracking-wider text-white/70 hover:text-white cursor-pointer transition-colors"
                  >
                    {activeMoment === m.key ? "Editing ▾" : "Edit ✎"}
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleModule(m.key, {})}
                    className="text-xs text-white/40 hover:text-rose-400 p-1 cursor-pointer transition-colors"
                    title="Remove moment"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-1 flex items-center justify-between">
            <button
              type="button"
              data-testid="add-moment-trigger"
              onClick={() => setIsLibraryOpen(!isLibraryOpen)}
              className="text-xs font-serif italic text-white/70 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer py-1"
            >
              <span>{isLibraryOpen ? "▾ Hide Moment Library" : "+ Add a moment to your story"}</span>
            </button>
          </div>
        </div>
      )}

      {/* Available Moment Library Grid */}
      {(!anyEnabled || isLibraryOpen || Boolean(externalActiveMoment)) && (
        <div className="space-y-2.5 pt-1 animate-fadeIn p-3 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-wider text-white/50">
              {anyEnabled ? "Browse Available Moments" : "Choose a Moment to Add"}
            </span>
            {anyEnabled && (
              <button
                type="button"
                onClick={() => setIsLibraryOpen(false)}
                className="text-[10px] font-mono text-white/40 hover:text-white cursor-pointer"
              >
                Done ✕
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {/* 1. Timeline */}
          <button
            type="button"
            data-testid="toggle-module-timeline"
            onClick={() => {
              if (!timelineEnabled) {
                toggleModule("timeline", {
                  title: "Our Journey Together",
                  subtitle: "The moments that brought us here",
                  items: [
                    {
                      id: "m1",
                      title: "The Day We Met",
                      date: "Where it all started",
                      description:
                        "I remember looking at you and knowing something in my life had shifted forever.",
                    },
                    {
                      id: "m2",
                      title: "Our First Trip",
                      date: "A sweet memory",
                      description: "Getting lost together was the best part of the whole journey.",
                    },
                  ],
                });
              } else {
                setActiveMoment(activeMoment === "timeline" ? null : "timeline");
              }
            }}
            className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer group ${
              timelineEnabled
                ? "border-rose-400/40 bg-rose-950/40 text-white shadow-xs"
                : "border-white/[0.08] bg-white/[0.03] text-white/70 hover:bg-white/[0.06] hover:border-white/[0.15]"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-lg select-none">⏳</span>
              <span
                className={`text-[10px] font-ui px-1.5 py-0.5 rounded-md ${
                  timelineEnabled
                    ? "bg-rose-500/20 text-rose-300 font-medium"
                    : "bg-white/[0.06] text-white/50"
                }`}
              >
                {timelineEnabled ? "✓ Active" : "+ Add"}
              </span>
            </div>
            <div>
              <span className="text-xs font-display font-medium block text-white">Our Story</span>
              <span className="text-[10px] text-white/50 font-ui truncate block">Chronological journey</span>
            </div>
          </button>

          {/* 2. Love Quiz */}
          <button
            type="button"
            data-testid="toggle-module-quiz"
            onClick={() => {
              if (!quizEnabled) {
                toggleModule("quiz", {
                  title: "How Well Do You Know Us?",
                  subtitle: "A sweet little test of our story",
                  completionMessage:
                    "No matter what, my favorite place in the world is right next to you. ❤️",
                  questions: [
                    {
                      id: "q1",
                      question: "Where was our very first date?",
                      options: [
                        "Cozy coffee shop",
                        "Quiet park bench",
                        "Dinner under fairy lights",
                        "Spontaneous walk",
                      ],
                      correctIndex: 0,
                      explanation: "You ordered your favorite coffee and I couldn't stop smiling.",
                    },
                    {
                      id: "q2",
                      question: "Who said 'I love you' first?",
                      options: ["You did", "I did", "We said it together", "A whisper in the car"],
                      correctIndex: 1,
                      explanation: "I couldn't hold it in for another second.",
                    },
                  ],
                });
              } else {
                setActiveMoment(activeMoment === "quiz" ? null : "quiz");
              }
            }}
            className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer group ${
              quizEnabled
                ? "border-rose-400/40 bg-rose-950/40 text-white shadow-xs"
                : "border-white/[0.08] bg-white/[0.03] text-white/70 hover:bg-white/[0.06] hover:border-white/[0.15]"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-lg select-none">💘</span>
              <span
                className={`text-[10px] font-ui px-1.5 py-0.5 rounded-md ${
                  quizEnabled
                    ? "bg-rose-500/20 text-rose-300 font-medium"
                    : "bg-white/[0.06] text-white/50"
                }`}
              >
                {quizEnabled ? "✓ Active" : "+ Add"}
              </span>
            </div>
            <div>
              <span className="text-xs font-display font-medium block text-white">Love Quiz</span>
              <span className="text-[10px] text-white/50 font-ui truncate block">Playful trivia</span>
            </div>
          </button>

          {/* 3. Secret Note */}
          <button
            type="button"
            data-testid="toggle-module-secret"
            onClick={() => {
              if (!secretEnabled) {
                toggleModule("secret", {
                  title: "A Little Secret",
                  prompt: "Tap to reveal what's hidden inside",
                  hint: "Only for your eyes",
                  secretContent: "I knew I loved you long before I ever said it out loud.",
                });
              } else {
                setActiveMoment(activeMoment === "secret" ? null : "secret");
              }
            }}
            className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer group ${
              secretEnabled
                ? "border-rose-400/40 bg-rose-950/40 text-white shadow-xs"
                : "border-white/[0.08] bg-white/[0.03] text-white/70 hover:bg-white/[0.06] hover:border-white/[0.15]"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-lg select-none">🔐</span>
              <span
                className={`text-[10px] font-ui px-1.5 py-0.5 rounded-md ${
                  secretEnabled
                    ? "bg-rose-500/20 text-rose-300 font-medium"
                    : "bg-white/[0.06] text-white/50"
                }`}
              >
                {secretEnabled ? "✓ Active" : "+ Add"}
              </span>
            </div>
            <div>
              <span className="text-xs font-display font-medium block text-white">Secret Note</span>
              <span className="text-[10px] text-white/50 font-ui truncate block">Private confession</span>
            </div>
          </button>

          {/* 4. Open When Letters */}
          <button
            type="button"
            data-testid="toggle-module-openWhen"
            onClick={() => {
              if (!openWhenEnabled) {
                toggleModule("openWhen", {
                  title: "Open When...",
                  subtitle: "Letters for the days ahead",
                  envelopes: [
                    {
                      id: "env1",
                      title: "Open when you miss me",
                      context: "When we are apart",
                      message:
                        "Close your eyes and take a deep breath. Every second brings me closer to seeing you again.",
                    },
                    {
                      id: "env2",
                      title: "Open when you need a smile",
                      context: "For hard days",
                      message:
                        "Remember that you are so deeply loved, cherished, and admired. You light up my world.",
                    },
                  ],
                });
              } else {
                setActiveMoment(activeMoment === "openWhen" ? null : "openWhen");
              }
            }}
            className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer group ${
              openWhenEnabled
                ? "border-rose-400/40 bg-rose-950/40 text-white shadow-xs"
                : "border-white/[0.08] bg-white/[0.03] text-white/70 hover:bg-white/[0.06] hover:border-white/[0.15]"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-lg select-none">💌</span>
              <span
                className={`text-[10px] font-ui px-1.5 py-0.5 rounded-md ${
                  openWhenEnabled
                    ? "bg-rose-500/20 text-rose-300 font-medium"
                    : "bg-white/[0.06] text-white/50"
                }`}
              >
                {openWhenEnabled ? "✓ Active" : "+ Add"}
              </span>
            </div>
            <div>
              <span className="text-xs font-display font-medium block text-white">Open When</span>
              <span className="text-[10px] text-white/50 font-ui truncate block">Future envelopes</span>
            </div>
          </button>
          {/* 5. Reasons I Love You */}
          <button
            type="button"
            data-testid="toggle-module-reasons"
            onClick={() => {
              if (!reasonsEnabled) {
                toggleModule("reasons", {
                  title: "Reasons I Love You",
                  subtitle: "A few of the countless reasons why my heart chose you",
                  viewMode: "step",
                  items: [
                    {
                      id: "r1",
                      title: "Your Gentle Laugh",
                      text: "The way you laugh when you think nobody is watching makes any room feel like home.",
                    },
                    {
                      id: "r2",
                      title: "How You Care",
                      text: "Your empathy is boundless, and the kindness you give to the world inspires me daily.",
                    },
                    {
                      id: "r3",
                      title: "Every Ordinary Morning",
                      text: "Even quiet mornings with coffee and your presence feel like a dream.",
                    },
                  ],
                });
              } else {
                setActiveMoment(activeMoment === "reasons" ? null : "reasons");
              }
            }}
            className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer group ${
              reasonsEnabled
                ? "border-rose-400/40 bg-rose-950/40 text-white shadow-xs"
                : "border-white/[0.08] bg-white/[0.03] text-white/70 hover:bg-white/[0.06] hover:border-white/[0.15]"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-lg select-none">💖</span>
              <span
                className={`text-[10px] font-ui px-1.5 py-0.5 rounded-md ${
                  reasonsEnabled
                    ? "bg-rose-500/20 text-rose-300 font-medium"
                    : "bg-white/[0.06] text-white/50"
                }`}
              >
                {reasonsEnabled ? "✓ Active" : "+ Add"}
              </span>
            </div>
            <div>
              <span className="text-xs font-display font-medium block text-white">Reasons</span>
              <span className="text-[10px] text-white/50 font-ui truncate block">Why I love you</span>
            </div>
          </button>

          {/* 6. Compliment Machine */}
          <button
            type="button"
            data-testid="toggle-module-compliments"
            onClick={() => {
              if (!complimentsEnabled) {
                const initialCompliments = [
                  "Your smile is my favorite thing in the universe.",
                  "You make the world warmer just by existing in it.",
                  "I fall in love with you all over again every single day.",
                  "You have the kindest, most radiant heart.",
                ];
                toggleModule("compliments", {
                  title: "Heartfelt Reminders",
                  subtitle: "Whenever you need a reminder of how extraordinary you are",
                  buttonLabel: "Tell Me Something Sweet",
                  items: initialCompliments,
                  pool: initialCompliments,
                });
              } else {
                setActiveMoment(activeMoment === "compliments" ? null : "compliments");
              }
            }}
            className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer group ${
              complimentsEnabled
                ? "border-rose-400/40 bg-rose-950/40 text-white shadow-xs"
                : "border-white/[0.08] bg-white/[0.03] text-white/70 hover:bg-white/[0.06] hover:border-white/[0.15]"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-lg select-none">✨</span>
              <span
                className={`text-[10px] font-ui px-1.5 py-0.5 rounded-md ${
                  complimentsEnabled
                    ? "bg-rose-500/20 text-rose-300 font-medium"
                    : "bg-white/[0.06] text-white/50"
                }`}
              >
                {complimentsEnabled ? "✓ Active" : "+ Add"}
              </span>
            </div>
            <div>
              <span className="text-xs font-display font-medium block text-white">Compliments</span>
              <span className="text-[10px] text-white/50 font-ui truncate block">Instant sweetness</span>
            </div>
          </button>

          {/* 7. Fortune Cookie */}
          <button
            type="button"
            data-testid="toggle-module-fortuneCookie"
            onClick={() => {
              if (!fortuneCookieEnabled) {
                toggleModule("fortuneCookie", {
                  title: "Your Fortune Awaits",
                  subtitle: "Crack open a sweet whisper about what the future holds for us",
                  fortunes: [
                    "A lifetime of quiet morning coffee and warm hugs is guaranteed.",
                    "The stars have aligned: an unforgettable date night is coming soon.",
                    "You will always find home inside my arms, no matter the storm.",
                  ],
                });
              } else {
                setActiveMoment(activeMoment === "fortuneCookie" ? null : "fortuneCookie");
              }
            }}
            className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer group ${
              fortuneCookieEnabled
                ? "border-rose-400/40 bg-rose-950/40 text-white shadow-xs"
                : "border-white/[0.08] bg-white/[0.03] text-white/70 hover:bg-white/[0.06] hover:border-white/[0.15]"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-lg select-none">🥠</span>
              <span
                className={`text-[10px] font-ui px-1.5 py-0.5 rounded-md ${
                  fortuneCookieEnabled
                    ? "bg-rose-500/20 text-rose-300 font-medium"
                    : "bg-white/[0.06] text-white/50"
                }`}
              >
                {fortuneCookieEnabled ? "✓ Active" : "+ Add"}
              </span>
            </div>
            <div>
              <span className="text-xs font-display font-medium block text-white">Fortune Cookie</span>
              <span className="text-[10px] text-white/50 font-ui truncate block">Playful fortunes</span>
            </div>
          </button>

          {/* 8. Scratch Card */}
          <button
            type="button"
            data-testid="toggle-module-scratchCard"
            onClick={() => {
              if (!scratchCardEnabled) {
                toggleModule("scratchCard", {
                  title: "Scratch to Reveal",
                  subtitle: "A tactile secret hidden just under the surface",
                  frontMessage: "Scratch below with your finger or mouse to unveil the surprise",
                  hiddenMessage: "I loved you yesterday, I love you today, and I'll love you forever.",
                  coverColor: "#E11D48",
                });
              } else {
                setActiveMoment(activeMoment === "scratchCard" ? null : "scratchCard");
              }
            }}
            className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer group ${
              scratchCardEnabled
                ? "border-rose-400/40 bg-rose-950/40 text-white shadow-xs"
                : "border-white/[0.08] bg-white/[0.03] text-white/70 hover:bg-white/[0.06] hover:border-white/[0.15]"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-lg select-none">🪄</span>
              <span
                className={`text-[10px] font-ui px-1.5 py-0.5 rounded-md ${
                  scratchCardEnabled
                    ? "bg-rose-500/20 text-rose-300 font-medium"
                    : "bg-white/[0.06] text-white/50"
                }`}
              >
                {scratchCardEnabled ? "✓ Active" : "+ Add"}
              </span>
            </div>
            <div>
              <span className="text-xs font-display font-medium block text-white">Scratch Card</span>
              <span className="text-[10px] text-white/50 font-ui truncate block">Tactile reveal</span>
            </div>
          </button>

          {/* 9. Promise Wall */}
          <button
            type="button"
            data-testid="toggle-module-promises"
            onClick={() => {
              if (!promisesEnabled) {
                const initialPromises = [
                  {
                    id: "p1",
                    text: "I promise to always listen with an open heart, even when words are hard to find.",
                    category: "Devotion",
                  },
                  {
                    id: "p2",
                    text: "I promise to save the last bite of dessert for you, always.",
                    category: "Sweetness",
                  },
                  {
                    id: "p3",
                    text: "I promise to be your safest refuge on your darkest days.",
                    category: "Forever",
                  },
                ];
                toggleModule("promises", {
                  title: "My Vows & Promises",
                  subtitle: "Words etched into eternity between us",
                  items: initialPromises,
                  promises: initialPromises,
                });
              } else {
                setActiveMoment(activeMoment === "promises" ? null : "promises");
              }
            }}
            className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer group ${
              promisesEnabled
                ? "border-rose-400/40 bg-rose-950/40 text-white shadow-xs"
                : "border-white/[0.08] bg-white/[0.03] text-white/70 hover:bg-white/[0.06] hover:border-white/[0.15]"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-lg select-none">💍</span>
              <span
                className={`text-[10px] font-ui px-1.5 py-0.5 rounded-md ${
                  promisesEnabled
                    ? "bg-rose-500/20 text-rose-300 font-medium"
                    : "bg-white/[0.06] text-white/50"
                }`}
              >
                {promisesEnabled ? "✓ Active" : "+ Add"}
              </span>
            </div>
            <div>
              <span className="text-xs font-display font-medium block text-white">Promise Wall</span>
              <span className="text-[10px] text-white/50 font-ui truncate block">Lifelong vows</span>
            </div>
          </button>

          {/* 10. Future Adventures */}
          <button
            type="button"
            data-testid="toggle-module-futureAdventures"
            onClick={() => {
              if (!futureAdventuresEnabled) {
                const initialAdventures = [
                  {
                    id: "a1",
                    title: "Watch the sunrise on the coast",
                    description: "Blankets, warm cocoa, and early ocean air",
                    category: "Travel",
                    status: "planned" as const,
                  },
                  {
                    id: "a2",
                    title: "Cook a 5-course dinner from scratch",
                    description: "Messy kitchen, favorite playlist playing",
                    category: "Date",
                    status: "someday" as const,
                  },
                  {
                    id: "a3",
                    title: "Our very first road trip together",
                    description: "Windows down, singing off-key",
                    category: "Memory",
                    status: "completed" as const,
                  },
                ];
                toggleModule("futureAdventures", {
                  title: "Our Bucket List",
                  subtitle: "The adventures we have lived, and the ones waiting for us",
                  items: initialAdventures,
                  adventures: initialAdventures,
                });
              } else {
                setActiveMoment(activeMoment === "futureAdventures" ? null : "futureAdventures");
              }
            }}
            className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer group ${
              futureAdventuresEnabled
                ? "border-rose-400/40 bg-rose-950/40 text-white shadow-xs"
                : "border-white/[0.08] bg-white/[0.03] text-white/70 hover:bg-white/[0.06] hover:border-white/[0.15]"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-lg select-none">🗺️</span>
              <span
                className={`text-[10px] font-ui px-1.5 py-0.5 rounded-md ${
                  futureAdventuresEnabled
                    ? "bg-rose-500/20 text-rose-300 font-medium"
                    : "bg-white/[0.06] text-white/50"
                }`}
              >
                {futureAdventuresEnabled ? "✓ Active" : "+ Add"}
              </span>
            </div>
            <div>
              <span className="text-xs font-display font-medium block text-white">Adventures</span>
              <span className="text-[10px] text-white/50 font-ui truncate block">Bucket list</span>
            </div>
          </button>

          {/* 11. Adventure Spinner */}
          <button
            type="button"
            data-testid="toggle-module-adventureSpinner"
            onClick={() => {
              if (!adventureSpinnerEnabled) {
                toggleModule("adventureSpinner", {
                  title: "What Should We Do Next?",
                  subtitle: "Can't decide? Let the adventure wheel choose our next date!",
                  options: [
                    "Candlelit Dinner & Vinyl Records",
                    "Stargazing on the Roof",
                    "Spontaneous Late-Night Boba Run",
                    "Cozy Blanket Fort Movie Marathon",
                    "Try a New Little Bistro in Town",
                  ],
                });
              } else {
                setActiveMoment(activeMoment === "adventureSpinner" ? null : "adventureSpinner");
              }
            }}
            className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer group ${
              adventureSpinnerEnabled
                ? "border-rose-400/40 bg-rose-950/40 text-white shadow-xs"
                : "border-white/[0.08] bg-white/[0.03] text-white/70 hover:bg-white/[0.06] hover:border-white/[0.15]"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-lg select-none">🎡</span>
              <span
                className={`text-[10px] font-ui px-1.5 py-0.5 rounded-md ${
                  adventureSpinnerEnabled
                    ? "bg-rose-500/20 text-rose-300 font-medium"
                    : "bg-white/[0.06] text-white/50"
                }`}
              >
                {adventureSpinnerEnabled ? "✓ Active" : "+ Add"}
              </span>
            </div>
            <div>
              <span className="text-xs font-display font-medium block text-white">Date Spinner</span>
              <span className="text-[10px] text-white/50 font-ui truncate block">Spin to decide</span>
            </div>
          </button>

          {/* 12. Emotional Finale */}
          <button
            type="button"
            data-testid="toggle-module-finale"
            onClick={() => {
              if (!finaleEnabled) {
                toggleModule("finale", {
                  title: "To You, Always",
                  subtitle: "The culmination of our story",
                  declaration:
                    "From the very first moment to every tomorrow, you are the greatest adventure of my life. My heart is yours, today and forever.",
                  signature: "Always & Forever",
                  promisesHighlight: "With every memory, reason, and vow — I choose you.",
                  sealText: "Seal Our Forever",
                  showKeepsakeAction: true,
                  showKeepsakePrompt: true,
                });
              } else {
                setActiveMoment(activeMoment === "finale" ? null : "finale");
              }
            }}
            className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer group ${
              finaleEnabled
                ? "border-rose-400/40 bg-rose-950/40 text-white shadow-xs"
                : "border-white/[0.08] bg-white/[0.03] text-white/70 hover:bg-white/[0.06] hover:border-white/[0.15]"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-lg select-none">🌹</span>
              <span
                className={`text-[10px] font-ui px-1.5 py-0.5 rounded-md ${
                  finaleEnabled
                    ? "bg-rose-500/20 text-rose-300 font-medium"
                    : "bg-white/[0.06] text-white/50"
                }`}
              >
                {finaleEnabled ? "✓ Active" : "+ Add"}
              </span>
            </div>
            <div>
              <span className="text-xs font-display font-medium block text-white">Finale</span>
              <span className="text-[10px] text-white/50 font-ui truncate block">Grand declaration</span>
            </div>
          </button>
        </div>
        </div>
      )}

        {/* Feature Discovery Action Row: Explore More & Surprise Me */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.06]">
          <button
            type="button"
            data-testid="explore-features-trigger"
            onClick={onOpenFeatureDrawer}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 text-white/80 hover:text-white text-xs font-ui font-medium transition-all shadow-xs"
          >
            <span className="text-sm select-none">✨</span>
            <span>Explore More Moments & Capabilities</span>
            <span className="text-[10px] text-white/40 font-mono tracking-wider">➔</span>
          </button>

          <SurpriseSpark
            activeModuleKeys={[
              ...(timelineEnabled ? ["timeline"] : []),
              ...(quizEnabled ? ["quiz"] : []),
              ...(secretEnabled ? ["secret"] : []),
              ...(openWhenEnabled ? ["openWhen"] : []),
              ...(reasonsEnabled ? ["reasons"] : []),
              ...(complimentsEnabled ? ["compliments"] : []),
              ...(fortuneCookieEnabled ? ["fortuneCookie"] : []),
              ...(scratchCardEnabled ? ["scratchCard"] : []),
              ...(promisesEnabled ? ["promises"] : []),
              ...(futureAdventuresEnabled ? ["futureAdventures"] : []),
              ...(adventureSpinnerEnabled ? ["adventureSpinner"] : []),
              ...(finaleEnabled ? ["finale"] : []),
            ]}
            onSelectFeature={(feature) => {
              if (feature.targetModuleKey) {
                if (feature.targetModuleKey === "timeline" && !timelineEnabled) {
                  toggleModule("timeline", {
                    title: "Our Journey Together",
                    subtitle: "The moments that brought us here",
                    items: [
                      {
                        id: "m1",
                        title: "The Day We Met",
                        date: "Where it all started",
                        description:
                          "I remember looking at you and knowing something in my life had shifted forever.",
                      },
                      {
                        id: "m2",
                        title: "Our First Trip",
                        date: "A sweet memory",
                        description: "Getting lost together was the best part of the whole journey.",
                      },
                    ],
                  });
                } else if (feature.targetModuleKey === "quiz" && !quizEnabled) {
                  toggleModule("quiz", {
                    title: "How Well Do You Know Us?",
                    subtitle: "A sweet little test of our story",
                    completionMessage: "No matter what, my favorite place is with you. ❤️",
                    questions: [
                      {
                        id: "q1",
                        question: "Where did we have our very first date?",
                        options: [
                          "Quiet coffee shop",
                          "Late-night ramen",
                          "Starlit walk in the park",
                          "Cozy bookstore",
                        ],
                        correctIndex: 0,
                        explanation:
                          "You were five minutes early, and I was nervous the entire walk there.",
                      },
                    ],
                  });
                } else if (feature.targetModuleKey === "secret" && !secretEnabled) {
                  toggleModule("secret", {
                    title: "A Little Secret",
                    prompt: "Tap to reveal what's hidden inside",
                    hint: "Only for your eyes",
                    secretContent:
                      "I knew I loved you long before I ever said it out loud.",
                  });
                } else if (feature.targetModuleKey === "openWhen" && !openWhenEnabled) {
                  toggleModule("openWhen", {
                    title: "Open When...",
                    subtitle: "Letters for the days ahead",
                    envelopes: [
                      {
                        id: "env1",
                        title: "Open when you miss me",
                        context: "When we are apart",
                        message:
                          "Close your eyes and take a deep breath. Every second brings me closer to seeing you again.",
                      },
                    ],
                  });
                } else {
                  setActiveMoment(feature.targetModuleKey);
                }
              }
              onSelectFeature?.(feature);
            }}
          />
        </div>

      {/* Progressive Disclosure Moment Editors */}

      {/* 1. Timeline Form */}
      {timelineEnabled && activeMoment === "timeline" && (
        <div
          data-testid="timeline-module-editor"
          className="p-5 rounded-2xl bg-white/[0.03] border border-rose-500/30 space-y-4 animate-fadeIn"
        >
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
            <div className="flex items-center gap-2">
              <span className="text-base">⏳</span>
              <div>
                <span className="text-sm font-display font-medium text-white block">
                  Our Journey Timeline
                </span>
                <span className="text-[11px] text-white/50 font-ui">
                  Chronological chapters of your shared milestones
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => toggleModule("timeline", {})}
              className="text-[11px] text-rose-400 hover:text-rose-300 underline font-ui cursor-pointer"
            >
              Disable Moment
            </button>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-[11px] text-white/70 font-ui font-medium block mb-1">
                Timeline Title
              </label>
              <input
                type="text"
                data-testid="input-timeline-title"
                value={modules.timeline.title || ""}
                onChange={(e) =>
                  onChange((prev) => ({
                    ...prev,
                    timeline: { ...prev.timeline, title: e.target.value },
                  }))
                }
                className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/[0.12] text-white focus:outline-none focus:border-rose-400 font-ui"
              />
            </div>

            {/* Milestones List */}
            <div className="space-y-2.5 pt-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-white/70 font-ui font-medium">
                  Milestones ({modules.timeline.items?.length || 0})
                </span>
                <button
                  type="button"
                  data-testid="timeline-add-item"
                  onClick={() =>
                    onChange((prev) => ({
                      ...prev,
                      timeline: {
                        ...prev.timeline,
                        items: [
                          ...(prev.timeline.items || []),
                          {
                            id: `m-${Date.now()}`,
                            title: "New Cherished Moment",
                            date: "A special date",
                            description: "Write what made this moment unforgettable…",
                          },
                        ],
                      },
                    }))
                  }
                  className="text-[11px] px-2.5 py-1 rounded-lg bg-white/[0.08] hover:bg-white/[0.15] text-white border border-white/[0.1] font-ui transition-colors cursor-pointer"
                >
                  + Add Milestone
                </button>
              </div>

              {(modules.timeline.items || []).map((item: any, idx: number) => (
                <div
                  key={item.id || idx}
                  className="p-3.5 rounded-xl bg-black/30 border border-white/[0.06] space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-rose-300 font-mono">
                      Milestone #{idx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        onChange((prev) => ({
                          ...prev,
                          timeline: {
                            ...prev.timeline,
                            items: prev.timeline.items.filter((_: any, i: number) => i !== idx),
                          },
                        }))
                      }
                      className="text-[10px] text-rose-400/80 hover:text-rose-300 font-ui"
                    >
                      Remove ✕
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Title"
                      data-testid={`input-timeline-item-title-${idx}`}
                      value={item.title}
                      onChange={(e) =>
                        onChange((prev) => {
                          const items = [...prev.timeline.items];
                          items[idx].title = e.target.value;
                          return { ...prev, timeline: { ...prev.timeline, items } };
                        })
                      }
                      className="text-xs px-2.5 py-2 rounded-lg bg-black/40 border border-white/[0.1] text-white font-ui"
                    />
                    <input
                      type="text"
                      placeholder="Date or Timeframe"
                      data-testid={`input-timeline-item-date-${idx}`}
                      value={item.date}
                      onChange={(e) =>
                        onChange((prev) => {
                          const items = [...prev.timeline.items];
                          items[idx].date = e.target.value;
                          return { ...prev, timeline: { ...prev.timeline, items } };
                        })
                      }
                      className="text-xs px-2.5 py-2 rounded-lg bg-black/40 border border-white/[0.1] text-white font-ui"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <select
                      value={item.category || "MEMORIES"}
                      onChange={(e) =>
                        onChange((prev) => {
                          const items = [...prev.timeline.items];
                          items[idx].category = e.target.value;
                          return { ...prev, timeline: { ...prev.timeline, items } };
                        })
                      }
                      className="text-xs px-2.5 py-2 rounded-lg bg-black/40 border border-white/[0.1] text-white font-ui"
                    >
                      <option value="FIRSTS">FIRSTS</option>
                      <option value="MEMORIES">MEMORIES</option>
                      <option value="PLACES">PLACES</option>
                      <option value="ADVENTURES">ADVENTURES</option>
                      <option value="SPECIAL DAYS">SPECIAL DAYS</option>
                      <option value="FUTURE">FUTURE</option>
                    </select>
                    <input
                      type="text"
                      placeholder="Location (e.g. Paris, Coffee Shop)"
                      value={item.location || ""}
                      onChange={(e) =>
                        onChange((prev) => {
                          const items = [...prev.timeline.items];
                          items[idx].location = e.target.value;
                          return { ...prev, timeline: { ...prev.timeline, items } };
                        })
                      }
                      className="text-xs px-2.5 py-2 rounded-lg bg-black/40 border border-white/[0.1] text-white font-ui"
                    />
                  </div>
                  <textarea
                    rows={2}
                    placeholder="Describe this memory…"
                    value={item.description}
                    onChange={(e) =>
                      onChange((prev) => {
                        const items = [...prev.timeline.items];
                        items[idx].description = e.target.value;
                        return { ...prev, timeline: { ...prev.timeline, items } };
                      })
                    }
                    className="w-full text-xs px-2.5 py-2 rounded-lg bg-black/40 border border-white/[0.1] text-white resize-none font-ui"
                  />
                  <input
                    type="text"
                    placeholder="Next-step reveal or note (optional)"
                    value={item.nextStepMessage || ""}
                    onChange={(e) =>
                      onChange((prev) => {
                        const items = [...prev.timeline.items];
                        items[idx].nextStepMessage = e.target.value;
                        return { ...prev, timeline: { ...prev.timeline, items } };
                      })
                    }
                    className="w-full text-xs px-2.5 py-1.5 rounded-lg bg-black/40 border border-white/[0.08] text-white font-ui"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. Love Quiz Form */}
      {quizEnabled && activeMoment === "quiz" && (
        <div
          data-testid="quiz-module-editor"
          className="p-5 rounded-2xl bg-white/[0.03] border border-rose-500/30 space-y-4 animate-fadeIn"
        >
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
            <div className="flex items-center gap-2">
              <span className="text-base">💘</span>
              <div>
                <span className="text-sm font-display font-medium text-white block">
                  Love Quiz Experience
                </span>
                <span className="text-[11px] text-white/50 font-ui">
                  Playful questions celebrating your favorite inside jokes and memories
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => toggleModule("quiz", {})}
              className="text-[11px] text-rose-400 hover:text-rose-300 underline font-ui cursor-pointer"
            >
              Disable Moment
            </button>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-[11px] text-white/70 font-ui font-medium block mb-1">
                Quiz Title
              </label>
              <input
                type="text"
                data-testid="input-quiz-title"
                value={modules.quiz.title || ""}
                onChange={(e) =>
                  onChange((prev) => ({
                    ...prev,
                    quiz: { ...prev.quiz, title: e.target.value },
                  }))
                }
                className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/[0.12] text-white focus:outline-none focus:border-rose-400 font-ui"
              />
            </div>

            <div>
              <label className="text-[11px] text-white/70 font-ui font-medium block mb-1">
                Completion Message
              </label>
              <textarea
                rows={2}
                value={modules.quiz.completionMessage || ""}
                onChange={(e) =>
                  onChange((prev) => ({
                    ...prev,
                    quiz: { ...prev.quiz, completionMessage: e.target.value },
                  }))
                }
                className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/[0.12] text-white resize-none font-ui"
              />
            </div>

            {/* Questions List */}
            <div className="space-y-3 pt-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-white/70 font-ui font-medium">
                  Questions ({modules.quiz.questions?.length || 0})
                </span>
                <button
                  type="button"
                  data-testid="quiz-add-question"
                  onClick={() =>
                    onChange((prev) => ({
                      ...prev,
                      quiz: {
                        ...prev.quiz,
                        questions: [
                          ...(prev.quiz.questions || []),
                          {
                            id: `q-${Date.now()}`,
                            question: "What is my absolute favorite thing about you?",
                            options: [
                              "Your smile",
                              "Your laugh",
                              "Your kindness",
                              "All of the above",
                            ],
                            correctIndex: 3,
                            explanation: "Everything about you makes my heart skip a beat.",
                          },
                        ],
                      },
                    }))
                  }
                  className="text-[11px] px-2.5 py-1 rounded-lg bg-white/[0.08] hover:bg-white/[0.15] text-white border border-white/[0.1] font-ui transition-colors cursor-pointer"
                >
                  + Add Question
                </button>
              </div>

              {(modules.quiz.questions || []).map((q: any, qIdx: number) => (
                <div
                  key={q.id || qIdx}
                  className="p-3.5 rounded-xl bg-black/30 border border-white/[0.06] space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-rose-300 font-mono">
                      Question #{qIdx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        onChange((prev) => ({
                          ...prev,
                          quiz: {
                            ...prev.quiz,
                            questions: prev.quiz.questions.filter((_: any, i: number) => i !== qIdx),
                          },
                        }))
                      }
                      className="text-[10px] text-rose-400/80 hover:text-rose-300 font-ui"
                    >
                      Remove ✕
                    </button>
                  </div>

                  <input
                    type="text"
                    placeholder="Question prompt"
                    value={q.question}
                    onChange={(e) =>
                      onChange((prev) => {
                        const questions = [...prev.quiz.questions];
                        questions[qIdx].question = e.target.value;
                        return { ...prev, quiz: { ...prev.quiz, questions } };
                      })
                    }
                    className="w-full text-xs px-2.5 py-2 rounded-lg bg-black/40 border border-white/[0.1] text-white font-ui"
                  />

                  {/* Options */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] text-white/50 block font-ui">
                      Options (select the correct answer):
                    </span>
                    {(q.options || []).map((opt: string, optIdx: number) => (
                      <div key={optIdx} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name={`q-${qIdx}-correct`}
                          checked={q.correctIndex === optIdx}
                          onChange={() =>
                            onChange((prev) => {
                              const questions = [...prev.quiz.questions];
                              questions[qIdx].correctIndex = optIdx;
                              return { ...prev, quiz: { ...prev.quiz, questions } };
                            })
                          }
                          className="accent-rose-500 cursor-pointer"
                        />
                        <input
                          type="text"
                          value={opt}
                          onChange={(e) =>
                            onChange((prev) => {
                              const questions = [...prev.quiz.questions];
                              questions[qIdx].options[optIdx] = e.target.value;
                              return { ...prev, quiz: { ...prev.quiz, questions } };
                            })
                          }
                          className="flex-1 text-xs px-2 py-1.5 rounded-lg bg-black/40 border border-white/[0.1] text-white font-ui"
                        />
                      </div>
                    ))}
                  </div>

                  <input
                    type="text"
                    placeholder="Sweet explanation after answering (optional)"
                    value={q.explanation || ""}
                    onChange={(e) =>
                      onChange((prev) => {
                        const questions = [...prev.quiz.questions];
                        questions[qIdx].explanation = e.target.value;
                        return { ...prev, quiz: { ...prev.quiz, questions } };
                      })
                    }
                    className="w-full text-xs px-2.5 py-1.5 rounded-lg bg-black/40 border border-white/[0.1] text-white/80 italic font-ui"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 3. Secret Note Form */}
      {secretEnabled && activeMoment === "secret" && (
        <div
          data-testid="secret-module-editor"
          className="p-5 rounded-2xl bg-white/[0.03] border border-rose-500/30 space-y-4 animate-fadeIn"
        >
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
            <div className="flex items-center gap-2">
              <span className="text-base">🔐</span>
              <div>
                <span className="text-sm font-display font-medium text-white block">
                  Secret Note / Private Confession
                </span>
                <span className="text-[11px] text-white/50 font-ui">
                  Protected by privacy boundary — invisible until tapped by your partner
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => toggleModule("secret", {})}
              className="text-[11px] text-rose-400 hover:text-rose-300 underline font-ui cursor-pointer"
            >
              Disable Moment
            </button>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-[11px] text-white/70 font-ui font-medium block mb-1">
                Trigger Prompt
              </label>
              <input
                type="text"
                data-testid="input-secret-prompt"
                value={modules.secret.prompt || ""}
                onChange={(e) =>
                  onChange((prev) => ({
                    ...prev,
                    secret: { ...prev.secret, prompt: e.target.value },
                  }))
                }
                className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/[0.12] text-white focus:outline-none focus:border-rose-400 font-ui"
              />
            </div>

            <div>
              <label className="text-[11px] text-white/70 font-ui font-medium block mb-1">
                Secret Message (Protected by Privacy Boundary)
              </label>
              <textarea
                rows={3}
                data-testid="input-secret-content"
                placeholder="Write your secret confession here. It will never appear in public HTML until revealed."
                value={modules.secret.secretContent || ""}
                onChange={(e) =>
                  onChange((prev) => ({
                    ...prev,
                    secret: { ...prev.secret, secretContent: e.target.value },
                  }))
                }
                className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/[0.12] text-white resize-none focus:outline-none focus:border-rose-400 font-ui"
              />
              <p className="text-[10px] text-rose-300/60 font-ui font-light mt-1">
                🔒 Privacy verified: This content is stripped from public HTML props and only loaded
                upon recipient tap.
              </p>
            </div>

            {/* Secret Question Lock Option */}
            <div className="pt-2 border-t border-white/[0.08] space-y-2.5">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  data-testid="toggle-question-lock"
                  checked={Boolean(modules.secret.questionLock?.enabled)}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      secret: {
                        ...prev.secret,
                        questionLock: {
                          ...(prev.secret?.questionLock || {}),
                          enabled: e.target.checked,
                          question: prev.secret?.questionLock?.question || "Where was our first kiss?",
                          answer: prev.secret?.questionLock?.answer || "",
                        },
                      },
                    }))
                  }
                  className="accent-rose-500 rounded"
                />
                <span className="text-xs text-white font-ui font-medium">
                  Lock with a Secret Question 🗝️
                </span>
              </label>

              {modules.secret.questionLock?.enabled && (
                <div className="space-y-2 pl-6 animate-fadeIn">
                  <div>
                    <label className="text-[10px] text-white/60 font-ui block mb-1">
                      Secret Question (visible to partner)
                    </label>
                    <input
                      type="text"
                      data-testid="input-question-lock-q"
                      placeholder="e.g. What is the name of our special song?"
                      value={modules.secret.questionLock?.question || ""}
                      onChange={(e) =>
                        onChange((prev) => ({
                          ...prev,
                          secret: {
                            ...prev.secret,
                            questionLock: {
                              ...prev.secret.questionLock,
                              question: e.target.value,
                            },
                          },
                        }))
                      }
                      className="w-full text-xs px-3 py-2 rounded-xl bg-black/40 border border-white/[0.12] text-white focus:outline-none focus:border-rose-400 font-ui"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-white/60 font-ui block mb-1">
                      Correct Answer (server-verified, timing-safe & salted)
                    </label>
                    <input
                      type="text"
                      data-testid="input-question-lock-a"
                      placeholder="e.g. Yellow or Paris"
                      value={modules.secret.questionLock?.answer || ""}
                      onChange={(e) =>
                        onChange((prev) => ({
                          ...prev,
                          secret: {
                            ...prev.secret,
                            questionLock: {
                              ...prev.secret.questionLock,
                              answer: e.target.value,
                            },
                          },
                        }))
                      }
                      className="w-full text-xs px-3 py-2 rounded-xl bg-black/40 border border-white/[0.12] text-white focus:outline-none focus:border-rose-400 font-ui"
                    />
                    <p className="text-[10px] text-rose-300/60 font-ui font-light mt-0.5">
                      🔒 The plain-text answer is never exposed to the client. Upon publishing, it is salted and SHA-256 hashed.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 4. Open When Form */}
      {openWhenEnabled && activeMoment === "openWhen" && (
        <div
          data-testid="open-when-module-editor"
          className="p-5 rounded-2xl bg-white/[0.03] border border-rose-500/30 space-y-4 animate-fadeIn"
        >
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
            <div className="flex items-center gap-2">
              <span className="text-base">💌</span>
              <div>
                <span className="text-sm font-display font-medium text-white block">
                  Open When Letters
                </span>
                <span className="text-[11px] text-white/50 font-ui">
                  Digital sealed envelopes your partner can open on special future days
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => toggleModule("openWhen", {})}
              className="text-[11px] text-rose-400 hover:text-rose-300 underline font-ui cursor-pointer"
            >
              Disable Moment
            </button>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-[11px] text-white/70 font-ui font-medium block mb-1">
                Section Title
              </label>
              <input
                type="text"
                value={modules.openWhen.title || ""}
                onChange={(e) =>
                  onChange((prev) => ({
                    ...prev,
                    openWhen: { ...prev.openWhen, title: e.target.value },
                  }))
                }
                className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/[0.12] text-white focus:outline-none focus:border-rose-400 font-ui"
              />
            </div>

            {/* Envelopes */}
            <div className="space-y-2.5 pt-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-white/70 font-ui font-medium">
                  Envelopes ({modules.openWhen.envelopes?.length || 0})
                </span>
                <button
                  type="button"
                  data-testid="open-when-add-envelope"
                  onClick={() =>
                    onChange((prev) => ({
                      ...prev,
                      openWhen: {
                        ...prev.openWhen,
                        envelopes: [
                          ...(prev.openWhen.envelopes || []),
                          {
                            id: `env-${Date.now()}`,
                            title: "Open when you need me",
                            context: "Anytime",
                            message: "I am only a breath away, always loving you.",
                          },
                        ],
                      },
                    }))
                  }
                  className="text-[11px] px-2.5 py-1 rounded-lg bg-white/[0.08] hover:bg-white/[0.15] text-white border border-white/[0.1] font-ui transition-colors cursor-pointer"
                >
                  + Add Envelope
                </button>
              </div>

              {(modules.openWhen.envelopes || []).map((env: any, idx: number) => (
                <div
                  key={env.id || idx}
                  className="p-3.5 rounded-xl bg-black/30 border border-white/[0.06] space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-rose-300 font-mono">
                      Envelope #{idx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        onChange((prev) => ({
                          ...prev,
                          openWhen: {
                            ...prev.openWhen,
                            envelopes: prev.openWhen.envelopes.filter((_: any, i: number) => i !== idx),
                          },
                        }))
                      }
                      className="text-[10px] text-rose-400/80 hover:text-rose-300 font-ui"
                    >
                      Remove ✕
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Title (e.g. Open when…)"
                      value={env.title}
                      onChange={(e) =>
                        onChange((prev) => {
                          const envelopes = [...prev.openWhen.envelopes];
                          envelopes[idx].title = e.target.value;
                          return { ...prev, openWhen: { ...prev.openWhen, envelopes } };
                        })
                      }
                      className="text-xs px-2.5 py-2 rounded-lg bg-black/40 border border-white/[0.1] text-white font-ui"
                    />
                    <input
                      type="text"
                      placeholder="Context / Subtitle"
                      value={env.context || ""}
                      onChange={(e) =>
                        onChange((prev) => {
                          const envelopes = [...prev.openWhen.envelopes];
                          envelopes[idx].context = e.target.value;
                          return { ...prev, openWhen: { ...prev.openWhen, envelopes } };
                        })
                      }
                      className="text-xs px-2.5 py-2 rounded-lg bg-black/40 border border-white/[0.1] text-white font-ui"
                    />
                  </div>
                  <textarea
                    rows={2}
                    placeholder="Letter message inside this envelope…"
                    value={env.message}
                    onChange={(e) =>
                      onChange((prev) => {
                        const envelopes = [...prev.openWhen.envelopes];
                        envelopes[idx].message = e.target.value;
                        return { ...prev, openWhen: { ...prev.openWhen, envelopes } };
                      })
                    }
                    className="w-full text-xs px-2.5 py-2 rounded-lg bg-black/40 border border-white/[0.1] text-white resize-none font-ui"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 5. Reasons I Love You Form */}
      {reasonsEnabled && activeMoment === "reasons" && (
        <div
          data-testid="reasons-module-editor"
          className="p-5 rounded-2xl bg-white/[0.03] border border-rose-500/30 space-y-4 animate-fadeIn"
        >
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
            <div className="flex items-center gap-2">
              <span className="text-base">💖</span>
              <div>
                <span className="text-sm font-display font-medium text-white block">
                  Reasons I Love You
                </span>
                <span className="text-[11px] text-white/50 font-ui">
                  Specific, heartfelt reasons celebrating what makes them irreplaceable
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => toggleModule("reasons", {})}
              className="text-[11px] text-rose-400 hover:text-rose-300 underline font-ui cursor-pointer"
            >
              Disable Moment
            </button>
          </div>

          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] text-white/70 font-ui font-medium block mb-1">
                  Module Title
                </label>
                <input
                  type="text"
                  data-testid="input-reasons-title"
                  value={modules.reasons?.title || ""}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      reasons: { ...prev.reasons, title: e.target.value },
                    }))
                  }
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/[0.12] text-white focus:outline-none focus:border-rose-400 font-ui"
                />
              </div>
              <div>
                <label className="text-[11px] text-white/70 font-ui font-medium block mb-1">
                  Display Mode
                </label>
                <select
                  data-testid="select-reasons-viewmode"
                  value={modules.reasons?.viewMode || "step"}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      reasons: { ...prev.reasons, viewMode: e.target.value },
                    }))
                  }
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/[0.12] text-white focus:outline-none focus:border-rose-400 font-ui"
                >
                  <option value="step">Step-by-step Surprise</option>
                  <option value="all">Browse All Cards</option>
                </select>
              </div>
            </div>

            {/* Reasons List */}
            <div className="space-y-2.5 pt-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-white/70 font-ui font-medium">
                  Reasons ({modules.reasons?.items?.length || 0})
                </span>
                <button
                  type="button"
                  data-testid="reasons-add-item"
                  onClick={() =>
                    onChange((prev) => ({
                      ...prev,
                      reasons: {
                        ...prev.reasons,
                        items: [
                          ...(prev.reasons?.items || []),
                          {
                            id: `r-${Date.now()}`,
                            title: "Another Reason",
                            text: "Write what makes your heart skip a beat...",
                          },
                        ],
                      },
                    }))
                  }
                  className="text-[11px] px-2.5 py-1 rounded-lg bg-white/[0.08] hover:bg-white/[0.15] text-white border border-white/[0.1] font-ui transition-colors cursor-pointer"
                >
                  + Add Reason
                </button>
              </div>

              {(modules.reasons?.items || []).map((item: any, idx: number) => (
                <div
                  key={item.id || idx}
                  className="p-3.5 rounded-xl bg-black/30 border border-white/[0.06] space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-rose-300 font-mono">
                      Reason #{idx + 1}
                    </span>
                    <button
                      type="button"
                      data-testid={`reasons-delete-item-${idx}`}
                      onClick={() =>
                        onChange((prev) => ({
                          ...prev,
                          reasons: {
                            ...prev.reasons,
                            items: prev.reasons.items.filter((_: any, i: number) => i !== idx),
                          },
                        }))
                      }
                      className="text-[10px] text-rose-400/80 hover:text-rose-300 font-ui"
                    >
                      Remove ✕
                    </button>
                  </div>
                  <input
                    type="text"
                    data-testid={`input-reason-title-${idx}`}
                    placeholder="Short Title (e.g. Your Morning Smile)"
                    value={item.title || ""}
                    onChange={(e) =>
                      onChange((prev) => {
                        const items = [...prev.reasons.items];
                        items[idx].title = e.target.value;
                        return { ...prev, reasons: { ...prev.reasons, items } };
                      })
                    }
                    className="w-full text-xs px-2.5 py-2 rounded-lg bg-black/40 border border-white/[0.1] text-white font-ui"
                  />
                  <textarea
                    rows={2}
                    data-testid={`input-reason-text-${idx}`}
                    placeholder="The full reason why..."
                    value={item.text || ""}
                    onChange={(e) =>
                      onChange((prev) => {
                        const items = [...prev.reasons.items];
                        items[idx].text = e.target.value;
                        return { ...prev, reasons: { ...prev.reasons, items } };
                      })
                    }
                    className="w-full text-xs px-2.5 py-2 rounded-lg bg-black/40 border border-white/[0.1] text-white resize-none font-ui"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 6. Compliment Machine Form */}
      {complimentsEnabled && activeMoment === "compliments" && (
        <div
          data-testid="compliments-module-editor"
          className="p-5 rounded-2xl bg-white/[0.03] border border-rose-500/30 space-y-4 animate-fadeIn"
        >
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
            <div className="flex items-center gap-2">
              <span className="text-base">✨</span>
              <div>
                <span className="text-sm font-display font-medium text-white block">
                  Compliment Machine
                </span>
                <span className="text-[11px] text-white/50 font-ui">
                  A personal pool of affirmations to brighten their spirits
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => toggleModule("compliments", {})}
              className="text-[11px] text-rose-400 hover:text-rose-300 underline font-ui cursor-pointer"
            >
              Disable Moment
            </button>
          </div>

          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] text-white/70 font-ui font-medium block mb-1">
                  Module Title
                </label>
                <input
                  type="text"
                  data-testid="input-compliments-title"
                  value={modules.compliments?.title || ""}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      compliments: { ...prev.compliments, title: e.target.value },
                    }))
                  }
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/[0.12] text-white font-ui"
                />
              </div>
              <div>
                <label className="text-[11px] text-white/70 font-ui font-medium block mb-1">
                  Button Text
                </label>
                <input
                  type="text"
                  data-testid="input-compliments-button-label"
                  value={modules.compliments?.buttonLabel || ""}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      compliments: { ...prev.compliments, buttonLabel: e.target.value },
                    }))
                  }
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/[0.12] text-white font-ui"
                />
              </div>
            </div>

            {/* Compliments Pool */}
            <div className="space-y-2.5 pt-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-white/70 font-ui font-medium">
                  Compliment Pool ({modules.compliments?.pool?.length || 0})
                </span>
                <button
                  type="button"
                  data-testid="compliments-add-item"
                  onClick={() =>
                    onChange((prev) => ({
                      ...prev,
                      compliments: {
                        ...prev.compliments,
                        pool: [...(prev.compliments?.pool || []), "You make every room brighter."],
                      },
                    }))
                  }
                  className="text-[11px] px-2.5 py-1 rounded-lg bg-white/[0.08] hover:bg-white/[0.15] text-white border border-white/[0.1] font-ui transition-colors cursor-pointer"
                >
                  + Add Compliment
                </button>
              </div>

              {(modules.compliments?.pool || []).map((comp: string, idx: number) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    data-testid={`input-compliment-text-${idx}`}
                    value={comp}
                    onChange={(e) =>
                      onChange((prev) => {
                        const pool = [...prev.compliments.pool];
                        pool[idx] = e.target.value;
                        return { ...prev, compliments: { ...prev.compliments, pool } };
                      })
                    }
                    className="flex-1 text-xs px-2.5 py-2 rounded-lg bg-black/40 border border-white/[0.1] text-white font-ui"
                  />
                  <button
                    type="button"
                    data-testid={`compliments-delete-item-${idx}`}
                    onClick={() =>
                      onChange((prev) => ({
                        ...prev,
                        compliments: {
                          ...prev.compliments,
                          pool: prev.compliments.pool.filter((_: any, i: number) => i !== idx),
                        },
                      }))
                    }
                    className="text-xs px-2 py-1 text-rose-400 hover:text-rose-300 font-ui"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 7. Fortune Cookie Form */}
      {fortuneCookieEnabled && activeMoment === "fortuneCookie" && (
        <div
          data-testid="fortuneCookie-module-editor"
          className="p-5 rounded-2xl bg-white/[0.03] border border-rose-500/30 space-y-4 animate-fadeIn"
        >
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
            <div className="flex items-center gap-2">
              <span className="text-base">🥠</span>
              <div>
                <span className="text-sm font-display font-medium text-white block">
                  Fortune Cookie
                </span>
                <span className="text-[11px] text-white/50 font-ui">
                  Playful fortunes and predictions for your shared future
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => toggleModule("fortuneCookie", {})}
              className="text-[11px] text-rose-400 hover:text-rose-300 underline font-ui cursor-pointer"
            >
              Disable Moment
            </button>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-[11px] text-white/70 font-ui font-medium block mb-1">
                Module Title
              </label>
              <input
                type="text"
                data-testid="input-fortune-title"
                value={modules.fortuneCookie?.title || ""}
                onChange={(e) =>
                  onChange((prev) => ({
                    ...prev,
                    fortuneCookie: { ...prev.fortuneCookie, title: e.target.value },
                  }))
                }
                className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/[0.12] text-white font-ui"
              />
            </div>

            {/* Fortunes List */}
            <div className="space-y-2.5 pt-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-white/70 font-ui font-medium">
                  Fortunes ({modules.fortuneCookie?.fortunes?.length || 0})
                </span>
                <button
                  type="button"
                  data-testid="fortune-add-item"
                  onClick={() =>
                    onChange((prev) => ({
                      ...prev,
                      fortuneCookie: {
                        ...prev.fortuneCookie,
                        fortunes: [
                          ...(prev.fortuneCookie?.fortunes || []),
                          "A magical trip together is closer than you think.",
                        ],
                      },
                    }))
                  }
                  className="text-[11px] px-2.5 py-1 rounded-lg bg-white/[0.08] hover:bg-white/[0.15] text-white border border-white/[0.1] font-ui transition-colors cursor-pointer"
                >
                  + Add Fortune
                </button>
              </div>

              {(modules.fortuneCookie?.fortunes || []).map((fortune: string, idx: number) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    data-testid={`input-fortune-text-${idx}`}
                    value={fortune}
                    onChange={(e) =>
                      onChange((prev) => {
                        const fortunes = [...prev.fortuneCookie.fortunes];
                        fortunes[idx] = e.target.value;
                        return { ...prev, fortuneCookie: { ...prev.fortuneCookie, fortunes } };
                      })
                    }
                    className="flex-1 text-xs px-2.5 py-2 rounded-lg bg-black/40 border border-white/[0.1] text-white font-ui"
                  />
                  <button
                    type="button"
                    data-testid={`fortune-delete-item-${idx}`}
                    onClick={() =>
                      onChange((prev) => ({
                        ...prev,
                        fortuneCookie: {
                          ...prev.fortuneCookie,
                          fortunes: prev.fortuneCookie.fortunes.filter((_: any, i: number) => i !== idx),
                        },
                      }))
                    }
                    className="text-xs px-2 py-1 text-rose-400 hover:text-rose-300 font-ui"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 8. Scratch Card Form */}
      {scratchCardEnabled && activeMoment === "scratchCard" && (
        <div
          data-testid="scratchCard-module-editor"
          className="p-5 rounded-2xl bg-white/[0.03] border border-rose-500/30 space-y-4 animate-fadeIn"
        >
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
            <div className="flex items-center gap-2">
              <span className="text-base">🪄</span>
              <div>
                <span className="text-sm font-display font-medium text-white block">
                  Scratch to Reveal Card
                </span>
                <span className="text-[11px] text-white/50 font-ui">
                  A tactile scratch-off surprise hiding a romantic message
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => toggleModule("scratchCard", {})}
              className="text-[11px] text-rose-400 hover:text-rose-300 underline font-ui cursor-pointer"
            >
              Disable Moment
            </button>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-[11px] text-white/70 font-ui font-medium block mb-1">
                Module Title
              </label>
              <input
                type="text"
                data-testid="input-scratch-title"
                value={modules.scratchCard?.title || ""}
                onChange={(e) =>
                  onChange((prev) => ({
                    ...prev,
                    scratchCard: { ...prev.scratchCard, title: e.target.value },
                  }))
                }
                className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/[0.12] text-white font-ui"
              />
            </div>
            <div>
              <label className="text-[11px] text-white/70 font-ui font-medium block mb-1">
                Front Foil Instruction
              </label>
              <input
                type="text"
                data-testid="input-scratch-front-message"
                value={modules.scratchCard?.frontMessage || ""}
                onChange={(e) =>
                  onChange((prev) => ({
                    ...prev,
                    scratchCard: { ...prev.scratchCard, frontMessage: e.target.value },
                  }))
                }
                className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/[0.12] text-white font-ui"
              />
            </div>
            <div>
              <label className="text-[11px] text-white/70 font-ui font-medium block mb-1">
                Hidden Secret Message (Revealed on Scratch)
              </label>
              <textarea
                rows={3}
                data-testid="input-scratch-hidden-message"
                value={modules.scratchCard?.hiddenMessage || ""}
                onChange={(e) =>
                  onChange((prev) => ({
                    ...prev,
                    scratchCard: { ...prev.scratchCard, hiddenMessage: e.target.value },
                  }))
                }
                className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/[0.12] text-white resize-none font-ui"
              />
            </div>
          </div>
        </div>
      )}

      {/* 9. Promise Wall Form */}
      {promisesEnabled && activeMoment === "promises" && (
        <div
          data-testid="promises-module-editor"
          className="p-5 rounded-2xl bg-white/[0.03] border border-rose-500/30 space-y-4 animate-fadeIn"
        >
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
            <div className="flex items-center gap-2">
              <span className="text-base">💍</span>
              <div>
                <span className="text-sm font-display font-medium text-white block">
                  Promise Wall & Vows
                </span>
                <span className="text-[11px] text-white/50 font-ui">
                  Permanent heartfelt vows and promises made to each other
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => toggleModule("promises", {})}
              className="text-[11px] text-rose-400 hover:text-rose-300 underline font-ui cursor-pointer"
            >
              Disable Moment
            </button>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-[11px] text-white/70 font-ui font-medium block mb-1">
                Module Title
              </label>
              <input
                type="text"
                data-testid="input-promises-title"
                value={modules.promises?.title || ""}
                onChange={(e) =>
                  onChange((prev) => ({
                    ...prev,
                    promises: { ...prev.promises, title: e.target.value },
                  }))
                }
                className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/[0.12] text-white font-ui"
              />
            </div>

            {/* Promises List */}
            <div className="space-y-2.5 pt-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-white/70 font-ui font-medium">
                  Promises ({modules.promises?.promises?.length || 0})
                </span>
                <button
                  type="button"
                  data-testid="promises-add-item"
                  onClick={() =>
                    onChange((prev) => ({
                      ...prev,
                      promises: {
                        ...prev.promises,
                        promises: [
                          ...(prev.promises?.promises || []),
                          {
                            id: `p-${Date.now()}`,
                            category: "Forever",
                            text: "I promise to always choose you, through every season.",
                          },
                        ],
                      },
                    }))
                  }
                  className="text-[11px] px-2.5 py-1 rounded-lg bg-white/[0.08] hover:bg-white/[0.15] text-white border border-white/[0.1] font-ui transition-colors cursor-pointer"
                >
                  + Add Promise
                </button>
              </div>

              {(modules.promises?.promises || []).map((p: any, idx: number) => (
                <div key={p.id || idx} className="p-3.5 rounded-xl bg-black/30 border border-white/[0.06] space-y-2">
                  <div className="flex items-center justify-between">
                    <input
                      type="text"
                      data-testid={`input-promise-category-${idx}`}
                      placeholder="Category (e.g. Sweetness, Forever)"
                      value={p.category || ""}
                      onChange={(e) =>
                        onChange((prev) => {
                          const promises = [...prev.promises.promises];
                          promises[idx].category = e.target.value;
                          return { ...prev, promises: { ...prev.promises, promises } };
                        })
                      }
                      className="text-xs px-2.5 py-1.5 rounded-lg bg-black/40 border border-white/[0.1] text-rose-300 font-mono w-40"
                    />
                    <button
                      type="button"
                      data-testid={`promises-delete-item-${idx}`}
                      onClick={() =>
                        onChange((prev) => ({
                          ...prev,
                          promises: {
                            ...prev.promises,
                            promises: prev.promises.promises.filter((_: any, i: number) => i !== idx),
                          },
                        }))
                      }
                      className="text-[10px] text-rose-400/80 hover:text-rose-300 font-ui"
                    >
                      Remove ✕
                    </button>
                  </div>
                  <textarea
                    rows={2}
                    data-testid={`input-promise-text-${idx}`}
                    placeholder="Your heartfelt promise…"
                    value={p.text}
                    onChange={(e) =>
                      onChange((prev) => {
                        const promises = [...prev.promises.promises];
                        promises[idx].text = e.target.value;
                        return { ...prev, promises: { ...prev.promises, promises } };
                      })
                    }
                    className="w-full text-xs px-2.5 py-2 rounded-lg bg-black/40 border border-white/[0.1] text-white resize-none font-ui"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 10. Future Adventures Form */}
      {futureAdventuresEnabled && activeMoment === "futureAdventures" && (
        <div
          data-testid="futureAdventures-module-editor"
          className="p-5 rounded-2xl bg-white/[0.03] border border-rose-500/30 space-y-4 animate-fadeIn"
        >
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
            <div className="flex items-center gap-2">
              <span className="text-base">🗺️</span>
              <div>
                <span className="text-sm font-display font-medium text-white block">
                  Future Adventures & Bucket List
                </span>
                <span className="text-[11px] text-white/50 font-ui">
                  Co-op journeys, dates, and milestones to explore together
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => toggleModule("futureAdventures", {})}
              className="text-[11px] text-rose-400 hover:text-rose-300 underline font-ui cursor-pointer"
            >
              Disable Moment
            </button>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-[11px] text-white/70 font-ui font-medium block mb-1">
                Module Title
              </label>
              <input
                type="text"
                data-testid="input-adventures-title"
                value={modules.futureAdventures?.title || ""}
                onChange={(e) =>
                  onChange((prev) => ({
                    ...prev,
                    futureAdventures: { ...prev.futureAdventures, title: e.target.value },
                  }))
                }
                className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/[0.12] text-white font-ui"
              />
            </div>

            {/* Adventures List */}
            <div className="space-y-2.5 pt-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-white/70 font-ui font-medium">
                  Adventures ({modules.futureAdventures?.adventures?.length || 0})
                </span>
                <button
                  type="button"
                  data-testid="adventures-add-item"
                  onClick={() =>
                    onChange((prev) => ({
                      ...prev,
                      futureAdventures: {
                        ...prev.futureAdventures,
                        adventures: [
                          ...(prev.futureAdventures?.adventures || []),
                          {
                            id: `a-${Date.now()}`,
                            title: "New Dream Adventure",
                            description: "Something wonderful to experience together",
                            category: "Date",
                            status: "planned",
                          },
                        ],
                      },
                    }))
                  }
                  className="text-[11px] px-2.5 py-1 rounded-lg bg-white/[0.08] hover:bg-white/[0.15] text-white border border-white/[0.1] font-ui transition-colors cursor-pointer"
                >
                  + Add Adventure
                </button>
              </div>

              {(modules.futureAdventures?.adventures || []).map((adv: any, idx: number) => (
                <div key={adv.id || idx} className="p-3.5 rounded-xl bg-black/30 border border-white/[0.06] space-y-2">
                  <div className="flex items-center justify-between">
                    <input
                      type="text"
                      data-testid={`input-adventure-title-${idx}`}
                      placeholder="Adventure Title"
                      value={adv.title}
                      onChange={(e) =>
                        onChange((prev) => {
                          const adventures = [...prev.futureAdventures.adventures];
                          adventures[idx].title = e.target.value;
                          return { ...prev, futureAdventures: { ...prev.futureAdventures, adventures } };
                        })
                      }
                      className="text-xs px-2.5 py-1.5 rounded-lg bg-black/40 border border-white/[0.1] text-white font-ui flex-1 mr-2"
                    />
                    <select
                      data-testid={`select-adventure-status-${idx}`}
                      value={adv.status || "planned"}
                      onChange={(e) =>
                        onChange((prev) => {
                          const adventures = [...prev.futureAdventures.adventures];
                          adventures[idx].status = e.target.value;
                          return { ...prev, futureAdventures: { ...prev.futureAdventures, adventures } };
                        })
                      }
                      className="text-xs px-2 py-1.5 rounded-lg bg-black/40 border border-white/[0.1] text-rose-300 font-ui"
                    >
                      <option value="planned">Planned</option>
                      <option value="completed">Completed</option>
                      <option value="someday">Someday</option>
                    </select>
                    <button
                      type="button"
                      data-testid={`adventures-delete-item-${idx}`}
                      onClick={() =>
                        onChange((prev) => ({
                          ...prev,
                          futureAdventures: {
                            ...prev.futureAdventures,
                            adventures: prev.futureAdventures.adventures.filter((_: any, i: number) => i !== idx),
                          },
                        }))
                      }
                      className="text-[10px] text-rose-400/80 hover:text-rose-300 font-ui ml-2"
                    >
                      ✕
                    </button>
                  </div>
                  <input
                    type="text"
                    data-testid={`input-adventure-desc-${idx}`}
                    placeholder="Short description or sweet note…"
                    value={adv.description || ""}
                    onChange={(e) =>
                      onChange((prev) => {
                        const adventures = [...prev.futureAdventures.adventures];
                        adventures[idx].description = e.target.value;
                        return { ...prev, futureAdventures: { ...prev.futureAdventures, adventures } };
                      })
                    }
                    className="w-full text-xs px-2.5 py-1.5 rounded-lg bg-black/40 border border-white/[0.1] text-white/80 font-ui"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 11. Adventure Spinner Form */}
      {adventureSpinnerEnabled && activeMoment === "adventureSpinner" && (
        <div
          data-testid="adventureSpinner-module-editor"
          className="p-5 rounded-2xl bg-white/[0.03] border border-rose-500/30 space-y-4 animate-fadeIn"
        >
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
            <div className="flex items-center gap-2">
              <span className="text-base">🎡</span>
              <div>
                <span className="text-sm font-display font-medium text-white block">
                  Adventure & Date Spinner
                </span>
                <span className="text-[11px] text-white/50 font-ui">
                  Playful wheel to choose your next spontaneous romantic date
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => toggleModule("adventureSpinner", {})}
              className="text-[11px] text-rose-400 hover:text-rose-300 underline font-ui cursor-pointer"
            >
              Disable Moment
            </button>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-[11px] text-white/70 font-ui font-medium block mb-1">
                Module Title
              </label>
              <input
                type="text"
                data-testid="input-spinner-title"
                value={modules.adventureSpinner?.title || ""}
                onChange={(e) =>
                  onChange((prev) => ({
                    ...prev,
                    adventureSpinner: { ...prev.adventureSpinner, title: e.target.value },
                  }))
                }
                className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/[0.12] text-white font-ui"
              />
            </div>

            {/* Spinner Options */}
            <div className="space-y-2.5 pt-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-white/70 font-ui font-medium">
                  Date Options ({modules.adventureSpinner?.options?.length || 0})
                </span>
                <button
                  type="button"
                  data-testid="spinner-add-item"
                  onClick={() =>
                    onChange((prev) => ({
                      ...prev,
                      adventureSpinner: {
                        ...prev.adventureSpinner,
                        options: [
                          ...(prev.adventureSpinner?.options || []),
                          "Spontaneous midnight dessert run",
                        ],
                      },
                    }))
                  }
                  className="text-[11px] px-2.5 py-1 rounded-lg bg-white/[0.08] hover:bg-white/[0.15] text-white border border-white/[0.1] font-ui transition-colors cursor-pointer"
                >
                  + Add Option
                </button>
              </div>

              {(modules.adventureSpinner?.options || []).map((opt: string, idx: number) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    data-testid={`input-spinner-option-${idx}`}
                    value={opt}
                    onChange={(e) =>
                      onChange((prev) => {
                        const options = [...prev.adventureSpinner.options];
                        options[idx] = e.target.value;
                        return { ...prev, adventureSpinner: { ...prev.adventureSpinner, options } };
                      })
                    }
                    className="flex-1 text-xs px-2.5 py-2 rounded-lg bg-black/40 border border-white/[0.1] text-white font-ui"
                  />
                  <button
                    type="button"
                    data-testid={`spinner-delete-item-${idx}`}
                    onClick={() =>
                      onChange((prev) => ({
                        ...prev,
                        adventureSpinner: {
                          ...prev.adventureSpinner,
                          options: prev.adventureSpinner.options.filter((_: any, i: number) => i !== idx),
                        },
                      }))
                    }
                    className="text-xs px-2 py-1 text-rose-400 hover:text-rose-300 font-ui"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 12. Emotional Finale Form */}
      {finaleEnabled && activeMoment === "finale" && (
        <div
          data-testid="finale-module-editor"
          className="p-5 rounded-2xl bg-white/[0.03] border border-rose-500/30 space-y-4 animate-fadeIn"
        >
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
            <div className="flex items-center gap-2">
              <span className="text-base">🌹</span>
              <div>
                <span className="text-sm font-display font-medium text-white block">
                  Emotional Finale & Grand Declaration
                </span>
                <span className="text-[11px] text-white/50 font-ui">
                  The crowning scene of your entire romantic experience
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => toggleModule("finale", {})}
              className="text-[11px] text-rose-400 hover:text-rose-300 underline font-ui cursor-pointer"
            >
              Disable Moment
            </button>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-[11px] text-white/70 font-ui font-medium block mb-1">
                Finale Title
              </label>
              <input
                type="text"
                data-testid="input-finale-title"
                value={modules.finale?.title || ""}
                onChange={(e) =>
                  onChange((prev) => ({
                    ...prev,
                    finale: { ...prev.finale, title: e.target.value },
                  }))
                }
                className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/[0.12] text-white font-ui"
              />
            </div>
            <div>
              <label className="text-[11px] text-white/70 font-ui font-medium block mb-1">
                Final Declaration of Love
              </label>
              <textarea
                rows={4}
                data-testid="input-finale-declaration"
                value={modules.finale?.declaration || ""}
                onChange={(e) =>
                  onChange((prev) => ({
                    ...prev,
                    finale: { ...prev.finale, declaration: e.target.value },
                  }))
                }
                className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/[0.12] text-white resize-none font-ui"
              />
            </div>
            <div>
              <label className="text-[11px] text-white/70 font-ui font-medium block mb-1">
                Highlight of Promises or Memories (Optional)
              </label>
              <input
                type="text"
                data-testid="input-finale-promises-highlight"
                value={modules.finale?.promisesHighlight || ""}
                onChange={(e) =>
                  onChange((prev) => ({
                    ...prev,
                    finale: { ...prev.finale, promisesHighlight: e.target.value },
                  }))
                }
                className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/[0.12] text-white font-ui"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="text-[11px] text-white/70 font-ui font-medium block mb-1">
                  Seal Button Text
                </label>
                <input
                  type="text"
                  data-testid="input-finale-seal-text"
                  value={modules.finale?.sealText || ""}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      finale: { ...prev.finale, sealText: e.target.value },
                    }))
                  }
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/[0.12] text-white font-ui"
                />
              </div>
              <div className="flex items-center gap-2 pt-5">
                <input
                  type="checkbox"
                  id="checkbox-finale-keepsake"
                  data-testid="checkbox-finale-keepsake"
                  checked={Boolean(modules.finale?.showKeepsakeAction)}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      finale: { ...prev.finale, showKeepsakeAction: e.target.checked },
                    }))
                  }
                  className="rounded text-rose-500 focus:ring-rose-400"
                />
                <label htmlFor="checkbox-finale-keepsake" className="text-xs text-white/80 font-ui cursor-pointer">
                  Prompt keepsakes on completion
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
