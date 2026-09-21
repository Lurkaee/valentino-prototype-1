"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export type SaveStatus = "idle" | "saving" | "saved" | "error" | "conflict" | "offline";

interface StudioHeaderProps {
  partnerName?: string;
  templateName: string;
  templateVersion: string;
  saveStatus: SaveStatus;
  lastSavedTime: string | null;
  isPublishing: boolean;
  mobileTab: "form" | "preview";
  onChangeWorldClick: () => void;
  onPublishClick: () => void;
  onMobileTabChange: (tab: "form" | "preview") => void;
}

export const StudioHeader: React.FC<StudioHeaderProps> = ({
  partnerName,
  templateName,
  templateVersion,
  saveStatus,
  lastSavedTime,
  isPublishing,
  mobileTab,
  onChangeWorldClick,
  onPublishClick,
  onMobileTabChange,
}) => {
  return (
    <header className="px-3 sm:px-6 py-2.5 sm:py-3 border-b border-white/[0.08] bg-[#0A090C]/95 backdrop-blur-md z-20 sticky top-0">
      <div className="flex items-center justify-between gap-2 max-w-full">
        {/* Left: Brand Monogram & Active World Trigger */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0 shrink">
          <Link
            href="/"
            className="flex items-center gap-2 text-white hover:text-white/80 transition-colors group shrink-0"
            title="Return to Valentino Home"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white/[0.06] border border-white/[0.12] flex items-center justify-center text-xs sm:text-sm group-hover:border-white/25 transition-colors">
              💌
            </div>
            <span className="font-display font-medium text-sm tracking-wide hidden md:inline text-white">
              Studio
            </span>
          </Link>

          <span className="text-white/20 hidden sm:inline">/</span>

          {/* Active World Badge with Change World action */}
          <button
            type="button"
            data-testid="change-world-trigger"
            onClick={onChangeWorldClick}
            className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-ui bg-white/[0.05] hover:bg-white/[0.1] text-white/85 hover:text-white border border-white/[0.1] transition-all cursor-pointer shrink-0"
            title="Switch visual world template"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0" />
            <span className="font-medium truncate max-w-[90px] sm:max-w-none">{templateName}</span>
            <span className="text-white/40 text-[9px] font-mono hidden sm:inline">({templateVersion})</span>
            <span className="text-white/40 ml-0.5 text-[10px]">⇄</span>
          </button>
        </div>

        {/* Center / Right: Save Status & Actions */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          <div
            data-testid="save-status-pill"
            data-status={saveStatus}
            className="text-[10px] sm:text-xs px-2 sm:px-3 py-1 rounded-full border border-white/[0.08] bg-white/[0.03] flex items-center gap-1 sm:gap-1.5 font-ui shrink-0"
          >
            {saveStatus === "saving" && (
              <span className="text-amber-400 animate-pulse flex items-center gap-1">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                <span className="hidden sm:inline">Saving…</span>
                <span className="sm:hidden">…</span>
              </span>
            )}
            {saveStatus === "saved" && (
              <span className="text-emerald-400 flex items-center gap-1">
                <span>✓</span>
                <span className="hidden sm:inline">Saved {lastSavedTime ? `at ${lastSavedTime}` : ""}</span>
                <span className="sm:hidden">Saved</span>
              </span>
            )}
            {saveStatus === "error" && <span className="text-rose-400">⚠️ Error</span>}
            {saveStatus === "conflict" && <span className="text-rose-400">⚠️ Conflict</span>}
            {saveStatus === "offline" && <span className="text-amber-400">⚡ Offline</span>}
            {saveStatus === "idle" && (
              <span className="text-white/40">
                <span className="hidden sm:inline">● Unsaved edits</span>
                <span className="sm:hidden">● Unsaved</span>
              </span>
            )}
          </div>

          {/* Mobile View Toggle */}
          <div className="flex md:hidden rounded-lg bg-white/[0.06] p-0.5 border border-white/[0.1] text-xs shrink-0">
            <button
              type="button"
              data-testid="mobile-tab-edit"
              onClick={() => onMobileTabChange("form")}
              className={`px-2.5 py-0.5 rounded-md transition-all font-ui text-[11px] ${
                mobileTab === "form"
                  ? "bg-white text-black font-medium shadow-xs"
                  : "text-white/70 hover:text-white"
              }`}
            >
              Edit
            </button>
            <button
              type="button"
              data-testid="mobile-tab-preview"
              onClick={() => onMobileTabChange("preview")}
              className={`px-2.5 py-0.5 rounded-md transition-all font-ui text-[11px] ${
                mobileTab === "preview"
                  ? "bg-white text-black font-medium shadow-xs"
                  : "text-white/70 hover:text-white"
              }`}
            >
              Preview
            </button>
          </div>

          {/* Publish Action (Desktop / Tablet) */}
          <Button
            type="button"
            data-testid="header-publish-button"
            variant="romantic"
            size="sm"
            disabled={saveStatus === "saving" || isPublishing}
            onClick={onPublishClick}
            className="hidden sm:inline-flex text-xs px-4 rounded-full font-ui shadow-lg shadow-rose-950/40 shrink-0"
          >
            {isPublishing ? "Publishing…" : "Publish Valentine 💌"}
          </Button>
        </div>
      </div>
    </header>
  );
};
