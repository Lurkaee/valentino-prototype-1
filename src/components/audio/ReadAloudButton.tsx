"use client";

import React, { useState, useEffect, useRef } from "react";

interface ReadAloudButtonProps {
  textToRead: string;
  className?: string;
  theme?: string;
}

export const ReadAloudButton: React.FC<ReadAloudButtonProps> = ({
  textToRead,
  className = "",
  theme = "midnight-rose",
}) => {
  const [supported, setSupported] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      setSupported(true);
    }
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  if (!supported || !textToRead.trim()) {
    return null;
  }

  const handleToggle = () => {
    if (!("speechSynthesis" in window)) return;

    if (isSpeaking && !isPaused) {
      // Pause
      window.speechSynthesis.pause();
      setIsPaused(true);
    } else if (isSpeaking && isPaused) {
      // Resume
      window.speechSynthesis.resume();
      setIsPaused(false);
    } else {
      // Start fresh
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.rate = 0.92; // slightly slower, romantic cadence
      utterance.pitch = 1.0;

      // Try to pick a natural voice if available
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(
        (v) =>
          v.lang.startsWith("en") &&
          (v.name.includes("Natural") ||
            v.name.includes("Samantha") ||
            v.name.includes("Google") ||
            v.name.includes("Karen"))
      );
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      utterance.onstart = () => {
        setIsSpeaking(true);
        setIsPaused(false);
      };

      utterance.onend = () => {
        setIsSpeaking(false);
        setIsPaused(false);
      };

      utterance.onerror = () => {
        setIsSpeaking(false);
        setIsPaused(false);
      };

      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleStop = (e: React.MouseEvent) => {
    e.stopPropagation();
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    setIsPaused(false);
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
    ? "bg-pink-100 hover:bg-pink-200 text-pink-900 border-pink-300"
    : isKage
    ? "bg-emerald-950/80 hover:bg-emerald-900 text-emerald-200 border-emerald-500/40"
    : "bg-rose-950/70 hover:bg-rose-900 text-rose-200 border-rose-500/40";

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <button
        type="button"
        data-testid="read-aloud-toggle-btn"
        onClick={handleToggle}
        className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-ui border transition-all cursor-pointer shadow-sm active:scale-95 focus:outline-none focus:ring-2 focus:ring-rose-400 ${btnBg}`}
        aria-label={
          isSpeaking
            ? isPaused
              ? "Resume reading letter aloud"
              : "Pause reading letter aloud"
            : "Listen to the letter"
        }
      >
        <span className="text-sm select-none">
          {isSpeaking && !isPaused ? "⏸️" : "🗣️"}
        </span>
        <span className="font-medium">
          {isSpeaking
            ? isPaused
              ? "Resume Reading"
              : "Listening..."
            : "Listen to Letter"}
        </span>
        {isSpeaking && !isPaused && (
          <span className="flex items-center gap-0.5 ml-1">
            <span className="w-1 h-3 bg-current rounded-full animate-pulse" />
            <span className="w-1 h-4 bg-current rounded-full animate-pulse delay-75" />
            <span className="w-1 h-2 bg-current rounded-full animate-pulse delay-150" />
          </span>
        )}
      </button>

      {isSpeaking && (
        <button
          type="button"
          data-testid="read-aloud-stop-btn"
          onClick={handleStop}
          className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white/80 flex items-center justify-center text-xs transition-colors cursor-pointer border border-white/20"
          aria-label="Stop reading aloud"
          title="Stop reading aloud"
        >
          ⏹
        </button>
      )}
    </div>
  );
};
