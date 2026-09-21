"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ValentinePlasmaButton,
  type ValentinePlasmaTheme,
  VALENTINE_PLASMA_THEMES,
} from "@/components/ui/ValentinePlasmaButton";
import { ShaderButtons } from "@/shaders/ShaderButtons";

export default function PlasmaShowcasePage() {
  const [activeTheme, setActiveTheme] = useState<ValentinePlasmaTheme>("valentine");
  const [clickCount, setClickCount] = useState(0);
  const [lastAction, setLastAction] = useState<string>("Ready");
  const [customHue, setCustomHue] = useState<number>(118);
  const [customSaturation, setCustomSaturation] = useState<number>(1.05);
  const [customBrightness, setCustomBrightness] = useState<number>(1.08);
  const [customMode, setCustomMode] = useState<"light" | "dark">("dark");
  const [useCustomParams, setUseCustomParams] = useState(false);

  const currentConfig = VALENTINE_PLASMA_THEMES[activeTheme];

  const handleButtonClick = () => {
    setClickCount((c) => c + 1);
    setLastAction(`Activated at ${new Date().toLocaleTimeString()}`);
  };

  return (
    <main className="min-h-screen bg-[#0C0207] text-[#FAF8F5] px-4 py-12 flex flex-col items-center justify-start selection:bg-rose-500/30 overflow-x-hidden">
      {/* Background Subtle Gradient */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none opacity-40"
        style={{
          background:
            "radial-gradient(circle at 50% 20%, rgba(244,63,94,0.15) 0%, rgba(139,92,246,0.08) 40%, transparent 70%)",
        }}
      />

      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center text-center space-y-10">
        {/* Navigation & Breadcrumb */}
        <div className="w-full flex items-center justify-between border-b border-rose-500/20 pb-4">
          <Link
            href="/"
            className="text-xs font-mono uppercase tracking-widest text-rose-300 hover:text-rose-100 transition-colors"
          >
            ← Back to Valentino
          </Link>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
            <span className="text-xs font-mono tracking-wider text-rose-200/60">
              Visual Primitive Gate
            </span>
          </div>
          <Link
            href="/templates"
            className="text-xs font-mono uppercase tracking-widest text-rose-300 hover:text-rose-100 transition-colors"
          >
            Templates Gallery →
          </Link>
        </div>

        {/* Hero Section */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/60 border border-rose-500/30 text-xs font-mono text-rose-300">
            <span>ThreeUI Exact-Source</span>
            <span className="text-rose-500">•</span>
            <span>plasma-button</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-serif font-light tracking-tight text-white">
            Valentine Plasma
          </h1>
          <p className="text-sm md:text-base text-rose-200/70 max-w-lg mx-auto font-light leading-relaxed">
            Soft romantic baby-pink, rose, lavender & plum color adaptation of the
            official ThreeUI WebGL plasma shader.
          </p>
        </div>

        {/* Primary Interactive Primitive Display */}
        <section
          id="primary-plasma-section"
          className="w-full p-8 md:p-12 rounded-3xl bg-gradient-to-b from-rose-950/20 to-black/40 border border-rose-500/20 backdrop-blur-md flex flex-col items-center justify-center space-y-8 shadow-2xl shadow-rose-950/30"
        >
          <div className="text-xs font-mono text-rose-200/50 uppercase tracking-widest">
            Interactive Showcase Instance
          </div>

          {/* THE VALENTINE PLASMA BUTTON */}
          <div className="py-4">
            <ValentinePlasmaButton
              id="test-valentine-plasma-btn"
              theme={activeTheme}
              label={activeTheme === "valentine" ? "SURPRISE ME" : `${activeTheme.toUpperCase()}`}
              sublabel="Spark of Desire"
              size="lg"
              onClick={handleButtonClick}
              hue={useCustomParams ? customHue : undefined}
              saturation={useCustomParams ? customSaturation : undefined}
              brightness={useCustomParams ? customBrightness : undefined}
              mode={useCustomParams ? customMode : undefined}
            />
          </div>

          {/* Feedback badge */}
          <div className="flex items-center gap-4 text-xs font-mono text-rose-300/80 bg-rose-950/40 px-4 py-2 rounded-xl border border-rose-500/20">
            <span>Interactions: <strong className="text-white">{clickCount}</strong></span>
            <span>•</span>
            <span id="plasma-status-text">{lastAction}</span>
          </div>

          {/* Theme Selector Pill Bar */}
          <div className="w-full max-w-lg flex flex-wrap items-center justify-center gap-2 pt-2">
            {(
              [
                ["valentine", "Baby Pink / Rose"],
                ["midnightRose", "Midnight Rose"],
                ["cloudNine", "Cloud Nine"],
                ["goldenHour", "Golden Hour"],
                ["stardust", "Stardust"],
              ] as const
            ).map(([tKey, tLabel]) => (
              <button
                key={tKey}
                type="button"
                onClick={() => {
                  setActiveTheme(tKey);
                  setUseCustomParams(false);
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all ${
                  activeTheme === tKey && !useCustomParams
                    ? "bg-rose-500 text-white shadow-lg shadow-rose-500/30 border-rose-400"
                    : "bg-rose-950/40 text-rose-200/60 hover:text-white border-rose-500/20"
                } border`}
              >
                {tLabel}
              </button>
            ))}
          </div>
        </section>

        {/* Live Parameter Inspector (Color Verification) */}
        <section className="w-full p-6 md:p-8 rounded-2xl bg-black/40 border border-rose-500/15 text-left space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-rose-500/10 pb-4">
            <div>
              <h2 className="text-base font-medium text-white">
                Live Parameter Adaptation (Shader Filter)
              </h2>
              <p className="text-xs text-rose-200/50 mt-1">
                Verify how hue, saturation, brightness, and mode alter the authored shader.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setUseCustomParams(!useCustomParams)}
              className={`text-xs font-mono px-3 py-1 rounded-lg border transition-colors ${
                useCustomParams
                  ? "bg-rose-600 border-rose-400 text-white"
                  : "bg-rose-950/30 border-rose-500/30 text-rose-300"
              }`}
            >
              {useCustomParams ? "Custom Overrides Active" : "Enable Custom Sliders"}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-mono">
            {/* Hue */}
            <div className="space-y-2">
              <div className="flex justify-between text-rose-200/70">
                <span>Hue Rotation</span>
                <span className="text-white font-bold">
                  {useCustomParams ? `${customHue}°` : `${currentConfig.hue}°`}
                </span>
              </div>
              <input
                type="range"
                min="-180"
                max="180"
                step="1"
                disabled={!useCustomParams}
                value={useCustomParams ? customHue : currentConfig.hue}
                onChange={(e) => setCustomHue(Number(e.target.value))}
                className="w-full accent-rose-500 cursor-pointer disabled:opacity-50"
              />
              <div className="text-[10px] text-rose-200/40">
                Target: +118° shifts laboratory blue to Valentine baby-pink & lavender.
              </div>
            </div>

            {/* Saturation */}
            <div className="space-y-2">
              <div className="flex justify-between text-rose-200/70">
                <span>Saturation</span>
                <span className="text-white font-bold">
                  {useCustomParams
                    ? customSaturation.toFixed(2)
                    : currentConfig.saturation.toFixed(2)}
                </span>
              </div>
              <input
                type="range"
                min="0.5"
                max="1.8"
                step="0.05"
                disabled={!useCustomParams}
                value={useCustomParams ? customSaturation : currentConfig.saturation}
                onChange={(e) => setCustomSaturation(Number(e.target.value))}
                className="w-full accent-rose-500 cursor-pointer disabled:opacity-50"
              />
              <div className="text-[10px] text-rose-200/40">
                Maintains rich organic plasma filaments without clipping.
              </div>
            </div>

            {/* Brightness */}
            <div className="space-y-2">
              <div className="flex justify-between text-rose-200/70">
                <span>Brightness</span>
                <span className="text-white font-bold">
                  {useCustomParams
                    ? customBrightness.toFixed(2)
                    : currentConfig.brightness.toFixed(2)}
                </span>
              </div>
              <input
                type="range"
                min="0.6"
                max="1.5"
                step="0.02"
                disabled={!useCustomParams}
                value={useCustomParams ? customBrightness : currentConfig.brightness}
                onChange={(e) => setCustomBrightness(Number(e.target.value))}
                className="w-full accent-rose-500 cursor-pointer disabled:opacity-50"
              />
              <div className="text-[10px] text-rose-200/40">
                Luminous high-dynamic-range core illumination.
              </div>
            </div>
          </div>
        </section>

        {/* Sizing & States Matrix */}
        <section className="w-full p-6 md:p-8 rounded-2xl bg-black/40 border border-rose-500/15 text-left space-y-6">
          <h2 className="text-base font-medium text-white">Sizing & States Matrix</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center justify-items-center pt-2">
            <div className="flex flex-col items-center gap-3">
              <span className="text-xs font-mono text-rose-200/60">Small (220×62)</span>
              <ValentinePlasmaButton
                size="sm"
                label="MAKE A WISH"
                theme="cloudNine"
                onClick={() => setLastAction("Clicked Small (Make a Wish)")}
              />
            </div>

            <div className="flex flex-col items-center gap-3">
              <span className="text-xs font-mono text-rose-200/60">Medium (260×74) - Default</span>
              <ValentinePlasmaButton
                size="md"
                label="REVEAL SECRET"
                theme="valentine"
                onClick={() => setLastAction("Clicked Medium (Reveal Secret)")}
              />
            </div>

            <div className="flex flex-col items-center gap-3">
              <span className="text-xs font-mono text-rose-200/60">Disabled State</span>
              <ValentinePlasmaButton
                size="sm"
                label="LOCKED LETTER"
                theme="midnightRose"
                disabled
              />
            </div>
          </div>
        </section>

        {/* Direct Raw ThreeUI Component Comparison */}
        <section className="w-full p-6 md:p-8 rounded-2xl bg-black/40 border border-rose-500/15 text-left space-y-4">
          <div className="border-b border-rose-500/10 pb-3">
            <h2 className="text-base font-medium text-white">
              Raw ThreeUI ShaderButtons (&apos;plasma-button&apos;)
            </h2>
            <p className="text-xs text-rose-200/50 mt-1">
              Direct usage of the ThreeUI component API without outer adapter styling:
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-around gap-8 pt-4">
            {/* Original ThreeUI (Blue Lab baseline) */}
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs font-mono text-cyan-400/80">
                Original ThreeUI (hue=0, deep blue lab)
              </span>
              <div className="w-[260px] h-[74px] rounded-2xl overflow-hidden border border-cyan-500/30">
                <ShaderButtons
                  variant="plasma-button"
                  mode="dark"
                  hue={0}
                  saturation={1.0}
                  brightness={1.0}
                />
              </div>
            </div>

            {/* Valentino Color Adapted */}
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs font-mono text-rose-300">
                Valentine Adapted (hue=118, baby-pink/lavender)
              </span>
              <div className="w-[260px] h-[74px] rounded-2xl overflow-hidden border border-rose-500/40 shadow-lg shadow-rose-950/40">
                <ShaderButtons
                  variant="plasma-button"
                  mode="dark"
                  hue={118}
                  saturation={1.05}
                  brightness={1.08}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
