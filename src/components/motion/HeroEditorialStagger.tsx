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
  eyebrow = "The Romantic Experience Platform · A Private Sanctuary",
  headline = "Create something they'll remember.",
  subtitle = "Valentino is an intimate digital art experience crafted for the person who means everything to you — complete with starlight letters, shared memories, relationship milestones, and dimensional worlds.",
  primaryCtaText = "Begin Their World",
  primaryCtaHref = "/create",
  secondaryCtaText = "Explore Templates",
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
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
        delayChildren: shouldReduceMotion ? 0 : 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : 14,
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
      className="w-full flex flex-col items-center text-center relative z-10 max-w-4xl mx-auto"
    >
      {/* 1. Restrained Editorial Eyebrow */}
      <motion.div variants={itemVariants} className="mb-4">
        <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/70 border border-rose-900/10 text-[#6B1D36] text-[11px] uppercase tracking-[0.22em] font-medium backdrop-blur-sm shadow-[0_2px_8px_rgba(0,0,0,0.03)]">
          <span className="text-[10px] text-rose-500">✦</span>
          <span>{eyebrow}</span>
          <span className="text-[10px] text-rose-500">✦</span>
        </span>
      </motion.div>

      {/* 2. Oversized Editorial Headline */}
      <motion.h1
        variants={itemVariants}
        className="text-4xl sm:text-6xl lg:text-7xl font-serif font-normal text-[#2A0615] tracking-tight leading-[1.08] max-w-3xl mb-4 sm:mb-5"
      >
        <span>Create something </span>
        <span className="italic font-normal bg-gradient-to-r from-[#9F1239] via-[#BE185D] to-[#881337] bg-clip-text text-transparent">
          they&apos;ll remember.
        </span>
      </motion.h1>

      {/* 3. Editorial Subtitle */}
      <motion.p
        variants={itemVariants}
        className="text-sm sm:text-base lg:text-lg text-[#521731]/85 font-light leading-relaxed max-w-xl mb-7 sm:mb-8"
      >
        {subtitle}
      </motion.p>

      {/* 4. Tactile Editorial CTAs */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto mb-2"
      >
        <Link href={primaryCtaHref} className="w-full sm:w-auto">
          <button
            type="button"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full font-medium text-white bg-[#260514] hover:bg-[#38071E] active:scale-[0.98] transition-all duration-200 border border-white/15 shadow-[0_8px_20px_-6px_rgba(40,5,20,0.35)] flex items-center justify-center gap-2 cursor-pointer group"
          >
            <span className="tracking-wide text-sm">{primaryCtaText}</span>
            <svg
              className="w-4 h-4 text-rose-300 transition-transform duration-200 group-hover:translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </Link>

        <Link href={secondaryCtaHref} className="w-full sm:w-auto">
          <button
            type="button"
            className="w-full sm:w-auto px-7 py-3.5 rounded-full font-medium text-[#4A0E2E] hover:text-[#2A0615] bg-white/70 hover:bg-white/90 active:scale-[0.98] transition-all duration-200 border border-rose-900/10 shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex items-center justify-center gap-2 cursor-pointer text-sm tracking-wide"
          >
            <span>{secondaryCtaText}</span>
          </button>
        </Link>
      </motion.div>
    </motion.div>
  );
}
