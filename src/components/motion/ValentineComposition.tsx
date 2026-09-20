"use client";

import React, { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import {
  ValentineDecor,
  CURATED_FLOWERS,
  CURATED_CHARMS,
  CURATED_PAPERS,
  CURATED_RIBBONS,
  CURATED_SEALS,
} from "@/types/decor";

interface ValentineCompositionProps {
  decor: ValentineDecor;
  className?: string;
  onLetterClick?: () => void;
  interactive?: boolean;
}

// Preset positions for up to 6 flowers forming a bouquet around the letter
const FLOWER_POSITIONS = [
  { x: -75, y: -90, rotate: -18, scale: 1.05 },  // Top-left
  { x: 75, y: -90, rotate: 18, scale: 1.05 },   // Top-right
  { x: -115, y: -25, rotate: -32, scale: 0.95 }, // Mid-left
  { x: 115, y: -25, rotate: 32, scale: 0.95 },  // Mid-right
  { x: -65, y: 70, rotate: -12, scale: 0.9 },   // Bottom-left
  { x: 65, y: 70, rotate: 12, scale: 0.9 },    // Bottom-right
];

// Preset positions for up to 5 charms orbiting the arrangement
const CHARM_POSITIONS = [
  { x: -95, y: -130, delay: 0 },
  { x: 95, y: -130, delay: 0.3 },
  { x: 0, y: -150, delay: 0.6 },
  { x: -130, y: 40, delay: 0.9 },
  { x: 130, y: 40, delay: 1.2 },
];

export function ValentineComposition({
  decor,
  className = "",
  onLetterClick,
  interactive = true,
}: ValentineCompositionProps) {
  const shouldReduceMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);

  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!interactive || shouldReduceMotion || !cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const deltaX = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const deltaY = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
      setRotateX(Math.max(-3.5, Math.min(3.5, -deltaY * 3.5)));
      setRotateY(Math.max(-4.0, Math.min(4.0, deltaX * 4.0)));
    },
    [interactive, shouldReduceMotion]
  );

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  }, []);

  const currentPaper = CURATED_PAPERS.find((p) => p.id === decor.paper) || CURATED_PAPERS[0];
  const currentRibbon = CURATED_RIBBONS.find((r) => r.id === decor.ribbon) || CURATED_RIBBONS[0];
  const currentSeal = CURATED_SEALS.find((s) => s.id === decor.seal) || CURATED_SEALS[0];

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onLetterClick}
      className={`relative select-none perspective-[1200px] flex items-center justify-center ${
        interactive ? "cursor-pointer group" : ""
      } ${className}`}
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label="Customized Romantic Valentine Composition"
    >
      {/* 1. Surrounding Digital Bouquet: Animated Flowers */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <AnimatePresence>
          {decor.flowers.map((flowerId, index) => {
            const flower = CURATED_FLOWERS.find((f) => f.id === flowerId);
            if (!flower) return null;
            const pos = FLOWER_POSITIONS[index % FLOWER_POSITIONS.length];

            return (
              <motion.div
                key={`flower-${flower.id}`}
                initial={shouldReduceMotion ? { opacity: 1 } : { scale: 0, opacity: 0 }}
                animate={{
                  scale: pos.scale,
                  opacity: 1,
                  x: pos.x,
                  y: pos.y,
                  rotate: pos.rotate,
                }}
                exit={shouldReduceMotion ? { opacity: 0 } : { scale: 0, opacity: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: index * 0.08,
                }}
                className="absolute flex items-center justify-center filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.18)] will-change-transform"
              >
                <span className="text-3xl sm:text-4xl select-none transform hover:scale-125 transition-transform duration-300">
                  {flower.emoji}
                </span>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* 2. Orbiting Romantic Charms */}
        <AnimatePresence>
          {decor.charms.map((charmId, index) => {
            const charm = CURATED_CHARMS.find((c) => c.id === charmId);
            if (!charm) return null;
            const pos = CHARM_POSITIONS[index % CHARM_POSITIONS.length];

            return (
              <motion.div
                key={`charm-${charm.id}`}
                initial={shouldReduceMotion ? { opacity: 1 } : { scale: 0, y: pos.y + 10 }}
                animate={
                  shouldReduceMotion
                    ? { opacity: 1 }
                    : {
                        scale: 1,
                        opacity: 0.9,
                        x: pos.x,
                        y: [pos.y, pos.y - 8, pos.y],
                      }
                }
                exit={shouldReduceMotion ? { opacity: 0 } : { scale: 0, opacity: 0 }}
                transition={{
                  scale: { duration: 0.3 },
                  y: { duration: 4 + index, repeat: Infinity, ease: "easeInOut", delay: pos.delay },
                }}
                className="absolute flex items-center justify-center filter drop-shadow-[0_4px_10px_rgba(244,63,94,0.3)] will-change-transform"
              >
                <span className="text-xl sm:text-2xl select-none">{charm.emoji}</span>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* 3. Outer Ambient Glow */}
      <div
        className={`absolute -inset-6 rounded-[36px] bg-gradient-to-r from-rose-400/20 via-pink-300/30 to-amber-300/20 blur-2xl transition-opacity duration-700 pointer-events-none ${
          isHovered ? "opacity-95 scale-105" : "opacity-60"
        }`}
      />

      {/* 4. 3D Letter Centerpiece */}
      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : {
                y: isHovered ? -4 : [0, -6, 0],
                rotateX,
                rotateY,
                translateZ: isHovered ? 8 : 0,
              }
        }
        transition={
          shouldReduceMotion
            ? { duration: 0 }
            : {
                y: isHovered
                  ? { duration: 0.35, ease: "easeOut" }
                  : { duration: 5.4, repeat: Infinity, ease: "easeInOut" },
                rotateX: { duration: 0.25, ease: "easeOut" },
                rotateY: { duration: 0.25, ease: "easeOut" },
                translateZ: { duration: 0.35, ease: "easeOut" },
              }
        }
        style={{ transformStyle: "preserve-3d" }}
        className="relative w-full max-w-[310px] sm:max-w-[350px] mx-auto z-20"
      >
        {/* Shadow */}
        <div
          style={{ transform: "translateZ(-14px)" }}
          className={`absolute inset-x-5 -bottom-4 h-10 bg-gradient-to-r from-rose-950/20 via-rose-900/30 to-rose-950/20 rounded-full blur-xl transition-all duration-500 ${
            isHovered ? "scale-110 opacity-60" : "opacity-40"
          }`}
        />

        {/* Envelope Composition */}
        <div
          style={{ transform: "translateZ(0px)" }}
          className={`relative rounded-2xl ${currentPaper.bgClass} ${currentPaper.textClass} border ${currentPaper.borderClass} shadow-[0_20px_45px_-12px_rgba(180,60,100,0.2),0_1px_3px_rgba(0,0,0,0.03)] overflow-hidden transition-all duration-500`}
        >
          {/* Paper Texture */}
          <div
            className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-multiply bg-[radial-gradient(#800020_1px,transparent_1px)] [background-size:10px_10px]"
            aria-hidden="true"
          />

          {/* Peeking Stationery Card */}
          <div className="relative pt-4 px-5 pb-3 bg-gradient-to-b from-white/70 to-transparent border-b border-rose-900/10 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent" />
            <div className="flex items-center justify-between text-[10px] opacity-70 uppercase tracking-widest font-sans mb-1">
              <span className="flex items-center gap-1.5">
                <span className="text-rose-400">✦</span>
                <span>Personalized Valentine</span>
              </span>
              <span>No. 0214</span>
            </div>

            <p className="font-serif italic text-base sm:text-lg font-normal leading-snug">
              &ldquo;To the one who holds my heart...&rdquo;
            </p>
            <p className="font-serif text-xs opacity-75 font-normal leading-relaxed mt-1 line-clamp-1">
              Handcrafted with devotion, just for you.
            </p>
          </div>

          {/* Envelope Body */}
          <div className="relative p-5 sm:p-6">
            <div className="relative mb-3 flex items-center justify-center">
              {/* Dynamic Ribbon Band */}
              <div
                className={`absolute inset-x-[-24px] h-7 bg-gradient-to-r ${currentRibbon.gradientClass} shadow-sm flex items-center justify-between px-6 transition-all duration-500`}
              >
                <div className={`absolute top-0 inset-x-0 h-[1px] ${currentRibbon.stitchClass}`} />
                <div className={`absolute bottom-0 inset-x-0 h-[1px] ${currentRibbon.stitchClass}`} />
                <span className="text-[9px] uppercase tracking-[0.22em] font-sans font-medium text-white/90">
                  SEALED
                </span>
                <span className="text-[9px] uppercase tracking-[0.22em] font-sans font-medium text-white/90">
                  WITH LOVE
                </span>
              </div>

              {/* Dynamic Wax Seal */}
              <div
                className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br ${currentSeal.gradientClass} border-2 ${currentSeal.borderClass} shadow-[0_4px_14px_rgba(0,0,0,0.35),inset_0_2px_4px_rgba(255,255,255,0.35)] group-hover:scale-105 transition-all duration-300`}
              >
                <div className="absolute inset-0.5 rounded-full border border-black/20" />
                <span className="text-base select-none filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]">
                  {currentSeal.emblem}
                </span>
              </div>
            </div>

            {/* Prompt */}
            <div className="mt-4 pt-1 flex items-center justify-between text-[11px] opacity-75 font-sans">
              <span className="flex items-center gap-1.5 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 inline-block animate-pulse" />
                {interactive ? "Tap to open letter" : "Sealed with devotion"}
              </span>
              <span className="font-serif italic text-xs font-medium group-hover:translate-x-0.5 transition-transform">
                Forever yours &rarr;
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
