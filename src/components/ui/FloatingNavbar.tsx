"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { CurtainLink } from "@/components/motion/PageCurtains";
import { ValentinoMonogram } from "@/components/motion/ValentinoMonogram";

interface FloatingNavbarProps {
  className?: string;
}

/**
 * FloatingNavbar:
 * Valentino Core Shell Navigation.
 * Premium neutral obsidian glass, warm ivory typography, and clean product links.
 * Distraction-free, responsive across all breakpoints.
 */
export function FloatingNavbar({ className = "" }: FloatingNavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`fixed top-3 sm:top-5 inset-x-0 z-40 flex justify-center px-3 sm:px-4 pointer-events-none ${className}`}>
      <header
        className={`pointer-events-auto transition-all duration-300 ease-out flex items-center justify-between gap-3 sm:gap-6 rounded-full border backdrop-blur-xl ${
          isScrolled
            ? "py-2 px-3.5 sm:px-6 bg-[#0E0D14]/90 border-white/[0.12] shadow-[0_16px_40px_-10px_rgba(0,0,0,0.8)]"
            : "py-2 px-4 sm:px-6 bg-[#13111A]/80 border-white/[0.08] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)]"
        }`}
      >
        {/* Left: Brand Monogram & Title */}
        <CurtainLink href="/" className="flex items-center gap-2 group flex-shrink-0">
          <ValentinoMonogram size={26} className="transition-transform group-hover:scale-105 duration-300 drop-shadow-sm text-ivory-100" />
          <span className="text-sm sm:text-base font-serif font-medium tracking-[0.16em] text-ivory-50 uppercase">
            Valentino
          </span>
        </CurtainLink>

        {/* Center: Clean Product Navigation */}
        <nav className="hidden sm:flex items-center gap-5 text-[11px] uppercase tracking-[0.18em] text-ivory-300 font-ui font-medium">
          <CurtainLink
            href="/create"
            className="hover:text-white transition-colors py-1 border-b border-transparent hover:border-white/40"
          >
            Create
          </CurtainLink>
          <CurtainLink
            href="/templates"
            className="hover:text-white transition-colors py-1 border-b border-transparent hover:border-white/40"
          >
            Templates
          </CurtainLink>
          <a
            href="#how-it-works"
            className="hover:text-white transition-colors py-1 border-b border-transparent hover:border-white/40"
          >
            How it works
          </a>
        </nav>

        {/* Right: Studio CTA */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <CurtainLink href="/create">
            <Button
              size="sm"
              variant="primary"
              className="text-xs px-3.5 sm:px-4 py-1.5 rounded-full font-medium tracking-wide bg-[#1E1C27] hover:bg-[#2A2736] text-ivory-50 border border-white/15 shadow-sm active:scale-95 transition-all"
            >
              <span>Create</span>
            </Button>
          </CurtainLink>
        </div>
      </header>
    </div>
  );
}
