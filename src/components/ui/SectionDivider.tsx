"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";

interface SectionDividerProps {
  variant: "cream-to-berry" | "berry-to-midnight" | "sky-to-cream";
  className?: string;
}

/**
 * SectionDivider:
 * Organic, cinematic transitional bridges connecting contrasting surfaces across the page.
 * Eliminates harsh dividing lines and creates a single cohesive romantic atmosphere.
 */
export function SectionDivider({ variant, className = "" }: SectionDividerProps) {
  const shouldReduceMotion = useReducedMotion();

  if (variant === "sky-to-cream") {
    return (
      <div
        className={`w-full relative overflow-hidden pointer-events-none select-none ${className}`}
        aria-hidden="true"
      >
        {/* Soft Feathered Cloud-to-Paper Horizon */}
        <div
          className="w-full h-24 sm:h-32"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, rgba(255, 235, 242, 0.45) 30%, rgba(254, 225, 235, 0.75) 65%, rgba(253, 248, 243, 0.95) 90%, #FDF8F3 100%)",
          }}
        />
        {/* Subtle deckled stationery wave contour */}
        <svg
          className="w-full h-6 sm:h-8 text-[#FDF8F3] fill-current -mb-px block"
          viewBox="0 0 1440 32"
          preserveAspectRatio="none"
        >
          <path d="M0,16 C360,32 720,0 1080,24 C1260,36 1380,8 1440,16 L1440,32 L0,32 Z" />
        </svg>
      </div>
    );
  }

  if (variant === "cream-to-berry") {
    return (
      <div
        className={`w-full relative overflow-hidden pointer-events-none select-none ${className}`}
        aria-hidden="true"
      >
        {/* Upper Cream transition melting into dusty rose */}
        <div
          className="w-full h-28 sm:h-40 relative"
          style={{
            background:
              "linear-gradient(180deg, #FDF8F3 0%, #FBF0EB 20%, #F4D9E2 45%, #E2A7BE 70%, #9F2C55 90%, #2A0619 100%)",
          }}
        >
          {/* Ambient Candlelit Top Glow */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] sm:w-[900px] h-28 rounded-full bg-rose-400/25 blur-3xl" />

          {/* Organic gentle evening wave contour */}
          <svg
            className="absolute bottom-0 inset-x-0 w-full h-12 sm:h-16 text-[#1A0310] fill-current block"
            viewBox="0 0 1440 64"
            preserveAspectRatio="none"
          >
            <path d="M0,32 C320,64 640,8 960,48 C1200,80 1360,16 1440,32 L1440,64 L0,64 Z" />
          </svg>

          {/* Drifting warm evening sparkles */}
          {!shouldReduceMotion && (
            <motion.div
              animate={{
                opacity: [0.3, 0.7, 0.3],
                y: [0, -6, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 flex items-center justify-around px-8 opacity-40 text-rose-300/80 text-xs"
            >
              <span>✦</span>
              <span className="text-[9px] mb-4">✧</span>
              <span className="text-sm mt-2">✦</span>
              <span className="text-[10px]">✧</span>
              <span>✦</span>
            </motion.div>
          )}
        </div>
      </div>
    );
  }

  // variant === "berry-to-midnight"
  return (
    <div
      className={`w-full relative overflow-hidden pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      <div
        className="w-full h-20 sm:h-28"
        style={{
          background:
            "linear-gradient(180deg, #16020D 0%, #1A0311 35%, #14020C 70%, #12030A 100%)",
        }}
      >
        {/* Soft starlight horizon glow */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-rose-500/20 to-transparent" />
      </div>
    </div>
  );
}
