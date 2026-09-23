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
  externalActiveMoment?: "timeline" | "quiz" | "secret" | "openWhen" | null;
}

type ActiveMoment = "timeline" | "quiz" | "secret" | "openWhen" | null;

export const ModuleManager: React.FC<ModuleManagerProps> = ({
  modules = {},
  hasHeroMedia = false,
  onChange,
  onOpenFeatureDrawer,
  onSelectFeature,
  externalActiveMoment,
}) => {
  const [activeMoment, setActiveMoment] = useState<ActiveMoment>(null);

  useEffect(() => {
    if (externalActiveMoment) {
      setActiveMoment(externalActiveMoment);
    }
  }, [externalActiveMoment]);

  const timelineEnabled = Boolean(modules?.timeline?.enabled);
  const quizEnabled = Boolean(modules?.quiz?.enabled);
  const secretEnabled = Boolean(modules?.secret?.enabled);
  const openWhenEnabled = Boolean(modules?.openWhen?.enabled);

  const anyEnabled = timelineEnabled || quizEnabled || secretEnabled || openWhenEnabled;
  const activeCount =
    (timelineEnabled ? 1 : 0) +
    (quizEnabled ? 1 : 0) +
    (secretEnabled ? 1 : 0) +
    (openWhenEnabled ? 1 : 0);

  const toggleModule = (key: "timeline" | "quiz" | "secret" | "openWhen", defaultData: any) => {
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
      setActiveMoment(key);
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

      {/* Add a Moment: Tactile Creator Buttons */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-ui font-medium uppercase tracking-wider text-rose-300/80">
            {anyEnabled ? `Add Another Moment (${activeCount}/4 active)` : "+ Add a Moment to Your Story"}
          </span>
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
        </div>

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
    </div>
  );
};
