"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { motionTheme } from "@/lib/motion-theme";

const CURTAIN_EVENT = "valentino:curtain-navigate";

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
 * Mounts in layout without wrapping or mutating children boundaries.
 */
export function PageCurtains() {
  const router = useRouter();
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleCurtainEvent = useCallback(
    (e: Event) => {
      const customEvent = e as CustomEvent<{ href: string }>;
      const targetHref = customEvent.detail?.href;

      if (!targetHref || shouldReduceMotion || targetHref === pathname) {
        if (targetHref) router.push(targetHref);
        return;
      }

      setIsTransitioning(true);

      const navigateTimer = setTimeout(() => {
        router.push(targetHref);
      }, 260);

      return () => clearTimeout(navigateTimer);
    },
    [pathname, router, shouldReduceMotion]
  );

  useEffect(() => {
    window.addEventListener(CURTAIN_EVENT, handleCurtainEvent);
    return () => {
      window.removeEventListener(CURTAIN_EVENT, handleCurtainEvent);
    };
  }, [handleCurtainEvent]);

  // Once destination pathname is mounted, automatically retract curtain
  useEffect(() => {
    if (isTransitioning) {
      const retractTimer = setTimeout(() => {
        setIsTransitioning(false);
      }, 100);

      return () => clearTimeout(retractTimer);
    }
  }, [pathname, isTransitioning]);

  if (shouldReduceMotion) {
    return null;
  }

  return (
    <AnimatePresence>
      {isTransitioning && (
        <div
          className="fixed inset-0 z-[9999] pointer-events-auto overflow-hidden"
          aria-hidden="true"
        >
          {/* Layer 1: Crimson leading edge accent */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "100%" }}
            transition={{
              duration: motionTheme.curtain.duration,
              ease: motionTheme.curtain.ease,
            }}
            className="absolute inset-0 bg-gradient-to-r from-rose-950 via-rose-900 to-rose-700 shadow-2xl"
          />

          {/* Layer 2: Deep Obsidian main curtain with fine gold border */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "100%" }}
            transition={{
              duration: motionTheme.curtain.duration,
              ease: motionTheme.curtain.ease,
              delay: 0.04,
            }}
            className="absolute inset-0 bg-[#07070A] border-r border-rose-500/20 flex flex-col items-center justify-center"
          >
            {/* Subtle illuminated seal emblem during cover */}
            <div className="flex flex-col items-center gap-3 select-none">
              <span className="text-3xl animate-pulse">💌</span>
              <span className="font-serif text-sm tracking-[0.2em] text-[#FAF8F5]/80 uppercase">
                Valentino
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
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
