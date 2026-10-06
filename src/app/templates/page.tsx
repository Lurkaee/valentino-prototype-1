"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ValentinoMonogram } from "@/components/motion/ValentinoMonogram";
import { ValentinePlasmaButton, type ValentinePlasmaTheme } from "@/components/ui/ValentinePlasmaButton";
import { AtmosphericButton } from "@/components/ui/AtmosphericButton";
import { ROADMAP_WORLDS, type RoadmapWorld } from "@/templates/registry";
import { AtmosphericCanvas } from "@/worlds/AtmosphericCanvas";
import { ValentinoAtmosphere } from "@/components/ui/ValentinoAtmosphere";
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
  portalAction: string;
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
  previewQuote: string;
  sampleSender: string;
  sampleRecipient: string;
  artifactIcon: string;
  artifactLabel: string;
  swatches?: { id: string; name: string; color: string; buttonLabel: string }[];
}

const WORLD_PROFILES: Record<WorldTheme, WorldProfile> = {
  "cloud-nine": {
    id: "cloud-nine",
    name: "Cloud Nine",
    portalAction: "Begin in Cloud Nine →",
    tagline: "For the person who makes everything lighter",
    category: "Luminous World",
    identity: "Dreamy Sunset Sky World",
    feeling: "Weightless, warm, soft, playful, intimate.",
    bestFor: "Dreamy, playful, affectionate stories that feel light as air.",
    signature: "Sunset clouds · floating petals · warm cream paper · luminous pearl",
    atmosphereTone: "Sunset Blush · Peach Horizon · Floating Motes · Cotton Haze",
    experienceFlow: "Welcome Cloud Envelope → Narrative Chapters → Floating Memories → Luminous Finale",
    accentColor: "#f472b6",
    glowColor: "rgba(244, 114, 182, 0.28)",
    previewQuote: "“Every moment with you feels like floating high above the clouds, gentle and weightless.”",
    sampleSender: "Forever in the Clouds",
    sampleRecipient: "Dearest Angel",
    artifactIcon: "☁️",
    artifactLabel: "Cloud Postcard",
    swatches: [
      { id: "blush-sky", name: "Blush Sky", color: "#f472b6", buttonLabel: "Blush" },
      { id: "sunset-coral", name: "Sunset Coral", color: "#fb7185", buttonLabel: "Coral" },
      { id: "lavender-dream", name: "Lavender Dream", color: "#c084fc", buttonLabel: "Lavender" },
    ],
  },
  "midnight-rose": {
    id: "midnight-rose",
    name: "Midnight Rose",
    portalAction: "Step into Midnight Rose →",
    tagline: "For the love that feels like midnight",
    category: "Flagship World",
    identity: "Private Midnight Garden",
    feeling: "Intimate, mysterious, elegant, candlelit.",
    bestFor: "Intimate, dramatic, deeply personal stories sealed after dark.",
    signature: "Physical envelope + interactive wax seal reveal · moonlit mist · candlelight",
    atmosphereTone: "Midnight Velvet · Crimson Rose · Gold Dust · Starlight Mist",
    experienceFlow: "Tactile Sealed Envelope → Relationship Milestones → Secret Keepsakes → Candlelit Vow",
    accentColor: "#e11d48",
    glowColor: "rgba(225, 29, 72, 0.32)",
    previewQuote: "“In a world of noise, you are my quiet starlight. Every single day with you feels like midnight poetry.”",
    sampleSender: "Yours Always",
    sampleRecipient: "Dearest Maya",
    artifactIcon: "💌",
    artifactLabel: "Wax Sealed Parcel",
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
    portalAction: "Enter Kage →",
    tagline: "For the love of quiet shadows and unspoken truths",
    category: "Spatial Sanctuary",
    identity: "Kyoto Digital Sanctuary",
    feeling: "Quiet, contemplative, spatial, mysterious.",
    bestFor: "Quiet, poetic, contemplative stories steeped in sacred stillness.",
    signature: "Kyoto mountain atmosphere · cedar & lantern glow · spatial sanctuary",
    atmosphereTone: "Sacred Emerald · Kyoto Teal · Stone Lanterns · Mountain Mist",
    experienceFlow: "Sacred Torii Gate → Reflective Verses → Sacred Memories → Twilight Constellation",
    accentColor: "#10b981",
    glowColor: "rgba(16, 185, 129, 0.28)",
    previewQuote: "“In the quiet shade of the sacred cedar, my thoughts find their home with you.”",
    sampleSender: "With all my heart",
    sampleRecipient: "Aoi",
    artifactIcon: "⛩️",
    artifactLabel: "Washi Ink Scroll",
    swatches: [
      { id: "kyoto-crimson", name: "Kyoto Crimson", color: "#e0231c", buttonLabel: "Crimson" },
      { id: "sanctuary-emerald", name: "Sanctuary Emerald", color: "#10b981", buttonLabel: "Emerald" },
      { id: "moonlit-stone", name: "Moonlit Stone", color: "#94a3b8", buttonLabel: "Stone" },
    ],
  },
  "apricot-film": {
    id: "apricot-film",
    name: "Apricot Film",
    portalAction: "Enter Apricot Film →",
    tagline: "For the memories that feel like warm analog cinema",
    category: "Analog Cinema",
    identity: "Warm 16mm Memory Reel",
    feeling: "Nostalgic, golden, cinematic, heartwarming.",
    bestFor: "Cherished photographic memories, golden hour reflections, and nostalgic romance.",
    signature: "Analog film slide + golden hour light leak · tobacco amber · 16mm grain",
    atmosphereTone: "Sunlit Apricot · Tobacco Amber · Golden Motes · Analog Grain",
    experienceFlow: "Analog Reel Arrival → Cinematic Memories → Sunlit Letter → Golden Hour Vow",
    accentColor: "#e76f51",
    glowColor: "rgba(231, 111, 81, 0.32)",
    previewQuote: "“Every frame with you is steeped in golden afternoon warmth that never fades.”",
    sampleSender: "Forever in Golden Hour",
    sampleRecipient: "Dearest Memory",
    artifactIcon: "🎞️",
    artifactLabel: "16mm Film Frame",
    swatches: [
      { id: "apricot-amber", name: "Apricot Amber", color: "#e76f51", buttonLabel: "Amber" },
      { id: "terracotta-sun", name: "Terracotta Sun", color: "#f4a261", buttonLabel: "Terracotta" },
      { id: "tobacco-espresso", name: "Tobacco Espresso", color: "#3d1f0e", buttonLabel: "Espresso" },
    ],
  },
  "wildflower-paper": {
    id: "wildflower-paper",
    name: "Wildflower Paper",
    portalAction: "Open Wildflower Paper →",
    tagline: "For a love cultivated slowly with honesty and grace",
    category: "Botanical Craft",
    identity: "Artisan Meadow Press",
    feeling: "Organic, gentle, handwritten, pastoral.",
    bestFor: "Handwritten letters, meadow memories, and honest botanical devotion.",
    signature: "Botanical twine unbind + pressed floral reveal · deckled cotton fibers · sage mist",
    atmosphereTone: "Pressed Sage · Dried Lilac · Cotton Fibers · Meadow Dew",
    experienceFlow: "Deckled Parcel Unfold → Botanical Chapters → Pressed Petal Keepsakes → Pastoral Promise",
    accentColor: "#c084fc",
    glowColor: "rgba(192, 132, 252, 0.28)",
    previewQuote: "“Our love is like pressed wildflowers inside an artisan journal — quiet, enduring, and honest.”",
    sampleSender: "Grown in Love",
    sampleRecipient: "Gentlest Blossom",
    artifactIcon: "🌿",
    artifactLabel: "Botanical Tag",
    swatches: [
      { id: "sage-botanical", name: "Pressed Sage", color: "#a3b899", buttonLabel: "Sage" },
      { id: "pressed-lilac", name: "Pressed Lilac", color: "#c084fc", buttonLabel: "Lilac" },
      { id: "meadow-coral", name: "Meadow Coral", color: "#fb7185", buttonLabel: "Coral" },
    ],
  },
  "ocean-letter": {
    id: "ocean-letter",
    name: "Ocean Letter",
    portalAction: "Enter Ocean Letter →",
    tagline: "For devotion as vast and steady as the tides",
    category: "Oceanic Tranquility",
    identity: "Sea Glass Coastal Sanctuary",
    feeling: "Vast, tranquil, profound, eternal.",
    bestFor: "Long-distance devotion, enduring promises, and tranquil oceanic depth.",
    signature: "Sea glass message in a bottle + tidal ripple · fog blue mist · tidal foam",
    atmosphereTone: "Oceanic Teal · Fog Blue · Sea Glass Foam · Tidal Mist",
    experienceFlow: "Sea Glass Uncork → Tidal Reflections → Ocean Milestones → Twilight Horizon Vow",
    accentColor: "#38bdf8",
    glowColor: "rgba(56, 189, 248, 0.32)",
    previewQuote: "“Our devotion is as vast, calm, and enduring as the twilight sea.”",
    sampleSender: "With Every Tide",
    sampleRecipient: "Steady Anchor",
    artifactIcon: "🌊",
    artifactLabel: "Sea Glass Parchment",
    swatches: [
      { id: "fog-blue", name: "Fog Blue", color: "#7dd3fc", buttonLabel: "Blue" },
      { id: "deep-teal", name: "Deep Teal", color: "#0e7490", buttonLabel: "Teal" },
      { id: "soft-coral", name: "Soft Coral", color: "#fb7185", buttonLabel: "Coral" },
    ],
  },
};

