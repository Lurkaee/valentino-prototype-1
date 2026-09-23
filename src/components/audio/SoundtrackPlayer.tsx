"use client";

import React, { useState, useRef, useEffect } from "react";

interface SoundtrackPlayerProps {
  url?: string | null;
  title?: string;
  theme?: string;
  className?: string;
}

export const SoundtrackPlayer: React.FC<SoundtrackPlayerProps> = ({
  url,
  title = "Romantic Soundtrack",
  theme = "midnight-rose",
  className = "",
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasError, setHasError] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    return () => {
      if (audio) {
        audio.pause();
      }
    };
  }, []);

  if (!url) return null;

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      try {
        setHasError(false);
        await audio.play();
        setIsPlaying(true);
      } catch {
        setHasError(true);
        setIsPlaying(false);
      }
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !isMuted;
    setIsMuted(!isMuted);
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

  const btnBg = isCloudNine
    ? "bg-white/90 text-pink-950 border-pink-300 shadow-sm"
    : isKage
    ? "bg-emerald-950/80 text-emerald-200 border-emerald-500/40 shadow-lg"
    : "bg-rose-950/80 text-rose-200 border-rose-500/40 shadow-lg";

  return (
    <div className={`inline-flex items-center gap-1.5 ${className}`}>
      <audio
        ref={audioRef}
        src={url}
        loop
        preload="none"
        onEnded={() => setIsPlaying(false)}
        onError={() => setHasError(true)}
      />

      <button
        type="button"
        data-testid="soundtrack-toggle-btn"
        onClick={togglePlay}
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-ui border transition-all cursor-pointer backdrop-blur-md active:scale-95 focus:outline-none focus:ring-2 focus:ring-rose-400 ${btnBg}`}
        aria-label={isPlaying ? `Pause background music: ${title}` : `Play background music: ${title}`}
      >
        <span className="text-sm select-none">
          {isPlaying ? "🎶" : "🎵"}
        </span>
        <span className="font-medium text-[11px] truncate max-w-[120px]">
          {isPlaying ? "Music Playing" : "Play Music"}
        </span>
      </button>

      {isPlaying && (
        <button
          type="button"
          data-testid="soundtrack-mute-btn"
          onClick={toggleMute}
          className={`w-7 h-7 rounded-full flex items-center justify-center text-xs border backdrop-blur-md transition-all cursor-pointer ${btnBg}`}
          aria-label={isMuted ? "Unmute music" : "Mute music"}
          title={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? "🔇" : "🔊"}
        </button>
      )}

      {hasError && (
        <span className="text-[10px] text-rose-400">Error loading track</span>
      )}
    </div>
  );
};
