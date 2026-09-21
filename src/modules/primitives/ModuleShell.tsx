"use client";

import React from "react";

interface ModuleShellProps {
  id?: string;
  testId?: string;
  theme?: string;
  badgeText?: string;
  badgeIcon?: string;
  className?: string;
  children: React.ReactNode;
}

export const ModuleShell: React.FC<ModuleShellProps> = ({
  id,
  testId,
  theme = "midnight-rose",
  badgeText,
  badgeIcon,
  className = "",
  children,
}) => {
  const isCloudNine = theme === "cloud-nine" || theme === "blush-sky" || theme === "peach-sorbet" || theme === "lavender-mist";
  const isKage = theme === "kage";

  let containerStyles = "relative w-full rounded-2xl p-6 sm:p-8 transition-all duration-300 border ";
  if (isCloudNine) {
    containerStyles += "bg-white/80 border-pink-200/70 shadow-[0_15px_35px_rgba(244,114,182,0.12)] text-[#4A1D2F]";
  } else if (isKage) {
    containerStyles += "bg-[#0b100e]/85 border-emerald-900/40 shadow-[0_15px_35px_rgba(0,0,0,0.7)] text-[#e8eee9]";
  } else {
    // Midnight Rose default
    containerStyles += "bg-[#180410]/90 border-rose-500/25 shadow-[0_15px_35px_rgba(0,0,0,0.6)] text-[#FAF8F5]";
  }

  let badgeStyles = "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] tracking-widest uppercase font-sans font-medium mb-4 ";
  if (isCloudNine) {
    badgeStyles += "bg-pink-100/90 text-pink-900 border border-pink-300/60";
  } else if (isKage) {
    badgeStyles += "bg-emerald-950/70 text-emerald-300 border border-emerald-500/40";
  } else {
    badgeStyles += "bg-rose-950/70 text-rose-200 border border-rose-500/40";
  }

  return (
    <section
      id={id}
      data-testid={testId}
      className={`${containerStyles} ${className}`}
      style={{ overflowWrap: "anywhere" }}
    >
      {badgeText && (
        <div className="flex justify-center">
          <span className={badgeStyles}>
            {badgeIcon && <span className="text-xs">{badgeIcon}</span>}
            <span>{badgeText}</span>
          </span>
        </div>
      )}
      {children}
    </section>
  );
};
