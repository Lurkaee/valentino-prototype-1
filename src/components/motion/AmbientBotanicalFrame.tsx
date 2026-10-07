"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export type BotanicalTone = "light" | "warm" | "dusk" | "dark" | "meadow" | "ocean";

export interface AmbientBotanicalFrameProps {
  variant?: BotanicalTone;
  side?: "left" | "right" | "both";
  density?: "sparse" | "subtle" | "rich";
  intensity?: number;
  className?: string;
  triggerSelector?: string;
}

interface Palette {
  stemStroke: string;
  stemOpacity: number;
  leafFill: string;
  leafOpacity: number;
  flowerFill: string;
  flowerStroke: string;
  flowerOpacity: number;
}

const PALETTES: Record<BotanicalTone, Palette> = {
  // Cloud Nine: very fine pale morning branch / soft rose-white silhouette
  light: {
    stemStroke: "#C084FC",
    stemOpacity: 0.28,
    leafFill: "#E879F9",
    leafOpacity: 0.22,
    flowerFill: "#FDF4FF",
    flowerStroke: "#D946EF",
    flowerOpacity: 0.35,
  },
  // Apricot Film: dried golden stem / sun-faded wildflower / amber ochre
  warm: {
    stemStroke: "#D97706",
    stemOpacity: 0.35,
    leafFill: "#F59E0B",
    leafOpacity: 0.28,
    flowerFill: "#FEF3C7",
    flowerStroke: "#B45309",
    flowerOpacity: 0.4,
  },
  // Midnight Rose / Dusk stationery: deep antique crimson / dried vintage burgundy
  dusk: {
    stemStroke: "#881337",
    stemOpacity: 0.38,
    leafFill: "#9F1239",
    leafOpacity: 0.3,
    flowerFill: "#FFE4E6",
    flowerStroke: "#BE123C",
    flowerOpacity: 0.42,
  },
  // Kage: ink-brush branch / Japanese garden moss / sumi silhouette
  dark: {
    stemStroke: "#065F46",
    stemOpacity: 0.36,
    leafFill: "#047857",
    leafOpacity: 0.28,
    flowerFill: "#D1FAE5",
    flowerStroke: "#064E3B",
    flowerOpacity: 0.35,
  },
  // Wildflower Paper: pressed meadow stems / delicate dried foliage
  meadow: {
    stemStroke: "#78350F",
    stemOpacity: 0.32,
    leafFill: "#92400E",
    leafOpacity: 0.25,
    flowerFill: "#FEF9C3",
    flowerStroke: "#A16207",
    flowerOpacity: 0.38,
  },
  // Ocean Letter: faint sea-grass / washed coastal botanical silhouette
  ocean: {
    stemStroke: "#0369A1",
    stemOpacity: 0.34,
    leafFill: "#0284C7",
    leafOpacity: 0.25,
    flowerFill: "#E0F2FE",
    flowerStroke: "#075985",
    flowerOpacity: 0.38,
  },
};

/**
 * AmbientBotanicalFrame (Phase 6.7.4):
 *
 * A reusable visual primitive establishing peripheral edge presence.
 * Botanicals are NOT borders:
 * - Slender, asymmetric stems entering from beyond the viewport edges.
 * - Leaves emerge along the scroll path; tiny pressed buds settle quietly.
 * - Presentation-only: non-interactive (pointer-events-none, select-none, aria-hidden).
 * - Clamped to outer negative space so headings and interactive content never collide.
 */
