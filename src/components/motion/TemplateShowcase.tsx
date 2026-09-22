"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { CurtainLink } from "@/components/motion/PageCurtains";
import { getAllTemplates } from "@/templates/registry";
import { CapabilityChip, CapabilityKey } from "@/components/ui/CapabilityChip";

interface WorldPresentationMeta {
  id: string;
  name: string;
  subtitle: string;
  badge: string;
  icon: string;
  quote: string;
  signature: string;
  atmosphereTone: string;
  accentCardBorder: string;
  accentCardBg: string;
  accentGlow: string;
  accentPill: string;
  sampleSender: string;
  sampleRecipient: string;
  capabilities: CapabilityKey[];
  swatches?: { id: string; name: string; color: string }[];
}

const WORLD_PRESENTATIONS: Record<string, WorldPresentationMeta> = {
  "midnight-rose": {
    id: "midnight-rose",
    name: "Midnight Rose",
    subtitle: "Starlight & Digital Wax Letter",
    badge: "Flagship World",
    icon: "🌹",
    quote: "“A cinematic declaration wrapped in starlight, candlelit velvet, and an interactive wax seal.”",
    signature: "Physical envelope + interactive crimson wax seal reveal",
    atmosphereTone: "Deep Obsidian · Crimson Rose · Gold Dust · Starlight",
    accentCardBorder: "border-rose-500/30 hover:border-rose-500/50",
    accentCardBg: "bg-gradient-to-br from-[#1A0A12]/90 via-[#12040C]/90 to-[#0A0207]/95",
    accentGlow: "from-rose-600/20 via-rose-950/40 to-transparent",
    accentPill: "bg-rose-950/80 border-rose-500/40 text-rose-200",
    sampleSender: "Yours Always",
    sampleRecipient: "Dearest Maya",
    capabilities: ["letter", "timeline", "quiz", "secret", "openWhen"],
    swatches: [
      { id: "crimson-rose", name: "Crimson", color: "#e11d48" },
      { id: "midnight-violet", name: "Violet", color: "#9333ea" },
      { id: "champagne-gold", name: "Gold", color: "#d97706" },
    ],
  },
  "cloud-nine": {
    id: "cloud-nine",
    name: "Cloud Nine",
    subtitle: "Dreamy Pastel Sky & Clouds",
    badge: "Luminous World",
    icon: "☁️",
    quote: "“Floating weightlessly above sunset clouds, with gentle heart drifts and playful warmth.”",
    signature: "Celestial blessing + interactive cloud envelope fold",
    atmosphereTone: "Baby Pink · Lavender · Luminous Pearl · Soft Sunset",
    accentCardBorder: "border-pink-300/30 hover:border-pink-300/50",
    accentCardBg: "bg-gradient-to-br from-[#1C1220]/90 via-[#160E1A]/90 to-[#0F0B14]/95",
    accentGlow: "from-pink-500/20 via-purple-950/40 to-transparent",
    accentPill: "bg-pink-950/80 border-pink-400/40 text-pink-200",
    sampleSender: "Forever in the Clouds",
    sampleRecipient: "Dearest Angel",
    capabilities: ["letter", "timeline", "quiz", "openWhen"],
    swatches: [
      { id: "blush-sky", name: "Blush Sky", color: "#f472b6" },
      { id: "sunset-coral", name: "Sunset", color: "#fb7185" },
      { id: "lavender-dream", name: "Lavender", color: "#c084fc" },
    ],
  },
  "kage": {
    id: "kage",
    name: "Kage (影)",
    subtitle: "Kyoto Sanctuary & 3D Shaders",
    badge: "ThreeUI WebGL World",
    icon: "⛩️",
    quote: "“A Kyoto mountain temple at twilight. Drifting mist, Japanese stone lanterns, and quiet secrets.”",
    signature: "Kyoto mist canvas + authentic WebGL Three.js shaders",
    atmosphereTone: "Sacred Emerald · Kyoto Teal · Temple Stone · Sacred Cedar",
    accentCardBorder: "border-emerald-500/30 hover:border-emerald-500/50",
    accentCardBg: "bg-gradient-to-br from-[#061511]/90 via-[#040E0B]/90 to-[#020705]/95",
    accentGlow: "from-emerald-600/20 via-teal-950/40 to-transparent",
    accentPill: "bg-emerald-950/80 border-emerald-500/40 text-emerald-200",
    sampleSender: "With all my heart",
    sampleRecipient: "Aoi",
    capabilities: ["letter", "secret"],
    swatches: [
      { id: "kyoto-crimson", name: "Kyoto Crimson", color: "#e0231c" },
      { id: "sanctuary-emerald", name: "Sanctuary Emerald", color: "#10b981" },
      { id: "moonlit-stone", name: "Moonlit Stone", color: "#94a3b8" },
    ],
  },
};

