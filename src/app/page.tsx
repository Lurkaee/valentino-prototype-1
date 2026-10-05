import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ValentinoAtmosphere } from "@/components/ui/ValentinoAtmosphere";
import { FloatingNavbar } from "@/components/ui/FloatingNavbar";
import { HeroEditorialStagger } from "@/components/motion/HeroEditorialStagger";
import { LoveLetter3D } from "@/components/motion/LoveLetter3D";
import { SpatialStationeryUnfold } from "@/components/motion/SpatialStationeryUnfold";
import { SpatialWorldsWalkthrough } from "@/components/motion/SpatialWorldsWalkthrough";
import { SpatialDiscoveredObjects } from "@/components/motion/SpatialDiscoveredObjects";

/**
 * HomePage — Phase 6.4: Scroll Story & Spatial Composition
 *
 * Sequence Narrative:
 * 01 HERO: Untouched sunset sky, floating 3D love letter, asymmetric typography.
 * 02 UNSEAL & DISPERSAL: The love letter unseals, vellum and petals disperse into space, transforms into a milestone timeline.
 * 03 LIVING WORLDS: Full-viewport vistas for each of the six worlds without tabs, capability chips, or palette swatches.
 * 04 DISCOVERED OBJECTS: Suspended interactive keepsakes floating directly in starlight without card boxes.
 * 05 RESOLUTION: Dispersed elements collapse into one glowing talisman and quiet invitation.
 */
