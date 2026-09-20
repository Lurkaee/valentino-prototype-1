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

export function HeroEditorialStagger({
  eyebrow = "A PRIVATE DIGITAL LOVE LETTER",
  headline = "Create something they'll remember.",
  subtitle = "An intimate, beautifully crafted web experience for someone you cherish. Choose a template, write what's in your heart, and seal it with digital wax.",
  primaryCtaText = "Create Your Valentine",
  primaryCtaHref = "/create",
  secondaryCtaText = "Explore Templates",
  secondaryCtaHref = "/templates",
}: HeroEditorialStaggerProps) {
  const shouldReduceMotion = useReducedMotion();

  // Split headline for responsive editorial line-masked reveal
  // "Create something" / "they'll remember."
  const headlineWords = headline.split(" ");
  const line1 = headlineWords.slice(0, 2).join(" ");
  const line2 = headlineWords.slice(2).join(" ");

  const containerVariants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : motionTheme.stagger.medium,
        delayChildren: shouldReduceMotion ? 0 : 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : 20,
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
      y: shouldReduceMotion ? "0%" : "110%",
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
      {/* 1. Eyebrow badge enters first */}
      <motion.div variants={itemVariants} className="mb-5 sm:mb-6">
        <Badge
          variant="rose"
          size="md"
          className="tracking-[0.2em] uppercase text-[11px] font-medium px-4 py-1.5 bg-rose-950/60 border-rose-400/40 text-rose-200 shadow-md shadow-rose-950/40 backdrop-blur-md"
        >
          {eyebrow}
        </Badge>
      </motion.div>

      {/* 2. Headline reveals line-by-line using clipped upward motion */}
      <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-medium text-[#FAF8F5] tracking-tight leading-[1.15] max-w-4xl mb-5 sm:mb-6">
        <span className="block overflow-hidden py-1">
          <motion.span
            variants={maskLineVariants}
            className="inline-block will-change-transform"
          >
            {line1}{" "}
          </motion.span>
        </span>
        <span className="block overflow-hidden py-1">
          <motion.span
            variants={maskLineVariants}
            className="inline-block will-change-transform bg-gradient-to-r from-[#FAF8F5] via-[#FED7AA] to-[#FDA4AF] bg-clip-text text-transparent italic font-light"
          >
            {line2}
          </motion.span>
        </span>
      </h1>

      {/* 3. Subtitle enters smoothly after headline */}
      <motion.p
        variants={itemVariants}
        className="text-base sm:text-xl text-[#FAF8F5]/80 font-light leading-relaxed max-w-2xl mb-8 sm:mb-10"
      >
        {subtitle}
      </motion.p>

      {/* 4. Primary and secondary CTAs stagger in */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-8"
      >
        <CurtainLink href={primaryCtaHref} className="w-full sm:w-auto">
          <Button
            size="lg"
            variant="primary"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full shadow-2xl shadow-rose-950/60 hover:shadow-rose-900/80 transition-all duration-300 hover:-translate-y-0.5"
          >
            <span>{primaryCtaText}</span>
            <span className="text-sm">💌</span>
          </Button>
        </CurtainLink>
        <CurtainLink href={secondaryCtaHref} className="w-full sm:w-auto">
          <Button
            size="lg"
            variant="secondary"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border-white/15 text-[#FAF8F5] transition-all duration-300 hover:-translate-y-0.5 backdrop-blur-md"
          >
            {secondaryCtaText}
          </Button>
        </CurtainLink>
      </motion.div>

      {/* 5. Trust indicators appear last */}
      <motion.div
        variants={itemVariants}
        className="flex flex-wrap items-center justify-center gap-4 text-xs text-[#FAF8F5]/60 font-sans tracking-wide"
      >
        <span className="flex items-center gap-1.5">
          <span className="text-emerald-400">●</span> No sign-up required
        </span>
        <span className="hidden sm:inline text-white/20">·</span>
        <span className="flex items-center gap-1.5">
          <span className="text-rose-400">●</span> Private unguessable link
        </span>
        <span className="hidden sm:inline text-white/20">·</span>
        <span className="flex items-center gap-1.5">
          <span className="text-amber-400">●</span> Never indexed by search
        </span>
      </motion.div>
    </motion.div>
  );
}
