import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { AtmosphericGlow } from "@/components/ui/AtmosphericGlow";
import { HeroEditorialStagger } from "@/components/motion/HeroEditorialStagger";
import { LogoTicker } from "@/components/motion/LogoTicker";
import { CurtainLink } from "@/components/motion/PageCurtains";

export default function HomePage() {
  return (
    <main className="relative min-h-[100dvh] flex flex-col items-center justify-start bg-[#07070A] text-[#FAF8F5] overflow-x-hidden selection:bg-rose-500/30 selection:text-white">
      {/* Ambient background illumination */}
      <AtmosphericGlow theme="crimson-rose" intensity="medium" />

      {/* Navigation Header */}
      <header className="w-full max-w-6xl mx-auto px-6 py-6 flex items-center justify-between relative z-20">
        <CurtainLink href="/" className="flex items-center gap-2 group">
          <span className="text-xl select-none transition-transform group-hover:scale-110 duration-300">💌</span>
          <span className="text-lg font-serif font-medium tracking-wider text-white">
            Valentino
          </span>
        </CurtainLink>
        <div className="flex items-center gap-4">
          <CurtainLink
            href="/templates"
            className="text-xs uppercase tracking-widest text-ivory-300 hover:text-white transition-colors"
          >
            Templates
          </CurtainLink>
          <CurtainLink href="/create">
            <Button size="sm" variant="secondary" className="text-xs">
              Start Writing
            </Button>
          </CurtainLink>
        </div>
      </header>

      {/* Hero Section */}
      <section className="w-full max-w-5xl mx-auto px-6 pt-12 pb-16 flex flex-col items-center text-center relative z-10">
        {/* Animated Editorial Stagger Hero */}
        <HeroEditorialStagger />

        {/* Interactive Visual Hero Showcase (Floating Cards) */}
        <div className="mt-16 w-full max-w-3xl relative">
          <div className="absolute inset-0 bg-gradient-to-t from-[#07070A] via-transparent to-transparent z-10 pointer-events-none" />

          {/* Perspective container */}
          <div className="relative mx-auto max-w-xl">
            {/* Ambient backlight */}
            <div className="absolute -inset-4 bg-gradient-to-r from-rose-600/20 via-crimson-600/20 to-amber-600/10 rounded-3xl blur-2xl opacity-60" />

            {/* Preview Card */}
            <Card
              variant="glass"
              className="p-8 sm:p-10 border-rose-500/20 bg-white/[0.03] shadow-2xl relative z-0 text-left space-y-6"
            >
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                <span className="text-xs uppercase tracking-widest text-rose-300 bg-rose-950/60 px-3 py-1 rounded-full border border-rose-800/40">
                  To My Favorite Person
                </span>
                <span className="text-xs font-sans text-ivory-400">Midnight Rose v1</span>
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-serif font-medium text-white mb-2">
                  Dearest Maya
                </h2>
                <p className="text-sm sm:text-base text-ivory-200/90 font-light leading-relaxed whitespace-pre-line italic">
                  &ldquo;Every single day with you feels like starlight. You turned ordinary moments into poetry, and I wanted you to have something made just for you.&rdquo;
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-rose-700/80 border border-rose-500/60 flex items-center justify-center shadow-lg shadow-rose-950/60">
                    <span className="text-base select-none">💌</span>
                  </div>
                  <span className="text-xs text-ivory-300 font-sans tracking-wide">
                    Sealed with Digital Wax
                  </span>
                </div>
                <div className="text-right">
                  <span className="block text-[11px] uppercase tracking-widest text-ivory-400">
                    With all my love
                  </span>
                  <span className="font-serif text-rose-300 font-medium text-lg">
                    Yours Always
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Feature / Value Marquee Ticker */}
      <LogoTicker className="border-y border-white/[0.06] bg-white/[0.01]" />

      {/* How It Works (3 Pillars) */}
      <section className="w-full max-w-5xl mx-auto px-6 py-20 border-t border-white/[0.06] relative z-10">
        <div className="text-center max-w-xl mx-auto mb-14">
          <Badge variant="neutral" size="sm" className="mb-3">
            The Journey
          </Badge>
          <h2 className="text-2xl sm:text-4xl font-serif font-medium text-white mb-3">
            Effortless to create. Unforgettable to receive.
          </h2>
          <p className="text-sm text-ivory-300/80 font-light">
            Designed for genuine sentiment, without apps, accounts, or friction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card variant="glass" className="p-7 space-y-4 hover:border-white/20 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-rose-950/50 border border-rose-800/40 flex items-center justify-center text-2xl">
              ✨
            </div>
            <h3 className="text-lg font-serif font-medium text-white">
              1. Choose an Atmosphere
            </h3>
            <p className="text-sm text-ivory-300/75 leading-relaxed font-light">
              Select from curated, dark romantic templates designed with starlight glows, luxury typography, and warm color palettes.
            </p>
          </Card>

          <Card variant="glass" className="p-7 space-y-4 hover:border-white/20 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-amber-950/50 border border-amber-800/40 flex items-center justify-center text-2xl">
              ✍️
            </div>
            <h3 className="text-lg font-serif font-medium text-white">
              2. Speak from the Heart
            </h3>
            <p className="text-sm text-ivory-300/75 leading-relaxed font-light">
              Personalize your names, intimate greetings, and romantic notes in a calm editor with real-time phone preview and autosave.
            </p>
          </Card>

          <Card variant="glass" className="p-7 space-y-4 hover:border-white/20 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-purple-950/50 border border-purple-800/40 flex items-center justify-center text-2xl">
              🌹
            </div>
            <h3 className="text-lg font-serif font-medium text-white">
              3. Deliver the Moment
            </h3>
            <p className="text-sm text-ivory-300/75 leading-relaxed font-light">
              Send your private link. When your partner opens it, they break a digital wax seal to unveil your personal letter.
            </p>
          </Card>
        </div>
      </section>

      {/* Featured Template Spotlight */}
      <section id="templates" className="w-full max-w-5xl mx-auto px-6 py-20 border-t border-white/[0.06] relative z-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
          <div>
            <Badge variant="rose" size="sm" className="mb-3">
              Featured Template
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-serif font-medium text-white">
              Midnight Rose
            </h2>
            <p className="text-sm text-ivory-300/80 font-light mt-1">
              An intimate, starlight-themed love letter sealed with digital wax.
            </p>
          </div>
          <CurtainLink href="/templates">
            <Button variant="outline" size="sm">
              View All Templates →
            </Button>
          </CurtainLink>
        </div>

        <Card variant="glass" className="p-8 sm:p-12 border-rose-500/20 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-widest text-rose-400 font-medium">
                  Flagship Experience
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif text-white font-medium">
                  The classic seal & reveal.
                </h3>
                <p className="text-sm text-ivory-200/80 font-light leading-relaxed">
                  Crafted for quiet romance. Featuring responsive editorial typography, warm candlelight glows, and a tactile wax seal that breaks upon tap.
                </p>
              </div>

              <div className="space-y-3">
                <span className="block text-xs uppercase tracking-wider text-ivory-400">
                  Included Color Palettes:
                </span>
                <div className="flex flex-wrap gap-2.5">
                  <span className="text-xs px-3 py-1.5 rounded-xl bg-rose-950/60 border border-rose-800/50 text-rose-300 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-500" /> Crimson Rose
                  </span>
                  <span className="text-xs px-3 py-1.5 rounded-xl bg-purple-950/60 border border-purple-800/50 text-purple-300 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-purple-500" /> Midnight Violet
                  </span>
                  <span className="text-xs px-3 py-1.5 rounded-xl bg-amber-950/60 border border-amber-800/50 text-amber-300 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500" /> Champagne Gold
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <CurtainLink href="/create">
                  <Button size="md" variant="primary">
                    Start with Midnight Rose
                  </Button>
                </CurtainLink>
              </div>
            </div>

            {/* Template Card Showcase */}
            <div className="relative flex items-center justify-center p-6 rounded-2xl bg-black/40 border border-white/[0.08]">
              <div className="w-full max-w-sm rounded-xl bg-white/[0.02] border border-rose-500/30 p-6 text-center space-y-4">
                <span className="inline-block text-xs tracking-widest uppercase px-2.5 py-0.5 rounded-full border border-rose-800/50 bg-rose-950/50 text-rose-300">
                  Sealed Experience
                </span>
                <div className="w-16 h-16 mx-auto rounded-full bg-rose-700 border border-rose-500 shadow-xl shadow-rose-950/80 flex items-center justify-center">
                  <span className="text-2xl select-none">💌</span>
                </div>
                <div className="space-y-1">
                  <h4 className="font-serif text-lg text-white font-medium">To My Dearest</h4>
                  <p className="text-xs text-ivory-400">Tap the wax seal to unveil the letter</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Footer */}
      <footer className="w-full max-w-5xl mx-auto px-6 py-12 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ivory-400 font-sans relative z-10">
        <div className="flex items-center gap-2">
          <span>💌</span>
          <span className="text-white font-serif">Valentino</span>
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
    </main>
  );
}
