"use client";

import React from "react";

interface ModuleHeaderProps {
  title: string;
  subtitle?: string;
  theme?: string;
  className?: string;
}

export const ModuleHeader: React.FC<ModuleHeaderProps> = ({
  title,
  subtitle,
  theme = "midnight-rose",
  className = "",
}) => {
  const isCloudNine = theme === "cloud-nine" || theme === "blush-sky" || theme === "peach-sorbet" || theme === "lavender-mist";
  const isKage = theme === "kage";

  const titleColor = isCloudNine
    ? "text-pink-950 font-serif"
    : isKage
    ? "text-[#f3f7f4] font-serif"
    : "text-[#FAF8F5] font-serif";

  const subtitleColor = isCloudNine
    ? "text-pink-800/75"
    : isKage
    ? "text-[#a3b8aa]/80"
    : "text-rose-200/70";

  return (
    <div className={`text-center mb-6 space-y-1.5 ${className}`}>
      <h2 className={`text-2xl sm:text-3xl font-medium tracking-wide ${titleColor}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-xs sm:text-sm font-sans font-light max-w-md mx-auto leading-relaxed ${subtitleColor}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};
