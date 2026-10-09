"use client";

import React, { useId, useMemo } from "react";
import { motion, useReducedMotion, useScroll, useTransform, useSpring } from "motion/react";
import Image from "next/image";
import { WorldTheme } from "@/worlds/types";

export type AtmosphereContext = "hero" | "marketing" | "studio" | "create" | "world";
export type AtmosphereIntensity = "subtle" | "soft" | "hero" | "cinema";

export interface ValentinoAtmosphereProps {
  className?: string;
  context?: AtmosphereContext;
  world?: WorldTheme | string;
  intensity?: AtmosphereIntensity;
  scrollReactive?: boolean;
  fixed?: boolean;
}

interface WorldAtmosphereConfig {
  baseGradient: string;
  photoSkySrc?: string;
  photoSkyOpacity: number;
  photoSkyBlend: string;
  bloomGradient: string;
  bloomPosition: string;
  bloomSize: string;
  hazeGradient: string;
  vaporColor: string;
  particleType: "motes" | "embers" | "fibers" | "grain" | "petals";
  particleColor: string;
  particleShadow: string;
}

const WORLD_CONFIGS: Record<string, WorldAtmosphereConfig> = {
  "cloud-nine": {
    // Morning light after sunrise: warm ivory cotton, pearl, pale cerulean hint, subtle dawn peach
    baseGradient:
      "radial-gradient(ellipse 125% 90% at 50% -5%, #FFFDF9 0%, #FAF5EE 24%, #F4EFE6 48%, #EAF1FA 72%, #DCE8F7 88%, #F7EBE3 100%)",
    photoSkySrc: "/clouds/sunset-sky.jpg",
    photoSkyOpacity: 0.38,
    photoSkyBlend: "mix-blend-soft-light",
    bloomGradient:
      "radial-gradient(circle at 50% 32%, rgba(255, 250, 238, 0.95) 0%, rgba(254, 238, 218, 0.6) 35%, rgba(224, 238, 252, 0.35) 65%, transparent 100%)",
    bloomPosition: "top-[-10%] left-1/2 -translate-x-1/2",
    bloomSize: "w-[850px] sm:w-[1300px] h-[600px]",
    hazeGradient:
      "radial-gradient(circle, rgba(235, 244, 255, 0.75) 0%, rgba(254, 238, 226, 0.35) 50%, transparent 80%)",
    vaporColor:
      "radial-gradient(ellipse at 50% 50%, rgba(255, 255, 255, 0.95) 0%, rgba(248, 246, 242, 0.7) 45%, rgba(228, 240, 252, 0.25) 75%, transparent 85%)",
    particleType: "motes",
    particleColor: "text-amber-200/60",
    particleShadow: "drop-shadow-[0_0_6px_rgba(254,243,199,0.4)]",
  },
  "midnight-rose": {
    // Candlelit private chamber: velvet, aged paper, wax, warm flame point, deep wine-dark shadow
    baseGradient:
      "radial-gradient(ellipse 125% 90% at 50% -5%, #18030E 0%, #10020A 35%, #0A0106 70%, #030002 100%)",
    photoSkySrc: "/clouds/sunset-sky.jpg",
    photoSkyOpacity: 0.16,
    photoSkyBlend: "mix-blend-overlay",
    bloomGradient:
      "radial-gradient(circle at 50% 28%, rgba(245, 158, 11, 0.32) 0%, rgba(190, 18, 60, 0.22) 32%, rgba(136, 19, 55, 0.14) 58%, transparent 75%)",
    bloomPosition: "top-[-5%] left-1/2 -translate-x-1/2",
    bloomSize: "w-[800px] sm:w-[1200px] h-[580px]",
    hazeGradient:
      "radial-gradient(circle, rgba(159, 18, 57, 0.2) 0%, rgba(217, 119, 6, 0.1) 45%, transparent 75%)",
    vaporColor:
      "radial-gradient(ellipse at 50% 50%, rgba(190, 18, 60, 0.12) 0%, rgba(20, 2, 12, 0.4) 50%, transparent 80%)",
    particleType: "embers",
    particleColor: "text-amber-300/50",
    particleShadow: "drop-shadow-[0_0_6px_rgba(245,158,11,0.45)]",
  },
  kage: {
    // Kyoto sanctuary: Japanese washi, stone, cedar, mist, deep shadow, single warm lantern glow
    baseGradient:
      "radial-gradient(ellipse 125% 90% at 50% -5%, #0B1411 0%, #070D0B 35%, #040807 70%, #020403 100%)",
    photoSkySrc: "/clouds/sunset-sky.jpg",
    photoSkyOpacity: 0.12,
    photoSkyBlend: "mix-blend-soft-light",
    bloomGradient:
      "radial-gradient(circle at 50% 28%, rgba(217, 119, 6, 0.26) 0%, rgba(16, 185, 129, 0.12) 35%, rgba(4, 120, 87, 0.08) 60%, transparent 75%)",
    bloomPosition: "top-[-5%] left-1/2 -translate-x-1/2",
    bloomSize: "w-[800px] sm:w-[1100px] h-[540px]",
    hazeGradient:
      "radial-gradient(circle, rgba(16, 185, 129, 0.16) 0%, rgba(6, 78, 59, 0.12) 50%, transparent 80%)",
    vaporColor:
      "radial-gradient(ellipse at 50% 50%, rgba(52, 211, 153, 0.1) 0%, rgba(4, 20, 16, 0.4) 50%, transparent 80%)",
    particleType: "fibers",
    particleColor: "text-emerald-200/50",
    particleShadow: "drop-shadow-[0_0_6px_rgba(16,185,129,0.35)]",
  },
  "apricot-film": {
    // Archival 16mm film: low golden sun, tobacco amber, light leaks, dust grain flecks
    baseGradient:
      "radial-gradient(ellipse 125% 90% at 50% -5%, #231207 0%, #160B04 35%, #0E0702 70%, #050201 100%)",
    photoSkySrc: "/clouds/sunset-sky.jpg",
    photoSkyOpacity: 0.2,
    photoSkyBlend: "mix-blend-color-dodge",
    bloomGradient:
      "radial-gradient(circle at 45% 26%, rgba(251, 146, 60, 0.36) 0%, rgba(217, 119, 6, 0.22) 35%, rgba(244, 63, 94, 0.1) 65%, transparent 80%)",
    bloomPosition: "top-[-8%] left-1/2 -translate-x-1/2",
    bloomSize: "w-[850px] sm:w-[1200px] h-[560px]",
    hazeGradient:
      "radial-gradient(circle, rgba(251, 146, 60, 0.2) 0%, rgba(194, 65, 12, 0.12) 50%, transparent 80%)",
    vaporColor:
      "radial-gradient(ellipse at 50% 50%, rgba(253, 186, 116, 0.12) 0%, rgba(25, 10, 4, 0.4) 50%, transparent 80%)",
    particleType: "grain",
    particleColor: "text-amber-200/55",
    particleShadow: "drop-shadow-[0_0_6px_rgba(245,158,11,0.4)]",
  },
  "wildflower-paper": {
    // Handmade herbarium page: deckled cotton, visible fibers, sage, lavender, buttercup yellow
    baseGradient:
      "radial-gradient(ellipse 125% 90% at 50% -5%, #141B16 0%, #0D130F 35%, #080D0A 70%, #030504 100%)",
    photoSkySrc: "/clouds/sunset-sky.jpg",
    photoSkyOpacity: 0.15,
    photoSkyBlend: "mix-blend-soft-light",
    bloomGradient:
      "radial-gradient(circle at 50% 30%, rgba(254, 240, 138, 0.24) 0%, rgba(196, 181, 253, 0.16) 35%, rgba(110, 231, 183, 0.08) 60%, transparent 75%)",
    bloomPosition: "top-[-5%] left-1/2 -translate-x-1/2",
    bloomSize: "w-[800px] sm:w-[1100px] h-[540px]",
    hazeGradient:
      "radial-gradient(circle, rgba(196, 181, 253, 0.16) 0%, rgba(109, 40, 217, 0.08) 50%, transparent 80%)",
    vaporColor:
      "radial-gradient(ellipse at 50% 50%, rgba(233, 213, 255, 0.1) 0%, rgba(12, 20, 15, 0.4) 50%, transparent 80%)",
    particleType: "petals",
    particleColor: "text-yellow-100/50",
    particleShadow: "drop-shadow-[0_0_6px_rgba(254,240,138,0.35)]",
  },
  "ocean-letter": {
    // Shoreline letter: coastal diffuse light, sea mist, slate blue, frosted sea glass, salt-washed paper
    baseGradient:
      "radial-gradient(ellipse 125% 90% at 50% -5%, #091724 0%, #050E17 35%, #03080F 70%, #010306 100%)",
    photoSkySrc: "/clouds/sunset-sky.jpg",
    photoSkyOpacity: 0.16,
    photoSkyBlend: "mix-blend-screen",
    bloomGradient:
      "radial-gradient(circle at 50% 30%, rgba(125, 211, 252, 0.26) 0%, rgba(56, 189, 248, 0.14) 35%, rgba(14, 116, 144, 0.08) 60%, transparent 75%)",
    bloomPosition: "top-[-6%] left-1/2 -translate-x-1/2",
    bloomSize: "w-[850px] sm:w-[1250px] h-[580px]",
    hazeGradient:
      "radial-gradient(circle, rgba(56, 189, 248, 0.18) 0%, rgba(3, 105, 161, 0.1) 50%, transparent 80%)",
    vaporColor:
      "radial-gradient(ellipse at 50% 50%, rgba(186, 230, 253, 0.12) 0%, rgba(4, 15, 28, 0.4) 50%, transparent 80%)",
    particleType: "motes",
    particleColor: "text-sky-200/50",
    particleShadow: "drop-shadow-[0_0_6px_rgba(56,189,248,0.4)]",
  },
};

