"use client";

import React, { useState } from "react";
import { WildflowerPaperPublishedConfig } from "./schema";
import { RenderMode } from "../../types";
import { ModulesRenderer } from "@/modules/ModulesRenderer";
import { DimensionalWorld } from "@/worlds/DimensionalWorld";
import { MediaSlot } from "../../shared/MediaSlot";

interface ComponentProps {
  config: WildflowerPaperPublishedConfig;
  mode: RenderMode;
  publicId?: string;
}

export const WildflowerPaperComponent: React.FC<ComponentProps> = ({ config, mode, publicId }) => {
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <DimensionalWorld
      theme="wildflower-paper"
      accentVariant={config.accentTheme}
      recipientName={config.partnerName}
      greeting={config.greeting}
      pacing={config.narrative?.pacing || "calm"}
      activeScene={isRevealed ? "story" : "welcome"}
    >
      <div
        data-testid="experience-container"
        className="relative min-h-[100dvh] w-full text-[#F7F9F5] overflow-x-hidden flex flex-col items-center justify-between p-4 sm:p-8"
      >
        {/* Top Minimal Navigation */}
        <div className="relative z-30 w-full max-w-2xl mx-auto flex items-center justify-between py-2 mb-4">
          {mode === "preview" ? (
            <div className="px-3.5 py-1 rounded-full text-[10px] tracking-widest uppercase bg-[#1B281F]/80 text-[#C084FC] border border-[#A3B899]/30 backdrop-blur-md">
              Live Preview
            </div>
          ) : (
            <div className="text-[10px] tracking-[0.25em] uppercase text-[#A3B899]/60 font-sans">
              Pressed Botanical Note
            </div>
          )}
        </div>

        {/* Main Stage */}
        <div className="relative z-10 w-full max-w-lg mx-auto flex flex-col items-center my-auto">
          {/* Greeting Header */}
          <div className="text-center mb-6">
            <span className="inline-block text-[11px] uppercase tracking-widest px-4 py-1 rounded-full border border-[#A3B899]/30 bg-[#16241A]/70 text-[#A3B899] mb-3">
              {config.greeting || "To My Gentlest Blossom"}
            </span>
            <h1
              data-testid="recipient-name"
              className="text-3xl sm:text-4xl font-serif font-medium text-[#F7F9F5] tracking-wide"
            >
              {config.partnerName || "Dearest"}
            </h1>
          </div>

          {/* Deckled Edge Botanical Card */}
          <div className="relative w-full rounded-2xl bg-[#151F18]/90 border border-[#A3B899]/25 p-6 sm:p-8 shadow-2xl backdrop-blur-md">
            {/* Botanical border accent */}
            <div className="flex justify-between items-center pb-4 mb-4 border-b border-[#A3B899]/20 text-[10px] font-mono text-[#A3B899]/70 uppercase tracking-widest">
              <span>✤ MEADOW PRESS</span>
              <span>ORGANIC COTTON FIBER</span>
              <span>SERIES 0214 ✤</span>
            </div>

            {/* Letter Content */}
            <div
              data-testid="letter-message"
              className="whitespace-pre-wrap font-serif text-base sm:text-lg text-[#F7F9F5]/90 leading-relaxed"
            >
              {config.message || "Our love is like pressed wildflowers inside an artisan journal — quiet, enduring, and honest."}
            </div>

            {/* Sign Off */}
            <div className="text-right pt-6 mt-6 border-t border-[#A3B899]/20">
              <p className="text-[10px] uppercase tracking-widest text-[#A3B899]/70 font-sans mb-1">
                {config.signOff || "Grown in love"}
              </p>
              <p
                data-testid="sender-name"
                className="text-2xl font-serif text-[#C084FC]"
              >
                {config.senderName || "Yours Always"}
              </p>
            </div>

            {/* Media Keepsake */}
            {config.heroMediaId && (
              <div className="pt-6">
                <div className="rounded-xl overflow-hidden border border-[#A3B899]/30 shadow-lg aspect-[4/3]">
                  <MediaSlot
                    media={{ url: config.heroMediaId, altText: "Botanical Memory" }}
                    fallbackText="Treasured Memory"
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
                  theme="wildflower-paper"
                />
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="relative z-20 w-full py-4 text-center text-[10px] text-[#A3B899]/40 font-sans tracking-widest">
          VALENTINO · WILDFLOWER PAPER
        </footer>
      </div>
    </DimensionalWorld>
  );
};
