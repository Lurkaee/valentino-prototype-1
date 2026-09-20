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
 * A dreamy, romantic floating pill header integrated into the light sunset sky.
 * Translucent warm cream, soft rose tint, subtle blur, and delicate border.
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
    <div className={`fixed top-3.5 sm:top-5 inset-x-0 z-40 flex justify-center px-4 pointer-events-none ${className}`}>
      <header
        className={`pointer-events-auto transition-all duration-500 ease-out flex items-center justify-between gap-4 sm:gap-8 rounded-full border backdrop-blur-xl ${
          isScrolled
            ? "py-2 sm:py-2.5 px-4 sm:px-6 bg-[#FFF9F6]/92 border-rose-300/80 shadow-[0_12px_36px_rgba(210,100,140,0.22)]"
            : "py-2 sm:py-2.5 px-5 sm:px-7 bg-[#FFF8F6]/80 border-[#FAD2E1] shadow-[0_8px_28px_rgba(230,130,165,0.16)]"
        }`}
      >
        {/* Left: Monogram & Brand */}
        <CurtainLink href="/" className="flex items-center gap-2.5 group">
          <ValentinoMonogram size={28} className="transition-transform group-hover:scale-105 duration-300 drop-shadow-sm" />
          <span className="text-sm sm:text-base font-serif font-semibold tracking-[0.14em] text-[#3B071A] uppercase">
            Valentino
          </span>
        </CurtainLink>

        {/* Center: Navigation Links */}
        <nav className="hidden sm:flex items-center gap-6 text-xs uppercase tracking-widest text-[#6B1D3D]/80 font-sans font-medium">
          <CurtainLink
            href="/templates"
            className="hover:text-[#BE123C] transition-colors py-1 hover:border-b-2 hover:border-rose-400"
          >
            Templates
          </CurtainLink>
          <a
            href="#how-it-works"
            className="hover:text-[#BE123C] transition-colors py-1 hover:border-b-2 hover:border-rose-400"
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
              className="text-xs px-4 py-1.5 rounded-full shadow-md shadow-rose-900/20 bg-gradient-to-r from-rose-600 via-rose-500 to-pink-500 hover:from-rose-700 hover:to-pink-600 text-white font-medium active:scale-95 transition-transform"
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