/**
 * ValentinoAtmosphere:
 * Canonical, persistent atmospheric layer for the Valentino experience.
 *
 * Characteristics:
 * - Persistent fixed background across public scroll flows (one shared system)
 * - Photographic sunset/cloud texture that drifts continuously with soft parallax
 * - Volumetric organic cloud puff/mist layers that breathe and react to scroll
 * - Continuous environmental morph:
 *   [ PINK SKY ] -> [ softer cloud / paper ] -> [ rose / berry depth ] -> [ darker romantic world ] -> [ sunset finale ]
 * - GPU-friendly: transform & opacity only
 * - Full reduced-motion awareness
 * - Pure pointer-events: none (never interferes with user interactions)
 */
export function ValentinoAtmosphere({
  className = "",
  context = "marketing",
  world = "cloud-nine",
  intensity,
  scrollReactive = true,
  fixed,
}: ValentinoAtmosphereProps) {
  const shouldReduceMotion = useReducedMotion();
  const id = useId();

  // Determine whether this instance should pin fixed to the viewport
  const isFixed = fixed ?? (context === "marketing" || context === "world");

  // Resolve world config
  const activeWorldConfig = WORLD_CONFIGS[world] || WORLD_CONFIGS["cloud-nine"];

  // Effective intensity mapping
  const resolvedIntensity: AtmosphereIntensity =
    intensity ||
    (context === "hero"
      ? "hero"
      : context === "marketing"
      ? "soft"
      : context === "studio"
      ? "subtle"
      : context === "create"
      ? "soft"
      : "cinema");

  // Opacity multiplier
  const opacityMultiplier =
    resolvedIntensity === "hero"
      ? 1.0
      : resolvedIntensity === "cinema"
      ? 0.85
      : resolvedIntensity === "soft"
      ? 0.65
      : 0.25; // studio

  // Central scroll bindings
  const { scrollY, scrollYProgress } = useScroll();

  // Scroll parallax springs
  const rawSkyY = useTransform(scrollY, [0, 1600], [0, scrollReactive ? 140 : 0]);
  const rawMistY = useTransform(scrollY, [0, 1600], [0, scrollReactive ? 220 : 0]);
  const rawParticlesY = useTransform(scrollY, [0, 1600], [0, scrollReactive ? -80 : 0]);

  const skyY = useSpring(rawSkyY, { damping: 30, stiffness: 100 });
  const mistY = useSpring(rawMistY, { damping: 30, stiffness: 100 });
  const particlesScrollY = useSpring(rawParticlesY, { damping: 30, stiffness: 100 });

  // --------------------------------------------------------------------------
  // CONTINUOUS MARKETING SCROLL MORPH (HERO -> PAPER -> BERRY -> FINALE)
  // --------------------------------------------------------------------------
  // Phase 1: Hero Sunset Sky (0.00 -> 0.28)
  const heroSkyOpacity = useTransform(scrollYProgress, [0, 0.16, 0.30], [1, 0.85, 0]);

  // Phase 2: Softer Cloud / Warm Paper (0.14 -> 0.46)
  const paperAtmosphereOpacity = useTransform(
    scrollYProgress,
    [0.12, 0.22, 0.36, 0.48],
    [0, 1, 1, 0]
  );

  // Phase 3: Rose / Berry Depth & Darker Romantic Worlds (0.36 -> 0.84)
  const berryVelvetOpacity = useTransform(
    scrollYProgress,
    [0.36, 0.48, 0.74, 0.84],
    [0, 1, 1, 0]
  );

  // Phase 4: Warm Paper / Sunset Finale (0.74 -> 1.00)
  const finaleAtmosphereOpacity = useTransform(
    scrollYProgress,
    [0.72, 0.84, 1],
    [0, 1, 1]
  );

  // Dynamic Bloom transitions for Marketing
  const marketingSunBloomOpacity = useTransform(
    scrollYProgress,
    [0, 0.32, 0.44, 0.76, 0.88, 1],
    [0.9 * opacityMultiplier, 0.7 * opacityMultiplier, 0, 0, 0.6 * opacityMultiplier, 0.9 * opacityMultiplier]
  );
  const marketingRoseBloomOpacity = useTransform(
    scrollYProgress,
    [0.34, 0.46, 0.74, 0.84],
    [0, 0.85 * opacityMultiplier, 0.85 * opacityMultiplier, 0]
  );

  // Dynamic photographic cloud opacity across marketing scroll
  const marketingPhotoSkyOpacity = useTransform(
    scrollYProgress,
    [0, 0.22, 0.44, 0.74, 0.86, 1],
    [0.48, 0.38, 0.22, 0.22, 0.36, 0.46]
  );

  // Dynamic volumetric mist opacity
  const marketingMistOpacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.48, 0.75, 1],
    [0.45 * opacityMultiplier, 0.35 * opacityMultiplier, 0.22 * opacityMultiplier, 0.28 * opacityMultiplier, 0.42 * opacityMultiplier]
  );

  // Ambient floating material fragments (delicate, sparse, irregular, slow)
  const particles = useMemo(
    () => [
      { x: "12%", y: "18%", size: 3, opacity: 0.28, delay: 0, duration: 14, type: "mote" },
      { x: "84%", y: "24%", size: 4, opacity: 0.22, delay: 2.1, duration: 16, type: "fiber" },
      { x: "18%", y: "48%", size: 5, opacity: 0.2, delay: 3.4, duration: 15, type: "petal" },
      { x: "78%", y: "56%", size: 3, opacity: 0.25, delay: 1.5, duration: 17, type: "mote" },
      { x: "26%", y: "76%", size: 4, opacity: 0.18, delay: 4.2, duration: 18, type: "fiber" },
      { x: "82%", y: "84%", size: 3, opacity: 0.22, delay: 2.8, duration: 16, type: "mote" },
    ],
    []
  );

  const containerPosition = isFixed ? "fixed inset-0" : "absolute inset-0";

  return (
    <div
      data-testid="valentino-atmosphere"
      data-context={context}
      data-world={world}
      data-intensity={resolvedIntensity}
      className={`${containerPosition} overflow-hidden pointer-events-none select-none z-0 ${className}`}
      aria-hidden="true"
    >
      {/* ===================================================================== */}
      {/* LAYER 0: BASE CHROMATIC RADIANCE                                      */}
      {/* ===================================================================== */}
      {context === "marketing" ? (
        <>
          {/* Layer 0A: Hero Sunset Pink Sky */}
          <motion.div
            className="absolute inset-0 will-change-transform"
            style={{
              background:
                "radial-gradient(ellipse 120% 85% at 50% -10%, #FFF5F7 0%, #FFE8F0 25%, #FED9E7 50%, #F7C3D8 70%, #F0AAC7 85%, #E28FB3 100%)",
              opacity: shouldReduceMotion ? 1 : heroSkyOpacity,
            }}
          />

          {/* Layer 0B: Softer Cloud / Warm Deckled Paper Atmosphere (Morning daylight & ivory fibers) */}
          <motion.div
            className="absolute inset-0 will-change-transform"
            style={{
              background:
                "radial-gradient(ellipse 120% 85% at 50% 20%, #FFFDF9 0%, #FAF6EE 28%, #F6EDE2 55%, #EBF1F8 80%, #E2E8F0 100%)",
              opacity: shouldReduceMotion ? 0 : paperAtmosphereOpacity,
            }}
          />

          {/* Layer 0C: Rose & Berry Atmospheric Depth / Dark Romantic World */}
          <motion.div
            className="absolute inset-0 will-change-transform"
            style={{
              background:
                "radial-gradient(ellipse 130% 90% at 50% 20%, #2A0518 0%, #1A0310 35%, #10020A 70%, #060104 100%)",
              opacity: shouldReduceMotion ? 0 : berryVelvetOpacity,
            }}
          />

          {/* Layer 0D: Warm Sunset Finale Atmosphere */}
          <motion.div
            className="absolute inset-0 will-change-transform"
            style={{
              background:
                "radial-gradient(ellipse 120% 85% at 50% 65%, #FFF6F0 0%, #FDE9DF 25%, #F7CDD9 55%, #E28FA8 80%, #2A071C 100%)",
              opacity: shouldReduceMotion ? 0 : finaleAtmosphereOpacity,
            }}
          />
        </>
      ) : (
        <div
          className="absolute inset-0 transition-all duration-1000"
          style={{
            background: activeWorldConfig.baseGradient,
            opacity: context === "studio" ? 0.35 : 1,
          }}
        />
      )}

      {/* ===================================================================== */}
      {/* LAYER 1: PHOTOGRAPHIC SKY TEXTURE WITH PARALLAX DRIFT                */}
      {/* ===================================================================== */}
      {activeWorldConfig.photoSkySrc && (
        <motion.div
          style={{
            y: shouldReduceMotion ? 0 : skyY,
            opacity:
              context === "marketing"
                ? shouldReduceMotion
                  ? 0.4
                  : marketingPhotoSkyOpacity
                : activeWorldConfig.photoSkyOpacity * opacityMultiplier,
          }}
          animate={
            shouldReduceMotion
              ? {}
              : {
                  scale: [1, 1.025, 1],
                  x: [-10, 10, -10],
                }
          }
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className={`absolute inset-x-[-8%] -top-[12%] h-[130%] ${activeWorldConfig.photoSkyBlend} will-change-transform`}
        >
          <Image
            src={activeWorldConfig.photoSkySrc}
            alt="Atmospheric Sunset Sky Texture"
            fill
            priority={context === "hero" || context === "marketing"}
            sizes="100vw"
            className="object-cover object-center filter blur-[0.8px]"
          />
        </motion.div>
      )}

      {/* ===================================================================== */}
      {/* LAYER 2: RADIANT CENTER BLOOM (SUNSET GOLD & ROMANTIC CRIMSON)        */}
      {/* ===================================================================== */}
      {context === "marketing" ? (
        <>
          {/* Sunset Peach/Gold Bloom for Day & Finale */}
          <motion.div
            className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[900px] sm:w-[1350px] h-[640px] rounded-full blur-[90px] will-change-transform"
            style={{
              background:
                "radial-gradient(circle at 50% 35%, rgba(255, 242, 225, 0.95) 0%, rgba(254, 220, 210, 0.65) 40%, rgba(253, 195, 218, 0.25) 70%, transparent 100%)",
              opacity: shouldReduceMotion ? 0.8 * opacityMultiplier : marketingSunBloomOpacity,
            }}
          />

          {/* Intimate Rose/Crimson Bloom for Midnight / Worlds */}
          <motion.div
            className="absolute top-[15%] left-1/2 -translate-x-1/2 w-[850px] sm:w-[1250px] h-[600px] rounded-full blur-[85px] will-change-transform"
            style={{
              background:
                "radial-gradient(circle at 50% 30%, rgba(244, 63, 94, 0.4) 0%, rgba(159, 18, 57, 0.25) 45%, transparent 75%)",
              opacity: shouldReduceMotion ? 0 : marketingRoseBloomOpacity,
            }}
          />
        </>
      ) : (
        <div
          className={`absolute ${activeWorldConfig.bloomPosition} ${activeWorldConfig.bloomSize} rounded-full blur-[85px] transition-all duration-700`}
          style={{
            background: activeWorldConfig.bloomGradient,
            opacity: 0.8 * opacityMultiplier,
          }}
        />
      )}

      {/* ===================================================================== */}
      {/* LAYER 3: VOLUMETRIC CLOUD PUFF MIST LAYER                             */}
      {/* ===================================================================== */}
      <motion.div
        style={{
          y: shouldReduceMotion ? 0 : mistY,
          opacity:
            context === "marketing"
              ? shouldReduceMotion
                ? 0.38 * opacityMultiplier
                : marketingMistOpacity
              : shouldReduceMotion
              ? 0.35 * opacityMultiplier
              : 0.45 * opacityMultiplier,
        }}
        animate={
          shouldReduceMotion
            ? {}
            : {
                x: [-8, 8, -8],
              }
        }
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[28%] sm:top-[24%] inset-x-[-10%] h-[560px] mix-blend-screen will-change-transform"
      >
        <Image
          src="/clouds/cloud-puff.jpg"
          alt="Volumetric Cloud Mist"
          fill
          sizes="100vw"
          className="object-contain object-center filter blur-[1.5px]"
        />
      </motion.div>

      {/* ===================================================================== */}
      {/* LAYER 3B: SOFT TRANSLUCENT VAPOR FEATHERING                           */}
      {/* ===================================================================== */}
      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : {
                y: [0, -6, 0],
                opacity: [
                  0.75 * opacityMultiplier,
                  0.92 * opacityMultiplier,
                  0.75 * opacityMultiplier,
                ],
              }
        }
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[48%] sm:top-[44%] inset-x-[-8%] h-[260px] rounded-[100%] blur-[40px] will-change-transform"
        style={{
          background: activeWorldConfig.vaporColor,
        }}
      />

      {/* ===================================================================== */}
      {/* LAYER 4: DELICATE FLOATING AMBIENT PARTICLES                          */}
      {/* ===================================================================== */}
      {context !== "studio" && (
        <motion.div
          style={{
            y: shouldReduceMotion ? 0 : particlesScrollY,
          }}
          className="absolute inset-0 pointer-events-none"
        >
          {particles.map((p, i) => (
            <motion.div
              key={`${id}-particle-${i}`}
              style={{
                left: p.x,
                top: p.y,
                opacity: p.opacity * opacityMultiplier,
              }}
              animate={
                shouldReduceMotion
                  ? {}
                  : {
                      y: [0, -15, 0],
                      rotate: [-4, 4, -4],
                      opacity: [
                        p.opacity * opacityMultiplier * 0.75,
                        p.opacity * opacityMultiplier,
                        p.opacity * opacityMultiplier * 0.75,
                      ],
                    }
              }
              transition={{
                duration: p.duration,
                repeat: Infinity,
                delay: p.delay,
                ease: "easeInOut",
              }}
              className="absolute will-change-transform"
            >
              {p.type === "fiber" ? (
                // Slender natural paper fiber fleck
                <svg
                  width={p.size * 2.5}
                  height={p.size * 2.5}
                  viewBox="0 0 16 16"
                  fill="none"
                  className={`${activeWorldConfig.particleColor} ${activeWorldConfig.particleShadow}`}
                >
                  <path
                    d="M3 13 C 5 9, 9 6, 13 3"
                    stroke="currentColor"
                    strokeWidth="0.9"
                    strokeLinecap="round"
                    strokeOpacity="0.75"
                  />
                </svg>
              ) : p.type === "petal" ? (
                // Faint pressed petal fragment
                <svg
                  width={p.size * 2.2}
                  height={p.size * 2.2}
                  viewBox="0 0 16 16"
                  fill="none"
                  className={`${activeWorldConfig.particleColor} ${activeWorldConfig.particleShadow}`}
                >
                  <path
                    d="M4 12 C 3 7, 7 3, 12 4 C 13 9, 9 13, 4 12 Z"
                    fill="currentColor"
                    fillOpacity="0.38"
                  />
                </svg>
              ) : (
                // Luminous dust mote / ambient air speck
                <div
                  style={{ width: p.size, height: p.size }}
                  className={`rounded-full bg-current ${activeWorldConfig.particleColor} ${activeWorldConfig.particleShadow} filter blur-[0.4px]`}
                />
              )}
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