export default function HomePage() {
  return (
    <main className="relative min-h-[100dvh] flex flex-col items-center justify-start bg-transparent text-[#240412] overflow-x-hidden selection:bg-rose-500/20 selection:text-[#240412]">
      {/* ========================================================================= */}
      {/* 00 — CANONICAL GLOBAL PERSISTENT ATMOSPHERE                               */}
      {/* Pinned behind the entire public experience; morphs continuously as user    */}
      {/* scrolls: Sunset Pink Sky -> Soft Cloud Paper -> Berry Depth -> Finale     */}
      {/* ========================================================================= */}
      <ValentinoAtmosphere
        context="marketing"
        fixed={true}
        intensity="hero"
        scrollReactive={true}
      />

      {/* Floating Spatial Dock Navigation */}
      <FloatingNavbar />

      {/* ========================================================================= */}
      {/* 01 — HERO: SUNSET CLOUD ATMOSPHERE & ASYMMETRIC LETTER                    */}
      {/* HERO KEPT SACRED & UNTOUCHED: Same typography, floating 3D letter, sky    */}
      {/* ========================================================================= */}
      <section
        id="hero"
        className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden bg-transparent"
      >
        <div className="w-full max-w-6xl mx-auto px-6 pt-28 sm:pt-32 lg:pt-36 pb-16 sm:pb-20 relative z-20 z-content">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Asymmetric Editorial Typography */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <HeroEditorialStagger
                eyebrow="made quietly, for one person"
                headline="Create something they'll remember."
                subtitle="An intimate digital art experience crafted for the person who means everything to you — complete with starlight letters, shared memories, and living worlds."
                primaryCtaText="Begin Their World"
                primaryCtaHref="/create"
                secondaryCtaText="Explore Showroom"
                secondaryCtaHref="/templates"
              />
            </div>

            {/* Right Column: Floating 3D Dimensional Love Letter */}
            <div className="lg:col-span-5 flex items-center justify-center relative mt-6 lg:mt-0">
              {/* Soft rosy ambient back-glow */}
              <div className="absolute w-72 h-72 rounded-full bg-gradient-to-tr from-rose-300/40 via-pink-200/30 to-amber-200/20 blur-3xl pointer-events-none" />
              <div className="w-full max-w-xs sm:max-w-sm relative z-20 lg:-rotate-2 hover:rotate-0 transition-transform duration-500 will-change-transform">
                <LoveLetter3D />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 02 — THE UNSEAL & DISPERSAL: SPATIAL STATIONERY UNFOLD                    */}
      {/* Physical stationery handoff from hero, dispersing freely in the clouds     */}
      {/* ========================================================================= */}
      <section
        id="personalize"
        className="w-full bg-transparent text-[#240412] relative z-20 z-content"
      >
        <div id="build-your-valentine" className="w-full">
          <SpatialStationeryUnfold />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 03 — LIVING WORLDS: FULL-VIEWPORT EDITORIAL VISTAS                         */}
      {/* No tabs, no capability chips, no swatches — pure atmospheric vistas        */}
      {/* ========================================================================= */}
      <section
        id="worlds-section"
        data-testid="world-showroom-scene"
        className="w-full bg-transparent text-[#FAF8F5] relative z-20 z-content"
      >
        <SpatialWorldsWalkthrough />
      </section>

      {/* ========================================================================= */}
      {/* 04 — DISCOVERED OBJECTS: SPATIAL KEEPSAKES IN STARLIGHT                    */}
      {/* No card boxes — tactile, dimensional keepsakes floating in the atmosphere */}
      {/* ========================================================================= */}
      <section
        id="moments"
        className="w-full bg-transparent text-[#FAF8F5] relative z-20 z-content"
      >
        <SpatialDiscoveredObjects />
      </section>

      {/* ========================================================================= */}
      {/* 05 — THE RESOLUTION: QUIET WHISPER & INTIMATE ACTION                      */}
      {/* Everything collapses back into one glowing talisman in warm twilight       */}
      {/* ========================================================================= */}
      <section
        id="create"
        className="w-full bg-transparent text-[#240412] relative z-20 z-content py-20 sm:py-32 px-6"
      >
        <div className="max-w-3xl mx-auto text-center space-y-7">
          {/* Luminous wax seal talisman artifact */}
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-[#E11D48] via-[#BE123C] to-[#6B0C23] shadow-[0_6px_20px_rgba(159,18,57,0.35)] text-white mx-auto">
            <svg className="w-5 h-5 filter drop-shadow-sm text-rose-100" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>

          <div className="space-y-3 max-w-xl mx-auto">
            <h2 className="text-3xl sm:text-5xl font-serif font-normal text-[#240412] leading-tight tracking-tight">
              Give them a little piece of the internet they&apos;ll want to keep.
            </h2>
            <p className="text-sm sm:text-base text-[#5E2640] font-light leading-relaxed">
              Crafted for two. Never indexed by search engines, zero tracking, and no passwords.
            </p>
          </div>

          {/* Action CTAs: Dominant solid button + understated link */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/create">
              <Button
                size="lg"
                variant="primary"
                className="px-8 py-3.5 rounded-full font-medium text-white bg-[#1A0612] hover:bg-[#2C0A1E] shadow-[0_8px_24px_-6px_rgba(40,5,20,0.45)] hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.98] transition-all flex items-center gap-2.5 cursor-pointer"
              >
                <span>Begin Their World</span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Button>
            </Link>

            <Link href="/templates">
              <button
                type="button"
                className="px-6 py-3.5 rounded-full text-sm font-medium text-[#240412] hover:text-[#881337] bg-white/80 hover:bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-rose-900/10 transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span>Explore Showroom</span>
                <span className="text-rose-800">→</span>
              </button>
            </Link>
          </div>
        </div>

        {/* Elegant Editorial Footer */}
        <footer className="w-full max-w-5xl mx-auto mt-24 pt-8 border-t border-rose-900/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6B2346] font-sans relative z-10">
          <div className="flex items-center gap-2">
            <span className="text-[#240412] font-serif font-medium">Valentino</span>
            <span className="text-rose-300">·</span>
            <span>Interactive Romantic Storytelling Platform</span>
          </div>
          <div className="flex items-center gap-6 font-medium">
            <Link href="/templates" className="hover:text-[#881337] transition-colors">
              World Showroom
            </Link>
            <Link href="/create" className="hover:text-[#881337] transition-colors">
              Experience Studio
            </Link>
            <a
              href="https://github.com/Lurkaee/valentino-prototype-1"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#881337] transition-colors"
            >
              GitHub
            </a>
          </div>
        </footer>
      </section>
    </main>
  );
}
