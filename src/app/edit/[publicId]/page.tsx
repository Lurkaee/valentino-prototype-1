"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ExperienceRenderer } from "@/templates/ExperienceRenderer";
import {
  MidnightRoseDraftConfig,
  ACCENT_THEMES,
  AccentTheme,
} from "@/templates/midnight-rose/v1/schema";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { AtmosphericGlow } from "@/components/ui/AtmosphericGlow";

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
  const [mobileTab, setMobileTab] = useState<"form" | "preview">("form");

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

  // Auth Error State
  if (authError) {
    return (
      <main className="flex min-h-[100dvh] flex-col items-center justify-center p-6 text-center bg-[#07070A] text-[#FAF8F5]">
        <AtmosphericGlow theme="crimson-rose" intensity="subtle" />
        <Card variant="glass" className="max-w-md w-full p-8 border-rose-500/20 text-center space-y-4 relative z-10">
          <div className="w-14 h-14 mx-auto rounded-full bg-rose-950/60 border border-rose-800/40 flex items-center justify-center text-2xl">
            🔒
          </div>
          <h1 className="text-xl font-serif font-medium text-white">Edit Access Unavailable</h1>
          <p className="text-sm text-ivory-300/80 font-light leading-relaxed">{authError}</p>
          <div className="pt-2">
            <Link href="/create">
              <Button size="md" variant="primary">
                Create a New Valentine
              </Button>
            </Link>
          </div>
        </Card>
      </main>
    );
  }

  return (
    <div className="min-h-[100dvh] flex flex-col bg-[#07070A] text-[#FAF8F5]">
      {/* 1. Mandatory Owner Reminder Banner */}
      <div
        data-testid="browser-storage-reminder"
        className="bg-rose-950/70 border-b border-rose-800/30 px-4 py-2 text-center text-xs text-rose-200/90 font-sans flex items-center justify-center gap-2"
      >
        <span>💌</span>
        <span>
          <strong>Edit access is stored in this browser.</strong> Keep this browser/device available if you want to edit this Valentine later.
        </span>
      </div>

      {/* Studio Navigation Bar */}
      <header className="px-4 sm:px-6 py-3.5 border-b border-white/[0.08] bg-obsidian-900/80 backdrop-blur-md flex items-center justify-between z-20">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 text-white hover:text-rose-400 transition-colors">
            <span className="text-lg">💌</span>
            <span className="font-serif font-medium tracking-wide hidden sm:inline">Valentino</span>
          </Link>
          <span className="text-white/20 hidden sm:inline">/</span>
          <span className="text-xs text-ivory-300 font-sans tracking-wide">
            Midnight Rose <span className="text-white/40">(v1)</span>
          </span>
        </div>

        {/* Center: Save Status Pill */}
        <div
          data-testid="save-status-pill"
          data-status={saveStatus}
          className="text-xs px-3 py-1 rounded-full border border-white/10 bg-white/[0.04] flex items-center gap-1.5 font-sans"
        >
          {saveStatus === "saving" && (
            <span className="text-amber-400 animate-pulse flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              Saving...
            </span>
          )}
          {saveStatus === "saved" && (
            <span className="text-emerald-400 flex items-center gap-1.5">
              <span>✓</span> Saved {lastSavedTime ? `at ${lastSavedTime}` : ""}
            </span>
          )}
          {saveStatus === "error" && <span className="text-rose-400">⚠️ Save failed</span>}
          {saveStatus === "conflict" && <span className="text-rose-400">⚠️ Draft conflict</span>}
          {saveStatus === "offline" && <span className="text-amber-400">⚡ Offline</span>}
          {saveStatus === "idle" && <span className="text-white/40">● Unsaved edits</span>}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {/* Mobile view toggle */}
          <div className="flex md:hidden rounded-lg bg-white/5 p-0.5 border border-white/10 text-xs">
            <button
              type="button"
              onClick={() => setMobileTab("form")}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                mobileTab === "form" ? "bg-rose-600 text-white" : "text-ivory-300"
              }`}
            >
              Edit
            </button>
            <button
              type="button"
              onClick={() => setMobileTab("preview")}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                mobileTab === "preview" ? "bg-rose-600 text-white" : "text-ivory-300"
              }`}
            >
              Preview
            </button>
          </div>

          <Button
            type="button"
            variant="primary"
            size="sm"
            disabled={saveStatus === "saving" || isPublishing}
            onClick={handlePublish}
            className="hidden sm:inline-flex text-xs px-4"
          >
            {isPublishing ? "Publishing..." : "Publish Valentine"}
          </Button>
        </div>
      </header>

      {/* Editor Body */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
        {/* Left Pane: Form Editor */}
        <div
          className={`w-full md:w-[480px] lg:w-[540px] flex flex-col border-b md:border-b-0 md:border-r border-white/[0.08] bg-obsidian-950/70 overflow-y-auto ${
            mobileTab === "preview" ? "hidden md:flex" : "flex"
          }`}
        >
          <div className="p-6 sm:p-8 space-y-8">
            <div className="space-y-1">
              <h1 className="text-xl sm:text-2xl font-serif font-medium text-white">
                Personalize Your Note
              </h1>
              <p className="text-xs text-ivory-400 font-light">
                Write freely. Changes are automatically saved as you write.
              </p>
            </div>

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              {/* Question 1: Who is this for? */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="partnerName"
                    className="block text-xs uppercase tracking-wider text-ivory-300 font-medium"
                  >
                    1. Who is this for? <span className="text-rose-400">*</span>
                  </label>
                  <span className="text-[10px] text-ivory-400">
                    {(config.partnerName || "").length} / 60
                  </span>
                </div>
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
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-rose-500/80 focus:ring-1 focus:ring-rose-500/50 text-sm transition-all"
                />
              </div>

              {/* Question 2: Who are you? */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="senderName"
                    className="block text-xs uppercase tracking-wider text-ivory-300 font-medium"
                  >
                    2. And who are you? <span className="text-rose-400">*</span>
                  </label>
                  <span className="text-[10px] text-ivory-400">
                    {(config.senderName || "").length} / 60
                  </span>
                </div>
                <input
                  id="senderName"
                  data-testid="input-sender-name"
                  type="text"
                  maxLength={60}
                  placeholder="e.g. Rohan, Chris, or your nickname"
                  value={config.senderName || ""}
                  onChange={(e) =>
                    handleConfigChange((prev) => ({
                      ...prev,
                      senderName: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-rose-500/80 focus:ring-1 focus:ring-rose-500/50 text-sm transition-all"
                />
              </div>

              {/* Question 3: The Greeting */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="greeting"
                    className="block text-xs uppercase tracking-wider text-ivory-300 font-medium"
                  >
                    3. The Greeting
                  </label>
                  <span className="text-[10px] text-ivory-400">
                    {(config.greeting || "").length} / 100
                  </span>
                </div>
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
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-rose-500/80 focus:ring-1 focus:ring-rose-500/50 text-sm transition-all"
                />
              </div>

              {/* Question 4: Say what's in your heart */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="message"
                    className="block text-xs uppercase tracking-wider text-ivory-300 font-medium"
                  >
                    4. Say what&apos;s in your heart <span className="text-rose-400">*</span>
                  </label>
                  <span className="text-[10px] text-ivory-400">
                    {(config.message || "").length} / 2000
                  </span>
                </div>
                <textarea
                  id="message"
                  data-testid="input-message"
                  rows={6}
                  maxLength={2000}
                  placeholder="Write your heartfelt message here. Mention your favorite memories, the little things they do, or why they mean the world to you..."
                  value={config.message || ""}
                  onChange={(e) =>
                    handleConfigChange((prev) => ({
                      ...prev,
                      message: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-rose-500/80 focus:ring-1 focus:ring-rose-500/50 text-sm leading-relaxed transition-all resize-y font-light"
                />
              </div>

              {/* Question 5: Sign-off */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="signOff"
                    className="block text-xs uppercase tracking-wider text-ivory-300 font-medium"
                  >
                    5. Sign-off
                  </label>
                  <span className="text-[10px] text-ivory-400">
                    {(config.signOff || "").length} / 100
                  </span>
                </div>
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
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-rose-500/80 focus:ring-1 focus:ring-rose-500/50 text-sm transition-all"
                />
              </div>

              {/* Question 6: Choose the Mood (Theme) */}
              <div className="space-y-3 pt-1">
                <span className="block text-xs uppercase tracking-wider text-ivory-300 font-medium">
                  6. Choose the Mood
                </span>
                <div className="grid grid-cols-3 gap-2.5">
                  {ACCENT_THEMES.map((theme) => {
                    const isSelected = (config.accentTheme || "crimson-rose") === theme;
                    const meta = {
                      "crimson-rose": { label: "Crimson", color: "bg-rose-500" },
                      "midnight-violet": { label: "Violet", color: "bg-purple-500" },
                      "champagne-gold": { label: "Gold", color: "bg-amber-500" },
                    }[theme];

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
                        className={`px-3 py-2.5 rounded-xl text-xs font-medium border flex items-center justify-center gap-2 transition-all ${
                          isSelected
                            ? "border-rose-500 bg-rose-950/60 text-white shadow-md shadow-rose-950/50"
                            : "border-white/10 bg-white/[0.03] text-ivory-400 hover:bg-white/[0.08]"
                        }`}
                      >
                        <span className={`w-2 h-2 rounded-full ${meta.color}`} />
                        <span>{meta.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Validation Errors */}
              {publishErrors.length > 0 && (
                <div className="p-4 rounded-xl bg-rose-950/70 border border-rose-800/60 text-xs text-rose-200 space-y-1.5 animate-fadeIn">
                  <span className="font-semibold block text-rose-300">
                    Please complete the following to publish:
                  </span>
                  {publishErrors.map((err, i) => (
                    <p key={i} className="flex items-center gap-1.5">
                      <span>•</span> {err}
                    </p>
                  ))}
                </div>
              )}

              {/* Form Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <Button
                  type="button"
                  data-testid="save-draft-button"
                  variant="outline"
                  size="md"
                  onClick={() => performSave()}
                  className="flex-1 text-xs"
                >
                  Save Draft
                </Button>
                <Button
                  type="button"
                  data-testid="publish-button"
                  variant="primary"
                  size="md"
                  disabled={saveStatus === "saving" || isPublishing}
                  onClick={handlePublish}
                  className="flex-1 text-xs"
                >
                  {isPublishing ? "Publishing..." : "Publish Valentine"}
                </Button>
              </div>

              {/* Mobile-only Preview CTA */}
              <div className="pt-2 md:hidden">
                <Button
                  type="button"
                  variant="secondary"
                  size="md"
                  onClick={() => setMobileTab("preview")}
                  className="w-full text-xs"
                >
                  View Live Preview →
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Pane: Device-Framed Live Preview */}
        <div
          className={`flex-1 bg-[#050508] overflow-y-auto flex flex-col items-center justify-center p-4 sm:p-8 relative ${
            mobileTab === "form" ? "hidden md:flex" : "flex"
          }`}
        >
          {/* Ambient glow behind preview frame */}
          <div className="pointer-events-none absolute inset-0 bg-radial-gradient from-rose-600/10 via-transparent to-transparent opacity-60" />

          {/* Smartphone device frame */}
          <div className="w-full max-w-[380px] sm:max-w-[420px] rounded-[38px] p-3 sm:p-3.5 bg-gradient-to-b from-white/15 via-white/5 to-white/10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] relative z-10 border border-white/10">
            {/* Phone Bezel */}
            <div className="rounded-[30px] overflow-hidden bg-[#0B0B12] border border-black/80 flex flex-col min-h-[580px] max-h-[720px] shadow-inner relative">
              {/* Dynamic Island / Speaker Notch */}
              <div className="h-6 w-full bg-[#0B0B12] flex items-center justify-between px-6 pt-1 select-none z-30 shrink-0">
                <span className="text-[10px] text-white/50 font-sans font-medium">9:41</span>
                <div className="w-16 h-3.5 rounded-full bg-black border border-white/10" />
                <div className="flex items-center gap-1 text-[10px] text-white/50">
                  <span>5G</span>
                  <span>100%</span>
                </div>
              </div>

              {/* Screen Content: Single-Engine Unified Contract */}
              <div className="flex-1 overflow-y-auto">
                <ExperienceRenderer
                  templateId="midnight-rose"
                  templateVersion="v1"
                  mode="preview"
                  rawConfig={config}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Published Completion Modal */}
      {publishModalOpen && (
        <div
          data-testid="publish-success-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
        >
          <Card
            variant="glass"
            className="max-w-md w-full p-8 sm:p-10 border-rose-500/30 text-center space-y-6 shadow-2xl relative"
          >
            <div className="w-16 h-16 mx-auto rounded-full bg-rose-700/80 border border-rose-500 flex items-center justify-center shadow-xl shadow-rose-950/80 text-3xl select-none animate-float">
              💌
            </div>

            <div className="space-y-2">
              <Badge variant="rose" size="sm">
                Published & Sealed
              </Badge>
              <h2 className="text-2xl font-serif font-medium text-white">
                Your Valentine is Ready
              </h2>
              <p className="text-xs sm:text-sm text-ivory-300/80 font-light leading-relaxed">
                Send this private link to your partner. When they open it, they will break the digital wax seal to reveal your personal letter.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-black/50 border border-white/10 flex items-center gap-2">
              <input
                data-testid="public-url-input"
                readOnly
                value={publicUrl}
                className="flex-1 bg-transparent text-xs text-ivory-200 outline-none select-all font-mono"
              />
              <button
                type="button"
                data-testid="copy-link-button"
                onClick={handleCopyLink}
                className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-medium tracking-wide transition-colors shrink-0 shadow-lg shadow-rose-950/60"
              >
                {copied ? "Copied! 💌" : "Copy Link"}
              </button>
            </div>

            <div className="flex gap-3 pt-2">
              <a
                href={publicUrl}
                target="_blank"
                rel="noreferrer"
                data-testid="open-public-page-link"
                className="flex-1 py-3 rounded-xl border border-white/15 text-white text-xs font-medium hover:bg-white/10 transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Open Valentine</span>
                <span>↗</span>
              </a>
              <button
                type="button"
                data-testid="close-publish-modal-button"
                onClick={() => setPublishModalOpen(false)}
                className="flex-1 py-3 rounded-xl bg-white/[0.06] text-ivory-200 text-xs font-medium hover:bg-white/[0.12] transition-colors"
              >
                Back to Editing
              </button>
            </div>

            <p className="text-[11px] text-ivory-400/70 font-sans">
              🔒 Completely private. Never indexed by search engines.
            </p>
          </Card>
        </div>
      )}
    </div>
  );
}