export function AmbientBotanicalFrame({
  variant = "dusk",
  side = "both",
  density = "subtle",
  intensity = 1,
  className = "",
  triggerSelector,
}: AmbientBotanicalFrameProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftStemRef = useRef<SVGSVGElement>(null);
  const rightStemRef = useRef<SVGSVGElement>(null);
  const leftLeavesRef = useRef<SVGGElement>(null);
  const rightLeavesRef = useRef<SVGGElement>(null);
  const leftBloomsRef = useRef<SVGGElement>(null);
  const rightBloomsRef = useRef<SVGGElement>(null);

  const palette = PALETTES[variant] || PALETTES.dusk;

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const animatedElements = [
        leftStemRef.current,
        rightStemRef.current,
        leftLeavesRef.current,
        rightLeavesRef.current,
        leftBloomsRef.current,
        rightBloomsRef.current,
      ].filter(Boolean);

      if (prefersReduced) {
        gsap.set(animatedElements, { opacity: 0.75 * intensity, scale: 1 });
        return;
      }

      // Initial state: Dormant beyond edges
      if (leftStemRef.current) {
        gsap.set(leftStemRef.current, {
          opacity: 0.1 * intensity,
          x: -20,
          scaleY: 0.8,
          transformOrigin: "bottom left",
        });
      }

      if (rightStemRef.current) {
        gsap.set(rightStemRef.current, {
          opacity: 0.08 * intensity,
          x: 20,
          scaleY: 0.82,
          transformOrigin: "top right",
        });
      }

      if (leftLeavesRef.current) {
        gsap.set(leftLeavesRef.current, { opacity: 0, scale: 0.6, transformOrigin: "center" });
      }
      if (rightLeavesRef.current) {
        gsap.set(rightLeavesRef.current, { opacity: 0, scale: 0.6, transformOrigin: "center" });
      }
      if (leftBloomsRef.current) {
        gsap.set(leftBloomsRef.current, { opacity: 0, scale: 0.4, transformOrigin: "center" });
      }
      if (rightBloomsRef.current) {
        gsap.set(rightBloomsRef.current, { opacity: 0, scale: 0.4, transformOrigin: "center" });
      }

      const triggerTarget = triggerSelector
        ? document.querySelector(triggerSelector) || containerRef.current
        : containerRef.current;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerTarget as HTMLElement,
          start: "top 85%",
          end: "bottom 75%",
          scrub: 1.4,
        },
      });

      // 0–35%: Stems quietly enter peripheral space
      if (leftStemRef.current || rightStemRef.current) {
        tl.to(
          [leftStemRef.current, rightStemRef.current].filter(Boolean),
          {
            opacity: 0.55 * intensity,
            x: 0,
            scaleY: 0.95,
            duration: 0.35,
            ease: "power1.out",
          }
        );
      }

      // 35–65%: Organic leaves emerge from nodes
      if (leftLeavesRef.current || rightLeavesRef.current) {
        tl.to(
          [leftLeavesRef.current, rightLeavesRef.current].filter(Boolean),
          {
            opacity: 0.85 * intensity,
            scale: 0.95,
            duration: 0.3,
            ease: "power2.out",
          },
          "-=0.1"
        );
      }

      // 65–90%: Stems fully reach, pressed blossoms quietly unfold
      if (leftStemRef.current || rightStemRef.current) {
        tl.to(
          [leftStemRef.current, rightStemRef.current].filter(Boolean),
          {
            opacity: 0.8 * intensity,
            scaleY: 1,
            duration: 0.25,
            ease: "power1.out",
          },
          "-=0.15"
        );
      }

      if (leftBloomsRef.current || rightBloomsRef.current) {
        tl.to(
          [leftBloomsRef.current, rightBloomsRef.current].filter(Boolean),
          {
            opacity: 0.95 * intensity,
            scale: 1,
            duration: 0.25,
            ease: "back.out(1.1)",
          },
          "-=0.2"
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [intensity, triggerSelector]);

  const showLeft = side === "left" || side === "both";
  const showRight = side === "right" || side === "both";

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none select-none overflow-hidden z-10 ${className}`}
      aria-hidden="true"
    >
      {/* ======================================================================= */}
      {/* LEFT PERIPHERAL BRANCH: Entering from lower-left beyond viewport bounds */}
      {/* ======================================================================= */}
      {showLeft && (
        <div className="absolute top-0 bottom-0 left-0 w-20 sm:w-36 md:w-52 max-w-[28vw] lg:max-w-[18vw] flex items-center justify-start">
          <svg
            ref={leftStemRef}
            viewBox="0 0 160 520"
            fill="none"
            className="w-full h-full max-h-[640px] object-contain will-change-transform"
          >
            {/* Primary organic vine stem climbing from offscreen bottom-left */}
            <path
              d="M-15 530 C 18 430, 14 360, 32 290 C 46 230, 24 165, 42 95 C 52 50, 28 10, 38 -15"
              stroke={palette.stemStroke}
              strokeOpacity={palette.stemOpacity * intensity}
              strokeWidth="1.4"
              strokeLinecap="round"
            />

            {/* Asymmetric secondary offshoots */}
            <path
              d="M24 330 C 45 315, 62 322, 75 305"
              stroke={palette.stemStroke}
              strokeOpacity={palette.stemOpacity * 0.75 * intensity}
              strokeWidth="1"
              strokeLinecap="round"
            />
            <path
              d="M34 220 C 56 205, 68 215, 82 195"
              stroke={palette.stemStroke}
              strokeOpacity={palette.stemOpacity * 0.75 * intensity}
              strokeWidth="1"
              strokeLinecap="round"
            />
            {density === "rich" && (
              <path
                d="M40 125 C 60 110, 72 118, 88 102"
                stroke={palette.stemStroke}
                strokeOpacity={palette.stemOpacity * 0.7 * intensity}
                strokeWidth="0.9"
                strokeLinecap="round"
              />
            )}

            {/* Uneven organic leaves */}
            <g
              ref={leftLeavesRef}
              fill={palette.leafFill}
              fillOpacity={palette.leafOpacity * intensity}
              stroke={palette.stemStroke}
              strokeOpacity={palette.stemOpacity * 0.9 * intensity}
              strokeWidth="0.8"
            >
              {/* Lower node leaves */}
              <path d="M26 385 C 42 375, 48 392, 30 400 C 22 396, 24 388, 26 385 Z" />
              <path d="M75 305 C 92 298, 96 312, 78 318 C 72 314, 73 308, 75 305 Z" />
              {/* Mid node leaves */}
              <path d="M38 250 C 58 240, 62 258, 42 265 C 34 260, 36 252, 38 250 Z" />
              <path d="M82 195 C 100 188, 104 202, 85 208 C 79 204, 80 198, 82 195 Z" />
              {/* Upper node leaves */}
              <path d="M41 150 C 55 142, 60 156, 45 162 C 38 158, 39 152, 41 150 Z" />
              {density !== "sparse" && (
                <path d="M42 65 C 56 55, 62 70, 46 76 C 40 72, 40 67, 42 65 Z" />
              )}
            </g>

            {/* Tiny pressed blossoms & unopened buds */}
            <g ref={leftBloomsRef}>
              {/* Bud at branch tip */}
              <circle
                cx="75"
                cy="305"
                r="2.2"
                fill={palette.flowerFill}
                fillOpacity={palette.flowerOpacity * intensity}
                stroke={palette.flowerStroke}
                strokeWidth="0.8"
              />
              {/* Pressed 4-petal wildflower at mid branch */}
              <g transform="translate(84, 195) scale(0.7)">
                <path
                  d="M0 -1 C -2 -5, -1.8 -8, 0 -9.5 C 1.8 -8, 2 -5, 0 -1 Z"
                  fill={palette.flowerFill}
                  fillOpacity={palette.flowerOpacity * intensity}
                  stroke={palette.flowerStroke}
                  strokeWidth="0.75"
                />
                <path
                  d="M1 0 C 5 -2, 8 -1.8, 9.5 0 C 8 1.8, 5 2, 1 0 Z"
                  fill={palette.flowerFill}
                  fillOpacity={palette.flowerOpacity * intensity}
                  stroke={palette.flowerStroke}
                  strokeWidth="0.75"
                />
                <path
                  d="M0 1 C 2 5, 1.8 8, 0 9.5 C -1.8 8, -2 5, 0 1 Z"
                  fill={palette.flowerFill}
                  fillOpacity={palette.flowerOpacity * intensity}
                  stroke={palette.flowerStroke}
                  strokeWidth="0.75"
                />
                <path
                  d="M-1 0 C -5 2, -8 1.8, -9.5 0 C -8 -1.8, -5 -2, -1 0 Z"
                  fill={palette.flowerFill}
                  fillOpacity={palette.flowerOpacity * intensity}
                  stroke={palette.flowerStroke}
                  strokeWidth="0.75"
                />
                <circle cx="0" cy="0" r="1.4" fill={palette.flowerStroke} />
              </g>
            </g>
          </svg>
        </div>
      )}

      {/* ======================================================================= */}
      {/* RIGHT PERIPHERAL BRANCH: Entering from mid-to-upper right, distinctly   */}
      {/* different trajectory — NEVER mirrored, purely asymmetric                */}
      {/* ======================================================================= */}
      {showRight && (
        <div className="absolute top-0 bottom-0 right-0 w-20 sm:w-36 md:w-48 max-w-[28vw] lg:max-w-[16vw] flex items-center justify-end">
          <svg
            ref={rightStemRef}
            viewBox="0 0 150 480"
            fill="none"
            className="w-full h-full max-h-[580px] object-contain will-change-transform"
          >
            {/* Arching branch entering from upper-right offscreen */}
            <path
              d="M165 -10 C 130 50, 118 120, 102 190 C 88 255, 112 320, 92 390 C 80 435, 96 470, 88 495"
              stroke={palette.stemStroke}
              strokeOpacity={palette.stemOpacity * 0.9 * intensity}
              strokeWidth="1.3"
              strokeLinecap="round"
            />

            {/* Asymmetric branchlet reaching inward */}
            <path
              d="M102 190 C 80 205, 64 195, 48 215"
              stroke={palette.stemStroke}
              strokeOpacity={palette.stemOpacity * 0.7 * intensity}
              strokeWidth="0.95"
              strokeLinecap="round"
            />
            {density !== "sparse" && (
              <path
                d="M112 110 C 92 120, 84 112, 70 128"
                stroke={palette.stemStroke}
                strokeOpacity={palette.stemOpacity * 0.65 * intensity}
                strokeWidth="0.9"
                strokeLinecap="round"
              />
            )}

            {/* Leaves on right branch */}
            <g
              ref={rightLeavesRef}
              fill={palette.leafFill}
              fillOpacity={palette.leafOpacity * intensity}
              stroke={palette.stemStroke}
              strokeOpacity={palette.stemOpacity * 0.85 * intensity}
              strokeWidth="0.75"
            >
              <path d="M110 75 C 94 68, 88 84, 104 90 C 110 88, 110 80, 110 75 Z" />
              <path d="M48 215 C 32 208, 28 222, 45 228 C 51 224, 50 218, 48 215 Z" />
              <path d="M96 290 C 78 282, 74 298, 92 305 C 98 300, 98 294, 96 290 Z" />
              <path d="M92 390 C 74 382, 70 398, 88 405 C 94 400, 94 394, 92 390 Z" />
            </g>

            {/* Little pressed bud */}
            <g ref={rightBloomsRef}>
              <circle
                cx="48"
                cy="215"
                r="2"
                fill={palette.flowerFill}
                fillOpacity={palette.flowerOpacity * intensity}
                stroke={palette.flowerStroke}
                strokeWidth="0.75"
              />
              {density === "rich" && (
                <circle
                  cx="70"
                  cy="128"
                  r="1.8"
                  fill={palette.flowerFill}
                  fillOpacity={palette.flowerOpacity * intensity}
                  stroke={palette.flowerStroke}
                  strokeWidth="0.7"
                />
              )}
            </g>
          </svg>
        </div>
      )}
    </div>
  );
}
