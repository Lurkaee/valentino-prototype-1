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
import {
  DEFAULT_VALENTINE_DECOR,
  CURATED_FLOWERS,
  CURATED_CHARMS,
  CURATED_PAPERS,
  CURATED_RIBBONS,
  CURATED_SEALS,
  normalizeValentineDecor,
} from "@/types/decor";
import { getTemplateDefinition } from "@/templates/registry";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { AtmosphericGlow } from "@/components/ui/AtmosphericGlow";
import { StudioHeader, SaveStatus } from "@/components/studio/StudioHeader";
import { WorldSelectorModal } from "@/components/studio/WorldSelectorModal";
import { ContentReadinessBar } from "@/components/studio/ContentReadinessBar";
import { ModuleManager } from "@/modules/editor/ModuleManager";

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
    decor: DEFAULT_VALENTINE_DECOR,
    modules: {},
  });

  const [templateMeta, setTemplateMeta] = useState<{ id: string; version: string; name: string }>({
    id: "midnight-rose",
    version: "v1",
    name: "Midnight Rose",
  });

  const [revision, setRevision] = useState<number>(1);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [lastSavedTime, setLastSavedTime] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  // Modals & Navigation
  const [worldModalOpen, setWorldModalOpen] = useState(false);
  const [publishModalOpen, setPublishModalOpen] = useState(false);
  const [publishErrors, setPublishErrors] = useState<string[]>([]);
  const [isPublishing, setIsPublishing] = useState(false);
  const [publicUrl, setPublicUrl] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [mobileTab, setMobileTab] = useState<"form" | "preview">("form");
  const [activeSection, setActiveSection] = useState<"world" | "story" | "moments" | "mood" | "preview">("story");
  const [showAdvancedStory, setShowAdvancedStory] = useState(false);

  const configRef = useRef(config);
  configRef.current = config;
  const templateMetaRef = useRef(templateMeta);
  templateMetaRef.current = templateMeta;
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
          if (data.templateId) {
            const def = getTemplateDefinition(data.templateId, data.templateVersion || "v1");
            setTemplateMeta({
              id: data.templateId,
              version: data.templateVersion || "v1",
              name: def?.name || data.templateId,
            });
          }
          if (data.draftConfig && !isDirtyRef.current) {
            setConfig({
              ...data.draftConfig,
              decor: normalizeValentineDecor(data.draftConfig.decor),
              modules: data.draftConfig.modules || {},
            });
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
            templateId: templateMetaRef.current.id,
            templateVersion: templateMetaRef.current.version,
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

  const handleModulesChange = (updater: (prevModules: any) => any) => {
    handleConfigChange((prev: any) => ({
      ...prev,
      modules: updater(prev.modules || {}),
    }));
  };

  // 4. Non-Destructive World Selection
  const handleSelectWorld = (newTemplateId: string, newTemplateVersion: string) => {
    const def = getTemplateDefinition(newTemplateId, newTemplateVersion);
    const newMeta = {
      id: newTemplateId,
      version: newTemplateVersion,
      name: def?.name || newTemplateId,
    };
    setTemplateMeta(newMeta);
    templateMetaRef.current = newMeta;
    isDirtyRef.current = true;
    setSaveStatus("idle");

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    debounceTimerRef.current = setTimeout(() => {
      performSave();
    }, 500);
  };

  // 5. Lifecycle Flushes (visibilitychange, pagehide, beforeunload)
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

  // 6. Handle Publish Action
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

  const activeMomentsCount = Object.values(config.modules || {}).filter(
    (m: any) => m && m.enabled
  ).length;

  const currentTemplateDef = getTemplateDefinition(templateMeta.id, templateMeta.version);

  // Auth Error State
  if (authError) {
    return (
      <main className="flex min-h-[100dvh] flex-col items-center justify-center p-6 text-center bg-[#0A090C] text-[#FAF8F5]">
        <AtmosphericGlow theme="crimson-rose" intensity="subtle" />
        <Card variant="glass" className="max-w-md w-full p-8 border-white/[0.12] text-center space-y-4 relative z-10 bg-[#121017]">
          <div className="w-14 h-14 mx-auto rounded-full bg-white/[0.06] border border-white/[0.12] flex items-center justify-center text-2xl">
            🔒
          </div>
          <h1 className="text-xl font-display font-medium text-white">Edit Access Unavailable</h1>
          <p className="text-sm text-white/70 font-ui font-light leading-relaxed">{authError}</p>
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
    <div className="min-h-[100dvh] flex flex-col bg-[#0A090C] text-[#FAF8F5] font-ui antialiased">
      {/* 1. Mandatory Owner Reminder Banner */}
      <div
        data-testid="browser-storage-reminder"
        className="bg-[#121017] border-b border-white/[0.08] px-4 py-2 text-center text-xs text-white/75 font-ui flex items-center justify-center gap-2"
      >
        <span>💌</span>
        <span>
          <strong className="text-white">Edit access is stored in this browser.</strong> Keep this device available if you want to edit this Valentine later.
        </span>
      </div>

      {/* 2. Neutral Studio Header */}
      <StudioHeader
        partnerName={config.partnerName}
        templateName={templateMeta.name}
        templateVersion={templateMeta.version}
        saveStatus={saveStatus}
        lastSavedTime={lastSavedTime}
        isPublishing={isPublishing}
        mobileTab={mobileTab}
        onChangeWorldClick={() => setWorldModalOpen(true)}
        onPublishClick={handlePublish}
        onMobileTabChange={setMobileTab}
      />

      {/* 3. Studio Workspace: Split Studio Editor & Live Canvas */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
        {/* Left Pane: Studio Creative Workbench */}
        <div
          className={`w-full md:w-[500px] lg:w-[560px] flex flex-col border-b md:border-b-0 md:border-r border-white/[0.08] bg-[#0E0C12] overflow-y-auto ${
            mobileTab === "preview" ? "hidden md:flex" : "flex"
          }`}
        >
          {/* Non-linear Navigation: Creative Stage Tabs */}
          <div className="sticky top-0 z-10 bg-[#0E0C12]/95 backdrop-blur-md px-6 py-2.5 border-b border-white/[0.08] flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            {[
              { id: "world", label: "1. World", icon: "🌐" },
              { id: "story", label: "2. Story", icon: "✍️" },
              { id: "moments", label: "3. Moments", icon: "✨" },
              { id: "mood", label: "4. Mood & Decor", icon: "🎨" },
            ].map((stage) => (
              <button
                key={stage.id}
                type="button"
                onClick={() => {
                  setActiveSection(stage.id as any);
                  const el = document.getElementById(`section-${stage.id}`);
                  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-ui whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeSection === stage.id
                    ? "bg-white/[0.1] text-white font-medium shadow-xs"
                    : "text-white/50 hover:text-white/80 hover:bg-white/[0.04]"
                }`}
              >
                <span>{stage.icon}</span>
                <span>{stage.label}</span>
              </button>
            ))}
          </div>

          {/* Workbench Body */}
          <div className="p-6 sm:p-8 space-y-10">
            {/* Advisory Content Readiness Bar */}
            <ContentReadinessBar
              partnerName={config.partnerName}
              senderName={config.senderName}
              message={config.message}
              activeMomentsCount={activeMomentsCount}
            />

            {/* STAGE 1: Visual World Card */}
            <section id="section-world" className="space-y-3.5 scroll-mt-16">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-base select-none">🌐</span>
                  <h2 className="text-base font-display font-medium text-white">Visual World</h2>
                </div>
                <button
                  type="button"
                  onClick={() => setWorldModalOpen(true)}
                  className="text-xs font-ui text-rose-300 hover:text-rose-200 underline cursor-pointer"
                >
                  Switch World ⇄
                </button>
              </div>

              {/* Active World Card */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-between gap-4">
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-display font-medium text-sm text-white">
                      {templateMeta.name}
                    </span>
                    <Badge variant="rose" size="sm" className="text-[10px] px-2 py-0.5">
                      Active Atmosphere
                    </Badge>
                  </div>
                  <p className="text-xs text-white/70 font-romantic leading-snug">
                    {currentTemplateDef?.tagline || "For the love that feels like starlight"}
                  </p>
                  <p className="text-[11px] text-white/45 font-ui">
                    {currentTemplateDef?.atmosphere}
                  </p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setWorldModalOpen(true)}
                  className="text-xs rounded-full border-white/15 shrink-0"
                >
                  Change World
                </Button>
              </div>
            </section>

            {/* STAGE 2: Story (The Core Romantic Letter) */}
            <section id="section-story" className="space-y-5 scroll-mt-16 border-t border-white/[0.08] pt-8">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-base select-none">✍️</span>
                  <h2 className="text-base font-display font-medium text-white">The Love Letter</h2>
                </div>
                <p className="text-xs text-white/60 font-ui font-light">
                  Write freely from the heart. All words persist automatically across all visual worlds.
                </p>
              </div>

              <div className="space-y-5">
                {/* Partner Name */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="partnerName"
                      className="block text-xs uppercase tracking-wider text-white/70 font-ui font-medium"
                    >
                      Who is this for? <span className="text-rose-400">*</span>
                    </label>
                    <span className="text-[10px] text-white/40 font-mono">
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
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/[0.12] text-white placeholder-white/25 focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-500/40 text-sm font-ui transition-all"
                  />
                </div>

                {/* Sender Name */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="senderName"
                      className="block text-xs uppercase tracking-wider text-white/70 font-ui font-medium"
                    >
                      And who are you? <span className="text-rose-400">*</span>
                    </label>
                    <span className="text-[10px] text-white/40 font-mono">
                      {(config.senderName || "").length} / 60
                    </span>
                  </div>
                  <input
                    id="senderName"
                    data-testid="input-sender-name"
                    type="text"
                    maxLength={60}
                    placeholder="e.g. Rohan, Chris, or your pet name"
                    value={config.senderName || ""}
                    onChange={(e) =>
                      handleConfigChange((prev) => ({
                        ...prev,
                        senderName: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/[0.12] text-white placeholder-white/25 focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-500/40 text-sm font-ui transition-all"
                  />
                </div>

                {/* The Heartfelt Message */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="message"
                      className="block text-xs uppercase tracking-wider text-white/70 font-ui font-medium"
                    >
                      Say what&apos;s in your heart <span className="text-rose-400">*</span>
                    </label>
                    <span className="text-[10px] text-white/40 font-mono">
                      {(config.message || "").length} / 2000
                    </span>
                  </div>
                  <textarea
                    id="message"
                    data-testid="input-message"
                    rows={6}
                    maxLength={2000}
                    placeholder="Write your personal letter here. Mention favorite memories, the quiet moments you cherish, or why they make the world beautiful…"
                    value={config.message || ""}
                    onChange={(e) =>
                      handleConfigChange((prev) => ({
                        ...prev,
                        message: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-3.5 rounded-xl bg-black/40 border border-white/[0.12] text-white placeholder-white/25 focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-500/40 text-sm leading-relaxed transition-all resize-y font-romantic text-base shadow-inner"
                  />
                  {/* AI Co-Pilot Extension Seam (No fake AI runtime, clean future affordance) */}
                  <div className="flex items-center justify-between pt-1 text-[11px] text-white/40 font-ui">
                    <span>Write freely in your own voice.</span>
                    <button
                      type="button"
                      onClick={() => {}}
                      className="text-white/40 hover:text-white/70 transition-colors flex items-center gap-1 cursor-default select-none opacity-80"
                      title="AI Co-Pilot extension seam"
                    >
                      <span>💡</span>
                      <span>Need inspiration? (Co-pilot ready)</span>
                    </button>
                  </div>
                </div>

                {/* Progressive Disclosure: Formal Greeting & Sign-Off */}
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => setShowAdvancedStory(!showAdvancedStory)}
                    className="text-xs font-ui text-white/60 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>{showAdvancedStory ? "▾" : "▸"}</span>
                    <span>Customize Salutation & Sign-Off</span>
                  </button>

                  {showAdvancedStory && (
                    <div className="space-y-4 pt-3.5 pl-3 border-l-2 border-white/[0.1] mt-2 animate-fadeIn">
                      {/* Greeting */}
                      <div className="space-y-1">
                        <label
                          htmlFor="greeting"
                          className="block text-xs uppercase tracking-wider text-white/60 font-ui font-medium"
                        >
                          Salutation / Greeting
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
                          className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/[0.1] text-white placeholder-white/25 focus:outline-none focus:border-rose-400 text-xs font-ui"
                        />
                      </div>

                      {/* Sign-off */}
                      <div className="space-y-1">
                        <label
                          htmlFor="signOff"
                          className="block text-xs uppercase tracking-wider text-white/60 font-ui font-medium"
                        >
                          Sign-off Closing
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
                          className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/[0.1] text-white placeholder-white/25 focus:outline-none focus:border-rose-400 text-xs font-ui"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* STAGE 3: Moments (Experience Module Engine) */}
            <section id="section-moments" className="scroll-mt-16 border-t border-white/[0.08] pt-8">
              <ModuleManager
                modules={config.modules}
                hasHeroMedia={Boolean(config.heroMediaId)}
                onChange={handleModulesChange}
              />
            </section>

            {/* STAGE 4: Mood & Decor (Physical Craft & Tactile Details) */}
            <section id="section-mood" className="space-y-6 scroll-mt-16 border-t border-white/[0.08] pt-8">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-base select-none">🎨</span>
                    <h2 className="text-base font-display font-medium text-white">
                      Mood & Physical Styling
                    </h2>
                  </div>
                  <span className="text-[11px] text-white/50 font-ui">Tactile craft</span>
                </div>
                <p className="text-xs text-white/60 font-ui font-light">
                  Tailor the envelope paper, ribbon, digital wax seal, bouquet, and charms.
                </p>
              </div>

              {/* 1-Click Curated Presets */}
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-2">
                <span className="text-[11px] text-white/70 font-ui font-medium block">
                  Quick Styling Presets:
                </span>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: "classic", label: "Classic Romance" },
                    { id: "wildflower", label: "Wildflower Dream" },
                    { id: "royal", label: "Royal Devotion" },
                  ].map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      data-testid={`preset-option-${preset.id}`}
                      onClick={() => {
                        if (preset.id === "classic") {
                          handleConfigChange((prev) => ({
                            ...prev,
                            decor: {
                              blooms: ["crimson-rose", "french-tulip"],
                              flowers: ["crimson-rose", "french-tulip"],
                              charms: ["heart", "sparkle"],
                              paper: "petal-blush",
                              ribbon: "velvet-crimson",
                              waxSeal: "crimson-heart",
                              seal: "crimson-heart",
                            },
                          }));
                        } else if (preset.id === "wildflower") {
                          handleConfigChange((prev) => ({
                            ...prev,
                            decor: {
                              blooms: ["wild-lavender", "wild-daisy", "blush-peony"],
                              flowers: ["wild-lavender", "wild-daisy", "blush-peony"],
                              charms: ["butterfly", "sparkle"],
                              paper: "soft-lavender",
                              ribbon: "satin-rose",
                              waxSeal: "rose-quartz",
                              seal: "rose-quartz",
                            },
                          }));
                        } else if (preset.id === "royal") {
                          handleConfigChange((prev) => ({
                            ...prev,
                            decor: {
                              blooms: ["crimson-rose", "french-tulip", "blush-peony"],
                              flowers: ["crimson-rose", "french-tulip", "blush-peony"],
                              charms: ["bow", "sparkle"],
                              paper: "deckled-parchment",
                              ribbon: "velvet-crimson",
                              waxSeal: "royal-burgundy",
                              seal: "royal-burgundy",
                            },
                          }));
                        }
                      }}
                      className="text-xs px-3 py-1.5 rounded-full border border-white/[0.1] bg-white/[0.04] text-white hover:bg-white/[0.1] transition-colors cursor-pointer font-ui"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Stationery Paper (Untruncated Labels) */}
              <div className="space-y-2">
                <span className="text-xs text-white/80 font-ui font-medium block">
                  Stationery Paper
                </span>
                <div className="grid grid-cols-2 gap-2.5">
                  {CURATED_PAPERS.map((paper) => {
                    const isSelected = normalizeValentineDecor(config.decor).paper === paper.id;
                    return (
                      <button
                        key={paper.id}
                        type="button"
                        data-testid={`decor-option-paper-${paper.id}`}
                        onClick={() =>
                          handleConfigChange((prev) => ({
                            ...prev,
                            decor: { ...normalizeValentineDecor(prev.decor), paper: paper.id },
                          }))
                        }
                        className={`p-2.5 rounded-xl border text-xs flex items-center gap-2.5 transition-all cursor-pointer ${
                          isSelected
                            ? "border-white bg-white text-black font-medium shadow-sm"
                            : "border-white/[0.08] bg-white/[0.03] text-white/80 hover:bg-white/[0.06]"
                        }`}
                      >
                        <span
                          className="w-4 h-4 rounded-full border border-black/20 shrink-0 shadow-inner"
                          style={{ backgroundColor: paper.previewColor }}
                        />
                        <span className="font-ui text-xs">{paper.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Satin Ribbon (Untruncated Labels) */}
              <div className="space-y-2">
                <span className="text-xs text-white/80 font-ui font-medium block">
                  Silk & Velvet Ribbon
                </span>
                <div className="grid grid-cols-2 gap-2.5">
                  {CURATED_RIBBONS.map((ribbon) => {
                    const isSelected = normalizeValentineDecor(config.decor).ribbon === ribbon.id;
                    return (
                      <button
                        key={ribbon.id}
                        type="button"
                        data-testid={`decor-option-ribbon-${ribbon.id}`}
                        onClick={() =>
                          handleConfigChange((prev) => ({
                            ...prev,
                            decor: { ...normalizeValentineDecor(prev.decor), ribbon: ribbon.id },
                          }))
                        }
                        className={`p-2.5 rounded-xl border text-xs flex items-center gap-2.5 transition-all cursor-pointer ${
                          isSelected
                            ? "border-white bg-white text-black font-medium shadow-sm"
                            : "border-white/[0.08] bg-white/[0.03] text-white/80 hover:bg-white/[0.06]"
                        }`}
                      >
                        <span
                          className="w-4 h-4 rounded-full border border-black/20 shrink-0 shadow-inner"
                          style={{ backgroundColor: ribbon.previewColor }}
                        />
                        <span className="font-ui text-xs">{ribbon.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Wax Seal Choice */}
              <div className="space-y-2">
                <span className="text-xs text-white/80 font-ui font-medium block">
                  Digital Wax Seal
                </span>
                <div className="grid grid-cols-2 gap-2.5">
                  {CURATED_SEALS.map((seal) => {
                    const isSelected = normalizeValentineDecor(config.decor).waxSeal === seal.id;
                    return (
                      <button
                        key={seal.id}
                        type="button"
                        data-testid={`decor-option-seal-${seal.id}`}
                        onClick={() =>
                          handleConfigChange((prev) => ({
                            ...prev,
                            decor: {
                              ...normalizeValentineDecor(prev.decor),
                              waxSeal: seal.id,
                              seal: seal.id,
                            },
                          }))
                        }
                        className={`p-2.5 rounded-xl border text-xs flex items-center gap-2.5 transition-all cursor-pointer ${
                          isSelected
                            ? "border-white bg-white text-black font-medium shadow-sm"
                            : "border-white/[0.08] bg-white/[0.03] text-white/80 hover:bg-white/[0.06]"
                        }`}
                      >
                        <span className="text-base select-none">{seal.emblem}</span>
                        <span className="font-ui text-xs">{seal.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Bouquet Blooms (1–4 blooms) */}
              <div className="space-y-2">
                <span className="text-xs text-white/80 font-ui font-medium block">
                  Bouquet Blooms (1–4 flowers)
                </span>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {CURATED_FLOWERS.map((flower) => {
                    const isSelected = normalizeValentineDecor(config.decor).blooms.includes(flower.id);
                    return (
                      <button
                        key={flower.id}
                        type="button"
                        data-testid={`decor-option-bloom-${flower.id}`}
                        onClick={() =>
                          handleConfigChange((prev) => {
                            const existing = normalizeValentineDecor(prev.decor);
                            let nextBlooms = [...existing.blooms];
                            if (nextBlooms.includes(flower.id)) {
                              if (nextBlooms.length > 1) {
                                nextBlooms = nextBlooms.filter((b) => b !== flower.id);
                              }
                            } else {
                              if (nextBlooms.length >= 4) nextBlooms.shift();
                              nextBlooms.push(flower.id);
                            }
                            return {
                              ...prev,
                              decor: {
                                ...existing,
                                blooms: nextBlooms,
                                flowers: nextBlooms,
                              },
                            };
                          })
                        }
                        className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                          isSelected
                            ? "border-rose-400 bg-rose-950/70 text-white font-medium shadow-xs"
                            : "border-white/[0.08] bg-white/[0.03] text-white/70 hover:bg-white/[0.06]"
                        }`}
                      >
                        <div className="text-xl mb-1 select-none">{flower.emoji}</div>
                        <div className="text-[10px] truncate font-ui">{flower.name}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Orbiting Charms */}
              <div className="space-y-2">
                <span className="text-xs text-white/80 font-ui font-medium block">
                  Orbiting Charms
                </span>
                <div className="grid grid-cols-5 gap-2">
                  {CURATED_CHARMS.map((charm) => {
                    const isSelected = normalizeValentineDecor(config.decor).charms.includes(charm.id);
                    return (
                      <button
                        key={charm.id}
                        type="button"
                        data-testid={`decor-option-charm-${charm.id}`}
                        onClick={() =>
                          handleConfigChange((prev) => {
                            const existing = normalizeValentineDecor(prev.decor);
                            let nextCharms = [...existing.charms];
                            if (nextCharms.includes(charm.id)) {
                              nextCharms = nextCharms.filter((c) => c !== charm.id);
                            } else {
                              if (nextCharms.length >= 3) nextCharms.shift();
                              nextCharms.push(charm.id);
                            }
                            return {
                              ...prev,
                              decor: {
                                ...existing,
                                charms: nextCharms,
                              },
                            };
                          })
                        }
                        className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                          isSelected
                            ? "border-rose-400 bg-rose-950/70 text-white font-medium shadow-xs"
                            : "border-white/[0.08] bg-white/[0.03] text-white/70 hover:bg-white/[0.06]"
                        }`}
                      >
                        <div className="text-xl mb-1 select-none">{charm.emoji}</div>
                        <div className="text-[10px] truncate font-ui">{charm.name}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Accent Mood (Theme) */}
              <div className="space-y-2 pt-1">
                <span className="text-xs text-white/80 font-ui font-medium block">
                  Atmospheric Mood Accent
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
                        className={`px-3 py-2.5 rounded-xl text-xs font-ui font-medium border flex items-center justify-center gap-2 transition-all cursor-pointer ${
                          isSelected
                            ? "border-white bg-white text-black shadow-xs"
                            : "border-white/[0.08] bg-white/[0.03] text-white/70 hover:bg-white/[0.06]"
                        }`}
                      >
                        <span className={`w-2 h-2 rounded-full ${meta.color}`} />
                        <span>{meta.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* Validation Errors */}
            {publishErrors.length > 0 && (
              <div className="p-4 rounded-xl bg-rose-950/70 border border-rose-800/60 text-xs text-rose-200 space-y-1.5 animate-fadeIn">
                <span className="font-semibold block text-rose-300 font-ui">
                  Please complete the following to publish:
                </span>
                {publishErrors.map((err, i) => (
                  <p key={i} className="flex items-center gap-1.5 font-ui">
                    <span>•</span> {err}
                  </p>
                ))}
              </div>
            )}

            {/* Form Action Controls */}
            <div className="pt-4 flex flex-col sm:flex-row gap-3 border-t border-white/[0.08]">
              <Button
                type="button"
                data-testid="save-draft-button"
                variant="outline"
                size="md"
                onClick={() => performSave()}
                className="flex-1 text-xs border-white/15 text-[#FAF8F5] rounded-full font-ui"
              >
                Save Draft
              </Button>
              <Button
                type="button"
                data-testid="publish-button"
                variant="romantic"
                size="md"
                disabled={saveStatus === "saving" || isPublishing}
                onClick={handlePublish}
                className="flex-1 text-xs rounded-full font-ui shadow-lg shadow-rose-950/50"
              >
                {isPublishing ? "Publishing…" : "Publish Valentine 💌"}
              </Button>
            </div>

            {/* Mobile View Live Preview CTA */}
            <div className="pt-1 md:hidden">
              <Button
                type="button"
                variant="secondary"
                size="md"
                onClick={() => setMobileTab("preview")}
                className="w-full text-xs rounded-full font-ui"
              >
                View Live Preview Canvas →
              </Button>
            </div>
          </div>
        </div>

        {/* Right Pane: Expansive Live Canvas Preview */}
        <div
          className={`flex-1 bg-[#070609] overflow-y-auto flex flex-col items-center justify-center p-4 sm:p-8 relative ${
            mobileTab === "form" ? "hidden md:flex" : "flex"
          }`}
        >
          {/* Subtle ambient starlight glow */}
          <div className="pointer-events-none absolute inset-0 bg-radial-gradient from-white/[0.04] via-transparent to-transparent opacity-80 blur-3xl" />

          {/* Device / Canvas Frame: Clean, neutral, unboxed */}
          <div className="w-full max-w-[420px] sm:max-w-[460px] rounded-[38px] p-2.5 sm:p-3.5 bg-gradient-to-b from-white/[0.12] via-white/[0.05] to-black/80 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95)] relative z-10 border border-white/[0.1]">
            <div className="rounded-[30px] overflow-hidden bg-[#0A090C] border border-black/80 flex flex-col min-h-[580px] max-h-[760px] shadow-inner relative">
              {/* Minimal Device Top Bar */}
              <div className="h-6 w-full bg-black/60 flex items-center justify-between px-6 pt-1 select-none z-30 shrink-0">
                <span className="text-[10px] text-white/50 font-ui font-medium">9:41</span>
                <div className="w-14 h-3 rounded-full bg-black border border-white/10" />
                <div className="flex items-center gap-1 text-[10px] text-white/50 font-ui">
                  <span>5G</span>
                  <span>100%</span>
                </div>
              </div>

              {/* Screen Content: Real ExperienceRenderer with selected world */}
              <div className="flex-1 overflow-y-auto">
                <ExperienceRenderer
                  templateId={templateMeta.id}
                  templateVersion={templateMeta.version}
                  mode="preview"
                  rawConfig={config}
                  publicId={publicId}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* World Selector Modal */}
      <WorldSelectorModal
        isOpen={worldModalOpen}
        currentTemplateId={templateMeta.id}
        onClose={() => setWorldModalOpen(false)}
        onSelectWorld={handleSelectWorld}
      />

      {/* Published Completion Modal */}
      {publishModalOpen && (
        <div
          data-testid="publish-success-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
        >
          <div
            className="max-w-md w-full p-8 sm:p-10 border border-white/[0.15] bg-[#131118] text-center space-y-6 shadow-2xl shadow-black/95 relative rounded-3xl z-10"
          >
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-rose-600 via-rose-700 to-[#7A1428] border border-rose-400/60 flex items-center justify-center shadow-xl text-3xl select-none animate-float">
              💌
            </div>

            <div className="space-y-2">
              <Badge variant="rose" size="sm" className="bg-rose-950/80 border-rose-400/40 text-rose-200 font-ui">
                Published & Sealed
              </Badge>
              <h2 className="text-2xl font-display font-medium text-white">
                Your Valentine is Ready
              </h2>
              <p className="text-xs sm:text-sm text-white/70 font-ui font-light leading-relaxed">
                Send this private link to your partner. When they open it, they will enter your custom {templateMeta.name} world.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-black/60 border border-white/[0.1] flex items-center gap-2">
              <input
                data-testid="public-url-input"
                readOnly
                value={publicUrl}
                className="flex-1 bg-transparent text-xs text-rose-100 outline-none select-all font-mono"
              />
              <button
                type="button"
                data-testid="copy-link-button"
                onClick={handleCopyLink}
                className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-medium tracking-wide transition-colors shrink-0 shadow-md font-ui"
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
                className="flex-1 py-3 rounded-xl border border-white/15 text-white text-xs font-medium hover:bg-white/10 transition-colors flex items-center justify-center gap-1.5 font-ui"
              >
                <span>Open Valentine</span>
                <span>↗</span>
              </a>
              <button
                type="button"
                data-testid="close-publish-modal-button"
                onClick={() => setPublishModalOpen(false)}
                className="flex-1 py-3 rounded-xl bg-white/[0.06] text-white/70 text-xs font-medium hover:bg-white/[0.12] hover:text-white transition-colors font-ui cursor-pointer"
              >
                Back to Studio
              </button>
            </div>

            <p className="text-[11px] text-white/40 font-ui">
              🔒 Completely private. Never indexed by search engines.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
