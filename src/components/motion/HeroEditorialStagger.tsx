"use client";

import { motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { motionTheme } from "@/lib/motion-theme";
import { CurtainLink } from "@/components/motion/PageCurtains";

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
 * HeroEditorialStagger:
 * Editorial romantic typography and tactile CTAs with soft warm tones.
 * Designed with tight, intentional vertical flow so the floating 3D love letter
 * is visible immediately in the first viewport.
 */
export function HeroEditorialStagger({
  eyebrow = "A private digital love letter",
  headline = "Create something they'll remember.",
  subtitle = "An intimate, beautifully crafted web experience for someone you cherish. Choose a template, write what's in your heart, and seal it with love.",
  primaryCtaText = "Create Your Valentine",
  primaryCtaHref = "/create",
  secondaryCtaText = "Explore Templates",
  secondaryCtaHref = "/templates",
}: HeroEditorialStaggerProps) {
  const shouldReduceMotion = useReducedMotion();

  // Split headline for responsive editorial line reveal
  const headlineWords = headline.split(" ");
  const line1 = headlineWords.slice(0, 2).join(" "); // "Create something"
  const line2 = headlineWords.slice(2).join(" "); // "they'll remember."

  const containerVariants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : 16,
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

  const maskLineVariants = {
    hidden: {
      y: shouldReduceMotion ? "0%" : "105%",
      opacity: shouldReduceMotion ? 1 : 0,
    },
    visible: {
      y: "0%",
      opacity: 1,
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
      className="w-full flex flex-col items-center text-center relative z-10"
    >
      {/* 1. Intimate Eyebrow Pill */}
      <motion.div variants={itemVariants} className="mb-3.5 sm:mb-4">
        <Badge
          variant="rose"
          size="md"
          className="tracking-[0.16em] uppercase text-[11px] font-medium px-4 py-1.5 bg-white/75 border border-rose-300/80 text-[#831843] shadow-[0_4px_16px_rgba(230,120,160,0.18)] backdrop-blur-md"
        >
          <span>✦</span>
          <span>{eyebrow}</span>
          <span>✦</span>
        </Badge>
      </motion.div>

      {/* 2. Romantic Headline: Deep warm plum with sunset rose/magenta highlight */}
      <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-medium text-[#240412] tracking-tight leading-[1.12] max-w-3xl mb-3 sm:mb-4">
        <span className="block overflow-hidden py-0.5">
          <motion.span
            variants={maskLineVariants}
            className="inline-block will-change-transform"
          >
            {line1}{" "}
          </motion.span>
        </span>
        <span className="block overflow-hidden py-0.5">
          <motion.span
            variants={maskLineVariants}
            className="inline-block will-change-transform italic font-normal bg-gradient-to-r from-[#9F1239] via-[#C026D3] to-[#E11D48] bg-clip-text text-transparent"
          >
            {line2}
          </motion.span>
        </span>
      </h1>

      {/* 3. Intimate Subtitle Copy */}
      <motion.p
        variants={itemVariants}
        className="text-sm sm:text-base lg:text-lg text-[#3B071A] font-normal leading-relaxed max-w-xl mb-6 sm:mb-7"
      >
        {subtitle}
      </motion.p>

      {/* 4. Tactile Romantic Primary and Secondary CTAs */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto mb-2"
      >
        <CurtainLink href={primaryCtaHref} className="w-full sm:w-auto">
          <Button
            size="lg"
            variant="primary"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full font-medium text-white bg-gradient-to-r from-[#E11D48] via-[#F43F5E] to-[#FB7185] shadow-[0_10px_25px_rgba(225,29,72,0.35)] hover:shadow-[0_14px_32px_rgba(225,29,72,0.45)] hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 border border-white/30"
          >
            <span>{primaryCtaText}</span>
            <span className="text-sm">💌</span>
          </Button>
        </CurtainLink>

        <CurtainLink href={secondaryCtaHref} className="w-full sm:w-auto">
          <Button
            size="lg"
            variant="ghost"
            className="w-full sm:w-auto px-6 py-3.5 rounded-full font-semibold !text-[#4A0E2E] hover:!text-[#881337] bg-white/70 hover:bg-white/95 active:scale-[0.98] transition-all duration-200 border border-rose-300/60 shadow-[0_4px_12px_rgba(200,100,130,0.12)]"
          >
            <span>{secondaryCtaText}</span>
            <span className="text-xs">&rarr;</span>
          </Button>
        </CurtainLink>
      </motion.div>
    </motion.div>
  );
}
