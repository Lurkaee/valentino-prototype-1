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
        {/* Spatial Composition: Title low-left, aerogramme high-right,     */}
        {/* coffee ticket partly detached, expansive morning negative space */}
        {/* ============================================================== */}
        <div className="world-vista-scene relative w-full min-h-[85vh] sm:min-h-[92vh] flex items-center justify-center px-6 sm:px-12 py-16 overflow-hidden">
          <AmbientBotanicalFrame variant="light" density="subtle" intensity={0.75} />

          {/* Morning sun halo & atmospheric haze */}
          <div className="absolute w-[500px] sm:w-[700px] h-[400px] sm:h-[500px] rounded-full bg-gradient-to-tr from-amber-200/25 via-sky-300/20 to-transparent blur-3xl pointer-events-none -z-10" />

          {/* Drifting Cumulus Cloud Shadow Silhouette */}
          <div className="absolute -bottom-10 right-12 w-64 h-36 opacity-20 pointer-events-none blur-2xl">
            <svg viewBox="0 0 200 120" fill="none" className="w-full h-full">
              <path d="M20 80 Q 40 40, 80 50 Q 110 20, 150 40 Q 190 50, 180 90 Q 150 115, 90 110 Q 30 115, 20 80 Z" fill="#38BDF8" />
            </svg>
          </div>

          <div className="w-full max-w-6xl mx-auto relative min-h-[520px] sm:min-h-[580px] flex flex-col justify-between">
            {/* PHYSICAL ARTIFACT: Folded Airmail Aerogramme Floating High-Right */}
            <div className="self-center sm:self-end sm:mr-8 lg:mr-16 world-vista-reveal will-change-transform z-20 pt-4 sm:pt-0">
              <div className="relative w-64 h-48 sm:w-72 sm:h-52 select-none">
                {/* NARRATIVE CONTINUITY: Coffee ticket partly detached with its own cast shadow */}
                <div className="absolute -top-6 -left-6 z-30 pointer-events-none select-none transform rotate-[-10deg] opacity-95 drop-shadow-[0_12px_24px_rgba(3,105,161,0.25)]">
                  <div className="w-26 sm:w-28 py-1.5 px-2 bg-[#FAF5EE] rounded-xs border border-sky-300/40 text-left shadow-sm">
                    <span className="block text-[6.5px] font-mono tracking-widest text-[#0369A1] uppercase font-semibold">10.14 · MEMORY</span>
                    <span className="font-serif italic text-[10px] text-[#1A0311] leading-none">First Coffee</span>
                    <span className="block text-[6px] font-mono tracking-widest text-sky-800/70 mt-0.5">ADMIT ONE · № 0214</span>
                  </div>
                </div>

                {/* Loose Torn Pale Blue Scrap drifting below */}
                <div className="absolute -bottom-4 -left-4 z-15 pointer-events-none select-none transform rotate-[8deg] opacity-80 drop-shadow-[0_4px_12px_rgba(0,0,0,0.06)]">
                  <div className="w-18 py-1 px-2 bg-[#F0F8FF] rounded-xs border border-sky-200/60 text-left">
                    <span className="font-serif italic text-[8.5px] text-sky-900 leading-none">“skyward”</span>
                  </div>
                </div>

                {/* The Aerogramme Sheet */}
                <div className="relative w-56 h-40 sm:w-64 sm:h-44 bg-[#FFFDF9] shadow-[0_24px_50px_-10px_rgba(186,215,248,0.5),0_4px_12px_rgba(0,0,0,0.06)] transform rotate-[3.5deg] hover:rotate-0 transition-transform duration-500 overflow-hidden border border-sky-200/50">
                  {/* Airmail Par Avion Hatched Border Trim */}
                  <div
                    className="absolute top-0 inset-x-0 h-2 opacity-80"
                    style={{
                      background: "repeating-linear-gradient(45deg, #0284C7, #0284C7 8px, #FFFDF9 8px, #FFFDF9 16px, #E11D48 16px, #E11D48 24px, #FFFDF9 24px, #FFFDF9 32px)",
                    }}
                  />
                  <div
                    className="absolute bottom-0 inset-x-0 h-2 opacity-80"
                    style={{
                      background: "repeating-linear-gradient(45deg, #0284C7, #0284C7 8px, #FFFDF9 8px, #FFFDF9 16px, #E11D48 16px, #E11D48 24px, #FFFDF9 24px, #FFFDF9 32px)",
                    }}
                  />

                  {/* Postal Postmark Imprint */}
                  <div className="absolute top-3 right-3 w-12 h-12 rounded-full border border-sky-400/70 border-dashed flex flex-col items-center justify-center text-[7px] font-mono text-sky-700 leading-none rotate-12 select-none opacity-85">
                    <span className="font-semibold">CLOUD 9</span>
                    <span className="font-bold my-0.5 text-[8px] text-[#0369A1]">14.02</span>
                    <span>POST</span>
                  </div>

                  {/* Inscribed Aerogramme Content */}
                  <div className="pt-6 px-4 pb-3 flex flex-col justify-between h-full text-left relative z-10">
                    <div>
                      <p className="font-serif italic text-xs text-[#0F172A] mt-2 font-medium leading-relaxed">
                        “Every sunrise is lighter with you.”
                      </p>
                    </div>
                    <div className="text-[9px] font-serif italic text-[#0369A1] text-right pt-1 border-t border-sky-100">
                      yours in the clouds
                    </div>
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
        {/* Spatial Composition: Candlelight originates off-screen,        */}
        {/* title recessed into shadow, envelope grounded low-right        */}
        {/* ============================================================== */}
        <div className="world-vista-scene relative w-full min-h-[85vh] sm:min-h-[92vh] flex items-center justify-center px-6 sm:px-12 py-16 overflow-hidden">
          <AmbientBotanicalFrame variant="dusk" density="subtle" intensity={0.75} />

          {/* Deep chiaroscuro & amber candle warmth */}
          <div className="absolute w-[500px] sm:w-[700px] h-[400px] sm:h-[500px] rounded-full bg-gradient-to-tr from-amber-500/25 via-rose-950/45 to-transparent blur-3xl pointer-events-none -z-10" />

          {/* Off-screen candle light source casting long diagonal shadow from upper left */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-amber-500/15 via-rose-950/30 to-black/80 pointer-events-none"
            aria-hidden="true"
          />

          {/* Off-screen candle flame reflection at top perimeter */}
          <div className="absolute -top-6 left-1/4 flex flex-col items-center pointer-events-none z-20 opacity-70">
            <div className="w-16 h-20 rounded-full bg-amber-400/30 blur-2xl animate-pulse" />
          </div>

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
                <div className="absolute -bottom-4 -left-6 z-25 pointer-events-none transform -rotate-12 opacity-85 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
                  <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-[#9F1239]">
                    <path d="M5 16 C 3 9, 10 3, 17 4 C 20 11, 13 19, 5 16 Z" fill="currentColor" fillOpacity="0.8" />
                  </svg>
                </div>

                {/* The Velvet Envelope */}
                <div className="relative w-56 h-40 sm:w-64 sm:h-44 bg-gradient-to-b from-[#2A0516] via-[#1B020E] to-[#0D0107] shadow-[0_28px_60px_-10px_rgba(225,29,72,0.4),0_6px_20px_rgba(0,0,0,0.8)] border border-amber-500/30 transform rotate-[-4deg] hover:rotate-0 transition-transform duration-500 overflow-visible">
                  {/* Pointed Envelope Flap with Velvet Shadow */}
                  <div className="absolute top-0 inset-x-0 h-20 bg-gradient-to-b from-[#38071E] to-[#200311] [clip-path:polygon(0_0,100%_0,50%_100%)] shadow-[0_4px_12px_rgba(0,0,0,0.7)] border-t border-amber-400/20" />

                  {/* Hand-Poured Organic Wax Seal (NO MONOGRAMS, pure molten ripples) */}
                  <div className="absolute top-16 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
                    <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-[#E11D48] via-[#9F1239] to-[#4C0519] border border-amber-300/60 shadow-[0_6px_20px_rgba(159,18,57,0.7),inset_0_2px_4px_rgba(255,255,255,0.4)] flex items-center justify-center transform hover:scale-105 transition-transform">
                      {/* Dripping wax edge irregularities */}
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-[#881337] opacity-90" />
                      <div className="absolute -top-0.5 -left-1 w-2.5 h-2.5 rounded-full bg-[#9F1239] opacity-80" />
                      {/* Molten concentric cooling ridge */}
                      <div className="w-5 h-5 rounded-full border border-amber-200/40 bg-[#9F1239]/70 shadow-inner" />
                    </div>
                  </div>

                  {/* Intimate Letter Quote */}
                  <div className="absolute top-22 inset-x-5 text-center">
                    <p className="font-serif italic text-xs text-rose-100 font-medium leading-relaxed drop-shadow-sm">
                      “Written in quiet starlight, meant only for you.”
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* WORLD 3: KAGE (Vertical Composition)                          */}
        {/* Spatial Composition: Hanging scroll partially off-axis,        */}
        {/* deliberate negative space, vertical flow instead of row        */}
        {/* ============================================================== */}
        <div className="world-vista-scene relative w-full min-h-[88vh] sm:min-h-[96vh] flex items-center justify-center px-6 sm:px-12 py-16 overflow-hidden">
          <AmbientBotanicalFrame variant="dark" density="subtle" intensity={0.75} />

          {/* Kyoto Quiet Room Chiaroscuro */}
          <div className="absolute w-[500px] sm:w-[700px] h-[400px] sm:h-[500px] rounded-full bg-gradient-to-tr from-amber-700/20 via-stone-900/40 to-[#0A0A0B] blur-3xl pointer-events-none -z-10" />

          {/* Environmental Prop: Cedar Pine Needles Silhouette casting charcoal shadow from upper left */}
          <div className="absolute top-4 left-6 sm:left-16 w-24 h-24 opacity-35 pointer-events-none z-20">
            <svg viewBox="0 0 60 60" fill="none" className="w-full h-full text-stone-900">
              <path d="M4 8 L24 20 M8 4 L26 22 M16 4 L28 24 M2 16 L22 24" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              <path d="M22 22 C 34 30, 42 42, 54 50" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>

          {/* Stone lantern warm amber floor glow */}
          <div className="absolute bottom-6 right-1/4 w-24 h-24 rounded-full bg-amber-500/15 blur-2xl pointer-events-none" />

          <div className="w-full max-w-6xl mx-auto relative min-h-[580px] sm:min-h-[660px] flex flex-col lg:flex-row justify-between items-center gap-12 lg:gap-0">
            {/* PHYSICAL ARTIFACT: Hanging Japanese Washi Scroll suspended vertically off-axis */}
            <div className="lg:ml-12 xl:ml-20 world-vista-reveal will-change-transform z-20">
              <div className="relative w-48 sm:w-56 h-72 sm:h-84 flex flex-col items-center transform rotate-[-1.5deg] hover:rotate-0 transition-transform duration-500 select-none">
                {/* Top Silk Hanging Cord & Cedar Dowel Rod */}
                <div className="w-14 h-0.5 bg-amber-800/70 mb-1 rounded-full" />
                <div className="w-full h-3 bg-gradient-to-r from-[#2A180E] via-[#3E2516] to-[#2A180E] rounded-sm shadow-md border-b border-amber-950/60" />

                {/* Textured Fibrous Washi Paper Scroll Body on Deep Charcoal Brocade */}
                <div className="w-[92%] flex-1 bg-[#121214] border-x border-stone-800/80 shadow-[0_24px_55px_-10px_rgba(0,0,0,0.85)] p-3.5 flex flex-col justify-between text-center relative overflow-hidden">
                  {/* Center Washi Sheet (Honshi) */}
                  <div className="relative flex-1 bg-[#EFE8DC] border border-amber-900/15 shadow-inner p-3 flex flex-col justify-between overflow-hidden">
                    {/* Washi paper fiber grain */}
                    <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#78350F_1px,transparent_1px)] [background-size:8px_8px]" />

                    {/* Sumi Ink Calligraphy */}
                    <div className="my-auto space-y-1.5 relative z-10">
                      <span className="text-4xl sm:text-5xl font-serif text-[#1C1917] font-light tracking-widest block drop-shadow-xs select-none">
                        静寂
                      </span>
                      <p className="text-[11px] font-serif italic text-stone-700 leading-relaxed font-medium">
                        “Some words live quietly in the shadows.”
                      </p>
                    </div>

                    {/* AUTHENTIC CINNABAR HANKO STAMP (Actual pressed vermilion ink impression with natural bleed) */}
                    <div className="flex justify-end pt-2 relative z-10">
                      <svg viewBox="0 0 28 28" className="w-6 h-6 opacity-90 filter drop-shadow-[0_1px_1px_rgba(153,27,27,0.4)]" aria-label="Vermilion Hanko imprint">
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
        {/* WORLD 4: APRICOT FILM (Cinema Reel — Complete Recomposition)   */}
        {/* Spatial Composition: One continuous loose acetate strip        */}
        {/* traveling diagonally across the scene, hero frame catching     */}
        {/* incandescent projector beam with dust motes. No cards.         */}
        {/* ============================================================== */}
        <div className="world-vista-scene relative w-full min-h-[88vh] sm:min-h-[96vh] flex items-center justify-center px-6 sm:px-12 py-16 overflow-hidden">
          <AmbientBotanicalFrame variant="warm" density="subtle" intensity={0.75} />

          {/* Dark Room Ambient Warm Glow */}
          <div className="absolute w-[500px] sm:w-[700px] h-[400px] sm:h-[500px] rounded-full bg-gradient-to-tr from-amber-500/35 via-orange-950/25 to-transparent blur-3xl pointer-events-none -z-10" />

          {/* DIAGONAL INCANDESCENT PROJECTOR BEAM Cutting Across Viewport */}
          <div
            className="absolute inset-y-0 -inset-x-12 bg-gradient-to-r from-amber-400/20 via-amber-200/15 to-transparent blur-md pointer-events-none"
            style={{
              clipPath: "polygon(0 8%, 100% 0%, 100% 72%, 0 55%)",
            }}
          />

          {/* Floating Projector Dust Motes in Light Beam */}
          <div className="absolute top-1/5 left-1/4 w-1.5 h-1.5 rounded-full bg-amber-200/80 blur-[0.4px] pointer-events-none animate-pulse" />
          <div className="absolute top-1/4 left-1/2 w-1 h-1 rounded-full bg-amber-100/70 blur-[0.3px] pointer-events-none" />
          <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 rounded-full bg-amber-300/60 blur-[0.5px] pointer-events-none" />

          {/* ONE LOOSE ACETATE CELLULOID FILM STRIP Traveling Diagonally Across */}
          <div className="absolute inset-x-[-15%] sm:inset-x-[-5%] top-[34%] sm:top-[36%] -translate-y-1/2 z-20 pointer-events-none select-none transform rotate-[-8deg] drop-shadow-[0_24px_50px_rgba(0,0,0,0.95)]">
            {/* The Continuous Acetate Ribbon */}
            <div className="w-full bg-gradient-to-r from-amber-950/85 via-amber-900/75 to-amber-950/85 backdrop-blur-[2px] border-y border-amber-500/35 py-2 px-1 flex flex-col gap-2">
              {/* Top Continuous Sprocket Perforations */}
              <div className="flex items-center justify-between px-2 overflow-hidden">
                {[...Array(24)].map((_, i) => (
                  <div key={i} className="w-3 h-2 bg-black/95 rounded-[1px] border border-amber-600/40 shadow-inner shrink-0 mx-1.5" />
                ))}
              </div>

              {/* 4–5 Visible Celluloid Memory Frames Traveling Across */}
              <div className="flex items-center justify-center gap-3 sm:gap-6 px-4 overflow-hidden">
                {/* Frame 1: Underexposed entry frame cutting off at left */}
                <div className="w-36 sm:w-48 h-24 sm:h-28 bg-amber-950/60 border border-amber-700/25 rounded-xs opacity-40 shrink-0" />

                {/* Frame 2: Soft sepia memory frame */}
                <div className="w-40 sm:w-56 h-26 sm:h-30 bg-gradient-to-br from-[#1C0D05]/80 to-[#2D1609]/80 border border-amber-600/35 rounded-xs opacity-75 shrink-0" />

                {/* Frame 3: THE HERO FRAME catching the incandescent projector beam */}
                <div className="w-56 sm:w-72 h-32 sm:h-36 bg-gradient-to-br from-[#1C0D05] via-[#2D1609] to-[#140803] border-2 border-amber-400/60 rounded-xs shadow-[0_0_30px_rgba(251,191,36,0.45)] p-4 flex items-center justify-center text-center relative overflow-hidden shrink-0">
                  {/* Beam glare over hero celluloid */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-amber-300/20 via-transparent to-amber-100/30 pointer-events-none" />
                  <p className="font-serif italic text-xs sm:text-sm text-amber-100 font-medium leading-relaxed drop-shadow-[0_1px_6px_rgba(0,0,0,0.9)] relative z-10">
                    “Sunlight in your hair, golden and still.”
                  </p>
                </div>

                {/* Frame 4: Motion warm frame */}
                <div className="w-40 sm:w-56 h-26 sm:h-30 bg-gradient-to-br from-[#1C0D05]/80 to-[#2D1609]/80 border border-amber-600/35 rounded-xs opacity-75 shrink-0" />

                {/* Frame 5: Exit frame cutting off at right */}
                <div className="w-36 sm:w-48 h-24 sm:h-28 bg-amber-950/60 border border-amber-700/25 rounded-xs opacity-40 shrink-0" />
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
        {/* Spatial Composition: Herbarium sheet partly cropped at edge,   */}
        {/* stems escape freely, independent field notes                   */}
        {/* ============================================================== */}
        <div className="world-vista-scene relative w-full min-h-[85vh] sm:min-h-[92vh] flex items-center justify-center px-6 sm:px-12 py-16 overflow-hidden">
          <AmbientBotanicalFrame variant="meadow" density="subtle" intensity={0.75} />

          {/* Meadow daylight aura */}
          <div className="absolute w-[500px] sm:w-[700px] h-[400px] sm:h-[500px] rounded-full bg-gradient-to-tr from-amber-300/20 via-stone-400/15 to-purple-950/15 blur-3xl pointer-events-none -z-10" />

          <div className="w-full max-w-6xl mx-auto relative min-h-[520px] sm:min-h-[580px] flex flex-col lg:flex-row justify-between items-center gap-12 lg:gap-0">
            {/* PHYSICAL ARTIFACT: Deckled Cotton Herbarium Sheet partly cropped by edge */}
            <div className="lg:-ml-8 xl:-ml-12 world-vista-reveal will-change-transform z-20">
              <div className="relative w-64 sm:w-72 h-72 sm:h-80 select-none">
                {/* Independent Field Note Fragment resting nearby on desk */}
                <div className="absolute -bottom-4 right-2 z-25 pointer-events-none transform rotate-[8deg] opacity-90 drop-shadow-sm">
                  <div className="py-1 px-2.5 bg-[#F5EFE6] border border-stone-300/70 rounded-xs text-left">
                    <span className="text-[7.5px] font-mono text-stone-700 block font-semibold">PRESSED № 05 · MEADOW</span>
                    <span className="font-serif italic text-[9px] text-stone-600">collected at dusk</span>
                  </div>
                </div>

                {/* The Deckled Herbarium Sheet */}
                <div className="relative w-56 h-64 sm:w-64 sm:h-72 bg-[#FAF7F0] shadow-[0_20px_50px_-10px_rgba(180,120,50,0.22),0_4px_12px_rgba(0,0,0,0.06)] border border-stone-300/80 transform rotate-[-2.5deg] hover:rotate-0 transition-transform duration-500 p-4 flex flex-col justify-between">
                  {/* Linen Thread Binding */}
                  <div className="absolute -top-2 left-6 w-1 h-5 bg-[#A89F91] rounded-full shadow-sm z-20" />
                  <div className="absolute top-1 left-4 w-5 h-1 bg-[#A89F91] rounded-full shadow-sm z-20" />

                  {/* REAL DRIED BOTANICAL SPECIMEN: Stems escape past sheet perimeter! */}
                  <div className="absolute -top-8 -right-6 z-25 pointer-events-none">
                    <svg viewBox="0 0 44 76" fill="none" className="w-14 h-24 drop-shadow-[0_4px_8px_rgba(0,0,0,0.15)]">
                      <path d="M12 74 C 16 52, 20 30, 28 6" stroke="#5B684B" strokeWidth="1.6" strokeLinecap="round" />
                      <ellipse cx="28" cy="6" rx="5" ry="3.5" fill="#C084FC" fillOpacity="0.85" />
                      <ellipse cx="24" cy="15" rx="4.5" ry="3" fill="#A855F7" fillOpacity="0.8" />
                      <ellipse cx="30" cy="24" rx="4" ry="2.8" fill="#C084FC" fillOpacity="0.75" />
                      <path d="M16 42 C 9 36, 10 28, 17 34 Z" fill="#849974" fillOpacity="0.85" />
                      <path d="M21 54 C 29 48, 27 40, 20 46 Z" fill="#718762" fillOpacity="0.85" />
                    </svg>
                  </div>

                  <div className="h-4" />

                  {/* Quote */}
                  <div className="my-auto text-center space-y-1.5 pt-2">
                    <p className="text-xs font-serif italic text-stone-900 font-medium leading-relaxed">
                      “Pressed by hand, kept forever.”
                    </p>
                  </div>

                  <div className="pt-2 border-t border-stone-200 text-right">
                    <span className="font-serif italic text-[9px] text-stone-600">honestly grown</span>
                  </div>
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
        {/* Spatial Composition: Parchment sits low in shoreline fog,      */}
        {/* frosted sea-glass pebble is the hero casting cyan caustics,    */}
        {/* text placed away in open night sky                             */}
        {/* ============================================================== */}
        <div className="world-vista-scene relative w-full min-h-[85vh] sm:min-h-[92vh] flex items-center justify-center px-6 sm:px-12 py-16 overflow-hidden">
          <AmbientBotanicalFrame variant="ocean" density="subtle" intensity={0.75} />

          {/* Coastal Fog & Cyan Sea Starlight */}
          <div className="absolute w-[500px] sm:w-[700px] h-[400px] sm:h-[500px] rounded-full bg-gradient-to-tr from-sky-500/22 via-slate-900/30 to-transparent blur-3xl pointer-events-none -z-10" />

          {/* Environmental Prop: Coastal Tide Foam Contour */}
          <div className="absolute bottom-4 left-8 w-48 h-24 opacity-25 pointer-events-none blur-md">
            <svg viewBox="0 0 140 80" fill="none" className="w-full h-full text-cyan-200">
              <path d="M10 60 C 40 30, 80 50, 130 30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>

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

            {/* PHYSICAL ENVIRONMENT: Shoreline Parchment on Slate + Frosted Sea Glass Hero Low */}
            <div className="self-center sm:self-end sm:mr-8 lg:mr-20 pb-4 sm:pb-8 world-vista-reveal will-change-transform z-20">
              <div className="relative w-72 h-56 sm:w-80 sm:h-60 select-none">
                {/* Dark Wet Slate Stone Base */}
                <div className="relative w-68 h-48 sm:w-76 sm:h-52 bg-[#07131F] border border-cyan-950/60 shadow-[0_30px_70px_rgba(0,0,0,0.95)] p-4 flex items-center justify-center">
                  {/* Tidal contours on stone */}
                  <div className="absolute inset-0 pointer-events-none opacity-20">
                    <svg viewBox="0 0 240 180" fill="none" className="w-full h-full">
                      <path d="M0 60 Q 60 40, 120 60 T 240 60" stroke="#38BDF8" strokeWidth="0.8" />
                      <path d="M0 120 Q 60 100, 120 120 T 240 120" stroke="#38BDF8" strokeWidth="0.8" />
                    </svg>
                  </div>

                  {/* Weathered Shoreline Parchment fading into shoreline mist */}
                  <div className="relative w-54 h-36 sm:w-60 sm:h-40 bg-[#E9EEF0] shadow-md border border-cyan-900/20 rotate-[-2.5deg] p-3 flex flex-col justify-between">
                    <div className="h-2" />
                    <p className="font-serif italic text-xs text-sky-950 font-medium text-center leading-relaxed drop-shadow-xs px-1">
                      “Our devotion is as vast and enduring as the evening tides.”
                    </p>
                    <div className="text-right text-[8.5px] font-serif italic text-sky-800">
                      unbroken across the sea
                    </div>
                  </div>

                  {/* THE HERO: Tactile Frosted Sea-Glass Pebble Casting Cyan Caustics */}
                  <div className="absolute -top-4 right-4 z-30 pointer-events-none">
                    <div className="relative w-22 h-14 sm:w-24 sm:h-15 rounded-[45%_55%_60%_40%/50%_45%_55%_50%] bg-gradient-to-br from-cyan-200/40 via-cyan-400/30 to-teal-500/25 backdrop-blur-md border border-cyan-100/60 shadow-[0_8px_32px_rgba(34,211,238,0.55),0_2px_8px_rgba(6,182,212,0.7)] transform rotate-12 flex items-center justify-center">
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
