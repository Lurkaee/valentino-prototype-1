"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { MemoriesPublishedConfig, MemoryItem } from "./schema";

import { ModuleRenderProps } from "../types";

interface MemoriesModuleProps extends Partial<ModuleRenderProps<MemoriesPublishedConfig>> {
  config: MemoriesPublishedConfig;
  templateId?: string;
  isEditorPreview?: boolean;
}

export function MemoriesModule({
  config,
  theme = "midnight-rose",
  templateId,
  mode,
  isEditorPreview: propIsEditorPreview,
  className = "",
}: MemoriesModuleProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const activeTheme = templateId || theme;
  const isCloudNine =
    activeTheme === "cloud-nine" ||
    activeTheme === "blush-sky" ||
    activeTheme === "peach-sorbet" ||
    activeTheme === "lavender-mist";
  const isKage =
    activeTheme === "kage" ||
    activeTheme === "sanctuary-emerald" ||
    activeTheme === "moonlit-stone" ||
    activeTheme === "kyoto-crimson";
  const isEditorPreview = propIsEditorPreview ?? (mode === "preview");


  const items = config.items || [];
  const currentItem = items[currentIndex] as MemoryItem | undefined;

  const goToNext = useCallback(() => {
    if (items.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const goToPrev = useCallback(() => {
    if (items.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goToNext();
      if (e.key === "ArrowLeft") goToPrev();
      if (e.key === "Escape" && lightboxOpen) setLightboxOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNext, goToPrev, lightboxOpen]);

  // Touch Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 45) {
      goToNext();
    } else if (diff < -45) {
      goToPrev();
    }
    touchStartX.current = null;
  };

  if (!config.enabled || items.length === 0) {
    if (isEditorPreview) {
      return (
        <div className="p-6 rounded-2xl border border-dashed border-white/15 text-center text-white/40 text-xs font-ui">
          📸 Photo Memories enabled — add your photos in the Memories section.
        </div>
      );
    }
    return null;
  }

  // Template-specific style classes
  const containerClasses = isCloudNine
    ? "bg-gradient-to-b from-sky-500/10 via-pink-500/5 to-purple-500/10 border-white/20 shadow-xl rounded-3xl"
    : isKage
    ? "bg-[#0c0d0c]/90 border-emerald-500/20 shadow-2xl rounded-2xl"
    : "bg-[#14121a]/95 border-rose-500/25 shadow-2xl rounded-2xl"; // Midnight Rose default

  const cardBorderClass = isCloudNine
    ? "border-white/30 bg-white/10"
    : isKage
    ? "border-emerald-400/25 bg-black/50"
    : "border-rose-400/30 bg-black/60";

  return (
    <div
      data-testid="module-memories"
      className={`relative w-full max-w-2xl mx-auto p-6 md:p-8 my-8 border backdrop-blur-md transition-all ${containerClasses}`}
      role="region"
      aria-roledescription="carousel"
      aria-label={config.title || "Photo Memories Gallery"}
    >
      {/* Header */}
      <div className="text-center space-y-2 mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-ui tracking-wider uppercase bg-white/5 border border-white/10 text-white/75">
          <span>📸</span>
          <span>{isCloudNine ? "Moments in the Clouds" : isKage ? "Sanctuary Memories" : "Cherished Moments"}</span>
        </div>
        <h3 className="text-xl md:text-2xl font-display font-medium text-white tracking-tight">
          {config.title || "Our Memories"}
        </h3>
        {config.subtitle && (
          <p className="text-xs md:text-sm text-white/60 font-romantic max-w-md mx-auto leading-relaxed">
            {config.subtitle}
          </p>
        )}
      </div>

      {/* Main Image Stage */}
      <div
        className="relative w-full aspect-[4/3] md:aspect-[16/10] overflow-hidden rounded-xl border select-none group"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {currentItem && (
          <div
            className={`w-full h-full relative cursor-pointer flex items-center justify-center p-2 transition-all ${cardBorderClass}`}
            onClick={() => setLightboxOpen(true)}
            title="Click to view full photo"
          >
            {/* Background blur ambience */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={currentItem.url}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-30 scale-110"
            />
            {/* Main Crisp Image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={currentItem.url}
              alt={currentItem.caption || currentItem.title || `Memory photo ${currentIndex + 1}`}
              className="relative max-h-full max-w-full object-contain rounded-lg shadow-lg z-10 transition-transform duration-300 group-hover:scale-[1.02]"
              loading="lazy"
            />

            {/* Tap to zoom hint */}
            <div className="absolute top-3 right-3 z-20 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 text-[10px] text-white/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 font-ui">
              <span>🔍</span>
              <span>Tap to expand</span>
            </div>
          </div>
        )}

        {/* Carousel Prev Button */}
        {items.length > 1 && (
          <button
            type="button"
            data-testid="memories-prev-btn"
            onClick={(e) => {
              e.stopPropagation();
              goToPrev();
            }}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 active:scale-95 border border-white/20 text-white flex items-center justify-center transition-all shadow-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-rose-400"
            aria-label="Previous memory photo"
          >
            <span className="text-lg select-none">‹</span>
          </button>
        )}

        {/* Carousel Next Button */}
        {items.length > 1 && (
          <button
            type="button"
            data-testid="memories-next-btn"
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 active:scale-95 border border-white/20 text-white flex items-center justify-center transition-all shadow-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-rose-400"
            aria-label="Next memory photo"
          >
            <span className="text-lg select-none">›</span>
          </button>
        )}
      </div>

      {/* Caption & Metadata Card */}
      {currentItem && (
        <div className="mt-4 p-4 rounded-xl bg-white/[0.04] border border-white/[0.08] text-center space-y-1.5">
          <div className="flex items-center justify-between text-[11px] text-white/40 font-mono">
            <span>
              {currentItem.date || ""}
            </span>
            <span data-testid="memories-counter">
              {currentIndex + 1} of {items.length}
            </span>
          </div>
          {currentItem.title && (
            <h4 className="text-sm font-display font-medium text-white/95">
              {currentItem.title}
            </h4>
          )}
          {currentItem.caption && (
            <p className="text-xs text-white/80 font-romantic leading-relaxed max-w-lg mx-auto whitespace-pre-line break-words">
              {currentItem.caption}
            </p>
          )}
        </div>
      )}

      {/* Thumbnails Navigator */}
      {items.length > 1 && (
        <div className="flex items-center justify-center gap-2 mt-4 overflow-x-auto py-2 scrollbar-none">
          {items.map((item, idx) => (
            <button
              key={item.id || idx}
              type="button"
              data-testid={`memories-thumb-${idx}`}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to photo ${idx + 1}`}
              className={`relative w-12 h-12 rounded-lg overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                idx === currentIndex
                  ? "border-rose-400 scale-105 shadow-md shadow-rose-500/20"
                  : "border-white/20 opacity-50 hover:opacity-80"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.url}
                alt=""
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      {lightboxOpen && currentItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-lg p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            type="button"
            data-testid="memories-lightbox-close"
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-xl font-bold cursor-pointer transition-all border border-white/20 z-50"
            aria-label="Close enlarged photo"
          >
            ×
          </button>
          <div
            className="relative max-w-4xl max-h-[85vh] flex flex-col items-center justify-center p-2"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={currentItem.url}
              alt={currentItem.caption || currentItem.title || "Enlarged memory photo"}
              className="max-h-[75vh] max-w-full object-contain rounded-xl shadow-2xl border border-white/20"
            />
            {currentItem.caption && (
              <p className="text-sm text-white/90 font-romantic text-center mt-3 max-w-xl">
                {currentItem.caption}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
