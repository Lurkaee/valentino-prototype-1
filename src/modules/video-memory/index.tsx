"use client";

import React, { useState, useRef } from "react";
import { VideoMemoryPublishedConfig } from "./schema";
import { ModuleRenderProps } from "../types";

export const VideoMemoryModule: React.FC<ModuleRenderProps<VideoMemoryPublishedConfig>> = ({
  config,
  theme = "midnight-rose",
  className = "",
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  if (!config.enabled || !config.url) {
    return null;
  }

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const isCloudNine =
    theme === "cloud-nine" ||
    theme === "blush-sky" ||
    theme === "peach-sorbet" ||
    theme === "lavender-mist";
  const isKage =
    theme === "kage" ||
    theme === "sanctuary-emerald" ||
    theme === "moonlit-stone" ||
    theme === "kyoto-crimson";

  const containerClasses = isCloudNine
    ? "bg-white/10 border-pink-300/30 rounded-3xl shadow-xl backdrop-blur-md"
    : isKage
    ? "bg-[#0b0f0d]/90 border-emerald-500/25 rounded-2xl shadow-2xl backdrop-blur-md"
    : "bg-[#140812]/95 border-rose-500/30 rounded-2xl shadow-2xl backdrop-blur-md";

  const headerBadgeClass = isCloudNine
    ? "text-pink-900 bg-pink-100/90 border-pink-300/60"
    : isKage
    ? "text-emerald-300 bg-emerald-950/70 border-emerald-500/40"
    : "text-rose-200 bg-rose-950/70 border-rose-500/40";

  return (
    <div
      data-testid="module-video-memory"
      className={`relative w-full max-w-xl mx-auto p-4 sm:p-6 border my-8 transition-all ${containerClasses} ${className}`}
    >
      {/* Header Tag */}
      <div className="flex items-center justify-between mb-4">
        <div className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-ui border ${headerBadgeClass}`}>
          <span>🎞️</span>
          <span>{config.title || "Video Memory"}</span>
        </div>
      </div>

      {/* Video Stage */}
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black border border-white/15 group">
        <video
          ref={videoRef}
          src={config.url}
          poster={config.posterUrl || undefined}
          playsInline
          controls
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          className="w-full h-full object-contain"
          preload="metadata"
        />

        {/* Big centered play button overlay when paused and not yet interacted */}
        {!isPlaying && (
          <div
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/20 transition-all cursor-pointer pointer-events-auto"
            aria-label="Play video memory"
          >
            <div className="w-16 h-16 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/40 flex items-center justify-center text-white shadow-2xl transition-transform transform hover:scale-105 active:scale-95">
              <svg className="w-8 h-8 fill-current translate-x-0.5" viewBox="0 0 24 24">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* Caption footer */}
      {config.caption && (
        <div className="mt-3 text-center">
          <p className="text-xs sm:text-sm text-white/80 font-romantic italic leading-relaxed">
            {config.caption}
          </p>
        </div>
      )}
    </div>
  );
};