export function TemplateShowcase({ className = "" }: { className?: string }) {
  const [activeWorldId, setActiveWorldId] = useState<string>("midnight-rose");
  const [selectedSwatch, setSelectedSwatch] = useState<string>("crimson-rose");
  const shouldReduceMotion = useReducedMotion();

  const allTemplates = getAllTemplates();
  const availableTemplates = allTemplates.filter((t) => t.availability === "available");

  const currentMeta = WORLD_PRESENTATIONS[activeWorldId] || WORLD_PRESENTATIONS["midnight-rose"];

  return (
    <section id="worlds" className={`w-full max-w-6xl mx-auto px-6 py-20 relative z-10 ${className}`}>
      {/* Section Header */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10"
      >
        <div>
          <Badge
            variant="neutral"
            size="sm"
            className="mb-3 tracking-widest uppercase text-[11px] bg-white/[0.06] border-white/15 text-ivory-200"
          >
            The World Collection
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-serif font-medium text-white tracking-tight">
            Three Distinct Visual Worlds
          </h2>
          <p className="text-sm sm:text-base text-white/70 font-light mt-2 max-w-xl">
            Valentino provides complete, authentic creative worlds — each designed with its own atmosphere, typography, interactions, and emotional signature.
          </p>
        </div>
        <CurtainLink href="/templates">
          <Button
            variant="outline"
            size="sm"
            className="text-xs px-4 border-white/20 hover:border-white/40 text-white rounded-full"
          >
            Open Showroom →
          </Button>
        </CurtainLink>
      </motion.div>

      {/* Main Interactive Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left: World Selectors */}
        <div className="lg:col-span-5 space-y-3.5 flex flex-col justify-between">
          {availableTemplates.map((tmpl) => {
            const isSelected = tmpl.id === activeWorldId;
            const meta = WORLD_PRESENTATIONS[tmpl.id];
            return (
              <div
                key={tmpl.id}
                onClick={() => {
                  setActiveWorldId(tmpl.id);
                  if (meta?.swatches?.[0]) setSelectedSwatch(meta.swatches[0].id);
                }}
                className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer select-none relative group ${
                  isSelected
                    ? `${meta?.accentCardBorder || "border-white/40"} ${meta?.accentCardBg || "bg-white/10"} shadow-xl translate-x-1`
                    : "bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.05] hover:border-white/15"
                }`}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveWorldId(tmpl.id);
                    if (meta?.swatches?.[0]) setSelectedSwatch(meta.swatches[0].id);
                  }
                }}
                aria-pressed={isSelected}
                aria-label={`Select ${tmpl.name} world`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3.5">
                    <span className="text-2xl select-none">{meta?.icon || "✦"}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-serif text-lg font-medium text-white group-hover:text-rose-200 transition-colors">
                          {tmpl.name}
                        </h3>
                        {isSelected && (
                          <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/10 border border-white/20 text-white/80 font-mono">
                            Selected
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-white/60 font-sans block mt-0.5">
                        {meta?.subtitle || tmpl.tagline}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`text-white/60 transition-transform duration-300 ${
                      isSelected ? "translate-x-0 opacity-100 text-white" : "-translate-x-1 opacity-0 group-hover:opacity-60"
                    }`}
                  >
                    →
                  </span>
                </div>
              </div>
            );
          })}

          <div className="p-4 rounded-2xl border border-white/[0.06] bg-white/[0.01] text-xs text-white/50 space-y-1">
            <span className="font-medium text-white/80">Every World Includes:</span>
            <p>Non-destructive world switching · Private unguessable URLs · Concurrency locking · Autosave.</p>
          </div>
        </div>

        {/* Right: Rich Interactive Spotlight Card */}
        <div className={`lg:col-span-7 rounded-3xl border ${currentMeta.accentCardBorder} ${currentMeta.accentCardBg} backdrop-blur-xl p-7 sm:p-9 shadow-2xl relative overflow-hidden flex flex-col justify-between transition-all duration-500`}>
          {/* Ambient background glow */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${currentMeta.accentGlow} pointer-events-none transition-all duration-700`}
          />

          <div className="relative z-10 space-y-6">
            {/* Top Badge & Atmosphere */}
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
              <span className={`text-[11px] font-mono uppercase tracking-widest px-3 py-0.5 rounded-full border ${currentMeta.accentPill}`}>
                {currentMeta.badge}
              </span>
              <span className="text-xs font-mono text-white/60">
                {currentMeta.atmosphereTone}
              </span>
            </div>

            {/* Title & Atmosphere Quote */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-3xl select-none">{currentMeta.icon}</span>
                <h3 className="text-3xl sm:text-4xl font-serif font-medium text-white">
                  {currentMeta.name}
                </h3>
              </div>
              <p className="text-sm sm:text-base text-white/80 font-serif italic leading-relaxed pt-1">
                {currentMeta.quote}
              </p>
            </div>

            {/* Signature Experience & Interactive Capability Buttons */}
            <div className="space-y-3 pt-2">
              <span className="block text-xs uppercase tracking-wider text-white/50 font-medium">
                Supported Experience Modules (Click to Launch):
              </span>
              <div className="flex flex-wrap gap-2">
                {currentMeta.capabilities.map((cap) => (
                  <CapabilityChip
                    key={cap}
                    capability={cap}
                    templateId={currentMeta.id}
                  />
                ))}
              </div>
            </div>

            {/* Optional Palette Swatches */}
            {currentMeta.swatches && currentMeta.swatches.length > 0 && (
              <div className="space-y-2 pt-1">
                <span className="block text-xs uppercase tracking-wider text-white/50 font-medium">
                  Atmospheric Accents:
                </span>
                <div className="flex flex-wrap gap-2">
                  {currentMeta.swatches.map((swatch) => (
                    <button
                      key={swatch.id}
                      type="button"
                      onClick={() => setSelectedSwatch(swatch.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium border flex items-center gap-2 transition-all ${
                        selectedSwatch === swatch.id
                          ? "border-white/40 bg-white/15 text-white shadow-sm"
                          : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
                      }`}
                    >
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: swatch.color }} />
                      <span>{swatch.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Signature Details Box */}
            <div className="p-4 rounded-2xl bg-black/40 border border-white/[0.08] flex items-center justify-between text-xs text-white/70">
              <span className="text-white/50">Signature Mechanism:</span>
              <span className="font-medium text-white">{currentMeta.signature}</span>
            </div>
          </div>

          {/* Action CTA */}
          <div className="relative z-10 pt-6 mt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-white/60 font-sans">
              No registration required · Instant private link
            </span>
            <CurtainLink href={`/create?template=${currentMeta.id}`} className="w-full sm:w-auto">
              <Button size="md" variant="primary" className="w-full sm:w-auto px-6 py-2.5 rounded-full">
                <span>Customize {currentMeta.name}</span>
                <span>→</span>
              </Button>
            </CurtainLink>
          </div>
        </div>
      </div>
    </section>
  );
}
