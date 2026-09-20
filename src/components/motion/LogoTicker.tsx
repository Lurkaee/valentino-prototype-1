"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";

interface LogoTickerProps {
  items?: string[];
  className?: string;
}

const DEFAULT_ITEMS = [
  "MADE WITH LOVE",
  "PRIVATE BY DESIGN",
  "A LITTLE SURPRISE",
  "MOBILE READY",
  "WAX SEAL REVEAL",
  "CUSTOM MUSIC",
  "PRIVATE LINK",
  "ZERO DISTRACTIONS",
];

export function LogoTicker({
  items = DEFAULT_ITEMS,
  className = "",
}: LogoTickerProps) {
  const shouldReduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  // Repeat items to ensure a perfectly seamless loop
  const repeatedItems = [...items, ...items, ...items];

  // If reduced motion is preferred, render clean static accessible badges without animation
  if (shouldReduceMotion) {
    return (
      <div
        className={`w-full max-w-5xl mx-auto px-6 py-6 overflow-hidden ${className}`}
        aria-label="Valentino Feature Highlights"
      >
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs tracking-[0.22em] uppercase font-sans text-ivory-300/70">
          {items.map((item, idx) => (
            <span key={idx} className="flex items-center gap-3">
              <span className="text-rose-400/80 select-none text-[10px]">♡ ✦ ♡</span>
              <span>{item}</span>
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`w-full max-w-6xl mx-auto px-4 py-7 overflow-hidden relative select-none ${className}`}
      aria-label="Valentino Product Features"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Edge gradient fade masks (warm romantic fade) */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#12030A] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#12030A] to-transparent z-10 pointer-events-none" />

      {/* Marquee track */}
      <div className="flex overflow-hidden">
        <motion.div
          className="flex shrink-0 items-center gap-8 pr-8 will-change-transform"
          animate={{
            x: ["0%", "-33.333%"],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: isHovered ? 50 : 28, // Subtle slowdown on hover
              ease: "linear",
            },
          }}
        >
          {repeatedItems.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-8 shrink-0 text-xs sm:text-[13px] tracking-[0.22em] uppercase font-sans font-medium text-[#FAF8F5]/65 hover:text-white transition-colors"
            >
              <span>{item}</span>
              <span className="text-rose-400/70 text-[10px] select-none flex items-center gap-1">
                <span>♡</span>
                <span className="text-[8px]">✦</span>
                <span>♡</span>
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
