"use client";

import React, { useId } from "react";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";

interface ValentineSkyProps {
  className?: string;
}

/**
 * ValentineSky:
 * A dreamy, romantic photographic & stylized sunset cloudscape for the hero viewport.
 * Features:
 * - Layered high-fidelity sunset sky texture with soft peach/coral depth
 * - Volumetric cloud puff mist floating around the center with screen blending
 * - Warm golden peach sunlight bloom
 * - Soft lavender & rose atmospheric horizon washes
 * - Exactly 5 delicate, low-opacity floating hearts
 */
export function ValentineSky({ className = "" }: ValentineSkyProps) {
  const shouldReduceMotion = useReducedMotion();
  const id = useId();

  // Exactly 5 delicate, subtle floating hearts
  const hearts = [
    { x: "12%", y: "20%", size: 13, opacity: 0.35, delay: 0, duration: 8.5 },
    { x: "86%", y: "18%", size: 15, opacity: 0.32, delay: 1.2, duration: 9.5 },
    { x: "16%", y: "48%", size: 11, opacity: 0.28, delay: 2.5, duration: 7.5 },
    { x: "84%", y: "52%", size: 13, opacity: 0.3, delay: 1.8, duration: 8.0 },
    { x: "32%", y: "75%", size: 10, opacity: 0.22, delay: 3.2, duration: 10.0 },
  ];

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none select-none z-0 ${className}`}
      aria-hidden="true"
    >
      {/* 1. Base Luminous Valentine Sky: Morning Blush to Sunset Peach */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 120% 80% at 50% -10%, #FFF5F7 0%, #FFE8F0 30%, #FED9E7 55%, #F7C3D8 75%, #F0AAC7 90%, #E28FB3 100%)
          `,
        }}
      />

      {/* 2. Photographic Sunset Sky Texture Layer with Parallax Drift */}
      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : {
                scale: [1, 1.03, 1],
                x: [-10, 10, -10],
              }
        }
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-x-[-5%] -top-[10%] h-[120%] opacity-45 mix-blend-soft-light will-change-transform"
      >
        <Image
          src="/clouds/sunset-sky.jpg"
          alt="Sunset Clouds Atmosphere"
          fill
          priority
          unoptimized
          className="object-cover object-center filter blur-[1px]"
        />
      </motion.div>

      {/* 3. Soft Golden Peach Sunset Center Glow */}
      <div
        className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[850px] sm:w-[1300px] h-[600px] rounded-full blur-[85px] opacity-80"
        style={{
          background:
            "radial-gradient(circle at 50% 35%, rgba(255, 242, 225, 0.95) 0%, rgba(254, 220, 210, 0.65) 40%, rgba(253, 195, 218, 0.25) 70%, transparent 100%)",
        }}
      />

      {/* 4. Soft Lavender Atmosphere Light (Right Horizon) */}
      <div
        className="absolute top-[4%] right-[-8%] w-[700px] h-[540px] rounded-full blur-[85px] opacity-60"
        style={{
          background:
            "radial-gradient(circle, rgba(235, 218, 252, 0.8) 0%, rgba(246, 205, 230, 0.35) 50%, transparent 80%)",
        }}
      />

      {/* 5. Warm Peach Sunlight Horizon Wash (Left Horizon) */}
      <div
        className="absolute top-[8%] left-[-10%] w-[650px] h-[500px] rounded-full blur-[80px] opacity-65"
        style={{
          background:
            "radial-gradient(circle, rgba(255, 228, 215, 0.85) 0%, rgba(255, 200, 218, 0.4) 50%, transparent 80%)",
        }}
      />

      {/* 6. Volumetric Cloud Mist Texture Layer (Screen Blended for Organic Depth) */}
      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : {
                y: [0, -8, 0],
                opacity: [0.35, 0.48, 0.35],
              }
        }
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[35%] sm:top-[30%] inset-x-[-10%] h-[500px] mix-blend-screen opacity-40 will-change-transform"
      >
        <Image
          src="/clouds/cloud-puff.jpg"
          alt="Volumetric Cloud Mist"
          fill
          unoptimized
          className="object-contain object-center filter blur-[2px]"
        />
      </motion.div>

      {/* 7. Foreground Cloud Vapor Feathering (Soft Translucent Mist) */}
      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : {
                y: [0, -6, 0],
                opacity: [0.75, 0.9, 0.75],
              }
        }
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[52%] sm:top-[48%] inset-x-[-8%] h-[240px] rounded-[100%] blur-[35px] will-change-transform"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(255, 255, 255, 0.92) 0%, rgba(255, 238, 246, 0.65) 45%, rgba(254, 215, 232, 0.25) 70%, transparent 85%)",
        }}
      />

      {/* 8. Feathered Transition to the Warm Cream Paper Section */}
      <div
        className="absolute bottom-0 inset-x-0 h-[220px] pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(255, 240, 245, 0.5) 40%, rgba(253, 248, 243, 0.95) 85%, #FDF8F3 100%)",
        }}
      />

      {/* 9. Delicate Floating Hearts */}
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
                  y: [0, -14, 0],
                  rotate: [-3, 3, -3],
                  opacity: [h.opacity * 0.8, h.opacity, h.opacity * 0.8],
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
            className="text-rose-400/80 drop-shadow-[0_2px_6px_rgba(244,63,94,0.3)]"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
