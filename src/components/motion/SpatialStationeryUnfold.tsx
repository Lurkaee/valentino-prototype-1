"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AmbientBotanicalFrame } from "@/components/motion/AmbientBotanicalFrame";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * SpatialStationeryUnfold (Phase 6.4):
 * Continuous spatial handoff from the hero love letter.
 * As the user scrolls, the envelope unseals in 3D space, the vellum letter,
 * pressed botanical petal, velvet ribbon, and wax seal disperse weightlessly,
 * and the vellum transforms into an emotional milestone timeline.
 *
 * Zero boxed card frames. The objects float freely in the living atmosphere.
 */
export function SpatialStationeryUnfold() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);

  // Material item refs
  const envelopeBackRef = useRef<HTMLDivElement | null>(null);
  const envelopeFlapRef = useRef<HTMLDivElement | null>(null);
  const letterRef = useRef<HTMLDivElement | null>(null);
  const bloomRef = useRef<HTMLDivElement | null>(null);
  const ribbonRef = useRef<HTMLDivElement | null>(null);
  const ticketRef = useRef<HTMLDivElement | null>(null);
  const sealRef = useRef<HTMLDivElement | null>(null);
  const timelineMilestonesRef = useRef<HTMLDivElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current || !stageRef.current) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        // Simple settled state for accessibility
        gsap.set(
          [
            letterRef.current,
            bloomRef.current,
            ribbonRef.current,
            ticketRef.current,
            sealRef.current,
            timelineMilestonesRef.current,
            ctaRef.current,
          ],
          { opacity: 1, y: 0, scale: 1, rotate: 0 }
        );
        return;
      }

      // Master chapter timeline pinned over scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=120%",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      // Initial state: Physical stationery floating in 3D air with spatial depth
      gsap.set(envelopeBackRef.current, {
        opacity: 0.9,
        scale: 0.95,
        rotateX: 8,
        rotateY: -6,
        y: 25,
      });

      gsap.set(envelopeFlapRef.current, {
        rotateX: 0,
        transformOrigin: "top center",
      });

      gsap.set(letterRef.current, {
        opacity: 0.85,
        y: 35,
        scale: 0.94,
        rotate: -1,
      });

      // Botanical specimen resting at perimeter corner
      gsap.set(bloomRef.current, {
        opacity: 0,
        scale: 0.8,
        x: -25,
        y: -20,
        rotate: -18,
      });

      // Draped silk ribbon tail exiting corner
      gsap.set(ribbonRef.current, {
        opacity: 0,
        scale: 0.85,
        x: 20,
        y: 25,
        rotate: 8,
      });

      // Narrative ticket fragment partially tucked under envelope
      gsap.set(ticketRef.current, {
        opacity: 0.7,
        x: -18,
        y: 20,
        rotate: -9,
        scale: 0.92,
      });

      gsap.set(sealRef.current, {
        opacity: 0.95,
        scale: 1.05,
        y: 0,
      });

      gsap.set(timelineMilestonesRef.current, {
        opacity: 0,
        y: 30,
      });

      gsap.set(ctaRef.current, {
        opacity: 0.7,
        y: 12,
      });

      // -------------------------------------------------------------
      // ACT 1: THE UNSEAL & 3D FLAP OPEN
      // -------------------------------------------------------------
      tl.to(envelopeFlapRef.current, {
        rotateX: -130,
        duration: 0.9,
        ease: "power2.inOut",
      })
      .to(sealRef.current, {
        scale: 1.08,
        y: -14,
        opacity: 0.95,
        duration: 0.7,
        ease: "back.out(1.4)",
      }, "-=0.6")

      // -------------------------------------------------------------
      // ACT 2: DISPERSAL — LETTER RISES, TICKET SLIDES OUT, SPECIMEN SETTLES
      // -------------------------------------------------------------
      .to(letterRef.current, {
        y: -12,
        scale: 1,
        opacity: 1,
        rotate: -0.5,
        duration: 1.1,
        ease: "power2.out",
      }, "-=0.5")
      .to(ticketRef.current, {
        opacity: 1,
        x: 0,
        y: 0,
        rotate: -6,
        scale: 1,
        duration: 1.1,
        ease: "power2.out",
      }, "-=0.7")
      .to(bloomRef.current, {
        opacity: 1,
        scale: 1,
        x: 0,
        y: 0,
        rotate: -6,
        duration: 1.2,
        ease: "power2.out",
      }, "-=0.8")
      .to(ribbonRef.current, {
        opacity: 0.95,
        scale: 1,
        x: 0,
        y: 0,
        rotate: 0,
        duration: 1.0,
        ease: "power2.inOut",
      }, "-=0.7")

      // -------------------------------------------------------------
      // ACT 3: TRANSFORMATION — VELLUM STRETCHES INTO MILESTONE TIMELINE
      // -------------------------------------------------------------
      .to(timelineMilestonesRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.0,
        ease: "power2.out",
      }, "-=0.3")

      // Settle and quiet reveal of the editorial link
      .to(ctaRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power1.out",
      }, "-=0.4");
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      id="how-it-works"
      data-testid="little-things-scene"
      className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center bg-transparent text-[#240412] px-4 sm:px-6 py-6 sm:py-10 overflow-hidden"
    >
      {/* Peripheral Botanical Edge Presence (Restrained, sparse margin presence) */}
      <AmbientBotanicalFrame variant="dusk" density="sparse" intensity={0.6} />

      <div ref={stageRef} className="w-full max-w-4xl mx-auto flex flex-col items-center text-center relative z-10">
        {/* Subtle Spatial Narrative Eyebrow & Headline */}
        <div className="mb-3 sm:mb-5 space-y-1 sm:space-y-2 max-w-xl mx-auto relative">
          <p className="text-[10px] sm:text-[11px] font-mono tracking-widest uppercase text-[#7A1D45] font-semibold drop-shadow-[0_1px_4px_rgba(255,245,248,0.4)]">
            The Unsealing · Physical Keepsakes
          </p>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-normal text-[#1A0311] tracking-tight leading-tight drop-shadow-[0_1px_10px_rgba(255,245,248,0.5)]">
            Made from little things.
          </h2>
          <p className="text-xs sm:text-base text-[#36091E] font-normal leading-relaxed drop-shadow-[0_1px_8px_rgba(255,245,248,0.5)]">
            A pressed petal, a fold of deckled cotton, a ticket kept from a rainy Tuesday. Love is built from details only they would notice.
          </p>
        </div>

        {/* Spatial 3D Assembly Stage (Open air, physical stationery) */}
        <div className="relative w-full max-w-sm sm:max-w-lg h-[360px] sm:h-[400px] flex items-center justify-center my-2 [perspective:1000px]">
          {/* TICKET FRAGMENT: Physical narrative artifact ('I kept the ticket from that rainy afternoon') */}
          <div
            ref={ticketRef}
            className="absolute -bottom-3 -left-2 sm:-bottom-5 sm:-left-6 z-25 pointer-events-none select-none will-change-transform"
            aria-hidden="true"
          >
            <div className="relative w-28 sm:w-32 py-2 px-2.5 bg-[#FAF3E8]/98 rounded-md border border-amber-900/20 shadow-[0_12px_24px_-6px_rgba(40,10,20,0.22)] backdrop-blur-sm transform rotate-[-6deg]">
              {/* Ticket scalloped/notched punched holes hint */}
              <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#FCE8F0] border-r border-amber-900/20" />
              <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#FCE8F0] border-l border-amber-900/20" />
              <div className="flex flex-col text-left pl-1">
                <span className="text-[7.5px] font-mono uppercase tracking-[0.22em] text-[#7A1D45] font-semibold">
                  FIRST COFFEE
                </span>
                <span className="font-serif italic text-xs text-[#1C0412] font-semibold tracking-tight -mt-0.5">
                  10.14
                </span>
                <div className="flex items-center justify-between mt-1 pt-1 border-t border-amber-900/15 text-[6.5px] font-mono tracking-widest text-[#843657]/80">
                  <span>ADMIT ONE</span>
                  <span>№ 0214</span>
                </div>
              </div>
            </div>
          </div>

          {/* Envelope Body (Shadowed vellum vessel in space) */}
          <div
            ref={envelopeBackRef}
            className="absolute inset-x-2 sm:inset-x-6 inset-y-2 sm:inset-y-4 rounded-3xl bg-gradient-to-b from-[#FFFDF9]/95 to-[#FAF5EE]/90 shadow-[0_32px_80px_-24px_rgba(70,15,35,0.18)] border border-rose-950/[0.08] flex flex-col justify-between p-5 sm:p-7 overflow-hidden will-change-transform"
            style={{
              backgroundImage:
                "radial-gradient(ellipse at 50% 30%, rgba(254, 243, 199, 0.28) 0%, transparent 80%)",
            }}
          >
            {/* 1. Small Atelier Metadata */}
            <div className="flex items-center justify-between text-[9px] sm:text-[10px] font-sans tracking-[0.22em] text-[#843657]/80 font-medium uppercase select-none">
              <span>VALENTINO ATELIER</span>
              <span className="font-mono tracking-wider text-[8px] sm:text-[9px] text-[#A25072]/70">№ 0214</span>
            </div>

            {/* 2. Inner handwritten letter fragment (Dominant emotional quotation layer - clean and unobstructed!) */}
            <div
              ref={letterRef}
              className="my-auto px-5 py-4 sm:px-6 sm:py-5 bg-[#FAF6F0]/98 backdrop-blur-sm rounded-2xl border border-rose-950/[0.07] shadow-[0_4px_24px_-4px_rgba(70,15,35,0.08)] text-left max-w-md mx-auto will-change-transform relative z-10"
            >
              <p className="text-sm sm:text-base md:text-[17px] font-serif text-[#1C0412] leading-[1.65] tracking-tight">
                <span className="font-normal">“I kept the ticket from that rainy afternoon.</span>{" "}
                <span className="italic font-normal text-[#2A051A]">Some moments don&apos;t ask for grand announcements</span>{" "}
                <span className="font-normal">— they just quietly stay forever.”</span>
              </p>
              <p className="mt-3 text-right">
                <span className="font-serif italic text-xs sm:text-[13px] text-[#7A1D45] tracking-wide inline-block transform -rotate-1 select-none font-normal">
                  — for you, always
                </span>
              </p>
            </div>

            {/* 3. Embedded Emotional Timeline (Paper becomes milestone memory path) */}
            <div
              ref={timelineMilestonesRef}
              className="mt-2 pt-2.5 sm:pt-3 border-t border-rose-950/[0.08] flex items-center justify-around text-left gap-1 sm:gap-2 text-[10px] will-change-transform select-none relative z-10"
            >
              <div className="flex items-center gap-1.5">
                {/* Milestone 1: Tiny pressed leaf mark */}
                <svg viewBox="0 0 10 14" fill="none" className="w-2.5 h-3 text-[#881337] shrink-0 opacity-80" aria-hidden="true">
                  <path d="M5 13 C 5 10, 4 7, 2 5 C 4 3, 7 4, 8 7 C 9 10, 7 12, 5 13 Z" fill="currentColor" fillOpacity="0.45" stroke="currentColor" strokeWidth="0.75" />
                  <path d="M5 12 C 5 9, 5 6, 4 5" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" />
                </svg>
                <div className="flex flex-col">
                  <span className="text-[8px] sm:text-[9px] uppercase tracking-wider text-[#7A1D45] font-sans font-semibold">10.14</span>
                  <span className="font-serif italic text-[#1E0412] font-semibold text-[10px] sm:text-[11px]">First Coffee</span>
                </div>
              </div>

              {/* Material seed separator */}
              <div className="w-1 h-1 rounded-full bg-[#881337]/50" />

              <div className="flex items-center gap-1.5">
                {/* Milestone 2: Tiny pressed bud mark */}
                <svg viewBox="0 0 10 14" fill="none" className="w-2.5 h-3 text-[#881337] shrink-0 opacity-80" aria-hidden="true">
                  <path d="M5 13 C 5 9, 6 7, 5 5" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
                  <path d="M5 7 C 3 5, 4 3, 5 2 C 6 3, 7 5, 5 7 Z" fill="currentColor" fillOpacity="0.5" stroke="currentColor" strokeWidth="0.6" />
                  <circle cx="5" cy="2" r="1.2" fill="#BE123C" fillOpacity="0.75" />
                </svg>
                <div className="flex flex-col">
                  <span className="text-[8px] sm:text-[9px] uppercase tracking-wider text-[#7A1D45] font-sans font-semibold">12.24</span>
                  <span className="font-serif italic text-[#1E0412] font-semibold text-[10px] sm:text-[11px]">Midnight Rain</span>
                </div>
              </div>

              {/* Material seed separator */}
              <div className="w-1 h-1 rounded-full bg-[#881337]/50" />

              <div className="flex items-center gap-1.5">
                {/* Milestone 3: Tiny imperfect dried 4-petal flower mark */}
                <svg viewBox="0 0 12 12" fill="none" className="w-2.5 h-2.5 text-[#881337] shrink-0 opacity-85" aria-hidden="true">
                  <g transform="translate(6, 6) scale(0.65)" stroke="currentColor" strokeWidth="0.9" fill="#9F1239" fillOpacity="0.6">
                    <path d="M0 -1 C -1.8 -4, -1.2 -6.5, 0 -7.5 C 1.2 -6.5, 1.8 -4, 0 -1 Z" />
                    <path d="M1 0 C 4 -1.5, 6.5 -1, 7.5 0 C 6.5 1.2, 4 1.8, 1 0 Z" />
                    <path d="M0 1 C 1.5 4, 1 6.5, 0 7.5 C -1.2 6.5, -1.5 4, 0 1 Z" />
                    <path d="M-1 0 C -4 1.5, -6.5 1, -7.5 0 C -6.5 -1.2, -4 -1.8, -1 0 Z" />
                    <circle cx="0" cy="0" r="1.3" fill="#FFF5F7" stroke="#701A36" strokeWidth="0.6" />
                  </g>
                </svg>
                <div className="flex flex-col">
                  <span className="text-[8px] sm:text-[9px] uppercase tracking-wider text-[#7A1D45] font-sans font-semibold">02.14</span>
                  <span className="font-serif italic text-[#1E0412] font-semibold text-[10px] sm:text-[11px]">The Vow</span>
                </div>
              </div>
            </div>
          </div>

          {/* 3D Envelope Flap (Unfolds upward) */}
          <div
            ref={envelopeFlapRef}
            className="absolute top-2 sm:top-4 inset-x-2 sm:inset-x-6 h-16 sm:h-20 rounded-t-3xl bg-gradient-to-b from-[#FFFBF4] to-[#F5EFE6] border-t border-x border-rose-950/[0.06] shadow-sm pointer-events-none will-change-transform"
            style={{
              clipPath: "polygon(0 0, 100% 0, 50% 100%)",
            }}
          />

          {/* BOTANICAL SPECIMEN: Hand-pressed dried specimen resting at the perimeter edge, partially escaping the boundary */}
          <div
            ref={bloomRef}
            className="absolute -top-4 -left-3 sm:-top-6 sm:-left-5 w-20 h-24 sm:w-24 sm:h-28 pointer-events-none select-none z-20 will-change-transform"
            aria-hidden="true"
          >
            <div className="w-full h-full relative drop-shadow-[0_6px_16px_rgba(70,15,35,0.18)]">
              <svg viewBox="0 0 80 96" fill="none" className="w-full h-full transform -rotate-12">
                {/* Slender dried stem running along paper margin */}
                <path
                  d="M18 90 C 22 72, 28 50, 36 32 C 40 24, 46 16, 52 10"
                  stroke="#78350F"
                  strokeWidth="1.2"
                  strokeOpacity="0.5"
                  strokeLinecap="round"
                />
                {/* Delicate dried branchlet */}
                <path
                  d="M32 44 C 24 38, 16 34, 12 36"
                  stroke="#78350F"
                  strokeWidth="0.8"
                  strokeOpacity="0.4"
                  strokeLinecap="round"
                />
                {/* Tiny dried leaf fragment (lower stem) */}
                <path
                  d="M12 36 C 8 32, 10 26, 16 28 C 18 32, 16 35, 12 36 Z"
                  fill="#78350F"
                  fillOpacity="0.25"
                  stroke="#78350F"
                  strokeWidth="0.5"
                  strokeOpacity="0.4"
                />
                {/* Pressed dried petal 1 (top left) */}
                <path
                  d="M44 26 C 36 14, 42 6, 50 8 C 55 10, 52 20, 44 26 Z"
                  fill="#9F1239"
                  fillOpacity="0.42"
                  stroke="#701A36"
                  strokeWidth="0.6"
                  strokeOpacity="0.4"
                />
                {/* Pressed dried petal 2 (top right) */}
                <path
                  d="M48 24 C 58 16, 68 18, 66 26 C 64 32, 54 28, 48 24 Z"
                  fill="#881337"
                  fillOpacity="0.46"
                  stroke="#701A36"
                  strokeWidth="0.6"
                  strokeOpacity="0.4"
                />
                {/* Pressed dried petal 3 (lower right) */}
                <path
                  d="M46 28 C 54 36, 50 46, 42 44 C 36 42, 40 32, 46 28 Z"
                  fill="#BE123C"
                  fillOpacity="0.38"
                  stroke="#881337"
                  strokeWidth="0.6"
                  strokeOpacity="0.4"
                />
                {/* Pressed dried petal 4 (lateral soft fold) */}
                <path
                  d="M42 26 C 30 30, 26 24, 32 18 C 36 16, 40 22, 42 26 Z"
                  fill="#9F1239"
                  fillOpacity="0.4"
                  stroke="#701A36"
                  strokeWidth="0.6"
                  strokeOpacity="0.35"
                />
                {/* Fine dried veins */}
                <path d="M44 26 C 47 18, 49 12, 50 8" stroke="#4C0519" strokeWidth="0.4" strokeOpacity="0.35" strokeLinecap="round" />
                <path d="M48 24 C 56 21, 62 23, 66 26" stroke="#4C0519" strokeWidth="0.4" strokeOpacity="0.35" strokeLinecap="round" />
                {/* Antique dried core */}
                <circle cx="45" cy="25" r="2.5" fill="#78350F" fillOpacity="0.75" />
                <circle cx="45" cy="25" r="1.1" fill="#FEF3C7" fillOpacity="0.85" />
              </svg>
            </div>
          </div>

          {/* PHYSICAL SILK RIBBON: Natural curved draping ribbon exiting off-axis at bottom-right */}
          <div
            ref={ribbonRef}
            className="absolute -bottom-2 right-1 sm:-bottom-4 sm:right-2 w-36 sm:w-44 h-16 pointer-events-none select-none z-15 will-change-transform"
            aria-hidden="true"
          >
            <svg viewBox="0 0 160 60" fill="none" className="w-full h-full drop-shadow-[0_4px_10px_rgba(112,26,54,0.28)]">
              {/* Natural draped ribbon fold path with soft curvature, twist, and sag */}
              <path
                d="M4 12 C 30 18, 65 8, 95 20 C 120 30, 140 45, 156 56"
                stroke="url(#silk-ribbon-gradient)"
                strokeWidth="4.5"
                strokeLinecap="round"
              />
              {/* Soft ribbon highlight strand for fabric sheen */}
              <path
                d="M6 11.5 C 32 17.5, 66 7.5, 96 19.5 C 120 29.5, 140 44, 154 54.5"
                stroke="#FECDD3"
                strokeWidth="1.2"
                strokeOpacity="0.45"
                strokeLinecap="round"
              />
              {/* Asymmetric ribbon tail notch cut */}
              <path
                d="M156 56 L 152 48 L 146 54 Z"
                fill="#881337"
                fillOpacity="0.9"
              />
              <defs>
                <linearGradient id="silk-ribbon-gradient" x1="0" y1="0" x2="160" y2="60" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#701A36" stopOpacity="0.9" />
                  <stop offset="45%" stopColor="#BE123C" stopOpacity="0.95" />
                  <stop offset="80%" stopColor="#9F1239" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#4C0519" stopOpacity="0.85" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Tiny Pressed Botanical Sprig Accent at letter margin */}
          <div
            ref={sealRef}
            className="absolute bottom-9 right-4 sm:right-6 sm:bottom-10 z-30 pointer-events-none select-none will-change-transform"
            aria-hidden="true"
          >
            <div className="relative w-[22px] h-[22px] sm:w-[28px] sm:h-[28px] flex items-center justify-center filter drop-shadow-[0_1px_3px_rgba(136,19,55,0.18)]">
              <svg viewBox="0 0 32 32" fill="none" className="w-full h-full transform -rotate-12">
                <path
                  d="M6 28 C 11 21, 15 15, 20 6"
                  stroke="#881337"
                  strokeOpacity="0.5"
                  strokeWidth="1.1"
                  strokeLinecap="round"
                />
                <path
                  d="M10 22 C 6 18, 7 13, 12 17 C 12 20, 11 22, 10 22 Z"
                  fill="#881337"
                  fillOpacity="0.28"
                  stroke="#881337"
                  strokeOpacity="0.45"
                  strokeWidth="0.65"
                />
                <path
                  d="M14 15 C 18 11, 22 14, 17 18 C 15 17, 14 16, 14 15 Z"
                  fill="#881337"
                  fillOpacity="0.24"
                  stroke="#881337"
                  strokeOpacity="0.4"
                  strokeWidth="0.65"
                />
                <g transform="translate(20, 6) rotate(15)">
                  <path
                    d="M0 0 C -2 -3, -1.5 -5, 0 -6 C 1.5 -5, 2 -3, 0 0 Z"
                    fill="#BE123C"
                    fillOpacity="0.4"
                    stroke="#881337"
                    strokeOpacity="0.55"
                    strokeWidth="0.65"
                  />
                  <path
                    d="M0 -1 C 2.5 -2.5, 4.5 -1, 3.5 0.5 C 2 1.5, 0 0, 0 -1 Z"
                    fill="#9F1239"
                    fillOpacity="0.32"
                    stroke="#881337"
                    strokeOpacity="0.45"
                    strokeWidth="0.55"
                  />
                  <circle cx="0.2" cy="-1.5" r="0.9" fill="#881337" fillOpacity="0.6" />
                </g>
              </svg>
            </div>
          </div>
        </div>

        {/* Editorial Action Link (Integrated into composition, using standard Link) */}
        <div ref={ctaRef} className="mt-4 flex flex-col items-center gap-1.5 will-change-transform">
          <Link
            href="/create"
            className="group inline-flex items-center gap-2 text-base sm:text-lg font-serif font-medium text-[#1A0311] hover:text-[#9F1239] transition-colors drop-shadow-[0_1px_6px_rgba(255,245,248,0.4)]"
          >
            <span className="underline decoration-rose-500 underline-offset-6 group-hover:decoration-rose-700 transition-all font-semibold">
              Make yours
            </span>
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5 font-sans">
              →
            </span>
          </Link>
          <p className="text-xs text-[#36091E] font-medium drop-shadow-[0_1px_8px_rgba(255,245,248,0.75)]">
            No design experience required. Takes about five minutes.
          </p>
        </div>
      </div>
    </div>
  );
}
