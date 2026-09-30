"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { CurtainLink } from "@/components/motion/PageCurtains";
import { ValentinoMonogram } from "@/components/motion/ValentinoMonogram";
import { ValentinePlasmaButton, type ValentinePlasmaTheme } from "@/components/ui/ValentinePlasmaButton";
import { getAllTemplates, ROADMAP_WORLDS, RoadmapWorld } from "@/templates/registry";
import { CapabilityChip, CapabilityKey } from "@/components/ui/CapabilityChip";
import { AtmosphericCanvas } from "@/worlds/AtmosphericCanvas";
import { useDeviceTier } from "@/worlds/useDeviceTier";
import { WorldTheme } from "@/worlds/types";

// Lazy-load Kage WebGL component to isolate Three.js runtime until explicitly requested
const KageComponentLazy = dynamic(
  () => import("@/templates/kage/v1/Component").then((mod) => mod.KageComponent),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full min-h-[380px] flex flex-col items-center justify-center bg-[#06100E] text-emerald-300 gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-emerald-400 border-t-transparent animate-spin" />
        <span className="text-xs font-mono tracking-wider">Awakening Kyoto Sanctuary WebGL...</span>
      </div>
    ),
  }
);

interface WorldProfile {
  id: WorldTheme;
  name: string;
  jpName?: string;
  tagline: string;
  category: string;
  identity: string;
  feeling: string;
  bestFor: string;
  signature: string;
  atmosphereTone: string;
  experienceFlow: string;
  accentColor: string;
  glowColor: string;
  surfaceBg: string;
  surfaceBorder: string;
  previewQuote: string;
  sampleSender: string;
  sampleRecipient: string;
  capabilities: CapabilityKey[];
  swatches?: { id: string; name: string; color: string; buttonLabel: string }[];
}

