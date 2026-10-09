"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { motionTheme } from "@/lib/motion-theme";

interface HeroEditorialStaggerProps {
  eyebrow?: string;
  headline?: string;
  subtitle?: string;
  primaryCtaText?: string;
  primaryCtaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
}

/**
 * HeroEditorialStagger (Phase 6 Renaissance):
 * Oversized editorial headline, restrained tactile CTAs, zero SaaS-gradient bloat,
 * and elegant SVG motifs.
 */
export function HeroEditorialStagger({
  eyebrow = "made quietly, for one person",
  headline = "Create something they'll remember.",
  subtitle = "An intimate digital art experience crafted for the person who means everything to you — complete with starlight letters, shared memories, and living worlds.",
  primaryCtaText = "Begin Their World",
  primaryCtaHref = "/create",
  secondaryCtaText = "Explore Showroom",
  secondaryCtaHref = "/templates",
}: HeroEditorialStaggerProps) {
  const shouldReduceMotion = useReducedMotion();

  // Gentle scroll exit dampening
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0.45]);
  const heroY = useTransform(scrollY, [0, 500], [0, 20]);

  const containerVariants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
        delayChildren: shouldReduceMotion ? 0 : 0.04,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : 12,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : motionTheme.editorial.duration,
        ease: motionTheme.editorial.ease,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{
        opacity: shouldReduceMotion ? 1 : heroOpacity,
        y: shouldReduceMotion ? 0 : heroY,
      }}
      className="w-full flex flex-col items-center lg:items-start text-center lg:text-left relative z-10"
    >
      {/* 1. Subtle Environmental Micro-Copy */}
      <motion.div variants={itemVariants} className="mb-4 sm:mb-5">
        <span className="inline-flex items-center px-4 py-1 rounded-full bg-white/75 border border-rose-950/15 text-[#5A142D] text-[11px] uppercase tracking-[0.26em] font-semibold backdrop-blur-sm shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
          <span>{eyebrow}</span>
          <span className="sr-only">The Romantic Experience Platform</span>
        </span>
      </motion.div>

      {/* 2. Asymmetric Editorial Headline */}
      <motion.h1
        variants={itemVariants}
        className="text-4xl sm:text-6xl lg:text-[4.25rem] xl:text-[4.75rem] font-serif font-normal text-[#1A0311] tracking-tight leading-[1.06] mb-4 sm:mb-5 drop-shadow-[0_1px_12px_rgba(255,245,248,0.5)]"
      >
        <span>Create something </span>
        <br className="hidden sm:inline" />
        <span className="italic font-normal text-[#9F1239] drop-shadow-[0_1px_8px_rgba(255,245,248,0.4)]">
          they&apos;ll remember.
        </span>
      </motion.h1>

      {/* 3. Restrained Editorial Subtitle */}
      <motion.p
        variants={itemVariants}
        className="text-sm sm:text-base lg:text-[17px] text-[#36091E] font-normal leading-relaxed max-w-lg mb-7 sm:mb-8 drop-shadow-[0_1px_8px_rgba(255,245,248,0.55)]"
      >
        {subtitle}
      </motion.p>

      {/* 4. Asymmetric Action Hierarchy: Dominant Solid Primary + Quiet Secondary */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
      >
        <Link href={primaryCtaHref} className="w-full sm:w-auto">
          <button
            type="button"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full font-medium text-white bg-[#1A0612] hover:bg-[#2C0A1E] active:scale-[0.98] transition-all duration-200 border border-white/15 shadow-[0_8px_20px_-6px_rgba(40,5,20,0.4)] flex items-center justify-center gap-2.5 cursor-pointer group"
          >
            <span className="tracking-wide text-sm">{primaryCtaText}</span>
            <svg
              className="w-4 h-4 text-rose-300 transition-transform duration-200 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </Link>

        <Link
          href={secondaryCtaHref}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#36091E] hover:text-[#1A0311] px-4 py-2 transition-colors duration-200 group"
        >
          <span className="tracking-wider">{secondaryCtaText}</span>
          <span className="transition-transform duration-200 group-hover:translate-x-0.5 text-rose-800">→</span>
        </Link>
      </motion.div>
    </motion.div>
  );
}
