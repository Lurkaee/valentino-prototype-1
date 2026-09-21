"use client";

import React, { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { CurtainLink } from "@/components/motion/PageCurtains";
import { ValentinoMonogram } from "@/components/motion/ValentinoMonogram";
import { ValentinePlasmaButton } from "@/components/ui/ValentinePlasmaButton";
import { getAllTemplates, ROADMAP_WORLDS, RoadmapWorld } from "@/templates/registry";
import { TemplateDefinition } from "@/templates/types";

// Lazy-load Kage WebGL component to isolate Three.js runtime until explicitly requested
const KageComponentLazy = dynamic(
  () => import("@/templates/kage/v1/Component").then((mod) => mod.KageComponent),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full min-h-[380px] flex flex-col items-center justify-center bg-[#06100E] text-emerald-300 gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-emerald-400 border-t-transparent animate-spin" />
        <span className="text-xs font-mono tracking-wider">Initializing Kyoto Temple WebGL...</span>
      </div>
    ),
  }
);

export default function TemplatesPage() {
  const allTemplates = useMemo(() => getAllTemplates(), []);

  const midnightTemplate = allTemplates.find((t) => t.id === "midnight-rose");
  const cloudNineTemplate = allTemplates.find((t) => t.id === "cloud-nine");
  const kageTemplate = allTemplates.find((t) => t.id === "kage");

  const [featuredWorldId, setFeaturedWorldId] = useState<string>("midnight-rose");
  const [selectedMidnightTheme, setSelectedMidnightTheme] = useState<
    "crimson-rose" | "midnight-violet" | "champagne-gold"
  >("crimson-rose");
  const [surpriseMatch, setSurpriseMatch] = useState<string | null>(null);
  const [activeKagePreview, setActiveKagePreview] = useState(false);
  const [activeMidnightSealed, setActiveMidnightSealed] = useState(true);
  const [activeCloudNineSealed, setActiveCloudNineSealed] = useState(true);

  // Midnight Rose theme metadata
  const themeMeta = {
    "crimson-rose": {
      name: "Crimson Rose",
      sealBg: "bg-rose-700",
      sealBorder: "border-rose-500",
      border: "border-rose-500/30",
      badge: "text-rose-200 bg-rose-950/70 border-rose-500/40",
      accentText: "text-rose-300",
      glow: "rgba(225, 29, 72, 0.25)",
    },
    "midnight-violet": {
      name: "Midnight Violet",
      sealBg: "bg-purple-700",
      sealBorder: "border-purple-500",
      border: "border-purple-500/30",
      badge: "text-purple-200 bg-purple-950/70 border-purple-500/40",
      accentText: "text-purple-300",
      glow: "rgba(147, 51, 234, 0.25)",
    },
    "champagne-gold": {
      name: "Champagne Gold",
      sealBg: "bg-amber-700",
      sealBorder: "border-amber-500",
      border: "border-amber-500/30",
      badge: "text-amber-200 bg-amber-950/70 border-amber-500/40",
      accentText: "text-amber-300",
      glow: "rgba(217, 119, 6, 0.25)",
    },
  }[selectedMidnightTheme];

  const handleSurpriseMe = () => {
    const activeIds = ["midnight-rose", "cloud-nine", "kage"];
    const random = activeIds[Math.floor(Math.random() * activeIds.length)];
    setSurpriseMatch(random);
    setFeaturedWorldId(random);
    const targetElement = document.getElementById(`template-${random}`);
    targetElement?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="relative min-h-[100dvh] flex flex-col items-center justify-start bg-[#0A090C] text-[#FAF8F5] overflow-x-hidden selection:bg-rose-500/25 font-ui">
      {/* ========================================================================= */}
      {/* 1. Header (Valentino Neutral Core Shell)                                  */}
      {/* ========================================================================= */}
      <header className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-5 flex items-center justify-between relative z-20">
        <CurtainLink href="/" className="flex items-center gap-2 group">
          <ValentinoMonogram size={30} className="transition-transform group-hover:scale-105 duration-300 text-ivory-100" />
          <span className="text-base sm:text-lg font-serif font-medium tracking-wider text-white">
            Valentino
          </span>
        </CurtainLink>
        <CurtainLink href="/create">
          <Button size="sm" variant="primary" className="text-xs px-4 rounded-full shadow-sm">
            Create Experience
          </Button>
        </CurtainLink>
      </header>

      {/* ========================================================================= */}
      {/* 2. Showroom Hero & Product Framing                                        */}
      {/* ========================================================================= */}
      <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 pt-6 sm:pt-10 pb-10 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
          <span className="text-[11px] uppercase tracking-widest text-ivory-300 font-medium">
            The Collection · Visual Worlds
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-serif font-normal text-white mb-3 tracking-tight">
          Choose Your Atmosphere
        </h1>
        <p className="text-sm sm:text-base text-ivory-300/80 font-light max-w-xl mx-auto leading-relaxed">
          Every love story lives in its own climate. Step inside complete interactive worlds designed to frame your words, memories, and secrets.
        </p>

        {/* Curator Plasma Feature */}
        <div className="pt-7 flex flex-col items-center justify-center">
          <ValentinePlasmaButton
            theme="valentine"
            label="SURPRISE ME"
            sublabel="Spark a Match"
            size="md"
            onClick={handleSurpriseMe}
          />
          {surpriseMatch && (
            <p className="mt-3 text-xs font-mono text-rose-300 animate-fade-in bg-rose-950/40 border border-rose-500/30 px-3 py-1 rounded-full">
              Matched with {surpriseMatch === "midnight-rose" ? "Midnight Rose" : surpriseMatch === "cloud-nine" ? "Cloud Nine" : "Kage Secret Sanctuary"} ✨
            </p>
          )}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. THE COLLECTION: FEATURED STAGE (Large Live Scene)                       */}
      {/* ========================================================================= */}
      <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 pb-16 relative z-10">
        <div className="mb-4 flex items-center justify-between border-b border-white/[0.08] pb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-[0.2em] text-ivory-400 font-medium">Featured World</span>
            <Badge variant="neutral" size="sm" className="text-[10px] text-ivory-200">
              {featuredWorldId === "midnight-rose" ? "Flagship" : "Live Stage"}
            </Badge>
          </div>
          <div className="flex items-center gap-2 text-xs text-ivory-400">
            <span>Switch Stage:</span>
            <button
              onClick={() => setFeaturedWorldId("midnight-rose")}
              className={`px-2.5 py-1 rounded-lg text-xs transition-colors ${
                featuredWorldId === "midnight-rose" ? "bg-white/10 text-white font-medium" : "hover:text-white"
              }`}
            >
              Midnight
            </button>
            <button
              onClick={() => setFeaturedWorldId("cloud-nine")}
              className={`px-2.5 py-1 rounded-lg text-xs transition-colors ${
                featuredWorldId === "cloud-nine" ? "bg-white/10 text-white font-medium" : "hover:text-white"
              }`}
            >
              Cloud Nine
            </button>
            <button
              onClick={() => setFeaturedWorldId("kage")}
              className={`px-2.5 py-1 rounded-lg text-xs transition-colors ${
                featuredWorldId === "kage" ? "bg-white/10 text-white font-medium" : "hover:text-white"
              }`}
            >
              Kage
            </button>
          </div>
        </div>

        {/* FEATURED WORLD: MIDNIGHT ROSE */}
        {featuredWorldId === "midnight-rose" && (
          <Card
            id="template-midnight-rose"
            variant="glass"
            className="p-6 sm:p-10 border-white/[0.12] shadow-2xl relative overflow-hidden transition-all duration-500 bg-[#0E0B13]/90"
          >
            <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full blur-3xl pointer-events-none" style={{ background: themeMeta.glow }} />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              {/* Left Editorial Metadata */}
              <div className="lg:col-span-6 space-y-6">
                <div className="flex items-center gap-3">
                  <Badge variant="rose" size="md" className="tracking-wider">
                    {midnightTemplate?.availability === "available" ? "Active & Available" : "Available"}
                  </Badge>
                  <span className="text-xs text-ivory-400 font-sans">Version 1.0</span>
                </div>

                <div>
                  <h2 className="text-3xl sm:text-4xl font-serif font-medium text-white mb-2">
                    {midnightTemplate?.name || "Midnight Rose"}
                  </h2>
                  <p className="text-sm font-serif italic text-rose-300/90 mb-3">
                    &ldquo;{midnightTemplate?.tagline || "For the love that feels like midnight"}&rdquo;
                  </p>
                  <p className="text-sm text-ivory-200/85 font-light leading-relaxed">
                    {midnightTemplate?.description || "An intimate, starlight-themed love letter sealed with digital wax."} Designed for quiet declarations, deep affection, and memorable reveals.
                  </p>
                </div>

                {/* Signature Interaction & Modules */}
                <div className="space-y-3 pt-1 border-t border-white/[0.08]">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-ivory-400 uppercase tracking-wider font-medium">Signature:</span>
                    <span className="text-rose-300">{midnightTemplate?.signature || "Physical envelope + interactive wax seal reveal"}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {midnightTemplate?.supportedModules?.map((mod) => (
                      <span key={mod} className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-white/[0.05] border border-white/10 text-ivory-300">
                        {mod}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Palette Switcher */}
                <div className="space-y-2 pt-2">
                  <span className="block text-xs uppercase tracking-wider text-ivory-400 font-medium">
                    Preview Atmosphere Palette: <strong className="text-white normal-case">{themeMeta.name}</strong>
                  </span>
                  <div className="flex gap-2.5">
                    <button
                      type="button"
                      onClick={() => setSelectedMidnightTheme("crimson-rose")}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium border flex items-center gap-2 transition-all ${
                        selectedMidnightTheme === "crimson-rose"
                          ? "border-rose-500 bg-rose-950/60 text-white shadow-sm shadow-rose-900/40"
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
                          ? "border-purple-500 bg-purple-950/60 text-white shadow-sm shadow-purple-900/40"
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
                          ? "border-amber-500 bg-amber-950/60 text-white shadow-sm shadow-amber-900/40"
                          : "border-white/10 bg-white/5 text-ivory-400 hover:bg-white/10"
                      }`}
                    >
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Gold
                    </button>
                  </div>
                </div>

                {/* Primary Actions */}
                <div className="pt-3 flex flex-wrap items-center gap-3">
                  <CurtainLink href="/create">
                    <Button size="lg" variant="romantic" className="w-full sm:w-auto px-6 font-medium">
                      Customize Midnight Rose
                    </Button>
                  </CurtainLink>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => setActiveMidnightSealed((s) => !s)}
                    className="w-full sm:w-auto text-xs"
                  >
                    {activeMidnightSealed ? "Break Wax Seal" : "Reseal Envelope"}
                  </Button>
                </div>
              </div>

              {/* Right Live Scene Canvas */}
              <div className="lg:col-span-6 flex items-center justify-center p-2 sm:p-4">
                <div className={`w-full max-w-sm rounded-2xl bg-black/60 border ${themeMeta.border} p-6 sm:p-8 text-center space-y-6 shadow-2xl transition-all duration-500 backdrop-blur-xl`}>
                  <div className="space-y-1.5">
                    <span className={`inline-block text-[11px] uppercase tracking-widest px-3 py-0.5 rounded-full border ${themeMeta.badge}`}>
                      To My Favorite Person
                    </span>
                    <h3 className="text-2xl font-serif font-medium text-white">Dearest Maya</h3>
                  </div>

                  {activeMidnightSealed ? (
                    <div className="py-6 flex flex-col items-center justify-center">
                      <button
                        type="button"
                        onClick={() => setActiveMidnightSealed(false)}
                        className={`w-20 h-20 rounded-full ${themeMeta.sealBg} border-2 ${themeMeta.sealBorder} flex items-center justify-center shadow-xl cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-300`}
                        aria-label="Break seal"
                      >
                        <span className="text-3xl select-none">💌</span>
                      </button>
                      <span className="mt-3 text-xs uppercase tracking-wider text-ivory-400/80">
                        Tap wax seal to unfold
                      </span>
                    </div>
                  ) : (
                    <div className="py-3 px-4 rounded-xl bg-white/[0.04] border border-white/10 text-left space-y-3 animate-fade-in">
                      <p className="text-xs text-ivory-200 leading-relaxed font-light font-display italic">
                        &ldquo;In a world of noise, you are my quiet starlight. Every single day with you feels like midnight poetry.&rdquo;
                      </p>
                      <div className="text-right text-[11px] text-rose-300 font-serif">
                        — Yours Always
                      </div>
                    </div>
                  )}

                  <div className="pt-2 border-t border-white/[0.08] flex items-center justify-between text-xs text-ivory-400">
                    <span>Starlight Atmosphere</span>
                    <span className={themeMeta.accentText}>{themeMeta.name}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* FEATURED WORLD: CLOUD NINE */}
        {featuredWorldId === "cloud-nine" && (
          <Card
            id="template-cloud-nine"
            variant="glass"
            className="p-6 sm:p-10 border-pink-300/30 shadow-2xl relative overflow-hidden transition-all duration-500 bg-gradient-to-br from-[#1C1220]/95 via-[#160E1A]/95 to-[#0F0B14]/95"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-6 space-y-6">
                <div className="flex items-center gap-3">
                  <Badge variant="rose" size="md" className="bg-pink-500/20 text-pink-200 border-pink-400/40">
                    Active & Available
                  </Badge>
                  <span className="text-xs text-pink-200/70 font-sans">Version 1.0</span>
                </div>

                <div>
                  <h2 className="text-3xl sm:text-4xl font-serif font-medium text-white mb-2">
                    {cloudNineTemplate?.name || "Cloud Nine"}
                  </h2>
                  <p className="text-sm font-serif italic text-pink-300/90 mb-3">
                    &ldquo;{cloudNineTemplate?.tagline || "For the person who makes everything lighter"}&rdquo;
                  </p>
                  <p className="text-sm text-pink-100/85 font-light leading-relaxed">
                    {cloudNineTemplate?.description || "A luminous, dreamy pastel sanctuary of soft clouds and celestial devotion."}
                  </p>
                </div>

                <div className="space-y-3 pt-1 border-t border-white/[0.08]">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-pink-300/70 uppercase tracking-wider font-medium">Signature:</span>
                    <span className="text-pink-200">{cloudNineTemplate?.signature}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {cloudNineTemplate?.supportedModules?.map((mod) => (
                      <span key={mod} className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-pink-500/10 border border-pink-400/20 text-pink-200">
                        {mod}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 flex flex-wrap items-center gap-3">
                  <CurtainLink href="/create?template=cloud-nine">
                    <Button size="lg" variant="primary" className="w-full sm:w-auto bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white border border-pink-400/30">
                      Customize Cloud Nine ☁️
                    </Button>
                  </CurtainLink>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => setActiveCloudNineSealed((s) => !s)}
                    className="w-full sm:w-auto text-xs border-pink-300/30 text-pink-200"
                  >
                    {activeCloudNineSealed ? "Open Cloud Envelope" : "Fold Cloud Envelope"}
                  </Button>
                </div>
              </div>

              {/* Cloud Nine Visual Preview */}
              <div className="lg:col-span-6 flex items-center justify-center p-2 sm:p-4">
                <div className="w-full max-w-sm rounded-2xl bg-white/95 border border-pink-200/60 p-6 sm:p-8 text-center space-y-6 shadow-2xl text-pink-950">
                  <div className="space-y-1">
                    <span className="inline-block text-[10px] uppercase tracking-widest px-3 py-0.5 rounded-full border border-pink-300 bg-pink-50 text-pink-800">
                      To My Sweetest Soul
                    </span>
                    <h3 className="text-2xl font-serif font-medium text-pink-950">Dearest Angel</h3>
                  </div>

                  {activeCloudNineSealed ? (
                    <div className="py-6 flex flex-col items-center justify-center">
                      <button
                        type="button"
                        onClick={() => setActiveCloudNineSealed(false)}
                        className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-200 via-rose-200 to-pink-300 border-2 border-pink-300 flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform"
                        aria-label="Open cloud envelope"
                      >
                        <span className="text-3xl select-none">☁️</span>
                      </button>
                      <span className="mt-3 text-xs uppercase tracking-wider text-pink-700/80">
                        Tap cloud to open
                      </span>
                    </div>
                  ) : (
                    <div className="py-3 px-4 rounded-xl bg-pink-50/80 border border-pink-200 text-left space-y-2 animate-fade-in">
                      <p className="text-xs text-pink-900 leading-relaxed font-light font-display italic">
                        &ldquo;Every moment with you feels like floating high above the clouds, gentle and weightless.&rdquo;
                      </p>
                      <div className="text-right text-[11px] text-pink-700 font-serif">
                        — Forever in the Clouds
                      </div>
                    </div>
                  )}

                  <div className="pt-2 border-t border-pink-200/60 flex items-center justify-between text-xs text-pink-700/80">
                    <span>Celestial Blessing</span>
                    <span>Luminous Sky</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* FEATURED WORLD: KAGE */}
        {featuredWorldId === "kage" && (
          <Card
            id="template-kage"
            variant="glass"
            className="p-6 sm:p-10 border-emerald-500/30 shadow-2xl relative overflow-hidden transition-all duration-500 bg-[#06100E]/95"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-6 space-y-6">
                <div className="flex items-center gap-3">
                  <Badge variant="neutral" size="md" className="bg-emerald-950/80 text-emerald-300 border-emerald-500/40">
                    Visual World · Exact-Source ThreeUI
                  </Badge>
                  <span className="text-xs text-emerald-300/70 font-sans">Version 1.0</span>
                </div>

                <div>
                  <h2 className="text-3xl sm:text-4xl font-serif font-medium text-white mb-2 flex items-center gap-2">
                    <span>{kageTemplate?.name || "Kage"}</span>
                    <span className="text-lg text-emerald-400/60 font-light">(影)</span>
                  </h2>
                  <p className="text-sm font-serif italic text-emerald-300/90 mb-3">
                    &ldquo;{kageTemplate?.tagline || "A Kyoto sanctuary where shadows embrace starlight"}&rdquo;
                  </p>
                  <p className="text-sm text-emerald-100/80 font-light leading-relaxed">
                    {kageTemplate?.description || "A serene Kyoto mountain temple at twilight. Drifting mist, atmospheric light beams, and authored WebGL shaders."}
                  </p>
                </div>

                <div className="space-y-3 pt-1 border-t border-white/[0.08]">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-emerald-300/70 uppercase tracking-wider font-medium">Signature:</span>
                    <span className="text-emerald-200">{kageTemplate?.signature}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {kageTemplate?.supportedModules?.map((mod) => (
                      <span key={mod} className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/30 text-emerald-200">
                        {mod}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 flex flex-wrap items-center gap-3">
                  <CurtainLink href="/create?template=kage">
                    <Button size="lg" variant="primary" className="w-full sm:w-auto bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg shadow-emerald-950/60 border border-emerald-400/30">
                      Customize Kage ⛩️
                    </Button>
                  </CurtainLink>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => setActiveKagePreview((prev) => !prev)}
                    className="w-full sm:w-auto text-xs border-emerald-500/40 text-emerald-300 hover:bg-emerald-950/40"
                  >
                    {activeKagePreview ? "Close WebGL Scene" : "Launch 3D WebGL Preview"}
                  </Button>
                </div>
              </div>

              {/* Kage Live/Interactive Preview */}
              <div className="lg:col-span-6 flex items-center justify-center p-2 sm:p-4">
                {activeKagePreview ? (
                  <div className="w-full h-[360px] rounded-2xl overflow-hidden border border-emerald-500/40 shadow-2xl relative">
                    <KageComponentLazy
                      mode="preview"
                      config={{
                        partnerName: "Aoi",
                        senderName: "Ren",
                        greeting: "Where stillness reveals the unseen",
                        message: "In the quiet shade of the sacred cedar, my thoughts find their home with you.",
                        signOff: "With all my heart",
                        accentTheme: "kyoto-crimson",
                        heroMediaId: null,
                        decor: {
                          paper: "handmade-cream",
                          ribbon: "silk-ivory",
                          waxSeal: "crimson-heart",
                          blooms: ["crimson-rose"],
                          charms: ["sparkle"],
                        },
                      }}
                    />
                    <button
                      onClick={() => setActiveKagePreview(false)}
                      className="absolute top-3 right-3 z-30 px-2.5 py-1 rounded bg-black/70 border border-white/20 text-[11px] text-white hover:bg-black"
                    >
                      ✕ Close
                    </button>
                  </div>
                ) : (
                  <div className="w-full max-w-sm rounded-2xl bg-[#081512]/90 border border-emerald-500/30 p-6 sm:p-8 text-center space-y-6 shadow-2xl backdrop-blur-md text-emerald-100">
                    <div className="space-y-1">
                      <span className="inline-block text-[10px] uppercase tracking-widest px-3 py-0.5 rounded-full border border-emerald-500/40 bg-emerald-950/60 text-emerald-300">
                        Kyoto Mountain Pathway
                      </span>
                      <h3 className="text-2xl font-serif font-medium text-white">Twilight Temple</h3>
                    </div>

                    <div className="py-6 flex flex-col items-center justify-center">
                      <button
                        type="button"
                        onClick={() => setActiveKagePreview(true)}
                        className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-900 via-teal-950 to-black border-2 border-emerald-400/50 flex items-center justify-center shadow-lg shadow-emerald-950/90 hover:scale-105 active:scale-95 transition-transform"
                        aria-label="Launch 3D WebGL preview"
                      >
                        <span className="text-3xl select-none">⛩️</span>
                      </button>
                      <span className="mt-3 text-xs uppercase tracking-wider text-emerald-300/80">
                        Tap to launch WebGL scene
                      </span>
                    </div>

                    <div className="pt-2 border-t border-emerald-500/20 flex items-center justify-between text-xs text-emerald-300/70">
                      <span>Sacred Twilight</span>
                      <span>Three.js Shaders</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>
        )}
      </section>

      {/* ========================================================================= */}
      {/* 4. SECONDARY CURATED WORLDS (Cloud Nine & Kage Side-by-Side Discovery)    */}
      {/* ========================================================================= */}
      <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 pb-16 relative z-10 space-y-6">
        <div className="border-b border-white/[0.08] pb-3 flex items-center justify-between">
          <h2 className="text-xs uppercase tracking-[0.2em] text-ivory-400 font-medium">
            Active Visual Worlds
          </h2>
          <span className="text-xs text-ivory-400">Available to craft today</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Cloud Nine Discovery Card */}
          <Card
            variant="glass"
            className="p-6 sm:p-7 space-y-4 border-pink-300/20 hover:border-pink-300/40 transition-all bg-gradient-to-br from-[#1C1220]/80 to-[#120B16]/80 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Badge variant="rose" size="sm" className="bg-pink-500/20 text-pink-200 border-pink-400/40">
                  {cloudNineTemplate?.availability === "available" ? "Available" : "Available"}
                </Badge>
                <span className="text-xs text-pink-300/60 font-sans">Dreamy Sanctuary</span>
              </div>
              <h3 className="text-2xl font-serif font-medium text-white">
                Cloud Nine
              </h3>
              <p className="text-xs font-serif italic text-pink-300/80">
                &ldquo;{cloudNineTemplate?.tagline}&rdquo;
              </p>
              <p className="text-xs text-pink-100/75 leading-relaxed font-light">
                {cloudNineTemplate?.description}
              </p>
            </div>

            <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => {
                  setFeaturedWorldId("cloud-nine");
                  document.getElementById("template-cloud-nine")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="text-xs text-pink-300 hover:text-white transition-colors underline underline-offset-4"
              >
                Preview in Stage
              </button>
              <CurtainLink href="/create?template=cloud-nine">
                <Button size="sm" variant="primary" className="text-xs px-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white border border-pink-400/30">
                  Customize Cloud Nine ☁️
                </Button>
              </CurtainLink>
            </div>
          </Card>

          {/* Kage Discovery Card */}
          <Card
            variant="glass"
            className="p-6 sm:p-7 space-y-4 border-emerald-500/20 hover:border-emerald-500/40 transition-all bg-[#06100E]/80 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Badge variant="neutral" size="sm" className="bg-emerald-950/70 text-emerald-300 border-emerald-500/40">
                  {kageTemplate?.availability === "experimental" ? "Experimental" : "Available"}
                </Badge>
                <span className="text-xs text-emerald-300/60 font-sans">ThreeUI World</span>
              </div>
              <h3 className="text-2xl font-serif font-medium text-white flex items-center gap-2">
                <span>Kage</span>
                <span className="text-base text-emerald-400/60 font-light">(影)</span>
              </h3>
              <p className="text-xs font-serif italic text-emerald-300/80">
                &ldquo;{kageTemplate?.tagline}&rdquo;
              </p>
              <p className="text-xs text-emerald-100/75 leading-relaxed font-light">
                {kageTemplate?.description}
              </p>
            </div>

            <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => {
                  setFeaturedWorldId("kage");
                  document.getElementById("template-kage")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="text-xs text-emerald-300 hover:text-white transition-colors underline underline-offset-4"
              >
                Preview in Stage
              </button>
              <CurtainLink href="/create?template=kage">
                <Button size="sm" variant="primary" className="text-xs px-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white border border-emerald-400/30">
                  Customize Kage ⛩️
                </Button>
              </CurtainLink>
            </div>
          </Card>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. FUTURE ROADMAP WORLDS (Truthful Coming-Soon Showcase)                  */}
      {/* ========================================================================= */}
      <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 pb-24 relative z-10 space-y-6">
        <div className="border-b border-white/[0.08] pb-3 flex items-center justify-between">
          <h2 className="text-xs uppercase tracking-[0.2em] text-ivory-400 font-medium">
            In The Studio · Coming Soon
          </h2>
          <span className="text-xs text-ivory-400">Design pipeline</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ROADMAP_WORLDS.map((world: RoadmapWorld) => (
            <Card
              key={world.id}
              variant="glass"
              className="p-6 space-y-3.5 opacity-80 hover:opacity-100 transition-opacity border-white/[0.06] flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Badge variant="gold" size="sm">
                    Coming Soon
                  </Badge>
                  <span className="text-[11px] text-ivory-400">{world.category}</span>
                </div>
                <h3 className="text-xl font-serif font-medium text-white">{world.name}</h3>
                <p className="text-xs font-serif italic text-amber-200/80">
                  &ldquo;{world.tagline}&rdquo;
                </p>
                <p className="text-xs text-ivory-300/70 font-light leading-relaxed">
                  {world.atmosphere}
                </p>
              </div>

              <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs text-ivory-400">
                <span>{world.signature}</span>
                <span className="italic">In Design</span>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. Footer (Valentino Neutral Core Shell)                                  */}
      {/* ========================================================================= */}
      <footer className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-10 border-t border-white/[0.08] flex items-center justify-between text-xs text-ivory-400 relative z-10">
        <CurtainLink href="/" className="hover:text-white transition-colors">
          ← Back to Home
        </CurtainLink>
        <span>Valentino Interactive Experience Studio · 2026</span>
      </footer>
    </main>
  );
}
