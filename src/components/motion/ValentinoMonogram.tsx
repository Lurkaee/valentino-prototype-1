"use client";

import React, { useEffect, useRef } from "react";
import { animate, createDrawable } from "animejs";
import { useReducedMotion } from "motion/react";

interface ValentinoMonogramProps {
  className?: string;
  size?: number;
}

/**
 * ValentinoMonogram:
 * Uses Anime.js v4 `createDrawable` to progressively hand-draw the signature
 * calligraphic "V" + heart flourish on initial entrance.
 * Draws once, settles quietly, and never loops continuously.
 */
export function ValentinoMonogram({ className = "", size = 36 }: ValentinoMonogramProps) {
  const shouldReduceMotion = useReducedMotion();
  const pathRef = useRef<SVGPathElement>(null);
  const heartRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    if (shouldReduceMotion || hasAnimatedRef.current) return;

    try {
      const targets = [pathRef.current, heartRef.current].filter(Boolean) as SVGPathElement[];
      if (targets.length === 0) return;

      hasAnimatedRef.current = true;
      const drawables = createDrawable(targets, 0, 0);

      // Draw the monogram path smoothly over 1400ms
      const anim = animate(drawables, {
        draw: "0 1",
        duration: 1400,
        ease: "inOutQuad",
      });

      // Subtle fade in of the ink dot at the end of the flourish
      let dotAnim: any = null;
      if (dotRef.current) {
        dotAnim = animate(dotRef.current, {
          opacity: [0, 1],
          scale: [0.3, 1],
          delay: 1100,
          duration: 400,
          ease: "outQuad",
        });
      }

      return () => {
        if (anim && typeof anim.pause === "function") anim.pause();
        if (dotAnim && typeof dotAnim.pause === "function") dotAnim.pause();
      };
    } catch {
      // Fallback gracefully if SVG rendering context differs
    }
  }, [shouldReduceMotion]);

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block select-none overflow-visible ${className}`}
      aria-label="Valentino Monogram"
    >
      {/* Subtle ambient rose glow underneath */}
      <circle cx="40" cy="40" r="30" fill="url(#monogramGlow)" opacity="0.45" />

      {/* Main Calligraphic "V" Stroke */}
      <path
        ref={pathRef}
        d="M 18,22 C 24,22 28,34 36,60 C 40,46 47,28 58,26"
        stroke="url(#roseGoldGradient)"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          strokeDasharray: shouldReduceMotion ? "none" : undefined,
          strokeDashoffset: shouldReduceMotion ? 0 : undefined,
        }}
      />

      {/* Intimate Heart Flourish flowing from the V's right arm */}
      <path
        ref={heartRef}
        d="M 58,26 C 63,22 71,24 71,32 C 71,40 60,48 50,54 C 42,48 37,42 37,34 C 37,26 44,22 49,26 C 53,30 55,34 56,36"
        stroke="url(#heartGradient)"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          strokeDasharray: shouldReduceMotion ? "none" : undefined,
          strokeDashoffset: shouldReduceMotion ? 0 : undefined,
        }}
      />

      {/* Small ink accent dot */}
      <circle
        ref={dotRef}
        cx="56"
        cy="36"
        r="2"
        fill="#FDA4AF"
        style={{
          opacity: shouldReduceMotion ? 1 : 0,
        }}
      />

      <defs>
        <radialGradient id="monogramGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#E11D48" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#BE123C" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="roseGoldGradient" x1="18" y1="22" x2="58" y2="60" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FAF8F5" />
          <stop offset="50%" stopColor="#FDA4AF" />
          <stop offset="100%" stopColor="#E11D48" />
        </linearGradient>
        <linearGradient id="heartGradient" x1="37" y1="22" x2="71" y2="54" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FDA4AF" />
          <stop offset="70%" stopColor="#E11D48" />
          <stop offset="100%" stopColor="#9F1239" />
        </linearGradient>
      </defs>
    </svg>
  );
}
