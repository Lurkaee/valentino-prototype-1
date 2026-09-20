"use client";

import React, { useId } from "react";
import { motion, useReducedMotion } from "motion/react";

interface ValentineSkyProps {
  className?: string;
}

/**
 * ValentineSky:
 * An atmospheric sunset sky with layered volumetric clouds, warm blush glows,
 * and sparse subtle floating heart accents.
 * Composition ratio: 80% composition / 15% atmosphere / 5% decoration.
 */
export function ValentineSky({ className = "" }: ValentineSkyProps) {
  const shouldReduceMotion = useReducedMotion();
  const id = useId();

  // Deterministic subtle heart accents (6 items only, quiet & sparse)
  const hearts = [
    { x: "12%", y: "22%", size: 14, opacity: 0.22, delay: 0, duration: 9 },
    { x: "82%", y: "18%", size: 16, opacity: 0.18, delay: 1.5, duration: 11 },
    { x: "24%", y: "65%", size: 12, opacity: 0.15, delay: 3, duration: 10 },
    { x: "78%", y: "58%", size: 14, opacity: 0.2, delay: 2, duration: 8.5 },
    { x: "6%", y: "78%", size: 10, opacity: 0.12, delay: 4, duration: 12 },
    { x: "90%", y: "82%", size: 12, opacity: 0.16, delay: 0.8, duration: 10.5 },
  ];

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none select-none z-0 ${className}`}
      aria-hidden="true"
    >
      {/* 1. Base Sky Gradient: Deep plum to warm sunset rose & peach */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1C0612] via-[#2A0818] to-[#12030A]" />

      {/* 2. Sunset Horizon Warm Glow (Center-top ambient illumination) */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] sm:w-[1200px] h-[550px] rounded-full bg-gradient-to-b from-rose-500/20 via-pink-400/12 to-transparent blur-3xl opacity-70"
      />

      {/* 3. Golden Sunset Light Spill (Warm Peach Accent) */}
      <div
        className="absolute top-[15%] left-[20%] w-[500px] h-[350px] rounded-full bg-gradient-to-br from-amber-400/10 via-rose-400/10 to-transparent blur-3xl opacity-60"
      />

      {/* 4. Distant Volumetric Sunset Clouds (Deep Background) */}
      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : {
                x: [-15, 15, -15],
              }
        }
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[8%] left-[-10%] w-[120%] h-[320px] bg-gradient-to-r from-rose-950/20 via-rose-800/15 to-rose-950/20 rounded-[100%] blur-[70px] opacity-70"
      />

      {/* 5. Midground Dreamy Cream & Rose Clouds */}
      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : {
                x: [20, -20, 20],
                y: [-8, 8, -8],
              }
        }
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[28%] right-[-5%] w-[850px] h-[340px] bg-gradient-to-bl from-pink-300/10 via-rose-500/10 to-transparent rounded-full blur-[80px] opacity-75"
      />

      {/* 6. Soft Foreground Cloud Vapor at the bottom of the hero */}
      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : {
                y: [0, -10, 0],
              }
        }
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-0 inset-x-0 h-[220px] bg-gradient-to-t from-[#0E0308] via-[#1C0612]/70 to-transparent pointer-events-none"
      />

      {/* 7. Sparse Subtle Floating Hearts (Restrained & Low Opacity) */}
      {hearts.map((h, i) => (
        <motion.div
          key={`${id}-heart-${i}`}
          style={{
            left: h.x,
            top: h.y,
            opacity: h.opacity,
          }}
          animate={
            shouldReduceMotion
              ? {}
              : {
                  y: [0, -16, 0],
                  rotate: [-4, 4, -4],
                  opacity: [h.opacity * 0.7, h.opacity, h.opacity * 0.7],
                }
          }
          transition={{
            duration: h.duration,
            repeat: Infinity,
            delay: h.delay,
            ease: "easeInOut",
          }}
          className="absolute will-change-transform"
        >
          <svg
            width={h.size}
            height={h.size}
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-rose-300 drop-shadow-[0_0_8px_rgba(244,63,94,0.4)]"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
