"use client";

import React, { useState } from "react";
import { SecretPublishedConfig } from "./schema";
import { ModuleRenderProps } from "../types";
import { ModuleShell } from "../primitives/ModuleShell";
import { ModuleHeader } from "../primitives/ModuleHeader";
import { RevealCard } from "../primitives/RevealCard";

export const SecretModule: React.FC<ModuleRenderProps<SecretPublishedConfig>> = ({
  config,
  publicId,
  theme = "midnight-rose",
  className = "",
}) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [secretText, setSecretText] = useState<string | null>(config.secretContent || null);
  const [candidateAnswer, setCandidateAnswer] = useState("");
  const [error, setError] = useState<string | null>(null);

  if (!config.enabled) {
    return null;
  }

  const handleReveal = async () => {
    // If secret text is already present (e.g. in preview mode or previously fetched)
    if (secretText) {
      setIsRevealed(true);
      return;
    }

    if (!publicId) {
      setError("Cannot load secret without experience ID");
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/experiences/${publicId}/secret`, {
        headers: { "Cache-Control": "no-store" },
      });
      if (!res.ok) {
        throw new Error("Unable to reveal secret at this time");
      }
      const data = await res.json();
      setSecretText(data.secretContent || "A secret whispered only to you.");
      setIsRevealed(true);
    } catch (err: any) {
      setError(err.message || "Failed to reveal secret");
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuestionVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!candidateAnswer.trim()) return;

    if (!publicId) {
      // In editor preview mode with questionLock
      setIsRevealed(true);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/experiences/${publicId}/secret/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
        },
        body: JSON.stringify({ answer: candidateAnswer }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Incorrect answer");
      }
      setSecretText(data.secretContent || "A secret whispered only to you.");
      setIsRevealed(true);
    } catch (err: any) {
      setError(err.message || "Incorrect answer");
    } finally {
      setIsLoading(false);
    }
  };


  const isCloudNine = theme === "cloud-nine" || theme === "blush-sky" || theme === "peach-sorbet" || theme === "lavender-mist";
  const isKage = theme === "kage";

  const noteCardBg = isCloudNine
    ? "bg-pink-50/90 border-pink-200/90 text-pink-950 shadow-sm"
    : isKage
    ? "bg-[#111915]/95 border-emerald-900/60 text-[#edf4ef] shadow-lg"
    : "bg-[#25081b]/95 border-rose-500/40 text-rose-50 shadow-xl";

  return (
    <ModuleShell
      testId="module-secret"
      theme={theme}
      badgeIcon="🔐"
      badgeText="Secret Note"
      className={className}
    >
      <ModuleHeader
        title={config.title}
        theme={theme}
      />

      <div className="max-w-md mx-auto my-3">
        {config.questionLock?.enabled && !isRevealed ? (
          <div
            data-testid="secret-question-lock-card"
            className={`p-6 sm:p-7 rounded-2xl border text-center transition-all ${noteCardBg}`}
          >
            <div className="text-3xl mb-2 select-none">🗝️</div>
            <h4 className="text-sm font-display font-medium mb-1">
              Secret Question
            </h4>
            <p className="text-xs opacity-80 font-romantic mb-4 leading-relaxed">
              {config.questionLock.question}
            </p>

            <form onSubmit={handleQuestionVerify} className="space-y-3">
              <input
                type="text"
                data-testid="secret-question-input"
                value={candidateAnswer}
                onChange={(e) => setCandidateAnswer(e.target.value)}
                placeholder="Type your answer..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/20 text-white text-xs text-center focus:outline-none focus:ring-2 focus:ring-rose-400 placeholder:text-white/40"
                required
                disabled={isLoading}
              />
              <button
                type="submit"
                data-testid="secret-question-submit"
                disabled={isLoading || !candidateAnswer.trim()}
                className="w-full py-2.5 rounded-xl text-xs font-ui font-medium bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white shadow-md transition-all cursor-pointer active:scale-95 disabled:opacity-50"
              >
                {isLoading ? "Verifying..." : "Unlock Secret"}
              </button>
            </form>

            {error && (
              <p
                data-testid="secret-verify-error"
                className="text-xs text-rose-400 font-ui mt-3 animate-fadeIn"
              >
                {error}
              </p>
            )}
          </div>
        ) : (
          <RevealCard
            isRevealed={isRevealed}
            onReveal={handleReveal}
            prompt={config.prompt}
            hint={config.hint}
            theme={theme}
            testId="secret-reveal-card"
          >
            <div
              data-testid="secret-revealed-content"
              className={`p-6 sm:p-8 rounded-2xl border transition-all duration-500 text-center relative overflow-hidden ${noteCardBg}`}
            >
              <div className="text-3xl mb-3 opacity-90 select-none">
                {isCloudNine ? "🗝️" : isKage ? "⛩️" : "💌"}
              </div>

              <p className="text-base sm:text-lg font-serif italic leading-relaxed whitespace-pre-wrap">
                “{secretText}”
              </p>

              <div className="mt-6 pt-4 border-t border-black/10 flex items-center justify-between text-[10px] uppercase font-sans tracking-widest opacity-65">
                <span>Kept between us</span>
                <span>✦ Sealed</span>
              </div>
            </div>
          </RevealCard>
        )}

        {isLoading && !config.questionLock?.enabled && (
          <p className="text-xs text-center font-sans tracking-wider uppercase mt-3 animate-pulse opacity-70">
            Unlocking secret note...
          </p>
        )}

        {error && !config.questionLock?.enabled && (
          <p className="text-xs text-rose-400 text-center font-sans mt-3">
            {error}
          </p>
        )}
      </div>

    </ModuleShell>
  );
};
