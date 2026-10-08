"use client";

import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AmbientBotanicalFrame } from "@/components/motion/AmbientBotanicalFrame";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * SpatialDiscoveredObjects (Phase 6.8.1 Physical Memory Tabletop):
 * Replaces all remaining card geometry with genuine physical objects resting
 * on an intimate memory surface:
 * 1. Physical Folded Airmail Envelope with pointed triangular flap and wax seal
 * 2. Origami Folded Whisper Note with geometric diagonal crease folds
 * 3. Heavy Gold Leaf Pressed Medallion with milled edge and star relief
 *
 * Surrounded by found desk fragments (tucked coffee ticket, torn date note, pressed petals).
 * Zero rounded-2xl generic cards.
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
      className="relative w-full bg-transparent text-[#FAF8F5] py-24 sm:py-36 px-6 overflow-hidden select-none"
    >
      {/* Peripheral Botanical Edge Presence (Dusk botanical branches at periphery) */}
      <AmbientBotanicalFrame variant="dusk" density="subtle" intensity={0.72} />

      {/* Subtle suspended botanical / paper fibers drifting over tabletop */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0" aria-hidden="true">
        <svg viewBox="0 0 1200 600" fill="none" className="w-full h-full opacity-30">
          <path d="M280 180 C 290 170, 305 175, 295 190 C 285 195, 275 190, 280 180 Z" fill="#9F1239" fillOpacity="0.35" />
          <path d="M880 320 C 895 310, 910 320, 900 335 C 890 340, 875 330, 880 320 Z" fill="#D97706" fillOpacity="0.3" />
          <circle cx="580" cy="140" r="1.5" fill="#FAF5EE" fillOpacity="0.4" />
          <circle cx="640" cy="420" r="1.2" fill="#FAF5EE" fillOpacity="0.35" />
        </svg>
      </div>

      {/* Editorial Header floating lightly in space */}
      <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-24 space-y-3 relative z-10">
        <h2 className="text-3xl sm:text-5xl font-serif font-normal text-[#1A0311] tracking-tight leading-tight drop-shadow-[0_1px_14px_rgba(255,245,248,0.6)]">
          Little secrets waiting between the hours.
        </h2>
        <p className="text-sm sm:text-base text-[#36091E] font-normal leading-relaxed drop-shadow-[0_1px_6px_rgba(255,245,248,0.5)]">
          Love isn&apos;t spoken all at once. It lives in folded notes, private questions, and the surprises kept for future mornings.
        </p>
        <p className="text-xs sm:text-sm text-[#831843] font-serif italic pt-1 drop-shadow-[0_1px_4px_rgba(255,245,248,0.5)] font-medium">
          Touch an object to unfold what is hidden inside.
        </p>
      </div>

      {/* Spatial Tabletop Constellation of Keepsakes (AUTHENTIC PHYSICAL OBJECTS) */}
      <div className="max-w-5xl mx-auto relative z-10 min-h-[580px] md:min-h-[660px] lg:min-h-[700px] flex flex-col md:block items-center justify-center gap-12 md:gap-0 [perspective:1200px]">
        {/* ============================================================== */}
        {/* FOUND FRAGMENT A: Vintage ticket stub tucked under envelope     */}
        {/* ============================================================== */}
        <div
          className="hidden md:block absolute top-8 left-[24%] lg:left-[26%] z-10 pointer-events-none select-none transform -rotate-12 opacity-95 will-change-transform drop-shadow-[0_8px_16px_rgba(20,5,10,0.3)]"
          aria-hidden="true"
        >
          <div className="w-28 py-1.5 px-2 bg-[#FAF3E8] rounded-xs border border-amber-900/20 text-left shadow-sm">
            <span className="block text-[6.5px] font-mono tracking-widest text-[#7A1D45] uppercase font-semibold">TICKET · 10.14</span>
            <span className="font-serif italic text-[10px] text-[#1C0412] leading-none">Rainy Tuesday</span>
            <span className="block text-[6px] font-mono tracking-widest text-[#843657]/70 mt-0.5">ADMIT ONE · № 0214</span>
          </div>
        </div>

        {/* ============================================================== */}
        {/* FOUND FRAGMENT B: Torn deckled date note                       */}
        {/* ============================================================== */}
        <div
          className="hidden md:block absolute bottom-6 left-[22%] lg:left-[26%] z-15 pointer-events-none select-none transform rotate-6 opacity-90 will-change-transform drop-shadow-[0_6px_16px_rgba(40,10,20,0.18)]"
          aria-hidden="true"
        >
          <div className="w-32 py-1.5 px-2.5 bg-[#FFFDF9] rounded-xs border border-rose-950/[0.12] text-left">
            <span className="block font-serif italic text-[11px] text-[#2A051A] leading-tight">
              “11:42 pm — remember this”
            </span>
            <span className="block text-[6px] font-mono text-stone-500 mt-0.5 tracking-wider">OCTOBER 14</span>
          </div>
        </div>

        {/* ============================================================== */}
        {/* FOUND FRAGMENT C: Stray pressed petal on tabletop              */}
        {/* ============================================================== */}
        <div
          className="hidden md:block absolute top-[48%] right-[26%] z-15 pointer-events-none select-none transform rotate-45 opacity-80"
          aria-hidden="true"
        >
          <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5 text-[#9F1239] drop-shadow-sm">
            <path d="M4 14 C 2 8, 8 3, 14 4 C 16 10, 10 16, 4 14 Z" fill="currentColor" fillOpacity="0.5" />
          </svg>
        </div>

        {/* ============================================================== */}
        {/* FOUND FRAGMENT D: Torn scrap of raw gold foil on desk          */}
        {/* ============================================================== */}
        <div
          className="hidden md:block absolute top-[28%] right-[33%] lg:right-[35%] z-15 pointer-events-none select-none transform rotate-[22deg] opacity-90 will-change-transform drop-shadow-[0_4px_12px_rgba(217,119,6,0.35)]"
          aria-hidden="true"
        >
          <div className="w-14 h-6 bg-gradient-to-tr from-amber-400 via-amber-200 to-yellow-100 rounded-xs border border-amber-400/40 shadow-xs [clip-path:polygon(0_0,95%_10%,85%_100%,5%_88%)]" />
        </div>

        {/* ============================================================== */}
        {/* OBJECT 01: REAL FOLDED AIRMAIL ENVELOPE (Elevated, left, -3°)  */}
        {/* ============================================================== */}
        <div className="spatial-discovered-artifact w-full max-w-xs md:max-w-[310px] lg:max-w-[330px] md:absolute md:top-4 md:left-2 lg:left-6 z-20 flex flex-col items-center md:items-start text-center md:text-left">
          <button
            type="button"
            onClick={() => setOpenEnvelope(!openEnvelope)}
            className="w-full group cursor-pointer focus:outline-none"
            aria-expanded={openEnvelope}
          >
            {/* PHYSICAL OBJECT: Folded Envelope with Pointed Triangular Flap & Wax Seal */}
            <div className="relative w-full h-56 sm:h-60 bg-gradient-to-b from-[#2C0718] via-[#1A030E] to-[#0F0108] border border-rose-400/30 p-5 shadow-[0_24px_50px_-10px_rgba(225,29,72,0.35),0_6px_20px_rgba(0,0,0,0.6)] flex flex-col justify-between rotate-[-3.5deg] group-hover:rotate-0 transition-transform duration-500 will-change-transform overflow-visible">
              {/* Pointed Envelope Flap Fold Line */}
              <div className="absolute top-0 inset-x-0 h-18 bg-gradient-to-b from-[#380920] to-[#1E0412] [clip-path:polygon(0_0,100%_0,50%_100%)] shadow-md border-t border-rose-400/25" />

              {/* Hand-Poured Wax Seal Medallion Over Flap */}
              <div className="absolute top-15 left-1/2 -translate-x-1/2 -translate-y-1/2 z-25">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#E11D48] via-[#9F1239] to-[#4C0519] border border-amber-300/50 shadow-[0_4px_16px_rgba(159,18,57,0.7)] flex items-center justify-center text-rose-100 group-hover:scale-105 transition-transform">
                  <div className="w-5 h-5 rounded-full border border-amber-200/40 flex items-center justify-center">
                    <span className="font-serif italic text-xs text-amber-200/90 leading-none">v</span>
                  </div>
                </div>
              </div>

              {/* Clean breathing room, zero fake technical metadata */}
              <div className="h-6" />

              {/* Central Letter Prompt */}
              <div className="my-auto space-y-1.5 text-center relative z-20 pt-4">
                <h3 className="font-serif text-xl sm:text-2xl text-white drop-shadow-[0_1px_8px_rgba(10,2,7,0.9)] font-normal leading-snug">
                  Open when you miss me
                </h3>
              </div>

              {/* Reveal peek or touch hint */}
              <div className="pt-2 border-t border-rose-500/20 text-[11px] font-serif italic text-rose-100 font-medium text-center relative z-20">
                {openEnvelope ? (
                  <span className="text-amber-200 font-medium animate-fade-in">
                    “Close your eyes. Take a breath. I am right here with you.”
                  </span>
                ) : (
                  <span className="text-rose-200/80 group-hover:text-white transition-colors">
                    touch wax seal to unseal
                  </span>
                )}
              </div>
            </div>
          </button>

          {/* Understated Marginalia Note */}
          <div className="mt-3 space-y-0.5 max-w-xs px-1">
            <span className="text-[10px] font-mono tracking-widest uppercase text-[#7A1D45] font-semibold">
              Open When Letters
            </span>
            <p className="text-xs text-[#36091E] font-normal leading-relaxed">
              Envelopes sealed for future days — when they have had a hard day, miss you, or can&apos;t sleep.
            </p>
          </div>
        </div>

        {/* ============================================================== */}
        {/* OBJECT 02: ORIGAMI FOLDED WHISPER NOTE (Lower, center, +2.5°) */}
        {/* ============================================================== */}
        <div className="spatial-discovered-artifact w-full max-w-xs md:max-w-[290px] lg:max-w-[310px] md:absolute md:top-36 md:left-[35%] lg:left-[37%] z-25 flex flex-col items-center md:items-start text-center md:text-left">
          <button
            type="button"
            onClick={() => setOpenWhisper(!openWhisper)}
            className="w-full group cursor-pointer focus:outline-none"
            aria-expanded={openWhisper}
          >
            {/* PHYSICAL OBJECT: Folded Parchment Note with Creased Flaps */}
            <div className="relative w-full h-54 sm:h-58 bg-[#FFFDF9] text-[#3B0E23] p-5 shadow-[0_20px_45px_-10px_rgba(70,15,35,0.22),0_4px_12px_rgba(0,0,0,0.06)] border border-rose-950/[0.12] flex flex-col justify-between rotate-[2.5deg] group-hover:rotate-0 transition-transform duration-500 will-change-transform overflow-hidden">
              {/* Diagonal Fold Crease Texture Lines */}
              <div className="absolute inset-0 pointer-events-none opacity-20">
                <svg viewBox="0 0 240 200" fill="none" className="w-full h-full">
                  <path d="M0 0 L120 100 L240 0" stroke="#7A1D45" strokeWidth="1" strokeDasharray="3 3" />
                  <path d="M0 200 L120 100 L240 200" stroke="#7A1D45" strokeWidth="1" strokeDasharray="3 3" />
                </svg>
              </div>

              {/* Folded Corner Tab */}
              <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-rose-100 to-[#F5EBE1] border-b border-l border-rose-950/20 shadow-sm" />

              {/* Subtle top breathing space, zero fake metadata */}
              <div className="h-4" />

              {/* Understated Embossed Motif & Inscription */}
              <div className="my-auto space-y-2 text-center relative z-10">
                <div className="w-8 h-8 mx-auto flex items-center justify-center text-[#881337]" aria-hidden="true">
                  <div className="w-5 h-5 rounded-full border border-[#881337]/40 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#881337]/60" />
                  </div>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl text-[#1A0311] font-normal leading-snug">
                  A secret whisper
                </h3>
              </div>

              {/* Reveal peek or tap hint */}
              <div className="pt-2 border-t border-rose-950/[0.08] text-[11px] font-serif italic text-[#6B173E] font-medium text-center relative z-10">
                {openWhisper ? (
                  <span className="text-[#9F1239] font-medium animate-fade-in">
                    “Where did we share our very first secret?”
                  </span>
                ) : (
                  <span className="text-[#831843]/80 group-hover:text-[#3B0E23] transition-colors">
                    touch to unfold whisper
                  </span>
                )}
              </div>
            </div>
          </button>

          {/* Understated Marginalia Note */}
          <div className="mt-3 space-y-0.5 max-w-xs px-1">
            <span className="text-[10px] font-mono tracking-widest uppercase text-[#7A1D45] font-semibold">
              Secret Whispers
            </span>
            <p className="text-xs text-[#36091E] font-normal leading-relaxed">
              Hide intimate words behind a delicate tap-to-reveal fold or lock them with a question only you two know.
            </p>
          </div>
        </div>

        {/* ============================================================== */}
        {/* OBJECT 03: HEAVY HAMMERED AGED BRASS MEDALLION (Right, -1.5°)  */}
        {/* ============================================================== */}
        <div className="spatial-discovered-artifact w-full max-w-xs md:max-w-[280px] lg:max-w-[300px] md:absolute md:top-8 md:right-2 lg:right-6 z-20 flex flex-col items-center md:items-start text-center md:text-left">
          <button
            type="button"
            onClick={() => setOpenKeepsake(!openKeepsake)}
            className="w-full group cursor-pointer focus:outline-none"
            aria-expanded={openKeepsake}
          >
            {/* PHYSICAL OBJECT: Heavy Aged Brass Keepsake with Imperfect Hammered Surface */}
            <div className="relative w-full h-54 sm:h-58 bg-gradient-to-b from-[#1A0A06] via-[#100502] to-[#080201] border border-amber-900/40 p-5 shadow-[0_28px_60px_-10px_rgba(0,0,0,0.85),0_8px_24px_rgba(180,83,9,0.25)] flex flex-col justify-between rotate-[-1.5deg] group-hover:rotate-0 transition-transform duration-500 will-change-transform overflow-visible">
              {/* Subtle top space, zero fake metadata */}
              <div className="h-4" />

              {/* HEAVY HAMMERED AGED BRASS TALISMAN (ZERO STARBURSTS, ZERO ICONS) */}
              <div className="my-auto space-y-2 text-center">
                <div className="relative w-14 h-14 mx-auto rounded-full bg-gradient-to-br from-[#D97706] via-[#B45309] to-[#451A03] p-1 shadow-[0_12px_28px_rgba(0,0,0,0.85),inset_0_2px_4px_rgba(254,243,199,0.4),inset_0_-2px_4px_rgba(0,0,0,0.8)] flex items-center justify-center group-hover:scale-105 transition-transform">
                  {/* Subtle imperfect hammered facets & deep cast rim */}
                  <div className="w-full h-full rounded-full bg-gradient-to-tr from-[#78350F] via-[#B45309] to-[#92400E] border border-amber-400/30 flex items-center justify-center shadow-inner relative overflow-hidden">
                    {/* Hammered surface texture light play */}
                    <div className="absolute inset-0 opacity-25 mix-blend-overlay bg-[radial-gradient(#FEF3C7_1px,transparent_1px)] [background-size:6px_6px]" />
                    {/* Hand-stamped roman numeral mark pressed deeply into brass */}
                    <span className="font-serif text-sm tracking-wider font-semibold text-[#FEF3C7]/90 drop-shadow-[0_1px_1px_rgba(0,0,0,0.9)] select-none">
                      VII
                    </span>
                  </div>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl text-amber-100/95 drop-shadow-[0_1px_8px_rgba(30,10,0,0.9)] font-normal leading-snug">
                  Delight & discovery
                </h3>
              </div>

              {/* Reveal peek or touch hint */}
              <div className="pt-2 border-t border-amber-900/30 text-[11px] font-serif italic text-amber-200/90 font-medium text-center">
                {openKeepsake ? (
                  <span className="text-amber-100 font-medium animate-fade-in">
                    “Every morning with you is my favorite thing on earth.”
                  </span>
                ) : (
                  <span className="text-amber-300/70 group-hover:text-amber-100 transition-colors">
                    touch brass token to reveal
                  </span>
                )}
              </div>
            </div>
          </button>

          {/* Understated Marginalia Note */}
          <div className="mt-3 space-y-0.5 max-w-xs px-1">
            <span className="text-[10px] font-mono tracking-widest uppercase text-[#7A1D45] font-semibold">
              Playful Keepsakes
            </span>
            <p className="text-xs text-[#36091E] font-normal leading-relaxed">
              Tactile scratch tokens that reveal sweet compliments, a jar of reasons, or an intimate relationship quiz.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
