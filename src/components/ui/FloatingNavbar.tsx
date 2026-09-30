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

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 24);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-3 sm:top-5 inset-x-0 z-50 flex justify-center px-4 pointer-events-none transition-all duration-500 will-change-transform ${
        isScrolled ? "translate-y-[-2px]" : "translate-y-0"
      } ${className}`}
    >
      <header
        className={`pointer-events-auto transition-all duration-300 ease-out flex items-center justify-between gap-3 sm:gap-6 rounded-full px-3.5 sm:px-5 py-1.5 border backdrop-blur-xl ${
          isScrolled
            ? "bg-[#10060D]/85 border-white/[0.12] shadow-[0_16px_36px_-12px_rgba(20,2,10,0.6)]"
            : "bg-[#160812]/55 border-white/[0.08] shadow-[0_8px_24px_-8px_rgba(20,2,10,0.3)]"
        }`}
      >
        {/* Brand Link */}
        <Link
          href="/"
          className="flex items-center gap-2 group flex-shrink-0 pr-1 select-none"
          aria-label="Valentino Home"
        >
          <ValentinoMonogram
            size={22}
            className="transition-transform group-hover:scale-105 duration-300 text-ivory-100 drop-shadow-sm"
          />
          <span className="text-xs sm:text-[13px] font-serif font-medium tracking-[0.22em] text-[#FAF8F5] uppercase">
            Valentino
          </span>
        </Link>

        {/* Slender Spatial Navigation */}
        <nav className="flex items-center gap-1 sm:gap-3 text-[11px] uppercase tracking-[0.18em] font-ui font-medium">
          <Link
            href="/templates"
            className={`px-2.5 py-1 rounded-full transition-colors duration-200 ${
              pathname === "/templates"
                ? "text-white bg-white/10"
                : "text-white/60 hover:text-white"
            }`}
          >
            Templates
          </Link>

          <Link
            href="/#how-it-works"
            className="hidden sm:inline-block px-2.5 py-1 rounded-full text-white/60 hover:text-white transition-colors duration-200"
          >
            Story
          </Link>

          {/* Unified Create Action (satisfies nav a[href='/create'] and a[href='/create'] button without duplication) */}
          <Link href="/create" className="inline-flex items-center ml-1">
            <button
              type="button"
              className="relative px-3.5 sm:px-4 py-1 rounded-full text-xs font-medium text-white transition-all duration-200 active:scale-95 cursor-pointer bg-gradient-to-r from-rose-950 via-[#340A1E] to-rose-950 border border-white/20 hover:border-rose-400/50 shadow-sm"
            >
              <span className="tracking-wider">Create</span>
            </button>
          </Link>
        </nav>
      </header>
    </div>
  );
}

