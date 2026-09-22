"use client";

import React from "react";
import Link from "next/link";

export type CapabilityKey = "letter" | "timeline" | "quiz" | "secret" | "openWhen";

export interface CapabilityMeta {
  key: CapabilityKey;
  label: string;
  icon: string;
  description: string;
}

export const CAPABILITY_CONFIG: Record<CapabilityKey, CapabilityMeta> = {
  letter: {
    key: "letter",
    label: "Letter",
    icon: "✉️",
    description: "Heartfelt romantic message and love letter",
  },
  timeline: {
    key: "timeline",
    label: "Timeline",
    icon: "⏳",
    description: "Chronological relationship milestones",
  },
  quiz: {
    key: "quiz",
    label: "Quiz",
    icon: "💘",
    description: "Playful interactive couple trivia challenge",
  },
  secret: {
    key: "secret",
    label: "Secret Note",
    icon: "🔐",
    description: "Tap-to-reveal private mystery message",
  },
  openWhen: {
    key: "openWhen",
    label: "Open When",
    icon: "💌",
    description: "Sealed envelopes for future moments",
  },
};

interface CapabilityChipProps {
  capability: CapabilityKey;
  templateId?: string;
  isAvailable?: boolean;
  isActive?: boolean;
  onClick?: (cap: CapabilityKey) => void;
  href?: string;
  className?: string;
}

export function CapabilityChip({
  capability,
  templateId = "midnight-rose",
  isAvailable = true,
  isActive = false,
  onClick,
  href,
  className = "",
}: CapabilityChipProps) {
  const meta = CAPABILITY_CONFIG[capability] || {
    key: capability,
    label: capability,
    icon: "✦",
    description: "",
  };

  const targetHref = href || `/create?template=${templateId}&focus=${meta.key}`;

  const baseClasses = `group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black select-none ${
    isAvailable
      ? isActive
        ? "bg-rose-500/20 text-rose-200 border border-rose-500/40 shadow-sm"
        : "bg-white/[0.06] text-white/90 hover:text-white hover:bg-white/[0.12] border border-white/10 hover:border-white/20 active:scale-95 cursor-pointer"
      : "bg-white/[0.02] text-white/40 border border-white/[0.04] cursor-not-allowed opacity-60"
  } ${className}`;

  if (!isAvailable) {
    return (
      <span
        className={baseClasses}
        aria-disabled="true"
        title={`${meta.label} (Not available for this template)`}
      >
        <span className="text-[11px] opacity-70" aria-hidden="true">{meta.icon}</span>
        <span>{meta.label}</span>
      </span>
    );
  }

  if (onClick) {
    return (
      <button
        type="button"
        onClick={() => onClick(meta.key)}
        className={baseClasses}
        aria-label={`Open ${meta.label}: ${meta.description}`}
        title={meta.description}
      >
        <span className="text-[11px] transition-transform group-hover:scale-110" aria-hidden="true">
          {meta.icon}
        </span>
        <span>{meta.label}</span>
        <span className="text-[10px] text-white/40 group-hover:text-white/70 transition-colors">→</span>
      </button>
    );
  }

  return (
    <Link
      href={targetHref}
      className={baseClasses}
      aria-label={`Create experience with ${meta.label}: ${meta.description}`}
      title={meta.description}
    >
      <span className="text-[11px] transition-transform group-hover:scale-110" aria-hidden="true">
        {meta.icon}
      </span>
      <span>{meta.label}</span>
      <span className="text-[10px] text-white/40 group-hover:text-white/70 transition-colors">→</span>
    </Link>
  );
}
