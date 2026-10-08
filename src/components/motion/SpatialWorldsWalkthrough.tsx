"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

import { AtmosphericButton } from "@/components/ui/AtmosphericButton";
import { AmbientBotanicalFrame, type BotanicalTone } from "@/components/motion/AmbientBotanicalFrame";

const WORLD_BOTANICAL_TONE: Record<string, BotanicalTone> = {
  "cloud-nine": "light",
  "midnight-rose": "dusk",
  "kage": "dark",
  "apricot-film": "warm",
  "wildflower-paper": "meadow",
  "ocean-letter": "ocean",
};

/**
 * SpatialWorldsWalkthrough (Phase 6.8.4 Material Restraint):
 * Subtractive pass removing synthetic micro-labels.
 * Every world features:
 * - One hero physical material
 * - One dominant light source
 * - One secondary physical trace
 * - Authentic environmental occlusion (candlelight falloff, tatami room shadows, shoreline fog dissolution)
 * - Zero artificial emblems, zero redundant metadata.
 */
export function SpatialWorldsWalkthrough() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const scenes = gsap.utils.toArray<HTMLElement>(".world-vista-scene");
      scenes.forEach((scene) => {
        const reveals = scene.querySelectorAll(".world-vista-reveal");
        gsap.fromTo(
          reveals,
          {
            opacity: 0,
            y: 36,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: "power2.out",
            stagger: 0.16,
            scrollTrigger: {
              trigger: scene,
              start: "top 88%",
              once: true,
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-transparent text-[#FAF8F5] pt-24 sm:pt-32 pb-16 overflow-hidden"
    >
      {/* Editorial Section Anchor Header */}
      <div className="text-center max-w-2xl mx-auto px-6 mb-16 sm:mb-24 space-y-3 relative z-10">
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-normal text-[#1A0311] tracking-tight leading-tight drop-shadow-[0_1px_12px_rgba(255,245,248,0.5)]">
          Six atmospheres, each with its own light, silence, and memory.
        </h2>
        <p className="text-sm sm:text-base text-[#36091E] max-w-lg mx-auto font-normal leading-relaxed drop-shadow-[0_1px_6px_rgba(255,245,248,0.6)]">
          Written on folded airmail, caught in celluloid, or kept in stone.
        </p>
      </div>

      {/* Sequential Full-Viewport Asymmetric Living Environments */}
      <div className="flex flex-col w-full relative z-10">
        {/* ============================================================== */}
        {/* WORLD 1: CLOUD NINE (Sky Flight)                              */}
        {/* Physical Imperfection: Gently curled paper corner, natural    */}
        {/* ticket resting position, authentic weight, reduced frame.     */}
        {/* ============================================================== */}
        <div className="world-vista-scene relative w-full min-h-[85vh] sm:min-h-[92vh] flex items-center justify-center px-6 sm:px-12 py-16 overflow-hidden">
          <AmbientBotanicalFrame variant="light" density="subtle" intensity={0.35} />

          {/* Morning sun halo & atmospheric haze */}
          <div className="absolute w-[450px] sm:w-[600px] h-[350px] sm:h-[450px] rounded-full bg-gradient-to-tr from-amber-200/20 via-sky-300/15 to-transparent blur-3xl pointer-events-none -z-10" />

          {/* Drifting Cumulus Cloud Shadow Silhouette */}
          <div className="absolute -bottom-10 right-12 w-64 h-36 opacity-15 pointer-events-none blur-2xl">
            <svg viewBox="0 0 200 120" fill="none" className="w-full h-full">
              <path d="M20 80 Q 40 40, 80 50 Q 110 20, 150 40 Q 190 50, 180 90 Q 150 115, 90 110 Q 30 115, 20 80 Z" fill="#38BDF8" />
            </svg>
          </div>

          <div className="w-full max-w-6xl mx-auto relative min-h-[520px] sm:min-h-[580px] flex flex-col justify-between">
            {/* PHYSICAL ARTIFACT: Handled Airmail Aerogramme with Upward Corner Curl */}
            <div className="self-center sm:self-end sm:mr-8 lg:mr-16 world-vista-reveal will-change-transform z-20 pt-4 sm:pt-0">
              <div className="relative w-64 h-48 sm:w-72 sm:h-52 select-none">
                {/* NARRATIVE CONTINUITY: Coffee ticket resting naturally with organic overlap */}
                <div className="absolute -top-3.5 -left-4 z-30 pointer-events-none select-none transform rotate-[-6.5deg] opacity-95 drop-shadow-[2px_10px_20px_rgba(3,105,161,0.2)]">
                  <div className="w-24 sm:w-26 py-1 px-2.5 bg-[#FAF5EE] rounded-xs border border-sky-300/35 text-left shadow-xs">
                    <span className="font-serif italic text-[11px] text-[#1A0311] leading-none block">Rainy Tuesday</span>
                    <span className="block text-[7.5px] font-mono tracking-wider text-sky-800/80 mt-0.5">First Coffee</span>
                  </div>
                </div>

                {/* The Aerogramme Sheet — Imperfectly handled with corner lift & asymmetric contact shadow */}
                <div className="relative w-56 h-40 sm:w-64 sm:h-44 bg-[#FFFDF9] shadow-[4px_24px_50px_-8px_rgba(186,215,248,0.5),0_6px_16px_rgba(0,0,0,0.06)] transform rotate-[2.8deg] skewX-[-0.6deg] hover:rotate-0 transition-transform duration-500 overflow-visible border border-sky-200/40 rounded-[1px]">
                  {/* Airmail Par Avion Hatched Border Trim */}
                  <div
                    className="absolute top-0 inset-x-0 h-1.5 opacity-75"
                    style={{
                      background: "repeating-linear-gradient(45deg, #0284C7, #0284C7 8px, #FFFDF9 8px, #FFFDF9 16px, #E11D48 16px, #E11D48 24px, #FFFDF9 24px, #FFFDF9 32px)",
                    }}
                  />
                  <div
                    className="absolute bottom-0 inset-x-0 h-1.5 opacity-75"
                    style={{
                      background: "repeating-linear-gradient(45deg, #0284C7, #0284C7 8px, #FFFDF9 8px, #FFFDF9 16px, #E11D48 16px, #E11D48 24px, #FFFDF9 24px, #FFFDF9 32px)",
                    }}
                  />

                  {/* Physical Lifted / Curled Upper-Right Corner */}
                  <div className="absolute -top-0.5 -right-0.5 w-5 h-5 pointer-events-none z-20">
                    <div className="absolute top-0 right-0 w-4 h-4 bg-black/15 blur-[1.5px] rounded-bl-sm transform translate-x-0.5 translate-y-0.5" />
                    <div
                      className="absolute top-0 right-0 w-4 h-4 bg-gradient-to-bl from-[#ECE6D8] via-[#FAF6EE] to-[#FFFDF9] shadow-[-1px_2px_4px_rgba(0,0,0,0.12)] border-b border-l border-sky-200/50"
                      style={{ clipPath: "polygon(0 0, 100% 100%, 0 100%)" }}
                    />
                  </div>

                  {/* Single Authored Letter Content */}
                  <div className="pt-6 px-4 pb-3 flex flex-col justify-center h-full text-left relative z-10">
                    <p className="font-serif italic text-xs sm:text-[13px] text-[#0F172A] font-medium leading-relaxed">
                      “Every sunrise is lighter with you.”
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* SPATIAL COPY: Anchored Low-Left in the expansive morning space */}
            <div className="self-start max-w-lg space-y-4 text-left sm:pl-4 lg:pl-10 pb-4 sm:pb-8 world-vista-reveal">
              <h3 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-normal tracking-tight text-[#1A0311] drop-shadow-[0_1px_12px_rgba(255,250,240,0.6)]">
                Cloud Nine
              </h3>
              <p className="text-lg sm:text-xl font-serif italic text-[#36091E] font-normal drop-shadow-[0_1px_6px_rgba(255,250,240,0.6)]">
                “For the person who makes everything lighter.”
              </p>
              <div className="pt-2">
                <AtmosphericButton href="/create?template=cloud-nine" worldId="cloud-nine" worldName="Cloud Nine" />
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* WORLD 2: MIDNIGHT ROSE (Candlelit Alcove)                     */}
        {/* Directional Chiaroscuro: Candlelight illuminates top-left,     */}
        {/* lower-right falls into deep room shadow. Asymmetric weight.    */}
        {/* ============================================================== */}
        <div className="world-vista-scene relative w-full min-h-[85vh] sm:min-h-[92vh] flex items-center justify-center px-6 sm:px-12 py-16 overflow-hidden">
          <AmbientBotanicalFrame variant="dusk" density="subtle" intensity={0.35} />

          {/* Deep chiaroscuro & amber candle warmth (Restrained) */}
          <div className="absolute w-[450px] sm:w-[600px] h-[350px] sm:h-[450px] rounded-full bg-gradient-to-tr from-amber-500/18 via-rose-950/35 to-transparent blur-3xl pointer-events-none -z-10" />

          {/* Off-screen candle light source casting long diagonal shadow from upper left */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-amber-500/12 via-rose-950/25 to-black/90 pointer-events-none"
            aria-hidden="true"
          />

          <div className="w-full max-w-6xl mx-auto relative min-h-[520px] sm:min-h-[580px] flex flex-col justify-between">
            {/* SPATIAL COPY: Partially recessed into shadow mid-left */}
            <div className="self-start max-w-md space-y-4 text-left sm:pl-6 lg:pl-12 pt-6 sm:pt-10 world-vista-reveal">
              <h3 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-normal tracking-tight text-[#FFFBF5] drop-shadow-[0_2px_16px_rgba(10,0,5,0.9)]">
                Midnight Rose
              </h3>
              <p className="text-lg sm:text-xl font-serif italic text-[#FECDD3] drop-shadow-[0_1px_8px_rgba(10,0,5,0.85)]">
                “For the love that feels like midnight.”
              </p>
              <div className="pt-2">
                <AtmosphericButton href="/create?template=midnight-rose" worldId="midnight-rose" worldName="Midnight Rose" />
              </div>
            </div>

            {/* PHYSICAL ARTIFACT: Hand-Poured Wax Sealed Velvet Envelope Low-Right */}
            <div className="self-center sm:self-end sm:mr-8 lg:mr-20 pb-4 sm:pb-8 world-vista-reveal will-change-transform z-20">
              <div className="relative w-64 h-48 sm:w-72 sm:h-52 select-none">
                {/* Stray fallen rose petal with realistic contact shadow */}
                <div className="absolute -bottom-4 -left-6 z-25 pointer-events-none transform -rotate-12 opacity-85 drop-shadow-[0_4px_12px_rgba(0,0,0,0.85)]">
                  <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-[#9F1239]">
                    <path d="M5 16 C 3 9, 10 3, 17 4 C 20 11, 13 19, 5 16 Z" fill="currentColor" fillOpacity="0.8" />
                  </svg>
                </div>

                {/* The Velvet Envelope — Asymmetric Candlelight Glaze with deep contact shadow on dark side */}
                <div className="relative w-56 h-40 sm:w-64 sm:h-44 bg-gradient-to-br from-[#36071E] via-[#1B020E] to-[#080104] shadow-[12px_28px_55px_-8px_rgba(0,0,0,0.95),4px_10px_24px_rgba(159,18,57,0.22)] border-t border-l border-amber-400/25 border-r-0 border-b-0 transform rotate-[-3.8deg] hover:rotate-0 transition-transform duration-500 overflow-visible">
                  {/* Pointed Envelope Flap with Velvet Shadow */}
                  <div className="absolute top-0 inset-x-0 h-20 bg-gradient-to-br from-[#450926] to-[#16020C] [clip-path:polygon(0_0,100%_0,50%_100%)] shadow-[0_4px_12px_rgba(0,0,0,0.8)] border-t border-amber-300/25" />

                  {/* Hand-Poured Organic Wax Seal (Molten ripples, no monogram) */}
                  <div className="absolute top-16 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
                    <div className="relative w-11 h-11 rounded-full bg-gradient-to-br from-[#E11D48] via-[#9F1239] to-[#4C0519] border border-amber-300/50 shadow-[0_6px_20px_rgba(159,18,57,0.7),inset_0_2px_4px_rgba(255,255,255,0.3)] flex items-center justify-center transform hover:scale-105 transition-transform">
                      {/* Dripping wax edge irregularities */}
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-[#881337] opacity-90" />
                      <div className="absolute -top-0.5 -left-1 w-2.5 h-2.5 rounded-full bg-[#9F1239] opacity-80" />
                      {/* Molten concentric cooling ridge */}
                      <div className="w-5 h-5 rounded-full border border-amber-200/35 bg-[#9F1239]/70 shadow-inner" />
                    </div>
                  </div>

                  {/* Single Letter Quote */}
                  <div className="absolute top-22 inset-x-5 text-center">
                    <p className="font-serif italic text-xs text-rose-100/90 font-medium leading-relaxed drop-shadow-sm">
                      “Written in quiet starlight, meant only for you.”
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* WORLD 3: KAGE (Vertical Tatami Room Composition)               */}
        {/* The Quietest World: Deep shadow, no SVG clutter, breathing     */}
        {/* room. Scroll hangs a fraction crooked in an authentic alcove.  */}
        {/* ============================================================== */}
        <div className="world-vista-scene relative w-full min-h-[88vh] sm:min-h-[96vh] flex items-center justify-center px-6 sm:px-12 py-16 overflow-hidden">
          <AmbientBotanicalFrame variant="dark" density="subtle" intensity={0.35} />

          {/* Kyoto Quiet Room Chiaroscuro & deep tatami shadow */}
          <div className="absolute w-[450px] sm:w-[600px] h-[350px] sm:h-[450px] rounded-full bg-gradient-to-tr from-amber-700/15 via-stone-900/35 to-[#0A0A0B] blur-3xl pointer-events-none -z-10" />

          {/* Stone lantern warm amber floor glow */}
          <div className="absolute bottom-6 right-1/4 w-24 h-24 rounded-full bg-amber-500/12 blur-2xl pointer-events-none" />

          <div className="w-full max-w-6xl mx-auto relative min-h-[580px] sm:min-h-[660px] flex flex-col lg:flex-row justify-between items-center gap-12 lg:gap-0">
            {/* PHYSICAL ARTIFACT: Hanging Japanese Washi Scroll suspended a fraction crooked */}
            <div className="lg:ml-12 xl:ml-20 world-vista-reveal will-change-transform z-20">
              <div className="relative w-48 sm:w-56 h-72 sm:h-84 flex flex-col items-center transform rotate-[-1.8deg] hover:rotate-0 transition-transform duration-500 select-none">
                {/* Top Silk Hanging Cord (asymmetric tension) & Cedar Dowel Rod */}
                <div className="w-16 h-0.5 bg-amber-800/60 mb-1 rounded-full transform rotate-[1.5deg]" />
                <div className="w-full h-3 bg-gradient-to-r from-[#2A180E] via-[#3E2516] to-[#2A180E] rounded-sm shadow-md border-b border-amber-950/60" />

                {/* Textured Washi Paper Scroll Body on Deep Charcoal Brocade */}
                <div className="w-[92%] flex-1 bg-[#121214] border-x border-stone-800/80 shadow-[16px_32px_65px_-8px_rgba(0,0,0,0.96),-4px_12px_30px_rgba(0,0,0,0.6)] p-3.5 flex flex-col justify-between text-center relative overflow-hidden">
                  {/* Center Washi Sheet — Drifts into ambient room shadow with subtle vertical fiber wave */}
                  <div className="relative flex-1 [background:linear-gradient(to_bottom,rgba(15,14,13,0.45)_0%,#EDE5D8_20%,#E4DBD0_50%,#EDE5D8_80%,rgba(18,17,16,0.55)_100%)] border border-amber-900/10 shadow-inner p-3 flex flex-col justify-between overflow-hidden">
                    {/* Washi paper fiber grain */}
                    <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#78350F_1px,transparent_1px)] [background-size:8px_8px]" />

                    {/* Sumi Ink Calligraphy */}
                    <div className="my-auto space-y-1 relative z-10">
                      <span className="text-4xl sm:text-5xl font-serif text-[#1C1917] font-light tracking-widest block drop-shadow-xs select-none">
                        静寂
                      </span>
                      <p className="text-[11px] font-serif italic text-stone-700 leading-relaxed font-medium">
                        “Some words live quietly in the shadows.”
                      </p>
                    </div>

                    {/* AUTHENTIC CINNABAR HANKO STAMP (Organic ink bleed, manual impression) */}
                    <div className="flex justify-end pt-1 relative z-10">
                      <svg viewBox="0 0 28 28" className="w-5 h-5 opacity-90 filter drop-shadow-[0_1px_1px_rgba(153,27,27,0.4)]" aria-label="Vermilion Hanko imprint">
                        <path
                          d="M3 5 C 3 3.5, 4.5 3, 6 3 L 22 3 C 23.5 3, 25 4, 25 6 L 25 21 C 25 23.5, 23.5 25, 21 25 L 6 25 C 4 25, 3 23.5, 3 21 Z"
                          fill="#991B1B"
                          fillOpacity="0.92"
                        />
                        <path
                          d="M7 8 L 21 8 M 14 8 L 14 20 M 9 14 L 19 14 M 9 20 L 19 20"
                          stroke="#FEF2F2"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeOpacity="0.75"
                        />
                        <circle cx="5" cy="22" r="0.8" fill="#B91C1C" opacity="0.6" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Bottom Weighted Cedar Dowel Rod */}
                <div className="w-full h-3 bg-gradient-to-r from-[#2A180E] via-[#3E2516] to-[#2A180E] rounded-sm shadow-md border-t border-amber-950/60" />
              </div>
            </div>

            {/* SPATIAL COPY: Placed into the quiet negative space to the right */}
            <div className="max-w-md space-y-4 text-center lg:text-left lg:mr-12 xl:mr-20 world-vista-reveal">
              <h3 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-normal tracking-tight text-[#F5F2EB] drop-shadow-[0_2px_16px_rgba(0,0,0,0.95)]">
                Kage <span className="text-3xl sm:text-4xl opacity-80 font-serif font-light">(影)</span>
              </h3>
              <p className="text-lg sm:text-xl font-serif italic text-[#D6D0C4] drop-shadow-[0_1px_8px_rgba(0,0,0,0.9)]">
                “For the love of quiet shadows and unspoken truths.”
              </p>
              <div className="pt-2">
                <AtmosphericButton href="/create?template=kage" worldId="kage" worldName="Kage" />
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* WORLD 4: APRICOT FILM (Cinema Reel — Organic Celluloid Ribbon)  */}
        {/* Material Tension: Ribbon bows gently at an awkward angle with   */}
        {/* 3D perspective sag, physical weight, translucent acetate depth. */}
        {/* ============================================================== */}
        <div className="world-vista-scene relative w-full min-h-[88vh] sm:min-h-[96vh] flex items-center justify-center px-6 sm:px-12 py-16 overflow-hidden [perspective:1200px]">
          <AmbientBotanicalFrame variant="warm" density="subtle" intensity={0.35} />

          {/* Dark Room Ambient Warm Glow */}
          <div className="absolute w-[450px] sm:w-[600px] h-[350px] sm:h-[450px] rounded-full bg-gradient-to-tr from-amber-500/28 via-orange-950/20 to-transparent blur-3xl pointer-events-none -z-10" />

          {/* DIAGONAL INCANDESCENT PROJECTOR BEAM Cutting Across Viewport */}
          <div
            className="absolute inset-y-0 -inset-x-12 bg-gradient-to-r from-amber-400/20 via-amber-200/12 to-transparent blur-md pointer-events-none"
            style={{
              clipPath: "polygon(0 8%, 100% 0%, 100% 72%, 0 55%)",
            }}
          />

          {/* Floating Projector Dust Motes in Light Beam */}
          <div className="absolute top-1/5 left-1/4 w-1.5 h-1.5 rounded-full bg-amber-200/80 blur-[0.4px] pointer-events-none animate-pulse" />
          <div className="absolute top-1/4 left-1/2 w-1 h-1 rounded-full bg-amber-100/70 blur-[0.3px] pointer-events-none" />
          <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 rounded-full bg-amber-300/60 blur-[0.5px] pointer-events-none" />

          {/* ONE LOOSE ACETATE CELLULOID FILM STRIP crossing frame at an awkward angle with tension & sag */}
          <div
            className="absolute inset-x-[-15%] sm:inset-x-[-5%] top-[34%] sm:top-[36%] -translate-y-1/2 z-20 pointer-events-none select-none drop-shadow-[0_28px_55px_rgba(0,0,0,0.95)]"
            style={{
              transform: "rotate(-7.5deg) rotateX(4.5deg) rotateY(-1.5deg) skewX(-1.2deg)",
            }}
          >
            {/* The Continuous Acetate Ribbon — Physical translucency and edge reflection */}
            <div className="w-full bg-gradient-to-r from-amber-950/85 via-amber-900/70 to-amber-950/85 backdrop-blur-[3px] border-y border-amber-500/35 py-2 px-1 flex flex-col gap-2">
              {/* Top Continuous Sprocket Perforations */}
              <div className="flex items-center justify-between px-2 overflow-hidden">
                {[...Array(24)].map((_, i) => (
                  <div key={i} className="w-3 h-2 bg-black/95 rounded-[1px] border border-amber-600/40 shadow-inner shrink-0 mx-1.5" />
                ))}
              </div>

              {/* Seamless Celluloid Exposures (No internal boxed card UI) */}
              <div className="flex items-center justify-center gap-4 sm:gap-8 px-4 overflow-hidden">
                {/* Exposure 1: Underexposed entry frame cutting off at left */}
                <div className="w-36 sm:w-48 h-24 sm:h-28 bg-gradient-to-r from-amber-950/90 to-amber-900/40 opacity-40 shrink-0" />

                {/* Exposure 2: Soft sepia memory tone */}
                <div className="w-40 sm:w-56 h-26 sm:h-30 bg-gradient-to-r from-amber-900/50 via-[#2D1609]/70 to-amber-900/60 opacity-70 shrink-0" />

                {/* Exposure 3: THE HERO EXPOSURE bathed in incandescent projector glare */}
                <div className="w-60 sm:w-76 h-32 sm:h-36 bg-gradient-to-br from-[#241005] via-[#351A0A] to-[#1A0B04] shadow-[0_0_36px_rgba(251,191,36,0.45)] p-4 flex items-center justify-center text-center relative overflow-hidden shrink-0 border-y border-amber-400/40">
                  {/* Beam glare over celluloid */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-amber-300/25 via-transparent to-amber-100/30 pointer-events-none" />
                  <p className="font-serif italic text-xs sm:text-sm text-amber-100 font-medium leading-relaxed drop-shadow-[0_1px_6px_rgba(0,0,0,0.9)] relative z-10">
                    “Sunlight in your hair, golden and still.”
                  </p>
                </div>

                {/* Exposure 4: Motion warm frame */}
                <div className="w-40 sm:w-56 h-26 sm:h-30 bg-gradient-to-r from-amber-900/60 via-[#2D1609]/70 to-amber-900/50 opacity-70 shrink-0" />

                {/* Exposure 5: Exit tail cutting off at right */}
                <div className="w-36 sm:w-48 h-24 sm:h-28 bg-gradient-to-r from-amber-900/40 to-amber-950/90 opacity-40 shrink-0" />
              </div>

              {/* Bottom Continuous Sprocket Perforations */}
              <div className="flex items-center justify-between px-2 overflow-hidden">
                {[...Array(24)].map((_, i) => (
                  <div key={i} className="w-3 h-2 bg-black/95 rounded-[1px] border border-amber-600/40 shadow-inner shrink-0 mx-1.5" />
                ))}
              </div>
            </div>
          </div>

          {/* SPATIAL COPY: Occupies the light/shadow boundary below the projector beam */}
          <div className="w-full max-w-6xl mx-auto relative z-30 min-h-[540px] sm:min-h-[600px] flex flex-col justify-end">
            <div className="max-w-lg space-y-4 text-left sm:pl-6 lg:pl-12 pb-8 sm:pb-12 world-vista-reveal">
              <h3 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-normal tracking-tight text-[#FFFBEB] drop-shadow-[0_2px_16px_rgba(30,12,2,0.9)]">
                Apricot Film
              </h3>
              <p className="text-lg sm:text-xl font-serif italic text-[#FDE68A] drop-shadow-[0_1px_8px_rgba(30,12,2,0.85)]">
                “For memories that feel like a sun-drenched afternoon.”
              </p>
              <div className="pt-2">
                <AtmosphericButton href="/create?template=apricot-film" worldId="apricot-film" worldName="Apricot Film" />
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* WORLD 5: WILDFLOWER PAPER (Herbarium Desk)                     */}
        {/* Physical Imperfection: Deckled cotton sheet with natural lift, */}
        {/* escaping stems casting authentic directional drop shadow.       */}
        {/* ============================================================== */}
        <div className="world-vista-scene relative w-full min-h-[85vh] sm:min-h-[92vh] flex items-center justify-center px-6 sm:px-12 py-16 overflow-hidden">
          <AmbientBotanicalFrame variant="meadow" density="subtle" intensity={0.35} />

          {/* Meadow daylight aura */}
          <div className="absolute w-[450px] sm:w-[600px] h-[350px] sm:h-[450px] rounded-full bg-gradient-to-tr from-amber-300/18 via-stone-400/12 to-purple-950/12 blur-3xl pointer-events-none -z-10" />

          <div className="w-full max-w-6xl mx-auto relative min-h-[520px] sm:min-h-[580px] flex flex-col lg:flex-row justify-between items-center gap-12 lg:gap-0">
            {/* PHYSICAL ARTIFACT: Deckled Cotton Herbarium Sheet with authentic imperfect lift */}
            <div className="lg:-ml-8 xl:-ml-12 world-vista-reveal will-change-transform z-20">
              <div className="relative w-64 sm:w-72 h-72 sm:h-80 select-none">
                {/* The Deckled Herbarium Sheet — Subtle corner lift & uneven shadow */}
                <div className="relative w-56 h-64 sm:w-64 sm:h-72 bg-[#FAF7F0] shadow-[6px_22px_45px_-8px_rgba(180,120,50,0.22),2px_6px_14px_rgba(0,0,0,0.06)] border border-stone-300/80 transform rotate-[-2.8deg] skewY-[0.6deg] hover:rotate-0 transition-transform duration-500 p-4 flex flex-col justify-between rounded-[1px]">
                  {/* Linen Thread Binding */}
                  <div className="absolute -top-2 left-6 w-1 h-5 bg-[#A89F91] rounded-full shadow-xs z-20" />
                  <div className="absolute top-1 left-4 w-5 h-1 bg-[#A89F91] rounded-full shadow-xs z-20" />

                  {/* REAL DRIED BOTANICAL SPECIMEN: Stems escape past sheet perimeter and cast directional shadow onto desk */}
                  <div className="absolute -top-10 -right-10 z-25 pointer-events-none">
                    <svg viewBox="0 0 56 90" fill="none" className="w-18 h-28 filter drop-shadow-[6px_12px_14px_rgba(60,40,15,0.25)]">
                      <path d="M10 88 C 16 60, 22 36, 36 6" stroke="#5B684B" strokeWidth="1.6" strokeLinecap="round" />
                      <path d="M22 52 C 34 40, 48 32, 54 22" stroke="#5B684B" strokeWidth="1.2" strokeLinecap="round" opacity="0.85" />
                      <ellipse cx="36" cy="6" rx="5" ry="3.5" fill="#C084FC" fillOpacity="0.85" />
                      <ellipse cx="30" cy="16" rx="4.5" ry="3" fill="#A855F7" fillOpacity="0.8" />
                      <ellipse cx="38" cy="26" rx="4" ry="2.8" fill="#C084FC" fillOpacity="0.75" />
                      <ellipse cx="54" cy="22" rx="4" ry="2.6" fill="#C084FC" fillOpacity="0.8" />
                      <path d="M14 48 C 7 42, 8 34, 15 40 Z" fill="#849974" fillOpacity="0.85" />
                      <path d="M25 62 C 33 56, 31 48, 24 54 Z" fill="#718762" fillOpacity="0.85" />
                    </svg>
                  </div>

                  <div className="h-4" />

                  {/* Single Authored Quote */}
                  <div className="my-auto text-center space-y-1.5 pt-2">
                    <p className="text-xs font-serif italic text-stone-900 font-medium leading-relaxed">
                      “Pressed by hand, kept forever.”
                    </p>
                  </div>

                  <div className="h-2" />
                </div>
              </div>
            </div>

            {/* SPATIAL COPY: Placed independently in the open space to the right */}
            <div className="max-w-lg space-y-4 text-center lg:text-left lg:mr-8 xl:mr-16 world-vista-reveal">
              <h3 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-normal tracking-tight text-[#1A0311] drop-shadow-[0_1px_12px_rgba(255,248,240,0.6)]">
                Wildflower Paper
              </h3>
              <p className="text-lg sm:text-xl font-serif italic text-[#361A09] font-normal drop-shadow-[0_1px_6px_rgba(255,248,240,0.6)]">
                “For the love built by hand, petal by petal.”
              </p>
              <div className="pt-2">
                <AtmosphericButton href="/create?template=wildflower-paper" worldId="wildflower-paper" worldName="Wildflower Paper" />
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* WORLD 6: OCEAN LETTER (Shoreline Drift)                        */}
        {/* Believable Environment: Dark wet slate stone slab, shoreline   */}
        {/* parchment dissolving into sea fog, tactile sea-glass caustics. */}
        {/* ============================================================== */}
        <div className="world-vista-scene relative w-full min-h-[85vh] sm:min-h-[92vh] flex items-center justify-center px-6 sm:px-12 py-16 overflow-hidden">
          <AmbientBotanicalFrame variant="ocean" density="subtle" intensity={0.35} />

          {/* Coastal Fog & Cyan Sea Starlight */}
          <div className="absolute w-[450px] sm:w-[600px] h-[350px] sm:h-[450px] rounded-full bg-gradient-to-tr from-sky-500/18 via-slate-900/25 to-transparent blur-3xl pointer-events-none -z-10" />

          <div className="w-full max-w-6xl mx-auto relative min-h-[520px] sm:min-h-[580px] flex flex-col justify-between">
            {/* SPATIAL COPY: Placed high/mid in the open space, away from object */}
            <div className="self-start max-w-lg space-y-4 text-left sm:pl-6 lg:pl-12 pt-6 sm:pt-10 world-vista-reveal">
              <h3 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-normal tracking-tight text-[#F0F9FF] drop-shadow-[0_2px_18px_rgba(2,10,25,0.95)]">
                Ocean Letter
              </h3>
              <p className="text-lg sm:text-xl font-serif italic text-[#BAE6FD] drop-shadow-[0_1px_8px_rgba(2,10,25,0.9)]">
                “For words meant to cross any distance.”
              </p>
              <div className="pt-2">
                <AtmosphericButton href="/create?template=ocean-letter" worldId="ocean-letter" worldName="Ocean Letter" />
              </div>
            </div>

            {/* PHYSICAL ENVIRONMENT: Wet Slate Slab + Shoreline Parchment dissolving into fog + Sea Glass Hero */}
            <div className="self-center sm:self-end sm:mr-8 lg:mr-20 pb-4 sm:pb-8 world-vista-reveal will-change-transform z-20">
              <div className="relative w-72 h-56 sm:w-80 sm:h-60 select-none">
                {/* Dark Wet Slate Stone Base with subtle specular sheen and deep contact shadow */}
                <div className="relative w-68 h-48 sm:w-76 sm:h-52 bg-gradient-to-br from-[#0B1724] via-[#06101A] to-[#02070D] border border-cyan-950/70 shadow-[0_32px_75px_rgba(0,0,0,0.98)] p-4 flex items-center justify-center [background-image:linear-gradient(135deg,rgba(255,255,255,0.04)_0%,transparent_35%,rgba(56,189,248,0.03)_50%,transparent_65%)]">
                  {/* Weathered Shoreline Parchment softly dissolving into sea fog */}
                  <div
                    className="relative w-54 h-36 sm:w-60 sm:h-40 bg-gradient-to-b from-[#E9EEF0] via-[#DEE7E9] to-[#C8D6D9]/50 shadow-md border-t border-l border-cyan-900/20 border-r-0 border-b-0 rotate-[-2.5deg] p-3.5 flex flex-col justify-between"
                    style={{
                      maskImage: "linear-gradient(to bottom, black 55%, rgba(0,0,0,0.4) 85%, transparent 100%)",
                      WebkitMaskImage: "linear-gradient(to bottom, black 55%, rgba(0,0,0,0.4) 85%, transparent 100%)",
                    }}
                  >
                    <div className="h-1" />
                    <p className="font-serif italic text-xs text-sky-950 font-medium text-center leading-relaxed drop-shadow-xs px-1">
                      “Our devotion is as vast and enduring as the evening tides.”
                    </p>
                    <div className="h-1" />
                  </div>

                  {/* THE HERO: Tactile Frosted Sea-Glass Pebble Resting on Wet Slate */}
                  <div className="absolute -top-4 right-4 z-30 pointer-events-none">
                    <div className="relative w-22 h-14 sm:w-24 sm:h-15 rounded-[45%_55%_60%_40%/50%_45%_55%_50%] bg-gradient-to-br from-cyan-200/40 via-cyan-400/30 to-teal-500/25 backdrop-blur-md border border-cyan-100/60 shadow-[0_10px_35px_rgba(34,211,238,0.55),4px_12px_24px_rgba(0,0,0,0.9)] transform rotate-12 flex items-center justify-center">
                      {/* Internal frosted refraction highlight */}
                      <div className="w-8 h-3.5 rounded-full bg-white/50 blur-[1px] transform -rotate-6" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Understated Showroom Full Catalog Link */}
      <div className="text-center py-16 px-6 relative z-10">
        <Link
          href="/templates"
          className="group inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full text-xs sm:text-sm font-mono uppercase tracking-widest bg-rose-950/40 hover:bg-rose-900/60 border border-rose-400/40 text-rose-100 hover:text-white font-medium shadow-[0_4px_16px_rgba(0,0,0,0.4)] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5"
        >
          <span>Explore all six atmospheres</span>
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">
            →
          </span>
        </Link>
      </div>
    </div>
  );
}