const ORDERED_WORLD_KEYS: WorldTheme[] = [
  "cloud-nine",
  "midnight-rose",
  "kage",
  "apricot-film",
  "wildflower-paper",
  "ocean-letter",
];

export default function TemplatesPage() {
  const { tier, isReducedMotion } = useDeviceTier();
  const shouldReduceMotion = useReducedMotion();

  const [activeWorldId, setActiveWorldId] = useState<WorldTheme>("midnight-rose");
  const [selectedMidnightTheme, setSelectedMidnightTheme] = useState<string>("crimson-rose");
  const [selectedCloudTheme, setSelectedCloudTheme] = useState<string>("blush-sky");
  const [selectedKageTheme, setSelectedKageTheme] = useState<string>("sanctuary-emerald");
  const [selectedApricotTheme, setSelectedApricotTheme] = useState<string>("apricot-amber");
  const [selectedWildflowerTheme, setSelectedWildflowerTheme] = useState<string>("sage-botanical");
  const [selectedOceanTheme, setSelectedOceanTheme] = useState<string>("fog-blue");

  // Interaction states for floating keepsake previews
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
          sealBorder: "border-purple-400",
          accentText: "text-purple-300",
        };
      case "champagne-gold":
        return {
          name: "Champagne Gold",
          sealBg: "bg-amber-700",
          sealBorder: "border-amber-400",
          accentText: "text-amber-300",
        };
      case "crimson-rose":
      default:
        return {
          name: "Crimson Velvet",
          sealBg: "bg-rose-700",
          sealBorder: "border-rose-400",
          accentText: "text-rose-300",
        };
    }
  }, [selectedMidnightTheme]);

  const currentPlasmaTheme: ValentinePlasmaTheme =
    activeWorldId === "midnight-rose"
      ? "midnightRose"
      : activeWorldId === "cloud-nine"
      ? "cloudNine"
      : activeWorldId === "apricot-film"
      ? "apricotFilm"
      : activeWorldId === "wildflower-paper"
      ? "wildflowerPaper"
      : activeWorldId === "ocean-letter"
      ? "oceanLetter"
      : "kage";

  const handleSurpriseMe = () => {
    const filtered = ORDERED_WORLD_KEYS.filter((id) => id !== activeWorldId);
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
    <main
      id="templates-page"
      className="relative min-h-[100dvh] flex flex-col items-center justify-start bg-transparent text-[#FAF8F5] overflow-x-hidden selection:bg-rose-500/25 font-ui"
    >
      {/* ========================================================================= */}
      {/* 0. DYNAMIC ENVIRONMENTAL ATMOSPHERE (Full-Bleed Responsive Universe)       */}
      {/* ========================================================================= */}
      <div className="fixed inset-0 pointer-events-none z-world-bg overflow-hidden">
        <ValentinoAtmosphere
          key={activeWorldId}
          context="world"
          world={activeWorldId}
          intensity="cinema"
          scrollReactive={true}
        />
      </div>

      {/* Midground atmospheric particles */}
      <div className="fixed inset-0 pointer-events-none z-atmosphere">
        <AtmosphericCanvas
          key={activeWorldId}
          theme={activeWorldId}
          tier={tier}
          isReducedMotion={Boolean(isReducedMotion || shouldReduceMotion)}
          className="opacity-60"
        />
      </div>

      {/* ========================================================================= */}
      {/* 1. MINIMAL EDITORIAL NAV (No Artificial Curtain Navigation)               */}
      {/* ========================================================================= */}
      <header className="w-full max-w-6xl mx-auto px-4 sm:px-8 py-5 flex items-center justify-between relative z-floating-ui">
        <Link href="/" className="flex items-center gap-2.5 group focus:outline-none">
          <ValentinoMonogram
            size={32}
            className="transition-transform group-hover:scale-105 duration-300 text-rose-100 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
          />
          <span className="text-lg sm:text-xl font-serif font-medium tracking-wide text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
            Valentino
          </span>
        </Link>

        <Link
          href={`/create?template=${activeWorldId}`}
          className="px-5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase text-white bg-gradient-to-r from-[#9F1239] via-[#881337] to-[#9F1239] border border-rose-300/40 shadow-[0_4px_16px_rgba(159,18,57,0.4)] hover:brightness-110 active:scale-95 transition-all"
        >
          Create Experience
        </Link>
      </header>

      {/* ========================================================================= */}
      {/* 2. SPATIAL SANCTUARY ARRIVAL & EDITORIAL OPENING                          */}
      {/* ========================================================================= */}
      <section
        id="showroom-stage"
        className="w-full max-w-6xl mx-auto px-4 sm:px-8 pt-4 pb-20 relative z-content flex flex-col items-center"
      >
        {/* Subtle Exhibition Eyebrow */}
        <div className="text-center space-y-3 max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/15 bg-white/[0.04] backdrop-blur-md shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
            <span className="text-[11px] uppercase tracking-[0.22em] text-rose-100 font-mono font-medium drop-shadow-sm">
              The Collection · Six Living Worlds
            </span>
            <span className="sr-only">The Collection · Visual Worlds</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-normal text-white tracking-tight leading-[1.15] drop-shadow-[0_2px_18px_rgba(0,0,0,0.6)]">
            Choose Your Atmosphere
          </h1>
          <p className="text-sm sm:text-base text-rose-100/90 font-light max-w-xl mx-auto leading-relaxed drop-shadow-[0_1px_8px_rgba(0,0,0,0.4)]">
            Every love story lives in its own climate. Step inside living worlds of mood, atmosphere, and intimate depth before you compose a single word.
          </p>

          {/* Centered Magical Artifact: Surprise Me */}
          <div className="pt-3 flex flex-col items-center justify-center">
            <ValentinePlasmaButton
              theme={currentPlasmaTheme}
              label="SURPRISE ME"
              sublabel="Spark a Match"
              size="md"
              onClick={handleSurpriseMe}
            />
            {surpriseMatch && (
              <p className="mt-2 text-xs font-mono text-rose-200 animate-fade-in bg-rose-950/60 border border-rose-400/30 px-3.5 py-1 rounded-full shadow-md">
                Matched with {WORLD_PROFILES[surpriseMatch as WorldTheme]?.name} ✨
              </p>
            )}
          </div>
        </div>

        {/* ======================================================================= */}
        {/* 3. TACTILE KEEPSAKE CONSTELLATION NAVIGATION (Zero SaaS Tabs)            */}
        {/* ======================================================================= */}
        <div className="w-full max-w-4xl mx-auto mb-12">
          <div className="text-center mb-3">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-rose-200/80 font-medium">
              World Showroom · Select a Living Atmosphere
            </span>
          </div>

          {/* Scattered Keepsake Tokens */}
          <div
            role="tablist"
            aria-label="Living Worlds Selection"
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 p-2 sm:p-3 rounded-3xl bg-black/20 border border-white/[0.08] backdrop-blur-md shadow-2xl"
          >
            {ORDERED_WORLD_KEYS.map((worldKey) => {
              const isActive = activeWorldId === worldKey;
              const profile = WORLD_PROFILES[worldKey];

              return (
                <button
                  key={worldKey}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`Select ${profile.name} atmosphere`}
                  onClick={() => {
                    setActiveWorldId(worldKey);
                    setActiveKagePreview(false);
                  }}
                  className={`group relative flex flex-col items-center justify-between p-3.5 rounded-2xl transition-all duration-300 cursor-pointer text-center focus:outline-none focus:ring-2 focus:ring-rose-400/50 ${
                    isActive
                      ? "bg-white/[0.14] border border-white/35 shadow-[0_8px_24px_-4px_rgba(0,0,0,0.5)] -translate-y-1 scale-[1.02]"
                      : "bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.08] hover:border-white/20 hover:-translate-y-0.5"
                  }`}
                >
                  {/* Subtle active glow halo */}
                  {isActive && (
                    <div
                      className="absolute inset-0 rounded-2xl blur-lg pointer-events-none opacity-40 transition-colors duration-500"
                      style={{ background: profile.accentColor }}
                    />
                  )}

                  <span className="text-2xl select-none mb-1 transition-transform group-hover:scale-110 duration-300">
                    {profile.artifactIcon}
                  </span>
                  <span
                    className={`text-xs font-serif font-medium tracking-wide transition-colors ${
                      isActive ? "text-white font-semibold" : "text-rose-100/80 group-hover:text-white"
                    }`}
                  >
                    {profile.name}
                  </span>
                  <span className="text-[9px] font-mono tracking-wider text-rose-200/60 uppercase mt-0.5">
                    {profile.artifactLabel}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ======================================================================= */}
        {/* 4. THE LIVING WORLD SANCTUARY (No Boxed SaaS Card)                       */}
        {/* ======================================================================= */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeWorldId}
            id={`template-${activeWorldId}`}
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full relative"
          >
            {/* Ambient Bloom beneath the world object */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full blur-[120px] pointer-events-none transition-colors duration-700 opacity-60"
              style={{ background: currentProfile.glowColor }}
            />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* ----------------------------------------------------------------- */}
              {/* COLUMN A: World Voice & Editorial Identity                        */}
              {/* ----------------------------------------------------------------- */}
              <div className="w-full lg:col-span-6 space-y-6 text-left">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-mono uppercase tracking-[0.2em] px-3 py-0.5 rounded-full bg-rose-950/60 border border-rose-400/30 text-rose-200">
                      {currentProfile.identity}
                    </span>
                    <span className="text-xs text-rose-200/70 font-sans tracking-wide">
                      {currentProfile.category}
                    </span>
                  </div>

                  <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-normal text-white tracking-tight flex items-baseline gap-3 drop-shadow-[0_2px_14px_rgba(0,0,0,0.6)]">
                    <span>{currentProfile.name}</span>
                    {currentProfile.jpName && (
                      <span className="text-2xl text-emerald-300/70 font-light font-serif">
                        {currentProfile.jpName}
                      </span>
                    )}
                  </h2>

                  <p className="text-base sm:text-lg font-serif italic text-rose-200/95 leading-relaxed drop-shadow-[0_1px_6px_rgba(0,0,0,0.5)]">
                    &ldquo;{currentProfile.tagline}&rdquo;
                  </p>

                  <p className="text-sm text-rose-100/90 font-light leading-relaxed drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)]">
                    {currentProfile.feeling}
                  </p>
                </div>

                {/* Poetic Essence Details */}
                <div className="space-y-3.5 pt-4 border-t border-white/10 text-xs text-rose-100/90">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-rose-300 block mb-0.5 font-semibold">
                      Best For:
                    </span>
                    <p className="text-sm font-normal text-white drop-shadow-sm leading-relaxed">
                      {currentProfile.bestFor}
                    </p>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-rose-300 block mb-0.5 font-semibold">
                      Signature:
                    </span>
                    <p className="text-xs font-normal text-rose-200 drop-shadow-sm leading-relaxed">
                      {currentProfile.signature}
                    </p>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-rose-300/80 block mb-0.5 font-semibold">
                      Relationship Journey:
                    </span>
                    <p className="text-xs font-light text-rose-100/80 leading-relaxed">
                      {currentProfile.experienceFlow}
                    </p>
                  </div>
                </div>

                {/* Atmosphere Tone Swatches */}
                {currentProfile.swatches && (
                  <div className="space-y-2 pt-3 border-t border-white/10">
                    <span className="block text-xs uppercase tracking-wider text-rose-200 font-medium font-mono">
                      Atmosphere Tone:{" "}
                      <strong className="text-white normal-case font-serif tracking-normal">
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
                            className={`px-3.5 py-1.5 rounded-full text-xs font-medium border flex items-center gap-2 transition-all cursor-pointer ${
                              isSelected
                                ? "border-white/50 bg-white/20 text-white shadow-sm"
                                : "border-white/10 bg-white/5 text-rose-200/80 hover:bg-white/10"
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

                {/* Primary & Secondary Action CTAs */}
                <div className="pt-4 flex flex-wrap items-center gap-4">
                  {/* Primary Portal Button: AtmosphericButton */}
                  <AtmosphericButton
                    href={`/create?template=${activeWorldId}`}
                    worldId={activeWorldId}
                    worldName={currentProfile.name}
                    label={currentProfile.portalAction}
                    className="shadow-xl"
                  />

                  {/* Secondary Immersion Button (Opens Full Preview Modal) */}
                  <button
                    type="button"
                    onClick={() => setIsFullPreviewOpen(true)}
                    className="px-5 py-2.5 rounded-full text-xs font-medium uppercase tracking-wider text-rose-100/90 hover:text-white bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md transition-all cursor-pointer shadow-sm hover:-translate-y-0.5 active:translate-y-0"
                  >
                    Enter {currentProfile.name}
                  </button>

                  {/* Deep-link Customization Anchor (Test Compatibility) */}
                  <Link
                    href={`/create?template=${activeWorldId}`}
                    className="text-xs font-medium text-rose-200 hover:text-white underline underline-offset-4 transition-colors"
                  >
                    Customize {currentProfile.name}
                  </Link>
                </div>
              </div>

              {/* ----------------------------------------------------------------- */}
              {/* COLUMN B: Floating Interactive Keepsake Artifact                  */}
              {/* ----------------------------------------------------------------- */}
              <div className="w-full lg:col-span-6 flex items-center justify-center py-6 sm:py-10">
                {/* ARTIFACT 1: CLOUD NINE FLOATING ENVELOPE */}
                {activeWorldId === "cloud-nine" && (
                  <div className="w-full max-w-sm rounded-3xl bg-[#FFF8F3]/95 border border-pink-900/15 p-6 sm:p-8 text-center space-y-6 shadow-[0_24px_60px_-12px_rgba(244,114,182,0.35)] text-pink-950 transition-all duration-500 backdrop-blur-md rotate-[-1deg] hover:rotate-0">
                    <div className="space-y-1">
                      <span className="inline-block text-[10px] font-mono uppercase tracking-widest px-3 py-0.5 rounded-full border border-pink-300 bg-pink-100/60 text-pink-900">
                        To My Sweetest Soul
                      </span>
                      <h3 className="text-2xl font-serif font-medium text-pink-950">Dearest Angel</h3>
                    </div>

                    {activeCloudNineSealed ? (
                      <div className="py-4 flex flex-col items-center justify-center">
                        <button
                          type="button"
                          onClick={() => setActiveCloudNineSealed(false)}
                          className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-200 via-rose-200 to-pink-300 border-2 border-pink-300 flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                          aria-label="Open cloud envelope"
                        >
                          <span className="text-4xl select-none">☁️</span>
                        </button>
                        <span className="mt-3 text-xs uppercase tracking-wider text-pink-800 font-medium font-mono">
                          Tap cloud to unfold letter
                        </span>
                      </div>
                    ) : (
                      <div className="py-4 px-5 rounded-2xl bg-pink-50 border border-pink-200 text-left space-y-2.5 animate-fade-in">
                        <p className="text-xs text-pink-950 leading-relaxed font-serif italic">
                          {currentProfile.previewQuote}
                        </p>
                        <div className="text-right text-[11px] text-pink-800 font-serif">
                          — {currentProfile.sampleSender}
                        </div>
                        <div className="pt-1 text-center">
                          <button
                            type="button"
                            onClick={() => setActiveCloudNineSealed(true)}
                            className="text-[11px] text-pink-700 hover:text-pink-950 underline underline-offset-2"
                          >
                            Fold Envelope
                          </button>
                        </div>
                      </div>
                    )}

                    <div className="pt-2 border-t border-pink-200/60 flex items-center justify-between text-xs text-pink-800/80 font-mono">
                      <span>Luminous Sky Atmosphere</span>
                      <span>Soft Cream Paper</span>
                    </div>
                  </div>
                )}

                {/* ARTIFACT 2: MIDNIGHT ROSE FLOATING WAX-SEALED ENVELOPE */}
                {activeWorldId === "midnight-rose" && (
                  <div className="w-full max-w-sm rounded-3xl bg-gradient-to-b from-[#250414]/95 via-[#18030D]/95 to-[#0A0105]/98 border border-rose-500/30 p-6 sm:p-8 text-center space-y-6 shadow-[0_24px_60px_-12px_rgba(225,29,72,0.45)] transition-all duration-500 backdrop-blur-xl rotate-[1deg] hover:rotate-0">
                    <div className="space-y-1">
                      <span className="inline-block text-[10px] font-mono uppercase tracking-widest px-3 py-0.5 rounded-full border border-rose-400/40 bg-rose-950/70 text-rose-200">
                        To My Favorite Person
                      </span>
                      <h3 className="text-2xl font-serif font-medium text-white drop-shadow-sm">Dearest Maya</h3>
                    </div>

                    {activeMidnightSealed ? (
                      <div className="py-4 flex flex-col items-center justify-center">
                        <button
                          type="button"
                          onClick={() => setActiveMidnightSealed(false)}
                          className={`w-20 h-20 rounded-full ${midnightThemeMeta.sealBg} border-2 ${midnightThemeMeta.sealBorder} flex items-center justify-center shadow-xl cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-300`}
                          aria-label="Break seal"
                        >
                          <span className="text-4xl select-none">💌</span>
                        </button>
                        <span className="mt-3 text-xs uppercase tracking-wider text-rose-200/90 font-medium font-mono">
                          Tap wax seal to break & unfold
                        </span>
                      </div>
                    ) : (
                      <div className="py-4 px-5 rounded-2xl bg-white/[0.06] border border-white/10 text-left space-y-2.5 animate-fade-in">
                        <p className="text-xs text-rose-100 leading-relaxed font-serif italic">
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

                    <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-rose-200/70 font-mono">
                      <span>Starlight Atmosphere</span>
                      <span className={midnightThemeMeta.accentText}>{midnightThemeMeta.name}</span>
                    </div>
                  </div>
                )}

                {/* ARTIFACT 3: KAGE SACRED SANCTUARY WASHI FRAGMENT */}
                {activeWorldId === "kage" && (
                  <div className="w-full flex items-center justify-center">
                    {activeKagePreview ? (
                      <div className="w-full h-[360px] rounded-3xl overflow-hidden border border-emerald-400/40 shadow-2xl relative">
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
                      <div className="w-full max-w-sm rounded-3xl bg-gradient-to-b from-[#091512]/95 via-[#050D0B]/95 to-[#020605]/98 border border-emerald-400/35 p-6 sm:p-8 text-center space-y-6 shadow-[0_24px_60px_-12px_rgba(16,185,129,0.35)] backdrop-blur-md text-emerald-100">
                        <div className="space-y-1">
                          <span className="inline-block text-[10px] font-mono uppercase tracking-widest px-3 py-0.5 rounded-full border border-emerald-400/40 bg-emerald-950/70 text-emerald-300">
                            Kyoto Mountain Pathway
                          </span>
                          <h3 className="text-2xl font-serif font-medium text-white">Twilight Sanctuary</h3>
                        </div>

                        <div className="py-4 flex flex-col items-center justify-center">
                          <button
                            type="button"
                            onClick={() => setActiveKagePreview(true)}
                            className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-900 via-teal-950 to-black border-2 border-emerald-400/50 flex items-center justify-center shadow-lg shadow-emerald-950/90 hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                            aria-label="Launch 3D WebGL preview"
                          >
                            <span className="text-4xl select-none">⛩️</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setActiveKagePreview(true)}
                            className="mt-3 px-4 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-400/40 text-xs uppercase tracking-wider text-emerald-300 hover:text-white hover:bg-emerald-900 transition-colors font-medium font-mono cursor-pointer"
                          >
                            Launch 3D WebGL Preview
                          </button>
                        </div>

                        <div className="pt-2 border-t border-emerald-500/20 flex items-center justify-between text-xs text-emerald-300/70 font-mono">
                          <span>Sacred Twilight Mist</span>
                          <span>Interactive Sanctuary</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* ARTIFACT 4: APRICOT FILM 16MM ANALOG SLIDE */}
                {activeWorldId === "apricot-film" && (
                  <div className="w-full max-w-sm rounded-3xl bg-gradient-to-b from-[#200F05]/95 via-[#150A03]/95 to-[#0A0501]/98 border border-amber-400/40 p-6 sm:p-8 text-center space-y-6 shadow-[0_24px_60px_-12px_rgba(245,158,11,0.35)] backdrop-blur-md text-[#FFF8F0] rotate-[-1deg] hover:rotate-0 transition-transform">
                    <div className="space-y-1">
                      <span className="inline-block text-[10px] font-mono uppercase tracking-widest px-3 py-0.5 rounded-full border border-amber-400/40 bg-amber-950/70 text-amber-300">
                        16mm Analog Kodak
                      </span>
                      <h3 className="text-2xl font-serif font-medium text-white">Golden Hour Reel</h3>
                    </div>

                    {activeApricotRevealed ? (
                      <div className="py-4 px-5 rounded-2xl bg-[#28140B]/90 border border-amber-500/30 text-left space-y-2.5 animate-fade-in">
                        <p className="text-xs text-[#FFF8F0]/90 leading-relaxed font-serif italic">
                          {currentProfile.previewQuote}
                        </p>
                        <div className="text-right text-[11px] text-amber-300 font-serif">
                          — {currentProfile.sampleSender}
                        </div>
                        <div className="pt-1 text-center">
                          <button
                            type="button"
                            onClick={() => setActiveApricotRevealed(false)}
                            className="text-[11px] text-amber-300 hover:underline"
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
                          className="w-20 h-20 rounded-full bg-gradient-to-br from-[#e76f51] via-[#d45d3e] to-[#28140B] border-2 border-amber-400/60 flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                          aria-label="Advance film slide"
                        >
                          <svg className="w-9 h-9 text-[#FFF8F0]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        </button>
                        <span className="mt-3 text-xs uppercase tracking-wider text-amber-200/90 font-medium font-mono">
                          Tap slide to advance film frame
                        </span>
                      </div>
                    )}

                    <div className="pt-2 border-t border-amber-500/20 flex items-center justify-between text-xs text-amber-300/80 font-mono">
                      <span>Tobacco Amber Grain</span>
                      <span>Golden Sunbeams</span>
                    </div>
                  </div>
                )}

                {/* ARTIFACT 5: WILDFLOWER PAPER BOTANICAL TAG */}
                {activeWorldId === "wildflower-paper" && (
                  <div className="w-full max-w-sm rounded-3xl bg-[#FAF6EE]/95 border border-amber-900/15 p-6 sm:p-8 text-center space-y-6 shadow-[0_24px_60px_-12px_rgba(180,120,50,0.3)] backdrop-blur-md text-[#1A0311] rotate-[1deg] hover:rotate-0 transition-transform">
                    <div className="space-y-1">
                      <span className="inline-block text-[10px] font-mono uppercase tracking-widest px-3 py-0.5 rounded-full border border-emerald-900/20 bg-emerald-100/60 text-emerald-900">
                        Artisan Cotton Press
                      </span>
                      <h3 className="text-2xl font-serif font-medium text-[#1A0311]">Pressed Botanical Note</h3>
                    </div>

                    {activeWildflowerRevealed ? (
                      <div className="py-4 px-5 rounded-2xl bg-white border border-amber-900/15 text-left space-y-2.5 animate-fade-in">
                        <p className="text-xs text-[#1A0311] leading-relaxed font-serif italic">
                          {currentProfile.previewQuote}
                        </p>
                        <div className="text-right text-[11px] text-amber-900 font-serif">
                          — {currentProfile.sampleSender}
                        </div>
                        <div className="pt-1 text-center">
                          <button
                            type="button"
                            onClick={() => setActiveWildflowerRevealed(false)}
                            className="text-[11px] text-amber-800 hover:underline"
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
                          className="w-20 h-20 rounded-full bg-gradient-to-br from-[#3D5A46] via-[#2A3E31] to-[#17221A] border-2 border-emerald-400/50 flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                          aria-label="Untie botanical twine"
                        >
                          <svg className="w-9 h-9 text-rose-200" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                          </svg>
                        </button>
                        <span className="mt-3 text-xs uppercase tracking-wider text-emerald-950 font-medium font-mono">
                          Tap to untie dried botanicals
                        </span>
                      </div>
                    )}

                    <div className="pt-2 border-t border-amber-900/10 flex items-center justify-between text-xs text-amber-950/70 font-mono">
                      <span>Pressed Meadow Flora</span>
                      <span>Handmade Cotton Fiber</span>
                    </div>
                  </div>
                )}

                {/* ARTIFACT 6: OCEAN LETTER FROSTED SEA GLASS BOTTLE */}
                {activeWorldId === "ocean-letter" && (
                  <div className="w-full max-w-sm rounded-3xl bg-gradient-to-b from-[#06182B]/95 via-[#03101E]/95 to-[#01070D]/98 border border-blue-400/40 p-6 sm:p-8 text-center space-y-6 shadow-[0_24px_60px_-12px_rgba(59,130,246,0.35)] backdrop-blur-md text-[#F0F9FF] rotate-[-1deg] hover:rotate-0 transition-transform">
                    <div className="space-y-1">
                      <span className="inline-block text-[10px] font-mono uppercase tracking-widest px-3 py-0.5 rounded-full border border-sky-400/40 bg-sky-950/70 text-sky-300">
                        Frosted Sea Glass
                      </span>
                      <h3 className="text-2xl font-serif font-medium text-white">Tidal Bottle Message</h3>
                    </div>

                    {activeOceanRevealed ? (
                      <div className="py-4 px-5 rounded-2xl bg-[#092238]/90 border border-sky-400/30 text-left space-y-2.5 animate-fade-in">
                        <p className="text-xs text-sky-100 leading-relaxed font-serif italic">
                          {currentProfile.previewQuote}
                        </p>
                        <div className="text-right text-[11px] text-sky-300 font-serif">
                          — {currentProfile.sampleSender}
                        </div>
                        <div className="pt-1 text-center">
                          <button
                            type="button"
                            onClick={() => setActiveOceanRevealed(false)}
                            className="text-[11px] text-sky-300 hover:underline"
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
                          className="w-20 h-20 rounded-full bg-gradient-to-br from-[#0c4a6e] via-[#0369a1] to-[#022c44] border-2 border-sky-400/60 flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                          aria-label="Uncork ocean bottle"
                        >
                          <svg className="w-9 h-9 text-sky-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                          </svg>
                        </button>
                        <span className="mt-3 text-xs uppercase tracking-wider text-sky-200/90 font-medium font-mono">
                          Tap to uncork floating bottle
                        </span>
                      </div>
                    )}

                    <div className="pt-2 border-t border-sky-400/20 flex items-center justify-between text-xs text-sky-300/80 font-mono">
                      <span>Deep Oceanic Mist</span>
                      <span>Tidal Parchment</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* ========================================================================= */}
      {/* 5. ORGANIC GALLERY: DISCOVER COMPLEMENTARY ATMOSPHERES                     */}
      {/* ========================================================================= */}
      <section className="w-full max-w-6xl mx-auto px-4 sm:px-8 pb-20 relative z-content space-y-8">
        <div className="border-b border-white/10 pb-4 flex items-center justify-between">
          <div>
            <h2 className="text-xs uppercase font-mono tracking-[0.25em] text-rose-200/80 font-medium">
              Explore All Atmospheres
            </h2>
            <p className="text-xs text-rose-100/60 font-sans mt-0.5">
              Available to craft today
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ORDERED_WORLD_KEYS.filter((id) => id !== activeWorldId).map((worldKey) => {
            const profile = WORLD_PROFILES[worldKey];

            return (
              <div
                key={worldKey}
                className="relative group p-6 sm:p-7 rounded-3xl bg-black/30 border border-white/10 backdrop-blur-md shadow-xl hover:border-white/25 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-rose-300 px-2.5 py-0.5 rounded-full bg-rose-950/60 border border-rose-400/20">
                      {profile.category}
                    </span>
                    <span className="text-xs select-none">{profile.artifactIcon}</span>
                  </div>

                  <h3 className="text-2xl font-serif font-medium text-white flex items-center gap-2">
                    <span>{profile.name}</span>
                    {profile.jpName && (
                      <span className="text-base text-emerald-300/70 font-light font-serif">
                        {profile.jpName}
                      </span>
                    )}
                  </h3>

                  <p className="text-xs font-serif italic text-rose-200/90">
                    &ldquo;{profile.tagline}&rdquo;
                  </p>

                  <p className="text-xs text-rose-100/80 leading-relaxed font-light">
                    {profile.bestFor}
                  </p>
                </div>

                <div className="pt-5 border-t border-white/10 flex items-center justify-between gap-3 mt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveWorldId(worldKey);
                      setActiveKagePreview(false);
                      document.getElementById("showroom-stage")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="text-xs font-medium text-rose-200 hover:text-white underline underline-offset-4 cursor-pointer transition-colors"
                  >
                    View Atmosphere
                  </button>

                  <Link
                    href={`/create?template=${worldKey}`}
                    className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-white bg-white/15 hover:bg-white/25 border border-white/20 transition-all"
                  >
                    Customize {profile.name}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. IN THE STUDIO · FUTURE ROADMAP WORLDS                                   */}
      {/* ========================================================================= */}
      <section className="w-full max-w-6xl mx-auto px-4 sm:px-8 pb-24 relative z-content space-y-6">
        <div className="border-b border-white/10 pb-4 flex items-center justify-between">
          <h2 className="text-xs uppercase font-mono tracking-[0.25em] text-rose-200/80 font-medium">
            In The Studio · Coming Soon
          </h2>
          <span className="text-xs text-rose-100/60 font-sans">Design Pipeline</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ROADMAP_WORLDS.map((world: RoadmapWorld) => (
            <div
              key={world.id}
              className="p-6 rounded-3xl bg-black/20 border border-white/[0.08] backdrop-blur-sm opacity-85 hover:opacity-100 transition-opacity flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-amber-300 px-2.5 py-0.5 rounded-full bg-amber-950/60 border border-amber-400/30">
                    Coming Soon
                  </span>
                  <span className="text-[11px] text-rose-200/70 font-mono">{world.category}</span>
                </div>

                <h3 className="text-2xl font-serif font-medium text-white">{world.name}</h3>
                <p className="text-xs font-serif italic text-amber-200/80">
                  &ldquo;{world.tagline}&rdquo;
                </p>
                <p className="text-xs text-rose-100/70 font-light leading-relaxed">
                  {world.atmosphere}
                </p>
              </div>

              <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs text-rose-200/60 font-mono">
                <span>{world.signature}</span>
                <span className="italic">In Design</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. IMMERSIVE FULL-STAGE SANCTUARY MODAL                                   */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isFullPreviewOpen && (
          <div className="fixed inset-0 z-modal flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-2xl animate-fade-in">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/20 bg-[#0A070E]/95 p-6 sm:p-10 shadow-[0_0_100px_rgba(0,0,0,0.95)]"
            >
              <button
                type="button"
                onClick={() => setIsFullPreviewOpen(false)}
                className="absolute top-5 right-5 z-20 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs text-white transition-colors cursor-pointer"
                aria-label="Close sanctuary"
              >
                ✕ Close Sanctuary
              </button>

              <div className="space-y-6">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-rose-300">
                    Immersive Sanctuary Preview
                  </span>
                  <h3 className="text-3xl sm:text-4xl font-serif font-medium text-white">
                    {currentProfile.name}
                  </h3>
                  <p className="text-sm font-serif italic text-rose-200">
                    &ldquo;{currentProfile.tagline}&rdquo;
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10 space-y-4">
                  <p className="text-sm text-rose-100 font-light leading-relaxed">
                    {currentProfile.previewQuote}
                  </p>
                  <p className="text-xs text-rose-300 font-mono text-right">
                    — {currentProfile.sampleSender}
                  </p>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                  <Link
                    href={`/create?template=${activeWorldId}`}
                    className="px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-rose-700 to-rose-900 border border-rose-400/40 shadow-lg hover:brightness-110 transition-all"
                  >
                    Start Creating in {currentProfile.name} →
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
