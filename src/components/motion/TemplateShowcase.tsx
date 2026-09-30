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
    subtitle: "Private Midnight Garden & Velvet",
    badge: "Flagship World",
    icon: "🌹",
    quote: "“A private midnight garden of candlelight, drifting rose petals, moonlight, and intimate devotion.”",
    signature: "Candlelit velvet · Drifting roses · Moonlight mist · Tactile crimson wax seal",
    atmosphereTone: "Midnight Velvet · Crimson Rose · Gold Dust · Starlight",
    accentCardBorder: "border-rose-500/30 hover:border-rose-500/50",
    accentCardBg: "bg-gradient-to-br from-[#1A0A12]/90 via-[#12040C]/90 to-[#0A0207]/95",
    accentGlow: "from-rose-600/20 via-rose-950/40 to-transparent",
    accentPill: "bg-rose-950/80 border-rose-500/40 text-rose-200",
    sampleSender: "Yours Always",
    sampleRecipient: "Dearest Maya",
    capabilities: ["letter", "timeline", "quiz", "secret", "openWhen"],
    swatches: [
      { id: "crimson-rose", name: "Crimson Velvet", color: "#e11d48" },
      { id: "midnight-violet", name: "Midnight Violet", color: "#9333ea" },
      { id: "champagne-gold", name: "Candlelit Gold", color: "#d97706" },
    ],
  },
  "cloud-nine": {
    id: "cloud-nine",
    name: "Cloud Nine",
    subtitle: "Dreamy Sunset & Floating Clouds",
    badge: "Luminous World",
    icon: "☁️",
    quote: "“A dreamy sunset world of weightless clouds, golden twilight, and starlight romance.”",
    signature: "Dreamy sunset · Cloud depth · Floating heart motion · Story chapters",
    atmosphereTone: "Sunset Blush · Lavender Mist · Luminous Pearl · Soft Clouds",
    accentCardBorder: "border-pink-300/30 hover:border-pink-300/50",
    accentCardBg: "bg-gradient-to-br from-[#1C1220]/90 via-[#160E1A]/90 to-[#0F0B14]/95",
    accentGlow: "from-pink-500/20 via-purple-950/40 to-transparent",
    accentPill: "bg-pink-950/80 border-pink-400/40 text-pink-200",
    sampleSender: "Forever in the Clouds",
    sampleRecipient: "Dearest Angel",
    capabilities: ["letter", "timeline", "quiz", "openWhen"],
    swatches: [
      { id: "blush-sky", name: "Blush Sky", color: "#f472b6" },
      { id: "sunset-coral", name: "Sunset Horizon", color: "#fb7185" },
      { id: "lavender-dream", name: "Lavender Dream", color: "#c084fc" },
    ],
  },
  "kage": {
    id: "kage",
    name: "Kage (影)",
    subtitle: "Kyoto Sanctuary & Mist",
    badge: "Spatial World",
    icon: "⛩️",
    quote: "“A Kyoto digital sanctuary at twilight. Drifting mountain mist, warm stone lanterns, and quiet depth.”",
    signature: "Spatial WebGL environment · Japanese mist · Lantern warmth · Sacred cedar tranquility",
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
  "apricot-film": {
    id: "apricot-film",
    name: "Apricot Film",
    subtitle: "Warm Analog 16mm & Golden Light",
    badge: "Cinematic World",
    icon: "🎞️",
    quote: "“A sun-drenched memory on 16mm film stock. Golden light leaks, warm amber, and intimate nostalgic warmth.”",
    signature: "Film grain atmosphere · Analog light leaks · Rich tobacco & terracotta · Nostalgic frames",
    atmosphereTone: "Apricot Sun · Tobacco Amber · Golden Hour · Soft Cream",
    accentCardBorder: "border-amber-500/30 hover:border-amber-500/50",
    accentCardBg: "bg-gradient-to-br from-[#1C110A]/90 via-[#140C07]/90 to-[#0A0603]/95",
    accentGlow: "from-amber-600/20 via-orange-950/40 to-transparent",
    accentPill: "bg-amber-950/80 border-amber-500/40 text-amber-200",
    sampleSender: "Yours in 35mm",
    sampleRecipient: "My Golden Hour",
    capabilities: ["letter", "timeline", "quiz"],
    swatches: [
      { id: "apricot-gold", name: "Warm Apricot", color: "#fb923c" },
      { id: "tobacco-amber", name: "Tobacco Amber", color: "#b45309" },
      { id: "vintage-cream", name: "Vintage Cream", color: "#fef3c7" },
    ],
  },
  "wildflower-paper": {
    id: "wildflower-paper",
    name: "Wildflower Paper",
    subtitle: "Botanical Cotton & Pressed Meadow",
    badge: "Tactile World",
    icon: "🌿",
    quote: "“Handmade deckled paper with pressed petals and botanical calm. Tactile, organic, and timelessly gentle.”",
    signature: "Handmade deckled paper · Floating botanicals · Gentle sage & lilac · Embossed monogram",
    atmosphereTone: "Sage Mist · Meadow Lilac · Deckled Cotton · Pale Coral",
    accentCardBorder: "border-emerald-400/30 hover:border-emerald-400/50",
    accentCardBg: "bg-gradient-to-br from-[#0F1713]/90 via-[#0A100D]/90 to-[#060A08]/95",
    accentGlow: "from-emerald-600/15 via-teal-950/30 to-transparent",
    accentPill: "bg-emerald-950/80 border-emerald-400/40 text-emerald-200",
    sampleSender: "Forever and Always",
    sampleRecipient: "My Wildflower",
    capabilities: ["letter", "timeline", "secret"],
    swatches: [
      { id: "pressed-sage", name: "Pressed Sage", color: "#34d399" },
      { id: "meadow-lilac", name: "Meadow Lilac", color: "#c084fc" },
      { id: "pale-coral", name: "Wild Coral", color: "#f87171" },
    ],
  },
  "ocean-letter": {
    id: "ocean-letter",
    name: "Ocean Letter",
    subtitle: "Drifting Glass Bottle & Abyssal Mist",
    badge: "Oceanic World",
    icon: "🌊",
    quote: "“A letter in a glass bottle washed ashore at dusk. Deep teal swells, coastal breeze, and oceanic tranquility.”",
    signature: "Drifting sea glass · Ocean tide mist · Deep abyssal teal · Wax-sealed parchment",
    atmosphereTone: "Abyssal Teal · Fog Blue · Sea Glass · Soft Coral",
    accentCardBorder: "border-cyan-400/30 hover:border-cyan-400/50",
    accentCardBg: "bg-gradient-to-br from-[#07151D]/90 via-[#040E14]/90 to-[#02070A]/95",
    accentGlow: "from-cyan-600/20 via-blue-950/40 to-transparent",
    accentPill: "bg-cyan-950/80 border-cyan-400/40 text-cyan-200",
    sampleSender: "Across the Tides",
    sampleRecipient: "My Safe Harbor",
    capabilities: ["letter", "timeline", "quiz", "openWhen"],
    swatches: [
      { id: "abyssal-teal", name: "Abyssal Teal", color: "#06b6d4" },
      { id: "coastal-fog", name: "Coastal Fog", color: "#38bdf8" },
      { id: "tide-coral", name: "Tide Coral", color: "#fb7185" },
    ],
  },
};

