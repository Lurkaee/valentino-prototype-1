"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
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
        delayChildren: shouldReduceMotion ? 0 : 0.1,
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
      className="w-full flex flex-col items-center text-center"
    >
      {/* 1. Eyebrow badge enters first */}
      <motion.div variants={itemVariants} className="mb-6">
        <Badge variant="rose" size="md" className="tracking-widest uppercase text-[11px] font-medium">
          {eyebrow}
        </Badge>
      </motion.div>

      {/* 2. Headline reveals line-by-line using clipped upward motion */}
      <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-medium text-white tracking-tight leading-[1.15] max-w-4xl mb-6">
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
            className="inline-block will-change-transform bg-gradient-to-r from-white via-[#FAF8F5] to-rose-200/90 bg-clip-text text-transparent italic font-light"
          >
            {line2}
          </motion.span>
        </span>
      </h1>

      {/* 3. Subtitle enters smoothly after headline */}
      <motion.p
        variants={itemVariants}
        className="text-base sm:text-xl text-[#FAF8F5]/80 font-light leading-relaxed max-w-2xl mb-10"
      >
        {subtitle}
      </motion.p>

      {/* 4. Primary and secondary CTAs stagger in */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-8"
      >
        <Link href={primaryCtaHref} className="w-full sm:w-auto">
          <Button
            size="lg"
            variant="primary"
            className="w-full sm:w-auto px-8 shadow-2xl shadow-rose-950/50 hover:shadow-rose-900/60 transition-shadow"
          >
            {primaryCtaText}
          </Button>
        </Link>
        <Link href={secondaryCtaHref} className="w-full sm:w-auto">
          <Button size="lg" variant="secondary" className="w-full sm:w-auto px-8">
            {secondaryCtaText}
          </Button>
        </Link>
      </motion.div>

      {/* 5. Trust indicators appear last */}
      <motion.div
        variants={itemVariants}
        className="flex flex-wrap items-center justify-center gap-4 text-xs text-white/60 font-sans tracking-wide"
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
