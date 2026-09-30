"use client";

import React, { useState } from "react";
import { ApricotFilmPublishedConfig } from "./schema";
import { RenderMode } from "../../types";
import { ModulesRenderer } from "@/modules/ModulesRenderer";
import { DimensionalWorld } from "@/worlds/DimensionalWorld";
import { MediaSlot } from "../../shared/MediaSlot";

interface ComponentProps {
  config: ApricotFilmPublishedConfig;
  mode: RenderMode;
  publicId?: string;
}

export const ApricotFilmComponent: React.FC<ComponentProps> = ({ config, mode, publicId }) => {
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <DimensionalWorld
      theme="apricot-film"
      accentVariant={config.accentTheme}
      recipientName={config.partnerName}
      greeting={config.greeting}
      pacing={config.narrative?.pacing || "calm"}
      activeScene={isRevealed ? "story" : "welcome"}
    >
      <div
        data-testid="experience-container"
        className="relative min-h-[100dvh] w-full text-[#FFF8F0] overflow-x-hidden flex flex-col items-center justify-between p-4 sm:p-8"
      >
        {/* Top Minimal Navigation */}
        <div className="relative z-30 w-full max-w-2xl mx-auto flex items-center justify-between py-2 mb-4">
          {mode === "preview" ? (
            <div className="px-3.5 py-1 rounded-full text-[10px] tracking-widest uppercase bg-[#24140A]/80 text-[#F4A261] border border-[#E76F51]/30 backdrop-blur-md">
              Live Preview
            </div>
          ) : (
            <div className="text-[10px] tracking-[0.25em] uppercase text-[#D4A373]/60 font-sans">
              16mm Analog Dispatch
            </div>
          )}
        </div>

        {/* Main Stage */}
        <div className="relative z-10 w-full max-w-lg mx-auto flex flex-col items-center my-auto">
          {/* Greeting Header */}
          <div className="text-center mb-6">
            <span className="inline-block text-[11px] uppercase tracking-widest px-4 py-1 rounded-full border border-[#E76F51]/30 bg-[#24140A]/70 text-[#F4A261] mb-3">
              {config.greeting || "To My Favorite Memory"}
            </span>
            <h1
              data-testid="recipient-name"
              className="text-3xl sm:text-4xl font-serif font-medium text-[#FFF8F0] tracking-wide"
            >
              {config.partnerName || "Dearest"}
            </h1>
          </div>

          {/* Analog Film Slide / Letter Card */}
          <div className="relative w-full rounded-2xl bg-[#1E120A]/90 border border-[#E76F51]/25 p-6 sm:p-8 shadow-2xl backdrop-blur-md">
            {/* Film sprocket decoration */}
            <div className="flex justify-between items-center pb-4 mb-4 border-b border-[#E76F51]/20 text-[10px] font-mono text-[#D4A373]/70 uppercase tracking-widest">
              <span>● REEL 0214</span>
              <span>16MM ANALOG KODAK</span>
              <span>ISO 400 ●</span>
            </div>

            {/* Letter Content */}
            <div
              data-testid="letter-message"
              className="whitespace-pre-wrap font-serif text-base sm:text-lg text-[#FFF8F0]/90 leading-relaxed"
            >
              {config.message || "Some memories feel bathed in everlasting golden afternoon light."}
            </div>

            {/* Sign Off */}
            <div className="text-right pt-6 mt-6 border-t border-[#E76F51]/20">
              <p className="text-[10px] uppercase tracking-widest text-[#D4A373]/70 font-sans mb-1">
                {config.signOff || "Forever in golden hour"}
              </p>
              <p
                data-testid="sender-name"
                className="text-2xl font-serif text-[#E76F51]"
              >
                {config.senderName || "Yours Always"}
              </p>
            </div>

            {/* Media Keepsake */}
            {config.heroMediaId && (
              <div className="pt-6">
                <div className="rounded-xl overflow-hidden border border-[#E76F51]/30 shadow-lg aspect-[4/3]">
                  <MediaSlot
                    media={{ url: config.heroMediaId, altText: "Film Memory" }}
                    fallbackText="Golden Memory"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}

            {/* Modules */}
            {config.modules && (
              <div className="pt-6">
                <ModulesRenderer
                  modules={config.modules}
                  moduleOrder={config.moduleOrder}
                  narrative={config.narrative}
                  mode={mode}
                  publicId={publicId}
                  theme="apricot-film"
                />
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="relative z-20 w-full py-4 text-center text-[10px] text-[#D4A373]/40 font-sans tracking-widest">
          VALENTINO · APRICOT FILM
        </footer>
      </div>
    </DimensionalWorld>
  );
};
