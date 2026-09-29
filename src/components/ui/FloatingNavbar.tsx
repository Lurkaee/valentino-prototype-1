"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ValentinoMonogram } from "@/components/motion/ValentinoMonogram";

interface FloatingNavbarProps {
  className?: string;
}

/**
 * FloatingNavbar (Phase 6 Renaissance):
 * Liquid glass floating dock with proximity scaling, tactile feedback, and active route indication.
 */
export function FloatingNavbar({ className = "" }: FloatingNavbarProps) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 30);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/create", label: "Create" },
    { href: "/templates", label: "Templates" },
    { href: "/#story", label: "Craft" },
  ];

  return (
    <div
      className={`fixed top-4 inset-x-0 z-50 flex justify-center px-4 pointer-events-none transition-all duration-500 will-change-transform ${
        isScrolled ? "translate-y-[-2px]" : "translate-y-0"
      } ${className}`}
    >
      <header
        className={`pointer-events-auto transition-all duration-400 ease-out flex items-center justify-between gap-4 sm:gap-7 rounded-full px-4 sm:px-5 py-2 border backdrop-blur-md ${
          isScrolled
            ? "bg-[#0c0912]/85 border-white/15 shadow-[0_12px_32px_-8px_rgba(0,0,0,0.7)]"
            : "bg-[#140e1a]/65 border-white/10 shadow-[0_8px_24px_-6px_rgba(0,0,0,0.4)]"
        }`}
      >
        {/* Brand Link */}
        <Link href="/" className="flex items-center gap-2 group flex-shrink-0" aria-label="Valentino Home">
          <ValentinoMonogram
            size={24}
            className="transition-transform group-hover:scale-105 duration-300 text-ivory-100 drop-shadow-sm"
          />
          <span className="text-xs sm:text-sm font-serif font-medium tracking-[0.2em] text-[#FAF8F5] uppercase">
            Valentino
          </span>
        </Link>

        {/* Proximity Navigation Links */}
        <nav className="flex items-center gap-1 sm:gap-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-3 py-1 rounded-full text-[11px] uppercase tracking-[0.16em] font-medium transition-all duration-200 ${
                  isActive
                    ? "text-white bg-white/15 shadow-sm"
                    : "text-white/70 hover:text-white hover:bg-white/10 active:scale-95"
                }`}
              >
                <span>{link.label}</span>
                {isActive && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-rose-400" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Primary Tactile Action */}
        <Link href="/create" className="flex-shrink-0">
          <button
            type="button"
            className="group relative px-4 py-1.5 rounded-full text-xs font-medium text-white transition-all duration-200 active:scale-95 cursor-pointer overflow-hidden border border-white/20 bg-gradient-to-r from-rose-950/80 via-[#2A101C] to-rose-950/80 hover:border-rose-400/40 shadow-sm"
          >
            <span className="relative z-10 tracking-wider">
              Create
            </span>
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </Link>
      </header>
    </div>
  );
}
