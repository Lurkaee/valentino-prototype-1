"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { motionTheme } from "@/lib/motion-theme";

const CURTAIN_EVENT = "valentino:curtain-navigate";

type CurtainStage = "idle" | "covering" | "covered" | "revealing";

/**
 * Triggers a programmatic curtain transition to the specified route.
 */
export function triggerCurtainNavigation(href: string) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(CURTAIN_EVENT, { detail: { href } }));
  }
}

/**
 * Standalone PageCurtains overlay.
 * Follows a true cover → navigate → commit/paint → reveal lifecycle
 * without relying on arbitrary guessed timers.
 */
export function PageCurtains() {
  const router = useRouter();
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

  const [stage, setStage] = useState<CurtainStage>("idle");
  const pendingHrefRef = useRef<string | null>(null);
  const fromPathRef = useRef<string>(pathname);

  // Handle curtain event
  const handleCurtainEvent = useCallback(
    (e: Event) => {
      const customEvent = e as CustomEvent<{ href: string }>;
      const targetHref = customEvent.detail?.href;

      if (!targetHref || shouldReduceMotion || targetHref === pathname) {
        if (targetHref) router.push(targetHref);
        return;
      }

      pendingHrefRef.current = targetHref;
      fromPathRef.current = pathname;
      setStage("covering");
    },
    [pathname, router, shouldReduceMotion]
  );

  useEffect(() => {
    window.addEventListener(CURTAIN_EVENT, handleCurtainEvent);
    return () => {
      window.removeEventListener(CURTAIN_EVENT, handleCurtainEvent);
    };
  }, [handleCurtainEvent]);

  // Step 2: Once cover animation reaches full screen coverage, trigger navigation
  const handleCoverComplete = () => {
    if (stage === "covering" && pendingHrefRef.current) {
      setStage("covered");
      router.push(pendingHrefRef.current);
    }
  };

  // Step 3: Listen for pathname update while covered.
  // Once the destination route is committed in React and painted, begin the reveal.
  useEffect(() => {
    if (stage === "covered") {
      const isDestinationReached =
        pendingHrefRef.current &&
        (pathname === pendingHrefRef.current || pathname !== fromPathRef.current);

      if (isDestinationReached) {
        // Wait one frame to ensure browser paint has occurred
        const rafId = requestAnimationFrame(() => {
          setStage("revealing");
        });
        return () => cancelAnimationFrame(rafId);
      }

      // Safety fallback: if navigation stalls, reveal after 3.5s so user is never stuck
      const fallbackTimer = setTimeout(() => {
        setStage("revealing");
      }, 3500);

      return () => clearTimeout(fallbackTimer);
    }
  }, [pathname, stage]);

  // Step 4: When reveal completes, reset back to idle
  const handleRevealComplete = () => {
    if (stage === "revealing") {
      setStage("idle");
      pendingHrefRef.current = null;
    }
  };

  if (shouldReduceMotion || stage === "idle") {
    return null;
  }

  // Animation variants for the organic page curtain
  const curtainVariants = {
    covering: {
      x: "0%",
      transition: {
        duration: motionTheme.curtain.duration,
        ease: motionTheme.curtain.ease,
      },
    },
    covered: {
      x: "0%",
    },
    revealing: {
      x: "100%",
      transition: {
        duration: motionTheme.curtain.duration,
        ease: motionTheme.curtain.ease,
      },
    },
  };

  return (
    <div
      className="fixed inset-0 z-[9999] pointer-events-auto overflow-hidden"
      aria-hidden="true"
    >
      {/* Layer 1: Soft peach/rose ambient glow leading edge */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={stage}
        variants={curtainVariants}
        className="absolute inset-0 bg-gradient-to-r from-rose-950 via-rose-900/80 to-rose-700/60 shadow-2xl blur-[2px]"
      />

      {/* Layer 2: Main deep rose & warm cream fabric/paper page curtain */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={stage}
        variants={curtainVariants}
        onAnimationComplete={() => {
          if (stage === "covering") {
            handleCoverComplete();
          } else if (stage === "revealing") {
            handleRevealComplete();
          }
        }}
        className="absolute inset-0 bg-gradient-to-br from-[#380716] via-[#4A061B] to-[#25030E] border-r border-[#FAF8F5]/30 shadow-[0_0_60px_rgba(225,29,72,0.3)] flex flex-col items-center justify-center"
      >
        {/* Subtle illuminated seal emblem during transition */}
        <div className="flex flex-col items-center gap-3 select-none">
          <div className="w-14 h-14 rounded-full bg-rose-800/80 border border-rose-400/60 shadow-lg shadow-rose-950/80 flex items-center justify-center">
            <span className="text-2xl animate-pulse">💌</span>
          </div>
          <span className="font-serif text-sm tracking-[0.25em] text-[#FAF8F5]/90 uppercase font-medium">
            Valentino
          </span>
          <span className="text-[11px] text-rose-300/70 font-sans tracking-wider">
            Turning the page...
          </span>
        </div>
      </motion.div>
    </div>
  );
}

/**
 * CurtainLink: Drop-in replacement for next/link on major editorial navigation.
 * Triggers the smooth horizontal page curtain on click while maintaining full Next.js accessibility.
 */
export function CurtainLink({
  href,
  children,
  className = "",
  onClick,
  ...rest
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  [key: string]: any;
}) {
  const shouldReduceMotion = useReducedMotion();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick(e);

    // Never intercept modified clicks (Cmd/Ctrl, right click, target=_blank)
    if (
      e.defaultPrevented ||
      e.button !== 0 ||
      e.metaKey ||
      e.ctrlKey ||
      e.altKey ||
      e.shiftKey ||
      rest.target === "_blank"
    ) {
      return;
    }

    if (!shouldReduceMotion && href.startsWith("/")) {
      e.preventDefault();
      triggerCurtainNavigation(href);
    }
  };

  return (
    <Link href={href} onClick={handleClick} className={className} {...rest}>
      {children}
    </Link>
  );
}
