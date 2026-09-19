"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useParams } from "next/navigation";
import { ExperienceRenderer } from "@/templates/ExperienceRenderer";
import {
  MidnightRoseDraftConfig,
  ACCENT_THEMES,
  AccentTheme,
} from "@/templates/midnight-rose/v1/schema";

type SaveStatus = "idle" | "saving" | "saved" | "error" | "conflict" | "offline";

export default function EditExperiencePage() {
  const params = useParams<{ publicId: string }>();
  const publicId = params.publicId;

  const [config, setConfig] = useState<MidnightRoseDraftConfig>({
    partnerName: "",
    senderName: "",
    greeting: "To my favorite person",
    message: "",
    signOff: "With all my love",
    accentTheme: "crimson-rose",
  });

  const [revision, setRevision] = useState<number>(1);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [lastSavedTime, setLastSavedTime] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const [publishModalOpen, setPublishModalOpen] = useState(false);
  const [publishErrors, setPublishErrors] = useState<string[]>([]);
  const [isPublishing, setIsPublishing] = useState(false);
  const [publicUrl, setPublicUrl] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const configRef = useRef(config);
  configRef.current = config;
  const revisionRef = useRef(revision);
  revisionRef.current = revision;
  const isDirtyRef = useRef(false);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // 1. Initial Draft Fetch
  useEffect(() => {
    let isMounted = true;
    async function loadDraft() {
      try {
        const res = await fetch(`/api/experiences/${publicId}/draft`, {
          headers: { "Cache-Control": "no-store" },
        });

        if (res.status === 401) {
          setAuthError("No edit access for this Valentine experience. Your session may have expired.");
          setIsLoading(false);
          return;
        }

        if (!res.ok) {
          setAuthError("Failed to load experience draft.");
          setIsLoading(false);
          return;
        }

        const data = await res.json();
        if (isMounted) {
          if (data.draftConfig && !isDirtyRef.current) {
            setConfig(data.draftConfig);
          }
          if (data.draftRevision) {
            setRevision(data.draftRevision);
          }
          setSaveStatus("saved");
          setLastSavedTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
          setIsLoading(false);
        }
      } catch {
        if (isMounted) {
          setAuthError("Network error while connecting to edit session.");
          setIsLoading(false);
        }
      }
    }

    if (publicId) {
      loadDraft();
    }

    return () => {
      isMounted = false;
    };
  }, [publicId]);

  // 2. Perform Save
  const performSave = useCallback(
    async (keepalive = false): Promise<boolean> => {
      if (!publicId || !isDirtyRef.current) return true;

      setSaveStatus("saving");
      try {
        const res = await fetch(`/api/experiences/${publicId}/draft`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store",
          },
          body: JSON.stringify({
            draftConfig: configRef.current,
            baseRevision: revisionRef.current,
          }),
          keepalive,
        });

        if (res.status === 409) {
          const conflictData = await res.json().catch(() => ({}));
          setSaveStatus("conflict");
          if (conflictData.currentRevision) {
            setRevision(conflictData.currentRevision);
          }
          return false;
        }

        if (!res.ok) {
          setSaveStatus("error");
          return false;
        }

        const result = await res.json();
        isDirtyRef.current = false;
        setRevision(result.draftRevision);
        setSaveStatus("saved");
        setLastSavedTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
        return true;
      } catch {
        setSaveStatus("offline");
        return false;
      }
    },
    [publicId]
  );

  // 3. Debounced Autosave on Config Change
  const handleConfigChange = (updater: (prev: MidnightRoseDraftConfig) => MidnightRoseDraftConfig) => {
    setConfig((prev) => {
      const next = updater(prev);
      isDirtyRef.current = true;
      setSaveStatus("idle");

      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      debounceTimerRef.current = setTimeout(() => {
        performSave();
      }, 1000);

      return next;
    });
  };

  // 4. Lifecycle Flushes (visibilitychange, pagehide, beforeunload)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden" && isDirtyRef.current) {
        performSave(true);
      }
    };

    const handlePageHide = () => {
      if (isDirtyRef.current) {
        performSave(true);
      }
    };

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirtyRef.current) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("pagehide", handlePageHide);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("pagehide", handlePageHide);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [performSave]);

  // 5. Handle Publish Action
  const handlePublish = async () => {
    if (saveStatus === "saving") return;

    // Flush any pending save first
    if (isDirtyRef.current) {
      const saved = await performSave();
      if (!saved) return;
    }

    setIsPublishing(true);
    setPublishErrors([]);

    try {
      const res = await fetch(`/api/experiences/${publicId}/publish`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
        },
        body: JSON.stringify({
          expectedRevision: revisionRef.current,
        }),
      });

      if (res.status === 409) {
        const data = await res.json().catch(() => ({}));
        setPublishErrors(["Draft was modified. Please review changes and publish again."]);
        if (data.currentRevision) setRevision(data.currentRevision);
        return;
      }

      if (res.status === 422) {
        const errData = await res.json();
        const fieldErrors = Object.values(errData.validationErrors?.fieldErrors || {}).flat() as string[];
        setPublishErrors(fieldErrors.length > 0 ? fieldErrors : ["Please complete all required fields."]);
        return;
      }

      if (!res.ok) {
        setPublishErrors(["Failed to publish experience. Please try again."]);
        return;
      }

      const publishData = await res.json();
      setPublicUrl(publishData.publicUrl || `${window.location.origin}/v/${publicId}`);
      setPublishModalOpen(true);
    } catch {
      setPublishErrors(["Network error during publishing."]);
    } finally {
      setIsPublishing(false);
    }
  };

  const handleCopyLink = () => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard
        .writeText(publicUrl)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2500);
        })
        .catch(() => {
          try {
            const textarea = document.createElement("textarea");
            textarea.value = publicUrl;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand("copy");
            document.body.removeChild(textarea);
          } catch {
            // Ignore
          }
          setCopied(true);
          setTimeout(() => setCopied(false), 2500);
        });
    } else {
      try {
        const textarea = document.createElement("textarea");
        textarea.value = publicUrl;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      } catch {
        // Ignore
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // Auth Error State (renders friendly no-edit page without content leakage)
  if (authError) {
    return (
      <main className="flex min-h-[100dvh] flex-col items-center justify-center p-6 text-center bg-[#0B0B12] text-slate-100">
        <div className="max-w-md w-full p-8 rounded-2xl bg-white/[0.03] border border-white/10 shadow-2xl">
          <div className="text-3xl mb-3">🔒</div>
          <h1 className="text-xl font-serif font-medium text-white mb-2">Edit Access Unavailable</h1>
          <p className="text-sm text-slate-300 mb-6">{authError}</p>
          <a
            href="/create"
            className="inline-block px-5 py-2.5 text-xs font-medium uppercase tracking-wider rounded-xl bg-rose-600 hover:bg-rose-500 text-white transition-colors"
          >
            Create a New Valentine
          </a>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-[100dvh] flex flex-col bg-[#0B0B12] text-slate-100">
      {/* 1. Mandatory Owner Reminder Banner */}
      <div
        data-testid="browser-storage-reminder"
        className="bg-rose-950/80 border-b border-rose-800/40 px-4 py-2 text-center text-xs text-rose-200"
      >
        <span>
          💌 <strong>Edit access is stored in this browser.</strong> Keep this browser/device available if you want to edit this Valentine later.
        </span>
      </div>

      {/* Editor Main Content: Stacked on mobile, 2-column on desktop */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left Pane: Customization Form */}
        <div className="w-full md:w-[480px] lg:w-[540px] flex flex-col border-b md:border-b-0 md:border-r border-white/10 bg-black/40 overflow-y-auto">
          {/* Form Header */}
          <div className="p-4 sm:p-6 border-b border-white/10 flex items-center justify-between">
            <div>
              <h1 className="text-lg font-serif font-medium text-white">Customize Your Valentine</h1>
              <p className="text-xs text-white/50">Midnight Rose Template (v1)</p>
            </div>

            {/* Status Pill */}
            <div
              data-testid="save-status-pill"
              data-status={saveStatus}
              className="text-xs px-2.5 py-1 rounded-full border border-white/10 bg-white/5 flex items-center gap-1.5"
            >
              {saveStatus === "saving" && <span className="text-amber-400 animate-pulse">● Saving...</span>}
              {saveStatus === "saved" && (
                <span className="text-emerald-400">✓ Saved {lastSavedTime ? `at ${lastSavedTime}` : ""}</span>
              )}
              {saveStatus === "error" && <span className="text-rose-400">⚠️ Save failed</span>}
              {saveStatus === "conflict" && <span className="text-rose-400">⚠️ Draft conflict</span>}
              {saveStatus === "offline" && <span className="text-amber-400">⚡ Offline</span>}
              {saveStatus === "idle" && <span className="text-white/40">● Unsaved edits</span>}
            </div>
          </div>

          {/* Form Inputs */}
          <form className="p-4 sm:p-6 space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label htmlFor="partnerName" className="block text-xs font-medium uppercase tracking-wider text-white/70 mb-1.5">
                Partner&apos;s Name *
              </label>
              <input
                id="partnerName"
                data-testid="input-partner-name"
                type="text"
                maxLength={60}
                placeholder="e.g. Maya, Ananya, Alex"
                value={config.partnerName || ""}
                onChange={(e) =>
                  handleConfigChange((prev) => ({
                    ...prev,
                    partnerName: e.target.value,
                  }))
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-rose-500 text-sm transition-colors"
              />
            </div>

            <div>
              <label htmlFor="senderName" className="block text-xs font-medium uppercase tracking-wider text-white/70 mb-1.5">
                Your Name *
              </label>
              <input
                id="senderName"
                data-testid="input-sender-name"
                type="text"
                maxLength={60}
                placeholder="e.g. Rohan, Chris"
                value={config.senderName || ""}
                onChange={(e) =>
                  handleConfigChange((prev) => ({
                    ...prev,
                    senderName: e.target.value,
                  }))
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-rose-500 text-sm transition-colors"
              />
            </div>

            <div>
              <label htmlFor="greeting" className="block text-xs font-medium uppercase tracking-wider text-white/70 mb-1.5">
                Greeting
              </label>
              <input
                id="greeting"
                data-testid="input-greeting"
                type="text"
                maxLength={100}
                placeholder="To my favorite person"
                value={config.greeting || ""}
                onChange={(e) =>
                  handleConfigChange((prev) => ({
                    ...prev,
                    greeting: e.target.value,
                  }))
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-rose-500 text-sm transition-colors"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-xs font-medium uppercase tracking-wider text-white/70 mb-1.5">
                Letter / Message *
              </label>
              <textarea
                id="message"
                data-testid="input-message"
                rows={5}
                maxLength={2000}
                placeholder="Write your heartfelt message here..."
                value={config.message || ""}
                onChange={(e) =>
                  handleConfigChange((prev) => ({
                    ...prev,
                    message: e.target.value,
                  }))
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-rose-500 text-sm leading-relaxed transition-colors resize-y"
              />
            </div>

            <div>
              <label htmlFor="signOff" className="block text-xs font-medium uppercase tracking-wider text-white/70 mb-1.5">
                Closing Sign-off
              </label>
              <input
                id="signOff"
                data-testid="input-sign-off"
                type="text"
                maxLength={100}
                placeholder="With all my love"
                value={config.signOff || ""}
                onChange={(e) =>
                  handleConfigChange((prev) => ({
                    ...prev,
                    signOff: e.target.value,
                  }))
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-rose-500 text-sm transition-colors"
              />
            </div>

            <div>
              <span className="block text-xs font-medium uppercase tracking-wider text-white/70 mb-2">
                Accent Theme
              </span>
              <div className="grid grid-cols-3 gap-2">
                {ACCENT_THEMES.map((theme) => {
                  const isSelected = (config.accentTheme || "crimson-rose") === theme;
                  const label =
                    theme === "crimson-rose"
                      ? "Crimson"
                      : theme === "midnight-violet"
                      ? "Violet"
                      : "Champagne";

                  return (
                    <button
                      key={theme}
                      type="button"
                      data-testid={`theme-option-${theme}`}
                      onClick={() =>
                        handleConfigChange((prev) => ({
                          ...prev,
                          accentTheme: theme as AccentTheme,
                        }))
                      }
                      className={`px-3 py-2 rounded-xl text-xs font-medium border transition-all text-center ${
                        isSelected
                          ? "border-rose-500 bg-rose-500/20 text-white"
                          : "border-white/10 bg-white/5 text-white/60 hover:bg-white/10"
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Validation Errors from Publish Attempt */}
            {publishErrors.length > 0 && (
              <div className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-800/50 text-xs text-rose-300 space-y-1">
                {publishErrors.map((err, i) => (
                  <p key={i}>• {err}</p>
                ))}
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-4 flex gap-3">
              <button
                type="button"
                data-testid="save-draft-button"
                onClick={() => performSave()}
                className="flex-1 py-3 px-4 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-white text-xs font-medium uppercase tracking-wider transition-colors active:scale-[0.98]"
              >
                Save Draft
              </button>
              <button
                type="button"
                data-testid="publish-button"
                disabled={saveStatus === "saving" || isPublishing}
                onClick={handlePublish}
                className="flex-1 py-3 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-medium uppercase tracking-wider transition-all disabled:opacity-50 shadow-lg shadow-rose-950/50 active:scale-[0.98]"
              >
                {isPublishing ? "Publishing..." : "Publish"}
              </button>
            </div>
          </form>
        </div>

        {/* Right Pane: Live Interactive Preview */}
        <div className="flex-1 bg-[#07070C] overflow-y-auto flex items-center justify-center p-4">
          <div className="w-full max-w-lg min-h-[600px] border border-white/10 rounded-2xl overflow-hidden shadow-2xl bg-[#0B0B12]">
            <ExperienceRenderer
              templateId="midnight-rose"
              templateVersion="v1"
              mode="preview"
              rawConfig={config}
            />
          </div>
        </div>
      </div>

      {/* Published Success Modal */}
      {publishModalOpen && (
        <div
          data-testid="publish-success-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn"
        >
          <div className="max-w-md w-full p-6 sm:p-8 rounded-2xl bg-[#12121D] border border-white/15 shadow-2xl text-center space-y-6">
            <div className="text-4xl">🎉</div>
            <div className="space-y-2">
              <h2 className="text-xl font-serif font-medium text-white">Your Valentine is Live!</h2>
              <p className="text-xs sm:text-sm text-slate-300">
                Share this private link with your partner. They will only see the finished experience.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-black/40 border border-white/10 flex items-center gap-2">
              <input
                data-testid="public-url-input"
                readOnly
                value={publicUrl}
                className="flex-1 bg-transparent text-xs text-slate-200 outline-none select-all"
              />
              <button
                type="button"
                data-testid="copy-link-button"
                onClick={handleCopyLink}
                className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-medium transition-colors"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>

            <div className="flex gap-3 pt-2">
              <a
                href={publicUrl}
                target="_blank"
                rel="noreferrer"
                data-testid="open-public-page-link"
                className="flex-1 py-2.5 rounded-xl border border-white/15 text-white text-xs font-medium hover:bg-white/5 transition-colors"
              >
                Open Page
              </a>
              <button
                type="button"
                data-testid="close-publish-modal-button"
                onClick={() => setPublishModalOpen(false)}
                className="flex-1 py-2.5 rounded-xl bg-white/10 text-white text-xs font-medium hover:bg-white/15 transition-colors"
              >
                Back to Editor
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
