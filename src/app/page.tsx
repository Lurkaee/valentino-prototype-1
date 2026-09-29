import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ValentineSky } from "@/components/ui/ValentineSky";
import { FloatingNavbar } from "@/components/ui/FloatingNavbar";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { HeroEditorialStagger } from "@/components/motion/HeroEditorialStagger";
import { LoveLetter3D } from "@/components/motion/LoveLetter3D";
import { BuildYourValentine } from "@/components/motion/BuildYourValentine";
import { ScrollStorytelling } from "@/components/motion/ScrollStorytelling";
import { TemplateShowcase } from "@/components/motion/TemplateShowcase";
import { CurtainLink } from "@/components/motion/PageCurtains";

export default function HomePage() {
  return (
    <main className="relative min-h-[100dvh] flex flex-col items-center justify-start bg-[#FEDEEA] text-[#240412] overflow-x-hidden selection:bg-rose-500/20 selection:text-[#240412]">
      {/* Floating Pill Navigation */}
      <FloatingNavbar />

      {/* ========================================================================= */}
      {/* 01 — ENTER VALENTINO: PINK SUNSET SKY                                     */}
      {/* ========================================================================= */}
      <div className="relative w-full min-h-[92dvh] sm:min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#FEDEEA] via-[#FDECE8] to-[#FDF8F3]">
        <ValentineSky />

        <section className="w-full max-w-5xl mx-auto px-6 pt-24 sm:pt-28 pb-14 flex flex-col items-center justify-center text-center relative z-20 z-content">
          <HeroEditorialStagger
            eyebrow="A Private Interactive World"
            headline="Create a world made for someone you love."
            subtitle="Valentino is a private romantic storytelling experience crafted for the person who means everything to you — complete with starlight letters, shared memories, relationship milestones, and dimensional worlds."
            primaryCtaText="Begin Their World"
            primaryCtaHref="/create"
            secondaryCtaText="Explore Worlds"
            secondaryCtaHref="/templates"
          />
          <div className="mt-4 sm:mt-5 w-full max-w-xs sm:max-w-sm relative z-20">
            <LoveLetter3D />
          </div>
        </section>
      </div>

      {/* Horizon Bridge: Sunset Sky into Warm Cream Paper */}
      <SectionDivider variant="sky-to-cream" />

      {/* ========================================================================= */}
      {/* 05 — MAKE IT YOURS: WARM CREAM PAPER                                      */}
      {/* ========================================================================= */}
      <div className="w-full bg-[#FDF8F3] text-[#240412] relative z-20 z-content">
        <BuildYourValentine />
      </div>

      {/* Horizon Bridge: Warm Cream Paper into Soft Peach Paper */}
      <SectionDivider variant="cream-to-peach" />

      {/* ========================================================================= */}
      {/* 03 — BUILD THEIR STORY: SOFT PEACH PAPER                                  */}
      {/* ========================================================================= */}
      <div className="w-full bg-[#FFF0EA] text-[#240412] relative z-20 z-content">
        <ScrollStorytelling />
      </div>

      {/* Horizon Bridge: Soft Peach into Romantic Velvet */}
      <SectionDivider variant="peach-to-berry" />

      {/* ========================================================================= */}
      {/* 04 — ADD LITTLE SECRETS: ROMANTIC BERRY VELVET                            */}
      {/* ========================================================================= */}
      <div className="w-full bg-gradient-to-b from-[#2A0619] via-[#210414] to-[#16030E] text-[#FAF8F5] relative z-20 z-content py-24 sm:py-32 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Editorial Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
            <Badge
              variant="rose"
              size="sm"
              className="mb-4 tracking-widest uppercase text-[11px] bg-rose-950/80 border-rose-400/40 text-rose-200 shadow-2xs font-medium font-sans"
            >
              ✦ Hidden Treasures ✦
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-serif font-medium text-white tracking-tight mb-4 leading-tight">
              Add little secrets waiting to be discovered.
            </h2>
            <p className="text-sm sm:text-base text-rose-100/75 font-light leading-relaxed">
              Love isn&apos;t just what you say all at once. It is the little envelopes opened on quiet mornings, the private jokes hidden behind secret questions, and the surprises waiting for the days ahead.
            </p>
          </div>

          {/* Secret Cards Showcase Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Open When Envelopes */}
            <div className="rounded-3xl p-7 sm:p-8 bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-rose-400/25 shadow-xl backdrop-blur-md relative overflow-hidden group hover:border-rose-400/50 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-rose-900/60 border border-rose-400/30 flex items-center justify-center text-2xl mb-5 group-hover:scale-105 transition-transform">
                💌
              </div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-rose-300 font-semibold block mb-2">
                Open When Envelopes
              </span>
              <h3 className="font-serif text-xl font-medium text-white mb-2.5">
                Notes for future days
              </h3>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-light mb-4">
                Leave sealed letters they can unseal whenever they need you: Open When you miss me, Open When you have had a hard day, or Open when you can&apos;t sleep.
              </p>
              <div className="pt-3 border-t border-white/[0.08] text-[11px] text-rose-200/80 italic font-serif">
                “Close your eyes. Take a breath. I am right here.”
              </div>
            </div>

            {/* Tap-to-Reveal Secret Notes */}
            <div className="rounded-3xl p-7 sm:p-8 bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-rose-400/25 shadow-xl backdrop-blur-md relative overflow-hidden group hover:border-rose-400/50 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-rose-900/60 border border-rose-400/30 flex items-center justify-center text-2xl mb-5 group-hover:scale-105 transition-transform">
                🗝️
              </div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-rose-300 font-semibold block mb-2">
                Concealed Letters
              </span>
              <h3 className="font-serif text-xl font-medium text-white mb-2.5">
                Secret whispers
              </h3>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-light mb-4">
                Hide intimate words behind a delicate tap-to-reveal fold or lock them with a question only the two of you know the answer to.
              </p>
              <div className="pt-3 border-t border-white/[0.08] text-[11px] text-rose-200/80 italic font-serif">
                “Where did we share our very first secret?”
              </div>
            </div>

            {/* Playful Moments & Surprises */}
            <div className="rounded-3xl p-7 sm:p-8 bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-rose-400/25 shadow-xl backdrop-blur-md relative overflow-hidden group hover:border-rose-400/50 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-rose-900/60 border border-rose-400/30 flex items-center justify-center text-2xl mb-5 group-hover:scale-105 transition-transform">
                ✨
              </div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-rose-300 font-semibold block mb-2">
                Interactive Moments
              </span>
              <h3 className="font-serif text-xl font-medium text-white mb-2.5">
                Delight & discovery
              </h3>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-light mb-4">
                Surprise them with tactile scratch cards that reveal sweet compliments, a jar of reasons why you love them, or a playful relationship quiz.
              </p>
              <div className="pt-3 border-t border-white/[0.08] text-[11px] text-rose-200/80 italic font-serif">
                “Scratch here to reveal something I love about you...”
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 02 — CHOOSE THEIR WORLD: 3 LIVING DIMENSIONAL WORLDS                     */}
      {/* ========================================================================= */}
      <div className="w-full bg-gradient-to-b from-[#16030E] via-[#12030A] to-[#12030A] text-[#FAF8F5] relative z-20 z-content border-t border-rose-950/50">
        <TemplateShowcase />
      </div>

      {/* ========================================================================= */}
      {/* 06 — PREVIEW THE RECIPIENT EXPERIENCE                                     */}
      {/* ========================================================================= */}
      <div className="w-full bg-[#12030A] text-[#FAF8F5] relative z-20 z-content py-20 sm:py-28 px-6 border-t border-white/[0.06]">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-3xl border border-rose-400/20 bg-gradient-to-b from-[#1C0512]/90 to-[#12030A]/90 p-8 sm:p-14 shadow-2xl relative overflow-hidden">
            {/* Ambient Rosy Shadow */}
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-rose-600/10 blur-3xl pointer-events-none" />

            <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 relative z-10">
              <Badge
                variant="rose"
                size="sm"
                className="mb-3.5 tracking-widest uppercase text-[11px] bg-rose-950/80 border-rose-400/40 text-rose-200 font-medium font-sans"
              >
                ✦ The Recipient Journey ✦
              </Badge>
              <h2 className="text-2xl sm:text-4xl font-serif font-medium text-white tracking-tight mb-3">
                You don&apos;t just send a page. They enter a world.
              </h2>
              <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                When your partner opens your link, there are no logins, no app downloads, and no ads. Only an intimate environment designed by you.
              </p>
            </div>

            {/* 4-Step Experience Path */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left relative z-10">
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
                <span className="text-xl">🌌</span>
                <span className="block text-[10px] uppercase font-mono tracking-widest text-rose-300 font-medium mt-3 mb-1">
                  Step 01
                </span>
                <h4 className="font-serif text-base text-white font-medium mb-1">They Arrive</h4>
                <p className="text-xs text-white/65 font-light leading-relaxed">
                  They are greeted by a living atmosphere — drifting clouds, glowing lanterns, or moonlight.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
                <span className="text-xl">💌</span>
                <span className="block text-[10px] uppercase font-mono tracking-widest text-rose-300 font-medium mt-3 mb-1">
                  Step 02
                </span>
                <h4 className="font-serif text-base text-white font-medium mb-1">They Break the Seal</h4>
                <p className="text-xs text-white/65 font-light leading-relaxed">
                  With a single tap, the custom wax seal yields and your hand-written note unfolds before them.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
                <span className="text-xl">📖</span>
                <span className="block text-[10px] uppercase font-mono tracking-widest text-rose-300 font-medium mt-3 mb-1">
                  Step 03
                </span>
                <h4 className="font-serif text-base text-white font-medium mb-1">They Walk Through Time</h4>
                <p className="text-xs text-white/65 font-light leading-relaxed">
                  Chapters of your story, photos, milestones, and playful moments reveal themselves as they scroll.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
                <span className="text-xl">🌹</span>
                <span className="block text-[10px] uppercase font-mono tracking-widest text-rose-300 font-medium mt-3 mb-1">
                  Step 04
                </span>
                <h4 className="font-serif text-base text-white font-medium mb-1">They Keep It Forever</h4>
                <p className="text-xs text-white/65 font-light leading-relaxed">
                  The link remains their private sanctuary to revisit whenever they want to feel close to you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Horizon Bridge: Midnight World into Soft Cream Finale */}
      <SectionDivider variant="midnight-to-cream" />

      {/* ========================================================================= */}
      {/* 07 — SEAL & SEND: SOFT ROMANTIC FINALE                                    */}
      {/* ========================================================================= */}
      <div className="w-full bg-[#FDF8F3] text-[#240412] relative z-20 z-content py-20 sm:py-28 px-6">
        <div className="max-w-5xl mx-auto space-y-20">
          {/* Privacy & Reassurance Section (Supporting, not Climax) */}
          <div className="rounded-3xl border border-rose-200/80 bg-white/80 backdrop-blur-md p-8 sm:p-12 shadow-sm text-center space-y-6">
            <Badge
              variant="rose"
              size="sm"
              className="tracking-widest uppercase text-[11px] bg-rose-50 border-rose-200 text-[#881337] font-medium"
            >
              Intimate & Private
            </Badge>
            <h2 className="text-2xl sm:text-4xl font-serif font-medium text-[#240412] tracking-tight">
              Private by design. Crafted for two.
            </h2>
            <p className="text-sm sm:text-base text-[#4A0E2E]/80 font-normal max-w-xl mx-auto leading-relaxed">
              Your Valentine is protected with private edit tokens stored securely in your browser. Never indexed by search engines, no public feeds, and zero ads.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-left max-w-3xl mx-auto">
              <div className="p-5 rounded-2xl bg-rose-50/60 border border-rose-100">
                <span className="text-lg">🔒</span>
                <h3 className="font-serif text-base font-medium text-[#240412] mt-2 mb-1">Unguessable URL</h3>
                <p className="text-xs text-[#5E2640] leading-relaxed font-normal">
                  High-entropy 22-character nanoids prevent anyone from discovering your private link.
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-rose-50/60 border border-rose-100">
                <span className="text-lg">🚫</span>
                <h3 className="font-serif text-base font-medium text-[#240412] mt-2 mb-1">Zero Tracking</h3>
                <p className="text-xs text-[#5E2640] leading-relaxed font-normal">
                  No third-party trackers or ad cookies inspecting your personal thoughts.
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-rose-50/60 border border-rose-100">
                <span className="text-lg">✨</span>
                <h3 className="font-serif text-base font-medium text-[#240412] mt-2 mb-1">No Passwords</h3>
                <p className="text-xs text-[#5E2640] leading-relaxed font-normal">
                  Write, seal, and publish in minutes without creating an account.
                </p>
              </div>
            </div>
          </div>

          {/* Final Emotional Call to Action */}
          <section className="text-center relative z-10 space-y-6 max-w-3xl mx-auto pt-6">
            <span className="text-3xl select-none animate-pulse">💌</span>
            <h2 className="text-3xl sm:text-5xl font-serif font-medium text-[#240412] leading-tight tracking-tight">
              Give them a little piece of the internet they&apos;ll want to keep.
            </h2>
            <p className="text-sm sm:text-base text-[#4A0E2E] font-normal max-w-lg mx-auto leading-relaxed">
              Create something personal, tender, and unforgettable across our distinct romantic worlds.
            </p>
            <div className="pt-3">
              <CurtainLink href="/create">
                <Button size="lg" variant="primary" className="px-9 py-4 rounded-full font-medium text-white bg-gradient-to-r from-[#E11D48] via-[#F43F5E] to-[#FB7185] shadow-[0_12px_28px_rgba(225,29,72,0.3)] hover:shadow-[0_16px_36px_rgba(225,29,72,0.4)] hover:-translate-y-0.5 active:scale-[0.98] transition-all">
                  <span>Create Your Experience</span>
                  <span className="text-sm">💌</span>
                </Button>
              </CurtainLink>
            </div>
          </section>
        </div>

        {/* Elegant Editorial Footer */}
        <footer className="w-full max-w-5xl mx-auto mt-20 pt-10 border-t border-rose-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6B2346] font-sans relative z-10">
          <div className="flex items-center gap-2">
            <span>💌</span>
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
      </div>
    </main>
  );
}
