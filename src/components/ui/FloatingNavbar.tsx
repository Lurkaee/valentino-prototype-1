"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ValentinoMonogram } from "@/components/motion/ValentinoMonogram";

interface FloatingNavbarProps {
  className?: string;
}

/**
 * FloatingNavbar (Phase 6.1 Spatial Dock):
 * Slender, minimalist spatial dock with refined typography, hairline border,
 * subtle translucency, and non-redundant navigation.
 */
export function FloatingNavbar({ className = "" }: FloatingNavbarProps) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isYielding, setIsYielding] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let ticking = false;
    let lastY = 0;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;
          setIsScrolled(currentY > 24);
          // Yield gently in deep cinematic storytelling scenes (> 400px) when scrolling downward
          const scrollingDown = currentY > lastY + 2;
          setIsYielding(currentY > 400 && scrollingDown);
          lastY = currentY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const shouldYield = isYielding && !isHovered;

  return (
    <div
      className={`fixed top-3 sm:top-5 inset-x-0 z-50 flex justify-center px-4 pointer-events-none transition-all duration-500 will-change-transform ${
        isScrolled ? "translate-y-[-2px]" : "translate-y-0"
      } ${className}`}
    >
      <header
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
        className={`pointer-events-auto transition-all duration-400 ease-out flex items-center justify-between gap-3 sm:gap-6 rounded-full px-3.5 sm:px-5 py-1.5 border backdrop-blur-md ${
          shouldYield ? "opacity-55 scale-[0.98]" : "opacity-95 scale-100"
        } ${
          isScrolled
            ? "bg-[#180412]/75 border-rose-950/20 sm:border-white/[0.12] shadow-[0_12px_30px_-8px_rgba(25,3,15,0.4)]"
            : "bg-[#1C0615]/65 border-rose-950/15 sm:border-white/[0.09] shadow-[0_6px_20px_-6px_rgba(25,3,15,0.25)]"
        }`}
      >
        {/* Brand Link */}
        <Link
          href="/"
          className="flex items-center gap-2 group flex-shrink-0 pr-1 select-none"
          aria-label="Valentino Home"
        >
          <ValentinoMonogram
            size={20}
            className="transition-transform group-hover:scale-105 duration-300 text-ivory-100 drop-shadow-sm opacity-90 group-hover:opacity-100"
          />
          <span className="text-xs sm:text-[13px] font-serif font-medium tracking-[0.22em] text-[#FAF8F5]/90 group-hover:text-white uppercase transition-colors">
            Valentino
          </span>
        </Link>

        {/* Slender Spatial Navigation */}
        <nav className="flex items-center gap-1 sm:gap-3 text-[11px] uppercase tracking-[0.18em] font-ui font-medium">
          <Link
            href="/templates"
            className={`px-2.5 py-1 rounded-full transition-colors duration-200 ${
              pathname === "/templates"
                ? "text-white bg-white/15"
                : "text-[#FAF8F5]/80 hover:text-white"
            }`}
          >
            Templates
          </Link>

          <Link
            href="/#how-it-works"
            className="hidden sm:inline-block px-2.5 py-1 rounded-full text-[#FAF8F5]/80 hover:text-white transition-colors duration-200"
          >
            Story
          </Link>

          {/* Unified Create Action */}
          <Link href="/create" className="inline-flex items-center ml-1">
            <button
              type="button"
              className="relative px-3.5 sm:px-4 py-1 rounded-full text-xs font-semibold text-white transition-all duration-200 active:scale-95 cursor-pointer bg-gradient-to-r from-[#881337] via-[#9F1239] to-[#881337] hover:from-[#9F1239] hover:to-[#BE123C] border border-rose-300/30 shadow-[0_2px_8px_rgba(136,19,55,0.35)]"
            >
              <span className="tracking-wider">Create</span>
            </button>
          </Link>
        </nav>
      </header>
    </div>
  );
}

