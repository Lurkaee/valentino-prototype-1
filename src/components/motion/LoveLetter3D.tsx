"use client";

import React, { useState, useRef, useCallback } from "react";
import { motion, useReducedMotion } from "motion/react";
import { triggerCurtainNavigation } from "./PageCurtains";

interface LoveLetter3DProps {
  className?: string;
  onOpen?: () => void;
}

/**
 * LoveLetter3D:
 * A handcrafted 3D love letter centerpiece floating above the clouds.
 * Features quiet, intimate physics:
 * - Idle: gentle breathing drift
 * - Cursor: restrained tilt capped at ±4–5°
 * - Hover: delicate translateZ lift and soft diffused shadow
 * - Click: single meaningful transition to create experience
 */
export function LoveLetter3D({ className = "", onOpen }: LoveLetter3DProps) {
  const shouldReduceMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse tilt offsets (capped at ±4° on X, ±5° on Y)
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

      // Restrained quiet physics: max ±4deg X, ±5deg Y
      const clampedX = Math.max(-4, Math.min(4, -deltaY * 4));
      const clampedY = Math.max(-5, Math.min(5, deltaX * 5));

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
      aria-label="Interactive 3D Love Letter. Click to create your Valentine."
    >
      {/* Outer ambient glow reacting to hover */}
      <div
        className={`absolute -inset-6 rounded-[36px] bg-gradient-to-r from-rose-500/20 via-pink-400/20 to-amber-400/10 blur-2xl transition-opacity duration-700 pointer-events-none ${
          isHovered ? "opacity-90 scale-105" : "opacity-40"
        }`}
      />

      {/* 3D Transform Root */}
      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : {
                y: isHovered ? -6 : [0, -4, 0],
                rotateX,
                rotateY,
                translateZ: isHovered ? 12 : 0,
              }
        }
        transition={
          shouldReduceMotion
            ? { duration: 0 }
            : {
                y: isHovered
                  ? { duration: 0.4, ease: "easeOut" }
                  : { duration: 5, repeat: Infinity, ease: "easeInOut" },
                rotateX: { duration: 0.25, ease: "easeOut" },
                rotateY: { duration: 0.25, ease: "easeOut" },
                translateZ: { duration: 0.35, ease: "easeOut" },
              }
        }
        style={{
          transformStyle: "preserve-3d",
        }}
        className="relative w-full max-w-[420px] sm:max-w-[460px] mx-auto"
      >
        {/* Layer 1: Ambient Shadow (lies beneath the envelope) */}
        <div
          style={{ transform: "translateZ(-15px)" }}
          className={`absolute inset-x-8 -bottom-4 h-12 bg-black/40 rounded-full blur-xl transition-all duration-500 ${
            isHovered ? "scale-110 opacity-60" : "opacity-35"
          }`}
        />

        {/* Layer 2: Main Cream Envelope Body */}
        <div
          style={{ transform: "translateZ(0px)" }}
          className="relative rounded-2xl p-6 sm:p-7 bg-[#FFFDF9] text-[#240B13] border border-[#F3E8DC] shadow-[0_20px_50px_-15px_rgba(40,10,20,0.35),0_0_0_1px_rgba(255,255,255,0.8)] overflow-hidden"
        >
          {/* Subtle paper grain texture overlay */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply bg-[radial-gradient(#800020_1px,transparent_1px)] [background-size:12px_12px]"
            aria-hidden="true"
          />

          {/* Top Delicate Gold Foil Border Line */}
          <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent" />

          {/* Envelope Flap Crease Visual Angle */}
          <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-[#F7F0E6]/80 to-transparent pointer-events-none" />

          {/* Letter Peeking Content */}
          <div className="relative z-10 space-y-4">
            {/* Header: Stamp & Destination */}
            <div className="flex items-center justify-between border-b border-[#E8DCCF]/70 pb-3.5">
              <div className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                <span className="text-[11px] uppercase tracking-[0.2em] text-[#8C5D6B] font-medium font-sans">
                  Private Delivery
                </span>
              </div>
              <div className="px-2.5 py-0.5 rounded border border-[#E0D0BF] bg-[#F9F4EC] text-[10px] uppercase tracking-wider text-[#A06E7D] font-mono">
                Air Mail · Special
              </div>
            </div>

            {/* Handwritten-Style Message Preview */}
            <div className="py-2 space-y-1.5">
              <p className="text-xs uppercase tracking-widest text-[#A06E7D] font-sans">
                Dearest Maya,
              </p>
              <p className="font-serif text-lg sm:text-xl text-[#2C0D17] font-medium italic leading-snug">
                &ldquo;Every quiet moment with you feels like starlight...&rdquo;
              </p>
            </div>

            {/* Bottom: Silk Ribbon Accent & Digital Wax Seal */}
            <div className="pt-3 border-t border-[#E8DCCF]/70 flex items-center justify-between">
              {/* Sign-off note */}
              <div>
                <span className="block text-[10px] uppercase tracking-wider text-[#A06E7D]">
                  With all my heart
                </span>
                <span className="font-serif text-sm font-medium text-[#7A1F3D]">
                  Yours Always
                </span>
              </div>

              {/* Crimson Wax Seal Button Moment */}
              <div className="relative flex items-center gap-2.5">
                <span className="text-[10px] text-[#A06E7D] tracking-wide font-sans group-hover:text-[#7A1F3D] transition-colors hidden sm:inline">
                  Tap to write yours
                </span>
                <div
                  style={{ transform: "translateZ(8px)" }}
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-600 via-rose-700 to-[#7A1428] border border-rose-400/80 shadow-[0_4px_12px_rgba(159,18,57,0.45)] flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                >
                  <span className="text-base select-none filter drop-shadow-sm">💌</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom subtle edge shadow */}
          <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-t from-black/[0.04] to-transparent pointer-events-none" />
        </div>
      </motion.div>
    </div>
  );
}
