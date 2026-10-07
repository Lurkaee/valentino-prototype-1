"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * FinaleBotanicalFrame (Phase 6.7.3):
 * 
 * An atmospheric botanical framing system for the twilight resolution finale.
 * Features an asymmetric, scroll-aware living garden frame:
 * - Left edge: A slender climbing vine entering organically from bottom-left
 * - Right edge: An asymmetric distinct vine entering from mid-right
 * - Organic leaves, buds, and delicate pressed 4-petal blossoms
 * - Scroll-aware GSAP timeline:
 *     0-30%: Subtle hints / quiet dormancy
 *     30-60%: Leaves & tiny buds emerge from the edges
 *     60-85%: Stems extend further into composition
 *     85-100%: Fullest peaceful botanical state
 * - Strict mobile ergonomics: non-interactive (pointer-events-none), clamped to sides, zero horizontal scroll.
 */
export function FinaleBotanicalFrame() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftVineRef = useRef<SVGSVGElement>(null);
  const rightVineRef = useRef<SVGSVGElement>(null);
  const leftLeavesRef = useRef<SVGGElement>(null);
  const rightLeavesRef = useRef<SVGGElement>(null);
  const leftFlowersRef = useRef<SVGGElement>(null);
  const rightFlowersRef = useRef<SVGGElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Check prefers-reduced-motion
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReduced) {
        gsap.set(
          [
            leftVineRef.current,
            rightVineRef.current,
            leftLeavesRef.current,
            rightLeavesRef.current,
            leftFlowersRef.current,
            rightFlowersRef.current,
          ],
          { opacity: 0.8, scale: 1 }
        );
        return;
      }

      // Initial state: Faint hints at edge
      gsap.set(leftVineRef.current, {
        opacity: 0.15,
        x: -25,
        scaleY: 0.75,
        transformOrigin: "bottom left",
      });

      gsap.set(rightVineRef.current, {
        opacity: 0.15,
        x: 25,
        scaleY: 0.75,
        transformOrigin: "bottom right",
      });

      gsap.set([leftLeavesRef.current, rightLeavesRef.current], {
        opacity: 0,
        scale: 0.5,
        transformOrigin: "center",
      });

      gsap.set([leftFlowersRef.current, rightFlowersRef.current], {
        opacity: 0,
        scale: 0.4,
        transformOrigin: "center",
      });

      // Master Scroll-tied timeline for the finale garden frame
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom 85%",
          scrub: 1.2,
        },
      });

      // 0–30%: Initial awakening — stems drift into view
      tl.to([leftVineRef.current, rightVineRef.current], {
        opacity: 0.45,
        x: 0,
        scaleY: 0.9,
        duration: 0.3,
        ease: "power1.out",
      })
      // 30–60%: Leaves slowly emerge from edges
      .to([leftLeavesRef.current, rightLeavesRef.current], {
        opacity: 0.7,
        scale: 0.85,
        duration: 0.3,
        ease: "power2.out",
      }, "-=0.1")
      // 60–85%: Vines extend further, blossoms unfold
      .to([leftVineRef.current, rightVineRef.current], {
        opacity: 0.85,
        scaleY: 1,
        duration: 0.25,
        ease: "power1.out",
      }, "-=0.1")
      .to([leftFlowersRef.current, rightFlowersRef.current], {
        opacity: 0.9,
        scale: 1,
        duration: 0.25,
        ease: "back.out(1.2)",
      }, "-=0.15")
      // 85–100%: Frame reaches fullest harmonious botanical state
      .to([leftLeavesRef.current, rightLeavesRef.current], {
        opacity: 0.95,
        scale: 1,
        duration: 0.15,
        ease: "power1.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none select-none overflow-hidden z-10"
      aria-hidden="true"
    >
      {/* ========================================================================= */}
      {/* LEFT BOTANICAL VINE: Slender climbing vine from outer edge                 */}
      {/* Organic stem, asymmetrically branching leaves, wild 4-petal pressed petals */}
      {/* ========================================================================= */}
      <div className="absolute top-0 bottom-0 left-0 w-24 sm:w-44 md:w-60 max-w-[32vw] flex items-center justify-start">
        <svg
          ref={leftVineRef}
          viewBox="0 0 200 600"
          fill="none"
          className="w-full h-full max-h-[750px] object-contain opacity-80 will-change-transform"
        >
          {/* Main Climbing Vine Stem */}
          <path
            d="M-20 620 C 15 520, 20 440, 38 360 C 52 295, 28 220, 48 140 C 62 85, 30 20, 50 -20"
            stroke="#881337"
            strokeOpacity="0.45"
            strokeWidth="1.75"
            strokeLinecap="round"
          />

          {/* Secondary Delicate Branchlets */}
          <path
            d="M38 360 C 58 340, 80 345, 95 330"
            stroke="#881337"
            strokeOpacity="0.35"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <path
            d="M48 140 C 70 125, 90 135, 110 115"
            stroke="#881337"
            strokeOpacity="0.35"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <path
            d="M32 460 C 50 450, 70 460, 82 445"
            stroke="#881337"
            strokeOpacity="0.3"
            strokeWidth="1.1"
            strokeLinecap="round"
          />

          {/* Organic Leaves Group */}
          <g ref={leftLeavesRef} className="will-change-transform">
            {/* Lower branch leaves */}
            <path
              d="M72 450 C 85 440, 95 445, 98 440 C 95 455, 82 458, 72 450 Z"
              fill="#9F1239"
              fillOpacity="0.32"
              stroke="#881337"
              strokeWidth="0.8"
            />
            <path
              d="M30 490 C 45 480, 55 488, 62 480 C 55 498, 40 500, 30 490 Z"
              fill="#BE123C"
              fillOpacity="0.25"
              stroke="#881337"
              strokeWidth="0.75"
            />

            {/* Mid-stem leaves */}
            <path
              d="M90 335 C 105 320, 120 325, 125 318 C 118 335, 102 342, 90 335 Z"
              fill="#9F1239"
              fillOpacity="0.38"
              stroke="#701A36"
              strokeWidth="0.9"
            />
            <path
              d="M42 320 C 30 300, 35 285, 30 275 C 45 285, 52 305, 42 320 Z"
              fill="#BE123C"
              fillOpacity="0.28"
              stroke="#881337"
              strokeWidth="0.75"
            />

            {/* Upper stem leaves & buds */}
            <path
              d="M102 120 C 118 105, 132 110, 138 102 C 130 120, 115 128, 102 120 Z"
              fill="#9F1239"
              fillOpacity="0.35"
              stroke="#701A36"
              strokeWidth="0.85"
            />
            <path
              d="M46 170 C 32 155, 38 140, 34 130 C 48 140, 56 160, 46 170 Z"
              fill="#BE123C"
              fillOpacity="0.28"
              stroke="#881337"
              strokeWidth="0.75"
            />

            {/* Delicate Tip Buds */}
            <ellipse cx="50" cy="-10" rx="3" ry="5" fill="#BE123C" fillOpacity="0.4" transform="rotate(25 50 -10)" />
            <ellipse cx="56" cy="40" rx="2.5" ry="4" fill="#9F1239" fillOpacity="0.35" transform="rotate(-15 56 40)" />
          </g>

          {/* Wild Pressed Four-Petal Botanical Blossoms */}
          <g ref={leftFlowersRef} className="will-change-transform">
            {/* Blossom 1 (Mid-vine feature) */}
            <g transform="translate(98, 328)">
              <ellipse cx="0" cy="-6" rx="3.5" ry="5.5" fill="#E11D48" fillOpacity="0.65" />
              <ellipse cx="6" cy="0" rx="5.5" ry="3.5" fill="#BE123C" fillOpacity="0.6" />
              <ellipse cx="0" cy="6" rx="3.5" ry="5.5" fill="#E11D48" fillOpacity="0.65" />
              <ellipse cx="-6" cy="0" rx="5.5" ry="3.5" fill="#9F1239" fillOpacity="0.6" />
              <circle cx="0" cy="0" r="2" fill="#FFE4E6" stroke="#881337" strokeWidth="0.75" />
            </g>

            {/* Blossom 2 (Upper branch feature) */}
            <g transform="translate(112, 114) rotate(15)">
              <ellipse cx="0" cy="-5" rx="3" ry="4.5" fill="#E11D48" fillOpacity="0.6" />
              <ellipse cx="5" cy="0" rx="4.5" ry="3" fill="#BE123C" fillOpacity="0.55" />
              <ellipse cx="0" cy="5" rx="3" ry="4.5" fill="#E11D48" fillOpacity="0.6" />
              <ellipse cx="-5" cy="0" rx="4.5" ry="3" fill="#9F1239" fillOpacity="0.55" />
              <circle cx="0" cy="0" r="1.6" fill="#FFF1F2" stroke="#881337" strokeWidth="0.6" />
            </g>
          </g>
        </svg>
      </div>

      {/* ========================================================================= */}
      {/* RIGHT BOTANICAL VINE: Asymmetrical graceful vine from mid-right           */}
      {/* Distinct curve cadence, separate leaf rhythm, delicate botanical moments  */}
      {/* ========================================================================= */}
      <div className="absolute top-0 bottom-0 right-0 w-24 sm:w-44 md:w-60 max-w-[32vw] flex items-center justify-end">
        <svg
          ref={rightVineRef}
          viewBox="0 0 200 600"
          fill="none"
          className="w-full h-full max-h-[750px] object-contain opacity-80 will-change-transform"
        >
          {/* Main Asymmetric Vine Stem (curves differently from left) */}
          <path
            d="M220 580 C 180 500, 185 410, 162 330 C 145 270, 175 190, 155 110 C 140 50, 170 -10, 150 -30"
            stroke="#881337"
            strokeOpacity="0.45"
            strokeWidth="1.75"
            strokeLinecap="round"
          />

          {/* Asymmetrical Branchlets */}
          <path
            d="M162 330 C 140 315, 120 322, 105 305"
            stroke="#881337"
            strokeOpacity="0.35"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <path
            d="M155 110 C 130 98, 112 108, 92 92"
            stroke="#881337"
            strokeOpacity="0.35"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <path
            d="M172 450 C 150 440, 135 450, 120 435"
            stroke="#881337"
            strokeOpacity="0.3"
            strokeWidth="1.1"
            strokeLinecap="round"
          />

          {/* Organic Leaves Group */}
          <g ref={rightLeavesRef} className="will-change-transform">
            {/* Lower branch leaves */}
            <path
              d="M130 440 C 115 430, 102 435, 98 428 C 105 445, 120 450, 130 440 Z"
              fill="#9F1239"
              fillOpacity="0.35"
              stroke="#881337"
              strokeWidth="0.8"
            />
            <path
              d="M175 480 C 160 468, 152 478, 145 470 C 152 490, 168 492, 175 480 Z"
              fill="#BE123C"
              fillOpacity="0.25"
              stroke="#881337"
              strokeWidth="0.75"
            />

            {/* Mid-stem leaves */}
            <path
              d="M110 310 C 95 295, 80 300, 75 292 C 82 310, 98 318, 110 310 Z"
              fill="#9F1239"
              fillOpacity="0.38"
              stroke="#701A36"
              strokeWidth="0.9"
            />
            <path
              d="M158 290 C 170 270, 165 255, 170 245 C 155 255, 148 275, 158 290 Z"
              fill="#BE123C"
              fillOpacity="0.28"
              stroke="#881337"
              strokeWidth="0.75"
            />

            {/* Upper stem leaves & buds */}
            <path
              d="M98 96 C 82 82, 68 88, 62 80 C 70 98, 85 105, 98 96 Z"
              fill="#9F1239"
              fillOpacity="0.35"
              stroke="#701A36"
              strokeWidth="0.85"
            />
            <path
              d="M150 150 C 165 135, 158 120, 162 110 C 148 120, 140 140, 150 150 Z"
              fill="#BE123C"
              fillOpacity="0.28"
              stroke="#881337"
              strokeWidth="0.75"
            />

            {/* Asymmetric upper bud */}
            <ellipse cx="152" cy="-20" rx="2.5" ry="4.5" fill="#BE123C" fillOpacity="0.38" transform="rotate(-20 152 -20)" />
            <ellipse cx="145" cy="30" rx="3" ry="5" fill="#9F1239" fillOpacity="0.35" transform="rotate(25 145 30)" />
          </g>

          {/* Pressed Four-Petal Star Flower Feature */}
          <g ref={rightFlowersRef} className="will-change-transform">
            {/* Blossom (Mid-right graceful focal point) */}
            <g transform="translate(102, 302) rotate(-10)">
              <ellipse cx="0" cy="-5.5" rx="3.5" ry="5" fill="#E11D48" fillOpacity="0.65" />
              <ellipse cx="5.5" cy="0" rx="5" ry="3.5" fill="#BE123C" fillOpacity="0.6" />
              <ellipse cx="0" cy="5.5" rx="3.5" ry="5" fill="#E11D48" fillOpacity="0.65" />
              <ellipse cx="-5.5" cy="0" rx="5" ry="3.5" fill="#9F1239" fillOpacity="0.6" />
              <circle cx="0" cy="0" r="1.8" fill="#FFF1F2" stroke="#881337" strokeWidth="0.7" />
            </g>

            {/* Blossom 2 (Upper bud cluster) */}
            <g transform="translate(90, 88) rotate(35)">
              <ellipse cx="0" cy="-4.5" rx="2.8" ry="4" fill="#E11D48" fillOpacity="0.55" />
              <ellipse cx="4.5" cy="0" rx="4" ry="2.8" fill="#BE123C" fillOpacity="0.5" />
              <ellipse cx="0" cy="4.5" rx="2.8" ry="4" fill="#E11D48" fillOpacity="0.55" />
              <ellipse cx="-4.5" cy="0" rx="4" ry="2.8" fill="#9F1239" fillOpacity="0.5" />
              <circle cx="0" cy="0" r="1.4" fill="#FFE4E6" stroke="#881337" strokeWidth="0.6" />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}
