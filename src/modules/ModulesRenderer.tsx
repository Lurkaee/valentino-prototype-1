"use client";

import React from "react";
import { getModuleDefinition } from "./registry";
import { ModulesConfig } from "./registry";
import { RenderMode } from "./types";
import { NarrativePublishedConfig } from "@/narrative/schema";

interface ModulesRendererProps {
  modules?: ModulesConfig;
  moduleOrder?: string[];
  narrative?: NarrativePublishedConfig;
  mode: RenderMode;
  publicId?: string;
  theme?: string;
  className?: string;
}

const DEFAULT_ORDER = [
  "voiceNote",
  "videoMemory",
  "memories",
  "timeline",
  "reasons",
  "compliments",
  "fortuneCookie",
  "scratchCard",
  "promises",
  "futureAdventures",
  "adventureSpinner",
  "quiz",
  "secret",
  "openWhen",
  "finale",
];

export const ModulesRenderer: React.FC<ModulesRendererProps> = ({
  modules,
  moduleOrder,
  narrative,
  mode,
  publicId,
  theme = "midnight-rose",
  className = "",
}) => {
  if (!modules || typeof modules !== "object") {
    return null;
  }

  const isCloudNine =
    theme === "cloud-nine" ||
    theme === "blush-sky" ||
    theme === "peach-sorbet" ||
    theme === "lavender-mist";
  const isKage =
    theme === "kage" ||
    theme === "sanctuary-emerald" ||
    theme === "moonlit-stone" ||
    theme === "kyoto-crimson";

  // 1. Optional Personal Welcome Banner
  const welcomeElement = narrative?.welcome?.enabled ? (
    <div
      data-testid="narrative-welcome-banner"
      className={`p-6 sm:p-8 rounded-3xl border backdrop-blur-xl text-center space-y-3 mb-10 transition-all ${
        isCloudNine
          ? "bg-white/80 border-pink-200/80 text-pink-950 shadow-lg"
          : isKage
          ? "bg-[#0f1712]/90 border-emerald-500/25 text-emerald-100 shadow-xl"
          : "bg-[#180a14]/90 border-rose-500/30 text-rose-100 shadow-xl"
      }`}
    >
      <span className="text-2xl select-none block">
        {isCloudNine ? "✨🕊️" : isKage ? "🏮🍃" : "🌹✨"}
      </span>
      {narrative.welcome.greeting && (
        <span className="text-xs font-ui uppercase tracking-widest opacity-60 block">
          {narrative.welcome.greeting}
        </span>
      )}
      {narrative.welcome.recipientName && (
        <h2 className="text-2xl sm:text-3xl font-display font-medium tracking-tight">
          {narrative.welcome.recipientName}
        </h2>
      )}
      {narrative.welcome.message && (
        <p className="text-sm sm:text-base font-romantic italic opacity-90 max-w-md mx-auto leading-relaxed">
          &ldquo;{narrative.welcome.message}&rdquo;
        </p>
      )}
    </div>
  ) : null;

  // 2. Emotional Recap computation (only real configured counts, no fake gamification/XP)
  const recap = narrative?.recap;
  const showRecap = recap?.enabled;
  const memoryCount = (modules.memories?.items || []).length;
  const milestoneCount = (modules.timeline?.items || []).length;
  const reasonsCount = (modules.reasons?.items || []).length;
  const adventuresCount = (modules.futureAdventures?.adventures || []).length;
  const promisesCount = (modules.promises?.items || []).length;

  const recapElement = showRecap ? (
    <div
      data-testid="narrative-emotional-recap"
      className={`p-6 sm:p-8 rounded-3xl border backdrop-blur-xl text-center space-y-4 my-10 transition-all ${
        isCloudNine
          ? "bg-white/80 border-pink-200/80 text-pink-950 shadow-md"
          : isKage
          ? "bg-[#0f1712]/90 border-emerald-500/25 text-emerald-100 shadow-lg"
          : "bg-[#180a14]/90 border-rose-500/30 text-rose-100 shadow-lg"
      }`}
    >
      <span className="text-xs font-ui uppercase tracking-widest opacity-60 block">
        {recap.title || "Our Story in Moments"}
      </span>
      {recap.reflection && (
        <p className="text-xs sm:text-sm font-romantic italic opacity-75 max-w-sm mx-auto">
          {recap.reflection}
        </p>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 max-w-md mx-auto">
        {milestoneCount > 0 && (
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center">
            <div className="text-xl sm:text-2xl font-display font-medium">{milestoneCount}</div>
            <div className="text-[10px] font-ui uppercase tracking-wider opacity-70">Milestones</div>
          </div>
        )}
        {memoryCount > 0 && (
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center">
            <div className="text-xl sm:text-2xl font-display font-medium">{memoryCount}</div>
            <div className="text-[10px] font-ui uppercase tracking-wider opacity-70">Cherished Photos</div>
          </div>
        )}
        {reasonsCount > 0 && (
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center">
            <div className="text-xl sm:text-2xl font-display font-medium">{reasonsCount}</div>
            <div className="text-[10px] font-ui uppercase tracking-wider opacity-70">Reasons I Love Us</div>
          </div>
        )}
        {promisesCount > 0 && (
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center">
            <div className="text-xl sm:text-2xl font-display font-medium">{promisesCount}</div>
            <div className="text-[10px] font-ui uppercase tracking-wider opacity-70">Sacred Promises</div>
          </div>
        )}
        {adventuresCount > 0 && (
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center">
            <div className="text-xl sm:text-2xl font-display font-medium">{adventuresCount}</div>
            <div className="text-[10px] font-ui uppercase tracking-wider opacity-70">Adventures Ahead</div>
          </div>
        )}
      </div>
    </div>
  ) : null;

  // 3. Render Modules by Chapters or Flat Order
  const chapters = narrative?.chapters && narrative.chapters.length > 0 ? narrative.chapters : null;

  const renderModuleInstance = (moduleId: string) => {
    const moduleConfig = modules[moduleId];
    if (!moduleConfig || !moduleConfig.enabled) return null;

    // Apply custom section title if configured in narrative
    const customTitle = narrative?.customSectionTitles?.[moduleId];
    const effectiveConfig = customTitle
      ? { ...moduleConfig, title: customTitle }
      : moduleConfig;

    const def = getModuleDefinition(moduleId);
    if (!def) return null;
    const Component = def.Component;

    return (
      <div key={`module-${moduleId}`} id={`module-${moduleId}`} className="w-full">
        <Component
          config={effectiveConfig}
          mode={mode}
          publicId={publicId}
          theme={theme}
        />
      </div>
    );
  };

  const renderedContent: React.ReactNode[] = [];

  if (chapters) {
    chapters.forEach((chapter, chIdx) => {
      const chapterModuleNodes = chapter.moduleRefs
        .map((modId) => renderModuleInstance(modId))
        .filter(Boolean);

      if (chapterModuleNodes.length > 0) {
        renderedContent.push(
          <section
            key={chapter.id || `chapter-${chIdx}`}
            data-testid={`story-chapter-${chIdx}`}
            aria-label={chapter.title}
            className="w-full space-y-8 pt-6 first:pt-0"
          >
            {/* Story Chapter Header */}
            <div className="text-center space-y-1 mb-6">
              <span className="text-[10px] font-ui uppercase tracking-widest opacity-50 block">
                Chapter {chIdx + 1}
              </span>
              <h2 className="text-xl sm:text-2xl font-display font-medium tracking-tight">
                {chapter.title}
              </h2>
              {chapter.subtitle && (
                <p className="text-xs sm:text-sm font-romantic italic opacity-75 max-w-sm mx-auto">
                  {chapter.subtitle}
                </p>
              )}
            </div>

            <div className="space-y-10">{chapterModuleNodes}</div>
          </section>
        );
      }
    });
  } else {
    // Fallback to flat module order
    const order = moduleOrder && moduleOrder.length > 0 ? [...moduleOrder] : [...DEFAULT_ORDER];
    for (const modId of Object.keys(modules)) {
      if (modules[modId]?.enabled && !order.includes(modId)) {
        order.push(modId);
      }
    }

    const flatNodes = order.map((modId) => renderModuleInstance(modId)).filter(Boolean);
    renderedContent.push(...flatNodes);
  }

  if (renderedContent.length === 0 && !welcomeElement) {
    return null;
  }

  return (
    <div className={`w-full max-w-xl mx-auto space-y-10 my-8 ${className}`}>
      {welcomeElement}
      {recapElement}
      {renderedContent}
    </div>
  );
};
