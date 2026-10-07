"use client";

import React from "react";

export interface MobileWorkspaceSwitcherProps {
  activeTab: "form" | "preview";
  onTabChange: (tab: "form" | "preview") => void;
  isInputFocused?: boolean;
}

/**
 * MobileWorkspaceSwitcher
 * A restrained, tactile floating studio instrument docked in the lower thumb zone on phones.
 * Provides comfortable 1-hand switching between Editor and Live Preview with safe-area insets.
 */
export const MobileWorkspaceSwitcher: React.FC<MobileWorkspaceSwitcherProps> = ({
  activeTab,
  onTabChange,
  isInputFocused = false,
}) => {
  return (
    <div
      role="tablist"
      aria-label="Mobile workspace view switcher"
      data-testid="mobile-workspace-switcher"
      className={`lg:hidden fixed left-1/2 -translate-x-1/2 z-40 transition-all duration-200 ease-out select-none pointer-events-auto ${
        isInputFocused
          ? "opacity-0 translate-y-3 pointer-events-none"
          : "opacity-100 translate-y-0"
      } ${
        activeTab === "preview"
          ? "bottom-[max(1.25rem,calc(env(safe-area-inset-bottom)+0.75rem))]"
          : "bottom-[max(4.25rem,calc(env(safe-area-inset-bottom)+3.5rem))]"
      }`}
    >
      <div className="flex items-center p-1 rounded-full bg-[#121017]/95 backdrop-blur-xl border border-white/[0.14] shadow-[0_12px_36px_rgba(0,0,0,0.85)] ring-1 ring-white/5">
        {/* Editor Tab Button */}
        <button
          type="button"
          role="tab"
          id="mobile-tab-edit"
          data-testid="mobile-tab-edit"
          aria-selected={activeTab === "form"}
          aria-controls="studio-inspector-pane"
          onClick={() => onTabChange("form")}
          className={`relative px-4 py-2 min-h-[44px] min-w-[84px] rounded-full text-xs font-serif uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            activeTab === "form"
              ? "bg-white text-black font-semibold shadow-md shadow-black/50"
              : "text-white/60 hover:text-white"
          }`}
        >
          <span className="text-[12px] opacity-80" aria-hidden="true">✎</span>
          <span>Edit</span>
        </button>

        {/* Live Preview Tab Button */}
        <button
          type="button"
          role="tab"
          id="mobile-tab-preview"
          data-testid="mobile-tab-preview"
          aria-selected={activeTab === "preview"}
          aria-controls="studio-preview-canvas"
          onClick={() => onTabChange("preview")}
          className={`relative px-4 py-2 min-h-[44px] min-w-[84px] rounded-full text-xs font-serif uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            activeTab === "preview"
              ? "bg-white text-black font-semibold shadow-md shadow-black/50"
              : "text-white/60 hover:text-white"
          }`}
        >
          <span className="text-[12px] opacity-80" aria-hidden="true">👁</span>
          <span>Preview</span>
        </button>
      </div>
    </div>
  );
};