const WORLD_PROFILES: Record<WorldTheme, WorldProfile> = {
  "cloud-nine": {
    id: "cloud-nine",
    name: "Cloud Nine",
    tagline: "For the person who makes everything lighter",
    category: "Luminous World",
    identity: "Dreamy Sunset Sky World",
    feeling: "Weightless, warm, soft, playful, intimate.",
    bestFor: "Dreamy, playful, affectionate stories that feel light as air.",
    signature: "Sunset clouds · floating petals · warm cream paper · luminous pearl",
    atmosphereTone: "Sunset Blush · Peach Horizon · Floating Motes · Cotton Haze",
    experienceFlow: "Welcome Cloud Envelope → Narrative Chapters → Floating Memories → Luminous Finale",
    accentColor: "#f472b6",
    glowColor: "rgba(244, 114, 182, 0.22)",
    surfaceBg: "bg-gradient-to-br from-[#201019]/95 via-[#190C14]/95 to-[#10070D]/95",
    surfaceBorder: "border-pink-300/30",
    previewQuote: "“Every moment with you feels like floating high above the clouds, gentle and weightless.”",
    sampleSender: "Forever in the Clouds",
    sampleRecipient: "Dearest Angel",
    capabilities: ["letter", "timeline", "quiz", "openWhen"],
    swatches: [
      { id: "blush-sky", name: "Blush Sky", color: "#f472b6", buttonLabel: "Blush" },
      { id: "sunset-coral", name: "Sunset Coral", color: "#fb7185", buttonLabel: "Coral" },
      { id: "lavender-dream", name: "Lavender Dream", color: "#c084fc", buttonLabel: "Lavender" },
    ],
  },
  "midnight-rose": {
    id: "midnight-rose",
    name: "Midnight Rose",
    tagline: "For the love that feels like midnight",
    category: "Flagship World",
    identity: "Private Midnight Garden",
    feeling: "Intimate, mysterious, elegant, candlelit.",
    bestFor: "Intimate, dramatic, deeply personal stories sealed after dark.",
    signature: "Physical envelope + interactive wax seal reveal · moonlit mist · candlelight",
    atmosphereTone: "Midnight Velvet · Crimson Rose · Gold Dust · Starlight Mist",
    experienceFlow: "Tactile Sealed Envelope → Relationship Milestones → Secret Keepsakes → Candlelit Vow",
    accentColor: "#e11d48",
    glowColor: "rgba(225, 29, 72, 0.25)",
    surfaceBg: "bg-gradient-to-br from-[#1C0812]/95 via-[#13040C]/95 to-[#090206]/95",
    surfaceBorder: "border-rose-500/30",
    previewQuote: "“In a world of noise, you are my quiet starlight. Every single day with you feels like midnight poetry.”",
    sampleSender: "Yours Always",
    sampleRecipient: "Dearest Maya",
    capabilities: ["letter", "timeline", "quiz", "secret", "openWhen"],
    swatches: [
      { id: "crimson-rose", name: "Crimson Velvet", color: "#e11d48", buttonLabel: "Crimson" },
      { id: "midnight-violet", name: "Midnight Violet", color: "#9333ea", buttonLabel: "Violet" },
      { id: "champagne-gold", name: "Champagne Gold", color: "#d97706", buttonLabel: "Gold" },
    ],
  },
  "kage": {
    id: "kage",
    name: "Kage",
    jpName: "(影)",
    tagline: "A Kyoto sanctuary where shadows embrace starlight",
    category: "Spatial Sanctuary",
    identity: "Kyoto Digital Sanctuary",
    feeling: "Quiet, contemplative, spatial, mysterious.",
    bestFor: "Quiet, poetic, contemplative stories steeped in sacred stillness.",
    signature: "Kyoto mountain atmosphere · cedar & lantern glow · spatial sanctuary",
    atmosphereTone: "Sacred Emerald · Kyoto Teal · Stone Lanterns · Mountain Mist",
    experienceFlow: "Sacred Torii Gate → Reflective Verses → Sacred Memories → Twilight Constellation",
    accentColor: "#10b981",
    glowColor: "rgba(163, 184, 153, 0.22)",
    surfaceBg: "bg-gradient-to-br from-[#061410]/95 via-[#030E0B]/95 to-[#020605]/95",
    surfaceBorder: "border-emerald-500/30",
    previewQuote: "“In the quiet shade of the sacred cedar, my thoughts find their home with you.”",
    sampleSender: "With all my heart",
    sampleRecipient: "Aoi",
    capabilities: ["letter", "secret"],
    swatches: [
      { id: "kyoto-crimson", name: "Kyoto Crimson", color: "#e0231c", buttonLabel: "Crimson" },
      { id: "sanctuary-emerald", name: "Sanctuary Emerald", color: "#10b981", buttonLabel: "Emerald" },
      { id: "moonlit-stone", name: "Moonlit Stone", color: "#94a3b8", buttonLabel: "Stone" },
    ],
  },
  "apricot-film": {
    id: "apricot-film",
    name: "Apricot Film",
    tagline: "For the memories that feel like warm analog cinema",
    category: "Analog Cinema",
    identity: "Warm 16mm Memory Reel",
    feeling: "Nostalgic, golden, cinematic, heartwarming.",
    bestFor: "Cherished photographic memories, golden hour reflections, and nostalgic romance.",
    signature: "Analog film slide + golden hour light leak · tobacco amber · 16mm grain",
    atmosphereTone: "Sunlit Apricot · Tobacco Amber · Golden Motes · Analog Grain",
    experienceFlow: "Analog Reel Arrival → Cinematic Memories → Sunlit Letter → Golden Hour Vow",
    accentColor: "#e76f51",
    glowColor: "rgba(231, 111, 81, 0.28)",
    surfaceBg: "bg-gradient-to-br from-[#24140A]/95 via-[#1A0D06]/95 to-[#0E0603]/95",
    surfaceBorder: "border-[#e76f51]/30",
    previewQuote: "“Every frame with you is steeped in golden afternoon warmth that never fades.”",
    sampleSender: "Forever in Golden Hour",
    sampleRecipient: "Dearest Memory",
    capabilities: ["letter", "timeline", "quiz"],
    swatches: [
      { id: "apricot-amber", name: "Apricot Amber", color: "#e76f51", buttonLabel: "Amber" },
      { id: "terracotta-sun", name: "Terracotta Sun", color: "#f4a261", buttonLabel: "Terracotta" },
      { id: "tobacco-espresso", name: "Tobacco Espresso", color: "#3d1f0e", buttonLabel: "Espresso" },
    ],
  },
  "wildflower-paper": {
    id: "wildflower-paper",
    name: "Wildflower Paper",
    tagline: "For a love cultivated slowly with honesty and grace",
    category: "Botanical Craft",
    identity: "Artisan Meadow Press",
    feeling: "Organic, gentle, handwritten, pastoral.",
    bestFor: "Handwritten letters, meadow memories, and honest botanical devotion.",
    signature: "Botanical twine unbind + pressed floral reveal · deckled cotton fibers · sage mist",
    atmosphereTone: "Pressed Sage · Dried Lilac · Cotton Fibers · Meadow Dew",
    experienceFlow: "Deckled Parcel Unfold → Botanical Chapters → Pressed Petal Keepsakes → Pastoral Promise",
    accentColor: "#c084fc",
    glowColor: "rgba(163, 184, 153, 0.25)",
    surfaceBg: "bg-gradient-to-br from-[#1B281F]/95 via-[#121E16]/95 to-[#0A120D]/95",
    surfaceBorder: "border-[#a3b899]/30",
    previewQuote: "“Our love is like pressed wildflowers inside an artisan journal — quiet, enduring, and honest.”",
    sampleSender: "Grown in Love",
    sampleRecipient: "Gentlest Blossom",
    capabilities: ["letter", "timeline", "secret"],
    swatches: [
      { id: "sage-botanical", name: "Pressed Sage", color: "#a3b899", buttonLabel: "Sage" },
      { id: "pressed-lilac", name: "Pressed Lilac", color: "#c084fc", buttonLabel: "Lilac" },
      { id: "meadow-coral", name: "Meadow Coral", color: "#fb7185", buttonLabel: "Coral" },
    ],
  },
  "ocean-letter": {
    id: "ocean-letter",
    name: "Ocean Letter",
    tagline: "For devotion as vast and steady as the tides",
    category: "Oceanic Tranquility",
    identity: "Sea Glass Coastal Sanctuary",
    feeling: "Vast, tranquil, profound, eternal.",
    bestFor: "Long-distance devotion, enduring promises, and tranquil oceanic depth.",
    signature: "Sea glass message in a bottle + tidal ripple · fog blue mist · tidal foam",
    atmosphereTone: "Oceanic Teal · Fog Blue · Sea Glass Foam · Tidal Mist",
    experienceFlow: "Sea Glass Uncork → Tidal Reflections → Ocean Milestones → Twilight Horizon Vow",
    accentColor: "#38bdf8",
    glowColor: "rgba(56, 189, 248, 0.28)",
    surfaceBg: "bg-gradient-to-br from-[#0B2138]/95 via-[#061526]/95 to-[#020A14]/95",
    surfaceBorder: "border-[#38bdf8]/30",
    previewQuote: "“Our devotion is as vast, calm, and enduring as the twilight sea.”",
    sampleSender: "With Every Tide",
    sampleRecipient: "Steady Anchor",
    capabilities: ["letter", "timeline", "quiz", "openWhen"],
    swatches: [
      { id: "fog-blue", name: "Fog Blue", color: "#7dd3fc", buttonLabel: "Blue" },
      { id: "deep-teal", name: "Deep Teal", color: "#0e7490", buttonLabel: "Teal" },
      { id: "soft-coral", name: "Soft Coral", color: "#fb7185", buttonLabel: "Coral" },
    ],
  },
};

