"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { AtmosphericGlow } from "@/components/ui/AtmosphericGlow";
import { CurtainLink } from "@/components/motion/PageCurtains";

import { ValentinoMonogram } from "@/components/motion/ValentinoMonogram";

export default function TemplatesPage() {
  const [selectedMidnightTheme, setSelectedMidnightTheme] = useState<
    "crimson-rose" | "midnight-violet" | "champagne-gold"
  >("crimson-rose");

  const themeMeta = {
    "crimson-rose": {
      name: "Crimson Rose",
      sealBg: "bg-rose-700",
      sealBorder: "border-rose-500",
      border: "border-rose-500/30",
      badge: "text-rose-200 bg-rose-950/70 border-rose-500/40",
      accentText: "text-rose-300",
    },
    "midnight-violet": {
      name: "Midnight Violet",
      sealBg: "bg-purple-700",
      sealBorder: "border-purple-500",
      border: "border-purple-500/30",
      badge: "text-purple-200 bg-purple-950/70 border-purple-500/40",
      accentText: "text-purple-300",
    },
    "champagne-gold": {
      name: "Champagne Gold",
      sealBg: "bg-amber-700",
      sealBorder: "border-amber-500",
      border: "border-amber-500/30",
      badge: "text-amber-200 bg-amber-950/70 border-amber-500/40",
      accentText: "text-amber-300",
    },
  }[selectedMidnightTheme];

  return (
    <main className="relative min-h-[100dvh] flex flex-col items-center justify-start bg-[#12030A] text-[#FAF8F5] overflow-x-hidden selection:bg-rose-500/30">
      <AtmosphericGlow theme={selectedMidnightTheme} intensity="medium" />

      {/* Header */}
      <header className="w-full max-w-6xl mx-auto px-6 py-6 flex items-center justify-between relative z-20">
        <CurtainLink href="/" className="flex items-center gap-2 group">
          <ValentinoMonogram size={32} className="transition-transform group-hover:scale-105 duration-300" />
          <span className="text-lg font-serif font-medium tracking-wider text-white">
            Valentino
          </span>
        </CurtainLink>
        <CurtainLink href="/create">
          <Button size="sm" variant="primary" className="text-xs px-4 rounded-full shadow-lg shadow-rose-950/60">
            Start Writing 💌
          </Button>
        </CurtainLink>
      </header>

      {/* Page Title */}
      <section className="w-full max-w-5xl mx-auto px-6 pt-10 pb-12 text-center relative z-10">
        <Badge variant="rose" size="sm" className="mb-3">
          Template Collection
        </Badge>
        <h1 className="text-3xl sm:text-5xl font-serif font-medium text-white mb-3">
          Choose Your Atmosphere
        </h1>
        <p className="text-sm sm:text-base text-ivory-300/80 font-light max-w-lg mx-auto">
          Every love story has its own rhythm. Select a canvas that reflects how you want your partner to feel.
        </p>
      </section>

      {/* Templates Grid */}
      <section className="w-full max-w-5xl mx-auto px-6 pb-24 relative z-10 space-y-12">
        {/* Flagship: Midnight Rose v1 */}
        <Card
          variant="glass"
          className="p-6 sm:p-10 border-white/[0.1] hover:border-white/20 transition-all duration-300 overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Template Info */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-3">
                <Badge variant="rose" size="md">
                  Active & Available
                </Badge>
                <span className="text-xs text-ivory-400 font-sans">Version 1.0</span>
              </div>

              <div>
                <h2 className="text-2xl sm:text-4xl font-serif font-medium text-white mb-2">
                  Midnight Rose
                </h2>
                <p className="text-sm sm:text-base text-ivory-200/85 font-light leading-relaxed">
                  An intimate, starlight-themed love letter sealed with digital wax. Designed for quiet declarations, deep affection, and memorable reveals.
                </p>
              </div>

              {/* Supported Features */}
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-wider text-ivory-400 font-medium">
                  Experience Features
                </span>
                <ul className="grid grid-cols-2 gap-2 text-xs text-ivory-300">
                  <li className="flex items-center gap-2">
                    <span className="text-rose-400">✓</span> Interactive Wax Seal
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rose-400">✓</span> 3 Color Palettes
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rose-400">✓</span> Mobile-First Layout
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rose-400">✓</span> Instant Live Preview
                  </li>
                </ul>
              </div>

              {/* Interactive Color Swatch Selector */}
              <div className="space-y-2.5 pt-2">
                <span className="block text-xs uppercase tracking-wider text-ivory-400 font-medium">
                  Preview Palette: <strong className="text-white normal-case">{themeMeta.name}</strong>
                </span>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedMidnightTheme("crimson-rose")}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium border flex items-center gap-2 transition-all ${
                      selectedMidnightTheme === "crimson-rose"
                        ? "border-rose-500 bg-rose-950/60 text-white"
                        : "border-white/10 bg-white/5 text-ivory-400 hover:bg-white/10"
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Crimson
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedMidnightTheme("midnight-violet")}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium border flex items-center gap-2 transition-all ${
                      selectedMidnightTheme === "midnight-violet"
                        ? "border-purple-500 bg-purple-950/60 text-white"
                        : "border-white/10 bg-white/5 text-ivory-400 hover:bg-white/10"
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-500" /> Violet
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedMidnightTheme("champagne-gold")}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium border flex items-center gap-2 transition-all ${
                      selectedMidnightTheme === "champagne-gold"
                        ? "border-amber-500 bg-amber-950/60 text-white"
                        : "border-white/10 bg-white/5 text-ivory-400 hover:bg-white/10"
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Gold
                  </button>
                </div>
              </div>

              <div className="pt-3">
                <CurtainLink href="/create">
                  <Button size="lg" variant="primary" className="w-full sm:w-auto">
                    Customize Midnight Rose
                  </Button>
                </CurtainLink>
              </div>
            </div>

            {/* Right: Interactive Visual Card Preview */}
            <div className="lg:col-span-6 flex items-center justify-center p-4">
              <div
                className={`w-full max-w-sm rounded-2xl bg-black/40 border ${themeMeta.border} p-8 text-center space-y-6 shadow-2xl transition-all duration-500`}
              >
                <div className="space-y-2">
                  <span
                    className={`inline-block text-xs uppercase tracking-widest px-3 py-1 rounded-full border ${themeMeta.badge}`}
                  >
                    To My Favorite Person
                  </span>
                  <h3 className="text-2xl font-serif font-medium text-white">Dearest Maya</h3>
                </div>

                <div className="py-4 flex flex-col items-center justify-center">
                  <div
                    className={`w-20 h-20 rounded-full ${themeMeta.sealBg} border-2 ${themeMeta.sealBorder} flex items-center justify-center shadow-xl cursor-pointer hover:scale-105 transition-transform duration-300`}
                  >
                    <span className="text-3xl select-none">💌</span>
                  </div>
                  <span className="mt-3 text-xs uppercase tracking-wider text-ivory-400/80">
                    Tap to break seal
                  </span>
                </div>

                <div className="pt-2 border-t border-white/[0.06] text-right">
                  <span className="block text-[10px] uppercase tracking-widest text-ivory-400">
                    With all my love
                  </span>
                  <span className={`font-serif text-base font-medium ${themeMeta.accentText}`}>
                    Yours Always
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Coming Soon Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
          {/* Concept 2 */}
          <Card variant="glass" className="p-7 space-y-4 opacity-75 border-white/[0.06]">
            <div className="flex items-center justify-between">
              <Badge variant="violet" size="sm">
                Coming in M4
              </Badge>
              <span className="text-xs text-ivory-400">Design Concept</span>
            </div>
            <h3 className="text-xl font-serif font-medium text-white">Starlit Constellation</h3>
            <p className="text-xs sm:text-sm text-ivory-300/70 font-light leading-relaxed">
              An interactive night sky where letters and memories unfold as your partner connects stars in a glowing celestial map.
            </p>
            <div className="pt-2">
              <span className="text-xs text-ivory-400 italic">In active design</span>
            </div>
          </Card>

          {/* Concept 3 */}
          <Card variant="glass" className="p-7 space-y-4 opacity-75 border-white/[0.06]">
            <div className="flex items-center justify-between">
              <Badge variant="gold" size="sm">
                Coming in M4
              </Badge>
              <span className="text-xs text-ivory-400">Design Concept</span>
            </div>
            <h3 className="text-xl font-serif font-medium text-white">Vintage Parchment</h3>
            <p className="text-xs sm:text-sm text-ivory-300/70 font-light leading-relaxed">
              Warm candlelight, deckled cotton paper edges, and typewriter typography for timeless lovers of traditional correspondence.
            </p>
            <div className="pt-2">
              <span className="text-xs text-ivory-400 italic">In active design</span>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full max-w-5xl mx-auto px-6 py-10 border-t border-white/[0.06] flex items-center justify-between text-xs text-ivory-400 relative z-10">
        <CurtainLink href="/" className="hover:text-white transition-colors">
          ← Back to Home
        </CurtainLink>
        <span>Valentino Platform · 2026</span>
      </footer>
    </main>
  );
}
