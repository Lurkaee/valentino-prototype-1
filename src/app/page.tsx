import { Button } from "@/components/ui/Button";
import { ValentinoAtmosphere } from "@/components/ui/ValentinoAtmosphere";
import { FloatingNavbar } from "@/components/ui/FloatingNavbar";
import { HeroEditorialStagger } from "@/components/motion/HeroEditorialStagger";
import { LoveLetter3D } from "@/components/motion/LoveLetter3D";
import { LittleThingsPinnedScene } from "@/components/motion/LittleThingsPinnedScene";
import { TemplateShowcase } from "@/components/motion/TemplateShowcase";
import { CurtainLink } from "@/components/motion/PageCurtains";

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
      {/* HERO KEPT INTACT: Same typography, floating 3D love letter, and skyline    */}
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
      {/* 02 — LITTLE THINGS: PINNED PHYSICAL ASSEMBLY SCENE                        */}
      {/* Physical stationery appearing in the air over soft drifting clouds         */}
      {/* ========================================================================= */}
      <section
        id="personalize"
        className="w-full bg-transparent text-[#240412] relative z-20 z-content"
      >
        {/* Preserves both #how-it-works and legacy #build-your-valentine anchors */}
        <div id="build-your-valentine" className="w-full">
          <LittleThingsPinnedScene />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 03 — LIVING WORLDS: IMMERSIVE WORLD PORTAL                                */}
      {/* Dimensional editorial rooms morphing out of the atmosphere                 */}
      {/* ========================================================================= */}
      <section
        id="worlds-section"
        className="w-full bg-transparent text-[#FAF8F5] relative z-20 z-content py-16 sm:py-24"
      >
        <TemplateShowcase />
      </section>

      {/* ========================================================================= */}
      {/* 04 — DISCOVER INTERACTIVE MOMENTS (BORDERLESS EDITORIAL OBJECTS)           */}
      {/* Deep romantic starlight atmosphere with translucent keepsakes              */}
      {/* ========================================================================= */}
      <section
        id="moments"
        className="w-full bg-transparent text-[#FAF8F5] relative z-20 z-content py-24 sm:py-32 px-6"
      >
        <div className="max-w-6xl mx-auto">
          {/* Editorial Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20 space-y-3">
            <span className="inline-block text-[11px] font-mono tracking-widest uppercase text-rose-300/80 mb-2">
              Interactive Devotion
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-normal text-white tracking-tight leading-tight">
              Add little secrets waiting to be discovered.
            </h2>
            <p className="text-sm sm:text-base text-rose-100/70 font-light leading-relaxed">
              Love isn&apos;t just what you say all at once. It is the sealed envelopes opened on quiet mornings, the private memories tucked behind questions, and the surprises waiting for the days ahead.
            </p>
            <p className="text-sm sm:text-base text-rose-200/90 font-light italic pt-1">
              You don&apos;t just send a page. They enter a world.
            </p>
          </div>

          {/* Borderless Interactive Moments Showcase: Translucent glass and luminous contrast */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
            {/* Open When Envelopes */}
            <div className="p-8 bg-white/[0.035] hover:bg-white/[0.06] backdrop-blur-md border border-white/[0.07] hover:border-white/[0.14] transition-all duration-500 rounded-3xl relative group flex flex-col justify-between shadow-xl">
              <div>
                <div className="w-11 h-11 rounded-2xl bg-white/[0.07] flex items-center justify-center text-rose-300 mb-6 group-hover:scale-105 transition-transform shadow-inner">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-rose-300/80 font-medium block mb-2">
                  Open When Envelopes
                </span>
                <h3 className="font-serif text-2xl font-normal text-white mb-3">
                  Notes for future days
                </h3>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-light mb-6">
                  Leave sealed letters they can unseal whenever they need you: Open When you miss me, Open When you have had a hard day, or Open when you can&apos;t sleep.
                </p>
              </div>
              <div className="pt-4 text-xs text-rose-200/80 italic font-serif border-t border-white/[0.06]">
                “Close your eyes. Take a breath. I am right here.”
              </div>
            </div>

            {/* Tap-to-Reveal Secret Notes */}
            <div className="p-8 bg-white/[0.035] hover:bg-white/[0.06] backdrop-blur-md border border-white/[0.07] hover:border-white/[0.14] transition-all duration-500 rounded-3xl relative group flex flex-col justify-between shadow-xl">
              <div>
                <div className="w-11 h-11 rounded-2xl bg-white/[0.07] flex items-center justify-center text-rose-300 mb-6 group-hover:scale-105 transition-transform shadow-inner">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="8" cy="15" r="4" />
                    <path d="m10.85 12.15 7.65-7.65a2 2 0 1 1 2.83 2.83l-7.65 7.65" />
                    <path d="m15.5 6.5 2 2" />
                  </svg>
                </div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-rose-300/80 font-medium block mb-2">
                  Concealed Letters
                </span>
                <h3 className="font-serif text-2xl font-normal text-white mb-3">
                  Secret whispers
                </h3>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-light mb-6">
                  Hide intimate words behind a delicate tap-to-reveal fold or lock them with a question only the two of you know the answer to.
                </p>
              </div>
              <div className="pt-4 text-xs text-rose-200/80 italic font-serif border-t border-white/[0.06]">
                “Where did we share our very first secret?”
              </div>
            </div>

            {/* Playful Moments & Surprises */}
            <div className="p-8 bg-white/[0.035] hover:bg-white/[0.06] backdrop-blur-md border border-white/[0.07] hover:border-white/[0.14] transition-all duration-500 rounded-3xl relative group flex flex-col justify-between shadow-xl">
              <div>
                <div className="w-11 h-11 rounded-2xl bg-white/[0.07] flex items-center justify-center text-rose-300 mb-6 group-hover:scale-105 transition-transform shadow-inner">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-rose-300/80 font-medium block mb-2">
                  Tactile Surprises
                </span>
                <h3 className="font-serif text-2xl font-normal text-white mb-3">
                  Delight & discovery
                </h3>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-light mb-6">
                  Surprise them with tactile scratch cards that reveal sweet compliments, a jar of reasons why you love them, or a playful relationship quiz.
                </p>
              </div>
              <div className="pt-4 text-xs text-rose-200/80 italic font-serif border-t border-white/[0.06]">
                “Scratch here to reveal something I love about you...”
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 05 — FINALE: QUIET WHISPER & TACTILE ACTION                               */}
      {/* Warm paper & sunset finale atmosphere gently welcoming the user            */}
      {/* ========================================================================= */}
      <section
        id="create"
        className="w-full bg-transparent text-[#240412] relative z-20 z-content py-20 sm:py-28 px-6"
      >
        <div className="max-w-3xl mx-auto text-center space-y-7">
          {/* Small tactile wax seal / talisman artifact */}
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

          {/* Action CTAs: Dominant solid button + crisp high-contrast link */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <CurtainLink href="/create">
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
            </CurtainLink>

            <CurtainLink href="/templates">
              <button
                type="button"
                className="px-6 py-3.5 rounded-full text-sm font-medium text-[#240412] hover:text-[#881337] bg-white/80 hover:bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-rose-900/10 transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span>Explore Showroom</span>
                <span className="text-rose-800">→</span>
              </button>
            </CurtainLink>
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
            <CurtainLink href="/templates" className="hover:text-[#881337] transition-colors">
              World Showroom
            </CurtainLink>
            <CurtainLink href="/create" className="hover:text-[#881337] transition-colors">
              Experience Studio
            </CurtainLink>
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
