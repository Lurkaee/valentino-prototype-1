"use client";

import React, { useState, useRef, useCallback } from "react";
import { motion, useReducedMotion, useScroll, useTransform, useSpring } from "motion/react";
import { triggerCurtainNavigation } from "./PageCurtains";

interface LoveLetter3DProps {
  className?: string;
  onOpen?: () => void;
}

/**
 * LoveLetter3D:
 * A handcrafted romantic 3D love letter floating gently in the dreamy clouds.
 * Designed to look and feel like an authentic luxury love letter, not a SaaS card:
 * - Luxury cream paper envelope with deckled letter peeking out
 * - Satin silk ribbon with gold-stitched edges
 * - Hand-poured crimson wax seal with embossed heart
 * - Restrained idle breathing (±6px) and subtle cursor tilt (capped at ±3.5°)
 * - Soft diffused ambient rosy cloud shadow
 * - Subtle scroll-linked scale and depth dampening
 */
export function LoveLetter3D({ className = "", onOpen }: LoveLetter3DProps) {
  const shouldReduceMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);

  // Scroll depth connection
  const { scrollY } = useScroll();
  const rawScrollScale = useTransform(scrollY, [0, 500], [1, 0.96]);
  const rawScrollY = useTransform(scrollY, [0, 500], [0, 16]);
  const scrollScale = useSpring(rawScrollScale, { damping: 24, stiffness: 140 });
  const scrollYOffset = useSpring(rawScrollY, { damping: 24, stiffness: 140 });

  // Mouse tilt offsets (strictly capped at ±3.5° on X, ±4.5° on Y)
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (shouldReduceMotion || !cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) / (rect.width / 2);
      const deltaY = (e.clientY - centerY) / (rect.height / 2);

      // Restrained quiet physics: max ±3.5deg X, ±4deg Y
      const clampedX = Math.max(-3.5, Math.min(3.5, -deltaY * 3.5));
      const clampedY = Math.max(-4.0, Math.min(4.0, deltaX * 4.0));

      setRotateX(clampedX);
      setRotateY(clampedY);
    },
    [shouldReduceMotion]
  );

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  }, []);

  const handleClick = () => {
    if (onOpen) {
      onOpen();
    } else {
      triggerCurtainNavigation("/create");
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className={`relative cursor-pointer select-none group perspective-[1200px] ${className}`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
      aria-label="Romantic 3D Love Letter. Click to create your Valentine."
    >
      {/* Outer ambient rosy bloom reacting gently to hover */}
      <div
        className={`absolute -inset-6 rounded-[36px] bg-gradient-to-r from-rose-400/20 via-pink-300/30 to-amber-300/20 blur-2xl transition-opacity duration-700 pointer-events-none ${
          isHovered ? "opacity-95 scale-105" : "opacity-60"
        }`}
      />

      {/* 3D Transform Root */}
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
        style={{
          transformStyle: "preserve-3d",
          scale: shouldReduceMotion ? 1 : scrollScale,
        }}
        className="relative w-full max-w-[340px] sm:max-w-[380px] mx-auto"
      >
        {/* Layer 1: Soft Diffused Rosy Cloud Shadow */}
        <div
          style={{ transform: "translateZ(-14px)" }}
          className={`absolute inset-x-5 -bottom-4 h-10 bg-gradient-to-r from-rose-950/20 via-rose-900/30 to-rose-950/20 rounded-full blur-xl transition-all duration-500 ${
            isHovered ? "scale-110 opacity-60" : "opacity-40"
          }`}
        />

        {/* Layer 2: Handcrafted Cream Envelope & Letter Composition */}
        <div
          style={{ transform: "translateZ(0px)" }}
          className="relative rounded-2xl bg-[#FFFDF9] text-[#2C0D17] border border-[#F6E8DE] shadow-[0_20px_45px_-12px_rgba(180,60,100,0.2),0_1px_3px_rgba(0,0,0,0.03)] overflow-hidden transition-shadow duration-500 group-hover:shadow-[0_26px_55px_-10px_rgba(180,60,100,0.28)]"
        >
          {/* Subtle warm paper grain */}
          <div
            className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-multiply bg-[radial-gradient(#800020_1px,transparent_1px)] [background-size:10px_10px]"
            aria-hidden="true"
          />

          {/* Peeking Luxury Letter Card (protruding from inside envelope) */}
          <div className="relative pt-4 px-5 pb-3 bg-gradient-to-b from-[#FFFDF8] to-[#FFF8F0] border-b border-[#EFE2D4] shadow-[0_2px_8px_rgba(0,0,0,0.03)]">
            {/* Top gold foil accent */}
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent" />
            
            <div className="flex items-center justify-between text-[10px] text-[#9E6476] uppercase tracking-widest font-sans mb-1">
              <span className="flex items-center gap-1.5">
                <span className="text-rose-400">✦</span>
                <span>Private Dispatch</span>
              </span>
              <span>No. 0214</span>
            </div>

            <p className="font-serif italic text-base sm:text-lg text-[#2A0615] font-normal leading-snug">
              &ldquo;To the one who holds my heart...&rdquo;
            </p>
            <p className="font-serif text-xs text-[#521731]/80 font-normal leading-relaxed mt-1 line-clamp-1">
              Every sunrise is brighter because you are in my world.
            </p>
          </div>

          {/* Envelope Pocket Body */}
          <div className="relative p-5 sm:p-6 bg-[#FFFDF9]">
            {/* Triangular Envelope Flap Crease & Shadows */}
            <div className="relative mb-3 flex items-center justify-center">
              {/* Satin Crimson Ribbon band running across */}
              <div className="absolute inset-x-[-24px] h-7 bg-gradient-to-r from-[#9F1239] via-[#E11D48] to-[#9F1239] shadow-sm flex items-center justify-between px-6">
                <div className="absolute top-0 inset-x-0 h-[1px] bg-[#FDE68A]/70" />
                <div className="absolute bottom-0 inset-x-0 h-[1px] bg-[#FDE68A]/70" />
                <span className="text-[9px] uppercase tracking-[0.22em] font-sans font-medium text-rose-100/80">
                  SEALED
                </span>
                <span className="text-[9px] uppercase tracking-[0.22em] font-sans font-medium text-rose-100/80">
                  WITH LOVE
                </span>
              </div>

              {/* Hand-Poured Crimson Wax Seal with Embossed Heart */}
              <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-[#E11D48] via-[#BE123C] to-[#6B0C23] border-2 border-[#FCA5A5]/80 shadow-[0_4px_14px_rgba(159,18,57,0.4),inset_0_2px_4px_rgba(255,255,255,0.35)] group-hover:scale-105 transition-transform duration-300">
                {/* Organic wax lip ripple */}
                <div className="absolute inset-0.5 rounded-full border border-rose-900/40" />
                <span className="text-base select-none filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]">
                  💖
                </span>
              </div>
            </div>

            {/* Envelope Footnote Prompt */}
            <div className="mt-4 pt-1 flex items-center justify-between text-[11px] text-[#7A334B] font-sans">
              <span className="flex items-center gap-1.5 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 inline-block animate-pulse" />
                Tap to open letter
              </span>
              <span className="font-serif italic text-xs text-[#3E091E] font-medium group-hover:translate-x-0.5 transition-transform">
                Forever yours &rarr;
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
