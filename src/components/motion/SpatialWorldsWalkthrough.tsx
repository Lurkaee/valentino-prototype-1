"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

import { AtmosphericButton } from "@/components/ui/AtmosphericButton";
import { AmbientBotanicalFrame, type BotanicalTone } from "@/components/motion/AmbientBotanicalFrame";

const WORLD_BOTANICAL_TONE: Record<string, BotanicalTone> = {
  "cloud-nine": "light",
  "midnight-rose": "dusk",
  "kage": "dark",
  "apricot-film": "warm",
  "wildflower-paper": "meadow",
  "ocean-letter": "ocean",
};

interface WorldWalkthroughItem {
  id: string;
  name: string;
  jpName?: string;
  tagline: string;
  glowGradient: string;
  accentColor: string;
  titleClass: string;
  taglineClass: string;
  badgeClass: string;
  buttonClass?: string;
  spatialOffsetClass: string;
  renderArtifact: () => React.ReactNode;
}

const WORLDS: WorldWalkthroughItem[] = [
  {
    id: "cloud-nine",
    name: "Cloud Nine",
    tagline: "For the person who makes everything lighter.",
    glowGradient: "from-amber-200/25 via-sky-300/20 to-transparent",
    accentColor: "#38bdf8",
    titleClass: "text-[#1A0311] drop-shadow-[0_1px_12px_rgba(255,250,240,0.6)]",
    taglineClass: "text-[#36091E] font-normal drop-shadow-[0_1px_6px_rgba(255,250,240,0.6)]",
    badgeClass: "text-[#0369A1] font-semibold tracking-widest drop-shadow-[0_1px_4px_rgba(255,255,255,0.7)]",
    spatialOffsetClass: "lg:items-end lg:pr-10",
    renderArtifact: () => (
      <div className="relative w-52 h-52 sm:w-60 sm:h-60 flex items-center justify-center">
        {/* Soft morning sun halo */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-200/35 via-sky-200/25 to-rose-100/20 blur-2xl" />

        {/* NARRATIVE CONTINUITY: The First Coffee ticket stub from stationery arrives here as a kept memory */}
        <div className="absolute -top-3 -left-4 sm:-top-5 sm:-left-8 z-20 pointer-events-none select-none transform rotate-[-8deg] opacity-90 drop-shadow-[0_8px_16px_rgba(3,105,161,0.18)]">
          <div className="w-24 sm:w-28 py-1.5 px-2 bg-[#FAF5EE]/95 rounded border border-sky-300/40 text-left">
            <span className="block text-[6.5px] font-mono tracking-widest text-[#0369A1] uppercase font-semibold">10.14 · MEMORY</span>
            <span className="font-serif italic text-[10px] text-[#1A0311] leading-none">First Coffee</span>
            <span className="block text-[6px] font-mono tracking-widest text-sky-800/70 mt-0.5">ADMIT ONE</span>
          </div>
        </div>

        {/* Translucent Vellum Cloud Letter */}
        <div className="relative w-38 h-46 sm:w-42 sm:h-50 rounded-2xl bg-[#FFFDF9]/95 backdrop-blur-md border border-sky-200/60 shadow-[0_24px_50px_-10px_rgba(186,215,248,0.4)] flex flex-col justify-between p-4 rotate-[3deg] hover:rotate-0 transition-transform duration-500">
          <div className="flex items-center justify-between text-[9px] font-mono text-[#0369A1] font-semibold tracking-wider">
            <span>DAWN FLIGHT</span>
            <span>NO. 09</span>
          </div>
          <div className="my-auto text-center space-y-1.5">
            <svg viewBox="0 0 24 16" fill="none" className="w-6 h-4 mx-auto text-sky-400 opacity-80" aria-hidden="true">
              <path d="M4 14 C 2 14, 0 12, 0 9.5 C 0 7.2, 1.8 5.5, 4 5.5 C 4.5 3, 6.8 1, 9.5 1 C 12.5 1, 14.8 3.2, 15 6 C 16.5 6, 18 7.2, 18 9 C 18 10.5, 17 12, 15.5 12.5 C 15 13.5, 14 14, 13 14 Z" fill="#E0F2FE" stroke="#38BDF8" strokeWidth="1" strokeLinecap="round" />
            </svg>
            <p className="text-xs font-serif italic text-[#0F172A] font-medium">
              “Every sunrise is lighter with you.”
            </p>
          </div>
          <div className="h-1 w-full bg-gradient-to-r from-amber-300 via-sky-300 to-rose-200 rounded-full opacity-80" />
        </div>
      </div>
    ),
  },
  {
    id: "midnight-rose",
    name: "Midnight Rose",
    tagline: "For the love that feels like midnight.",
    glowGradient: "from-amber-500/25 via-rose-950/45 to-transparent",
    accentColor: "#e11d48",
    titleClass: "text-[#FFFBF5] drop-shadow-[0_2px_16px_rgba(10,0,5,0.9)]",
    taglineClass: "text-[#FECDD3] drop-shadow-[0_1px_8px_rgba(10,0,5,0.85)]",
    badgeClass: "text-amber-300 font-semibold drop-shadow-[0_1px_6px_rgba(10,0,5,0.85)]",
    spatialOffsetClass: "lg:items-start lg:pl-10",
    renderArtifact: () => (
      <div className="relative w-52 h-52 sm:w-60 sm:h-60 flex items-center justify-center">
        {/* Candlelit warm glow */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-rose-800/40 via-amber-600/25 to-black/40 blur-2xl" />
        {/* Flickering candle point */}
        <div className="absolute top-2 right-6 w-2.5 h-2.5 rounded-full bg-amber-300 blur-[1px] shadow-[0_0_14px_rgba(245,158,11,0.95)] animate-pulse" />
        {/* Floating Crimson Velvet Dispatch with Organic Wax Stamp */}
        <div className="relative w-38 h-46 sm:w-42 sm:h-50 rounded-2xl bg-gradient-to-b from-[#240312] to-[#0D0107] border border-amber-600/30 shadow-[0_24px_60px_-10px_rgba(225,29,72,0.35)] flex flex-col justify-between p-4 rotate-[-3deg] hover:rotate-0 transition-transform duration-500">
          <div className="flex items-center justify-between text-[9px] font-mono text-amber-200/90 font-semibold tracking-wider">
            <span>CANDLELIT VELVET</span>
            <span>NO. 01</span>
          </div>
          <div className="my-auto text-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#9F1239] via-[#881337] to-[#4C0519] border border-amber-400/40 shadow-[0_4px_16px_rgba(159,18,57,0.5)] mx-auto flex items-center justify-center text-rose-100" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-rose-200 opacity-90">
                <path d="M12 4 C 14 4, 17 7, 16 10 C 15 13, 12 14, 12 16" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.7" />
                <path d="M12 7 C 9 8, 8 11, 10 13 C 11.5 14.5, 13 14, 14 15" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.6" />
                <circle cx="12" cy="9" r="4.5" stroke="currentColor" strokeWidth="1" strokeDasharray="1 2" strokeOpacity="0.8" />
                <circle cx="12" cy="9" r="1.5" fill="currentColor" fillOpacity="0.85" />
              </svg>
            </div>
            <p className="text-xs font-serif italic text-rose-100 font-medium">
              “Written by candlelight.”
            </p>
          </div>
          <div className="h-1 w-full bg-gradient-to-r from-rose-600 via-amber-500 to-rose-700 rounded-full opacity-70" />
        </div>
      </div>
    ),
  },
  {
    id: "kage",
    name: "Kage",
    jpName: "影",
    tagline: "For the love of quiet shadows and unspoken truths.",
    glowGradient: "from-amber-600/18 via-emerald-950/25 to-stone-950/30",
    accentColor: "#10b981",
    titleClass: "text-[#F0FDF4] drop-shadow-[0_2px_16px_rgba(2,15,10,0.95)]",
    taglineClass: "text-[#A7F3D0] drop-shadow-[0_1px_8px_rgba(2,15,10,0.9)]",
    badgeClass: "text-emerald-300 font-semibold drop-shadow-[0_1px_6px_rgba(2,15,10,0.9)]",
    spatialOffsetClass: "lg:items-center",
    renderArtifact: () => (
      <div className="relative w-52 h-52 sm:w-60 sm:h-60 flex items-center justify-center">
        {/* Kyoto Temple Mist Aura */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-600/15 via-emerald-900/20 to-stone-900/35 blur-2xl" />
        {/* Floating Washi Scroll Fragment */}
        <div className="relative w-38 h-46 sm:w-42 sm:h-50 rounded-2xl bg-[#08120E] border border-stone-600/35 shadow-[0_24px_60px_-10px_rgba(16,185,129,0.22)] flex flex-col justify-between p-4 rotate-[-1deg] hover:rotate-0 transition-transform duration-500">
          <div className="flex items-center justify-between text-[9px] font-mono text-emerald-300/80 font-semibold tracking-wider">
            <span>KYOTO SANCTUARY</span>
            <span>影 · 03</span>
          </div>
          <div className="my-auto text-center space-y-1">
            <span className="text-3xl font-serif text-emerald-100/90 font-light tracking-wide">静寂</span>
            <p className="text-[11px] font-serif italic text-emerald-200/80 font-medium">
              “Some words live in the shadows.”
            </p>
          </div>
          <div className="h-1 w-full bg-gradient-to-r from-emerald-600 via-amber-600/60 to-stone-600 rounded-full opacity-60" />
        </div>
      </div>
    ),
  },
  {
    id: "apricot-film",
    name: "Apricot Film",
    tagline: "For memories that feel like a sun-drenched afternoon.",
    glowGradient: "from-amber-500/35 via-orange-950/25 to-transparent",
    accentColor: "#f59e0b",
    titleClass: "text-[#FFFBEB] drop-shadow-[0_2px_16px_rgba(30,12,2,0.9)]",
    taglineClass: "text-[#FDE68A] drop-shadow-[0_1px_8px_rgba(30,12,2,0.85)]",
    badgeClass: "text-amber-200 font-semibold drop-shadow-[0_1px_6px_rgba(30,12,2,0.85)]",
    spatialOffsetClass: "lg:items-end lg:pr-12",
    renderArtifact: () => (
      <div className="relative w-52 h-52 sm:w-60 sm:h-60 flex items-center justify-center">
        {/* Golden Hour Light Flare */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-500/35 via-orange-600/20 to-rose-400/20 blur-2xl" />
        {/* Floating Archival 16mm Photo Slide with sprocket holes */}
        <div className="relative w-40 h-46 sm:w-44 sm:h-50 rounded-2xl bg-[#1C0F06] border border-amber-500/30 shadow-[0_24px_60px_-10px_rgba(245,158,11,0.3)] flex flex-col justify-between p-3.5 rotate-[4deg] hover:rotate-0 transition-transform duration-500">
          <div className="flex items-center justify-between text-[9px] font-mono text-amber-300 font-semibold tracking-wider">
            <span>KODAK 16MM</span>
            <span>FRAME 24</span>
          </div>
          <div className="my-auto p-3 rounded-lg bg-black/45 border border-amber-500/25 text-center relative overflow-hidden">
            {/* Film sprockets hint */}
            <div className="absolute left-1 top-2 bottom-2 flex flex-col justify-between">
              <div className="w-1.5 h-2 bg-amber-950/80 rounded-sm" />
              <div className="w-1.5 h-2 bg-amber-950/80 rounded-sm" />
              <div className="w-1.5 h-2 bg-amber-950/80 rounded-sm" />
            </div>
            <div className="absolute right-1 top-2 bottom-2 flex flex-col justify-between">
              <div className="w-1.5 h-2 bg-amber-950/80 rounded-sm" />
              <div className="w-1.5 h-2 bg-amber-950/80 rounded-sm" />
              <div className="w-1.5 h-2 bg-amber-950/80 rounded-sm" />
            </div>
            <svg viewBox="0 0 24 18" fill="none" className="w-6 h-4 mx-auto text-amber-300 opacity-80" aria-hidden="true">
              <rect x="2" y="1" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.2" />
              <rect x="8.5" y="4" width="7" height="10" rx="1" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="0.8" />
            </svg>
            <p className="text-[11px] font-serif italic text-amber-100 mt-1 font-medium">
              “Sunlight caught in your hair.”
            </p>
          </div>
          <div className="h-1 w-full bg-gradient-to-r from-amber-400 to-orange-400 rounded-full opacity-70" />
        </div>
      </div>
    ),
  },
  {
    id: "wildflower-paper",
    name: "Wildflower Paper",
    tagline: "For the love built by hand, petal by petal.",
    glowGradient: "from-amber-300/20 via-stone-400/15 to-purple-950/15",
    accentColor: "#eab308",
    titleClass: "text-[#1A0311] drop-shadow-[0_1px_12px_rgba(255,248,240,0.6)]",
    taglineClass: "text-[#361A09] font-normal drop-shadow-[0_1px_6px_rgba(255,248,240,0.6)]",
    badgeClass: "text-[#78350F] font-semibold tracking-widest drop-shadow-[0_1px_4px_rgba(255,248,240,0.5)]",
    spatialOffsetClass: "lg:items-start lg:pl-12",
    renderArtifact: () => (
      <div className="relative w-52 h-52 sm:w-60 sm:h-60 flex items-center justify-center">
        {/* Meadow herb warmth */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-200/25 via-stone-300/15 to-emerald-200/15 blur-2xl" />
        {/* Floating Cotton Deckled Herbarium Page */}
        <div className="relative w-38 h-46 sm:w-42 sm:h-50 rounded-2xl bg-[#FAF6EE]/98 border border-stone-300/70 shadow-[0_20px_50px_-10px_rgba(180,120,50,0.2)] flex flex-col justify-between p-4 rotate-[-2.5deg] hover:rotate-0 transition-transform duration-500 text-stone-800">
          <div className="flex items-center justify-between text-[9px] font-mono text-stone-700 font-semibold tracking-wider">
            <span>DECKLED COTTON</span>
            <span>PETAL NO. 05</span>
          </div>
          <div className="my-auto text-center space-y-1">
            <svg viewBox="0 0 16 22" fill="none" className="w-4 h-5 mx-auto text-amber-800 opacity-80" aria-hidden="true">
              <path d="M8 21 C 8 15, 9 9, 8 1" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
              <path d="M8 15 C 4 13, 3 9, 7 8 C 8 10, 8 13, 8 15 Z" fill="#D97706" fillOpacity="0.4" stroke="currentColor" strokeWidth="0.75" />
              <path d="M8 10 C 12 8, 13 4, 9 3 C 8 5, 8 8, 8 10 Z" fill="#A855F7" fillOpacity="0.3" stroke="currentColor" strokeWidth="0.75" />
            </svg>
            <p className="text-xs font-serif italic text-stone-900 font-medium">
              “Pressed by hand, kept forever.”
            </p>
          </div>
          <div className="h-1 w-full bg-gradient-to-r from-amber-400 via-yellow-300 to-rose-300 rounded-full opacity-60" />
        </div>
      </div>
    ),
  },
  {
    id: "ocean-letter",
    name: "Ocean Letter",
    tagline: "For words meant to cross any distance.",
    glowGradient: "from-sky-500/22 via-slate-900/30 to-transparent",
    accentColor: "#38bdf8",
    titleClass: "text-[#F0F9FF] drop-shadow-[0_2px_18px_rgba(2,10,25,0.95)]",
    taglineClass: "text-[#BAE6FD] drop-shadow-[0_1px_8px_rgba(2,10,25,0.9)]",
    badgeClass: "text-sky-200 font-semibold drop-shadow-[0_1px_6px_rgba(2,10,25,0.9)]",
    spatialOffsetClass: "lg:items-center",
    renderArtifact: () => (
      <div className="relative w-52 h-52 sm:w-60 sm:h-60 flex items-center justify-center">
        {/* Ocean Starlight Phosphorescence */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-sky-600/30 via-cyan-800/25 to-indigo-950/35 blur-2xl" />
        {/* Floating Sea Glass Vessel Talisman */}
        <div className="relative w-38 h-46 sm:w-42 sm:h-50 rounded-2xl bg-[#06121E] border border-sky-400/30 shadow-[0_24px_60px_-10px_rgba(59,130,246,0.3)] flex flex-col justify-between p-4 rotate-[1.5deg] hover:rotate-0 transition-transform duration-500">
          <div className="flex items-center justify-between text-[9px] font-mono text-sky-200 font-semibold tracking-wider">
            <span>MIDNIGHT TIDE</span>
            <span>VESSEL NO. 06</span>
          </div>
          <div className="my-auto text-center space-y-1">
            <svg viewBox="0 0 24 14" fill="none" className="w-6 h-3.5 mx-auto text-sky-300 opacity-80" aria-hidden="true">
              <path d="M1 8 C 4 5, 8 5, 11 8 C 14 11, 18 11, 23 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              <path d="M2 12 C 5 10, 8 10, 11 12 C 14 14, 18 14, 22 12" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.6" strokeLinecap="round" />
            </svg>
            <p className="text-xs font-serif italic text-sky-100 font-medium">
              “Across every shore, to you.”
            </p>
          </div>
          <div className="h-1 w-full bg-gradient-to-r from-sky-400 to-cyan-300 rounded-full opacity-70" />
        </div>
      </div>
    ),
  },
];

/**
 * SpatialWorldsWalkthrough (Phase 6.4):
 * Full-viewport living room vistas.
 * No tabs. No capability chips. No palette swatches. No cards.
 * Scrolling gracefully takes the user through each world's unique light,
 * dimensional artifact, and poetic invitation.
 */
export function SpatialWorldsWalkthrough() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Reveal each world gently as it enters the viewport and keep stable once visible
      const worldSections = gsap.utils.toArray<HTMLElement>(".world-vista-scene");
      worldSections.forEach((section) => {
        gsap.fromTo(
          section.querySelectorAll(".world-vista-reveal"),
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power2.out",
            stagger: 0.12,
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              once: true,
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-transparent text-[#FAF8F5] overflow-hidden"
    >
      {/* Walkthrough Atmospheric Header (High-contrast environment-aware typography on pale cloud atmosphere) */}
      <div className="max-w-4xl mx-auto text-center px-6 pt-20 pb-12 sm:pt-28 sm:pb-16 space-y-3 relative z-10">
        <span className="inline-block text-[11px] font-mono tracking-widest uppercase text-[#7A1D45] font-semibold drop-shadow-[0_1px_4px_rgba(255,245,248,0.6)]">
          The World Collection
        </span>
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-normal text-[#1A0311] tracking-tight leading-tight drop-shadow-[0_1px_12px_rgba(255,245,248,0.5)]">
          Step into their atmosphere.
        </h2>
        <p className="text-sm sm:text-base text-[#36091E] max-w-lg mx-auto font-normal leading-relaxed drop-shadow-[0_1px_6px_rgba(255,245,248,0.6)]">
          Six distinct digital sanctuaries — each with its own light, memory, and emotional signature.
        </p>
      </div>

      {/* Sequential Full-Viewport Living Environments */}
      <div className="flex flex-col w-full relative z-10">
        {WORLDS.map((world, idx) => (
          <div
            key={world.id}
            className="world-vista-scene relative w-full min-h-[85vh] sm:min-h-[92vh] flex flex-col items-center justify-center px-6 py-16 text-center overflow-hidden"
          >
            {/* World-Aware Peripheral Botanical Edge Atmosphere */}
            <AmbientBotanicalFrame
              variant={WORLD_BOTANICAL_TONE[world.id] || "dusk"}
              density="subtle"
              intensity={0.75}
            />

            {/* Dynamic ambient bloom for this world */}
            <div
              className={`absolute w-[450px] sm:w-[650px] h-[350px] sm:h-[450px] rounded-full bg-gradient-to-tr ${world.glowGradient} blur-3xl pointer-events-none -z-10`}
            />

            <div className={`w-full max-w-xl mx-auto flex flex-col items-center ${world.spatialOffsetClass || ""} space-y-6`}>
              {/* World Index Indicator */}
              <div className={`world-vista-reveal text-[10px] font-mono tracking-widest uppercase ${world.badgeClass}`}>
                <span>0{idx + 1} OF 06</span>
                <span className="mx-2">·</span>
                <span>SANCTUARY VISTA</span>
              </div>

              {/* Dimensional Floating Artifact */}
              <div className="world-vista-reveal will-change-transform my-2">
                {world.renderArtifact()}
              </div>

              {/* Editorial World Title & Tagline with subtle ambient text protection */}
              <div className="world-vista-reveal space-y-2 relative">
                <h3 className={`text-3xl sm:text-4xl lg:text-5xl font-serif font-normal tracking-tight ${world.titleClass}`}>
                  {world.name} {world.jpName && <span className="text-2xl sm:text-3xl opacity-85 font-serif font-light">({world.jpName})</span>}
                </h3>
                <p className={`text-base sm:text-lg font-serif italic font-normal max-w-md mx-auto ${world.taglineClass}`}>
                  “{world.tagline}”
                </p>
              </div>

              {/* Direct Poetic Invitation Link (Tactile Atmospheric Portal) */}
              <div className="world-vista-reveal pt-2">
                <AtmosphericButton
                  href={`/create?template=${world.id}`}
                  worldId={world.id}
                  worldName={world.name}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Understated Showroom Full Catalog Link */}
      <div className="text-center py-16 px-6 relative z-10">
        <Link
          href="/templates"
          className="group inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full text-xs sm:text-sm font-mono uppercase tracking-widest bg-rose-950/40 hover:bg-rose-900/60 border border-rose-400/40 text-rose-100 hover:text-white font-medium shadow-[0_4px_16px_rgba(0,0,0,0.4)] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5"
        >
          <span>Explore all six atmospheres with interactive plasma spark</span>
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">
            →
          </span>
        </Link>
      </div>
    </div>
  );
}
