"use client";

import React, { useState } from "react";
import { OpenWhenPublishedConfig } from "./schema";
import { ModuleRenderProps } from "../types";
import { ModuleShell } from "../primitives/ModuleShell";
import { ModuleHeader } from "../primitives/ModuleHeader";
import { MediaSlot } from "@/templates/shared/MediaSlot";

export const OpenWhenModule: React.FC<ModuleRenderProps<OpenWhenPublishedConfig>> = ({
  config,
  theme = "midnight-rose",
  className = "",
}) => {
  const [openedId, setOpenedId] = useState<string | null>(null);

  if (!config.enabled || !config.envelopes || config.envelopes.length === 0) {
    return null;
  }

  const isCloudNine = theme === "cloud-nine" || theme === "blush-sky" || theme === "peach-sorbet" || theme === "lavender-mist";
  const isKage = theme === "kage";

  const envelopeCardBg = isCloudNine
    ? "bg-white/90 border-pink-200/80 text-pink-950 hover:border-pink-300"
    : isKage
    ? "bg-[#131d17]/85 border-emerald-900/50 text-[#dfe8e3] hover:border-emerald-700/60"
    : "bg-[#200615]/85 border-rose-500/30 text-rose-100 hover:border-rose-400/50";

  const openedCardBg = isCloudNine
    ? "bg-pink-50/95 border-pink-300 text-pink-950 shadow-md"
    : isKage
    ? "bg-[#0d1410]/95 border-emerald-700 text-[#e9f2eb] shadow-xl"
    : "bg-[#28071c]/95 border-rose-500 text-rose-50 shadow-xl";

  return (
    <ModuleShell
      testId="module-open-when"
      theme={theme}
      badgeIcon="💌"
      badgeText="Open When Letters"
      className={className}
    >
      <ModuleHeader
        title={config.title}
        subtitle={config.subtitle}
        theme={theme}
      />

      <div className="max-w-xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
        {config.envelopes.map((env, idx) => {
          const isOpen = openedId === env.id;

          return (
            <div
              key={env.id || `env-${idx}`}
              data-testid={`open-when-envelope-${idx}`}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                isOpen ? `col-span-1 sm:col-span-2 p-6 ${openedCardBg}` : `p-5 ${envelopeCardBg}`
              }`}
            >
              {!isOpen ? (
                <button
                  type="button"
                  data-testid={`open-when-trigger-${idx}`}
                  onClick={() => setOpenedId(env.id)}
                  className="w-full text-left flex flex-col justify-between h-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-rose-400 rounded-lg"
                  aria-expanded="false"
                  aria-label={`Open letter: ${env.title}`}
                >
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className="text-2xl select-none">
                      {isCloudNine ? "☁️" : isKage ? "🏮" : "✉️"}
                    </span>
                    <span className="text-[10px] font-sans font-medium uppercase tracking-widest opacity-60">
                      Tap to open
                    </span>
                  </div>
                  <div>
                    <h3 className="font-serif font-medium text-base sm:text-lg mb-1 leading-snug">
                      {env.title}
                    </h3>
                    {env.context && (
                      <p className="text-xs font-sans opacity-70 italic font-light">
                        {env.context}
                      </p>
                    )}
                  </div>
                </button>
              ) : (
                /* Unfolded Letter Content */
                <div className="space-y-4 animate-fadeIn" data-testid={`open-when-content-${idx}`}>
                  <div className="flex items-start justify-between border-b border-black/10 pb-3">
                    <div>
                      <span className="text-[10px] font-sans font-semibold uppercase tracking-widest opacity-60 block mb-1">
                        Open When Letter
                      </span>
                      <h3 className="font-serif font-medium text-lg sm:text-xl">
                        {env.title}
                      </h3>
                      {env.context && (
                        <p className="text-xs opacity-75 font-light italic">
                          {env.context}
                        </p>
                      )}
                    </div>
                    <button
                      type="button"
                      data-testid={`open-when-close-${idx}`}
                      onClick={() => setOpenedId(null)}
                      className="px-3 py-1 rounded-full text-xs font-sans uppercase tracking-wider bg-black/10 hover:bg-black/20 transition-colors cursor-pointer"
                      aria-label="Fold and seal letter back"
                    >
                      Reseal ✕
                    </button>
                  </div>

                  <div className="whitespace-pre-wrap font-serif text-sm sm:text-base leading-relaxed py-2">
                    {env.message}
                  </div>

                  {env.mediaId && (
                    <div className="overflow-hidden rounded-xl max-h-56 w-full border border-black/10">
                      <MediaSlot
                        media={
                          env.mediaId.startsWith("http") || env.mediaId.startsWith("/")
                            ? { url: env.mediaId, altText: env.title }
                            : null
                        }
                        fallbackText={env.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  <div className="text-right pt-2 border-t border-black/10">
                    <button
                      type="button"
                      onClick={() => setOpenedId(null)}
                      className="text-xs font-sans opacity-80 hover:opacity-100 underline cursor-pointer"
                    >
                      Fold letter back
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </ModuleShell>
  );
};
