"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

export interface Envelope3DProps {
  isSealed: boolean;
  onUnseal: () => void;
  sealEmblem?: React.ReactNode;
  sealGradientClass?: string;
  sealBorderClass?: string;
  sealHaloClass?: string;
  sealBezelClass?: string;
  sealId?: string;
  ribbonGradientClass?: string;
  ribbonStitchClass?: string;
  ribbonTextLeft?: string;
  ribbonTextRight?: string;
  ribbonId?: string;
  paperId?: string;
  envelopeBgClass?: string;
  envelopeBorderClass?: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Envelope3D:
 * Shared tactile physical envelope primitive using lightweight CSS 3D and Motion states.
 *
 * Sequence:
 * Idle (breathing halo) -> Hover/Focus (subtle compression) -> Press/Tap (scale down)
 * -> Seal breaks -> Flap swings open (180deg) -> Letter emerges & unfolds into reading canvas.
 *
 * Accessibility:
 * - Direct unsealed state when prefers-reduced-motion is active.
 * - Keyboard accessible (Enter & Space trigger unseal).
 * - Mobile-safe constraints preventing viewport overflow or scroll hijacking.
 */
export function Envelope3D({
  isSealed,
  onUnseal,
  sealEmblem = "💌",
  sealGradientClass = "from-rose-600 via-rose-700 to-[#7A1428]",
  sealBorderClass = "border-rose-400/80",
  sealHaloClass = "bg-rose-500/25",
  sealBezelClass = "border-white/30 bg-black/15",
  sealId,
  ribbonGradientClass = "from-rose-700 via-rose-800 to-rose-950",
  ribbonStitchClass = "bg-rose-400/50",
  ribbonTextLeft = "SEALED",
  ribbonTextRight = "WITH DEVOTION",
  ribbonId,
  paperId,
  envelopeBgClass = "bg-[#1C0512]/90",
  envelopeBorderClass = "border-rose-500/30",
  children,
  className = "",
}: Envelope3DProps) {
  const shouldReduceMotion = useReducedMotion();
  const [hasBroken, setHasBroken] = useState(!isSealed || Boolean(shouldReduceMotion));

  useEffect(() => {
    if (shouldReduceMotion) {
      setHasBroken(true);
      if (isSealed) {
        onUnseal();
      }
    }
  }, [shouldReduceMotion, isSealed, onUnseal]);

  useEffect(() => {
    if (isSealed && !shouldReduceMotion) {
      setHasBroken(false);
    }
  }, [isSealed, shouldReduceMotion]);

  const handleBreakSeal = () => {
    if (!hasBroken) {
      setHasBroken(true);
      onUnseal();
    }
  };

  const showSealedState = isSealed && !hasBroken && !shouldReduceMotion;

  return (
    <div
      className={`relative w-full max-w-lg mx-auto transition-all duration-700 ${className}`}
      style={{ perspective: "1200px" }}
    >
      <div
        data-decor-paper={paperId}
        className={`w-full rounded-3xl ${envelopeBgClass} backdrop-blur-2xl border ${envelopeBorderClass} p-6 sm:p-10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] transition-all duration-700 ease-out relative z-10`}
      >
        <AnimatePresence mode="wait">
          {showSealedState ? (
            <motion.div
              key="sealed-envelope"
              initial={{ opacity: 1, scale: 1 }}
              exit={{
                opacity: 0,
                scale: 0.96,
                transition: { duration: 0.4, ease: "easeInOut" },
              }}
              data-testid="seal-container"
              className="flex flex-col items-center justify-center py-10 px-4 text-center relative select-none"
            >
              {/* Ribbon Band across the envelope */}
              <div
                data-decor-ribbon={ribbonId}
                className={`absolute inset-x-[-24px] sm:inset-x-[-40px] h-9 bg-gradient-to-r ${ribbonGradientClass} shadow-md flex items-center justify-between px-8 z-0`}
              >
                <div className={`absolute top-0 inset-x-0 h-[1.5px] ${ribbonStitchClass}`} />
                <div className={`absolute bottom-0 inset-x-0 h-[1.5px] ${ribbonStitchClass}`} />
                <span className="text-[9px] uppercase tracking-[0.25em] font-sans font-medium text-white/90">
                  {ribbonTextLeft}
                </span>
                <span className="text-[9px] uppercase tracking-[0.25em] font-sans font-medium text-white/90">
                  {ribbonTextRight}
                </span>
              </div>

              {/* 3D Wax Seal Anchor */}
              <div className="relative z-10 my-4">
                {/* Ambient Breathing Halo */}
                <motion.div
                  animate={{
                    scale: [1, 1.12, 1],
                    opacity: [0.35, 0.65, 0.35],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className={`absolute -inset-4 rounded-full ${sealHaloClass} blur-xl pointer-events-none`}
                />

                <motion.button
                  type="button"
                  data-testid="wax-seal-button"
                  data-decor-seal={sealId}
                  onClick={handleBreakSeal}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleBreakSeal();
                    }
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.94 }}
                  className={`relative group flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 cursor-pointer bg-gradient-to-br ${sealGradientClass} ${sealBorderClass} shadow-[0_0_40px_rgba(225,29,72,0.45),0_14px_28px_rgba(0,0,0,0.6)] focus:outline-none focus:ring-2 focus:ring-rose-400/80`}
                  aria-label="Break the wax seal to read letter"
                >
                  {/* Debossed inner ring */}
                  <div
                    className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full border flex items-center justify-center ${sealBezelClass} shadow-inner transition-transform group-hover:scale-102`}
                  >
                    <span className="text-3xl sm:text-4xl select-none filter drop-shadow-md">
                      {sealEmblem}
                    </span>
                  </div>
                  <span className="absolute -bottom-8 text-xs text-rose-200/90 tracking-widest uppercase whitespace-nowrap font-sans font-medium">
                    Tap to open
                  </span>
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="unsealed-letter"
              initial={
                shouldReduceMotion
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 16, scale: 0.98 }
              }
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              data-testid="unsealed-letter"
              className="w-full"
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
