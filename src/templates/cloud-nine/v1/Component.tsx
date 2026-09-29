"use client";

import React, { useState, useEffect, useRef } from "react";
import { CloudNinePublishedConfig } from "./schema";
import { RenderMode } from "../../types";
import { MediaSlot } from "../../shared/MediaSlot";
import { Envelope3D } from "../../shared/Envelope3D";
import { resolveTemplateDecor } from "../../shared/compatibility";
import { ModulesRenderer } from "@/modules/ModulesRenderer";

interface ComponentProps {
  config: CloudNinePublishedConfig;
  mode: RenderMode;
  publicId?: string;
}


const THEME_STYLES = {
  "blush-sky": {
    glow: "from-pink-300/35 via-sky-200/25 to-transparent",
    border: "border-pink-200/70",
    cardBg: "bg-white/85",
    badge: "text-pink-900 bg-pink-100/90 border-pink-300/60",
    accentText: "text-pink-700",
    divider: "from-transparent via-pink-400/40 to-transparent",
    musicBtn: "bg-white/80 text-pink-900 border-pink-200 hover:bg-pink-50",
    starBg: "bg-pink-100/90 text-pink-800 border-pink-300/60",
  },
  "peach-sorbet": {
    glow: "from-amber-200/40 via-rose-200/30 to-transparent",
    border: "border-amber-200/70",
    cardBg: "bg-white/85",
    badge: "text-amber-900 bg-amber-100/90 border-amber-300/60",
    accentText: "text-amber-800",
    divider: "from-transparent via-amber-400/40 to-transparent",
    musicBtn: "bg-white/80 text-amber-900 border-amber-200 hover:bg-amber-50",
    starBg: "bg-amber-100/90 text-amber-800 border-amber-300/60",
  },
  "lavender-mist": {
    glow: "from-purple-200/35 via-indigo-100/25 to-transparent",
    border: "border-purple-200/70",
    cardBg: "bg-white/85",
    badge: "text-purple-900 bg-purple-100/90 border-purple-300/60",
    accentText: "text-purple-700",
    divider: "from-transparent via-purple-400/40 to-transparent",
    musicBtn: "bg-white/80 text-purple-900 border-purple-200 hover:bg-purple-50",
    starBg: "bg-purple-100/90 text-purple-800 border-purple-300/60",
  },
};

