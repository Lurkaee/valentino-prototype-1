"use client";

import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AmbientBotanicalFrame } from "@/components/motion/AmbientBotanicalFrame";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * SpatialDiscoveredObjects (Phase 6.4):
 * Instead of 3 generic glass product feature cards, the user encounters
 * three dimensional keepsakes suspended directly in the starlight atmosphere:
 * 1. An 'Open When' Envelope that unseals on tap
 * 2. A Concealed Whisper Note that unfolds its secret
 * 3. A Tactile Shimmer Keepsake that glints with intimate words
 *
 * Zero rectangular card boxes. Just pure tactile discovery in space.
 */
export function SpatialDiscoveredObjects() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Interaction states for each spatial keepsake
  const [openEnvelope, setOpenEnvelope] = useState(false);
  const [openWhisper, setOpenWhisper] = useState(false);
  const [openKeepsake, setOpenKeepsake] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(".spatial-discovered-artifact");
      gsap.fromTo(
        items,
        {
          opacity: 0,
          y: 40,
          scale: 0.94,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.1,
          ease: "power2.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            once: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-transparent text-[#FAF8F5] py-24 sm:py-36 px-6 overflow-hidden"
    >
      {/* Peripheral Botanical Edge Presence (Faint branch on left, suspended leaves on right) */}
      <AmbientBotanicalFrame variant="dusk" density="subtle" intensity={0.72} />

      {/* Subtle suspended botanical / vellum fragments between objects */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0" aria-hidden="true">
        <svg viewBox="0 0 1200 600" fill="none" className="w-full h-full opacity-30">
          {/* Subtle leaf fragment 1 */}
          <path d="M280 180 C 290 170, 305 175, 295 190 C 285 195, 275 190, 280 180 Z" fill="#9F1239" fillOpacity="0.35" />
          {/* Subtle leaf fragment 2 */}
          <path d="M880 320 C 895 310, 910 320, 900 335 C 890 340, 875 330, 880 320 Z" fill="#D97706" fillOpacity="0.3" />
          {/* Delicate vellum speck */}
          <circle cx="580" cy="140" r="1.5" fill="#FAF5EE" fillOpacity="0.4" />
          <circle cx="640" cy="420" r="1.2" fill="#FAF5EE" fillOpacity="0.35" />
        </svg>
      </div>

      {/* Editorial Header floating lightly in space */}
      <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-24 space-y-3 relative z-10">
        <span className="inline-block text-[11px] font-mono tracking-widest uppercase text-[#7A1D45] font-semibold drop-shadow-[0_1px_8px_rgba(255,245,248,0.7)]">
          Interactive Devotion
        </span>
        <h2 className="text-3xl sm:text-5xl font-serif font-normal text-[#1A0311] tracking-tight leading-tight drop-shadow-[0_1px_14px_rgba(255,245,248,0.6)]">
          Add little secrets waiting to be discovered.
        </h2>
        <p className="text-sm sm:text-base text-[#36091E] font-normal leading-relaxed drop-shadow-[0_1px_6px_rgba(255,245,248,0.5)]">
          Love isn&apos;t just what you say all at once. It is the sealed envelopes opened on quiet mornings, the private memories tucked behind questions, and the surprises waiting for the days ahead.
        </p>
        <p className="text-xs sm:text-sm text-[#831843] font-serif italic pt-1 drop-shadow-[0_1px_4px_rgba(255,245,248,0.5)] font-medium">
          Tap an artifact to reveal what is hidden inside.
        </p>
      </div>

      {/* Spatial Tabletop Constellation of Keepsakes (NO THREE-CARD GRID!) */}
      <div className="max-w-5xl mx-auto relative z-10 min-h-[580px] md:min-h-[640px] lg:min-h-[680px] flex flex-col md:block items-center justify-center gap-10 md:gap-0 [perspective:1200px]">
        {/* ============================================================== */}
        {/* FOUND FRAGMENT A: Vintage ticket stub between keepsakes        */}
        {/* ============================================================== */}
        <div
          className="hidden md:block absolute top-16 left-[38%] lg:left-[40%] z-10 pointer-events-none select-none transform -rotate-12 opacity-85 will-change-transform"
          aria-hidden="true"
        >
          <div className="w-24 py-1.5 px-2 bg-[#FAF3E8]/95 rounded border border-amber-900/20 shadow-[0_8px_18px_-4px_rgba(40,10,20,0.18)] text-left backdrop-blur-xs">
            <span className="block text-[6.5px] font-mono tracking-widest text-[#7A1D45] uppercase font-semibold">TICKET · 10.14</span>
            <span className="font-serif italic text-[9.5px] text-[#1C0412] leading-none">Rainy Tuesday</span>
            <span className="block text-[6px] font-mono tracking-widest text-[#843657]/70 mt-0.5">ADMIT ONE</span>
          </div>
        </div>

        {/* ============================================================== */}
        {/* FOUND FRAGMENT B: Torn deckled date note                       */}
        {/* ============================================================== */}
        <div
          className="hidden md:block absolute bottom-12 left-[28%] lg:left-[32%] z-10 pointer-events-none select-none transform rotate-6 opacity-80 will-change-transform"
          aria-hidden="true"
        >
          <div className="w-28 py-1.5 px-2 bg-[#FFFDF9]/95 rounded-sm border border-rose-950/[0.08] shadow-[0_6px_16px_-4px_rgba(40,10,20,0.14)] text-left">
            <span className="block font-serif italic text-[11px] text-[#2A051A] leading-tight">
              “11:42 pm — remember this”
            </span>
          </div>
        </div>

        {/* ============================================================== */}
        {/* FOUND FRAGMENT C: Stray pressed petal                          */}
        <div
          className="hidden md:block absolute top-[44%] right-[22%] z-10 pointer-events-none select-none transform rotate-45 opacity-70"
          aria-hidden="true"
        >
          <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5 text-[#9F1239]">
            <path d="M4 14 C 2 8, 8 3, 14 4 C 16 10, 10 16, 4 14 Z" fill="currentColor" fillOpacity="0.4" />
          </svg>
        </div>

        {/* ============================================================== */}
        {/* ARTIFACT 01: THE 'OPEN WHEN' ENVELOPE (Elevated, closer, -3deg)*/}
        {/* ============================================================== */}
        <div className="spatial-discovered-artifact w-full max-w-xs md:max-w-[300px] lg:max-w-[320px] md:absolute md:top-4 md:left-2 lg:left-6 z-20 flex flex-col items-center md:items-start text-center md:text-left">
          <button
            type="button"
            onClick={() => setOpenEnvelope(!openEnvelope)}
            className="w-full group cursor-pointer focus:outline-none"
            aria-expanded={openEnvelope}
          >
            {/* Suspended 3D Envelope */}
            <div className="relative w-full h-60 sm:h-64 rounded-2xl bg-gradient-to-b from-[#2E0719]/92 to-[#16020C]/96 border border-rose-400/25 p-5 shadow-[0_20px_45px_-12px_rgba(225,29,72,0.3)] flex flex-col justify-between rotate-[-3deg] group-hover:rotate-0 transition-all duration-500 will-change-transform">
              <div className="absolute inset-0 rounded-2xl bg-rose-500/10 blur-xl pointer-events-none" />

              <div className="flex items-center justify-between text-[10px] font-serif italic text-rose-200/80">
                <span>No. 01 · Kept for later</span>
                <span>Sealed fold</span>
              </div>

              {/* Envelope Centerpiece (Handcrafted Parchment Fold Mark) */}
              <div className="my-auto space-y-2 text-center">
                <div className="w-8 h-8 mx-auto flex items-center justify-center text-rose-200/90" aria-hidden="true">
                  <svg viewBox="0 0 20 16" fill="none" className="w-5 h-4 text-rose-200/90">
                    <rect x="1" y="1" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1" strokeOpacity="0.8" />
                    <path d="M1 2.5 L10 9.5 L19 2.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.8" />
                  </svg>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl text-white drop-shadow-[0_1px_8px_rgba(10,2,7,0.8)] font-normal">
                  Open when you miss me
                </h3>
              </div>

              {/* Reveal peek or tap hint */}
              <div className="pt-2 border-t border-rose-500/20 text-[11px] font-serif italic text-rose-100 font-medium text-center">
                {openEnvelope ? (
                  <span className="text-amber-200 font-medium">
                    “Close your eyes. Take a breath. I am right here.”
                  </span>
                ) : (
                  <span className="text-rose-200/80 group-hover:text-white transition-colors">
                    touch gently to unseal
                  </span>
                )}
              </div>
            </div>
          </button>

          <div className="mt-3.5 space-y-0.5 max-w-xs px-1">
            <span className="text-[11px] font-mono tracking-widest uppercase text-[#7A1D45] font-semibold">
              Open When Letters
            </span>
            <p className="text-xs text-[#36091E] font-normal leading-relaxed">
              Envelopes sealed for future days — when they have had a hard day, miss you, or can&apos;t sleep.
            </p>
          </div>
        </div>

        {/* ============================================================== */}
        {/* ARTIFACT 02: THE CONCEALED WHISPER NOTE (Lower, center-right)  */}
        {/* ============================================================== */}
        <div className="spatial-discovered-artifact w-full max-w-xs md:max-w-[280px] lg:max-w-[300px] md:absolute md:top-40 md:left-[36%] lg:left-[38%] z-25 flex flex-col items-center md:items-start text-center md:text-left">
          <button
            type="button"
            onClick={() => setOpenWhisper(!openWhisper)}
            className="w-full group cursor-pointer focus:outline-none"
            aria-expanded={openWhisper}
          >
            {/* Suspended 3D Folded Vellum Note */}
            <div className="relative w-full h-56 sm:h-60 rounded-2xl bg-gradient-to-b from-[#FFFDF9]/95 to-[#FAF5EE]/90 text-[#3B0E23] p-5 shadow-[0_20px_45px_-12px_rgba(70,15,35,0.18)] border border-rose-950/[0.08] flex flex-col justify-between rotate-[2.5deg] group-hover:rotate-0 transition-all duration-500 will-change-transform">
              <div className="flex items-center justify-between text-[10px] font-serif italic text-[#831843]/75">
                <span>No. 02 · A quiet fold</span>
                <span>Private whisper</span>
              </div>

              {/* Inner secret whisper (Handcrafted antique skeleton key silhouette) */}
              <div className="my-auto space-y-2 text-center">
                <div className="w-8 h-8 mx-auto flex items-center justify-center text-[#881337]/80" aria-hidden="true">
                  <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5 text-[#881337]/85">
                    <circle cx="8" cy="8" r="4.5" stroke="currentColor" strokeWidth="1" />
                    <circle cx="8" cy="8" r="2" fill="currentColor" fillOpacity="0.35" />
                    <path d="M11.5 11.5 L17 17 M14.5 14.5 L16.5 12.5 M16 16 L18 14" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl text-[#1A0311] font-normal">
                  A secret whisper
                </h3>
              </div>

              {/* Reveal peek or tap hint */}
              <div className="pt-2 border-t border-rose-950/[0.08] text-[11px] font-serif italic text-[#6B173E] font-medium text-center">
                {openWhisper ? (
                  <span className="text-[#9F1239] font-medium">
                    “Where did we share our very first secret?”
                  </span>
                ) : (
                  <span className="text-[#831843]/80 group-hover:text-[#3B0E23] transition-colors">
                    touch to reveal whisper
                  </span>
                )}
              </div>
            </div>
          </button>

          <div className="mt-3.5 space-y-0.5 max-w-xs px-1">
            <span className="text-[11px] font-mono tracking-widest uppercase text-[#7A1D45] font-semibold">
              Secret Whispers
            </span>
            <p className="text-xs text-[#36091E] font-normal leading-relaxed">
              Hide intimate words behind a delicate tap-to-reveal fold or lock them with a question only you two know.
            </p>
          </div>
        </div>

        {/* ============================================================== */}
        {/* ARTIFACT 03: THE TACTILE SHIMMER KEEPSAKE (Offset right)       */}
        {/* ============================================================== */}
        <div className="spatial-discovered-artifact w-full max-w-xs md:max-w-[270px] lg:max-w-[290px] md:absolute md:top-10 md:right-2 lg:right-6 z-15 flex flex-col items-center md:items-start text-center md:text-left">
          <button
            type="button"
            onClick={() => setOpenKeepsake(!openKeepsake)}
            className="w-full group cursor-pointer focus:outline-none"
            aria-expanded={openKeepsake}
          >
            {/* Suspended 3D Foil Shimmer Keepsake */}
            <div className="relative w-full h-56 sm:h-60 rounded-2xl bg-gradient-to-b from-[#200A18]/92 to-[#10030C]/96 border border-amber-300/25 p-5 shadow-[0_24px_50px_-12px_rgba(217,119,6,0.3)] flex flex-col justify-between rotate-[-1.5deg] group-hover:rotate-0 transition-all duration-500 will-change-transform">
              <div className="absolute inset-0 rounded-2xl bg-amber-400/10 blur-xl pointer-events-none" />

              <div className="flex items-center justify-between text-[10px] font-serif italic text-amber-200/80">
                <span>No. 03 · Gold leaf press</span>
                <span>A little keepsake</span>
              </div>

              {/* Keepsake Centerpiece (Artisanal gold starburst mark) */}
              <div className="my-auto space-y-2 text-center">
                <div className="w-8 h-8 mx-auto flex items-center justify-center text-amber-200/90" aria-hidden="true">
                  <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5 text-amber-200/90">
                    <path d="M10 2 L12 8 L18 10 L12 12 L10 18 L8 12 L2 10 L8 8 Z" fill="currentColor" fillOpacity="0.4" stroke="currentColor" strokeWidth="0.8" strokeLinejoin="round" />
                    <circle cx="10" cy="10" r="1.5" fill="#FEF3C7" />
                  </svg>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl text-amber-100 drop-shadow-[0_1px_8px_rgba(30,10,0,0.8)] font-normal">
                  Delight & discovery
                </h3>
              </div>

              {/* Reveal peek or tap hint */}
              <div className="pt-2 border-t border-amber-400/20 text-[11px] font-serif italic text-amber-200 font-medium text-center">
                {openKeepsake ? (
                  <span className="text-amber-100 font-medium">
                    “Every morning with you is my favorite thing on earth.”
                  </span>
                ) : (
                  <span className="text-amber-200/80 group-hover:text-amber-100 transition-colors">
                    touch to reveal
                  </span>
                )}
              </div>
            </div>
          </button>

          <div className="mt-3.5 space-y-0.5 max-w-xs px-1">
            <span className="text-[11px] font-mono tracking-widest uppercase text-[#7A1D45] font-semibold">
              Playful Keepsakes
            </span>
            <p className="text-xs text-[#36091E] font-normal leading-relaxed">
              Tactile scratch cards that reveal sweet compliments, a jar of reasons, or an intimate relationship quiz.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
