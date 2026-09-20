"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { CurtainLink } from "@/components/motion/PageCurtains";

interface TemplateItem {
  id: string;
  name: string;
  status: "active" | "coming-soon";
  statusLabel: string;
  palette: string;
  description: string;
  mood: string;
  accentBg: string;
  accentBorder: string;
  accentColor: string;
  icon: string;
}

const TEMPLATES: TemplateItem[] = [
  {
    id: "midnight-rose",
    name: "Midnight Rose",
    status: "active",
    statusLabel: "Flagship · Available Now",
    palette: "Deep Berry · Crimson · Obsidian · Gold",
    description:
      "Our signature starlight love letter sealed with digital wax. Designed for deep affection, quiet declarations, and an unforgettable reveal.",
    mood: "Intimate & Romantic",
    accentBg: "from-rose-900/40 via-rose-950/60 to-black/80",
    accentBorder: "border-rose-500/40",
    accentColor: "text-rose-300",
    icon: "🌹",
  },
  {
    id: "cloud-nine",
    name: "Cloud Nine",
    status: "coming-soon",
    statusLabel: "In Development",
    palette: "Blush Pink · Soft Sunset · Powder Cream",
    description:
      "Floating amongst sunset clouds with gentle heart drifts and playful warmth. For the person who makes life feel weightless.",
    mood: "Cute & Dreamy",
    accentBg: "from-pink-900/30 via-rose-950/40 to-black/80",
    accentBorder: "border-pink-500/30",
    accentColor: "text-pink-300",
    icon: "☁️",
  },
  {
    id: "golden-hour",
    name: "Golden Hour",
    status: "coming-soon",
    statusLabel: "In Development",
    palette: "Champagne · Warm Peach · Amber Glow",
    description:
      "Basked in the golden warmth of late afternoon sunlight. Deckled cotton paper borders and nostalgic prose.",
    mood: "Warm & Nostalgic",
    accentBg: "from-amber-900/30 via-stone-950/50 to-black/80",
    accentBorder: "border-amber-500/30",
    accentColor: "text-amber-300",
    icon: "✨",
  },
  {
    id: "love-letter",
    name: "Love Letter",
    status: "coming-soon",
    statusLabel: "In Development",
    palette: "Ivory Stationery · Burgundy Ink · Silk Ribbon",
    description:
      "A tribute to traditional correspondence. Elegant fountain pen flourishes, vintage paper texture, and deckled edges.",
    mood: "Timeless & Classical",
    accentBg: "from-rose-950/30 via-stone-950/50 to-black/80",
    accentBorder: "border-rose-400/30",
    accentColor: "text-rose-200",
    icon: "💌",
  },
  {
    id: "stardust",
    name: "Stardust",
    status: "coming-soon",
    statusLabel: "In Development",
    palette: "Midnight Violet · Celestial Lilac · Soft Silver",
    description:
      "A starry night sky with glowing constellations that unlock your love notes as your partner explores the cosmos.",
    mood: "Mystical & Celestial",
    accentBg: "from-purple-900/30 via-indigo-950/50 to-black/80",
    accentBorder: "border-purple-500/30",
    accentColor: "text-purple-300",
    icon: "⭐",
  },
];

