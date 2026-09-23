"use client";

import React, { useState, useRef, useEffect } from "react";
import { VoiceNotePublishedConfig } from "./schema";
import { ModuleRenderProps } from "../types";

export const VoiceNoteModule: React.FC<ModuleRenderProps<VoiceNotePublishedConfig>> = ({
  config,
  theme = "midnight-rose",
  className = "",
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(config.duration || 0);
  const [audioError, setAudioError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration) && isFinite(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    const handleError = () => {
      setIsPlaying(false);
      setAudioError("Unable to play audio");
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
    };
  }, []);

  if (!config.enabled || !config.url) {
    return null;
  }

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      try {
        setAudioError(null);
        await audio.play();
        setIsPlaying(true);
      } catch (err: any) {
        setIsPlaying(false);
        setAudioError("Tap to allow audio playback");
      }
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  // Template aesthetics
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
    ? "bg-gradient-to-r from-pink-500/10 via-sky-500/10 to-purple-500/10 border-pink-300/30 text-pink-950 shadow-md rounded-2xl"
    : isKage
    ? "bg-[#0d1310]/90 border-emerald-500/20 text-emerald-100 shadow-xl rounded-xl"
    : "bg-[#180814]/90 border-rose-500/30 text-rose-100 shadow-2xl rounded-2xl"; // Midnight Rose default

  const playBtnClasses = isCloudNine
    ? "bg-pink-500 hover:bg-pink-600 text-white shadow-pink-500/30"
    : isKage
    ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-500/30"
    : "bg-gradient-to-br from-rose-500 to-rose-700 hover:from-rose-600 hover:to-rose-800 text-white shadow-rose-900/40";

  const sealIcon = isCloudNine ? "✨" : isKage ? "🔔" : "🎙️";

  return (
    <div
      data-testid="module-voice-note"
      className={`relative w-full max-w-md mx-auto p-4 sm:p-5 border backdrop-blur-md transition-all my-6 ${containerClasses} ${className}`}
    >
      <audio ref={audioRef} src={config.url} preload="metadata" />

      {/* Header / Seal Tag */}
      <div className="flex items-center justify-between mb-3 text-xs opacity-75 font-ui">
        <div className="flex items-center gap-1.5 font-medium">
          <span className="text-base select-none">{sealIcon}</span>
          <span>{config.title || "Voice Note"}</span>
        </div>
        <span className="font-mono text-[11px]">
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>
      </div>

      {/* Main Controls row */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          data-testid="voice-note-toggle-btn"
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause voice note" : "Play voice note"}
          className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 shadow-lg cursor-pointer transition-transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 ${playBtnClasses}`}
        >
          {isPlaying ? (
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            <svg className="w-5 h-5 fill-current translate-x-0.5" viewBox="0 0 24 24">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          )}
        </button>

        <div className="flex-1 space-y-1">
          <input
            type="range"
            data-testid="voice-note-scrubber"
            min={0}
            max={duration || 100}
            step={0.1}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-rose-400 focus:outline-none"
            aria-label="Seek audio"
          />
          {config.caption && (
            <p className="text-[11px] opacity-70 italic font-romantic truncate">
              {config.caption}
            </p>
          )}
        </div>
      </div>

      {audioError && (
        <p className="text-[11px] text-rose-400 text-center mt-2 font-ui">{audioError}</p>
      )}
    </div>
  );
};
