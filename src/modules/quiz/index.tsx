"use client";

import React, { useState } from "react";
import { QuizPublishedConfig } from "./schema";
import { ModuleRenderProps } from "../types";
import { ModuleShell } from "../primitives/ModuleShell";
import { ModuleHeader } from "../primitives/ModuleHeader";

export const QuizModule: React.FC<ModuleRenderProps<QuizPublishedConfig>> = ({
  config,
  theme = "midnight-rose",
  className = "",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  if (!config.enabled || !config.questions || config.questions.length === 0) {
    return null;
  }

  const currentQ = config.questions[currentIndex];
  const totalQuestions = config.questions.length;

  const isCloudNine = theme === "cloud-nine" || theme === "blush-sky" || theme === "peach-sorbet" || theme === "lavender-mist";
  const isKage = theme === "kage";

  const handleSelectOption = (index: number) => {
    if (hasAnswered) return;
    setSelectedIndex(index);
    setHasAnswered(true);
    if (index === currentQ.correctIndex) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < totalQuestions) {
      setCurrentIndex((i) => i + 1);
      setSelectedIndex(null);
      setHasAnswered(false);
    } else {
      setIsCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedIndex(null);
    setHasAnswered(false);
    setScore(0);
    setIsCompleted(false);
  };

  const progressPct = Math.round(((currentIndex + (hasAnswered ? 1 : 0)) / totalQuestions) * 100);

  let progressBarColor = "bg-gradient-to-r from-rose-500 to-pink-500";
  if (isCloudNine) {
    progressBarColor = "bg-gradient-to-r from-pink-400 to-sky-400";
  } else if (isKage) {
    progressBarColor = "bg-gradient-to-r from-emerald-600 to-teal-400";
  }

  return (
    <ModuleShell
      testId="module-quiz"
      theme={theme}
      badgeIcon="💘"
      badgeText="Love Quiz"
      className={className}
    >
      <ModuleHeader
        title={config.title}
        subtitle={config.subtitle}
        theme={theme}
      />

      <div className="max-w-md mx-auto my-3">
        {/* Progress Bar & Counter */}
        <div className="mb-6">
          <div className="flex justify-between items-center text-[11px] font-sans font-medium uppercase tracking-wider mb-2 opacity-80">
            <span>
              {isCompleted ? "Complete!" : `Question ${currentIndex + 1} of ${totalQuestions}`}
            </span>
            <span>{isCompleted ? "100%" : `${progressPct}%`}</span>
          </div>
          <div className="w-full h-1.5 bg-black/20 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${progressBarColor}`}
              style={{ width: `${isCompleted ? 100 : progressPct}%` }}
            />
          </div>
        </div>

        {/* Quiz Content or Completion State */}
        {!isCompleted ? (
          <div className="space-y-6">
            {/* Question Card */}
            <div className="text-center sm:text-left">
              <h3
                data-testid="quiz-question-text"
                className="text-lg sm:text-xl font-serif font-medium leading-relaxed"
              >
                {currentQ.question}
              </h3>
            </div>

            {/* Answer Choices */}
            <div className="space-y-2.5" role="radiogroup" aria-label={currentQ.question}>
              {currentQ.options.map((option, idx) => {
                const isSelected = selectedIndex === idx;
                const isCorrect = currentQ.correctIndex === idx;

                let optionStyles = "w-full text-left p-4 rounded-xl text-sm font-sans font-medium border transition-all duration-300 flex items-center justify-between cursor-pointer focus:outline-none focus:ring-2 ";

                if (!hasAnswered) {
                  if (isCloudNine) {
                    optionStyles += "bg-white/80 hover:bg-pink-50 border-pink-200/80 text-pink-950 focus:ring-pink-400 shadow-sm";
                  } else if (isKage) {
                    optionStyles += "bg-[#141e18]/80 hover:bg-[#1c2b22] border-emerald-900/50 text-[#dfe7e2] focus:ring-emerald-400";
                  } else {
                    optionStyles += "bg-[#25081b]/80 hover:bg-[#340c26] border-rose-500/30 text-rose-100 focus:ring-rose-400";
                  }
                } else {
                  if (isCorrect) {
                    optionStyles += "bg-emerald-950/70 border-emerald-500 text-emerald-200 shadow-md";
                  } else if (isSelected && !isCorrect) {
                    optionStyles += "bg-rose-950/70 border-rose-500 text-rose-200 opacity-90";
                  } else {
                    optionStyles += "opacity-50 border-transparent bg-black/10";
                  }
                }

                return (
                  <button
                    key={`q-${currentIndex}-opt-${idx}`}
                    type="button"
                    data-testid={`quiz-option-${idx}`}
                    disabled={hasAnswered}
                    onClick={() => handleSelectOption(idx)}
                    className={optionStyles}
                    aria-checked={isSelected}
                    role="radio"
                  >
                    <span>{option}</span>
                    {hasAnswered && isCorrect && <span className="text-emerald-400">✓</span>}
                    {hasAnswered && isSelected && !isCorrect && (
                      <span className="text-rose-400">✗</span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Answer Feedback & Explanation */}
            {hasAnswered && (
              <div
                data-testid="quiz-feedback-box"
                className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2 animate-fadeIn"
              >
                <div className="flex items-center gap-2 font-serif font-medium text-sm">
                  {selectedIndex === currentQ.correctIndex ? (
                    <span className="text-emerald-400">✨ You know me so well!</span>
                  ) : (
                    <span className="text-rose-300">🥰 Close enough! (I love you anyway)</span>
                  )}
                </div>
                {currentQ.explanation && (
                  <p className="text-xs opacity-80 leading-relaxed font-light">
                    {currentQ.explanation}
                  </p>
                )}
                <div className="pt-2 text-right">
                  <button
                    type="button"
                    data-testid="quiz-next-button"
                    onClick={handleNext}
                    className="px-5 py-1.5 rounded-full text-xs uppercase tracking-wider font-sans font-medium bg-rose-600 hover:bg-rose-500 text-white shadow transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-rose-400"
                  >
                    {currentIndex + 1 < totalQuestions ? "Next Question →" : "See Final Score 💌"}
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Completion Keepsake */
          <div
            data-testid="quiz-completion-container"
            className="text-center py-6 px-4 space-y-4 rounded-2xl bg-white/5 border border-white/10 animate-fadeIn"
          >
            <div className="text-4xl animate-bounce">💖</div>
            <h3 className="text-2xl font-serif font-medium">
              You Scored {score} of {totalQuestions}!
            </h3>
            <p className="text-sm font-sans font-light leading-relaxed max-w-sm mx-auto whitespace-pre-wrap opacity-90">
              {config.completionMessage}
            </p>
            <div className="pt-3">
              <button
                type="button"
                data-testid="quiz-restart-button"
                onClick={handleRestart}
                className="px-4 py-1.5 rounded-full text-xs font-sans uppercase tracking-wider opacity-75 hover:opacity-100 border border-current transition-all"
              >
                Play Again ↺
              </button>
            </div>
          </div>
        )}
      </div>
    </ModuleShell>
  );
};
