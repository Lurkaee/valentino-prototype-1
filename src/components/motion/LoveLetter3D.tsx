"use client";

import React, { useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useReducedMotion } from "motion/react";
import { gsap } from "gsap";

interface LoveLetter3DProps {
  className?: string;
  onOpen?: () => void;
}

/**
 * LoveLetter3D:
 * Handcrafted romantic 3D love letter floating gently in the dreamy clouds.
 * Refactored for zero-rerender pointer physics via GSAP quickTo.
 */
export function LoveLetter3D({ className = "", onOpen }: LoveLetter3DProps) {
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (shouldReduceMotion || !cardRef.current || !tiltRef.current) return;

    const tiltEl = tiltRef.current;
    const cardEl = cardRef.current;

    // Zero-rerender high performance GSAP quickTo setters
    const setRotateX = gsap.quickTo(tiltEl, "rotateX", { duration: 0.35, ease: "power2.out" });
    const setRotateY = gsap.quickTo(tiltEl, "rotateY", { duration: 0.35, ease: "power2.out" });
    const setTranslateZ = gsap.quickTo(tiltEl, "z", { duration: 0.35, ease: "power2.out" });

    // Idle floating breathing animation
    const idleTween = gsap.to(tiltEl, {
      y: -6,
      duration: 2.8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = cardEl.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) / (rect.width / 2);
      const deltaY = (e.clientY - centerY) / (rect.height / 2);

      // Restrained quiet physics: max ±3.5deg X, ±4deg Y
      const clampedX = Math.max(-3.5, Math.min(3.5, -deltaY * 3.5));
      const clampedY = Math.max(-4.0, Math.min(4.0, deltaX * 4.0));

      setRotateX(clampedX);
      setRotateY(clampedY);
    };

    const handleMouseEnter = () => {
      setTranslateZ(8);
      if (glowRef.current) {
        gsap.to(glowRef.current, { opacity: 0.95, scale: 1.05, duration: 0.4 });
      }
    };

    const handleMouseLeave = () => {
      setRotateX(0);
      setRotateY(0);
      setTranslateZ(0);
      if (glowRef.current) {
        gsap.to(glowRef.current, { opacity: 0.5, scale: 1, duration: 0.4 });
      }
    };

    cardEl.addEventListener("mousemove", handleMouseMove);
    cardEl.addEventListener("mouseenter", handleMouseEnter);
    cardEl.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      idleTween.kill();
      cardEl.removeEventListener("mousemove", handleMouseMove);
      cardEl.removeEventListener("mouseenter", handleMouseEnter);
      cardEl.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [shouldReduceMotion]);

  const handleClick = () => {
    if (onOpen) {
      onOpen();
    } else {
      router.push("/create");
    }
  };

  return (
    <div
      ref={cardRef}
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
        ref={glowRef}
        className="absolute -inset-6 rounded-[36px] bg-gradient-to-r from-rose-400/20 via-pink-300/30 to-amber-300/20 blur-2xl opacity-50 pointer-events-none transition-transform"
      />

      {/* 3D Transform Root: zero rerender updates */}
      <div
        ref={tiltRef}
        style={{
          transformStyle: "preserve-3d",
        }}
        className="relative w-full max-w-[340px] sm:max-w-[380px] mx-auto will-change-transform"
      >
        {/* Layer 1: Soft Diffused Rosy Cloud Shadow */}
        <div
          style={{ transform: "translateZ(-14px)" }}
          className="absolute inset-x-5 -bottom-4 h-10 bg-gradient-to-r from-rose-950/20 via-rose-900/30 to-rose-950/20 rounded-full blur-xl opacity-40 transition-all duration-500 group-hover:scale-110 group-hover:opacity-60"
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

          {/* Peeking Luxury Letter Card */}
          <div className="relative pt-4 px-5 pb-3 bg-gradient-to-b from-[#FFFDF8] to-[#FFF8F0] border-b border-[#EFE2D4] shadow-[0_2px_8px_rgba(0,0,0,0.03)]">
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
              {/* Satin Crimson Ribbon band */}
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

              {/* Hand-Poured Crimson Wax Seal with Embossed Heart SVG */}
              <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-[#E11D48] via-[#BE123C] to-[#6B0C23] border-2 border-[#FCA5A5]/80 shadow-[0_4px_14px_rgba(159,18,57,0.4),inset_0_2px_4px_rgba(255,255,255,0.35)] group-hover:scale-105 transition-transform duration-300">
                <div className="absolute inset-0.5 rounded-full border border-rose-900/40" />
                <svg
                  className="w-5 h-5 text-rose-100 filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
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
      </div>
    </div>
  );
}
