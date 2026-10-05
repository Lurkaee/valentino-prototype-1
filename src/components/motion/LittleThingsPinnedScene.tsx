"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CurtainLink } from "./PageCurtains";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * LittleThingsPinnedScene:
 * Physical stationery assembly scene appearing in the air over soft drifting clouds.
 *
 * Sequence Narrative:
 * As the user scrolls into this section, the viewport pins gracefully:
 * 01 Artisanal deckled cotton paper floats in with gentle tilt
 * 02 Crimson rose bloom glides in softly with natural organic rotation
 * 03 Velvet crimson ribbon sweeps across with tactile fabric depth
 * 04 Intimate handwritten love letter fragment unfurls on translucent vellum
 * 05 Wax seal talisman stamps into place with subtle tactile settle
 * 06 Subtle multi-layer parallax responds to scroll velocity
 * 07 CTA "Make yours →" seamlessly anchors the composition
 */
export function LittleThingsPinnedScene() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);

  // Material item refs
  const paperRef = useRef<HTMLDivElement | null>(null);
  const bloomRef = useRef<HTMLDivElement | null>(null);
  const ribbonRef = useRef<HTMLDivElement | null>(null);
  const noteRef = useRef<HTMLDivElement | null>(null);
  const sealRef = useRef<HTMLDivElement | null>(null);
  const captionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !containerRef.current || !stageRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=150%",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      // Initial state: Physical stationery floating in the air with spatial depth
      gsap.set(paperRef.current, {
        scale: 0.94,
        opacity: 0.8,
        y: 35,
        rotate: -2.5,
      });
      gsap.set(bloomRef.current, {
        scale: 0.65,
        opacity: 0,
        x: -55,
        y: -35,
        rotate: -22,
      });
      gsap.set(ribbonRef.current, {
        scaleX: 0.05,
        opacity: 0,
        transformOrigin: "left center",
      });
      gsap.set(noteRef.current, {
        opacity: 0,
        y: 30,
        rotate: 2.5,
        scale: 0.96,
      });
      gsap.set(sealRef.current, {
        scale: 1.5,
        opacity: 0,
        filter: "blur(4px)",
        y: -25,
      });
      gsap.set(captionRef.current, {
        opacity: 0.85,
        y: 10,
      });

      // Step 1: Blank handmade deckled paper floats into the air
      tl.to(paperRef.current, {
        scale: 1,
        opacity: 1,
        y: 0,
        rotate: -1.2,
        duration: 1.1,
        ease: "power2.out",
      })
      // Step 2: Pressed flower bloom sweeps in with organic rotation and depth
      .to(bloomRef.current, {
        scale: 1,
        opacity: 1,
        x: 0,
        y: 0,
        rotate: -7,
        duration: 1.2,
        ease: "back.out(1.2)",
      }, "-=0.5")
      // Step 3: Silk velvet ribbon sweeps across with rich fabric sheen
      .to(ribbonRef.current, {
        scaleX: 1,
        opacity: 0.95,
        duration: 1.1,
        ease: "power2.inOut",
      }, "-=0.6")
      // Step 4: Intimate handwritten letter fragment unfurls onto the sheet
      .to(noteRef.current, {
        opacity: 1,
        y: 0,
        rotate: 0.5,
        scale: 1,
        duration: 1.2,
        ease: "power2.out",
      }, "-=0.6")
      // Step 5: Wax seal presses down with a subtle tactile settle squash
      .to(sealRef.current, {
        scale: 1,
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.9,
        ease: "back.out(1.4)",
      }, "-=0.4")
      // Step 6: Parallax drifting settle as scroll continues
      .to(paperRef.current, {
        y: -10,
        rotate: -0.5,
        duration: 1.0,
        ease: "none",
      }, "+=0.1")
      .to(bloomRef.current, {
        y: -18,
        rotate: -5,
        duration: 1.0,
        ease: "none",
      }, "<")
      .to(noteRef.current, {
        y: -12,
        duration: 1.0,
        ease: "none",
      }, "<")
      .to(sealRef.current, {
        y: -8,
        duration: 1.0,
        ease: "none",
      }, "<")
      .to(captionRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power1.out",
      }, "-=0.8");
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      id="how-it-works"
      data-testid="little-things-scene"
      className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center bg-transparent text-[#240412] px-6 py-12 overflow-hidden"
    >
      <div ref={stageRef} className="w-full max-w-4xl mx-auto flex flex-col items-center text-center relative z-10">
        {/* Subtle Editorial Header */}
        <div className="mb-6 space-y-2">
          <p className="text-[11px] font-mono tracking-widest uppercase text-[#9C3862]">
            Crafted Layer By Layer
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-[#240412] tracking-tight leading-tight">
            Made from little things.
          </h2>
          <p className="text-sm sm:text-base text-[#5E2640] max-w-lg mx-auto font-light leading-relaxed">
            A pressed petal, a fold of deckled cotton, a line written late at night. Love is built from details only they would notice.
          </p>
        </div>

        {/* Pinned Physical Assembly Canvas (Physical Stationery in the Air) */}
        <div className="relative w-full max-w-md sm:max-w-lg h-[360px] sm:h-[400px] flex items-center justify-center my-2">
          {/* 01: Deckled Paper Sheet with tactile cotton depth */}
          <div
            ref={paperRef}
            className="absolute inset-2 sm:inset-4 rounded-3xl bg-[#FFFDF9] shadow-[0_30px_70px_-20px_rgba(70,15,35,0.16)] border border-rose-950/[0.08] p-6 sm:p-7 flex flex-col justify-between overflow-hidden will-change-transform"
            style={{
              backgroundImage:
                "radial-gradient(ellipse at 50% 40%, rgba(254, 243, 199, 0.22) 0%, transparent 80%)",
            }}
          >
            {/* Subtle paper grain and deckled border edge */}
            <div className="flex items-center justify-between text-[10px] font-mono text-stone-400 tracking-wider">
              <span>VALENTINO ATELIER</span>
              <span>KEEPSAKE NO. 0214</span>
            </div>

            {/* 04: Handwritten Letter Fragment on Translucent Vellum */}
            <div
              ref={noteRef}
              className="my-auto px-5 py-4 bg-[#FAF6F0]/95 backdrop-blur-sm rounded-2xl border border-rose-950/[0.06] shadow-sm text-left max-w-sm mx-auto will-change-transform"
            >
              <p className="text-xs sm:text-sm font-serif italic text-[#3B0E23] leading-relaxed">
                “I kept the ticket from that rainy afternoon. Some moments don&apos;t ask for grand announcements — they just quietly stay forever.”
              </p>
              <p className="text-[10px] font-mono text-[#8C3A62] mt-2.5 text-right">
                — for you, always
              </p>
            </div>

            <div className="flex items-center justify-between text-[10px] text-stone-400 font-serif italic">
              <span>Deckled Cotton · Crimson Rose · Gold Seal</span>
              <span>1 of 1</span>
            </div>
          </div>

          {/* 02: Pressed Flower Bloom (Artisanal Botanical Specimen) */}
          <div
            ref={bloomRef}
            className="absolute top-3 left-3 sm:top-4 sm:left-6 w-14 h-14 sm:w-16 sm:h-16 pointer-events-none select-none z-20 will-change-transform"
          >
            <div className="w-full h-full relative drop-shadow-[0_6px_16px_rgba(225,29,72,0.28)]">
              <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
                {/* Outer Petals */}
                <ellipse cx="32" cy="18" rx="9" ry="14" fill="#BE123C" fillOpacity="0.85" transform="rotate(-15 32 18)" />
                <ellipse cx="44" cy="24" rx="9" ry="13" fill="#E11D48" fillOpacity="0.9" transform="rotate(40 44 24)" />
                <ellipse cx="44" cy="40" rx="9" ry="14" fill="#BE123C" fillOpacity="0.85" transform="rotate(95 44 40)" />
                <ellipse cx="32" cy="46" rx="9" ry="13" fill="#E11D48" fillOpacity="0.9" transform="rotate(165 32 46)" />
                <ellipse cx="20" cy="38" rx="9" ry="14" fill="#9F1239" fillOpacity="0.85" transform="rotate(-130 20 38)" />
                <ellipse cx="20" cy="24" rx="9" ry="13" fill="#E11D48" fillOpacity="0.9" transform="rotate(-65 20 24)" />
                {/* Inner Velvet Core */}
                <circle cx="32" cy="32" r="10" fill="#881337" fillOpacity="0.95" />
                <circle cx="32" cy="32" r="6" fill="#F43F5E" fillOpacity="0.9" />
                <circle cx="32" cy="32" r="2.5" fill="#FFE4E6" />
                {/* Botanical stem hint */}
                <path d="M22 42 Q 18 52 14 56" stroke="#4C1D95" strokeOpacity="0.4" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          {/* 03: Silk Velvet Crimson Ribbon Band */}
          <div
            ref={ribbonRef}
            className="absolute bottom-14 inset-x-4 sm:inset-x-8 h-3.5 sm:h-4 bg-gradient-to-r from-[#881337] via-[#E11D48] to-[#881337] shadow-[0_4px_14px_rgba(159,18,57,0.35)] z-15 pointer-events-none rounded-full will-change-transform"
          />

          {/* 05: Tactile Wax Seal Talisman with Embossed Monogram */}
          <div
            ref={sealRef}
            className="absolute bottom-8 right-6 sm:right-10 z-30 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-[#E11D48] via-[#BE123C] to-[#881337] border-2 border-amber-200/90 shadow-[0_8px_24px_rgba(159,18,57,0.45)] flex items-center justify-center text-white will-change-transform"
          >
            <span className="font-serif text-base sm:text-lg font-bold tracking-widest text-amber-100 select-none filter drop-shadow">
              V
            </span>
          </div>
        </div>

        {/* 06: Editorial Action Link (Integrated into the Composition) */}
        <div ref={captionRef} className="mt-4 flex flex-col items-center gap-2 will-change-transform">
          <CurtainLink
            href="/create"
            className="group inline-flex items-center gap-2 text-base sm:text-lg font-serif font-medium text-[#240412] hover:text-[#9F1239] transition-colors"
          >
            <span className="underline decoration-rose-400 underline-offset-6 group-hover:decoration-rose-600 transition-all">
              Make yours
            </span>
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5 font-sans">
              →
            </span>
          </CurtainLink>
          <p className="text-xs text-[#5E2640]/80 font-light">
            No design experience required. Takes about five minutes.
          </p>
        </div>
      </div>
    </div>
  );
}