export default function TemplatesPage() {
  const { tier, isReducedMotion } = useDeviceTier();
  const shouldReduceMotion = useReducedMotion();
  const allTemplates = useMemo(() => getAllTemplates(), []);

  const [activeWorldId, setActiveWorldId] = useState<WorldTheme>("midnight-rose");
  const [selectedMidnightTheme, setSelectedMidnightTheme] = useState<string>("crimson-rose");
  const [selectedCloudTheme, setSelectedCloudTheme] = useState<string>("blush-sky");
  const [selectedKageTheme, setSelectedKageTheme] = useState<string>("sanctuary-emerald");

  const [selectedApricotTheme, setSelectedApricotTheme] = useState<string>("apricot-amber");
  const [selectedWildflowerTheme, setSelectedWildflowerTheme] = useState<string>("sage-botanical");
  const [selectedOceanTheme, setSelectedOceanTheme] = useState<string>("fog-blue");

  // Interaction states
  const [surpriseMatch, setSurpriseMatch] = useState<string | null>(null);
  const [activeMidnightSealed, setActiveMidnightSealed] = useState(true);
  const [activeCloudNineSealed, setActiveCloudNineSealed] = useState(true);
  const [activeApricotRevealed, setActiveApricotRevealed] = useState(false);
  const [activeWildflowerRevealed, setActiveWildflowerRevealed] = useState(false);
  const [activeOceanRevealed, setActiveOceanRevealed] = useState(false);
  const [activeKagePreview, setActiveKagePreview] = useState(false);
  const [isFullPreviewOpen, setIsFullPreviewOpen] = useState(false);

  const currentProfile = WORLD_PROFILES[activeWorldId];

  // Midnight theme visual metadata
  const midnightThemeMeta = useMemo(() => {
    switch (selectedMidnightTheme) {
      case "midnight-violet":
        return {
          name: "Midnight Violet",
          sealBg: "bg-purple-700",
          sealBorder: "border-purple-500",
          border: "border-purple-500/30",
          badge: "text-purple-200 bg-purple-950/70 border-purple-500/40",
          accentText: "text-purple-300",
          glow: "rgba(147, 51, 234, 0.25)",
        };
      case "champagne-gold":
        return {
          name: "Champagne Gold",
          sealBg: "bg-amber-700",
          sealBorder: "border-amber-500",
          border: "border-amber-500/30",
          badge: "text-amber-200 bg-amber-950/70 border-amber-500/40",
          accentText: "text-amber-300",
          glow: "rgba(217, 119, 6, 0.25)",
        };
      case "crimson-rose":
      default:
        return {
          name: "Crimson Rose",
          sealBg: "bg-rose-700",
          sealBorder: "border-rose-500",
          border: "border-rose-500/30",
          badge: "text-rose-200 bg-rose-950/70 border-rose-500/40",
          accentText: "text-rose-300",
          glow: "rgba(225, 29, 72, 0.25)",
        };
    }
  }, [selectedMidnightTheme]);

  const currentPlasmaTheme: ValentinePlasmaTheme =
    activeWorldId === "midnight-rose"
      ? "midnightRose"
      : activeWorldId === "cloud-nine"
      ? "cloudNine"
      : "kage";

  const handleSurpriseMe = () => {
    const activeIds: WorldTheme[] = [
      "cloud-nine",
      "midnight-rose",
      "kage",
      "apricot-film",
      "wildflower-paper",
      "ocean-letter",
    ];
    const filtered = activeIds.filter((id) => id !== activeWorldId);
    const random = filtered[Math.floor(Math.random() * filtered.length)];
    setSurpriseMatch(random);
    setActiveWorldId(random);
    const targetElement = document.getElementById("showroom-stage");
    targetElement?.scrollIntoView({ behavior: "smooth" });
  };

  // Keyboard navigation for modal
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsFullPreviewOpen(false);
      setActiveKagePreview(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <main className="relative min-h-[100dvh] flex flex-col items-center justify-start bg-[#0A070B] text-[#FAF8F5] overflow-x-hidden selection:bg-rose-500/25 font-ui">
      {/* ========================================================================= */}
      {/* 0. DYNAMIC ENVIRONMENTAL ATMOSPHERE (Smooth World Dimension Crossfade)   */}
      {/* ========================================================================= */}
      <div className="fixed inset-0 pointer-events-none z-world-bg transition-opacity duration-1000 overflow-hidden">
        {/* Environmental Horizon Radial Glow */}
        <div
          className="absolute inset-0 transition-all duration-1000"
          style={{
            background:
              activeWorldId === "cloud-nine"
                ? "radial-gradient(ellipse 90% 70% at 50% 15%, rgba(244, 114, 182, 0.16) 0%, rgba(251, 146, 60, 0.08) 45%, rgba(10, 7, 11, 0.95) 100%)"
                : activeWorldId === "midnight-rose"
                ? "radial-gradient(ellipse 90% 70% at 50% 15%, rgba(225, 29, 72, 0.18) 0%, rgba(147, 51, 234, 0.08) 45%, rgba(10, 7, 11, 0.95) 100%)"
                : activeWorldId === "kage"
                ? "radial-gradient(ellipse 90% 70% at 50% 15%, rgba(16, 185, 129, 0.16) 0%, rgba(224, 35, 28, 0.08) 45%, rgba(10, 7, 11, 0.95) 100%)"
                : activeWorldId === "apricot-film"
                ? "radial-gradient(ellipse 90% 70% at 50% 15%, rgba(244, 162, 97, 0.18) 0%, rgba(231, 111, 81, 0.1) 45%, rgba(10, 7, 11, 0.95) 100%)"
                : activeWorldId === "wildflower-paper"
                ? "radial-gradient(ellipse 90% 70% at 50% 15%, rgba(192, 132, 252, 0.16) 0%, rgba(163, 184, 153, 0.1) 45%, rgba(10, 7, 11, 0.95) 100%)"
                : "radial-gradient(ellipse 90% 70% at 50% 15%, rgba(56, 189, 248, 0.18) 0%, rgba(14, 116, 144, 0.08) 45%, rgba(10, 7, 11, 0.95) 100%)",
          }}
        />
      </div>

      {/* Dynamic Midground Atmospheric Particles (Only Active World Runs) */}
      <div className="fixed inset-0 pointer-events-none z-atmosphere">
        <AtmosphericCanvas
          key={activeWorldId}
          theme={activeWorldId}
          tier={tier}
          isReducedMotion={Boolean(isReducedMotion || shouldReduceMotion)}
          className="opacity-70"
        />
      </div>

      {/* ========================================================================= */}
      {/* 1. Header (Valentino Luxury Monogram Shell)                               */}
      {/* ========================================================================= */}
      <header className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-5 flex items-center justify-between relative z-floating-ui">
        <CurtainLink href="/" className="flex items-center gap-2 group">
          <ValentinoMonogram size={30} className="transition-transform group-hover:scale-105 duration-300 text-ivory-100" />
          <span className="text-base sm:text-lg font-serif font-medium tracking-wider text-white">
            Valentino
          </span>
        </CurtainLink>
        <CurtainLink href={`/create?template=${activeWorldId}`}>
          <Button size="sm" variant="primary" className="text-xs px-4 rounded-full shadow-sm">
            Create Experience
          </Button>
        </CurtainLink>
      </header>

      {/* ========================================================================= */}
      {/* 2. Showroom Hero & Human Atmosphere Framing                               */}
      {/* ========================================================================= */}
      <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 pt-2 sm:pt-6 pb-6 sm:pb-8 text-center relative z-content">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
          <span className="text-[11px] uppercase tracking-widest text-ivory-300 font-medium">
            The Collection · Visual Worlds
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-serif font-normal text-white mb-2 tracking-tight">
          Choose Your Atmosphere
        </h1>
        <p className="text-xs sm:text-base text-ivory-300/85 font-light max-w-xl mx-auto leading-relaxed">
          Every love story lives in its own climate. Step inside living worlds of mood, atmosphere, and intimate depth before you compose a single word.
        </p>

        {/* Curator Plasma Feature */}
        <div className="pt-4 sm:pt-5 flex flex-col items-center justify-center">
          <ValentinePlasmaButton
            theme={currentPlasmaTheme}
            label="SURPRISE ME"
            sublabel="Spark a Match"
            size="md"
            onClick={handleSurpriseMe}
          />
          {surpriseMatch && (
            <p className="mt-2.5 text-xs font-mono text-rose-300 animate-fade-in bg-rose-950/40 border border-rose-500/30 px-3 py-1 rounded-full">
              Matched with {WORLD_PROFILES[surpriseMatch as WorldTheme]?.name} ✨
            </p>
          )}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. SHOWROOM STAGE: ONE WORLD VISUALLY DOMINATES (Living Dynamic Scene)    */}
      {/* ========================================================================= */}
      <section id="showroom-stage" className="w-full max-w-5xl mx-auto px-4 sm:px-6 pb-14 relative z-content">
        {/* World Switching Navigation Bar */}
        <div className="mb-5 flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-white/[0.08] pb-3">
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-[0.2em] text-ivory-400 font-medium">
              World Showroom
            </span>
            <Badge variant="rose" size="sm" className="text-[11px] tracking-wide">
              {currentProfile.category}
            </Badge>
          </div>

          {/* Dimension Selector Tabs: All 6 Worlds */}
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-md overflow-x-auto max-w-full">
            {(
              [
                "cloud-nine",
                "midnight-rose",
                "kage",
                "apricot-film",
                "wildflower-paper",
                "ocean-letter",
              ] as WorldTheme[]
            ).map((worldKey) => {
              const isActive = activeWorldId === worldKey;
              const profile = WORLD_PROFILES[worldKey];
              return (
                <button
                  key={worldKey}
                  type="button"
                  onClick={() => {
                    setActiveWorldId(worldKey);
                    setActiveKagePreview(false);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? "bg-white/15 text-white shadow-md border border-white/20"
                      : "text-ivory-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: profile.accentColor }} />
                  <span>{profile.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* DOMINANT WORLD LIVING PREVIEW STAGE */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeWorldId}
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -12, scale: 0.99 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <Card
              id={`template-${activeWorldId}`}
              variant="glass"
              className={`p-5 sm:p-9 ${currentProfile.surfaceBorder} shadow-2xl relative overflow-hidden transition-all duration-700 ${currentProfile.surfaceBg}`}
            >
              {/* Dynamic Atmospheric Radiance Blur */}
              <div
                className="absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full blur-3xl pointer-events-none transition-colors duration-700"
                style={{ background: currentProfile.glowColor }}
              />

              {/* Responsive Layout: Mobile Vertical Sequence (Name -> Preview -> Description -> CTAs) */}
              <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 lg:gap-8 items-center relative z-10">
                {/* --------------------------------------------------------------- */}
                {/* SECTION A: World Title & Identity (Mobile: Order 1)             */}
                {/* --------------------------------------------------------------- */}
                <div className="w-full lg:col-span-6 space-y-4 order-1">
                  <div className="flex items-center gap-3">
                    <Badge variant="rose" size="md" className="tracking-wider text-xs">
                      {currentProfile.identity}
                    </Badge>
                    <span className="text-xs text-ivory-400 font-sans">Curated World</span>
                  </div>

                  <div>
                    <h2 className="text-3xl sm:text-4xl font-serif font-medium text-white mb-2 flex items-center gap-2">
                      <span>{currentProfile.name}</span>
                      {currentProfile.jpName && (
                        <span className="text-lg text-emerald-400/60 font-light">{currentProfile.jpName}</span>
                      )}
                    </h2>
                    <p className="text-sm font-serif italic text-rose-200/90 mb-2">
                      &ldquo;{currentProfile.tagline}&rdquo;
                    </p>
                    <p className="text-xs sm:text-sm text-ivory-200/85 font-light leading-relaxed">
                      {currentProfile.feeling}
                    </p>

                    {/* Interactive Capabilities Chips */}
                    <div className="pt-3 flex flex-wrap gap-1.5">
                      {currentProfile.capabilities.map((cap) => (
                        <CapabilityChip
                          key={cap}
                          capability={cap}
                          templateId={activeWorldId}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* --------------------------------------------------------------- */}
                {/* SECTION B: Living Interactive World Artifact (Mobile: Order 2)  */}
                {/* --------------------------------------------------------------- */}
                <div className="w-full lg:col-span-6 flex items-center justify-center p-1 sm:p-4 order-2 lg:row-span-2">
                  {/* WORLD 1: CLOUD NINE LIVING ARTIFACT */}
                  {activeWorldId === "cloud-nine" && (
                    <div className="w-full max-w-sm rounded-2xl bg-white/95 border border-pink-200/80 p-5 sm:p-7 text-center space-y-5 shadow-2xl text-pink-950 transition-all duration-500 backdrop-blur-md">
                      <div className="space-y-1">
                        <span className="inline-block text-[10px] uppercase tracking-widest px-3 py-0.5 rounded-full border border-pink-300 bg-pink-50 text-pink-800">
                          To My Sweetest Soul
                        </span>
                        <h3 className="text-2xl font-serif font-medium text-pink-950">Dearest Angel</h3>
                      </div>

                      {activeCloudNineSealed ? (
                        <div className="py-4 flex flex-col items-center justify-center">
                          <button
                            type="button"
                            onClick={() => setActiveCloudNineSealed(false)}
                            className="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-pink-200 via-rose-200 to-pink-300 border-2 border-pink-300 flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                            aria-label="Open cloud envelope"
                          >
                            <span className="text-3xl select-none">☁️</span>
                          </button>
                          <span className="mt-3 text-xs uppercase tracking-wider text-pink-700/80 font-medium">
                            Tap cloud to unfold letter
                          </span>
                        </div>
                      ) : (
                        <div className="py-3 px-4 rounded-xl bg-pink-50/90 border border-pink-200 text-left space-y-2 animate-fade-in">
                          <p className="text-xs text-pink-900 leading-relaxed font-light font-display italic">
                            {currentProfile.previewQuote}
                          </p>
                          <div className="text-right text-[11px] text-pink-700 font-serif">
                            — {currentProfile.sampleSender}
                          </div>
                          <div className="pt-1 text-center">
                            <button
                              type="button"
                              onClick={() => setActiveCloudNineSealed(true)}
                              className="text-[11px] text-pink-600 hover:text-pink-900 underline underline-offset-2"
                            >
                              Fold Envelope
                            </button>
                          </div>
                        </div>
                      )}

                      <div className="pt-2 border-t border-pink-200/60 flex items-center justify-between text-xs text-pink-700/80">
                        <span>Luminous Sky Atmosphere</span>
                        <span>Soft Cream Paper</span>
                      </div>
                    </div>
                  )}

                  {/* WORLD 2: MIDNIGHT ROSE LIVING ARTIFACT */}
                  {activeWorldId === "midnight-rose" && (
                    <div
                      className={`w-full max-w-sm rounded-2xl bg-black/70 border ${midnightThemeMeta.border} p-5 sm:p-7 text-center space-y-5 shadow-2xl transition-all duration-500 backdrop-blur-xl`}
                    >
                      <div className="space-y-1">
                        <span className={`inline-block text-[11px] uppercase tracking-widest px-3 py-0.5 rounded-full border ${midnightThemeMeta.badge}`}>
                          To My Favorite Person
                        </span>
                        <h3 className="text-2xl font-serif font-medium text-white">Dearest Maya</h3>
                      </div>

                      {activeMidnightSealed ? (
                        <div className="py-4 flex flex-col items-center justify-center">
                          <button
                            type="button"
                            onClick={() => setActiveMidnightSealed(false)}
                            className={`w-18 h-18 sm:w-20 sm:h-20 rounded-full ${midnightThemeMeta.sealBg} border-2 ${midnightThemeMeta.sealBorder} flex items-center justify-center shadow-xl cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-300`}
                            aria-label="Break seal"
                          >
                            <span className="text-3xl select-none">💌</span>
                          </button>
                          <span className="mt-3 text-xs uppercase tracking-wider text-ivory-400/80 font-medium">
                            Tap wax seal to break & unfold
                          </span>
                        </div>
                      ) : (
                        <div className="py-3 px-4 rounded-xl bg-white/[0.05] border border-white/10 text-left space-y-2 animate-fade-in">
                          <p className="text-xs text-ivory-200 leading-relaxed font-light font-display italic">
                            {currentProfile.previewQuote}
                          </p>
                          <div className="text-right text-[11px] text-rose-300 font-serif">
                            — {currentProfile.sampleSender}
                          </div>
                          <div className="pt-1 text-center">
                            <button
                              type="button"
                              onClick={() => setActiveMidnightSealed(true)}
                              className="text-[11px] text-rose-300 hover:text-rose-100 underline underline-offset-2"
                            >
                              Reseal Envelope
                            </button>
                          </div>
                        </div>
                      )}

                      <div className="pt-2 border-t border-white/[0.08] flex items-center justify-between text-xs text-ivory-400">
                        <span>Starlight Atmosphere</span>
                        <span className={midnightThemeMeta.accentText}>{midnightThemeMeta.name}</span>
                      </div>
                    </div>
                  )}

                  {/* WORLD 3: KAGE LIVING ARTIFACT */}
                  {activeWorldId === "kage" && (
                    <div className="w-full flex items-center justify-center">
                      {activeKagePreview ? (
                        <div className="w-full h-[340px] rounded-2xl overflow-hidden border border-emerald-500/40 shadow-2xl relative">
                          <KageComponentLazy
                            mode="preview"
                            config={{
                              partnerName: "Aoi",
                              senderName: "Ren",
                              greeting: "Where stillness reveals the unseen",
                              message: "In the quiet shade of the sacred cedar, my thoughts find their home with you.",
                              signOff: "With all my heart",
                              accentTheme: "kyoto-crimson",
                              heroMediaId: null,
                              decor: {
                                paper: "handmade-cream",
                                ribbon: "silk-ivory",
                                waxSeal: "crimson-heart",
                                blooms: ["crimson-rose"],
                                charms: ["sparkle"],
                              },
                            }}
                          />
                          <button
                            onClick={() => setActiveKagePreview(false)}
                            className="absolute top-3 right-3 z-30 px-3 py-1 rounded-full bg-black/80 border border-white/20 text-[11px] text-white hover:bg-black transition-colors"
                          >
                            ✕ Close
                          </button>
                        </div>
                      ) : (
                        <div className="w-full max-w-sm rounded-2xl bg-[#081512]/90 border border-emerald-500/30 p-5 sm:p-7 text-center space-y-5 shadow-2xl backdrop-blur-md text-emerald-100">
                          <div className="space-y-1">
                            <span className="inline-block text-[10px] uppercase tracking-widest px-3 py-0.5 rounded-full border border-emerald-500/40 bg-emerald-950/60 text-emerald-300">
                              Kyoto Mountain Pathway
                            </span>
                            <h3 className="text-2xl font-serif font-medium text-white">Twilight Sanctuary</h3>
                          </div>

                          <div className="py-4 flex flex-col items-center justify-center">
                            <button
                              type="button"
                              onClick={() => setActiveKagePreview(true)}
                              className="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-emerald-900 via-teal-950 to-black border-2 border-emerald-400/50 flex items-center justify-center shadow-lg shadow-emerald-950/90 hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                              aria-label="Launch 3D WebGL preview"
                            >
                              <span className="text-3xl select-none">⛩️</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => setActiveKagePreview(true)}
                              className="mt-3 px-4 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-400/40 text-xs uppercase tracking-wider text-emerald-300 hover:text-white hover:bg-emerald-900 transition-colors font-medium cursor-pointer"
                            >
                              Launch 3D WebGL Preview
                            </button>
                          </div>

                          <div className="pt-2 border-t border-emerald-500/20 flex items-center justify-between text-xs text-emerald-300/70">
                            <span>Sacred Twilight Mist</span>
                            <span>Interactive Sanctuary</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* WORLD 4: APRICOT FILM LIVING ARTIFACT */}
                  {activeWorldId === "apricot-film" && (
                        <div className="w-full max-w-sm rounded-2xl bg-[#1A0E08]/90 border border-[#e76f51]/35 p-5 sm:p-7 text-center space-y-5 shadow-2xl backdrop-blur-md text-[#FFF8F0]">
                          <div className="space-y-1">
                            <span className="inline-block text-[10px] uppercase tracking-widest px-3 py-0.5 rounded-full border border-[#e76f51]/40 bg-[#28140B]/80 text-[#f4a261]">
                              16mm Analog Kodak
                            </span>
                            <h3 className="text-2xl font-serif font-medium text-white">Golden Hour Reel</h3>
                          </div>

                          {activeApricotRevealed ? (
                            <div className="py-3 px-4 rounded-xl bg-[#28140B]/90 border border-[#e76f51]/30 text-left space-y-2 animate-fade-in">
                              <p className="text-xs text-[#FFF8F0]/90 leading-relaxed font-light font-display italic">
                                {currentProfile.previewQuote}
                              </p>
                              <div className="text-right text-[11px] text-[#f4a261] font-serif">
                                — {currentProfile.sampleSender}
                              </div>
                              <div className="pt-1 text-center">
                                <button
                                  type="button"
                                  onClick={() => setActiveApricotRevealed(false)}
                                  className="text-[11px] text-[#f4a261] hover:underline"
                                >
                                  Rewind Film
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="py-4 flex flex-col items-center justify-center">
                              <button
                                type="button"
                                onClick={() => setActiveApricotRevealed(true)}
                                className="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#e76f51] via-[#d45d3e] to-[#28140B] border-2 border-[#f4a261]/60 flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                                aria-label="Advance film slide"
                              >
                                <svg className="w-8 h-8 text-[#FFF8F0]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                              </button>
                              <span className="mt-3 text-xs uppercase tracking-wider text-[#f4a261]/90 font-medium">
                                Tap slide to advance film frame
                              </span>
                            </div>
                          )}

                          <div className="pt-2 border-t border-[#e76f51]/20 flex items-center justify-between text-xs text-[#D4A373]">
                            <span>Tobacco Amber Grain</span>
                            <span>Golden Sunbeams</span>
                          </div>
                        </div>
                      )}

                      {/* WORLD 5: WILDFLOWER PAPER LIVING ARTIFACT */}
                      {activeWorldId === "wildflower-paper" && (
                        <div className="w-full max-w-sm rounded-2xl bg-[#131E17]/90 border border-[#a3b899]/35 p-5 sm:p-7 text-center space-y-5 shadow-2xl backdrop-blur-md text-[#F7F9F5]">
                          <div className="space-y-1">
                            <span className="inline-block text-[10px] uppercase tracking-widest px-3 py-0.5 rounded-full border border-[#a3b899]/40 bg-[#1A2A20]/80 text-[#a3b899]">
                              Artisan Cotton Press
                            </span>
                            <h3 className="text-2xl font-serif font-medium text-white">Pressed Botanical Note</h3>
                          </div>

                          {activeWildflowerRevealed ? (
                            <div className="py-3 px-4 rounded-xl bg-[#1A2A20]/90 border border-[#a3b899]/30 text-left space-y-2 animate-fade-in">
                              <p className="text-xs text-[#F7F9F5]/90 leading-relaxed font-light font-display italic">
                                {currentProfile.previewQuote}
                              </p>
                              <div className="text-right text-[11px] text-[#c084fc] font-serif">
                                — {currentProfile.sampleSender}
                              </div>
                              <div className="pt-1 text-center">
                                <button
                                  type="button"
                                  onClick={() => setActiveWildflowerRevealed(false)}
                                  className="text-[11px] text-[#a3b899] hover:underline"
                                >
                                  Retie Jute Twine
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="py-4 flex flex-col items-center justify-center">
                              <button
                                type="button"
                                onClick={() => setActiveWildflowerRevealed(true)}
                                className="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#2D4536] via-[#1B2B21] to-[#0E1611] border-2 border-[#a3b899]/60 flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                                aria-label="Untie botanical twine"
                              >
                                <svg className="w-8 h-8 text-[#c084fc]" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                                </svg>
                              </button>
                              <span className="mt-3 text-xs uppercase tracking-wider text-[#a3b899]/90 font-medium">
                                Tap to untie dried botanicals
                              </span>
                            </div>
                          )}

                          <div className="pt-2 border-t border-[#a3b899]/20 flex items-center justify-between text-xs text-[#a3b899]/80">
                            <span>Pressed Meadow Flora</span>
                            <span>Handmade Cotton Fiber</span>
                          </div>
                        </div>
                      )}

                      {/* WORLD 6: OCEAN LETTER LIVING ARTIFACT */}
                      {activeWorldId === "ocean-letter" && (
                        <div className="w-full max-w-sm rounded-2xl bg-[#071626]/90 border border-[#38bdf8]/35 p-5 sm:p-7 text-center space-y-5 shadow-2xl backdrop-blur-md text-[#F0F9FF]">
                          <div className="space-y-1">
                            <span className="inline-block text-[10px] uppercase tracking-widest px-3 py-0.5 rounded-full border border-[#38bdf8]/40 bg-[#0B233C]/80 text-[#7dd3fc]">
                              Frosted Sea Glass
                            </span>
                            <h3 className="text-2xl font-serif font-medium text-white">Tidal Bottle Message</h3>
                          </div>

                          {activeOceanRevealed ? (
                            <div className="py-3 px-4 rounded-xl bg-[#0B233C]/90 border border-[#38bdf8]/30 text-left space-y-2 animate-fade-in">
                              <p className="text-xs text-[#F0F9FF]/90 leading-relaxed font-light font-display italic">
                                {currentProfile.previewQuote}
                              </p>
                              <div className="text-right text-[11px] text-[#38bdf8] font-serif">
                                — {currentProfile.sampleSender}
                              </div>
                              <div className="pt-1 text-center">
                                <button
                                  type="button"
                                  onClick={() => setActiveOceanRevealed(false)}
                                  className="text-[11px] text-[#7dd3fc] hover:underline"
                                >
                                  Cork Bottle
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="py-4 flex flex-col items-center justify-center">
                              <button
                                type="button"
                                onClick={() => setActiveOceanRevealed(true)}
                                className="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#0c4a6e] via-[#0369a1] to-[#022c44] border-2 border-[#38bdf8]/60 flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                                aria-label="Uncork ocean bottle"
                              >
                                <svg className="w-8 h-8 text-[#7dd3fc]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                </svg>
                              </button>
                              <span className="mt-3 text-xs uppercase tracking-wider text-[#7dd3fc]/90 font-medium">
                                Tap to uncork floating bottle
                              </span>
                            </div>
                          )}

                          <div className="pt-2 border-t border-[#38bdf8]/20 flex items-center justify-between text-xs text-[#7dd3fc]/80">
                            <span>Deep Oceanic Mist</span>
                            <span>Tidal Parchment</span>
                          </div>
                        </div>
                      )}
                </div>

                {/* --------------------------------------------------------------- */}
                {/* SECTION C: Emotional Details & Action Controls (Mobile: Order 3)*/}
                {/* --------------------------------------------------------------- */}
                <div className="w-full lg:col-span-6 space-y-5 order-3">
                  {/* Emotional Profile (What this world is good for) */}
                  <div className="space-y-3 pt-2 border-t border-white/[0.08]">
                    <div className="text-xs space-y-1">
                      <span className="text-ivory-400 uppercase tracking-wider font-medium text-[11px] block">
                        Best For:
                      </span>
                      <p className="text-ivory-100 font-normal leading-relaxed">
                        {currentProfile.bestFor}
                      </p>
                    </div>

                    <div className="text-xs space-y-1">
                      <span className="text-ivory-400 uppercase tracking-wider font-medium text-[11px] block">
                        Signature:
                      </span>
                      <p className="text-rose-300 font-normal leading-relaxed">
                        {currentProfile.signature}
                      </p>
                    </div>

                    <div className="text-xs space-y-1 pt-0.5">
                      <span className="text-ivory-400 uppercase tracking-wider font-medium text-[11px] block">
                        Relationship Journey:
                      </span>
                      <p className="text-ivory-300/80 font-light text-[11px] leading-relaxed">
                        {currentProfile.experienceFlow}
                      </p>
                    </div>
                  </div>

                  {/* Atmosphere Swatches (Atmosphere Tone preview) */}
                  {currentProfile.swatches && (
                    <div className="space-y-2 pt-1 border-t border-white/[0.08]">
                      <span className="block text-xs uppercase tracking-wider text-ivory-400 font-medium">
                        Atmosphere Tone:{" "}
                        <strong className="text-white normal-case">
                          {activeWorldId === "midnight-rose"
                            ? midnightThemeMeta.name
                            : activeWorldId === "cloud-nine"
                            ? selectedCloudTheme
                            : activeWorldId === "kage"
                            ? selectedKageTheme
                            : activeWorldId === "apricot-film"
                            ? selectedApricotTheme
                            : activeWorldId === "wildflower-paper"
                            ? selectedWildflowerTheme
                            : selectedOceanTheme}
                        </strong>
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {currentProfile.swatches.map((swatch) => {
                          const isSelected =
                            activeWorldId === "midnight-rose"
                              ? selectedMidnightTheme === swatch.id
                              : activeWorldId === "cloud-nine"
                              ? selectedCloudTheme === swatch.id
                              : activeWorldId === "kage"
                              ? selectedKageTheme === swatch.id
                              : activeWorldId === "apricot-film"
                              ? selectedApricotTheme === swatch.id
                              : activeWorldId === "wildflower-paper"
                              ? selectedWildflowerTheme === swatch.id
                              : selectedOceanTheme === swatch.id;

                          return (
                            <button
                              key={swatch.id}
                              type="button"
                              onClick={() => {
                                if (activeWorldId === "midnight-rose") setSelectedMidnightTheme(swatch.id);
                                if (activeWorldId === "cloud-nine") setSelectedCloudTheme(swatch.id);
                                if (activeWorldId === "kage") setSelectedKageTheme(swatch.id);
                                if (activeWorldId === "apricot-film") setSelectedApricotTheme(swatch.id);
                                if (activeWorldId === "wildflower-paper") setSelectedWildflowerTheme(swatch.id);
                                if (activeWorldId === "ocean-letter") setSelectedOceanTheme(swatch.id);
                              }}
                              className={`px-3 py-1 rounded-xl text-xs font-medium border flex items-center gap-2 transition-all cursor-pointer ${
                                isSelected
                                  ? "border-white/40 bg-white/15 text-white shadow-sm"
                                  : "border-white/10 bg-white/5 text-ivory-400 hover:bg-white/10"
                              }`}
                            >
                              <span
                                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                                style={{ backgroundColor: swatch.color }}
                              />
                              <span>{swatch.buttonLabel}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Showroom Dual Actions */}
                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    {/* Primary: Enter World (Live Immersion Modal) */}
                    <Button
                      size="lg"
                      variant="primary"
                      onClick={() => setIsFullPreviewOpen(true)}
                      className="w-full sm:w-auto px-6 font-medium shadow-lg"
                      style={{
                        background:
                          activeWorldId === "cloud-nine"
                            ? "linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)"
                            : activeWorldId === "midnight-rose"
                            ? "linear-gradient(135deg, #be123c 0%, #881337 100%)"
                            : activeWorldId === "kage"
                            ? "linear-gradient(135deg, #059669 0%, #0d9488 100%)"
                            : activeWorldId === "apricot-film"
                            ? "linear-gradient(135deg, #e76f51 0%, #f4a261 100%)"
                            : activeWorldId === "wildflower-paper"
                            ? "linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)"
                            : "linear-gradient(135deg, #0284c7 0%, #0ea5e9 100%)",
                      }}
                    >
                      Enter {currentProfile.name}
                    </Button>

                    {/* Secondary: Customize this world (Deep-link to /create?template=...) */}
                    <CurtainLink href={`/create?template=${activeWorldId}`}>
                      <Button
                        size="lg"
                        variant="romantic"
                        className="w-full sm:w-auto px-6 font-medium border border-white/20"
                      >
                        Customize {currentProfile.name}
                      </Button>
                    </CurtainLink>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* ========================================================================= */}
      {/* 4. SECONDARY CURATED WORLDS (Complementary Worlds Discovery)              */}
      {/* ========================================================================= */}
      <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 pb-16 relative z-content space-y-6">
        <div className="border-b border-white/[0.08] pb-3 flex items-center justify-between">
          <h2 className="text-xs uppercase tracking-[0.2em] text-ivory-400 font-medium">
            Explore Other Worlds
          </h2>
          <span className="text-xs text-ivory-400">Available to craft today</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(
            [
              "cloud-nine",
              "midnight-rose",
              "kage",
              "apricot-film",
              "wildflower-paper",
              "ocean-letter",
            ] as WorldTheme[]
          )
            .filter((id) => id !== activeWorldId)
            .map((worldKey) => {
              const profile = WORLD_PROFILES[worldKey];

              return (
                <Card
                  key={worldKey}
                  variant="glass"
                  className="p-6 sm:p-7 space-y-4 transition-all duration-300 flex flex-col justify-between border-white/[0.08] hover:border-white/20 bg-white/[0.02]"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge variant="rose" size="sm" className="text-[10px] tracking-wider">
                        {profile.category}
                      </Badge>
                      <span className="text-[11px] text-ivory-400 font-sans">
                        Available Now
                      </span>
                    </div>

                    <h3 className="text-2xl font-serif font-medium text-white flex items-center gap-2">
                      <span>{profile.name}</span>
                      {profile.jpName && (
                        <span className="text-sm text-emerald-400/60 font-light">{profile.jpName}</span>
                      )}
                    </h3>

                    <p className="text-xs font-serif italic text-rose-200/80">
                      &ldquo;{profile.tagline}&rdquo;
                    </p>

                    <p className="text-xs text-ivory-300/80 leading-relaxed font-light">
                      {profile.bestFor}
                    </p>

                    <div className="pt-2 text-[11px] text-ivory-400 border-t border-white/[0.06]">
                      <span className="text-ivory-300 font-medium">Signature: </span>
                      <span>{profile.signature}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveWorldId(worldKey);
                        setActiveKagePreview(false);
                        document.getElementById("showroom-stage")?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="text-xs text-ivory-300 hover:text-white transition-colors underline underline-offset-4 cursor-pointer"
                    >
                      Preview in Stage
                    </button>

                    <CurtainLink href={`/create?template=${worldKey}`}>
                      <Button
                        size="sm"
                        variant="primary"
                        className="text-xs px-3.5 rounded-xl border border-white/20"
                        style={{
                          background:
                            worldKey === "cloud-nine"
                              ? "linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)"
                              : worldKey === "midnight-rose"
                              ? "linear-gradient(135deg, #be123c 0%, #881337 100%)"
                              : worldKey === "kage"
                              ? "linear-gradient(135deg, #059669 0%, #0d9488 100%)"
                              : worldKey === "apricot-film"
                              ? "linear-gradient(135deg, #e76f51 0%, #f4a261 100%)"
                              : worldKey === "wildflower-paper"
                              ? "linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)"
                              : "linear-gradient(135deg, #0284c7 0%, #0ea5e9 100%)",
                        }}
                      >
                        Customize {profile.name}
                      </Button>
                    </CurtainLink>
                  </div>
                </Card>
              );
            })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. FUTURE ROADMAP WORLDS (Truthful Studio Pipeline Showcase)              */}
      {/* ========================================================================= */}
      <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 pb-24 relative z-content space-y-6">
        <div className="border-b border-white/[0.08] pb-3 flex items-center justify-between">
          <h2 className="text-xs uppercase tracking-[0.2em] text-ivory-400 font-medium">
            In The Studio · Coming Soon
          </h2>
          <span className="text-xs text-ivory-400">Design pipeline</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ROADMAP_WORLDS.map((world: RoadmapWorld) => (
            <Card
              key={world.id}
              variant="glass"
              className="p-6 space-y-3.5 opacity-80 hover:opacity-100 transition-opacity border-white/[0.06] flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Badge variant="gold" size="sm">
                    Coming Soon
                  </Badge>
                  <span className="text-[11px] text-ivory-400">{world.category}</span>
                </div>
                <h3 className="text-xl font-serif font-medium text-white">{world.name}</h3>
                <p className="text-xs font-serif italic text-amber-200/80">
                  &ldquo;{world.tagline}&rdquo;
                </p>
                <p className="text-xs text-ivory-300/70 font-light leading-relaxed">
                  {world.atmosphere}
                </p>
              </div>

              <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs text-ivory-400">
                <span>{world.signature}</span>
                <span className="italic">In Design</span>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. IMMERSIVE FULL-STAGE MODAL ("Enter World" Experience)                  */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isFullPreviewOpen && (
          <div className="fixed inset-0 z-modal flex items-center justify-center p-4 sm:p-6 bg-black/95 backdrop-blur-3xl animate-fade-in">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className={`relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border ${currentProfile.surfaceBorder} bg-[#0A070E] p-6 sm:p-10 shadow-[0_0_100px_rgba(0,0,0,0.95)]`}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsFullPreviewOpen(false)}
                className="absolute top-5 right-5 z-20 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-xs text-white transition-colors cursor-pointer"
                aria-label="Close sanctuary"
              >
                ✕ Close Sanctuary
              </button>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Badge variant="rose" size="md">
                    Immersive Sanctuary Preview
                  </Badge>
                  <h2 className="text-3xl sm:text-4xl font-serif font-medium text-white">
                    {currentProfile.name}
                  </h2>
                  <p className="text-sm font-serif italic text-rose-200/90">
                    &ldquo;{currentProfile.tagline}&rdquo;
                  </p>
                </div>

                {/* World Stage Experience */}
                <div className="w-full min-h-[320px] rounded-2xl border border-white/10 p-6 flex flex-col items-center justify-center relative overflow-hidden bg-black/40">
                  <AtmosphericCanvas
                    theme={activeWorldId}
                    tier={tier}
                    isReducedMotion={Boolean(isReducedMotion || shouldReduceMotion)}
                    className="opacity-80"
                  />

                  <div className="relative z-10 text-center space-y-4 max-w-md">
                    <p className="text-sm sm:text-base font-serif italic text-white/90 leading-relaxed">
                      {currentProfile.previewQuote}
                    </p>
                    <p className="text-xs text-rose-300 font-sans uppercase tracking-widest">
                      {currentProfile.signature}
                    </p>
                  </div>
                </div>

                {/* Modal Bottom Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
                  <span className="text-xs text-ivory-400">
                    Ready to craft your story in this world?
                  </span>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setIsFullPreviewOpen(false)}
                      className="px-4 py-2 rounded-xl text-xs text-ivory-300 hover:text-white"
                    >
                      Return to Showroom
                    </button>
                    <CurtainLink href={`/create?template=${activeWorldId}`}>
                      <Button size="md" variant="romantic" className="px-6 font-medium shadow-lg">
                        Customize {currentProfile.name} Now →
                      </Button>
                    </CurtainLink>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* 7. Footer (Valentino Luxury Shell)                                        */}
      {/* ========================================================================= */}
      <footer className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-10 border-t border-white/[0.08] flex items-center justify-between text-xs text-ivory-400 relative z-content">
        <CurtainLink href="/" className="hover:text-white transition-colors">
          ← Back to Home
        </CurtainLink>
        <span>Valentino Interactive Experience Studio · 2026</span>
      </footer>
    </main>
  );
}
