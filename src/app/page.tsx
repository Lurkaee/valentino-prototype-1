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
    <main className="relative min-h-[100dvh] flex flex-col items-center justify-start bg-[#0A090C] text-[#FAF8F5] overflow-x-hidden selection:bg-rose-500/25 selection:text-white">
      {/* Floating Pill Navigation (Neutral Luxury Obsidian Glass) */}
      <FloatingNavbar />

      {/* ========================================================================= */}
      {/* 1. HERO VIEWPORT: PLATFORM INTRODUCTION                                   */}
      {/* ========================================================================= */}
      <div className="relative w-full min-h-[92dvh] sm:min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#FEDEEA]">
        <ValentineSky />

        <section className="w-full max-w-5xl mx-auto px-6 pt-24 sm:pt-28 pb-14 flex flex-col items-center justify-center text-center relative z-10">
          <HeroEditorialStagger
            eyebrow="The Romantic Experience Platform"
            headline="Create something they'll remember."
            subtitle="Valentino is an interactive experience platform for bespoke romantic gestures — from starlight letters and celestial pastel skies to Kyoto twilight temples."
            primaryCtaText="Create Your Valentine"
            primaryCtaHref="/create"
            secondaryCtaText="Explore Templates"
            secondaryCtaHref="/templates"
          />
          <div className="mt-4 sm:mt-5 w-full max-w-xs sm:max-w-sm relative z-20">
            <LoveLetter3D />
          </div>
        </section>
      </div>

      {/* Sky-to-Paper Organic Horizon */}
      <SectionDivider variant="sky-to-cream" />

      {/* ========================================================================= */}
      {/* 2. THE INTERACTIVE STUDIO: CRAFT YOUR EXPERIENCE                           */}
      {/* ========================================================================= */}
      <div className="w-full bg-[#FDF8F3] text-[#2C0617] relative z-10">
        <BuildYourValentine />
      </div>

      {/* Transition to Obsidian Platform Canvas */}
      <SectionDivider variant="cream-to-berry" />

      {/* ========================================================================= */}
      {/* 3. PLATFORM CAPABILITIES & STORYTELLING                                   */}
      {/* ========================================================================= */}
      <div className="w-full bg-[#0E0D12] text-[#FAF8F5] relative z-10">
        {/* Editorial Feature Ribbon */}
        <div className="w-full border-y border-white/[0.08] bg-black/40 backdrop-blur-md">
          <LogoTicker />
        </div>

        {/* The 3-Step Journey */}
        <ScrollStorytelling />
      </div>

      {/* ========================================================================= */}
      {/* 4. THE WORLD COLLECTION: 3 DISTINCT CREATIVE ATMOSPHERES                 */}
      {/* ========================================================================= */}
      <div className="w-full bg-gradient-to-b from-[#0E0D12] via-[#0A090C] to-[#0A090C] text-[#FAF8F5] relative z-10 border-t border-white/[0.06]">
        <TemplateShowcase />
      </div>

      {/* ========================================================================= */}
      {/* 5. PLATFORM REASSURANCE, PRIVACY & FINAL CALL TO ACTION                  */}
      {/* ========================================================================= */}
      <div className="w-full bg-[#08070A] text-[#FAF8F5] relative z-10 border-t border-white/[0.06]">
        {/* Privacy & Reassurance Section */}
        <section className="w-full max-w-5xl mx-auto px-6 py-20 relative z-10">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8 sm:p-12 shadow-2xl text-center space-y-6">
            <Badge
              variant="neutral"
              size="sm"
              className="tracking-widest uppercase text-[11px] bg-white/[0.06] border-white/15 text-white/80"
            >
              Intimate & Private
            </Badge>
            <h2 className="text-2xl sm:text-4xl font-serif font-medium text-white tracking-tight">
              Private by design. Meant for two.
            </h2>
            <p className="text-sm sm:text-base text-white/75 font-light max-w-xl mx-auto leading-relaxed">
              Your Valentine is protected with private edit tokens stored securely in your browser. Never indexed by search engines, no public feeds, and zero ads.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-left max-w-3xl mx-auto">
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                <span className="text-lg">🔒</span>
                <h3 className="font-serif text-base font-medium text-white mt-2 mb-1">Unguessable URL</h3>
                <p className="text-xs text-white/65 leading-relaxed font-light">
                  High-entropy 22-character nanoids prevent anyone from discovering your link.
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                <span className="text-lg">🚫</span>
                <h3 className="font-serif text-base font-medium text-white mt-2 mb-1">Zero Tracking</h3>
                <p className="text-xs text-white/65 leading-relaxed font-light">
                  No third-party cookies or intrusive trackers inspecting your romantic note.
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                <span className="text-lg">✨</span>
                <h3 className="font-serif text-base font-medium text-white mt-2 mb-1">No Sign-Up</h3>
                <p className="text-xs text-white/65 leading-relaxed font-light">
                  No passwords to remember. You can write, seal, and publish in under two minutes.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Final Emotional Call to Action */}
        <section className="w-full max-w-4xl mx-auto px-6 py-20 text-center relative z-10">
          <div className="space-y-6">
            <span className="text-3xl select-none animate-pulse">💌</span>
            <h2 className="text-3xl sm:text-5xl font-serif font-medium text-white leading-tight max-w-2xl mx-auto tracking-tight">
              Give them a little piece of the internet they&apos;ll want to keep.
            </h2>
            <p className="text-sm sm:text-base text-white/70 font-light max-w-md mx-auto">
              Create something thoughtful, personal, and unforgettable across our distinct romantic worlds.
            </p>
            <div className="pt-2">
              <CurtainLink href="/create">
                <Button size="lg" variant="primary" className="px-8 py-3.5 rounded-full shadow-2xl">
                  <span>Create Your Experience</span>
                  <span>💌</span>
                </Button>
              </CurtainLink>
            </div>
          </div>
        </section>

        {/* Elegant Footer */}
        <footer className="w-full max-w-6xl mx-auto px-6 py-12 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60 font-sans relative z-10">
          <div className="flex items-center gap-2">
            <span>💌</span>
            <span className="text-white font-serif font-medium">Valentino</span>
            <span className="text-white/20">·</span>
            <span>Interactive Experience Platform</span>
          </div>
          <div className="flex items-center gap-6">
            <CurtainLink href="/templates" className="hover:text-white transition-colors">
              World Showroom
            </CurtainLink>
            <CurtainLink href="/create" className="hover:text-white transition-colors">
              Experience Studio
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