export function TemplateShowcase({ className = "" }: { className?: string }) {
  const [activeWorldId, setActiveWorldId] = useState<string>("midnight-rose");
  const [selectedSwatch, setSelectedSwatch] = useState<string>("crimson-rose");
  const shouldReduceMotion = useReducedMotion();

  const currentMeta = WORLD_PRESENTATIONS[activeWorldId] || WORLD_PRESENTATIONS["midnight-rose"];

  const worldsList: WorldPresentationMeta[] = [
    WORLD_PRESENTATIONS["midnight-rose"],
    WORLD_PRESENTATIONS["cloud-nine"],
    WORLD_PRESENTATIONS["kage"],
    WORLD_PRESENTATIONS["apricot-film"],
    WORLD_PRESENTATIONS["wildflower-paper"],
    WORLD_PRESENTATIONS["ocean-letter"],
  ].filter(Boolean);

  return (
    <section id="worlds" className={`w-full max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24 relative z-10 ${className}`}>
      {/* Section Header: The Living Worlds */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8 sm:mb-12"
      >
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.06] border border-white/10 text-rose-200 text-[11px] uppercase tracking-[0.24em] font-medium backdrop-blur-sm mb-3">
            <span className="text-rose-400">✦</span>
            <span>The World Collection</span>
            <span className="text-rose-400">✦</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-normal text-white tracking-tight">
            The Living Worlds
            <span className="sr-only"> Three Distinct Visual Worlds</span>
          </h2>
          <p className="text-sm sm:text-base text-white/70 font-light mt-2 max-w-xl leading-relaxed">
            Step through the portal. Six distinct digital worlds — each crafted with its own atmosphere, typography, interactions, and emotional signature.
          </p>
        </div>

        <CurtainLink href="/templates">
          <Button
            variant="outline"
            size="sm"
            className="text-xs px-5 py-2.5 border-rose-300/40 hover:border-rose-300 bg-white/10 hover:bg-white/20 text-white rounded-full shadow-sm transition-all flex items-center gap-1.5"
          >
            <span>Open Showroom</span>
            <span className="text-rose-300 font-serif">→</span>
          </Button>
        </CurtainLink>
      </motion.div>

      {/* World Portal Navigation Rail */}
      <div className="w-full mb-6 sm:mb-8 overflow-x-auto pb-2 scrollbar-none">
        <div className="flex items-center gap-2 min-w-max p-1.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md">
          {worldsList.map((world) => {
            const isSelected = world.id === activeWorldId;
            return (
              <div
                key={world.id}
                role="button"
                tabIndex={0}
                onClick={() => {
                  setActiveWorldId(world.id);
                  if (world.swatches?.[0]) setSelectedSwatch(world.swatches[0].id);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveWorldId(world.id);
                    if (world.swatches?.[0]) setSelectedSwatch(world.swatches[0].id);
                  }
                }}
                className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-[13px] font-medium transition-all duration-300 flex items-center gap-2 select-none cursor-pointer ${
                  isSelected
                    ? "bg-white/15 text-white shadow-md border border-white/25 scale-[1.02]"
                    : "text-white/60 hover:text-white hover:bg-white/[0.06] border border-transparent"
                }`}
                aria-pressed={isSelected}
                aria-label={`Select ${world.name} world`}
              >
                <span className="text-base sm:text-lg">{world.icon}</span>
                <span className="font-serif tracking-wide">{world.name}</span>
                {isSelected && (
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse ml-0.5" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Large Active World Portal Canvas */}
      <div
        className={`w-full rounded-3xl border ${currentMeta.accentCardBorder} ${currentMeta.accentCardBg} backdrop-blur-2xl shadow-2xl relative overflow-hidden transition-all duration-700 min-h-[500px] flex flex-col justify-between p-6 sm:p-10 lg:p-12`}
      >
        {/* Dynamic World Atmosphere Backlight Glow */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${currentMeta.accentGlow} pointer-events-none transition-all duration-700 opacity-70`}
        />

        {/* Top Atmosphere Meta Rail */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] pb-5">
          <div className="flex items-center gap-2.5">
            <span className={`text-[10px] sm:text-[11px] font-mono uppercase tracking-widest px-3 py-1 rounded-full border ${currentMeta.accentPill}`}>
              {currentMeta.badge}
            </span>
            <span className="text-xs text-white/50 font-sans hidden sm:inline">·</span>
            <span className="text-xs text-white/80 font-sans">
              {currentMeta.subtitle}
            </span>
          </div>

          <span className="text-xs font-mono text-white/60">
            {currentMeta.atmosphereTone}
          </span>
        </div>

        {/* Central Asymmetric Stage: Object + Poetry */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 my-8 items-center">
          {/* Left: Poetry & Story Modules */}
          <div className="lg:col-span-7 space-y-5">
            <div className="flex items-center gap-3.5">
              <span className="text-4xl sm:text-5xl select-none filter drop-shadow-md">
                {currentMeta.icon}
              </span>
              <div>
                <h3 className="text-3xl sm:text-5xl font-serif font-normal text-white tracking-tight">
                  {currentMeta.name}
                </h3>
                <span className="text-xs text-rose-300/80 font-mono tracking-widest uppercase block mt-1">
                  Signature Atmosphere
                </span>
              </div>
            </div>

            <p className="text-base sm:text-xl text-white/90 font-serif italic leading-relaxed pt-1 max-w-xl">
              {currentMeta.quote}
            </p>

            {/* Signature Mechanism */}
            <div className="p-4 rounded-2xl bg-black/40 border border-white/[0.08] text-xs sm:text-[13px] text-white/80 flex items-center gap-2 max-w-lg">
              <span className="text-white/40 font-mono text-[11px] uppercase tracking-wider">Atmosphere:</span>
              <span className="font-medium text-white">{currentMeta.signature}</span>
            </div>

            {/* Modules */}
            <div className="space-y-2 pt-2">
              <span className="block text-[11px] uppercase tracking-wider text-white/50 font-mono font-medium">
                Included Interactive Modules:
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
          </div>

          {/* Right: Unique World Tactile Object */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="w-full max-w-sm rounded-2xl p-6 bg-white/[0.04] border border-white/[0.12] shadow-xl backdrop-blur-md relative group hover:border-white/25 transition-all">
              <div className="flex items-center justify-between text-[10px] text-white/50 uppercase tracking-widest font-mono mb-4 pb-3 border-b border-white/[0.08]">
                <span>Sample Dispatch</span>
                <span>{currentMeta.sampleSender}</span>
              </div>

              <div className="space-y-3">
                <span className="text-xs font-serif text-rose-300/90 italic">
                  To {currentMeta.sampleRecipient},
                </span>
                <p className="text-xs sm:text-sm text-white/85 font-serif leading-relaxed line-clamp-3">
                  {currentMeta.quote}
                </p>
              </div>

              {/* World Accent Swatches */}
              {currentMeta.swatches && currentMeta.swatches.length > 0 && (
                <div className="mt-5 pt-4 border-t border-white/[0.08] flex items-center justify-between">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-white/40">Palette:</span>
                  <div className="flex items-center gap-2">
                    {currentMeta.swatches.map((swatch) => (
                      <button
                        key={swatch.id}
                        type="button"
                        onClick={() => setSelectedSwatch(swatch.id)}
                        className={`w-4 h-4 rounded-full transition-transform ${
                          selectedSwatch === swatch.id ? "scale-125 ring-2 ring-white/60" : "opacity-75 hover:opacity-100"
                        }`}
                        style={{ backgroundColor: swatch.color }}
                        title={swatch.name}
                        aria-label={`Select ${swatch.name} swatch`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Action Footer */}
        <div className="relative z-10 pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-white/60 font-sans">
            Non-destructive world switching · Private unguessable link · Zero ads
          </span>

          <CurtainLink href={`/create?template=${currentMeta.id}`} className="w-full sm:w-auto">
            <Button
              size="md"
              variant="primary"
              className="w-full sm:w-auto px-7 py-3 rounded-full font-medium text-white bg-white/20 hover:bg-white/30 border border-white/30 shadow-lg hover:shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Customize {currentMeta.name}</span>
              <span className="text-rose-300">→</span>
            </Button>
          </CurtainLink>
        </div>
      </div>
    </section>
  );
}
