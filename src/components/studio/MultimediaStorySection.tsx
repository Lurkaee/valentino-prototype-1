"use client";

import React, { useState } from "react";
import { MediaUploader } from "./MediaUploader";

interface MemoryItem {
  id?: string;
  url: string;
  title?: string;
  caption?: string;
  date?: string;
}

interface MultimediaStorySectionProps {
  publicId: string;
  modules: any;
  onChange: (updater: (prevModules: any) => any) => void;
  className?: string;
}

export const MultimediaStorySection: React.FC<MultimediaStorySectionProps> = ({
  publicId,
  modules = {},
  onChange,
  className = "",
}) => {
  const [activeTab, setActiveTab] = useState<"memories" | "voice" | "video" | "readAloud" | null>(null);

  const memoriesEnabled = Boolean(modules?.memories?.enabled);
  const voiceEnabled = Boolean(modules?.voiceNote?.enabled);
  const videoEnabled = Boolean(modules?.videoMemory?.enabled);
  const readAloudEnabled = Boolean(modules?.readAloud?.enabled);

  const memoryItems: MemoryItem[] = modules?.memories?.items || [];

  return (
    <div className={`space-y-4 ${className}`} data-testid="multimedia-story-section">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-display font-medium text-white flex items-center gap-2">
            <span>📷</span>
            <span>Multimedia, Memories & Audio</span>
          </h3>
          <p className="text-[11px] text-white/50 font-ui font-light">
            Enrich your love letter with photos, personal voice notes, and video memories.
          </p>
        </div>
      </div>

      {/* Quick Toggle Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {/* Memories */}
        <button
          type="button"
          data-testid="toggle-memories-editor"
          onClick={() => {
            if (!memoriesEnabled) {
              onChange((prev) => ({
                ...prev,
                memories: {
                  enabled: true,
                  title: "Our Cherished Memories",
                  items: prev?.memories?.items || [],
                },
              }));
            }
            setActiveTab(activeTab === "memories" ? null : "memories");
          }}
          className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
            memoriesEnabled
              ? "border-rose-400/40 bg-rose-950/40 text-white shadow-xs"
              : "border-white/[0.08] bg-white/[0.03] text-white/70 hover:bg-white/[0.06]"
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-lg select-none">📸</span>
            <span
              className={`text-[10px] font-ui px-1.5 py-0.5 rounded-md ${
                memoriesEnabled
                  ? "bg-rose-500/20 text-rose-300 font-medium"
                  : "bg-white/[0.06] text-white/50"
              }`}
            >
              {memoriesEnabled ? `${memoryItems.length} Photos` : "+ Add"}
            </span>
          </div>
          <div>
            <span className="text-xs font-display font-medium block text-white">Memories</span>
            <span className="text-[10px] text-white/50 font-ui truncate block">Photo gallery</span>
          </div>
        </button>

        {/* Voice Note */}
        <button
          type="button"
          data-testid="toggle-voice-note-editor"
          onClick={() => {
            if (!voiceEnabled) {
              onChange((prev) => ({
                ...prev,
                voiceNote: {
                  enabled: true,
                  title: "Voice Note",
                  caption: "A personal message from my heart",
                  url: prev?.voiceNote?.url || "",
                },
              }));
            }
            setActiveTab(activeTab === "voice" ? null : "voice");
          }}
          className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
            voiceEnabled
              ? "border-rose-400/40 bg-rose-950/40 text-white shadow-xs"
              : "border-white/[0.08] bg-white/[0.03] text-white/70 hover:bg-white/[0.06]"
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-lg select-none">🎙️</span>
            <span
              className={`text-[10px] font-ui px-1.5 py-0.5 rounded-md ${
                voiceEnabled
                  ? "bg-rose-500/20 text-rose-300 font-medium"
                  : "bg-white/[0.06] text-white/50"
              }`}
            >
              {voiceEnabled ? "✓ Active" : "+ Add"}
            </span>
          </div>
          <div>
            <span className="text-xs font-display font-medium block text-white">Voice Note</span>
            <span className="text-[10px] text-white/50 font-ui truncate block">Audio seal</span>
          </div>
        </button>

        {/* Video Memory */}
        <button
          type="button"
          data-testid="toggle-video-memory-editor"
          onClick={() => {
            if (!videoEnabled) {
              onChange((prev) => ({
                ...prev,
                videoMemory: {
                  enabled: true,
                  title: "Video Memory",
                  caption: "A captured memory forever preserved",
                  url: prev?.videoMemory?.url || "",
                },
              }));
            }
            setActiveTab(activeTab === "video" ? null : "video");
          }}
          className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
            videoEnabled
              ? "border-rose-400/40 bg-rose-950/40 text-white shadow-xs"
              : "border-white/[0.08] bg-white/[0.03] text-white/70 hover:bg-white/[0.06]"
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-lg select-none">🎞️</span>
            <span
              className={`text-[10px] font-ui px-1.5 py-0.5 rounded-md ${
                videoEnabled
                  ? "bg-rose-500/20 text-rose-300 font-medium"
                  : "bg-white/[0.06] text-white/50"
              }`}
            >
              {videoEnabled ? "✓ Active" : "+ Add"}
            </span>
          </div>
          <div>
            <span className="text-xs font-display font-medium block text-white">Video Capsule</span>
            <span className="text-[10px] text-white/50 font-ui truncate block">Motion memory</span>
          </div>
        </button>

        {/* Read Aloud Toggle */}
        <button
          type="button"
          data-testid="toggle-read-aloud"
          onClick={() => {
            onChange((prev) => ({
              ...prev,
              readAloud: {
                enabled: !readAloudEnabled,
              },
            }));
          }}
          className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
            readAloudEnabled
              ? "border-rose-400/40 bg-rose-950/40 text-white shadow-xs"
              : "border-white/[0.08] bg-white/[0.03] text-white/70 hover:bg-white/[0.06]"
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-lg select-none">🔊</span>
            <span
              className={`text-[10px] font-ui px-1.5 py-0.5 rounded-md ${
                readAloudEnabled
                  ? "bg-rose-500/20 text-rose-300 font-medium"
                  : "bg-white/[0.06] text-white/50"
              }`}
            >
              {readAloudEnabled ? "✓ Enabled" : "Off"}
            </span>
          </div>
          <div>
            <span className="text-xs font-display font-medium block text-white">Read Aloud</span>
            <span className="text-[10px] text-white/50 font-ui truncate block">Voice synthesis</span>
          </div>
        </button>
      </div>

      {/* 1. Memories Drawer */}
      {memoriesEnabled && activeTab === "memories" && (
        <div
          data-testid="memories-drawer"
          className="p-5 rounded-2xl bg-white/[0.03] border border-rose-500/30 space-y-4 animate-fadeIn"
        >
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
            <div>
              <span className="text-sm font-display font-medium text-white block">
                Memories Photo Gallery
              </span>
              <span className="text-[11px] text-white/50 font-ui">
                Upload pictures of special trips, dates, and laughter.
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                onChange((prev) => ({
                  ...prev,
                  memories: { ...prev.memories, enabled: false },
                }));
                setActiveTab(null);
              }}
              className="text-[11px] text-rose-400 hover:text-rose-300 underline font-ui cursor-pointer"
            >
              Disable Memories
            </button>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-[11px] text-white/70 font-ui font-medium block mb-1">
                Gallery Title
              </label>
              <input
                type="text"
                data-testid="input-memories-title"
                value={modules.memories?.title || ""}
                onChange={(e) =>
                  onChange((prev) => ({
                    ...prev,
                    memories: { ...prev.memories, title: e.target.value },
                  }))
                }
                className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/[0.12] text-white focus:outline-none focus:border-rose-400 font-ui"
              />
            </div>

            {/* Upload New Photo */}
            <div className="pt-1">
              <MediaUploader
                publicId={publicId}
                fileType="photo"
                label="Add a Memory Photo"
                maxSizeMb={5}
                onUploaded={(media) => {
                  onChange((prev) => ({
                    ...prev,
                    memories: {
                      ...prev.memories,
                      items: [
                        ...(prev.memories?.items || []),
                        {
                          id: media.id,
                          url: media.url,
                          title: "A Sweet Memory",
                          date: "A special moment",
                          caption: "",
                        },
                      ],
                    },
                  }));
                }}
              />
            </div>

            {/* Photos List */}
            {memoryItems.length > 0 && (
              <div className="space-y-3 pt-2">
                <span className="text-[11px] text-white/70 font-ui font-medium block">
                  Photos ({memoryItems.length})
                </span>

                {memoryItems.map((item, idx) => (
                  <div
                    key={item.id || idx}
                    data-testid="memory-item-row"
                    className="p-3.5 rounded-xl bg-black/40 border border-white/[0.08] flex flex-col sm:flex-row gap-3.5 items-start"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.url}
                      alt={item.title || "Memory thumbnail"}
                      className="w-20 h-16 object-cover rounded-lg border border-white/10 shrink-0 bg-stone-900"
                    />

                    <div className="flex-1 space-y-2 w-full">
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          placeholder="Memory Title"
                          data-testid={`memory-title-input-${idx}`}
                          value={item.title || ""}
                          onChange={(e) => {
                            const updated = [...memoryItems];
                            updated[idx] = { ...updated[idx], title: e.target.value };
                            onChange((prev) => ({
                              ...prev,
                              memories: { ...prev.memories, items: updated },
                            }));
                          }}
                          className="text-xs px-2.5 py-1.5 rounded-lg bg-black/50 border border-white/[0.1] text-white font-ui"
                        />
                        <input
                          type="text"
                          placeholder="Date or occasion"
                          data-testid={`memory-date-input-${idx}`}
                          value={item.date || ""}
                          onChange={(e) => {
                            const updated = [...memoryItems];
                            updated[idx] = { ...updated[idx], date: e.target.value };
                            onChange((prev) => ({
                              ...prev,
                              memories: { ...prev.memories, items: updated },
                            }));
                          }}
                          className="text-xs px-2.5 py-1.5 rounded-lg bg-black/50 border border-white/[0.1] text-white font-ui"
                        />
                      </div>

                      <input
                        type="text"
                        placeholder="Caption / little story about this moment"
                        data-testid={`memory-caption-input-${idx}`}
                        value={item.caption || ""}
                        onChange={(e) => {
                          const updated = [...memoryItems];
                          updated[idx] = { ...updated[idx], caption: e.target.value };
                          onChange((prev) => ({
                            ...prev,
                            memories: { ...prev.memories, items: updated },
                          }));
                        }}
                        className="w-full text-xs px-2.5 py-1.5 rounded-lg bg-black/50 border border-white/[0.1] text-white/90 italic font-ui"
                      />

                      <div className="flex items-center justify-between pt-1">
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            disabled={idx === 0}
                            onClick={() => {
                              if (idx === 0) return;
                              const updated = [...memoryItems];
                              const temp = updated[idx - 1];
                              updated[idx - 1] = updated[idx];
                              updated[idx] = temp;
                              onChange((prev) => ({
                                ...prev,
                                memories: { ...prev.memories, items: updated },
                              }));
                            }}
                            className="text-[10px] px-2 py-0.5 rounded bg-white/[0.06] hover:bg-white/[0.12] text-white/80 disabled:opacity-30 cursor-pointer"
                          >
                            ↑ Move Up
                          </button>
                          <button
                            type="button"
                            disabled={idx === memoryItems.length - 1}
                            onClick={() => {
                              if (idx === memoryItems.length - 1) return;
                              const updated = [...memoryItems];
                              const temp = updated[idx + 1];
                              updated[idx + 1] = updated[idx];
                              updated[idx] = temp;
                              onChange((prev) => ({
                                ...prev,
                                memories: { ...prev.memories, items: updated },
                              }));
                            }}
                            className="text-[10px] px-2 py-0.5 rounded bg-white/[0.06] hover:bg-white/[0.12] text-white/80 disabled:opacity-30 cursor-pointer"
                          >
                            ↓ Move Down
                          </button>
                        </div>

                        <button
                          type="button"
                          data-testid={`memory-remove-btn-${idx}`}
                          onClick={() => {
                            const updated = memoryItems.filter((_, i) => i !== idx);
                            onChange((prev) => ({
                              ...prev,
                              memories: { ...prev.memories, items: updated },
                            }));
                          }}
                          className="text-[10px] text-rose-400 hover:text-rose-300 font-ui cursor-pointer"
                        >
                          Remove ✕
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. Voice Note Drawer */}
      {voiceEnabled && activeTab === "voice" && (
        <div
          data-testid="voice-note-drawer"
          className="p-5 rounded-2xl bg-white/[0.03] border border-rose-500/30 space-y-4 animate-fadeIn"
        >
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
            <div>
              <span className="text-sm font-display font-medium text-white block">
                Voice Note Audio Seal
              </span>
              <span className="text-[11px] text-white/50 font-ui">
                Upload a recorded voice note (MP3/WAV/OGG, up to 10 MB).
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                onChange((prev) => ({
                  ...prev,
                  voiceNote: { ...prev.voiceNote, enabled: false },
                }));
                setActiveTab(null);
              }}
              className="text-[11px] text-rose-400 hover:text-rose-300 underline font-ui cursor-pointer"
            >
              Disable Voice Note
            </button>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-[11px] text-white/70 font-ui font-medium block mb-1">
                Title
              </label>
              <input
                type="text"
                data-testid="input-voice-title"
                value={modules.voiceNote?.title || ""}
                onChange={(e) =>
                  onChange((prev) => ({
                    ...prev,
                    voiceNote: { ...prev.voiceNote, title: e.target.value },
                  }))
                }
                className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/[0.12] text-white focus:outline-none focus:border-rose-400 font-ui"
              />
            </div>

            <div>
              <label className="text-[11px] text-white/70 font-ui font-medium block mb-1">
                Caption
              </label>
              <input
                type="text"
                data-testid="input-voice-caption"
                value={modules.voiceNote?.caption || ""}
                onChange={(e) =>
                  onChange((prev) => ({
                    ...prev,
                    voiceNote: { ...prev.voiceNote, caption: e.target.value },
                  }))
                }
                className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/[0.12] text-white focus:outline-none focus:border-rose-400 font-ui"
              />
            </div>

            <div>
              <label className="text-[11px] text-white/70 font-ui font-medium block mb-1">
                Audio File
              </label>
              <MediaUploader
                publicId={publicId}
                fileType="audio"
                label="Upload Voice Recording"
                maxSizeMb={10}
                onUploaded={(media) => {
                  onChange((prev) => ({
                    ...prev,
                    voiceNote: {
                      ...prev.voiceNote,
                      url: media.url,
                    },
                  }));
                }}
              />
              {modules.voiceNote?.url && (
                <div className="mt-2 p-2 rounded-xl bg-black/40 border border-white/[0.08] flex items-center justify-between">
                  <audio src={modules.voiceNote.url} controls className="h-8 max-w-xs" />
                  <span className="text-[10px] text-emerald-400 font-ui">✓ Attached</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 3. Video Memory Drawer */}
      {videoEnabled && activeTab === "video" && (
        <div
          data-testid="video-memory-drawer"
          className="p-5 rounded-2xl bg-white/[0.03] border border-rose-500/30 space-y-4 animate-fadeIn"
        >
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
            <div>
              <span className="text-sm font-display font-medium text-white block">
                Video Memory Capsule
              </span>
              <span className="text-[11px] text-white/50 font-ui">
                Upload a short video clip (MP4/WebM, up to 25 MB).
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                onChange((prev) => ({
                  ...prev,
                  videoMemory: { ...prev.videoMemory, enabled: false },
                }));
                setActiveTab(null);
              }}
              className="text-[11px] text-rose-400 hover:text-rose-300 underline font-ui cursor-pointer"
            >
              Disable Video Memory
            </button>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-[11px] text-white/70 font-ui font-medium block mb-1">
                Title
              </label>
              <input
                type="text"
                data-testid="input-video-title"
                value={modules.videoMemory?.title || ""}
                onChange={(e) =>
                  onChange((prev) => ({
                    ...prev,
                    videoMemory: { ...prev.videoMemory, title: e.target.value },
                  }))
                }
                className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/[0.12] text-white focus:outline-none focus:border-rose-400 font-ui"
              />
            </div>

            <div>
              <label className="text-[11px] text-white/70 font-ui font-medium block mb-1">
                Caption
              </label>
              <input
                type="text"
                data-testid="input-video-caption"
                value={modules.videoMemory?.caption || ""}
                onChange={(e) =>
                  onChange((prev) => ({
                    ...prev,
                    videoMemory: { ...prev.videoMemory, caption: e.target.value },
                  }))
                }
                className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/[0.12] text-white focus:outline-none focus:border-rose-400 font-ui"
              />
            </div>

            <div>
              <label className="text-[11px] text-white/70 font-ui font-medium block mb-1">
                Video File
              </label>
              <MediaUploader
                publicId={publicId}
                fileType="video"
                label="Upload Video Capsule"
                maxSizeMb={25}
                onUploaded={(media) => {
                  onChange((prev) => ({
                    ...prev,
                    videoMemory: {
                      ...prev.videoMemory,
                      url: media.url,
                    },
                  }));
                }}
              />
              {modules.videoMemory?.url && (
                <div className="mt-2 p-2 rounded-xl bg-black/40 border border-white/[0.08] space-y-1">
                  <video src={modules.videoMemory.url} controls className="max-h-36 rounded-lg w-full object-contain bg-black" />
                  <span className="text-[10px] text-emerald-400 font-ui block text-right">✓ Attached</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
