"use client";

import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AmbientBotanicalFrame } from "@/components/motion/AmbientBotanicalFrame";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * SpatialDiscoveredObjects (Phase 6.8.3 Spatial Composition Break):
 * Eliminates all card/panel wrappers. The physical keepsakes exist independently
 * on an intimate tabletop environment:
 * 1. Physical Folded Velvet Envelope with molten wax seal (hit target is the envelope itself)
 * 2. Origami Folded Whisper Note with crisp crease folds (hit target is the paper note)
 * 3. Heavy Hammered Aged Brass Talisman with irregular oxidation and contact shadow (hit target is the coin)
 *
 * Interaction feedback is physical: lift, rotation, shadow shift, unsealing, unfolding.
 * Titles and descriptions are detached editorial marginalia positioned nearby on the tabletop.
 * Zero emblems. Zero Roman numerals. Zero "v" monograms. Zero rectangular wrapper panels.
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
      {/* Peripheral Botanical Edge Atmosphere */}
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
          Love lives in folded notes, private questions, and unhurried mornings.
        </p>
        <p className="text-xs sm:text-sm text-[#831843] font-serif italic pt-1 drop-shadow-[0_1px_4px_rgba(255,245,248,0.5)] font-medium">
          Touch any keepsake to reveal what it carries.
        </p>
      </div>

      {/* Spatial Tabletop Constellation of Keepsakes (STANDALONE PHYSICAL OBJECTS) */}
      <div className="max-w-5xl mx-auto relative z-10 min-h-[580px] md:min-h-[640px] lg:min-h-[680px] flex flex-col md:block items-center justify-center gap-16 md:gap-0 [perspective:1200px]">
        {/* ============================================================== */}
        {/* FOUND FRAGMENT A: Vintage coffee ticket stub on tabletop        */}
        {/* ============================================================== */}
        <div
          className="hidden md:block absolute top-6 left-[22%] lg:left-[24%] z-10 pointer-events-none select-none transform -rotate-12 opacity-95 will-change-transform drop-shadow-[0_8px_16px_rgba(20,5,10,0.3)]"
          aria-hidden="true"
        >
          <div className="w-24 sm:w-26 py-1 px-2.5 bg-[#FAF3E8] rounded-xs border border-amber-900/20 text-left shadow-xs">
            <span className="font-serif italic text-[11px] text-[#1C0412] leading-none block">Rainy Tuesday</span>
            <span className="block text-[7.5px] font-mono tracking-wider text-[#843657]/80 mt-0.5">First Coffee</span>
          </div>
        </div>

        {/* ============================================================== */}
        {/* FOUND FRAGMENT B: Torn deckled date note                       */}
        {/* ============================================================== */}
        <div
          className="hidden md:block absolute bottom-4 left-[20%] lg:left-[23%] z-10 pointer-events-none select-none transform rotate-6 opacity-90 will-change-transform drop-shadow-[0_6px_16px_rgba(40,10,20,0.18)]"
          aria-hidden="true"
        >
          <div className="w-28 py-1.5 px-2.5 bg-[#FFFDF9] rounded-xs border border-rose-950/[0.12] text-left">
            <span className="block font-serif italic text-[11px] text-[#2A051A] leading-tight">
              “11:42 pm — remember this”
            </span>
          </div>
        </div>

        {/* ============================================================== */}
        {/* FOUND FRAGMENT C: Stray pressed rose petal                     */}
        {/* ============================================================== */}
        <div
          className="hidden md:block absolute top-[52%] right-[28%] z-10 pointer-events-none select-none transform rotate-45 opacity-80"
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
          className="hidden md:block absolute top-[22%] right-[32%] lg:right-[34%] z-10 pointer-events-none select-none transform rotate-[22deg] opacity-90 will-change-transform drop-shadow-[0_4px_12px_rgba(217,119,6,0.35)]"
          aria-hidden="true"
        >
          <div className="w-14 h-6 bg-gradient-to-tr from-amber-400 via-amber-200 to-yellow-100 rounded-xs border border-amber-400/40 shadow-xs [clip-path:polygon(0_0,95%_10%,85%_100%,5%_88%)]" />
        </div>

        {/* ============================================================== */}
        {/* OBJECT 01: REAL FOLDED WAX-SEALED ENVELOPE (Standalone Object) */}
        {/* ============================================================== */}
        <div className="spatial-discovered-artifact w-full max-w-xs md:max-w-[280px] lg:max-w-[300px] md:absolute md:top-2 md:left-2 lg:left-6 z-20 flex flex-col items-center md:items-start">
          <button
            type="button"
            onClick={() => setOpenEnvelope(!openEnvelope)}
            className="group cursor-pointer focus:outline-none transition-transform duration-500 will-change-transform text-left"
            aria-label="Folded envelope with wax seal"
            aria-expanded={openEnvelope}
          >
            {/* THE PHYSICAL OBJECT ITSELF: Hand-folded Envelope resting on desk */}
            <div
              className={`relative w-64 sm:w-72 h-44 sm:h-48 bg-gradient-to-br from-[#260515] via-[#17020C] to-[#0A0105] border border-rose-400/25 transition-all duration-500 overflow-visible ${
                openEnvelope
                  ? "rotate-0 -translate-y-3 shadow-[0_32px_60px_-10px_rgba(225,29,72,0.45),0_12px_28px_rgba(0,0,0,0.85)]"
                  : "rotate-[-3.5deg] group-hover:rotate-0 group-hover:-translate-y-2 shadow-[0_20px_45px_-10px_rgba(225,29,72,0.3),0_6px_18px_rgba(0,0,0,0.7)]"
              }`}
            >
              {/* Pointed Envelope Flap Fold */}
              <div
                className={`absolute top-0 inset-x-0 h-22 bg-gradient-to-b from-[#34071D] to-[#1A030E] [clip-path:polygon(0_0,100%_0,50%_100%)] shadow-md border-t border-rose-400/30 transition-transform duration-500 origin-top ${
                  openEnvelope ? "-scale-y-75 opacity-90" : "scale-y-100"
                }`}
              />

              {/* Hand-Poured Organic Wax Seal (NO MONOGRAMS, pure molten ripples) */}
              <div className="absolute top-18 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
                <div className="relative w-11 h-11 rounded-full bg-gradient-to-br from-[#E11D48] via-[#9F1239] to-[#4C0519] border border-amber-300/40 shadow-[0_4px_16px_rgba(159,18,57,0.8)] flex items-center justify-center group-hover:scale-105 transition-transform">
                  {/* Organic wax drip contour */}
                  <div className="absolute -bottom-1 -right-0.5 w-3 h-3 rounded-full bg-[#881337] opacity-90" />
                  <div className="absolute -top-0.5 -left-1 w-2.5 h-2.5 rounded-full bg-[#9F1239] opacity-80" />
                  {/* Molten concentric cooling ridge */}
                  <div className="w-5 h-5 rounded-full border border-amber-200/35 bg-[#9F1239]/60 shadow-inner" />
                </div>
              </div>

              {/* Revealed Folded Letter slipping out when opened */}
              {openEnvelope ? (
                <div className="absolute inset-x-3 bottom-3 top-8 bg-[#FFFDF9] text-[#2C0718] p-3 shadow-lg border border-rose-200/60 flex flex-col justify-center text-center animate-fade-in z-20">
                  <p className="font-serif italic text-xs sm:text-[13px] text-[#1A0311] leading-relaxed font-medium">
                    “Close your eyes. Take a breath. I am right here with you.”
                  </p>
                </div>
              ) : (
                <div className="absolute bottom-4 inset-x-4 text-center z-20">
                  <span className="font-serif text-sm sm:text-base text-rose-100/90 font-normal tracking-wide drop-shadow-sm">
                    Open when you miss me
                  </span>
                </div>
              )}
            </div>
          </button>

          {/* DETACHED EDITORIAL MARGINALIA */}
          <div className="mt-4 space-y-0.5 text-center md:text-left max-w-xs">
            <span className="text-[10px] font-mono tracking-widest uppercase text-[#7A1D45] font-semibold block">
              № 01 · Open When Letter
            </span>
            <p className="text-xs text-[#36091E] font-normal leading-relaxed">
              Kept for future days when words are needed most.
            </p>
          </div>
        </div>

        {/* ============================================================== */}
        {/* OBJECT 02: ORIGAMI CREASED WHISPER NOTE (Standalone Object)    */}
        {/* ============================================================== */}
        <div className="spatial-discovered-artifact w-full max-w-xs md:max-w-[270px] lg:max-w-[290px] md:absolute md:top-36 md:left-[35%] lg:left-[37%] z-25 flex flex-col items-center md:items-start">
          <button
            type="button"
            onClick={() => setOpenWhisper(!openWhisper)}
            className="group cursor-pointer focus:outline-none transition-transform duration-500 will-change-transform text-left"
            aria-label="Origami folded secret whisper note"
            aria-expanded={openWhisper}
          >
            {/* THE PHYSICAL OBJECT ITSELF: Heavy textured vellum note with folded corner */}
            <div
              className={`relative w-60 sm:w-68 h-44 sm:h-48 bg-[#FFFDF9] text-[#3B0E23] p-4 border border-rose-950/[0.12] transition-all duration-500 overflow-hidden ${
                openWhisper
                  ? "rotate-0 -translate-y-3 shadow-[0_28px_55px_-10px_rgba(70,15,35,0.3),0_6px_16px_rgba(0,0,0,0.08)]"
                  : "rotate-[2.5deg] group-hover:rotate-0 group-hover:-translate-y-2 shadow-[0_18px_40px_-10px_rgba(70,15,35,0.18),0_4px_12px_rgba(0,0,0,0.05)]"
              }`}
            >
              {/* Geometric Fold Crease Lines */}
              <div className="absolute inset-0 pointer-events-none opacity-25">
                <svg viewBox="0 0 240 180" fill="none" className="w-full h-full">
                  <path d="M0 0 L120 90 L240 0" stroke="#7A1D45" strokeWidth="1" strokeDasharray="3 3" />
                  <path d="M0 180 L120 90 L240 180" stroke="#7A1D45" strokeWidth="1" strokeDasharray="3 3" />
                </svg>
              </div>

              {/* Folded Corner Tab */}
              <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-rose-100 to-[#F5EBE1] border-b border-l border-rose-950/20 shadow-xs" />

              {/* Content or Revealed Secret */}
              {openWhisper ? (
                <div className="h-full flex flex-col justify-center items-center text-center px-2 animate-fade-in relative z-10">
                  <p className="font-serif italic text-xs sm:text-[13px] text-[#9F1239] font-medium leading-relaxed">
                    “Where did we share our very first secret?”
                  </p>
                </div>
              ) : (
                <div className="h-full flex flex-col justify-between relative z-10 pt-2">
                  <div className="h-4" />
                  <div className="text-center">
                    <span className="font-serif text-base sm:text-lg text-[#1A0311] font-normal leading-snug block">
                      A secret whisper
                    </span>
                    <span className="text-[10px] font-serif italic text-[#831843]/80 mt-1 block">
                      touch fold to uncover
                    </span>
                  </div>
                  <div className="h-2" />
                </div>
              )}
            </div>
          </button>

          {/* DETACHED EDITORIAL MARGINALIA */}
          <div className="mt-4 space-y-0.5 text-center md:text-left max-w-xs">
            <span className="text-[10px] font-mono tracking-widest uppercase text-[#7A1D45] font-semibold block">
              № 02 · Whisper Fold
            </span>
            <p className="text-xs text-[#36091E] font-normal leading-relaxed">
              Guarded by a private fold until you decide to open it.
            </p>
          </div>
        </div>

        {/* ============================================================== */}
        {/* OBJECT 03: HEAVY HAMMERED AGED BRASS TALISMAN (Standalone)    */}
        {/* ============================================================== */}
        <div className="spatial-discovered-artifact w-full max-w-xs md:max-w-[260px] lg:max-w-[280px] md:absolute md:top-4 md:right-2 lg:right-6 z-20 flex flex-col items-center md:items-start">
          <button
            type="button"
            onClick={() => setOpenKeepsake(!openKeepsake)}
            className="group cursor-pointer focus:outline-none transition-transform duration-500 will-change-transform text-left"
            aria-label="Heavy aged hammered brass talisman"
            aria-expanded={openKeepsake}
          >
            {/* THE PHYSICAL OBJECT ITSELF: Heavy hammered brass coin resting directly on tabletop */}
            <div className="relative flex flex-col items-center justify-center p-3">
              {/* Believable Deep Contact Shadow onto Desk */}
              <div
                className={`relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-[#E59A24] via-[#A85007] to-[#451A03] p-1.5 transition-all duration-500 ${
                  openKeepsake
                    ? "-translate-y-3 rotate-6 shadow-[0_24px_50px_rgba(0,0,0,0.9),0_6px_18px_rgba(180,83,9,0.4)]"
                    : "rotate-[-2deg] group-hover:rotate-0 group-hover:-translate-y-2 shadow-[0_16px_36px_rgba(0,0,0,0.85),0_4px_14px_rgba(180,83,9,0.3)]"
                }`}
              >
                {/* Heavy Hammered Antique Brass Face (ZERO ROMAN NUMERALS, ZERO EMBLEMS) */}
                <div className="w-full h-full rounded-full bg-gradient-to-tr from-[#6B2F0B] via-[#92400E] to-[#B45309] border border-amber-300/40 flex items-center justify-center shadow-inner relative overflow-hidden">
                  {/* Subtle hammered facets & light refraction */}
                  <div className="absolute inset-0 opacity-30 mix-blend-overlay bg-[radial-gradient(#FEF3C7_1.5px,transparent_1.5px)] [background-size:6px_6px]" />
                  {/* Natural edge oxidation rim & verdigris patina hint */}
                  <div className="absolute inset-0 rounded-full border border-amber-950/60 pointer-events-none" />
                  <div className="absolute top-1 left-2 w-5 h-2 rounded-full bg-amber-200/40 blur-[1px] pointer-events-none" />

                  {/* Pure tactile brass center with concentric hammered ring */}
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-amber-300/25 bg-[#78350F]/50 shadow-inner flex items-center justify-center" />
                </div>
              </div>

              {/* Revealed Keepsake Slip resting beside the token */}
              {openKeepsake ? (
                <div className="mt-3 py-1.5 px-3 bg-[#FAF3E8] rounded-xs border border-amber-900/30 text-center shadow-md animate-fade-in max-w-[230px]">
                  <p className="font-serif italic text-xs text-[#2A0802] font-medium leading-tight">
                    “Every morning with you is my favorite thing on earth.”
                  </p>
                </div>
              ) : (
                <div className="mt-3 text-center">
                  <span className="font-serif text-sm text-[#2A0802] font-normal drop-shadow-xs block">
                    Delight & discovery
                  </span>
                  <span className="text-[10px] font-serif italic text-[#831843]/80 block">
                    touch brass to turn
                  </span>
                </div>
              )}
            </div>
          </button>

          {/* DETACHED EDITORIAL MARGINALIA */}
          <div className="mt-2 space-y-0.5 text-center md:text-left max-w-xs">
            <span className="text-[10px] font-mono tracking-widest uppercase text-[#7A1D45] font-semibold block">
              № 03 · Brass Token
            </span>
            <p className="text-xs text-[#36091E] font-normal leading-relaxed">
              Cast to be turned in the palm on unhurried mornings.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
