"use client";

import React, { useState, useEffect, useRef } from "react";
import { MidnightRosePublishedConfig } from "./schema";
import { RenderMode } from "../../types";
import { MediaSlot } from "../../shared/MediaSlot";
import { Envelope3D } from "../../shared/Envelope3D";
import { resolveTemplateDecor } from "../../shared/compatibility";
import { ModulesRenderer } from "@/modules/ModulesRenderer";

interface ComponentProps {
  config: MidnightRosePublishedConfig;
  mode: RenderMode;
  publicId?: string;
}


const ACCENT_STYLES = {
  "crimson-rose": {
    glow: "from-rose-600/30 via-pink-600/15 to-transparent",
    border: "border-rose-500/30",
    badge: "text-rose-200 bg-rose-950/70 border-rose-500/40",
    accentText: "text-rose-700",
    divider: "from-transparent via-rose-500/30 to-transparent",
    horizonGlow: "bg-rose-900/20",
    musicBtn: "bg-rose-950/60 text-rose-200 border-rose-500/40 hover:bg-rose-900/70",
  },
  "midnight-violet": {
    glow: "from-purple-600/30 via-indigo-600/15 to-transparent",
    border: "border-purple-500/30",
    badge: "text-purple-200 bg-purple-950/70 border-purple-500/40",
    accentText: "text-purple-700",
    divider: "from-transparent via-purple-500/30 to-transparent",
    horizonGlow: "bg-purple-900/20",
    musicBtn: "bg-purple-950/60 text-purple-200 border-purple-500/40 hover:bg-purple-900/70",
  },
  "champagne-gold": {
    glow: "from-amber-600/30 via-yellow-600/15 to-transparent",
    border: "border-amber-500/30",
    badge: "text-amber-200 bg-amber-950/70 border-amber-500/40",
    accentText: "text-amber-700",
    divider: "from-transparent via-amber-500/30 to-transparent",
    horizonGlow: "bg-amber-900/20",
    musicBtn: "bg-amber-950/60 text-amber-200 border-amber-500/40 hover:bg-amber-900/70",
  },
};

