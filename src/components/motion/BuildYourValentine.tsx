"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { triggerCurtainNavigation } from "./PageCurtains";
import { ValentineComposition } from "./ValentineComposition";
import {
  ValentineDecor,
  DEFAULT_VALENTINE_DECOR,
  CURATED_FLOWERS,
  CURATED_CHARMS,
  CURATED_PAPERS,
  CURATED_RIBBONS,
  CURATED_SEALS,
  encodeDecorParam,
  normalizeValentineDecor,
} from "@/types/decor";

type TabCategory = "blooms" | "charms" | "stationery" | "seal";

export function BuildYourValentine({ className = "" }: { className?: string }) {
  const [decor, setDecor] = useState<ValentineDecor>(DEFAULT_VALENTINE_DECOR);
  const [activeTab, setActiveTab] = useState<TabCategory>("blooms");

  // Toggle bloom selection (max 4 blooms at a time to prevent clutter)
  const toggleFlower = (flowerId: string) => {
    setDecor((prev) => {
      const existing = normalizeValentineDecor(prev);
      const exists = existing.blooms.includes(flowerId);
      let nextBlooms = [...existing.blooms];
      if (exists) {
        if (nextBlooms.length <= 1) return prev;
        nextBlooms = nextBlooms.filter((id) => id !== flowerId);
      } else {
        if (nextBlooms.length >= 4) nextBlooms.shift();
        nextBlooms.push(flowerId);
      }
      return {
        ...existing,
        blooms: nextBlooms,
        flowers: nextBlooms,
      };
    });
  };

  // Toggle charm selection (max 3 charms at a time)
  const toggleCharm = (charmId: string) => {
    setDecor((prev) => {
      const existing = normalizeValentineDecor(prev);
      const exists = existing.charms.includes(charmId);
      let nextCharms = [...existing.charms];
      if (exists) {
        nextCharms = nextCharms.filter((id) => id !== charmId);
      } else {
        if (nextCharms.length >= 3) nextCharms.shift();
        nextCharms.push(charmId);
      }
      return {
        ...existing,
        charms: nextCharms,
      };
    });
  };

  const setPaper = (paperId: string) =>
    setDecor((prev) => ({ ...normalizeValentineDecor(prev), paper: paperId }));

  const setRibbon = (ribbonId: string) =>
    setDecor((prev) => ({ ...normalizeValentineDecor(prev), ribbon: ribbonId }));

  const setSeal = (sealId: string) =>
    setDecor((prev) => ({
      ...normalizeValentineDecor(prev),
      waxSeal: sealId,
      seal: sealId,
    }));

  // Quick Presets
  const applyPreset = (preset: "classic" | "wildflower" | "royal") => {
    if (preset === "classic") {
      setDecor({
        blooms: ["crimson-rose", "french-tulip"],
        flowers: ["crimson-rose", "french-tulip"],
        charms: ["heart", "sparkle"],
        paper: "petal-blush",
        ribbon: "velvet-crimson",
        waxSeal: "crimson-heart",
        seal: "crimson-heart",
      });
    } else if (preset === "wildflower") {
      setDecor({
        blooms: ["wild-lavender", "wild-daisy", "blush-peony"],
        flowers: ["wild-lavender", "wild-daisy", "blush-peony"],
        charms: ["butterfly", "sparkle"],
        paper: "soft-lavender",
        ribbon: "satin-rose",
        waxSeal: "rose-quartz",
        seal: "rose-quartz",
      });
    } else if (preset === "royal") {
      setDecor({
        blooms: ["crimson-rose", "french-tulip", "blush-peony"],
        flowers: ["crimson-rose", "french-tulip", "blush-peony"],
        charms: ["bow", "sparkle"],
        paper: "deckled-parchment",
        ribbon: "velvet-crimson",
        waxSeal: "royal-burgundy",
        seal: "royal-burgundy",
      });
    }
  };

  const handleCreate = () => {
    const compactParam = encodeDecorParam(decor);
    try {
      if (typeof window !== "undefined") {
        sessionStorage.setItem("valentino_custom_decor", JSON.stringify(normalizeValentineDecor(decor)));
      }
    } catch {
      // Ignore storage errors in restricted contexts
    }

    const themeParam =
      decor.waxSeal === "champagne-gold" || decor.seal === "champagne-gold"
        ? "champagne-gold"
        : decor.ribbon === "plum-mist"
        ? "midnight-violet"
        : "crimson-rose";

    triggerCurtainNavigation(`/create?theme=${themeParam}&decor=${encodeURIComponent(compactParam)}`);
  };


  const normalized = normalizeValentineDecor(decor);

  return (
    <section
      id="build-your-valentine"
      className={`w-full py-24 sm:py-32 px-6 relative z-10 transition-colors duration-500 ${className}`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Editorial Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
          <Badge
            variant="rose"
            size="sm"
            className="mb-4 bg-rose-100/90 text-[#881337] border-rose-300 font-sans tracking-widest uppercase font-medium"
          >
            ✦ Interactive Romantic Studio ✦
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-serif font-medium text-[#240412] tracking-tight mb-4">
            Build Your Valentine
          </h2>
          <p className="text-sm sm:text-base text-[#4A0E2E] font-normal leading-relaxed">
            Craft a bespoke love letter. Select seasonal blooms, orbiting charms, luxury paper finish, and custom wax seals that will travel directly into your recipient&apos;s hands.
          </p>

          {/* Quick Inspirations / Presets */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs text-[#701A3D] font-medium mr-1">Inspirations:</span>
            <button
              type="button"
              data-testid="builder-preset-classic"
              onClick={() => applyPreset("classic")}
              className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-white/90 text-[#881337] border border-rose-200 hover:border-rose-400 hover:bg-rose-50 shadow-2xs transition-all active:scale-95"
            >
              🌹 Classic Romance
            </button>
            <button
              type="button"
              data-testid="builder-preset-wildflower"
              onClick={() => applyPreset("wildflower")}
              className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-white/90 text-[#881337] border border-rose-200 hover:border-rose-400 hover:bg-rose-50 shadow-2xs transition-all active:scale-95"
            >
              🌸 Wildflower Dream
            </button>
            <button
              type="button"
              data-testid="builder-preset-royal"
              onClick={() => applyPreset("royal")}
              className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-white/90 text-[#881337] border border-rose-200 hover:border-rose-400 hover:bg-rose-50 shadow-2xs transition-all active:scale-95"
            >
              👑 Royal Devotion
            </button>
          </div>
        </div>

        {/* Studio Workspace: 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Live 3D Interactive Composition Canvas */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center relative min-h-[460px] sm:min-h-[500px]">
            {/* Ambient Backlight Rosy Shadow */}
            <div className="absolute inset-0 rounded-3xl bg-radial from-rose-200/50 via-pink-100/30 to-transparent blur-3xl pointer-events-none" />

            {/* Live Assembling Composition */}
            <div className="w-full max-w-md relative z-10 py-12 flex items-center justify-center">
              <ValentineComposition decor={normalized} onLetterClick={handleCreate} />
            </div>

            {/* Hint Beneath Composition */}
            <p className="text-xs text-[#7E2A4B] mt-2 font-serif italic text-center">
              Tap letter to continue with this customized arrangement &rarr;
            </p>
          </div>

          {/* Right Column: Tactile Romantic Choice Drawer */}
          <div className="lg:col-span-5 bg-white/85 backdrop-blur-md rounded-3xl border border-rose-200/80 p-6 sm:p-8 shadow-[0_16px_40px_rgba(220,130,160,0.12)] space-y-6">
            {/* Category Navigation Pills */}
            <div className="flex items-center justify-between p-1 bg-rose-50/80 rounded-2xl border border-rose-200/50">
              {(
                [
                  { id: "blooms", label: "Blooms", icon: "💐" },
                  { id: "charms", label: "Charms", icon: "✨" },
                  { id: "stationery", label: "Paper", icon: "📜" },
                  { id: "seal", label: "Seal", icon: "💌" },
                ] as const
              ).map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    data-testid={`builder-tab-${tab.id}`}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 py-2 px-1 text-xs font-medium rounded-xl transition-all duration-300 flex items-center justify-center gap-1 select-none ${
                      isActive
                        ? "bg-white text-[#881337] shadow-sm font-semibold"
                        : "text-[#701A3D]/70 hover:text-[#881337] hover:bg-white/40"
                    }`}
                  >

                    <span>{tab.icon}</span>
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Dynamic Interactive Choices */}
            <div className="min-h-[220px]">
              <AnimatePresence mode="wait">
                {activeTab === "blooms" && (
                  <motion.div
                    key="blooms"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-3"
                  >
                    <div className="flex items-center justify-between text-xs text-[#701A3D] font-medium mb-1">
                      <span>Pick blooms for your bouquet</span>
                      <span className="text-[11px] opacity-75">{normalized.blooms.length}/4 selected</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2.5">
                      {CURATED_FLOWERS.map((flower) => {
                        const isSelected = normalized.blooms.includes(flower.id);
                        return (
                          <button
                            key={flower.id}
                            type="button"
                            data-testid={`builder-option-bloom-${flower.id}`}
                            onClick={() => toggleFlower(flower.id)}
                            className={`p-3 rounded-2xl border text-left transition-all duration-200 flex items-center gap-3 select-none active:scale-[0.98] ${
                              isSelected
                                ? "bg-rose-50/90 border-rose-400/80 shadow-xs text-[#881337]"
                                : "bg-white/60 border-rose-100 hover:bg-white text-[#4A0E2E]"
                            }`}
                          >
                            <span className="text-2xl">{flower.emoji}</span>
                            <div>
                              <div className="text-xs font-semibold">{flower.name}</div>
                              <div className="text-[10px] text-[#701A3D]/70 truncate">{flower.description}</div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {activeTab === "charms" && (
                  <motion.div
                    key="charms"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-3"
                  >
                    <div className="flex items-center justify-between text-xs text-[#701A3D] font-medium mb-1">
                      <span>Romantic touches & charms</span>
                      <span className="text-[11px] opacity-75">{normalized.charms.length}/3 selected</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2.5">
                      {CURATED_CHARMS.map((charm) => {
                        const isSelected = normalized.charms.includes(charm.id);
                        return (
                          <button
                            key={charm.id}
                            type="button"
                            data-testid={`builder-option-charm-${charm.id}`}
                            onClick={() => toggleCharm(charm.id)}
                            className={`p-3 rounded-2xl border text-left transition-all duration-200 flex items-center gap-3 select-none active:scale-[0.98] ${
                              isSelected
                                ? "bg-rose-50/90 border-rose-400/80 shadow-xs text-[#881337]"
                                : "bg-white/60 border-rose-100 hover:bg-white text-[#4A0E2E]"
                            }`}
                          >
                            <span className="text-2xl">{charm.emoji}</span>
                            <div>
                              <div className="text-xs font-semibold">{charm.name}</div>
                              <div className="text-[10px] text-[#701A3D]/70">{charm.description}</div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {activeTab === "stationery" && (
                  <motion.div
                    key="stationery"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-4"
                  >
                    <div>
                      <div className="text-xs text-[#701A3D] font-medium mb-2">Paper Quality</div>
                      <div className="grid grid-cols-2 gap-2">
                        {CURATED_PAPERS.map((paper) => {
                          const isSelected = normalized.paper === paper.id;
                          return (
                            <button
                              key={paper.id}
                              type="button"
                              data-testid={`builder-option-paper-${paper.id}`}
                              onClick={() => setPaper(paper.id)}
                              className={`p-2.5 rounded-xl border text-left transition-all flex items-center gap-2.5 ${
                                isSelected
                                  ? "bg-rose-50 border-rose-400 text-[#881337] font-semibold"
                                  : "bg-white/60 border-rose-100 hover:bg-white text-[#4A0E2E]"
                              }`}
                            >
                              <span
                                className="w-5 h-5 rounded-full border border-black/10 shadow-xs shrink-0"
                                style={{ backgroundColor: paper.previewColor }}
                              />
                              <span className="text-xs">{paper.name}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <div className="text-xs text-[#701A3D] font-medium mb-2">Satin Ribbon Band</div>
                      <div className="grid grid-cols-2 gap-2">
                        {CURATED_RIBBONS.map((ribbon) => {
                          const isSelected = normalized.ribbon === ribbon.id;
                          return (
                            <button
                              key={ribbon.id}
                              type="button"
                              data-testid={`builder-option-ribbon-${ribbon.id}`}
                              onClick={() => setRibbon(ribbon.id)}
                              className={`p-2.5 rounded-xl border text-left transition-all flex items-center gap-2.5 ${
                                isSelected
                                  ? "bg-rose-50 border-rose-400 text-[#881337] font-semibold"
                                  : "bg-white/60 border-rose-100 hover:bg-white text-[#4A0E2E]"
                              }`}
                            >
                              <span
                                className="w-5 h-5 rounded-full border border-black/10 shadow-xs shrink-0"
                                style={{ backgroundColor: ribbon.previewColor }}
                              />
                              <span className="text-xs">{ribbon.name}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "seal" && (
                  <motion.div
                    key="seal"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-3"
                  >
                    <div className="text-xs text-[#701A3D] font-medium mb-1">Wax Seal Choice</div>
                    <div className="grid grid-cols-2 gap-2.5">
                      {CURATED_SEALS.map((seal) => {
                        const isSelected = normalized.waxSeal === seal.id;
                        return (
                          <button
                            key={seal.id}
                            type="button"
                            data-testid={`builder-option-seal-${seal.id}`}
                            onClick={() => setSeal(seal.id)}
                            className={`p-3 rounded-2xl border text-left transition-all duration-200 flex items-center gap-3 select-none ${
                              isSelected
                                ? "bg-rose-50/90 border-rose-400/80 shadow-xs text-[#881337]"
                                : "bg-white/60 border-rose-100 hover:bg-white text-[#4A0E2E]"
                            }`}
                          >
                            <span className="text-2xl">{seal.emblem}</span>
                            <div>
                              <div className="text-xs font-semibold">{seal.name}</div>
                              <div className="text-[10px] text-[#701A3D]/70">Poured wax</div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Direct Action Primary CTA */}
            <div className="pt-2 border-t border-rose-100">
              <Button
                data-testid="create-valentine-btn"
                onClick={handleCreate}
                size="lg"
                variant="primary"
                className="w-full py-3.5 rounded-2xl font-medium text-white bg-gradient-to-r from-[#E11D48] via-[#F43F5E] to-[#FB7185] shadow-[0_10px_25px_rgba(225,29,72,0.35)] hover:shadow-[0_14px_32px_rgba(225,29,72,0.45)] hover:-translate-y-0.5 active:scale-[0.98] transition-all"
              >
                <span>Create This Valentine</span>
                <span>💌</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
