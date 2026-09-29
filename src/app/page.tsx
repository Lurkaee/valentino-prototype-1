import { Button } from "@/components/ui/Button";
import { ValentineSky } from "@/components/ui/ValentineSky";
import { FloatingNavbar } from "@/components/ui/FloatingNavbar";
import { HeroEditorialStagger } from "@/components/motion/HeroEditorialStagger";
import { LoveLetter3D } from "@/components/motion/LoveLetter3D";
import { BuildYourValentine } from "@/components/motion/BuildYourValentine";
import { TemplateShowcase } from "@/components/motion/TemplateShowcase";
import { LogoTicker } from "@/components/motion/LogoTicker";
import { CurtainLink } from "@/components/motion/PageCurtains";

export default function HomePage() {
  return (
    <main className="relative min-h-[100dvh] flex flex-col items-center justify-start bg-[#FEDEEA] text-[#240412] overflow-x-hidden selection:bg-rose-500/20 selection:text-[#240412]">
      {/* Floating Pill Proximity Navigation */}
      <FloatingNavbar />

      {/* ========================================================================= */}
      {/* 01 — HERO: SUNSET CLOUD ATMOSPHERE                                       */}
      {/* ========================================================================= */}
      <section
        id="hero"
        className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#FEDEEA] via-[#FDECE8] to-[#FDF8F3]"
      >
        <ValentineSky />

        <div className="w-full max-w-5xl mx-auto px-6 pt-28 sm:pt-32 pb-16 flex flex-col items-center justify-center text-center relative z-20 z-content">
          <HeroEditorialStagger
            eyebrow="The Romantic Experience Platform · A Private Sanctuary"
            headline="Create something they'll remember."
            subtitle="Valentino is an intimate digital art experience crafted for the person who means everything to you — complete with starlight letters, shared memories, relationship milestones, and dimensional worlds."
            primaryCtaText="Begin Their World"
            primaryCtaHref="/create"
            secondaryCtaText="Explore Templates"
            secondaryCtaHref="/templates"
          />

          <div className="mt-6 sm:mt-8 w-full max-w-xs sm:max-w-sm relative z-20">
            <LoveLetter3D />
          </div>
        </div>

        {/* Feature Highlights Ribbon */}
        <div className="w-full relative z-20 pb-4">
          <LogoTicker />
        </div>

        {/* Soft Organic Flow into Paper */}
        <div
          className="w-full h-24 sm:h-32 -mb-px pointer-events-none select-none relative z-20"
          style={{
            background: "linear-gradient(180deg, transparent 0%, rgba(253,248,243,0.6) 50%, #FDF8F3 100%)",
          }}
          aria-hidden="true"
        />
      </section>

      {/* ========================================================================= */}
      {/* 02 — MAKE IT PERSONAL: WARM STATIONERY PAPER                             */}
      {/* ========================================================================= */}
      <section
        id="personalize"
        className="w-full bg-[#FDF8F3] text-[#240412] relative z-20 z-content py-16 sm:py-24"
      >
        <div id="how-it-works" className="max-w-6xl mx-auto px-6">
          <BuildYourValentine />
        </div>

        {/* Organic Feathered Bridge into Dark Atmosphere */}
        <div
          className="w-full h-28 sm:h-36 -mb-px mt-16 pointer-events-none select-none"
          style={{
            background: "linear-gradient(180deg, #FDF8F3 0%, #F5ECE3 30%, #1A0E16 90%, #12040C 100%)",
          }}
          aria-hidden="true"
        />
      </section>

      {/* ========================================================================= */}
      {/* 03 — ENTER A WORLD: THE LIVING WORLD COLLECTION                          */}
      {/* ========================================================================= */}
      <section
        id="worlds-section"
        className="w-full bg-[#12040C] text-[#FAF8F5] relative z-20 z-content py-16 sm:py-24 border-t border-rose-950/40"
      >
        <TemplateShowcase />

        {/* Seamless transition into moments */}
        <div
          className="w-full h-24 pointer-events-none select-none -mb-px mt-12 flex items-center justify-center text-center px-4"
          style={{
            background: "linear-gradient(180deg, #12040C 0%, #16030E 60%, #1A0512 100%)",
          }}
          aria-hidden="true"
        />
      </section>

      {/* ========================================================================= */}
      {/* 04 — DISCOVER INTERACTIVE MOMENTS                                         */}
      {/* ========================================================================= */}
      <section
        id="moments"
        className="w-full bg-[#1A0512] text-[#FAF8F5] relative z-20 z-content py-24 sm:py-32 px-6"
      >
        <div className="max-w-6xl mx-auto">
          {/* Editorial Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
            <span className="inline-block text-[11px] font-mono tracking-widest uppercase text-rose-300/80 mb-3 px-3 py-1 rounded-full bg-rose-950/60 border border-rose-500/20">
              Interactive Devotion
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-medium text-white tracking-tight mb-4 leading-tight">
              Add little secrets waiting to be discovered.
            </h2>
            <p className="text-sm sm:text-base text-rose-100/70 font-light leading-relaxed">
              Love isn&apos;t just what you say all at once. It is the sealed envelopes opened on quiet mornings, the private memories tucked behind questions, and the surprises waiting for the days ahead.
            </p>
            <p className="text-sm sm:text-base text-rose-200/90 font-light italic mt-3">
              You don&apos;t just send a page. They enter a world.
            </p>
          </div>

          {/* Interactive Moments Showcase: Subtle Glass, SVG Linework */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Open When Envelopes */}
            <div className="rounded-2xl p-7 sm:p-8 bg-white/[0.03] border border-white/[0.08] hover:border-rose-400/40 transition-all duration-300 relative group flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-rose-300 mb-5 group-hover:scale-105 transition-transform">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-rose-300/80 font-medium block mb-2">
                  Open When Envelopes
                </span>
                <h3 className="font-serif text-xl font-medium text-white mb-2.5">
                  Notes for future days
                </h3>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-light mb-4">
                  Leave sealed letters they can unseal whenever they need you: Open When you miss me, Open When you have had a hard day, or Open when you can&apos;t sleep.
                </p>
              </div>
              <div className="pt-4 border-t border-white/[0.06] text-[11px] text-rose-200/70 italic font-serif">
                “Close your eyes. Take a breath. I am right here.”
              </div>
            </div>

            {/* Tap-to-Reveal Secret Notes */}
            <div className="rounded-2xl p-7 sm:p-8 bg-white/[0.03] border border-white/[0.08] hover:border-rose-400/40 transition-all duration-300 relative group flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-rose-300 mb-5 group-hover:scale-105 transition-transform">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="8" cy="15" r="4" />
                    <path d="m10.85 12.15 7.65-7.65a2 2 0 1 1 2.83 2.83l-7.65 7.65" />
                    <path d="m15.5 6.5 2 2" />
                  </svg>
                </div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-rose-300/80 font-medium block mb-2">
                  Concealed Letters
                </span>
                <h3 className="font-serif text-xl font-medium text-white mb-2.5">
                  Secret whispers
                </h3>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-light mb-4">
                  Hide intimate words behind a delicate tap-to-reveal fold or lock them with a question only the two of you know the answer to.
                </p>
              </div>
              <div className="pt-4 border-t border-white/[0.06] text-[11px] text-rose-200/70 italic font-serif">
                “Where did we share our very first secret?”
              </div>
            </div>

            {/* Playful Moments & Surprises */}
            <div className="rounded-2xl p-7 sm:p-8 bg-white/[0.03] border border-white/[0.08] hover:border-rose-400/40 transition-all duration-300 relative group flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-rose-300 mb-5 group-hover:scale-105 transition-transform">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-rose-300/80 font-medium block mb-2">
                  Tactile Surprises
                </span>
                <h3 className="font-serif text-xl font-medium text-white mb-2.5">
                  Delight & discovery
                </h3>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-light mb-4">
                  Surprise them with tactile scratch cards that reveal sweet compliments, a jar of reasons why you love them, or a playful relationship quiz.
                </p>
              </div>
              <div className="pt-4 border-t border-white/[0.06] text-[11px] text-rose-200/70 italic font-serif">
                “Scratch here to reveal something I love about you...”
              </div>
            </div>
          </div>
        </div>

        {/* Transition back to calm cream surface */}
        <div
          className="w-full h-28 sm:h-36 -mb-px mt-20 pointer-events-none select-none"
          style={{
            background: "linear-gradient(180deg, #1A0512 0%, #2A0A1E 30%, #F5ECE3 85%, #FDF8F3 100%)",
          }}
          aria-hidden="true"
        />
      </section>

      {/* ========================================================================= */}
      {/* 05 — CREATE: CALM CREAM FINALE & TACTILE ACTION                           */}
      {/* ========================================================================= */}
      <section
        id="create"
        className="w-full bg-[#FDF8F3] text-[#240412] relative z-20 z-content py-20 sm:py-28 px-6"
      >
        <div className="max-w-5xl mx-auto space-y-16">
          {/* Privacy & Reassurance */}
          <div className="rounded-2xl border border-stone-200/80 bg-white/70 backdrop-blur-sm p-8 sm:p-12 text-center space-y-6">
            <span className="inline-block text-[11px] font-mono tracking-widest uppercase text-[#881337] px-3 py-1 rounded-full bg-rose-50 border border-rose-200/80">
              Intimate & Private by Design
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-medium text-[#240412] tracking-tight">
              Crafted for two. Never public.
            </h2>
            <p className="text-sm sm:text-base text-[#4A0E2E]/80 font-normal max-w-xl mx-auto leading-relaxed">
              Your Valentine is protected with private edit tokens stored securely in your browser. Never indexed by search engines, no public feeds, and zero ads.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-left max-w-3xl mx-auto">
              <div className="p-5 rounded-xl bg-stone-50/80 border border-stone-200/70">
                <span className="text-sm font-mono text-rose-800 uppercase tracking-wider block mb-1">01 · URL</span>
                <h3 className="font-serif text-base font-medium text-[#240412] mb-1">Unguessable Link</h3>
                <p className="text-xs text-[#5E2640] leading-relaxed font-normal">
                  High-entropy 22-character nanoids prevent anyone from guessing or discovering your private link.
                </p>
              </div>
              <div className="p-5 rounded-xl bg-stone-50/80 border border-stone-200/70">
                <span className="text-sm font-mono text-rose-800 uppercase tracking-wider block mb-1">02 · Privacy</span>
                <h3 className="font-serif text-base font-medium text-[#240412] mb-1">Zero Tracking</h3>
                <p className="text-xs text-[#5E2640] leading-relaxed font-normal">
                  No third-party trackers or ad pixels inspecting your personal thoughts and memories.
                </p>
              </div>
              <div className="p-5 rounded-xl bg-stone-50/80 border border-stone-200/70">
                <span className="text-sm font-mono text-rose-800 uppercase tracking-wider block mb-1">03 · Freedom</span>
                <h3 className="font-serif text-base font-medium text-[#240412] mb-1">No Passwords</h3>
                <p className="text-xs text-[#5E2640] leading-relaxed font-normal">
                  Write, seal, and publish in minutes without requiring an account or password login.
                </p>
              </div>
            </div>
          </div>

          {/* Final Emotional Call to Action */}
          <div className="text-center relative z-10 space-y-6 max-w-2xl mx-auto pt-4">
            <h2 className="text-3xl sm:text-5xl font-serif font-medium text-[#240412] leading-tight tracking-tight">
              Give them a little piece of the internet they&apos;ll want to keep.
            </h2>
            <p className="text-sm sm:text-base text-[#4A0E2E] font-normal max-w-lg mx-auto leading-relaxed">
              Create something personal, tender, and unforgettable across our distinct romantic worlds.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <CurtainLink href="/create">
                <Button
                  size="lg"
                  variant="primary"
                  className="px-8 py-3.5 rounded-full font-medium text-white bg-[#1A0E16] hover:bg-[#2A0E20] border border-white/10 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98] transition-all flex items-center gap-2"
                >
                  <span>Begin Their World</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Button>
              </CurtainLink>
              <CurtainLink href="/templates">
                <Button
                  size="lg"
                  variant="outline"
                  className="px-6 py-3.5 rounded-full font-medium text-[#240412] border-stone-300 hover:border-stone-500 bg-white/60 hover:bg-white/90 transition-all"
                >
                  Explore Showroom
                </Button>
              </CurtainLink>
            </div>
          </div>
        </div>

        {/* Elegant Editorial Footer */}
        <footer className="w-full max-w-5xl mx-auto mt-24 pt-8 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6B2346] font-sans relative z-10">
          <div className="flex items-center gap-2">
            <span className="text-[#240412] font-serif font-medium">Valentino</span>
            <span className="text-stone-300">·</span>
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
