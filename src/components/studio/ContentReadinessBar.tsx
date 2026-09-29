"use client";

import React from "react";

interface ContentReadinessBarProps {
  partnerName?: string;
  senderName?: string;
  message?: string;
  activeMomentsCount: number;
}

export const ContentReadinessBar: React.FC<ContentReadinessBarProps> = ({
  partnerName,
  senderName,
  message,
  activeMomentsCount,
}) => {
  const hasPartner = Boolean(partnerName?.trim());
  const hasSender = Boolean(senderName?.trim());
  const hasMessage = Boolean(message?.trim());

  const isLetterReady = hasPartner && hasSender && hasMessage;

  return (
    <div
      data-testid="content-readiness-bar"
      className="px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] flex flex-wrap items-center justify-between gap-3 text-xs font-ui"
    >
      {/* Left: Warm Advisory Guidance */}
      <div className="flex items-center gap-2 text-white/80">
        <span className="text-base select-none">{isLetterReady ? "✨" : "✍️"}</span>
        <span>
          {isLetterReady ? (
            <span className="text-emerald-300 font-medium">Your letter is complete and ready to seal</span>
          ) : !hasPartner ? (
            <span>Add your partner&apos;s name to personalize your letter</span>
          ) : !hasSender ? (
            <span>Add your signature / sender name</span>
          ) : (
            <span>Write what&apos;s in your heart to complete the note</span>
          )}
        </span>
      </div>

      {/* Right: Moments Summary & Mood Status */}
      <div className="flex items-center gap-3 text-white/50 text-[11px]">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-400/80" />
          <span>
            {activeMomentsCount === 0
              ? "No moments yet (optional)"
              : activeMomentsCount === 1
              ? "1 moment crafted"
              : `${activeMomentsCount} moments crafted`}
          </span>
        </span>
        <span className="text-white/20">•</span>
        <span className="text-white/60">Crafted with care</span>
      </div>
    </div>
  );
};
