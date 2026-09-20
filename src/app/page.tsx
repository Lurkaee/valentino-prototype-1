import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ValentineSky } from "@/components/ui/ValentineSky";
import { FloatingNavbar } from "@/components/ui/FloatingNavbar";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { HeroEditorialStagger } from "@/components/motion/HeroEditorialStagger";
import { LoveLetter3D } from "@/components/motion/LoveLetter3D";
import { LogoTicker } from "@/components/motion/LogoTicker";
import { BuildYourValentine } from "@/components/motion/BuildYourValentine";
import { ScrollStorytelling } from "@/components/motion/ScrollStorytelling";
import { TemplateShowcase } from "@/components/motion/TemplateShowcase";
import { CurtainLink } from "@/components/motion/PageCurtains";

export default function HomePage() {
  return (
    <main className="relative min-h-[100dvh] flex flex-col items-center justify-start bg-[#12030A] text-[#FAF8F5] overflow-x-hidden selection:bg-rose-500/30 selection:text-white">
      {/* Floating Pill Navigation (Translucent Warm Cream & Rose Tint) */}
      <FloatingNavbar />

      {/* ========================================================================= */}
      {/* SURFACE 01: Hero Viewport — Dreamy Sunset Sky, Clouds & 3D Love Letter     */}
      {/* ========================================================================= */}
      <div className="relative w-full min-h-[92dvh] sm:min-h-screen flex flex-col items-center justify-center overflow-hidden">
        <ValentineSky />

        <section className="w-full max-w-5xl mx-auto px-6 pt-24 sm:pt-28 pb-14 flex flex-col items-center justify-center text-center relative z-10">
          <HeroEditorialStagger />
          <div className="mt-4 sm:mt-5 w-full max-w-xs sm:max-w-sm relative z-20">
            <LoveLetter3D />
          </div>
        </section>
      </div>

      {/* Sky-to-Paper Organic Horizon */}
      <SectionDivider variant="sky-to-cream" />

      {/* ========================================================================= */}
      {/* SURFACE 02: Warm Cream Paper — "Build Your Valentine" Interactive Studio   */}
      {/* ========================================================================= */}
      <div className="w-full bg-[#FDF8F3] text-[#2C0617] relative z-10">
        <BuildYourValentine />
      </div>

      {/* Cream Paper-to-Berry Velvet Dusk Bridge (Eliminates color whiplash) */}
      <SectionDivider variant="cream-to-berry" />

      {/* ========================================================================= */}
      {/* SURFACE 03: Deep Berry Velvet — Romantic Ticker & Scroll Storytelling     */}
      {/* ========================================================================= */}
      <div className="w-full bg-gradient-to-b from-[#1A0310] via-[#240516] to-[#18020E] text-[#FAF8F5] relative z-10">
        {/* Soft Romantic Ticker Ribbon */}
        <div className="w-full border-y border-rose-500/15 bg-[#250616]/60 backdrop-blur-md">
          <LogoTicker />
        </div>

        {/* "Made for the moment" — Scroll Storytelling */}
        <ScrollStorytelling />
      </div>

      {/* ========================================================================= */}
      {/* SURFACE 04: Rich Starlight Plum — Template Ecosystem Showcase             */}
      {/* ========================================================================= */}
      <div className="w-full bg-gradient-to-b from-[#18020E] via-[#200414] to-[#14020C] text-[#FAF8F5] relative z-10">
        <TemplateShowcase />
      </div>

      {/* Berry-to-Midnight Starlight Bridge */}
      <SectionDivider variant="berry-to-midnight" />

      {/* ========================================================================= */}
      {/* SURFACE 05: Midnight Reassurance, Final Emotional CTA & Luxury Footer     */}
      {/* ========================================================================= */}
      <div className="w-full bg-[#12030A] text-[#FAF8F5] relative z-10">
        {/* Privacy & Reassurance Section */}
        <section className="w-full max-w-5xl mx-auto px-6 py-20 relative z-10">
          <div className="rounded-3xl border border-rose-500/20 bg-[#1A0512]/70 backdrop-blur-xl p-8 sm:p-12 shadow-2xl text-center space-y-6">
            <Badge
              variant="rose"
              size="sm"
              className="tracking-widest uppercase text-[11px] bg-rose-950/60 border-rose-500/30 text-rose-200"
            >
              Intimate & Private
            </Badge>
            <h2 className="text-2xl sm:text-4xl font-serif font-medium text-[#FAF8F5]">
              Private by design. Meant for two.
            </h2>
            <p className="text-sm sm:text-base text-[#FAF8F5]/75 font-light max-w-xl mx-auto leading-relaxed">
              Your Valentine is protected with encrypted access tokens stored only on your browser. Never indexed by search engines, no social feeds, and no ads.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-left max-w-3xl mx-auto">
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                <span className="text-lg">🔒</span>
                <h3 className="font-serif text-base font-medium text-white mt-2 mb-1">Unguessable URL</h3>
                <p className="text-xs text-[#FAF8F5]/65 leading-relaxed font-light">
                  High-entropy 22-character nanoids prevent anyone from discovering your link.
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                <span className="text-lg">🚫</span>
                <h3 className="font-serif text-base font-medium text-white mt-2 mb-1">Zero Tracking</h3>
                <p className="text-xs text-[#FAF8F5]/65 leading-relaxed font-light">
                  No third-party cookies or intrusive analytics tracking your romantic note.
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                <span className="text-lg">✨</span>
                <h3 className="font-serif text-base font-medium text-white mt-2 mb-1">No Sign-Up</h3>
                <p className="text-xs text-[#FAF8F5]/65 leading-relaxed font-light">
                  No passwords to remember. You can write, seal, and send in under two minutes.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Final Emotional Call to Action */}
        <section className="w-full max-w-4xl mx-auto px-6 py-20 text-center relative z-10">
          <div className="space-y-6">
            <span className="text-3xl select-none animate-pulse">💌</span>
            <h2 className="text-3xl sm:text-5xl font-serif font-medium text-[#FAF8F5] leading-tight max-w-2xl mx-auto">
              Give them a little piece of the internet they&apos;ll want to keep.
            </h2>
            <p className="text-sm sm:text-base text-[#FAF8F5]/75 font-light max-w-md mx-auto">
              Create something thoughtful, personal, and unforgettable.
            </p>
            <div className="pt-2">
              <CurtainLink href="/create">
                <Button size="lg" variant="primary" className="px-8 py-3.5 rounded-full shadow-2xl shadow-rose-950/80">
                  <span>Create Your Valentine</span>
                  <span>💌</span>
                </Button>
              </CurtainLink>
            </div>
          </div>
        </section>

        {/* Elegant Footer */}
        <footer className="w-full max-w-6xl mx-auto px-6 py-12 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FAF8F5]/60 font-sans relative z-10">
          <div className="flex items-center gap-2">
            <span>💌</span>
            <span className="text-white font-serif font-medium">Valentino</span>
            <span className="text-white/20">·</span>
            <span>A Private Romantic Canvas</span>
          </div>
          <div className="flex items-center gap-6">
            <CurtainLink href="/templates" className="hover:text-white transition-colors">
              Templates
            </CurtainLink>
            <CurtainLink href="/create" className="hover:text-white transition-colors">
              Create Valentine
            </CurtainLink>
            <a
              href="https://github.com/Lurkaee/valentino-prototype-1"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              GitHub
            </a>
          </div>
        </footer>
      </div>
    </main>
  );
}
