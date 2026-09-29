"use client";

import React from "react";
import Link from "next/link";

/**
 * Triggers immediate programmatic navigation.
 * Curtain blocking navigation is deprecated in Phase 6.
 */
export function triggerCurtainNavigation(href: string) {
  if (typeof window !== "undefined") {
    // Immediate native or client navigation without artificial delay
    window.location.assign(href);
  }
}

/**
 * PageCurtains overlay:
 * Phase 6 removes blocking 750ms cover/reveal theater and artificial loaders.
 * Returns null to keep DOM light and immediate.
 */
export function PageCurtains() {
  return null;
}

/**
 * CurtainLink:
 * Drop-in accessible Next.js Link that navigates immediately without blocking curtains.
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
  return (
    <Link href={href} onClick={onClick} className={className} {...rest}>
      {children}
    </Link>
  );
}
