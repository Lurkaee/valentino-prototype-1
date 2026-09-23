"use client";

import React from "react";

interface PrintKeepsakeButtonProps {
  className?: string;
  theme?: string;
}

export const PrintKeepsakeButton: React.FC<PrintKeepsakeButtonProps> = ({
  className = "",
  theme = "midnight-rose",
}) => {
  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
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

  const btnBg = isCloudNine
    ? "bg-white/80 hover:bg-white text-pink-950 border-pink-200"
    : isKage
    ? "bg-[#111915] hover:bg-[#18231e] text-emerald-200 border-emerald-500/30"
    : "bg-[#1b0817] hover:bg-[#280c22] text-rose-200 border-rose-500/30";

  return (
    <button
      type="button"
      data-testid="save-keepsake-btn"
      onClick={handlePrint}
      className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-ui border transition-all cursor-pointer shadow-sm active:scale-95 focus:outline-none focus:ring-2 focus:ring-rose-400 no-print ${btnBg} ${className}`}
      aria-label="Save as Keepsake PDF"
      title="Save or Print as Keepsake"
    >
      <span className="text-sm select-none">🖨️</span>
      <span className="font-medium text-[11px]">Save as Keepsake</span>
    </button>
  );
};