export const CloudNineComponent: React.FC<ComponentProps> = ({ config, mode, publicId }) => {

  const [isSealed, setIsSealed] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [hasReleasedWish, setHasReleasedWish] = useState(false);
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

  // Soft airy celestial chime generator
  const toggleRomanticSoundscape = () => {
    if (isPlayingMusic) {
      if (gainNodeRef.current && audioContextRef.current) {
        gainNodeRef.current.gain.linearRampToValueAtTime(0, audioContextRef.current.currentTime + 0.4);
        setTimeout(() => {
          oscillatorNodesRef.current.forEach((osc) => {
            try {
              osc.stop();
              osc.disconnect();
            } catch {}
          });
          oscillatorNodesRef.current = [];
          setIsPlayingMusic(false);
        }, 400);
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
      masterGain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 1.2);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Celestial A Major 9th chord (airy, light, joyful frequencies)
      const freqs = [440, 554.37, 659.25, 830.61];
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
      setIsPlayingMusic(false);
    }
  };

  const styles = THEME_STYLES[config.accentTheme] || THEME_STYLES["blush-sky"];

  // Pure presentation resolution mapping canonical decor to Cloud Nine treatments
  const presentation = resolveTemplateDecor(config.decor, "cloud-nine");
  const { paper, ribbon, waxSeal, blooms, charms } = presentation;

  return (
    <div
      data-testid="experience-container"
      data-decor-paper={paper.id}
      data-decor-ribbon={ribbon.id}
      data-decor-seal={waxSeal.id}
      className="relative min-h-[100dvh] w-full bg-[#FFF5F7] text-[#4A1D2F] overflow-x-hidden flex flex-col items-center justify-between p-4 sm:p-8 selection:bg-pink-300/40"
      style={{ overflowWrap: "anywhere" }}
    >
      {/* Soft Luminous Cloudscape & Pastel Atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_15%,rgba(251,207,232,0.7)_0%,rgba(240,249,255,0.5)_50%,#FFF5F7_100%)]"
      />
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 bg-gradient-to-b ${styles.glow} opacity-60 blur-3xl`}
      />

      {/* Floating Cloud Silhouettes in Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-12 -left-20 w-80 h-36 bg-white/40 rounded-full blur-2xl animate-[pulse_6s_ease-in-out_infinite]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-48 -right-24 w-96 h-44 bg-pink-200/30 rounded-full blur-3xl animate-[pulse_8s_ease-in-out_infinite]"
      />

      {/* Top Ambient Navigation / Controls Bar */}
      <div className="relative z-30 w-full max-w-2xl mx-auto flex items-center justify-between py-2 mb-4">
        {mode === "preview" ? (
          <div className="px-3.5 py-1 rounded-full text-[10px] tracking-widest uppercase bg-pink-100/90 text-pink-900 border border-pink-300/50 backdrop-blur-md shadow-sm">
            Live Preview · Cloud Nine
          </div>
        ) : (
          <div className="text-[10px] tracking-[0.25em] uppercase text-pink-800/60 font-sans">
            Celestial Love Letter
          </div>
        )}

        {/* Minimal Non-Blocking "♡ OUR SONG" Ambient Audio Control */}
        <button
          type="button"
          id="soundtrack-toggle"
          onClick={toggleRomanticSoundscape}
          className={`flex items-center gap-2 px-3.5 py-1 rounded-full text-[10px] tracking-widest uppercase font-sans border backdrop-blur-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-400/80 shadow-sm ${styles.musicBtn}`}
          aria-label={isPlayingMusic ? "Mute romantic soundtrack" : "Play romantic soundtrack"}
        >
          <span
            className={`inline-block transition-transform duration-300 ${
              isPlayingMusic ? "scale-110 text-pink-600 animate-pulse" : "opacity-70"
            }`}
          >
            ♡
          </span>
          <span>Our Song</span>
          {isPlayingMusic && (
            <span className="inline-flex gap-0.5 items-end h-2.5">
              <span className="w-0.5 h-2 bg-pink-500 animate-[bounce_1s_infinite_100ms]" />
              <span className="w-0.5 h-3 bg-rose-400 animate-[bounce_1s_infinite_300ms]" />
              <span className="w-0.5 h-1.5 bg-pink-500 animate-[bounce_1s_infinite_200ms]" />
            </span>
          )}
        </button>
      </div>

      {/* Main Narrative Stage */}
      <div className="relative z-10 w-full max-w-lg mx-auto flex flex-col items-center my-auto">
        {/* Dreamy Arrival: Recipient Greeting Header */}
        <div className="text-center mb-7 sm:mb-9 transition-all duration-700">
          <span
            className={`inline-block text-[11px] uppercase tracking-widest px-4 py-1 rounded-full border mb-3 shadow-sm backdrop-blur-sm ${styles.badge}`}
          >
            {config.greeting || "To My Sweetest Soul"}
          </span>
          <h1
            data-testid="recipient-name"
            className="text-3xl sm:text-4xl font-serif font-medium text-[#4A1D2F] tracking-wide leading-tight drop-shadow-sm"
          >
            {config.partnerName || "Dearest"}
          </h1>
        </div>

        {/* Outer composition container holding bouquet and envelope */}
        <div className="relative w-full">
          {/* Surrounding Digital Bouquet Blooms & Charms (anchored to header) */}
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
                className="absolute flex items-center justify-center filter drop-shadow-[0_4px_12px_rgba(244,114,182,0.35)] z-25"
              >
                <span className="text-xl sm:text-2xl select-none">{charm.option.emoji}</span>
              </div>
            ))}
          </div>

          {/* Cloud Nine Pastel Envelope Primitive */}
          <Envelope3D
            isSealed={isSealed}
            onUnseal={() => setIsSealed(false)}
            sealEmblem={waxSeal.emblem || "☁️"}
            sealGradientClass="from-pink-200 via-rose-300 to-pink-400"
            sealBorderClass="border-pink-300/90"
            sealHaloClass={waxSeal.haloClass || "bg-pink-300/40"}
            sealBezelClass={waxSeal.bezelClass || "border-white/60 bg-white/40"}
            sealId={waxSeal.id}
            ribbonGradientClass="from-pink-300 via-rose-300 to-pink-400"
            ribbonStitchClass="bg-white/80"
            ribbonId={ribbon.id}
            ribbonTextLeft="HEAVEN SENT"
            ribbonTextRight="IN THE CLOUDS"
            paperId={paper.id}
            envelopeBgClass="bg-white/90"
            envelopeBorderClass={styles.border}
          >
            {/* Unfolded Stationery Content */}
            <div className="space-y-6">
              {/* Tactile Pastel Paper Card Stationery */}
              <div
                data-decor-paper={paper.id}
                className={`relative rounded-2xl ${paper.bgClass} ${paper.textClass} p-7 sm:p-9 border ${paper.borderClass} shadow-[0_15px_40px_-10px_rgba(244,114,182,0.25)] overflow-hidden transition-all duration-500`}
              >
                {/* Subtle paper grain texture */}
                <div
                  className={`absolute inset-0 opacity-[0.05] pointer-events-none ${paper.ambientTextureClass || ""}`}
                  aria-hidden="true"
                />

                {/* Celestial pink/gold rim accent on top */}
                <div className="absolute top-0 inset-x-0 h-[2.5px] bg-gradient-to-r from-transparent via-pink-400/60 to-transparent" />

                {/* Love Letter Message */}
                <div
                  data-testid="letter-message"
                  className="whitespace-pre-wrap font-serif font-normal text-base sm:text-lg leading-relaxed relative z-10 text-[#4A1D2F]"
                >
                  {config.message || "You lift my spirits into the clouds, making every day feel like sweet magic."}
                </div>

                {/* Sign-off within the letter */}
                <div className="text-right pt-6 mt-6 border-t border-pink-900/10 relative z-10">
                  <p className="text-[11px] opacity-75 uppercase tracking-widest mb-1 font-sans font-medium text-pink-900">
                    {config.signOff || "Forever in the clouds"}
                  </p>
                  <p
                    data-testid="sender-name"
                    className={`text-2xl sm:text-3xl font-serif font-medium ${styles.accentText}`}
                  >
                    {config.senderName || "Yours in Starlight"}
                  </p>
                </div>
              </div>

              {/* Memory / Hero Media Display (Soft Cloud Framed Keepsake) */}
              {config.heroMediaId && (
                <div className="pt-2">
                  <div className="relative mx-auto max-w-xs sm:max-w-sm rounded-2xl bg-white p-3.5 sm:p-4 text-stone-800 shadow-[0_15px_35px_rgba(244,114,182,0.25)] border border-pink-200/80 rotate-[-1deg] hover:rotate-0 transition-transform duration-500 group">
                    <div className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-pink-50/50 shadow-inner">
                      <MediaSlot
                        media={
                          config.heroMediaId.startsWith("http") || config.heroMediaId.startsWith("/")
                            ? { url: config.heroMediaId, altText: "Cherished Cloud Memory" }
                            : null
                        }
                        fallbackText="Our Cloud Memory"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="pt-3 pb-1 text-center">
                      <span className="font-serif italic text-xs sm:text-sm text-pink-900/80 tracking-wide">
                        Our sweetest moment above the clouds
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Signature Cloud Nine Interaction: Release a Celestial Star Blessing */}
              <div className="pt-3">
                <div className="p-4 rounded-2xl bg-pink-50/70 border border-pink-200/60 text-center space-y-2.5 shadow-sm">
                  {!hasReleasedWish ? (
                    <button
                      type="button"
                      onClick={() => setHasReleasedWish(true)}
                      className="group inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-sans font-medium tracking-wide text-pink-900 bg-white hover:bg-pink-100 border border-pink-300/70 shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
                      aria-label="Release a celestial blessing"
                    >
                      <span className="text-base group-hover:scale-125 transition-transform duration-300">
                        🌟
                      </span>
                      <span>Release a Celestial Blessing</span>
                    </button>
                  ) : (
                    <div className="space-y-1.5 animate-fadeIn">
                      <div className="flex items-center justify-center gap-1.5 text-amber-500 text-sm animate-bounce">
                        <span>✨</span>
                        <span>🌟</span>
                        <span>✨</span>
                      </div>
                      <p className="font-serif italic text-xs sm:text-sm text-pink-950 font-medium">
                        “May our love always soar higher than the clouds.”
                      </p>
                      <p className="text-[10px] text-pink-800/70 uppercase tracking-widest font-sans">
                        A blessing released to the heavens
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Interactive Experience Modules */}
              {config.modules && (
                <div className="pt-2">
                  <ModulesRenderer
                    modules={config.modules}
                    moduleOrder={config.moduleOrder}
                    mode={mode}
                    publicId={publicId}
                    theme={config.accentTheme || "blush-sky"}
                  />
                </div>
              )}

              {/* Dreamy Finale & Replay Affordance */}
              <div className="pt-6 border-t border-pink-200/60 flex flex-col items-center justify-center text-center space-y-4">

                <div className={`w-full h-px bg-gradient-to-r ${styles.divider}`} />

                <div className="flex items-center gap-2 text-xs text-pink-800/60 font-sans tracking-widest uppercase">
                  <span>☁️</span>
                  <span>Cloud Nine Keepsake</span>
                  <span>☁️</span>
                </div>

                {/* Replay Affordance */}
                <button
                  type="button"
                  data-testid="reseal-button"
                  onClick={() => setIsSealed(true)}
                  className="px-4 py-1.5 rounded-full text-xs font-sans tracking-wider uppercase text-pink-900 bg-pink-100/80 hover:bg-pink-200/80 border border-pink-300/60 hover:border-pink-400/80 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-400 cursor-pointer shadow-sm"
                  aria-label="Seal & Read Again"
                >
                  Seal & Read Again
                </button>
              </div>
            </div>
          </Envelope3D>
        </div>
      </div>

      {/* Footer Celestial Ambience */}
      <footer className="relative z-20 w-full py-4 text-center text-[11px] text-pink-800/50 font-sans tracking-widest">
        <span>VALENTINO</span>
        <span className="mx-2">·</span>
        <span>CLOUD NINE</span>
      </footer>
    </div>
  );
};
