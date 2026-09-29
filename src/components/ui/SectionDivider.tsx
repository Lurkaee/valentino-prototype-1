"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";

interface SectionDividerProps {
  variant:
    | "sky-to-cream"
    | "cream-to-peach"
    | "peach-to-berry"
    | "cream-to-berry"
    | "berry-to-midnight"
    | "midnight-to-cream";
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
        className={`w-full relative overflow-hidden pointer-events-none select-none bg-[#FDF8F3] -mt-px ${className}`}
        aria-hidden="true"
      >
        {/* Soft Feathered Cloud-to-Paper Horizon (Blush Pink to Warm Cream) */}
        <div
          className="w-full h-20 sm:h-28"
          style={{
            background:
              "linear-gradient(180deg, #FEDEEA 0%, #FEEBF2 35%, #FDF4EE 70%, #FDF8F3 100%)",
          }}
        />
      </div>
    );
  }

  if (variant === "cream-to-peach") {
    return (
      <div
        className={`w-full relative overflow-hidden pointer-events-none select-none bg-[#FFF0EA] -mt-px ${className}`}
        aria-hidden="true"
      >
        <div
          className="w-full h-16 sm:h-24"
          style={{
            background:
              "linear-gradient(180deg, #FDF8F3 0%, #FDF3ED 40%, #FEECE3 75%, #FFF0EA 100%)",
          }}
        />
      </div>
    );
  }

  if (variant === "peach-to-berry") {
    return (
      <div
        className={`w-full relative overflow-hidden pointer-events-none select-none ${className}`}
        aria-hidden="true"
      >
        <div
          className="w-full h-24 sm:h-36 relative"
          style={{
            background:
              "linear-gradient(180deg, #FFF0EA 0%, #FDE4DF 20%, #F3BDD1 45%, #C25686 70%, #681139 90%, #2A0619 100%)",
          }}
        >
          {/* Ambient Candlelit Top Glow */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] sm:w-[900px] h-24 rounded-full bg-rose-400/20 blur-3xl" />

          {/* Organic wave contour */}
          <svg
            className="absolute bottom-0 inset-x-0 w-full h-10 sm:h-14 text-[#2A0619] fill-current block"
            viewBox="0 0 1440 64"
            preserveAspectRatio="none"
          >
            <path d="M0,32 C320,64 640,8 960,48 C1200,80 1360,16 1440,32 L1440,64 L0,64 Z" />
          </svg>
        </div>
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

  if (variant === "berry-to-midnight") {
    return (
      <div
        className={`w-full relative overflow-hidden pointer-events-none select-none ${className}`}
        aria-hidden="true"
      >
        <div
          className="w-full h-20 sm:h-28"
          style={{
            background:
              "linear-gradient(180deg, #2A0619 0%, #220414 35%, #18030E 70%, #12030A 100%)",
          }}
        >
          {/* Soft starlight horizon glow */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-rose-500/25 to-transparent" />
        </div>
      </div>
    );
  }

  // variant === "midnight-to-cream"
  return (
    <div
      className={`w-full relative overflow-hidden pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      <div
        className="w-full h-24 sm:h-36 relative"
        style={{
          background:
            "linear-gradient(180deg, #12030A 0%, #2D0818 25%, #6E1A3D 55%, #C26388 80%, #F5DDE7 92%, #FDF8F3 100%)",
        }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[700px] h-24 rounded-full bg-rose-400/20 blur-3xl" />
        <svg
          className="absolute bottom-0 inset-x-0 w-full h-10 sm:h-14 text-[#FDF8F3] fill-current block"
          viewBox="0 0 1440 64"
          preserveAspectRatio="none"
        >
          <path d="M0,32 C360,64 720,12 1080,44 C1260,60 1380,24 1440,32 L1440,64 L0,64 Z" />
        </svg>
      </div>
    </div>
  );
}
