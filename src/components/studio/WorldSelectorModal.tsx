"use client";

import React from "react";
import { getAllTemplates } from "@/templates/registry";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

interface WorldSelectorModalProps {
  isOpen: boolean;
  currentTemplateId: string;
  onClose: () => void;
  onSelectWorld: (templateId: string, templateVersion: string) => void;
}

export const WorldSelectorModal: React.FC<WorldSelectorModalProps> = ({
  isOpen,
  currentTemplateId,
  onClose,
  onSelectWorld,
}) => {
  if (!isOpen) return null;

  const availableTemplates = getAllTemplates();

  return (
    <div
      data-testid="world-selector-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="max-w-2xl w-full p-6 sm:p-8 border border-white/[0.12] bg-[#131118] text-left space-y-6 shadow-2xl shadow-black/95 relative rounded-2xl max-h-[90vh] overflow-y-auto z-10"
      >
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-ui uppercase tracking-wider text-rose-300/80 font-medium">
              Creative Direction
            </span>
            <h2 className="text-xl sm:text-2xl font-display font-medium text-white">
              Choose Visual World
            </h2>
            <p className="text-xs text-white/60 font-ui font-light">
              Switching worlds alters the sensory atmosphere and visual staging. Your written letter,
              memories, and custom decor remain safe.
            </p>
          </div>
          <button
            type="button"
            data-testid="close-world-modal-button"
            onClick={onClose}
            className="text-white/40 hover:text-white p-2 rounded-lg hover:bg-white/[0.06] transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Worlds Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          {availableTemplates.map((template) => {
            const isCurrent = template.id === currentTemplateId;
            const styleAccents: Record<string, { bg: string; border: string; glow: string; icon: string }> = {
              "midnight-rose": {
                bg: "from-[#200511]/90 to-[#12030A]/90",
                border: "border-rose-500/40",
                glow: "from-rose-500/20",
                icon: "🌹",
              },
              "cloud-nine": {
                bg: "from-[#111A2E]/90 to-[#0A101D]/90",
                border: "border-sky-400/40",
                glow: "from-sky-500/20",
                icon: "☁️",
              },
              kage: {
                bg: "from-[#17141D]/90 to-[#0D0B12]/90",
                border: "border-purple-400/40",
                glow: "from-purple-500/20",
                icon: "⛩️",
              },
            };

            const accent = styleAccents[template.id] || {
              bg: "from-white/[0.08] to-white/[0.02]",
              border: "border-white/20",
              glow: "from-white/10",
              icon: "✨",
            };

            return (
              <button
                key={template.id}
                type="button"
                data-testid={`world-option-${template.id}`}
                onClick={() => {
                  onSelectWorld(template.id, template.version);
                  onClose();
                }}
                className={`p-4 rounded-xl text-left border flex flex-col justify-between transition-all relative overflow-hidden group cursor-pointer ${
                  isCurrent
                    ? `${accent.border} bg-gradient-to-b ${accent.bg} shadow-lg shadow-black/50 ring-1 ring-white/20`
                    : "border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/[0.16]"
                }`}
              >
                {/* Top: Category & Status */}
                <div className="flex items-center justify-between mb-3 w-full">
                  <span className="text-xl select-none">{accent.icon}</span>
                  {isCurrent ? (
                    <Badge variant="rose" size="sm" className="text-[10px] px-2 py-0.5">
                      Current World
                    </Badge>
                  ) : (
                    <span className="text-[10px] font-ui text-white/40 uppercase tracking-wider">
                      {template.category || "Available"}
                    </span>
                  )}
                </div>

                {/* Details */}
                <div className="space-y-1.5 mb-3">
                  <h3 className="text-sm font-display font-medium text-white group-hover:text-white transition-colors">
                    {template.name}
                  </h3>
                  <p className="text-[11px] text-white/70 font-romantic leading-snug line-clamp-2">
                    {template.tagline || template.description}
                  </p>
                  <p className="text-[10px] text-white/45 font-ui leading-relaxed line-clamp-2 pt-1">
                    {template.atmosphere}
                  </p>
                </div>

                {/* Bottom Signature Affordance */}
                <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-ui text-white/50 w-full">
                  <span className="truncate">{template.signature || "Custom experience"}</span>
                  <span className="text-white/70 group-hover:translate-x-0.5 transition-transform shrink-0 ml-1">
                    {isCurrent ? "✓" : "→"}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer reassurance */}
        <div className="pt-2 flex items-center justify-between text-[11px] font-ui text-white/40 border-t border-white/[0.08]">
          <span className="flex items-center gap-1.5">
            <span>🔒</span>
            <span>All text, memories, and modules persist cleanly across worlds.</span>
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg text-xs font-ui text-white/70 hover:text-white hover:bg-white/[0.06] transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