export function TemplateShowcase({ className = "" }: { className?: string }) {
  const [activeTemplateId, setActiveTemplateId] = useState<string>("midnight-rose");
  const [selectedSwatch, setSelectedSwatch] = useState<"crimson" | "violet" | "gold">("crimson");
  const shouldReduceMotion = useReducedMotion();

  const activeTemplate = TEMPLATES.find((t) => t.id === activeTemplateId) || TEMPLATES[0];

  return (
    <section id="templates" className={`w-full max-w-6xl mx-auto px-6 py-24 relative z-10 ${className}`}>
      {/* Section Header with Soft Viewport Entrance */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12"
      >
        <div>
          <Badge
            variant="rose"
            size="sm"
            className="mb-3 tracking-widest uppercase text-[11px] bg-rose-950/70 border-rose-400/40 text-rose-200"
          >
            The Collection
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-serif font-medium text-[#FAF8F5]">
            Choose Your Atmosphere
          </h2>
          <p className="text-sm sm:text-base text-[#FAF8F5]/75 font-light mt-2 max-w-lg">
            Every love story has its own rhythm. Select a canvas that reflects how you want your partner to feel.
          </p>
        </div>
        <CurtainLink href="/templates">
          <Button
            variant="outline"
            size="sm"
            className="text-xs px-4 border-white/20 hover:border-white/40 text-[#FAF8F5]"
          >
            View All Templates →
          </Button>
        </CurtainLink>
      </motion.div>

      {/* Main Interactive Showcase (Inspired by Skiper 6) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left: Template Selector List (Hover to expand / preview) */}
        <div className="lg:col-span-5 space-y-3 flex flex-col justify-between">
          {TEMPLATES.map((tmpl) => {
            const isSelected = tmpl.id === activeTemplateId;
            return (
              <div
                key={tmpl.id}
                onMouseEnter={() => setActiveTemplateId(tmpl.id)}
                onClick={() => setActiveTemplateId(tmpl.id)}
                className={`p-4 sm:p-5 rounded-2xl border transition-all duration-300 cursor-pointer select-none relative group ${
                  isSelected
                    ? "bg-[#2A0818]/90 border-rose-400/50 shadow-lg shadow-rose-950/50 translate-x-1"
                    : "bg-[#14030B]/40 border-white/[0.06] hover:bg-[#1E0512]/60 hover:border-white/15"
                }`}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveTemplateId(tmpl.id);
                  }
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{tmpl.icon}</span>
                    <div>
                      <h3 className="font-serif text-lg font-medium text-[#FAF8F5] group-hover:text-rose-200 transition-colors">
                        {tmpl.name}
                      </h3>
                      <span className="text-[11px] text-[#FAF8F5]/60 font-sans block">
                        {tmpl.mood}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {tmpl.status === "active" ? (
                      <span className="text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-rose-950/80 border border-rose-500/40 text-rose-300 font-mono">
                        Available
                      </span>
                    ) : (
                      <span className="text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/50 font-mono">
                        Soon
                      </span>
                    )}
                    <span
                      className={`text-rose-400 transition-transform duration-300 ${
                        isSelected ? "translate-x-0 opacity-100" : "-translate-x-1 opacity-0 group-hover:opacity-60"
                      }`}
                    >
                      →
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Rich Interactive Spotlight Card */}
        <div className="lg:col-span-7 rounded-3xl border border-rose-500/25 bg-[#18040F]/80 backdrop-blur-xl p-7 sm:p-10 shadow-2xl relative overflow-hidden flex flex-col justify-between">
          {/* Ambient background glow matching active template */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${activeTemplate.accentBg} opacity-60 pointer-events-none transition-all duration-700`}
          />

          <div className="relative z-10 space-y-6">
            {/* Top Badge & Palette Name */}
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
              <Badge variant="rose" size="md" className="tracking-wider uppercase text-[11px]">
                {activeTemplate.statusLabel}
              </Badge>
              <span className="text-xs font-mono text-[#FAF8F5]/60">
                {activeTemplate.palette}
              </span>
            </div>

            {/* Template Title & Story */}
            <div className="space-y-3">
              <h2 className="text-3xl sm:text-4xl font-serif font-medium text-[#FAF8F5]">
                {activeTemplate.name}
              </h2>
              <p className="text-sm sm:text-base text-[#FAF8F5]/80 font-light leading-relaxed">
                {activeTemplate.description}
              </p>
            </div>

            {/* Interactive Color Palette Swatches (specifically for Midnight Rose) */}
            {activeTemplate.id === "midnight-rose" && (
              <div className="space-y-2.5 pt-2">
                <span className="block text-xs uppercase tracking-wider text-[#FAF8F5]/60 font-medium">
                  Select Accent Palette:
                </span>
                <div className="flex flex-wrap gap-2.5">
                  <button
                    type="button"
                    onClick={() => setSelectedSwatch("crimson")}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-medium border flex items-center gap-2 transition-all ${
                      selectedSwatch === "crimson"
                        ? "border-rose-500 bg-rose-950/70 text-white shadow-md shadow-rose-950/60"
                        : "border-white/10 bg-white/5 text-[#FAF8F5]/70 hover:bg-white/10"
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Crimson
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedSwatch("violet")}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-medium border flex items-center gap-2 transition-all ${
                      selectedSwatch === "violet"
                        ? "border-purple-500 bg-purple-950/70 text-white shadow-md shadow-purple-950/60"
                        : "border-white/10 bg-white/5 text-[#FAF8F5]/70 hover:bg-white/10"
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-500" /> Violet
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedSwatch("gold")}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-medium border flex items-center gap-2 transition-all ${
                      selectedSwatch === "gold"
                        ? "border-amber-500 bg-amber-950/70 text-white shadow-md shadow-amber-950/60"
                        : "border-white/10 bg-white/5 text-[#FAF8F5]/70 hover:bg-white/10"
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Gold
                  </button>
                </div>
              </div>
            )}

            {/* Visual Preview Moment */}
            <div className="p-5 rounded-2xl bg-black/40 border border-white/[0.08] flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-rose-700/80 border border-rose-500/80 flex items-center justify-center text-xl shrink-0 shadow-lg shadow-rose-950/80">
                💌
              </div>
              <div className="space-y-0.5">
                <span className="text-xs uppercase tracking-wider text-rose-300 font-sans font-medium">
                  {activeTemplate.name} Preview
                </span>
                <p className="text-xs text-[#FAF8F5]/70 italic">
                  &ldquo;A private letter, sealed with wax and starlight.&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* Action CTA */}
          <div className="relative z-10 pt-8 mt-4 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-[#FAF8F5]/60 font-sans">
              No registration · Instant publish
            </span>
            <CurtainLink href="/create" className="w-full sm:w-auto">
              <Button size="md" variant="primary" className="w-full sm:w-auto px-6 py-2.5 rounded-full">
                <span>Customize {activeTemplate.name}</span>
                <span>→</span>
              </Button>
            </CurtainLink>
          </div>
        </div>
      </div>
    </section>
  );
}
