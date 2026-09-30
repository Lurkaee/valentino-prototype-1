"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CurtainLink } from "./PageCurtains";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * LittleThingsPinnedScene:
 * A pinned editorial scroll sequence replacing the builder UI on `/`.
 *
 * Sequence Narrative:
 * As the user scrolls into this section, the viewport pins gracefully:
 * 01 Blank handmade deckled paper settles in
 * 02 Crimson rose bloom glides in softly
 * 03 Velvet crimson ribbon sweeps across
 * 04 Intimate handwritten love letter fragment unfurls
 * 05 Wax seal talisman presses into place
 * 06 Subtle composition locks into a finished tactile piece
 * 07 Section seamlessly releases into the Living Worlds
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
          end: "+=160%",
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
        },
      });

      // Initial state: material elements reveal dynamically on scroll
      gsap.set(paperRef.current, { scale: 0.96, opacity: 0.85, y: 20 });
      gsap.set(bloomRef.current, { scale: 0.7, opacity: 0.2, x: -40, y: -20, rotate: -15 });
      gsap.set(ribbonRef.current, { scaleX: 0.1, opacity: 0.3, transformOrigin: "left center" });
      gsap.set(noteRef.current, { opacity: 0.4, y: 20, rotate: 1 });
      gsap.set(sealRef.current, { scale: 1.4, opacity: 0.3, filter: "blur(2px)" });
      gsap.set(captionRef.current, { opacity: 0.95, y: 0 });

      // Step 1: Blank paper settles in
      tl.to(paperRef.current, {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
      })
      // Step 2: Flower bloom sweeps in
      .to(bloomRef.current, {
        scale: 1,
        opacity: 1,
        x: 0,
        y: 0,
        rotate: -6,
        duration: 1.2,
        ease: "back.out(1.2)",
      }, "-=0.4")
      // Step 3: Ribbon sweeps across
      .to(ribbonRef.current, {
        scaleX: 1,
        opacity: 0.9,
        duration: 1.1,
        ease: "power2.inOut",
      }, "-=0.5")
      // Step 4: Handwritten letter note appears
      .to(noteRef.current, {
        opacity: 1,
        y: 0,
        rotate: 0,
        duration: 1.2,
        ease: "power2.out",
      }, "-=0.6")
      // Step 5: Wax seal presses down
      .to(sealRef.current, {
        scale: 1,
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.9,
        ease: "back.out(1.5)",
      }, "-=0.4")
      // Step 6: Editorial caption fades up
      .to(captionRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
      }, "-=0.2");
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      id="how-it-works"
      data-testid="little-things-scene"
      className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center bg-gradient-to-b from-[#FDF8F3] via-[#FAF4ED] to-[#F5ECE3] text-[#240412] px-6 py-12 overflow-hidden"
    >
      {/* Background Soft Atmosphere Texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 mix-blend-soft-light"
        style={{
          backgroundImage: "radial-gradient(circle at 50% 40%, rgba(244, 114, 182, 0.15) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div ref={stageRef} className="w-full max-w-4xl mx-auto flex flex-col items-center text-center relative z-10">
        {/* Subtle Editorial Header */}
        <div className="mb-8 space-y-2">
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

        {/* Pinned Physical Assembly Canvas */}
        <div className="relative w-full max-w-md sm:max-w-lg h-[340px] sm:h-[380px] flex items-center justify-center my-4">
          {/* 01: Deckled Paper Sheet */}
          <div
            ref={paperRef}
            className="absolute inset-2 sm:inset-4 rounded-3xl bg-[#FFFDF9] shadow-[0_20px_50px_-15px_rgba(70,20,40,0.12)] border border-stone-200/60 p-6 flex flex-col justify-between overflow-hidden"
            style={{
              backgroundImage: "radial-gradient(ellipse at 50% 50%, rgba(254, 243, 199, 0.18) 0%, transparent 80%)",
            }}
          >
            {/* Subtle paper grain and deckled border edge */}
            <div className="flex items-center justify-between text-[10px] font-mono text-stone-400 tracking-wider">
              <span>VALENTINO CRAFT</span>
              <span>NO. 0214</span>
            </div>

            {/* 04: Handwritten Letter Fragment */}
            <div
              ref={noteRef}
              className="my-auto px-5 py-4 bg-[#FAF6F0]/90 rounded-2xl border border-stone-200/50 shadow-sm text-left max-w-sm mx-auto"
            >
              <p className="text-xs sm:text-sm font-serif italic text-[#3B0E23] leading-relaxed">
                “I kept the train ticket from that rainy Tuesday. Some moments don&apos;t ask for grand announcements — they just quietly stay forever.”
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

          {/* 02: Pressed Flower Bloom */}
          <div
            ref={bloomRef}
            className="absolute top-4 left-4 sm:left-6 w-16 h-16 sm:w-20 sm:h-20 pointer-events-none select-none z-20"
          >
            <div className="w-full h-full relative drop-shadow-[0_6px_14px_rgba(225,29,72,0.3)]">
              <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-[#E11D48]">
                <circle cx="50" cy="50" r="30" fill="currentColor" fillOpacity="0.9" />
                <path
                  d="M50 20 C60 35, 75 35, 80 50 C85 65, 65 75, 50 80 C35 75, 15 65, 20 50 C25 35, 40 35, 50 20 Z"
                  fill="#9F1239"
                  fillOpacity="0.75"
                />
                <circle cx="50" cy="50" r="14" fill="#FFE4E6" fillOpacity="0.85" />
              </svg>
            </div>
          </div>

          {/* 03: Velvet Ribbon Band */}
          <div
            ref={ribbonRef}
            className="absolute bottom-16 inset-x-2 sm:inset-x-4 h-3.5 sm:h-4 bg-gradient-to-r from-[#9F1239] via-[#E11D48] to-[#9F1239] shadow-[0_2px_8px_rgba(159,18,57,0.3)] z-15 pointer-events-none rounded-full"
          />

          {/* 05: Wax Seal Talisman */}
          <div
            ref={sealRef}
            className="absolute bottom-11 right-8 sm:right-12 z-30 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-[#E11D48] via-[#BE123C] to-[#881337] border-2 border-amber-200/80 shadow-[0_6px_20px_rgba(159,18,57,0.4)] flex items-center justify-center text-white"
          >
            <span className="font-serif text-base sm:text-lg font-bold tracking-widest text-amber-100 select-none">
              V
            </span>
          </div>
        </div>

        {/* 06: Editorial Action Link */}
        <div ref={captionRef} className="mt-6 flex flex-col items-center gap-2">
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
          <p className="text-xs text-stone-500 font-light">
            No design experience required. Takes about five minutes.
          </p>
        </div>
      </div>
    </div>
  );
}
