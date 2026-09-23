"use client";

import React, { useState, useEffect, useCallback } from "react";

interface ReactionCounts {
  heart?: number;
  sparkles?: number;
  tears_of_joy?: number;
  warm_smile?: number;
  rose?: number;
  [key: string]: number | undefined;
}

interface ReplyItem {
  id: string;
  senderName: string | null;
  replyText: string;
  createdAt: string;
}

interface PartnerInteractionsPanelProps {
  publicId: string;
  className?: string;
}

const REACTION_EMOJIS: Record<string, { emoji: string; label: string }> = {
  heart: { emoji: "❤️", label: "Love" },
  sparkles: { emoji: "✨", label: "Magic" },
  tears_of_joy: { emoji: "🥹", label: "Touched" },
  warm_smile: { emoji: "🥰", label: "Warmth" },
  rose: { emoji: "🌹", label: "Rose" },
};

export const PartnerInteractionsPanel: React.FC<PartnerInteractionsPanelProps> = ({
  publicId,
  className = "",
}) => {
  const [counts, setCounts] = useState<ReactionCounts>({});
  const [replies, setReplies] = useState<ReplyItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  const fetchInteractions = useCallback(async () => {
    setIsLoading(true);
    try {
      const [recRes, repRes] = await Promise.all([
        fetch(`/api/experiences/${encodeURIComponent(publicId)}/reactions`, {
          headers: { "Cache-Control": "no-store" },
        }),
        fetch(`/api/experiences/${encodeURIComponent(publicId)}/replies`, {
          headers: { "Cache-Control": "no-store" },
        }),
      ]);

      if (recRes.ok) {
        const recData = await recRes.json();
        setCounts(recData.counts || {});
      }
      if (repRes.ok) {
        const repData = await repRes.json();
        setReplies(repData.replies || []);
      }
    } catch {
      // Ignored on transient network error
    } finally {
      setIsLoading(false);
      setHasLoaded(true);
    }
  }, [publicId]);

  useEffect(() => {
    fetchInteractions();
  }, [fetchInteractions]);

  const totalReactions = Object.values(counts).reduce((acc = 0, n = 0) => acc + n, 0);

  return (
    <div
      data-testid="partner-interactions-panel"
      className={`p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-4 ${className}`}
    >
      <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
        <div className="flex items-center gap-2">
          <span className="text-base select-none">💌</span>
          <div>
            <h3 className="text-sm font-display font-medium text-white">
              Partner Reactions & Replies
            </h3>
            <p className="text-[11px] text-white/50 font-ui font-light">
              Private feedback received from your recipient.
            </p>
          </div>
        </div>
        <button
          type="button"
          data-testid="refresh-interactions-btn"
          onClick={fetchInteractions}
          disabled={isLoading}
          className="text-[11px] text-rose-300 hover:text-rose-200 underline font-ui cursor-pointer disabled:opacity-50"
        >
          {isLoading ? "Refreshing..." : "Refresh ⟳"}
        </button>
      </div>

      {/* Reactions Section */}
      <div data-testid="creator-reactions-panel" className="space-y-2">
        <div className="text-xs text-white/70 font-ui font-medium">
          Reactions ({totalReactions})
        </div>
        <div className="flex flex-wrap gap-2">
          {Object.entries(REACTION_EMOJIS).map(([type, { emoji, label }]) => {
            const count = counts[type] || 0;
            return (
              <div
                key={type}
                data-testid={`reaction-tally-${type}`}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-ui ${
                  count > 0
                    ? "bg-rose-950/40 border-rose-500/30 text-rose-200"
                    : "bg-white/[0.02] border-white/[0.06] text-white/40"
                }`}
              >
                <span>{emoji}</span>
                <span>{label}</span>
                <span className="font-mono font-semibold ml-0.5">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Replies Section */}
      <div data-testid="creator-replies-panel" className="space-y-2 pt-2 border-t border-white/[0.06]">
        <div className="text-xs text-white/70 font-ui font-medium">
          Private Replies ({replies.length})
        </div>

        {replies.length === 0 ? (
          <p className="text-xs text-white/40 font-ui italic py-1">
            {hasLoaded
              ? "No replies yet. When your partner sends a private reply, it will appear here."
              : "Checking for replies..."}
          </p>
        ) : (
          <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
            {replies.map((reply) => (
              <div
                key={reply.id}
                data-testid="reply-item"
                className="p-3 rounded-xl bg-black/40 border border-white/[0.08] space-y-1 text-xs"
              >
                <div className="flex items-center justify-between text-[11px] text-white/50 font-ui">
                  <span className="font-semibold text-rose-300">
                    {reply.senderName || "Your Partner"}
                  </span>
                  <span>
                    {new Date(reply.createdAt).toLocaleDateString([], {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <p className="text-white/90 font-serif italic text-xs leading-relaxed">
                  &ldquo;{reply.replyText}&rdquo;
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
