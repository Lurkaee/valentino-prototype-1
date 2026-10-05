"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface WorldWalkthroughItem {
  id: string;
  name: string;
  jpName?: string;
  tagline: string;
  glowGradient: string;
  accentColor: string;
  renderArtifact: () => React.ReactNode;
}

const WORLDS: WorldWalkthroughItem[] = [
  {
    id: "cloud-nine",
    name: "Cloud Nine",
    tagline: "For the person who makes everything lighter.",
    glowGradient: "from-pink-400/25 via-purple-900/20 to-transparent",
    accentColor: "#f472b6",
    renderArtifact: () => (
      <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center">
        {/* Soft morning cloud halo */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-pink-300/30 via-rose-200/20 to-amber-100/20 blur-2xl" />
        {/* Floating Folded Vellum Love Letter */}
        <div className="relative w-36 h-44 sm:w-40 sm:h-48 rounded-2xl bg-[#FFFDF9]/95 backdrop-blur-md border border-pink-200/40 shadow-[0_20px_50px_-10px_rgba(244,114,182,0.3)] flex flex-col justify-between p-4 rotate-[-3deg] hover:rotate-0 transition-transform duration-500">
          <div className="flex items-center justify-between text-[9px] font-mono text-pink-400 tracking-wider">
            <span>DAWN FLIGHT</span>
            <span>NO. 09</span>
          </div>
          <div className="my-auto text-center space-y-1">
            <span className="text-xl">☁️</span>
            <p className="text-xs font-serif italic text-purple-950/80">
              “Every sunrise is lighter with you.”
            </p>
          </div>
          <div className="h-1 w-full bg-gradient-to-r from-pink-300 to-purple-300 rounded-full opacity-60" />
        </div>
      </div>
    ),
  },
  {
    id: "midnight-rose",
    name: "Midnight Rose",
    tagline: "For the love that feels like midnight.",
    glowGradient: "from-rose-600/30 via-rose-950/35 to-transparent",
    accentColor: "#e11d48",
    renderArtifact: () => (
      <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center">
        {/* Candlelit crimson ambient aura */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-rose-700/40 via-red-900/30 to-amber-600/20 blur-2xl" />
        {/* Floating Crimson Velvet Dispatch with Wax Seal */}
        <div className="relative w-36 h-44 sm:w-40 sm:h-48 rounded-2xl bg-gradient-to-b from-[#2A0516] to-[#14020A] border border-rose-500/30 shadow-[0_24px_60px_-10px_rgba(225,29,72,0.4)] flex flex-col justify-between p-4 rotate-[2deg] hover:rotate-0 transition-transform duration-500">
          <div className="flex items-center justify-between text-[9px] font-mono text-rose-300 tracking-wider">
            <span>CANDLELIT VELVET</span>
            <span>NO. 01</span>
          </div>
          <div className="my-auto text-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#E11D48] via-[#BE123C] to-[#881337] border border-amber-200/80 shadow-[0_4px_16px_rgba(225,29,72,0.5)] mx-auto flex items-center justify-center text-white">
              <span className="font-serif text-sm font-bold text-amber-100">V</span>
            </div>
            <p className="text-xs font-serif italic text-rose-200/90">
              “Written by candlelight.”
            </p>
          </div>
          <div className="h-1 w-full bg-gradient-to-r from-rose-600 to-amber-500 rounded-full opacity-60" />
        </div>
      </div>
    ),
  },
  {
    id: "kage",
    name: "Kage",
    jpName: "影",
    tagline: "For the love of quiet shadows and unspoken truths.",
    glowGradient: "from-emerald-700/25 via-teal-950/30 to-transparent",
    accentColor: "#10b981",
    renderArtifact: () => (
      <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center">
        {/* Kyoto Temple Mist Aura */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-emerald-800/30 via-teal-900/25 to-stone-900/30 blur-2xl" />
        {/* Floating Washi Scroll Fragment */}
        <div className="relative w-36 h-44 sm:w-40 sm:h-48 rounded-2xl bg-[#091512] border border-emerald-500/25 shadow-[0_24px_60px_-10px_rgba(16,185,129,0.25)] flex flex-col justify-between p-4 rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
          <div className="flex items-center justify-between text-[9px] font-mono text-emerald-400/80 tracking-wider">
            <span>KYOTO SANCTUARY</span>
            <span>影 · 03</span>
          </div>
          <div className="my-auto text-center space-y-1">
            <span className="text-2xl font-serif text-emerald-200/90">静寂</span>
            <p className="text-[11px] font-serif italic text-emerald-300/80">
              “Some words live in the shadows.”
            </p>
          </div>
          <div className="h-1 w-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full opacity-50" />
        </div>
      </div>
    ),
  },
  {
    id: "apricot-film",
    name: "Apricot Film",
    tagline: "For memories that feel like a sun-drenched afternoon.",
    glowGradient: "from-amber-600/30 via-orange-950/25 to-transparent",
    accentColor: "#f59e0b",
    renderArtifact: () => (
      <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center">
        {/* Golden Hour Light Flare */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-500/35 via-orange-600/20 to-rose-400/20 blur-2xl" />
        {/* Floating Archival 16mm Photo Slide */}
        <div className="relative w-38 h-44 sm:w-42 sm:h-48 rounded-2xl bg-[#1C0F06] border border-amber-500/30 shadow-[0_24px_60px_-10px_rgba(245,158,11,0.3)] flex flex-col justify-between p-3.5 rotate-[3deg] hover:rotate-0 transition-transform duration-500">
          <div className="flex items-center justify-between text-[9px] font-mono text-amber-400/80 tracking-wider">
            <span>KODAK 16MM</span>
            <span>FRAME 24</span>
          </div>
          <div className="my-auto p-3 rounded-lg bg-black/40 border border-amber-500/20 text-center">
            <span className="text-xl">🎞️</span>
            <p className="text-[11px] font-serif italic text-amber-200/90 mt-1">
              “Sunlight caught in your hair.”
            </p>
          </div>
          <div className="h-1 w-full bg-gradient-to-r from-amber-400 to-orange-400 rounded-full opacity-60" />
        </div>
      </div>
    ),
  },
  {
    id: "wildflower-paper",
    name: "Wildflower Paper",
    tagline: "For the love built by hand, petal by petal.",
    glowGradient: "from-yellow-600/20 via-rose-950/20 to-transparent",
    accentColor: "#eab308",
    renderArtifact: () => (
      <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center">
        {/* Meadow herb warmth */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-300/25 via-stone-400/15 to-emerald-200/15 blur-2xl" />
        {/* Floating Cotton Deckled Envelope */}
        <div className="relative w-36 h-44 sm:w-40 sm:h-48 rounded-2xl bg-[#FAF6EE]/95 border border-stone-300/60 shadow-[0_20px_50px_-10px_rgba(180,120,50,0.2)] flex flex-col justify-between p-4 rotate-[-2.5deg] hover:rotate-0 transition-transform duration-500 text-stone-800">
          <div className="flex items-center justify-between text-[9px] font-mono text-stone-500 tracking-wider">
            <span>DECKLED COTTON</span>
            <span>PETAL NO. 05</span>
          </div>
          <div className="my-auto text-center space-y-1">
            <span className="text-xl">🌿</span>
            <p className="text-xs font-serif italic text-stone-700">
              “Pressed by hand, kept forever.”
            </p>
          </div>
          <div className="h-1 w-full bg-gradient-to-r from-amber-300 to-rose-300 rounded-full opacity-50" />
        </div>
      </div>
    ),
  },
  {
    id: "ocean-letter",
    name: "Ocean Letter",
    tagline: "For words meant to cross any distance.",
    glowGradient: "from-blue-600/25 via-cyan-950/30 to-transparent",
    accentColor: "#3b82f6",
    renderArtifact: () => (
      <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center">
        {/* Ocean Starlight Phosphorescence */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-700/35 via-cyan-800/25 to-indigo-950/35 blur-2xl" />
        {/* Floating Sea Glass Vessel Talisman */}
        <div className="relative w-36 h-44 sm:w-40 sm:h-48 rounded-2xl bg-[#06121E] border border-blue-400/30 shadow-[0_24px_60px_-10px_rgba(59,130,246,0.3)] flex flex-col justify-between p-4 rotate-[1.5deg] hover:rotate-0 transition-transform duration-500">
          <div className="flex items-center justify-between text-[9px] font-mono text-blue-300/80 tracking-wider">
            <span>MIDNIGHT TIDE</span>
            <span>VESSEL NO. 06</span>
          </div>
          <div className="my-auto text-center space-y-1">
            <span className="text-xl">🌊</span>
            <p className="text-xs font-serif italic text-blue-200/90">
              “Across every shore, to you.”
            </p>
          </div>
          <div className="h-1 w-full bg-gradient-to-r from-blue-400 to-cyan-300 rounded-full opacity-60" />
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
      // Reveal each world gently as it enters the viewport
      const worldSections = gsap.utils.toArray<HTMLElement>(".world-vista-scene");
      worldSections.forEach((section) => {
        gsap.fromTo(
          section.querySelectorAll(".world-vista-reveal"),
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1.0,
            ease: "power2.out",
            stagger: 0.15,
            scrollTrigger: {
              trigger: section,
              start: "top 75%",
              end: "bottom 30%",
              toggleActions: "play none none reverse",
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
      {/* Walkthrough Atmospheric Header */}
      <div className="max-w-4xl mx-auto text-center px-6 pt-20 pb-12 sm:pt-28 sm:pb-16 space-y-3 relative z-10">
        <span className="inline-block text-[11px] font-mono tracking-widest uppercase text-rose-300/80">
          The World Collection
        </span>
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-normal text-white tracking-tight leading-tight">
          Step into their atmosphere.
        </h2>
        <p className="text-sm sm:text-base text-rose-100/70 max-w-lg mx-auto font-light leading-relaxed">
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
            {/* Dynamic ambient bloom for this world */}
            <div
              className={`absolute w-[450px] sm:w-[650px] h-[350px] sm:h-[450px] rounded-full bg-gradient-to-tr ${world.glowGradient} blur-3xl pointer-events-none -z-10`}
            />

            <div className="max-w-xl mx-auto flex flex-col items-center space-y-6">
              {/* World Index Indicator */}
              <div className="world-vista-reveal text-[10px] font-mono tracking-widest uppercase text-white/50">
                <span>0{idx + 1} OF 06</span>
                <span className="mx-2">·</span>
                <span>SANCTUARY VISTA</span>
              </div>

              {/* Dimensional Floating Artifact */}
              <div className="world-vista-reveal will-change-transform my-2">
                {world.renderArtifact()}
              </div>

              {/* Editorial World Title & Tagline */}
              <div className="world-vista-reveal space-y-2">
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-white tracking-tight">
                  {world.name} {world.jpName && <span className="text-2xl sm:text-3xl opacity-75 font-serif font-light">({world.jpName})</span>}
                </h3>
                <p className="text-base sm:text-lg font-serif italic text-rose-200/90 font-light max-w-md mx-auto">
                  “{world.tagline}”
                </p>
              </div>

              {/* Direct Poetic Invitation Link */}
              <div className="world-vista-reveal pt-2">
                <Link
                  href={`/create?template=${world.id}`}
                  className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-sm font-medium text-white/90 hover:text-white bg-white/[0.08] hover:bg-white/[0.14] border border-white/[0.12] hover:border-white/[0.24] backdrop-blur-md shadow-lg transition-all duration-300"
                >
                  <span>Enter {world.name}</span>
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Understated Showroom Full Catalog Link */}
      <div className="text-center py-16 px-6 relative z-10">
        <Link
          href="/templates"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono uppercase tracking-widest text-rose-300/80 hover:text-rose-100 transition-colors"
        >
          <span>Explore all six atmospheres with interactive plasma spark</span>
          <span>→</span>
        </Link>
      </div>
    </div>
  );
}
