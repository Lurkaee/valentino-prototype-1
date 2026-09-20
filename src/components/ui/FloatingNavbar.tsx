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
 * A refined floating pill header that hovers above the romantic sky.
 * Subtly shrinks and increases backdrop blur/opacity when the user scrolls.
 */
export function FloatingNavbar({ className = "" }: FloatingNavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 32);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`fixed top-4 sm:top-6 inset-x-0 z-40 flex justify-center px-4 pointer-events-none ${className}`}>
      <header
        className={`pointer-events-auto transition-all duration-500 ease-out flex items-center justify-between gap-4 sm:gap-8 rounded-full border shadow-2xl backdrop-blur-xl ${
          isScrolled
            ? "py-2 sm:py-2.5 px-4 sm:px-6 bg-[#18040E]/85 border-rose-500/25 shadow-[0_12px_32px_rgba(0,0,0,0.6)]"
            : "py-2.5 sm:py-3 px-5 sm:px-7 bg-[#240614]/65 border-white/[0.12] shadow-[0_8px_24px_rgba(0,0,0,0.4)]"
        }`}
      >
        {/* Left: Monogram & Brand */}
        <CurtainLink href="/" className="flex items-center gap-2 group">
          <ValentinoMonogram size={30} className="transition-transform group-hover:scale-105 duration-300" />
          <span className="text-sm sm:text-base font-serif font-medium tracking-[0.15em] text-[#FAF8F5] uppercase">
            Valentino
          </span>
        </CurtainLink>

        {/* Center: Navigation Links */}
        <nav className="hidden sm:flex items-center gap-6 text-xs uppercase tracking-widest text-[#FAF8F5]/70 font-sans">
          <CurtainLink
            href="/templates"
            className="hover:text-white transition-colors py-1 hover:border-b hover:border-rose-400"
          >
            Templates
          </CurtainLink>
          <a
            href="#how-it-works"
            className="hover:text-white transition-colors py-1 hover:border-b hover:border-rose-400"
          >
            How it works
          </a>
        </nav>

        {/* Right: Primary Action */}
        <div className="flex items-center gap-3">
          <CurtainLink href="/create">
            <Button
              size="sm"
              variant="primary"
              className="text-xs px-3.5 sm:px-4 py-1.5 rounded-full shadow-md shadow-rose-950/60"
            >
              <span>Create yours</span>
              <span className="text-[11px]">💌</span>
            </Button>
          </CurtainLink>
        </div>
      </header>
    </div>
  );
}
