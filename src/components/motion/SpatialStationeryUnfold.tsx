"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AmbientBotanicalFrame } from "@/components/motion/AmbientBotanicalFrame";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * SpatialStationeryUnfold (Phase 7 Spatial Composition Reset):
 * Authentic editorial stationery still life inspired by Japanese and Dark Academia letter sets.
 *
 * Visual Rules:
 * 1. Single dominant handmade cotton paper sheet with organic deckled edges (no nested cards).
 * 2. Real transparent botanical specimen with natural anatomy and contact shadow.
 * 3. Vintage coffee ticket tucked naturally beneath the lower-left edge.
 * 4. Spacious, unobstructed editorial typography directly on the cotton paper.
 * 5. Completely unencumbered CTA with generous negative space.
 */
export function SpatialStationeryUnfold() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const paperSheetRef = useRef<HTMLDivElement | null>(null);
  const botanicalRef = useRef<HTMLDivElement | null>(null);
  const ticketRef = useRef<HTMLDivElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set([paperSheetRef.current, botanicalRef.current, ticketRef.current, ctaRef.current], {
          opacity: 1,
          y: 0,
          scale: 1,
        });
        return;
      }

      // Physical settle of the stationery still life as user scrolls into view
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "top 25%",
          scrub: 0.8,
        },
      });

      // Initial resting state in space
      gsap.set(paperSheetRef.current, {
        opacity: 0.9,
        y: 25,
        rotate: -1,
        scale: 0.97,
      });

      gsap.set(botanicalRef.current, {
        opacity: 0,
        y: -18,
        x: -12,
        rotate: -15,
        scale: 0.92,
      });

      gsap.set(ticketRef.current, {
        opacity: 0,
        y: 18,
        rotate: 9,
        scale: 0.94,
      });

      gsap.set(ctaRef.current, {
        opacity: 0.7,
        y: 12,
      });

      // Choreographed arrival
      tl.to(paperSheetRef.current, {
        opacity: 1,
        y: 0,
        rotate: -0.5,
        scale: 1,
        duration: 1,
        ease: "power2.out",
      })
      .to(botanicalRef.current, {
        opacity: 1,
        y: 0,
        x: 0,
        rotate: -8,
        scale: 1,
        duration: 0.8,
        ease: "power2.out",
      }, "-=0.6")
      .to(ticketRef.current, {
        opacity: 1,
        y: 0,
        rotate: 5,
        scale: 1,
        duration: 0.7,
        ease: "power2.out",
      }, "-=0.5")
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
      className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center bg-transparent text-[#240412] px-4 sm:px-6 pt-12 sm:pt-16 pb-12 sm:pb-16 overflow-hidden"
    >
      {/* Restrained peripheral botanical framing at empty margins */}
      <AmbientBotanicalFrame variant="dusk" density="sparse" intensity={0.35} />

      <div className="w-full max-w-4xl mx-auto flex flex-col items-center text-center relative z-10">
        {/* Editorial Eyebrow & Headline */}
        <div className="mb-4 sm:mb-6 space-y-1.5 max-w-xl mx-auto relative">
          <p className="text-[10px] sm:text-[11px] font-mono tracking-widest uppercase text-[#7A1D45] font-semibold drop-shadow-[0_1px_4px_rgba(255,245,248,0.4)]">
            The Unsealing · Physical Keepsakes
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-[#1A0311] tracking-tight leading-tight drop-shadow-[0_1px_10px_rgba(255,245,248,0.5)]">
            Made from little things.
          </h2>
          <p className="text-xs sm:text-base text-[#36091E] font-normal leading-relaxed drop-shadow-[0_1px_8px_rgba(255,245,248,0.5)]">
            A pressed petal, a fold of deckled cotton, a ticket kept from a rainy Tuesday. Love is built from details only they would notice.
          </p>
        </div>

        {/* ============================================================== */}
        {/* THE STATIONERY STILL LIFE (ONE SINGLE AUTHENTIC PAPER SHEET)    */}
        {/* ============================================================== */}
        <div className="relative w-full max-w-[400px] sm:max-w-[440px] md:max-w-[480px] my-2 flex justify-center [perspective:1200px]">
          
          {/* AUTHENTIC PRESSED BOTANICAL SPECIMEN: Restrained herbarium specimen pinned naturally onto paper corner */}
          <div
            ref={botanicalRef}
            className="absolute -top-7 -left-5 sm:-top-9 sm:-left-7 w-20 sm:w-24 h-28 sm:h-36 z-30 pointer-events-none select-none drop-shadow-[0_8px_16px_rgba(60,15,30,0.22)] will-change-transform opacity-90"
            aria-hidden="true"
          >
            <div className="relative w-full h-full">
              <Image
                src="/assets/stationery/pressed_botanical.png"
                alt="Authentic pressed botanical specimen"
                fill
                sizes="(max-width: 640px) 80px, 104px"
                className="object-contain"
                priority
                unoptimized
              />
            </div>
          </div>

          {/* VINTAGE COFFEE TICKET STUB: Tucked under bottom-left deckled edge */}
          <div
            ref={ticketRef}
            className="absolute -bottom-5 -left-4 sm:-bottom-6 sm:-left-6 z-25 pointer-events-none select-none will-change-transform"
            aria-hidden="true"
          >
            <div className="relative w-28 sm:w-36 py-2 px-3 bg-[#FAF3E8] rounded-xs border border-amber-900/30 shadow-[0_12px_24px_-4px_rgba(40,10,20,0.28)] backdrop-blur-xs">
              {/* Notched ticket punch cuts on sides */}
              <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#FAF3E8] border-r border-amber-900/30" />
              <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#FAF3E8] border-l border-amber-900/30" />
              
              <div className="flex flex-col text-left pl-1">
                <span className="text-[7px] sm:text-[8px] font-mono uppercase tracking-[0.22em] text-[#7A1D45] font-semibold">
                  FIRST COFFEE
                </span>
                <span className="font-serif italic text-xs sm:text-sm text-[#1C0412] font-semibold tracking-tight -mt-0.5">
                  10.14
                </span>
                <div className="flex items-center justify-between mt-0.5 pt-0.5 border-t border-amber-900/20 text-[6.5px] sm:text-[7.5px] font-mono tracking-widest text-[#843657]/80">
                  <span>ADMIT ONE</span>
                  <span>№ 0214</span>
                </div>
              </div>
            </div>
          </div>

          {/* THE SINGLE HERO HANDMADE DECKLED COTTON PAPER SHEET */}
          <div
            ref={paperSheetRef}
            className="relative w-full aspect-[520/704] p-7 sm:p-10 md:p-11 text-[#1C0412] will-change-transform text-left flex flex-col justify-between drop-shadow-[0_28px_60px_rgba(70,15,35,0.25)]"
          >
            {/* The authentic deckled cotton paper background substrate */}
            <div className="absolute inset-0 z-0 pointer-events-none select-none">
              <Image
                src="/assets/stationery/deckled_paper.png"
                alt="Handmade deckled paper sheet"
                fill
                sizes="(max-width: 640px) 420px, 500px"
                className="object-fill"
                priority
                unoptimized
              />
            </div>

            {/* Real HTML Editorial Content Layer resting naturally on the cotton paper */}
            <div className="relative z-10 flex flex-col justify-between h-full pt-4 sm:pt-6 pb-2">
              {/* 1. Atelier colophon */}
              <div className="flex items-center justify-between text-[9px] sm:text-[10px] font-sans tracking-[0.24em] text-[#843657]/75 font-medium uppercase select-none pb-4 border-b border-[#7A1D45]/15">
                <span>VALENTINO ATELIER</span>
                <span className="font-mono tracking-wider text-[8px] sm:text-[9px] text-[#A25072]/70">ARCHIVE № 0214</span>
              </div>

              {/* 2. Dominant, unobstructed letterpress quotation */}
              <div className="py-5 sm:py-7">
                <p className="text-base sm:text-lg md:text-[20px] font-serif text-[#1C0412] leading-[1.7] tracking-tight drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
                  <span className="font-normal">“I kept the ticket from that rainy afternoon.</span>{" "}
                  <span className="italic font-normal text-[#2A051A]">Some moments don&apos;t ask for grand announcements</span>{" "}
                  <span className="font-normal">— they just quietly stay forever.”</span>
                </p>
                <p className="mt-4 sm:mt-5 text-right">
                  <span className="font-serif italic text-xs sm:text-sm text-[#7A1D45] tracking-wide inline-block transform -rotate-1 select-none font-normal">
                    — for you, always
                  </span>
                </p>
              </div>

              {/* 3. Quiet milestone inscription across bottom */}
              <div className="pt-4 border-t border-[#7A1D45]/15 flex items-center justify-around text-left gap-2 text-[10px] sm:text-xs select-none">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#881337]/60" />
                  <div className="flex flex-col">
                    <span className="text-[8px] sm:text-[9px] uppercase tracking-wider text-[#7A1D45] font-sans font-semibold">10.14</span>
                    <span className="font-serif italic text-[#1E0412] font-medium text-[11px] sm:text-[12px]">First Coffee</span>
                  </div>
                </div>

                <span className="text-[#881337]/30 text-xs select-none">·</span>

                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#881337]/60" />
                  <div className="flex flex-col">
                    <span className="text-[8px] sm:text-[9px] uppercase tracking-wider text-[#7A1D45] font-sans font-semibold">12.24</span>
                    <span className="font-serif italic text-[#1E0412] font-medium text-[11px] sm:text-[12px]">Midnight Rain</span>
                  </div>
                </div>

                <span className="text-[#881337]/30 text-xs select-none">·</span>

                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#881337]/60" />
                  <div className="flex flex-col">
                    <span className="text-[8px] sm:text-[9px] uppercase tracking-wider text-[#7A1D45] font-sans font-semibold">02.14</span>
                    <span className="font-serif italic text-[#1E0412] font-medium text-[11px] sm:text-[12px]">The Vow</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* EDITORIAL ACTION LINK: Clearly separated in calm negative space */}
        {/* ============================================================== */}
        <div ref={ctaRef} className="mt-6 sm:mt-8 flex flex-col items-center gap-1.5 will-change-transform z-20">
          <Link
            href="/create"
            className="group inline-flex items-center gap-2.5 text-base sm:text-lg font-serif font-medium text-[#1A0311] hover:text-[#9F1239] transition-colors drop-shadow-[0_1px_4px_rgba(255,245,248,0.5)]"
          >
            <span className="underline decoration-rose-500 underline-offset-6 group-hover:decoration-rose-700 transition-all font-semibold">
              Make yours
            </span>
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5 font-sans text-sm">
              →
            </span>
          </Link>
          <p className="text-xs sm:text-[13px] text-[#36091E] font-medium drop-shadow-[0_1px_6px_rgba(255,245,248,0.7)]">
            No design experience required. Takes about five minutes.
          </p>
        </div>
      </div>
    </div>
  );
}
