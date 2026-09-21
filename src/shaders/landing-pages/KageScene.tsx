"use client";

import React, { useEffect, useRef, useState } from "react";
import "./kageScene.css";

export interface KageLandingPageProps {
  headingFont?: string;
  bodyFont?: string;
  headingWeight?: string;
  bodyWeight?: string;
  primaryColor?: string;
  headingSize?: number;
  bodySize?: number;
  headingLetterSpacing?: number;
  className?: string;
  title?: string;
  partnerName?: string;
  senderName?: string;
  greeting?: string;
  message?: string;
  signOff?: string;
  modulesNode?: React.ReactNode;
}

export const KageLandingPage: React.FC<KageLandingPageProps> = ({
  headingFont = "onest",
  bodyFont = "onest",
  headingWeight = "400",
  bodyWeight = "300",
  primaryColor = "#e0231c",
  headingSize = 46,
  bodySize = 17,
  headingLetterSpacing = -0.012,
  className = "",
  partnerName,
  senderName,
  greeting,
  message,
  signOff,
  modulesNode,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasWebGl, setHasWebGl] = useState(true);

  useEffect(() => {
    // 1. Inject fonts stylesheet if not present
    if (!document.getElementById("kage-fonts-css")) {
      const link = document.createElement("link");
      link.id = "kage-fonts-css";
      link.rel = "stylesheet";
      link.href = "/landing-pages/secret-pathways-assets/fonts.css";
      document.head.appendChild(link);
    }

    // 2. Test WebGL support
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) {
        setHasWebGl(false);
        setIsLoaded(true);
        return;
      }
    } catch {
      setHasWebGl(false);
      setIsLoaded(true);
      return;
    }

    // 3. Dynamically load Three.js if needed
    let isMounted = true;

    function loadScript(src: string): Promise<void> {
      return new Promise((resolve, reject) => {
        if ((window as any).THREE) {
          resolve();
          return;
        }
        const existing = document.querySelector(`script[src="${src}"]`);
        if (existing) {
          existing.addEventListener("load", () => resolve());
          existing.addEventListener("error", reject);
          return;
        }
        const s = document.createElement("script");
        s.src = src;
        s.async = true;
        s.onload = () => resolve();
        s.onerror = reject;
        document.body.appendChild(s);
      });
    }

    loadScript("/landing-pages/secret-pathways-assets/three.min.js")
      .then(() => {
        if (!isMounted) return;
        setIsLoaded(true);

        // Run authored Kage scene script against local canvas
        const canvas = document.getElementById("gl") as HTMLCanvasElement | null;
        if (!canvas || !(window as any).THREE) return;

        // Execute local scene boot if not already initialized
        try {
          if (!(window as any).__kage) {
            const script = document.createElement("script");
            script.src = "/landing-pages/kage-boot.js";
            // Check if already booted
          }
        } catch (err) {
          console.warn("Kage runtime init notice:", err);
        }
      })
      .catch(() => {
        if (isMounted) {
          setHasWebGl(false);
          setIsLoaded(true);
        }
      });

    return () => {
      isMounted = false;
      // Cleanup Kage renderer if present
      const kage = (window as any).__kage;
      if (kage && kage.renderer) {
        try {
          kage.renderer.dispose?.();
        } catch {}
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      data-testid="kage-container"
      className={`kage-root relative w-full min-h-[100dvh] bg-[#070b09] text-[#dfe7e0] overflow-x-hidden ${className}`}
      style={
        {
          "--p-primary": primaryColor,
          "--font-heading": headingFont,
          "--font-body": bodyFont,
          "--weight-heading": headingWeight,
          "--weight-body": bodyWeight,
          "--size-heading": `${headingSize}px`,
          "--size-body": `${bodySize}px`,
          "--ls-heading": `${headingLetterSpacing}em`,
        } as React.CSSProperties
      }
    >
      {/* Authored WebGL Canvas */}
      <canvas
        id="gl"
        aria-hidden="true"
        className="fixed inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* Atmospheric Vignette and Grain */}
      <div
        id="vignette"
        className="fixed inset-0 pointer-events-none z-1 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(5,9,7,0.85)_100%)]"
        aria-hidden="true"
      />
      <div
        id="grain"
        className="fixed inset-0 pointer-events-none opacity-20 z-1"
        aria-hidden="true"
      />

      {/* Preloader element needed by authored script */}
      <div id="pre" className="done pointer-events-none" aria-hidden="true">
        <div className="pre-in">
          <div className="pre-bar">
            <i id="pre-fill" style={{ width: "100%" }} />
          </div>
          <span id="pre-pct" className="hidden">100</span>
        </div>
      </div>

      {/* Ambient Kyoto Temple Navigation */}
      <header className="relative z-20 w-full max-w-4xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xl text-[#e0231c] select-none" aria-hidden="true">⛩️</span>
          <div className="flex flex-col">
            <span className="text-xs font-serif tracking-[0.3em] uppercase text-[#dfe7e0]/80">
              KAGE · 影
            </span>
            <span className="text-[10px] font-sans tracking-widest uppercase text-[#88998d]/70">
              Kyoto Mountain Sanctuary
            </span>
          </div>
        </div>

        <div className="text-[11px] font-sans uppercase tracking-widest px-3 py-1 rounded-full border border-emerald-900/50 bg-[#0d1410]/70 text-emerald-300 backdrop-blur-md">
          Private Sanctuary
        </div>
      </header>

      {/* Main Content Stage */}
      <main className="relative z-10 w-full max-w-2xl mx-auto px-4 sm:px-6 py-8 flex flex-col items-center">
        {/* Recipient Greeting Focal Header */}
        <div className="text-center mb-8 sm:mb-10 space-y-3">
          <span className="inline-block text-[10px] tracking-[0.3em] uppercase px-4 py-1 rounded-full border border-emerald-800/40 bg-[#101914]/80 text-[#a3b8aa] backdrop-blur-md shadow-sm">
            {greeting || "Where Stillness Reveals The Unseen"}
          </span>
          <h1
            data-testid="recipient-name"
            className="text-3xl sm:text-5xl font-serif font-light text-[#FAF8F5] tracking-wide drop-shadow-[0_2px_16px_rgba(0,0,0,0.8)]"
          >
            {partnerName || "Dearest"}
          </h1>
        </div>

        {/* Tactile Kyoto Temple Parchment Card */}
        <div className="w-full rounded-2xl bg-[#0f1713]/90 border border-emerald-800/30 p-7 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-xl relative overflow-hidden transition-all duration-500">
          {/* Subtle gold leaf edge */}
          <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#e0231c]/70 to-transparent" />

          {/* Love Letter Message */}
          <div
            data-testid="letter-message"
            className="whitespace-pre-wrap font-serif font-light text-base sm:text-lg leading-relaxed text-[#edf3ef] relative z-10"
          >
            {message || "In the quiet of the night, every thought of you is a light through the shadows."}
          </div>

          {/* Sign-off within the letter */}
          <div className="text-right pt-6 mt-8 border-t border-emerald-900/40 relative z-10">
            <p className="text-[11px] opacity-70 uppercase tracking-widest mb-1 font-sans font-medium text-[#a3b8aa]">
              {signOff || "With All My Heart"}
            </p>
            <p
              data-testid="sender-name"
              className="text-2xl sm:text-3xl font-serif text-[#FAF8F5] font-light tracking-wide"
            >
              {senderName || "Yours Always"}
            </p>
          </div>
        </div>

        {/* Valentino Modules Node (Timeline, Quiz, Secret, Open When) */}
        {modulesNode && (
          <div className="w-full mt-10">
            {modulesNode}
          </div>
        )}

        {/* Footer Sanctuary Stamp */}
        <footer className="w-full py-12 text-center text-[10px] text-[#88998d]/50 font-sans tracking-[0.25em] uppercase">
          <span>VALENTINO</span>
          <span className="mx-2">·</span>
          <span>KAGE WORLD</span>
          <span className="mx-2">·</span>
          <span>KYOTO SANCTUARY</span>
        </footer>
      </main>
    </div>
  );
};
