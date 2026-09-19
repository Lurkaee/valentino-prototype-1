import React from "react";
import { ResolvedMedia } from "@/lib/media";

interface MediaSlotProps {
  media: ResolvedMedia | null;
  className?: string;
  fallbackText?: string;
}

export const MediaSlot: React.FC<MediaSlotProps> = ({
  media,
  className = "",
  fallbackText = "",
}) => {
  if (media?.url) {
    return (
      <div className={`relative overflow-hidden rounded-xl ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={media.url}
          alt={media.altText || fallbackText || "Valentine image"}
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  // Graceful fallback slot without throwing
  return (
    <div
      data-testid="media-fallback"
      className={`flex items-center justify-center rounded-xl border border-dashed border-white/20 bg-white/5 p-4 text-center text-xs text-white/40 ${className}`}
    >
      <span>{fallbackText || "No image selected"}</span>
    </div>
  );
};
