"use client";

import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
            start: "top 70%",
            end: "bottom 40%",
            toggleActions: "play none none reverse",
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
      {/* Editorial Header floating lightly in space */}
      <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-24 space-y-3 relative z-10">
        <span className="inline-block text-[11px] font-mono tracking-widest uppercase text-rose-300/80">
          Interactive Devotion
        </span>
        <h2 className="text-3xl sm:text-5xl font-serif font-normal text-white tracking-tight leading-tight">
          Add little secrets waiting to be discovered.
        </h2>
        <p className="text-sm sm:text-base text-rose-100/70 font-light leading-relaxed">
          Love isn&apos;t just what you say all at once. It is the sealed envelopes opened on quiet mornings, the private memories tucked behind questions, and the surprises waiting for the days ahead.
        </p>
        <p className="text-xs sm:text-sm text-rose-200/80 font-serif italic pt-1">
          Tap an artifact to reveal what is hidden inside.
        </p>
      </div>

      {/* Spatial Keepsakes Suspended in the Atmosphere (NO BOXED CARDS) */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 sm:gap-14 relative z-10 [perspective:1000px]">
        {/* ============================================================== */}
        {/* ARTIFACT 01: THE 'OPEN WHEN' ENVELOPE                          */}
        {/* ============================================================== */}
        <div className="spatial-discovered-artifact flex flex-col items-center text-center">
          <button
            type="button"
            onClick={() => setOpenEnvelope(!openEnvelope)}
            className="w-full max-w-xs group cursor-pointer focus:outline-none"
            aria-expanded={openEnvelope}
          >
            {/* Suspended 3D Envelope */}
            <div className="relative w-full h-56 rounded-3xl bg-gradient-to-b from-[#2E0719]/90 to-[#16020C]/95 border border-rose-500/25 p-5 shadow-[0_20px_50px_-10px_rgba(225,29,72,0.35)] flex flex-col justify-between rotate-[-2deg] group-hover:rotate-0 transition-all duration-500 will-change-transform">
              {/* Soft ambient back-glow */}
              <div className="absolute inset-0 rounded-3xl bg-rose-500/10 blur-xl pointer-events-none" />

              <div className="flex items-center justify-between text-[9px] font-mono text-rose-300/80 tracking-wider">
                <span>SEALED DISPATCH</span>
                <span>OPEN WHEN</span>
              </div>

              {/* Envelope Centerpiece */}
              <div className="my-auto space-y-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#E11D48] via-[#BE123C] to-[#881337] border border-amber-200/80 shadow-[0_4px_16px_rgba(225,29,72,0.4)] mx-auto flex items-center justify-center text-amber-100 text-sm font-serif">
                  ✉
                </div>
                <h3 className="font-serif text-xl sm:text-2xl text-white">
                  Open when you miss me
                </h3>
              </div>

              {/* Reveal peek or tap hint */}
              <div className="pt-2 border-t border-rose-500/20 text-[11px] font-serif italic text-rose-200/80">
                {openEnvelope ? (
                  <span className="text-amber-200 font-medium">
                    “Close your eyes. Take a breath. I am right here.”
                  </span>
                ) : (
                  <span className="group-hover:text-rose-100 transition-colors">
                    Tap to unseal note →
                  </span>
                )}
              </div>
            </div>
          </button>

          <div className="mt-5 space-y-1 max-w-xs">
            <h4 className="text-base font-serif text-white">Open When Letters</h4>
            <p className="text-xs text-white/60 font-light leading-relaxed">
              Envelopes sealed for future days — when they have had a hard day, miss you, or can&apos;t sleep.
            </p>
          </div>
        </div>

        {/* ============================================================== */}
        {/* ARTIFACT 02: THE CONCEALED WHISPER NOTE                        */}
        {/* ============================================================== */}
        <div className="spatial-discovered-artifact flex flex-col items-center text-center">
          <button
            type="button"
            onClick={() => setOpenWhisper(!openWhisper)}
            className="w-full max-w-xs group cursor-pointer focus:outline-none"
            aria-expanded={openWhisper}
          >
            {/* Suspended 3D Folded Vellum Note */}
            <div className="relative w-full h-56 rounded-3xl bg-gradient-to-b from-[#FFFDF9]/95 to-[#FAF5EE]/90 text-[#3B0E23] p-5 shadow-[0_20px_50px_-10px_rgba(70,15,35,0.2)] border border-rose-950/[0.08] flex flex-col justify-between rotate-[1.5deg] group-hover:rotate-0 transition-all duration-500 will-change-transform">
              <div className="flex items-center justify-between text-[9px] font-mono text-stone-400 tracking-wider">
                <span>CONCEALED NOTE</span>
                <span>QUESTION LOCK</span>
              </div>

              {/* Inner secret whisper */}
              <div className="my-auto space-y-2">
                <div className="w-9 h-9 rounded-full bg-rose-100 text-[#9F1239] flex items-center justify-center mx-auto text-sm">
                  🗝️
                </div>
                <h3 className="font-serif text-xl sm:text-2xl text-[#240412]">
                  A secret whisper
                </h3>
              </div>

              {/* Reveal peek or tap hint */}
              <div className="pt-2 border-t border-rose-950/[0.08] text-[11px] font-serif italic text-[#8C3A62]">
                {openWhisper ? (
                  <span className="text-[#9F1239] font-medium">
                    “Where did we share our very first secret?”
                  </span>
                ) : (
                  <span className="group-hover:text-[#5E2640] transition-colors">
                    Tap to unlock whisper →
                  </span>
                )}
              </div>
            </div>
          </button>

          <div className="mt-5 space-y-1 max-w-xs">
            <h4 className="text-base font-serif text-white">Secret Whispers</h4>
            <p className="text-xs text-white/60 font-light leading-relaxed">
              Hide intimate words behind a delicate tap-to-reveal fold or lock them with a question only you two know.
            </p>
          </div>
        </div>

        {/* ============================================================== */}
        {/* ARTIFACT 03: THE TACTILE SHIMMER KEEPSAKE                      */}
        {/* ============================================================== */}
        <div className="spatial-discovered-artifact flex flex-col items-center text-center">
          <button
            type="button"
            onClick={() => setOpenKeepsake(!openKeepsake)}
            className="w-full max-w-xs group cursor-pointer focus:outline-none"
            aria-expanded={openKeepsake}
          >
            {/* Suspended 3D Foil Shimmer Keepsake */}
            <div className="relative w-full h-56 rounded-3xl bg-gradient-to-b from-[#200A18]/90 to-[#10030C]/95 border border-amber-300/30 p-5 shadow-[0_20px_50px_-10px_rgba(217,119,6,0.35)] flex flex-col justify-between rotate-[-1.5deg] group-hover:rotate-0 transition-all duration-500 will-change-transform">
              {/* Soft gold aura */}
              <div className="absolute inset-0 rounded-3xl bg-amber-400/10 blur-xl pointer-events-none" />

              <div className="flex items-center justify-between text-[9px] font-mono text-amber-200/80 tracking-wider">
                <span>TACTILE SURPRISE</span>
                <span>GOLD FOIL</span>
              </div>

              {/* Keepsake Centerpiece */}
              <div className="my-auto space-y-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 border border-amber-200/80 shadow-[0_4px_16px_rgba(217,119,6,0.5)] mx-auto flex items-center justify-center text-amber-950 font-serif text-sm">
                  ✦
                </div>
                <h3 className="font-serif text-xl sm:text-2xl text-amber-100">
                  Delight & discovery
                </h3>
              </div>

              {/* Reveal peek or tap hint */}
              <div className="pt-2 border-t border-amber-400/20 text-[11px] font-serif italic text-amber-200/90">
                {openKeepsake ? (
                  <span className="text-amber-100 font-medium">
                    “Every morning with you is my favorite thing on earth.”
                  </span>
                ) : (
                  <span className="group-hover:text-amber-100 transition-colors">
                    Tap to scratch reveal →
                  </span>
                )}
              </div>
            </div>
          </button>

          <div className="mt-5 space-y-1 max-w-xs">
            <h4 className="text-base font-serif text-white">Playful Keepsakes</h4>
            <p className="text-xs text-white/60 font-light leading-relaxed">
              Tactile scratch cards that reveal sweet compliments, a jar of reasons, or an intimate relationship quiz.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
