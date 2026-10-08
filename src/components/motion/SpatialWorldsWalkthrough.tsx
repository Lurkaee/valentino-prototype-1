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

interface WorldWalkthroughItem {
  id: string;
  name: string;
  jpName?: string;
  tagline: string;
  glowGradient: string;
  accentColor: string;
  titleClass: string;
  taglineClass: string;
  badgeClass: string;
  buttonClass?: string;
  layoutVariant: "sky-flight" | "candlelit-alcove" | "vertical-scroll" | "cinema-reel" | "herbarium-desk" | "shoreline-drift";
  renderArtifact: () => React.ReactNode;
}

const WORLDS: WorldWalkthroughItem[] = [
  {
    id: "cloud-nine",
    name: "Cloud Nine",
    tagline: "For the person who makes everything lighter.",
    glowGradient: "from-amber-200/25 via-sky-300/20 to-transparent",
    accentColor: "#38bdf8",
    titleClass: "text-[#1A0311] drop-shadow-[0_1px_12px_rgba(255,250,240,0.6)]",
    taglineClass: "text-[#36091E] font-normal drop-shadow-[0_1px_6px_rgba(255,250,240,0.6)]",
    badgeClass: "text-[#0369A1] font-semibold tracking-widest drop-shadow-[0_1px_4px_rgba(255,255,255,0.7)]",
    layoutVariant: "sky-flight",
    renderArtifact: () => (
      <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center select-none">
        {/* Soft morning sun halo */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-200/35 via-sky-200/25 to-rose-100/20 blur-3xl pointer-events-none" />

        {/* Environmental Prop: Soft Drifting Cumulus Cloud Shadow Silhouette */}
        <div className="absolute -bottom-6 -right-8 w-48 h-28 opacity-25 pointer-events-none blur-xl">
          <svg viewBox="0 0 200 120" fill="none" className="w-full h-full">
            <path d="M20 80 Q 40 40, 80 50 Q 110 20, 150 40 Q 190 50, 180 90 Q 150 115, 90 110 Q 30 115, 20 80 Z" fill="#38BDF8" />
          </svg>
        </div>

        {/* NARRATIVE CONTINUITY: The First Coffee ticket stub from stationery arrives here as a kept memory */}
        <div className="absolute -top-4 -left-4 sm:-top-6 sm:-left-6 z-30 pointer-events-none select-none transform rotate-[-9deg] opacity-95 drop-shadow-[0_10px_20px_rgba(3,105,161,0.22)]">
          <div className="w-24 sm:w-28 py-1.5 px-2 bg-[#FAF5EE] rounded-xs border border-sky-300/40 text-left shadow-sm">
            <span className="block text-[6.5px] font-mono tracking-widest text-[#0369A1] uppercase font-semibold">10.14 · MEMORY</span>
            <span className="font-serif italic text-[10px] text-[#1A0311] leading-none">First Coffee</span>
            <span className="block text-[6px] font-mono tracking-widest text-sky-800/70 mt-0.5">ADMIT ONE · № 0214</span>
          </div>
        </div>

        {/* Environmental Prop: Loose Torn Scrap of Pale Blue Note Paper Drifting Below */}
        <div className="absolute -bottom-3 -left-3 z-15 pointer-events-none select-none transform rotate-[8deg] opacity-80 drop-shadow-[0_4px_12px_rgba(0,0,0,0.06)]">
          <div className="w-18 py-1 px-2 bg-[#F0F8FF] rounded-xs border border-sky-200/60 text-left">
            <span className="font-serif italic text-[8.5px] text-sky-900 leading-none">“skyward”</span>
          </div>
        </div>

        {/* PHYSICAL ARTIFACT: Folded Airmail Aerogramme (NO ROUNDED CARD BOUNDARY) */}
        <div className="relative w-52 h-40 sm:w-60 sm:h-44 bg-[#FFFDF9] shadow-[0_24px_50px_-10px_rgba(186,215,248,0.5),0_4px_12px_rgba(0,0,0,0.06)] transform rotate-[3.5deg] hover:rotate-0 transition-transform duration-500 overflow-hidden border border-sky-200/50">
          {/* Airmail Par Avion Hatched Border Trim (Top and Bottom edges) */}
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

          {/* Folded Envelope Flap Diagonal Crease Lines */}
          <div className="absolute inset-0 pointer-events-none">
            <svg viewBox="0 0 240 176" fill="none" className="w-full h-full">
              <path d="M0 8 L120 90 L240 8" stroke="#BAE6FD" strokeWidth="1" strokeDasharray="3 3" opacity="0.7" />
              <path d="M0 168 L95 105" stroke="#BAE6FD" strokeWidth="0.75" strokeDasharray="3 3" opacity="0.5" />
              <path d="M240 168 L145 105" stroke="#BAE6FD" strokeWidth="0.75" strokeDasharray="3 3" opacity="0.5" />
            </svg>
          </div>

          {/* Postal Cancellation Stamp (Circular Postmark Imprint) */}
          <div className="absolute top-3 right-3 w-12 h-12 rounded-full border border-sky-400/70 border-dashed flex flex-col items-center justify-center text-[7px] font-mono text-sky-700 leading-none rotate-12 select-none opacity-85">
            <span className="font-semibold">CLOUD 9</span>
            <span className="font-bold my-0.5 text-[8px] text-[#0369A1]">14.02</span>
            <span>POST</span>
          </div>

          {/* Inscribed Aerogramme Content */}
          <div className="pt-5 px-4 pb-3 flex flex-col justify-between h-full text-left relative z-10">
            <div>
              <span className="inline-block text-[8px] font-mono tracking-widest text-[#0369A1] uppercase font-semibold">
                PAR AVION · AIRMAIL
              </span>
              <p className="font-serif italic text-xs text-[#0F172A] mt-2 font-medium leading-relaxed">
                “Every sunrise is lighter with you.”
              </p>
            </div>
            <div className="flex items-center justify-between text-[9px] font-mono text-sky-800/80 pt-1 border-t border-sky-100">
              <span>DAWN FLIGHT № 09</span>
              <span className="font-serif italic text-[#0369A1]">yours in the clouds</span>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "midnight-rose",
    name: "Midnight Rose",
    tagline: "For the love that feels like midnight.",
    glowGradient: "from-amber-500/25 via-rose-950/45 to-transparent",
    accentColor: "#e11d48",
    titleClass: "text-[#FFFBF5] drop-shadow-[0_2px_16px_rgba(10,0,5,0.9)]",
    taglineClass: "text-[#FECDD3] drop-shadow-[0_1px_8px_rgba(10,0,5,0.85)]",
    badgeClass: "text-amber-300 font-semibold drop-shadow-[0_1px_6px_rgba(10,0,5,0.85)]",
    layoutVariant: "candlelit-alcove",
    renderArtifact: () => (
      <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center select-none">
        {/* Candlelit warm glow & deep chiaroscuro */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-rose-900/50 via-amber-700/20 to-black/60 blur-3xl pointer-events-none" />

        {/* Environmental Prop: Flickering Candle Flame Point & Rising Smoke Wisp */}
        <div className="absolute top-0 right-6 flex flex-col items-center pointer-events-none z-20">
          {/* Subtle rising candle smoke wisp */}
          <div className="w-8 h-10 opacity-30 blur-[1px]">
            <svg viewBox="0 0 32 40" fill="none" className="w-full h-full text-amber-200">
              <path d="M16 38 C 14 30, 20 22, 17 14 C 15 8, 22 4, 20 0" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
            </svg>
          </div>
          <div className="w-2.5 h-3.5 rounded-full bg-gradient-to-t from-amber-500 via-amber-300 to-white blur-[0.5px] shadow-[0_0_18px_rgba(251,191,36,0.95)] animate-pulse" />
          <div className="w-0.5 h-2.5 bg-neutral-700 mt-0.5 rounded-full" />
        </div>

        {/* Environmental Prop: Stray Fallen Rose Petal Resting at Base */}
        <div className="absolute -bottom-3 left-4 z-20 pointer-events-none transform -rotate-12 opacity-85 drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)]">
          <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-[#9F1239]">
            <path d="M5 16 C 3 9, 10 3, 17 4 C 20 11, 13 19, 5 16 Z" fill="currentColor" fillOpacity="0.8" />
          </svg>
        </div>

        {/* PHYSICAL ARTIFACT: Hand-Poured Wax Sealed Velvet Envelope Pocket */}
        <div className="relative w-56 h-40 sm:w-64 sm:h-44 bg-gradient-to-b from-[#2A0516] via-[#1B020E] to-[#0D0107] shadow-[0_28px_60px_-10px_rgba(225,29,72,0.4),0_6px_20px_rgba(0,0,0,0.8)] border border-amber-500/30 transform rotate-[-3.5deg] hover:rotate-0 transition-transform duration-500 overflow-visible">
          {/* Velvet Fabric Crease / Pointed Envelope Flap with Velvet Shadow */}
          <div className="absolute top-0 inset-x-0 h-20 bg-gradient-to-b from-[#38071E] to-[#200311] [clip-path:polygon(0_0,100%_0,50%_100%)] shadow-[0_4px_12px_rgba(0,0,0,0.7)] border-t border-amber-400/20" />

          {/* Real Dimensional Wax Seal poured over the pointed envelope flap */}
          <div className="absolute top-16 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
            <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-[#E11D48] via-[#9F1239] to-[#4C0519] border-2 border-amber-300/60 shadow-[0_6px_20px_rgba(159,18,57,0.7),inset_0_2px_4px_rgba(255,255,255,0.4)] flex items-center justify-center transform hover:scale-105 transition-transform">
              {/* Dripping wax edge irregularities */}
              <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-[#881337] opacity-90" />
              <div className="absolute -top-0.5 -left-1 w-2.5 h-2.5 rounded-full bg-[#9F1239] opacity-80" />
              {/* Embossed Rose Monogram Mark */}
              <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-amber-200/90 drop-shadow-sm" aria-hidden="true">
                <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1" strokeDasharray="1.5 2" />
                <path d="M12 6 C 14 6, 16 8, 15 10 C 14 12, 12 13, 12 15" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                <path d="M12 8 C 10 9, 9 11, 11 12 C 12 13, 13 13, 14 14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                <circle cx="12" cy="10" r="1.5" fill="currentColor" />
              </svg>
            </div>
          </div>

          {/* Gold Foil Margin Script */}
          <div className="absolute bottom-3 inset-x-4 flex items-center justify-between text-[8px] font-mono tracking-widest text-amber-300/80">
            <span>SEALED BY CANDLELIGHT</span>
            <span>№ 01 · MIDNIGHT</span>
          </div>

          {/* Intimate Letter Quote */}
          <div className="absolute top-22 inset-x-5 text-center">
            <p className="font-serif italic text-xs text-rose-100 font-medium leading-relaxed drop-shadow-sm">
              “Written in quiet starlight, meant only for you.”
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "kage",
    name: "Kage",
    jpName: "影",
    tagline: "For the love of quiet shadows and unspoken truths.",
    glowGradient: "from-amber-600/18 via-emerald-950/25 to-stone-950/30",
    accentColor: "#10b981",
    titleClass: "text-[#F0FDF4] drop-shadow-[0_2px_16px_rgba(2,15,10,0.95)]",
    taglineClass: "text-[#A7F3D0] drop-shadow-[0_1px_8px_rgba(2,15,10,0.9)]",
    badgeClass: "text-emerald-300 font-semibold drop-shadow-[0_1px_6px_rgba(2,15,10,0.9)]",
    layoutVariant: "vertical-scroll",
    renderArtifact: () => (
      <div className="relative w-56 h-72 sm:w-64 sm:h-80 flex items-center justify-center select-none">
        {/* Kyoto Cedar Temple Mist Aura */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-600/15 via-emerald-900/20 to-stone-900/40 blur-3xl pointer-events-none" />

        {/* Environmental Prop: Stone Lantern Amber Glow */}
        <div className="absolute bottom-2 -right-4 w-16 h-16 rounded-full bg-amber-500/15 blur-xl pointer-events-none" />

        {/* Environmental Prop: Cedar Pine Needles Silhouette casting shadow from upper left */}
        <div className="absolute -top-4 -left-6 w-20 h-20 opacity-30 pointer-events-none z-20">
          <svg viewBox="0 0 60 60" fill="none" className="w-full h-full text-emerald-900">
            <path d="M4 8 L24 20 M8 4 L26 22 M16 4 L28 24 M2 16 L22 24" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M22 22 C 34 30, 42 42, 54 50" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>

        {/* PHYSICAL ARTIFACT: Hanging Japanese Washi Hanging Scroll (Kakejiku) */}
        <div className="relative w-44 sm:w-50 h-64 sm:h-72 flex flex-col items-center transform rotate-[-1deg] hover:rotate-0 transition-transform duration-500">
          {/* Top Natural Cedar Dowel Rod & Hanging Cord */}
          <div className="w-12 h-0.5 bg-amber-700/60 mb-1 rounded-full" />
          <div className="w-full h-3 bg-gradient-to-r from-[#1E140C] via-[#3B2818] to-[#1E140C] rounded-sm shadow-md border-b border-amber-900/40" />

          {/* Textured Fibrous Washi Paper Scroll Body */}
          <div className="w-[92%] flex-1 bg-[#091510] border-x border-stone-700/40 shadow-[0_20px_50px_-10px_rgba(16,185,129,0.25)] p-4 flex flex-col justify-between text-center relative overflow-hidden">
            {/* Raw Washi Paper Fiber Texture Hint */}
            <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:12px_12px]" />

            <div className="flex items-center justify-between text-[8px] font-mono text-emerald-300/80 font-semibold tracking-wider relative z-10">
              <span>KYOTO SANCTUARY</span>
              <span>影 · 03</span>
            </div>

            {/* Sumi Ink Calligraphy */}
            <div className="my-auto space-y-2 relative z-10">
              <span className="text-4xl font-serif text-emerald-100 font-light tracking-widest block drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                静寂
              </span>
              <p className="text-[11px] font-serif italic text-emerald-200/90 leading-relaxed font-normal">
                “Some words live quietly in the shadows.”
              </p>
            </div>

            {/* Red Vermilion Hanko Artist Seal (印) */}
            <div className="flex items-center justify-between pt-2 border-t border-emerald-900/40 relative z-10">
              <span className="text-[7.5px] font-mono text-stone-400">CEDAR & MIST</span>
              <div className="w-5 h-5 rounded-xs border border-red-500/80 bg-red-950/70 text-red-400 flex items-center justify-center text-[8px] font-serif font-bold shadow-sm">
                印
              </div>
            </div>
          </div>

          {/* Bottom Weight Cedar Dowel Rod */}
          <div className="w-full h-3 bg-gradient-to-r from-[#1E140C] via-[#3B2818] to-[#1E140C] rounded-sm shadow-md border-t border-amber-900/40" />
        </div>
      </div>
    ),
  },
  {
    id: "apricot-film",
    name: "Apricot Film",
    tagline: "For memories that feel like a sun-drenched afternoon.",
    glowGradient: "from-amber-500/35 via-orange-950/25 to-transparent",
    accentColor: "#f59e0b",
    titleClass: "text-[#FFFBEB] drop-shadow-[0_2px_16px_rgba(30,12,2,0.9)]",
    taglineClass: "text-[#FDE68A] drop-shadow-[0_1px_8px_rgba(30,12,2,0.85)]",
    badgeClass: "text-amber-200 font-semibold drop-shadow-[0_1px_6px_rgba(30,12,2,0.85)]",
    layoutVariant: "cinema-reel",
    renderArtifact: () => (
      <div className="relative w-64 h-56 sm:w-72 sm:h-64 flex items-center justify-center select-none">
        {/* Golden Hour Projector Lens Flare */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-500/35 via-orange-600/20 to-rose-400/20 blur-3xl pointer-events-none" />

        {/* Diagonal Light Leak Beam & Projector Dust Motes */}
        <div className="absolute -top-4 -right-6 w-32 h-44 bg-gradient-to-b from-amber-300/30 via-orange-400/10 to-transparent rotate-[-30deg] blur-lg pointer-events-none" />
        <div className="absolute top-2 right-4 w-1.5 h-1.5 rounded-full bg-amber-200/80 blur-[0.5px] pointer-events-none animate-pulse" />
        <div className="absolute top-8 right-12 w-1 h-1 rounded-full bg-amber-100/70 blur-[0.3px] pointer-events-none" />

        {/* PHYSICAL ARTIFACT: 16mm Archival Film Strip (Continuous Sprocket Holes) */}
        <div className="relative w-56 sm:w-64 bg-[#140A04] shadow-[0_24px_60px_-10px_rgba(245,158,11,0.35),0_4px_16px_rgba(0,0,0,0.8)] border border-amber-600/40 transform rotate-[3deg] hover:rotate-0 transition-transform duration-500 p-2.5">
          {/* Top Sprocket Perforations Strip */}
          <div className="flex items-center justify-between px-1 mb-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="w-2.5 h-1.5 bg-black rounded-xs border border-amber-950/80 shadow-inner" />
            ))}
          </div>

          {/* Film Cell Exposure Frame */}
          <div className="relative bg-[#261206] border border-amber-500/30 p-3 text-center overflow-hidden">
            <div className="flex items-center justify-between text-[7.5px] font-mono text-amber-400/80 mb-1.5">
              <span>KODAK 5207</span>
              <span>16MM · FRAME 24</span>
            </div>

            {/* Cinematic Still & Subtitle */}
            <div className="py-2.5 px-2 bg-black/60 rounded border border-amber-500/20 text-center">
              <svg viewBox="0 0 24 18" fill="none" className="w-5 h-4 mx-auto text-amber-300/90 mb-1" aria-hidden="true">
                <rect x="2" y="1" width="20" height="16" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
                <rect x="8" y="4" width="8" height="10" rx="1" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="0.8" />
              </svg>
              <p className="text-xs font-serif italic text-amber-100 font-medium leading-relaxed">
                “Sunlight caught in your hair, golden and still.”
              </p>
            </div>

            <div className="text-[7px] font-mono text-amber-500/70 mt-1.5 text-right tracking-widest">
              OCTOBER AFTERNOON · 24FPS
            </div>
          </div>

          {/* Bottom Sprocket Perforations Strip */}
          <div className="flex items-center justify-between px-1 mt-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="w-2.5 h-1.5 bg-black rounded-xs border border-amber-950/80 shadow-inner" />
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "wildflower-paper",
    name: "Wildflower Paper",
    tagline: "For the love built by hand, petal by petal.",
    glowGradient: "from-amber-300/20 via-stone-400/15 to-purple-950/15",
    accentColor: "#eab308",
    titleClass: "text-[#1A0311] drop-shadow-[0_1px_12px_rgba(255,248,240,0.6)]",
    taglineClass: "text-[#361A09] font-normal drop-shadow-[0_1px_6px_rgba(255,248,240,0.6)]",
    badgeClass: "text-[#78350F] font-semibold tracking-widest drop-shadow-[0_1px_4px_rgba(255,248,240,0.5)]",
    layoutVariant: "herbarium-desk",
    renderArtifact: () => (
      <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center select-none">
        {/* Meadow daylight aura */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-200/25 via-stone-300/15 to-emerald-200/15 blur-3xl pointer-events-none" />

        {/* Environmental Prop: Torn Scrap of Cotton Paper Tucked Behind */}
        <div className="absolute -bottom-2 -left-4 z-15 pointer-events-none transform rotate-[-6deg] opacity-80">
          <div className="w-20 py-1 px-2 bg-[#F5EFE6] border border-stone-300/60 rounded-xs">
            <span className="text-[7px] font-mono text-stone-600 block">PRESSED № 05</span>
          </div>
        </div>

        {/* PHYSICAL ARTIFACT: Deckled Cotton Herbarium Sheet with Stems Escaping */}
        <div className="relative w-52 h-60 sm:w-56 sm:h-64 bg-[#FAF7F0] shadow-[0_20px_50px_-10px_rgba(180,120,50,0.22),0_4px_12px_rgba(0,0,0,0.06)] border border-stone-300/80 transform rotate-[-2.5deg] hover:rotate-0 transition-transform duration-500 p-4 flex flex-col justify-between">
          {/* Bound Natural Linen Thread in Top Corner */}
          <div className="absolute -top-2 left-6 w-1 h-5 bg-[#A89F91] rounded-full shadow-sm z-20" />
          <div className="absolute top-1 left-4 w-5 h-1 bg-[#A89F91] rounded-full shadow-sm z-20" />

          {/* REAL DRIED BOTANICAL SPECIMEN: Stems extend past the page perimeter! */}
          <div className="absolute -top-6 -right-4 sm:-top-8 sm:-right-5 z-20 pointer-events-none">
            <svg viewBox="0 0 40 70" fill="none" className="w-12 h-20 drop-shadow-[0_4px_8px_rgba(0,0,0,0.15)]">
              {/* Main stem escaping sheet */}
              <path d="M12 68 C 16 48, 20 28, 26 6" stroke="#5B684B" strokeWidth="1.4" strokeLinecap="round" />
              {/* Pressed lavender flower petals */}
              <ellipse cx="26" cy="6" rx="5" ry="3.5" fill="#C084FC" fillOpacity="0.8" />
              <ellipse cx="22" cy="14" rx="4.5" ry="3" fill="#A855F7" fillOpacity="0.75" />
              <ellipse cx="28" cy="22" rx="4" ry="2.8" fill="#C084FC" fillOpacity="0.7" />
              {/* Sage leaves */}
              <path d="M16 38 C 9 32, 10 24, 17 30 Z" fill="#849974" fillOpacity="0.85" />
              <path d="M20 48 C 28 42, 26 34, 19 40 Z" fill="#718762" fillOpacity="0.85" />
            </svg>
          </div>

          <div className="flex items-center justify-between text-[8px] font-mono text-stone-600 font-semibold tracking-wider">
            <span>HERBARIUM SPECIMEN</span>
            <span>PETAL NO. 05</span>
          </div>

          {/* Hand-Pressed Botanical Drawing & Quote */}
          <div className="my-auto text-center space-y-1.5 pt-2">
            <p className="text-xs font-serif italic text-stone-900 font-medium leading-relaxed">
              “Pressed by hand, kept forever.”
            </p>
          </div>

          {/* Handwritten Accession Record */}
          <div className="pt-2 border-t border-stone-200 text-[8px] font-mono text-stone-500 flex items-center justify-between">
            <span>DECKLED COTTON · 280GSM</span>
            <span className="font-serif italic text-stone-700">honestly grown</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "ocean-letter",
    name: "Ocean Letter",
    tagline: "For words meant to cross any distance.",
    glowGradient: "from-sky-500/22 via-slate-900/30 to-transparent",
    accentColor: "#38bdf8",
    titleClass: "text-[#F0F9FF] drop-shadow-[0_2px_18px_rgba(2,10,25,0.95)]",
    taglineClass: "text-[#BAE6FD] drop-shadow-[0_1px_8px_rgba(2,10,25,0.9)]",
    badgeClass: "text-sky-200 font-semibold drop-shadow-[0_1px_6px_rgba(2,10,25,0.9)]",
    layoutVariant: "shoreline-drift",
    renderArtifact: () => (
      <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center select-none">
        {/* Coastal Fog & Sea Starlight Phosphorescence */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-sky-600/30 via-cyan-800/25 to-indigo-950/40 blur-3xl pointer-events-none" />

        {/* Environmental Prop: Coastal Tide Foam Contour */}
        <div className="absolute -bottom-4 -left-6 w-36 h-20 opacity-30 pointer-events-none blur-md">
          <svg viewBox="0 0 140 80" fill="none" className="w-full h-full text-cyan-200">
            <path d="M10 60 C 40 30, 80 50, 130 30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>

        {/* PHYSICAL ARTIFACT: Weathered Shoreline Message & Sea Glass Talisman */}
        <div className="relative w-56 h-44 sm:w-64 sm:h-48 bg-[#071524] shadow-[0_24px_60px_-10px_rgba(56,189,248,0.35),0_6px_20px_rgba(0,0,0,0.8)] border border-sky-400/35 transform rotate-[2.5deg] hover:rotate-0 transition-transform duration-500 p-4 flex flex-col justify-between overflow-visible">
          {/* Watermark Tidal Contours & Salt-Spray Edge Marks */}
          <div className="absolute inset-0 pointer-events-none opacity-20">
            <svg viewBox="0 0 240 180" fill="none" className="w-full h-full">
              <path d="M0 60 Q 60 40, 120 60 T 240 60" stroke="#38BDF8" strokeWidth="0.8" />
              <path d="M0 120 Q 60 100, 120 120 T 240 120" stroke="#38BDF8" strokeWidth="0.8" />
              {/* Salt spray crystalline crust dots at edge */}
              <circle cx="8" cy="12" r="1.5" fill="#E0F2FE" />
              <circle cx="16" cy="8" r="1" fill="#E0F2FE" />
              <circle cx="230" cy="168" r="1.5" fill="#E0F2FE" />
              <circle cx="224" cy="172" r="1" fill="#E0F2FE" />
            </svg>
          </div>

          {/* Frosted Sea-Glass Fragment Resting Directly on the Parchment */}
          <div className="absolute -top-3 right-6 z-20 pointer-events-none">
            <div className="w-10 h-7 rounded-full bg-cyan-300/30 backdrop-blur-md border border-cyan-200/50 shadow-[0_4px_12px_rgba(56,189,248,0.4)] transform rotate-12 flex items-center justify-center">
              <div className="w-4 h-2 rounded-full bg-white/40 blur-[0.5px]" />
            </div>
          </div>

          <div className="flex items-center justify-between text-[8px] font-mono text-sky-300/80 font-semibold tracking-wider relative z-10">
            <span>SHORELINE ARCHIVE</span>
            <span>TIDE № 06</span>
          </div>

          {/* Inscribed Maritime Devotion */}
          <div className="my-auto text-center space-y-1 relative z-10 px-2">
            <p className="font-serif italic text-xs text-sky-100 font-medium leading-relaxed drop-shadow-sm">
              “Our devotion is as vast and enduring as the evening tides.”
            </p>
          </div>

          <div className="pt-2 border-t border-sky-900/50 flex items-center justify-between text-[8px] font-mono text-sky-400/70 relative z-10">
            <span>SALT-WASHED FIBERS</span>
            <span className="font-serif italic text-sky-200">unbroken across the sea</span>
          </div>
        </div>
      </div>
    ),
  },
];

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
        <span className="inline-block text-[11px] font-mono tracking-widest uppercase text-[#7A1D45] font-semibold drop-shadow-[0_1px_8px_rgba(255,245,248,0.7)]">
          The World Collection
        </span>
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-normal text-[#1A0311] tracking-tight leading-tight drop-shadow-[0_1px_12px_rgba(255,245,248,0.5)]">
          Step into their atmosphere.
        </h2>
        <p className="text-sm sm:text-base text-[#36091E] max-w-lg mx-auto font-normal leading-relaxed drop-shadow-[0_1px_6px_rgba(255,245,248,0.6)]">
          Six distinct digital sanctuaries — each with its own physical object, light, and emotional climate.
        </p>
      </div>

      {/* Sequential Full-Viewport Asymmetric Living Environments (NO IDENTICAL CENTERED STACKS) */}
      <div className="flex flex-col w-full relative z-10">
        {WORLDS.map((world, idx) => (
          <div
            key={world.id}
            className="world-vista-scene relative w-full min-h-[85vh] sm:min-h-[92vh] flex items-center justify-center px-6 sm:px-12 py-16 overflow-hidden"
          >
            {/* World-Aware Peripheral Botanical Edge Atmosphere */}
            <AmbientBotanicalFrame
              variant={WORLD_BOTANICAL_TONE[world.id] || "dusk"}
              density="subtle"
              intensity={0.75}
            />

            {/* Dynamic ambient bloom for this world */}
            <div
              className={`absolute w-[450px] sm:w-[650px] h-[350px] sm:h-[450px] rounded-full bg-gradient-to-tr ${world.glowGradient} blur-3xl pointer-events-none -z-10`}
            />

            {/* BESPOKE ASYMMETRIC GRID PER WORLD */}
            <div className="w-full max-w-6xl mx-auto">
              {/* VARIANT 1: SKY FLIGHT (Cloud Nine) — Title Lower-Left, Aerogramme Drifting Upper-Right */}
              {world.layoutVariant === "sky-flight" && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-5 order-2 lg:order-1">
                    <div className={`world-vista-reveal text-[10px] font-mono tracking-widest uppercase ${world.badgeClass}`}>
                      <span>0{idx + 1} OF 06 · SANCTUARY VISTA</span>
                    </div>
                    <h3 className={`world-vista-reveal text-4xl sm:text-5xl lg:text-6xl font-serif font-normal tracking-tight ${world.titleClass}`}>
                      {world.name}
                    </h3>
                    <p className={`world-vista-reveal text-lg sm:text-xl font-serif italic max-w-lg ${world.taglineClass}`}>
                      “{world.tagline}”
                    </p>
                    <div className="world-vista-reveal pt-2">
                      <AtmosphericButton href={`/create?template=${world.id}`} worldId={world.id} worldName={world.name} />
                    </div>
                  </div>
                  <div className="lg:col-span-5 flex justify-center lg:justify-end order-1 lg:order-2 world-vista-reveal will-change-transform">
                    {world.renderArtifact()}
                  </div>
                </div>
              )}

              {/* VARIANT 2: CANDLELIT ALCOVE (Midnight Rose) — Title Left, Sealed Velvet Dispatch Right with Flame Point */}
              {world.layoutVariant === "candlelit-alcove" && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left space-y-5 order-2 lg:order-1 lg:pl-6">
                    <div className={`world-vista-reveal text-[10px] font-mono tracking-widest uppercase ${world.badgeClass}`}>
                      <span>0{idx + 1} OF 06 · SANCTUARY VISTA</span>
                    </div>
                    <h3 className={`world-vista-reveal text-4xl sm:text-5xl lg:text-6xl font-serif font-normal tracking-tight ${world.titleClass}`}>
                      {world.name}
                    </h3>
                    <p className={`world-vista-reveal text-lg sm:text-xl font-serif italic max-w-md ${world.taglineClass}`}>
                      “{world.tagline}”
                    </p>
                    <div className="world-vista-reveal pt-2">
                      <AtmosphericButton href={`/create?template=${world.id}`} worldId={world.id} worldName={world.name} />
                    </div>
                  </div>
                  <div className="lg:col-span-6 flex justify-center lg:justify-end order-1 lg:order-2 world-vista-reveal will-change-transform lg:pr-6">
                    {world.renderArtifact()}
                  </div>
                </div>
              )}

              {/* VARIANT 3: VERTICAL SCROLL (Kage) — Hanging Washi Scroll Left, Verse and Title Right */}
              {world.layoutVariant === "vertical-scroll" && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  <div className="lg:col-span-5 flex justify-center lg:justify-end order-1 world-vista-reveal will-change-transform lg:pr-8">
                    {world.renderArtifact()}
                  </div>
                  <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-5 order-2 lg:pl-4">
                    <div className={`world-vista-reveal text-[10px] font-mono tracking-widest uppercase ${world.badgeClass}`}>
                      <span>0{idx + 1} OF 06 · SANCTUARY VISTA</span>
                    </div>
                    <h3 className={`world-vista-reveal text-4xl sm:text-5xl lg:text-6xl font-serif font-normal tracking-tight ${world.titleClass}`}>
                      {world.name} <span className="text-3xl sm:text-4xl opacity-80 font-serif font-light">({world.jpName})</span>
                    </h3>
                    <p className={`world-vista-reveal text-lg sm:text-xl font-serif italic max-w-md ${world.taglineClass}`}>
                      “{world.tagline}”
                    </p>
                    <div className="world-vista-reveal pt-2">
                      <AtmosphericButton href={`/create?template=${world.id}`} worldId={world.id} worldName={world.name} />
                    </div>
                  </div>
                </div>
              )}

              {/* VARIANT 4: CINEMA REEL (Apricot Film) — Film Strip Upper-Right, Archival Caption Left */}
              {world.layoutVariant === "cinema-reel" && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left space-y-5 order-2 lg:order-1 lg:pl-6">
                    <div className={`world-vista-reveal text-[10px] font-mono tracking-widest uppercase ${world.badgeClass}`}>
                      <span>0{idx + 1} OF 06 · SANCTUARY VISTA</span>
                    </div>
                    <h3 className={`world-vista-reveal text-4xl sm:text-5xl lg:text-6xl font-serif font-normal tracking-tight ${world.titleClass}`}>
                      {world.name}
                    </h3>
                    <p className={`world-vista-reveal text-lg sm:text-xl font-serif italic max-w-md ${world.taglineClass}`}>
                      “{world.tagline}”
                    </p>
                    <div className="world-vista-reveal pt-2">
                      <AtmosphericButton href={`/create?template=${world.id}`} worldId={world.id} worldName={world.name} />
                    </div>
                  </div>
                  <div className="lg:col-span-6 flex justify-center lg:justify-end order-1 lg:order-2 world-vista-reveal will-change-transform lg:pr-6">
                    {world.renderArtifact()}
                  </div>
                </div>
              )}

              {/* VARIANT 5: HERBARIUM DESK (Wildflower Paper) — Specimen Left, Field Notes Right */}
              {world.layoutVariant === "herbarium-desk" && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  <div className="lg:col-span-5 flex justify-center lg:justify-end order-1 world-vista-reveal will-change-transform lg:pr-8">
                    {world.renderArtifact()}
                  </div>
                  <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-5 order-2 lg:pl-6">
                    <div className={`world-vista-reveal text-[10px] font-mono tracking-widest uppercase ${world.badgeClass}`}>
                      <span>0{idx + 1} OF 06 · SANCTUARY VISTA</span>
                    </div>
                    <h3 className={`world-vista-reveal text-4xl sm:text-5xl lg:text-6xl font-serif font-normal tracking-tight ${world.titleClass}`}>
                      {world.name}
                    </h3>
                    <p className={`world-vista-reveal text-lg sm:text-xl font-serif italic max-w-md ${world.taglineClass}`}>
                      “{world.tagline}”
                    </p>
                    <div className="world-vista-reveal pt-2">
                      <AtmosphericButton href={`/create?template=${world.id}`} worldId={world.id} worldName={world.name} />
                    </div>
                  </div>
                </div>
              )}

              {/* VARIANT 6: SHORELINE DRIFT (Ocean Letter) — Sea Parchment Right, Tidal Callout Left */}
              {world.layoutVariant === "shoreline-drift" && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left space-y-5 order-2 lg:order-1 lg:pl-8">
                    <div className={`world-vista-reveal text-[10px] font-mono tracking-widest uppercase ${world.badgeClass}`}>
                      <span>0{idx + 1} OF 06 · SANCTUARY VISTA</span>
                    </div>
                    <h3 className={`world-vista-reveal text-4xl sm:text-5xl lg:text-6xl font-serif font-normal tracking-tight ${world.titleClass}`}>
                      {world.name}
                    </h3>
                    <p className={`world-vista-reveal text-lg sm:text-xl font-serif italic max-w-md ${world.taglineClass}`}>
                      “{world.tagline}”
                    </p>
                    <div className="world-vista-reveal pt-2">
                      <AtmosphericButton href={`/create?template=${world.id}`} worldId={world.id} worldName={world.name} />
                    </div>
                  </div>
                  <div className="lg:col-span-6 flex justify-center lg:justify-end order-1 lg:order-2 world-vista-reveal will-change-transform lg:pr-6">
                    {world.renderArtifact()}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Understated Showroom Full Catalog Link */}
      <div className="text-center py-16 px-6 relative z-10">
        <Link
          href="/templates"
          className="group inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full text-xs sm:text-sm font-mono uppercase tracking-widest bg-rose-950/40 hover:bg-rose-900/60 border border-rose-400/40 text-rose-100 hover:text-white font-medium shadow-[0_4px_16px_rgba(0,0,0,0.4)] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5"
        >
          <span>Explore all six atmospheres with interactive plasma spark</span>
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">
            →
          </span>
        </Link>
      </div>
    </div>
  );
}
