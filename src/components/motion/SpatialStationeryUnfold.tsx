"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
        rotateX: 10,
        rotateY: -8,
        y: 30,
      });

      gsap.set(envelopeFlapRef.current, {
        rotateX: 0,
        transformOrigin: "top center",
      });

      gsap.set(letterRef.current, {
        opacity: 0.85,
        y: 40,
        scale: 0.92,
        rotate: -1.5,
      });

      gsap.set(bloomRef.current, {
        opacity: 0,
        scale: 0.5,
        x: -80,
        y: -40,
        rotate: -35,
      });

      gsap.set(ribbonRef.current, {
        opacity: 0,
        scaleX: 0.1,
        transformOrigin: "left center",
      });

      gsap.set(sealRef.current, {
        opacity: 0.95,
        scale: 1.1,
        y: 0,
      });

      gsap.set(timelineMilestonesRef.current, {
        opacity: 0,
        y: 35,
      });

      gsap.set(ctaRef.current, {
        opacity: 0.7,
        y: 15,
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
        scale: 1.25,
        y: -30,
        opacity: 0.95,
        duration: 0.7,
        ease: "back.out(1.5)",
      }, "-=0.6")

      // -------------------------------------------------------------
      // ACT 2: DISPERSAL — LETTER RISES, BOTANICAL PETALS & RIBBON DRIFT
      // -------------------------------------------------------------
      .to(letterRef.current, {
        y: -15,
        scale: 1,
        opacity: 1,
        rotate: -0.5,
        duration: 1.1,
        ease: "power2.out",
      }, "-=0.5")
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
        scaleX: 1,
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
      <div ref={stageRef} className="w-full max-w-4xl mx-auto flex flex-col items-center text-center relative z-10">
        {/* Subtle Spatial Narrative Eyebrow & Headline */}
        <div className="mb-3 sm:mb-5 space-y-1 sm:space-y-2 max-w-xl mx-auto">
          <p className="text-[10px] sm:text-[11px] font-mono tracking-widest uppercase text-[#9C3862]">
            The Unsealing · Physical Keepsakes
          </p>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-normal text-[#240412] tracking-tight leading-tight">
            Made from little things.
          </h2>
          <p className="text-xs sm:text-base text-[#5E2640] font-light leading-relaxed">
            A pressed petal, a fold of deckled cotton, a ticket kept from a rainy Tuesday. Love is built from details only they would notice.
          </p>
        </div>

        {/* Spatial 3D Assembly Stage (Open air, no boxy card border!) */}
        <div className="relative w-full max-w-sm sm:max-w-lg h-[340px] sm:h-[380px] flex items-center justify-center my-2 [perspective:1000px]">
          {/* Envelope Body (Shadowed vellum vessel in space) */}
          <div
            ref={envelopeBackRef}
            className="absolute inset-x-2 sm:inset-x-6 inset-y-2 sm:inset-y-4 rounded-3xl bg-gradient-to-b from-[#FFFDF9]/95 to-[#FAF5EE]/90 shadow-[0_32px_80px_-24px_rgba(70,15,35,0.18)] border border-rose-950/[0.06] flex flex-col justify-between p-5 sm:p-7 overflow-hidden will-change-transform"
            style={{
              backgroundImage:
                "radial-gradient(ellipse at 50% 30%, rgba(254, 243, 199, 0.28) 0%, transparent 80%)",
            }}
          >
            {/* Atelier Deckled Heading */}
            <div className="flex items-center justify-between text-[10px] font-mono text-stone-400 tracking-wider">
              <span>VALENTINO ATELIER</span>
              <span>KEEPSAKE NO. 0214</span>
            </div>

            {/* Inner handwritten letter fragment */}
            <div
              ref={letterRef}
              className="my-auto px-4 py-3 sm:px-5 sm:py-4 bg-[#FAF6F0]/95 backdrop-blur-sm rounded-2xl border border-rose-950/[0.06] shadow-sm text-left max-w-sm mx-auto will-change-transform"
            >
              <p className="text-xs sm:text-sm font-serif italic text-[#3B0E23] leading-relaxed">
                “I kept the ticket from that rainy afternoon. Some moments don&apos;t ask for grand announcements — they just quietly stay forever.”
              </p>
              <p className="text-[10px] font-mono text-[#8C3A62] mt-2 text-right">
                — for you, always
              </p>
            </div>

            {/* Embedded Emotional Timeline Ribbon (Paper becomes timeline) */}
            <div
              ref={timelineMilestonesRef}
              className="mt-2 pt-2 sm:pt-3 border-t border-rose-950/[0.08] flex items-center justify-around text-left gap-1 sm:gap-2 text-[10px] font-mono text-[#5E2640]/90 will-change-transform"
            >
              <div className="flex flex-col">
                <span className="text-[8px] sm:text-[9px] uppercase tracking-wider text-[#9C3862] font-semibold">10.14</span>
                <span className="font-serif italic text-[#3B0E23] text-[10px] sm:text-[11px]">First Coffee</span>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-rose-400/80" />
              <div className="flex flex-col">
                <span className="text-[8px] sm:text-[9px] uppercase tracking-wider text-[#9C3862] font-semibold">12.24</span>
                <span className="font-serif italic text-[#3B0E23] text-[10px] sm:text-[11px]">Midnight Rain</span>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-rose-400/80" />
              <div className="flex flex-col">
                <span className="text-[8px] sm:text-[9px] uppercase tracking-wider text-[#9C3862] font-semibold">02.14</span>
                <span className="font-serif italic text-[#3B0E23] text-[10px] sm:text-[11px]">The Vow</span>
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

          {/* Floating Artisanal Pressed Botanical Bloom (Left foreground) */}
          <div
            ref={bloomRef}
            className="absolute top-2 left-2 sm:left-4 w-14 h-14 sm:w-16 sm:h-16 pointer-events-none select-none z-20 will-change-transform"
          >
            <div className="w-full h-full relative drop-shadow-[0_8px_18px_rgba(225,29,72,0.32)]">
              <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
                {/* Botanical Petals */}
                <ellipse cx="32" cy="18" rx="9" ry="14" fill="#BE123C" fillOpacity="0.88" transform="rotate(-15 32 18)" />
                <ellipse cx="44" cy="24" rx="9" ry="13" fill="#E11D48" fillOpacity="0.92" transform="rotate(40 44 24)" />
                <ellipse cx="44" cy="40" rx="9" ry="14" fill="#BE123C" fillOpacity="0.88" transform="rotate(95 44 40)" />
                <ellipse cx="32" cy="46" rx="9" ry="13" fill="#E11D48" fillOpacity="0.92" transform="rotate(165 32 46)" />
                <ellipse cx="20" cy="38" rx="9" ry="14" fill="#9F1239" fillOpacity="0.88" transform="rotate(-130 20 38)" />
                <ellipse cx="20" cy="24" rx="9" ry="13" fill="#E11D48" fillOpacity="0.92" transform="rotate(-65 20 24)" />
                {/* Velvet Core */}
                <circle cx="32" cy="32" r="10" fill="#881337" fillOpacity="0.95" />
                <circle cx="32" cy="32" r="6" fill="#F43F5E" fillOpacity="0.9" />
                <circle cx="32" cy="32" r="2.5" fill="#FFE4E6" />
                {/* Stem hint */}
                <path d="M22 42 Q 18 52 14 56" stroke="#4C1D95" strokeOpacity="0.4" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          {/* Crimson Velvet Silk Ribbon (Billows across) */}
          <div
            ref={ribbonRef}
            className="absolute bottom-20 inset-x-2 sm:inset-x-6 h-3.5 sm:h-4 bg-gradient-to-r from-[#881337] via-[#E11D48] to-[#881337] shadow-[0_4px_14px_rgba(159,18,57,0.35)] z-15 pointer-events-none rounded-full will-change-transform"
          />

          {/* Floating Tactile Wax Seal Talisman */}
          <div
            ref={sealRef}
            className="absolute bottom-12 right-6 sm:right-10 z-30 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-[#E11D48] via-[#BE123C] to-[#881337] border-2 border-amber-200/90 shadow-[0_8px_24px_rgba(159,18,57,0.45)] flex items-center justify-center text-white will-change-transform"
          >
            <span className="font-serif text-base sm:text-lg font-bold tracking-widest text-amber-100 select-none filter drop-shadow">
              V
            </span>
          </div>
        </div>

        {/* Editorial Action Link (Integrated into composition, using standard Link) */}
        <div ref={ctaRef} className="mt-4 flex flex-col items-center gap-1.5 will-change-transform">
          <Link
            href="/create"
            className="group inline-flex items-center gap-2 text-base sm:text-lg font-serif font-medium text-[#240412] hover:text-[#9F1239] transition-colors"
          >
            <span className="underline decoration-rose-400 underline-offset-6 group-hover:decoration-rose-600 transition-all">
              Make yours
            </span>
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5 font-sans">
              →
            </span>
          </Link>
          <p className="text-xs text-[#5E2640]/80 font-light">
            No design experience required. Takes about five minutes.
          </p>
        </div>
      </div>
    </div>
  );
}
