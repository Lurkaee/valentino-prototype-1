"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AmbientBotanicalFrame } from "@/components/motion/AmbientBotanicalFrame";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * SpatialDiscoveredObjects (Phase 7 Spatial Composition Reset):
 * Coherent editorial still life of three physical keepsakes sharing one surface:
 * 1. Deep Burgundy Velvet Envelope with molten wax seal (authentic physical asset, directional light & shadow).
 * 2. Folded Cream Vellum Whisper Note (authentic origami fold geometry, zero dashed X wireframe lines).
 * 3. Heavy Hammered Antique Brass Keepsake (authentic aged patina, metallic luster, zero poker-chip dots).
 *
 * Viewport Protection: Centered balanced arrangement preventing edge clipping at all desktop and mobile viewports.
 * Full interactive states preserved: reveal text, accessible buttons, aria-expanded.
 */
export function SpatialDiscoveredObjects() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Interactive reveal states for each keepsake
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
          y: 35,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power2.out",
          stagger: 0.18,
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
      className="relative w-full bg-transparent text-[#FAF8F5] py-20 sm:py-32 px-4 sm:px-6 overflow-hidden select-none"
    >
      {/* Peripheral Botanical Edge Atmosphere */}
      <AmbientBotanicalFrame variant="dusk" density="subtle" intensity={0.4} />

      {/* Floating subtle ambient particles */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0" aria-hidden="true">
        <svg viewBox="0 0 1200 600" fill="none" className="w-full h-full opacity-20">
          <circle cx="300" cy="180" r="1.5" fill="#FAF5EE" fillOpacity="0.4" />
          <circle cx="850" cy="380" r="1.2" fill="#FAF5EE" fillOpacity="0.3" />
        </svg>
      </div>

      {/* Editorial Header */}
      <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-20 space-y-3 relative z-10">
        <p className="text-[10px] sm:text-[11px] font-mono tracking-widest uppercase text-[#7A1D45] font-semibold drop-shadow-[0_1px_4px_rgba(255,245,248,0.4)]">
          The Hidden Trove
        </p>
        <h2 className="text-3xl sm:text-5xl font-serif font-normal text-[#1A0311] tracking-tight leading-tight drop-shadow-[0_1px_14px_rgba(255,245,248,0.6)]">
          Little secrets waiting between the hours.
        </h2>
        <p className="text-xs sm:text-base text-[#36091E] font-normal leading-relaxed drop-shadow-[0_1px_6px_rgba(255,245,248,0.5)]">
          Love lives in folded notes, private questions, and unhurried mornings.
        </p>
      </div>

      {/* ========================================================================= */}
      {/* SHARED STILL-LIFE SURFACE: Three authentic keepsakes in deliberate balance */}
      {/* ========================================================================= */}
      <div className="max-w-5xl mx-auto relative z-10 [perspective:1200px]">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-10 md:gap-8 lg:gap-12 w-full">

          {/* ============================================================== */}
          {/* OBJECT 01: REAL VELVET WAX-SEALED ENVELOPE                     */}
          {/* ============================================================== */}
          <div className="spatial-discovered-artifact w-full max-w-[280px] sm:max-w-[300px] flex flex-col items-center">
            <button
              type="button"
              onClick={() => setOpenEnvelope(!openEnvelope)}
              className="group cursor-pointer focus:outline-none transition-transform duration-500 will-change-transform text-left w-full"
              aria-label="Folded velvet envelope with wax seal"
              aria-expanded={openEnvelope}
            >
              <div
                className={`relative w-full aspect-[4/3] rounded-xs transition-all duration-500 will-change-transform ${
                  openEnvelope
                    ? "rotate-0 -translate-y-2.5 drop-shadow-[0_26px_40px_rgba(60,10,25,0.45)]"
                    : "rotate-[-2.5deg] group-hover:rotate-0 group-hover:-translate-y-1.5 drop-shadow-[0_18px_32px_rgba(60,10,25,0.32)]"
                }`}
              >
                {/* Authentic Deep Burgundy Velvet Envelope with Wax Seal */}
                <Image
                  src="/assets/stationery/velvet_envelope.png"
                  alt="Burgundy velvet envelope with wax seal"
                  fill
                  sizes="(max-width: 640px) 280px, 300px"
                  className="object-contain pointer-events-none select-none"
                  priority
                  unoptimized
                />

                {/* Revealed Secret Letter / Cue */}
                {openEnvelope ? (
                  <div className="absolute inset-x-4 bottom-4 top-10 bg-[#FFFDF9] text-[#2C0718] p-4 rounded-xs shadow-[0_12px_28px_rgba(0,0,0,0.35)] border border-rose-300/40 flex flex-col justify-center items-center text-center animate-fade-in z-20">
                    <p className="font-serif italic text-xs sm:text-[13px] text-[#1A0311] leading-relaxed font-medium">
                      “Close your eyes. Take a breath. I am right here with you.”
                    </p>
                    <span className="mt-2 text-[9px] font-mono tracking-widest text-[#881337]/70 uppercase">
                      — yours, always
                    </span>
                  </div>
                ) : (
                  <div className="absolute bottom-2.5 inset-x-2 text-center z-10 pointer-events-none">
                    <span className="font-serif italic text-[11px] sm:text-xs text-rose-100/90 font-medium tracking-wide drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
                      Open when you miss me
                    </span>
                  </div>
                )}
              </div>
            </button>

            {/* Penciled Curator Marginalia */}
            <div className="mt-3.5 text-center select-none transform rotate-[-1.5deg]">
              <span className="font-serif italic text-xs text-[#36091E]/75 tracking-wide drop-shadow-xs">
                sealed for hard days
              </span>
            </div>
          </div>

          {/* ============================================================== */}
          {/* OBJECT 02: REAL FOLDED VELLUM WHISPER NOTE                     */}
          {/* ============================================================== */}
          <div className="spatial-discovered-artifact w-full max-w-[270px] sm:max-w-[290px] flex flex-col items-center md:mt-6">
            <button
              type="button"
              onClick={() => setOpenWhisper(!openWhisper)}
              className="group cursor-pointer focus:outline-none transition-transform duration-500 will-change-transform text-left w-full"
              aria-label="Origami folded secret whisper note"
              aria-expanded={openWhisper}
            >
              <div
                className={`relative w-full aspect-[4/3] rounded-xs transition-all duration-500 will-change-transform ${
                  openWhisper
                    ? "rotate-0 -translate-y-2.5 drop-shadow-[0_22px_36px_rgba(40,10,20,0.35)]"
                    : "rotate-[2deg] group-hover:rotate-0 group-hover:-translate-y-1.5 drop-shadow-[0_16px_28px_rgba(40,10,20,0.24)]"
                }`}
              >
                {/* Authentic Folded Origami Vellum Note (NO dashed X lines) */}
                <Image
                  src="/assets/stationery/folded_whisper.png"
                  alt="Origami folded cream vellum note"
                  fill
                  sizes="(max-width: 640px) 270px, 290px"
                  className="object-contain pointer-events-none select-none"
                  priority
                  unoptimized
                />

                {/* Content or Revealed Secret */}
                {openWhisper ? (
                  <div className="absolute inset-x-4 inset-y-6 bg-[#FFFDF9]/95 text-[#2A051A] p-4 rounded-xs shadow-[0_10px_24px_rgba(0,0,0,0.2)] border border-amber-900/15 flex flex-col justify-center items-center text-center animate-fade-in z-20">
                    <p className="font-serif italic text-xs sm:text-[13px] text-[#881337] font-medium leading-relaxed">
                      “Where did we share our very first secret?”
                    </p>
                    <span className="mt-2 text-[9px] font-mono tracking-widest text-[#7A1D45]/70 uppercase">
                      tap to fold
                    </span>
                  </div>
                ) : (
                  <div className="absolute bottom-3 inset-x-2 text-center z-10 pointer-events-none">
                    <span className="font-serif italic text-[11px] sm:text-xs text-[#2A051A]/85 font-medium tracking-wide drop-shadow-xs">
                      A secret whisper
                    </span>
                  </div>
                )}
              </div>
            </button>

            {/* Penciled Curator Marginalia */}
            <div className="mt-3.5 text-center select-none transform rotate-[1.8deg]">
              <span className="font-serif italic text-xs text-[#36091E]/75 tracking-wide drop-shadow-xs">
                guarded by a fold
              </span>
            </div>
          </div>

          {/* ============================================================== */}
          {/* OBJECT 03: REAL AGED HAMMERED BRASS KEEPSAKE                   */}
          {/* ============================================================== */}
          <div className="spatial-discovered-artifact w-full max-w-[240px] sm:max-w-[260px] flex flex-col items-center md:mt-2">
            <button
              type="button"
              onClick={() => setOpenKeepsake(!openKeepsake)}
              className="group cursor-pointer focus:outline-none transition-transform duration-500 will-change-transform text-center flex flex-col items-center"
              aria-label="Heavy aged hammered brass talisman"
              aria-expanded={openKeepsake}
            >
              <div
                className={`relative w-32 sm:w-36 aspect-square rounded-full transition-all duration-500 will-change-transform ${
                  openKeepsake
                    ? "rotate-12 -translate-y-2 drop-shadow-[0_24px_42px_rgba(0,0,0,0.85)]"
                    : "rotate-[-3deg] group-hover:rotate-0 group-hover:-translate-y-1.5 drop-shadow-[0_16px_30px_rgba(0,0,0,0.7)]"
                }`}
              >
                {/* Authentic Heavy Hammered Aged Brass Talisman (NO poker chip dots) */}
                <Image
                  src="/assets/stationery/brass_talisman.png"
                  alt="Aged hand-hammered brass talisman"
                  fill
                  sizes="144px"
                  className="object-contain pointer-events-none select-none"
                  priority
                  unoptimized
                />
              </div>

              {/* Revealed Keepsake Slip resting beside the token */}
              {openKeepsake ? (
                <div className="mt-3 py-2 px-3.5 bg-[#FAF3E8] rounded-xs border border-amber-900/30 text-center shadow-[0_8px_20px_rgba(0,0,0,0.18)] animate-fade-in max-w-[220px]">
                  <p className="font-serif italic text-xs text-[#2A0802] font-medium leading-relaxed">
                    “Every morning with you is my favorite thing on earth.”
                  </p>
                </div>
              ) : null}
            </button>

            {/* Penciled Curator Marginalia */}
            <div className="mt-3.5 text-center select-none transform rotate-[-0.8deg]">
              <span className="font-serif italic text-xs text-[#36091E]/75 tracking-wide drop-shadow-xs">
                turned in the palm
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