export const MidnightRoseComponent: React.FC<ComponentProps> = ({ config, mode, publicId }) => {

  const [isSealed, setIsSealed] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorNodesRef = useRef<OscillatorNode[]>([]);
  const gainNodeRef = useRef<GainNode | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(mediaQuery.matches);
      if (mediaQuery.matches) {
        setIsSealed(false);
      }

      const listener = (e: MediaQueryListEvent) => {
        setPrefersReducedMotion(e.matches);
        if (e.matches) setIsSealed(false);
      };
      mediaQuery.addEventListener("change", listener);
      return () => mediaQuery.removeEventListener("change", listener);
    }
  }, []);

  // Graceful cleanup of Web Audio on unmount
  useEffect(() => {
    return () => {
      if (audioContextRef.current && audioContextRef.current.state !== "closed") {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, []);

  // Minimal romantic harmonic tone generator (autoplay safe, stops on toggle)
  const toggleRomanticSoundscape = () => {
    if (isPlayingMusic) {
      if (gainNodeRef.current && audioContextRef.current) {
        gainNodeRef.current.gain.linearRampToValueAtTime(0, audioContextRef.current.currentTime + 0.5);
        setTimeout(() => {
          oscillatorNodesRef.current.forEach((osc) => {
            try {
              osc.stop();
              osc.disconnect();
            } catch {}
          });
          oscillatorNodesRef.current = [];
          setIsPlayingMusic(false);
        }, 500);
      } else {
        setIsPlayingMusic(false);
      }
      return;
    }

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;

      const ctx = audioContextRef.current || new AudioCtx();
      audioContextRef.current = ctx;

      if (ctx.state === "suspended") {
        ctx.resume();
      }

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
      masterGain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 1.2);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Romantic chord: C# minor / F# warm frequencies (220Hz, 277.18Hz, 329.63Hz)
      const freqs = [220, 277.18, 329.63];
      const oscs: OscillatorNode[] = [];

      freqs.forEach((freq) => {
        const osc = ctx.createOscillator();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        osc.connect(masterGain);
        osc.start();
        oscs.push(osc);
      });

      oscillatorNodesRef.current = oscs;
      setIsPlayingMusic(true);
    } catch {
      // Audio context failure should never disrupt the experience
      setIsPlayingMusic(false);
    }
  };

  const styles = ACCENT_STYLES[config.accentTheme] || ACCENT_STYLES["crimson-rose"];

  // Pure presentation resolution mapping canonical decor to Midnight Rose flagship treatments
  const presentation = resolveTemplateDecor(config.decor, "midnight-rose");
  const { paper, ribbon, waxSeal, blooms, charms } = presentation;

  return (
    <div
      data-testid="experience-container"
      data-decor-paper={paper.id}
      data-decor-ribbon={ribbon.id}
      data-decor-seal={waxSeal.id}
      className="relative min-h-[100dvh] w-full bg-[#0D0207] text-[#FAF8F5] overflow-x-hidden flex flex-col items-center justify-between p-4 sm:p-8 selection:bg-rose-500/30"
      style={{ overflowWrap: "anywhere" }}
    >
      {/* Subtle Starlight and Ambient Candlelight Warmth Background */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 bg-gradient-to-b ${styles.glow} opacity-60 blur-3xl`}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_50%_25%,rgba(244,63,94,0.18)_0%,transparent_60%)]"
      />

      {/* Top Ambient Navigation / Controls Bar */}
      <div className="relative z-30 w-full max-w-2xl mx-auto flex items-center justify-between py-2 mb-4">
        {mode === "preview" ? (
          <div className="px-3.5 py-1 rounded-full text-[10px] tracking-widest uppercase bg-rose-950/80 text-rose-200 border border-rose-500/30 backdrop-blur-md shadow-sm">
            Live Preview
          </div>
        ) : (
          <div className="text-[10px] tracking-[0.25em] uppercase text-rose-200/50 font-sans">
            Private Correspondence
          </div>
        )}

        {/* Minimal Non-Blocking "♡ OUR SONG" Ambient Audio Control */}
        <button
          type="button"
          id="soundtrack-toggle"
          onClick={toggleRomanticSoundscape}
          className={`flex items-center gap-2 px-3.5 py-1 rounded-full text-[10px] tracking-widest uppercase font-sans border backdrop-blur-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-rose-400/80 ${styles.musicBtn}`}
          aria-label={isPlayingMusic ? "Mute romantic soundtrack" : "Play romantic soundtrack"}
        >
          <span
            className={`inline-block transition-transform duration-300 ${
              isPlayingMusic ? "scale-110 text-rose-400 animate-pulse" : "opacity-70"
            }`}
          >
            ♡
          </span>
          <span>Our Song</span>
          {isPlayingMusic && (
            <span className="inline-flex gap-0.5 items-end h-2.5">
              <span className="w-0.5 h-2 bg-rose-400 animate-[bounce_1s_infinite_100ms]" />
              <span className="w-0.5 h-3 bg-rose-300 animate-[bounce_1s_infinite_300ms]" />
              <span className="w-0.5 h-1.5 bg-rose-400 animate-[bounce_1s_infinite_200ms]" />
            </span>
          )}
        </button>
      </div>

      {/* Main Narrative Stage */}
      <div className="relative z-10 w-full max-w-lg mx-auto flex flex-col items-center my-auto">
        {/* Cinematic Arrival: Recipient Greeting Focal Header */}
        <div className="text-center mb-7 sm:mb-9 transition-all duration-700">
          <span
            className={`inline-block text-[11px] uppercase tracking-widest px-4 py-1 rounded-full border mb-3 shadow-sm backdrop-blur-sm ${styles.badge}`}
          >
            {config.greeting || "To My Favorite Person"}
          </span>
          <h1
            data-testid="recipient-name"
            className="text-3xl sm:text-4xl font-serif font-medium text-[#FAF8F5] tracking-wide leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]"
          >
            {config.partnerName || "Dearest"}
          </h1>
        </div>

        {/* Outer composition container holding bouquet and envelope */}
        <div className="relative w-full">
          {/* Surrounding Digital Bouquet Blooms & Charms */}
          <div className="absolute top-[75px] sm:top-[85px] inset-x-0 h-0 pointer-events-none z-20 flex items-center justify-center">
            {blooms.map((bloom, index) => (
              <div
                key={`bloom-${bloom.option.id}-${index}`}
                data-decor-bloom={bloom.option.id}
                style={{
                  transform: `translate(${bloom.slot.x}px, ${bloom.slot.y}px) rotate(${bloom.slot.rotate}deg) scale(${bloom.slot.scale})`,
                  zIndex: bloom.slot.zIndex,
                }}
                className={`absolute flex items-center justify-center transition-all duration-700 ease-out ${bloom.filterClass || ""}`}
              >
                <span className="text-3xl sm:text-4xl select-none filter drop-shadow-md">
                  {bloom.option.emoji}
                </span>
              </div>
            ))}

            {charms.map((charm, index) => (
              <div
                key={`charm-${charm.option.id}-${index}`}
                data-decor-charm={charm.option.id}
                style={{
                  transform: `translate(${charm.pos.x}px, ${charm.pos.y}px)`,
                }}
                className="absolute flex items-center justify-center filter drop-shadow-[0_4px_12px_rgba(244,63,94,0.45)] z-25"
              >
                <span className="text-xl sm:text-2xl select-none">{charm.option.emoji}</span>
              </div>
            ))}
          </div>

          {/* Envelope & Letter Experience Primitive */}
          <Envelope3D
            isSealed={isSealed}
            onUnseal={() => setIsSealed(false)}
            sealEmblem={waxSeal.emblem}
            sealGradientClass={waxSeal.gradientClass}
            sealBorderClass={waxSeal.borderClass}
            sealHaloClass={waxSeal.haloClass}
            sealBezelClass={waxSeal.bezelClass}
            sealId={waxSeal.id}
            ribbonGradientClass={ribbon.gradientClass}
            ribbonStitchClass={ribbon.stitchClass}
            ribbonId={ribbon.id}
            ribbonTextLeft="SEALED"
            ribbonTextRight="WITH DEVOTION"
            paperId={paper.id}
            envelopeBgClass="bg-[#180410]/95"
            envelopeBorderClass={styles.border}
          >
            {/* Unfolded Stationery Content */}
            <div className="space-y-6">
              {/* Tactile Paper Card Stationery */}
              <div
                data-decor-paper={paper.id}
                className={`relative rounded-2xl ${paper.bgClass} ${paper.textClass} p-7 sm:p-9 border ${paper.borderClass} shadow-[0_15px_35px_-10px_rgba(0,0,0,0.35)] overflow-hidden transition-all duration-500`}
              >
                {/* Subtle paper grain texture */}
                <div
                  className={`absolute inset-0 opacity-[0.04] pointer-events-none ${paper.ambientTextureClass || ""}`}
                  aria-hidden="true"
                />

                {/* Gold foil rim accent */}
                <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent" />

                {/* Love Letter Message */}
                <div
                  data-testid="letter-message"
                  className="whitespace-pre-wrap font-serif font-normal text-base sm:text-lg leading-relaxed relative z-10"
                >
                  {config.message || "My heart is fuller every day because of you."}
                </div>

                {/* Sign-off within the letter */}
                <div className="text-right pt-6 mt-6 border-t border-black/10 relative z-10">
                  <p className="text-[11px] opacity-70 uppercase tracking-widest mb-1 font-sans font-medium">
                    {config.signOff || "With all my love"}
                  </p>
                  <p
                    data-testid="sender-name"
                    className={`text-2xl sm:text-3xl font-serif font-medium ${styles.accentText}`}
                  >
                    {config.senderName || "Yours Always"}
                  </p>
                </div>
              </div>

              {/* Memory / Hero Media Display (Polaroid / Editorial Framed Keepsake) */}
              {config.heroMediaId && (
                <div className="pt-2">
                  <div className="relative mx-auto max-w-xs sm:max-w-sm rounded-2xl bg-[#FAF8F5] p-3 sm:p-4 text-stone-800 shadow-[0_18px_40px_rgba(0,0,0,0.6)] border border-white/80 rotate-[-1deg] hover:rotate-0 transition-transform duration-500 group">
                    <div className="aspect-[4/3] w-full overflow-hidden rounded-lg bg-stone-100 shadow-inner">
                      <MediaSlot
                        media={
                          config.heroMediaId.startsWith("http") || config.heroMediaId.startsWith("/")
                            ? { url: config.heroMediaId, altText: "Cherished Moment" }
                            : null
                        }
                        fallbackText="A Treasured Memory"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="pt-3 pb-1 text-center">
                      <span className="font-serif italic text-xs sm:text-sm text-stone-600 tracking-wide">
                        A memory kept forever close
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Interactive Experience Modules */}
              {config.modules && (
                <div className="pt-2">
                  <ModulesRenderer
                    modules={config.modules}
                    moduleOrder={config.moduleOrder}
                    mode={mode}
                    publicId={publicId}
                    theme={config.accentTheme || "crimson-rose"}
                  />
                </div>
              )}

              {/* Closing Scene & Replay Affordance */}
              <div className="pt-6 border-t border-white/10 flex flex-col items-center justify-center text-center space-y-4">

                <div className={`w-full h-px bg-gradient-to-r ${styles.divider}`} />

                <div className="flex items-center gap-2 text-xs text-rose-200/60 font-sans tracking-widest uppercase">
                  <span>✦</span>
                  <span>Midnight Rose Keepsake</span>
                  <span>✦</span>
                </div>

                {/* Replay Affordance */}
                <button
                  type="button"
                  data-testid="reseal-button"
                  onClick={() => setIsSealed(true)}
                  className="px-4 py-1.5 rounded-full text-xs font-sans tracking-wider uppercase text-rose-200/80 bg-rose-950/50 hover:bg-rose-900/60 border border-rose-500/30 hover:border-rose-400/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-rose-400/70 cursor-pointer"
                  aria-label="Seal & Read Again"
                >
                  Seal & Read Again
                </button>
              </div>
            </div>
          </Envelope3D>
        </div>
      </div>

      {/* Footer Horizon Subtle Ambience */}
      <footer className="relative z-20 w-full py-4 text-center text-[11px] text-rose-200/40 font-sans tracking-widest">
        <span>VALENTINO</span>
        <span className="mx-2">·</span>
        <span>MIDNIGHT ROSE</span>
      </footer>
    </div>
  );
};

