"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { decodeDecorParam, normalizeValentineDecor } from "@/types/decor";

function CreateExperienceContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState("Preparing your creative world...");
  const [templateId, setTemplateId] = useState("midnight-rose");

  useEffect(() => {
    let isMounted = true;
    let timer1: NodeJS.Timeout | null = null;
    let timer2: NodeJS.Timeout | null = null;

    async function initExperience() {
      try {
        timer1 = setTimeout(() => {
          if (isMounted) setStatusMessage("Configuring experience modules...");
        }, 400);

        timer2 = setTimeout(() => {
          if (isMounted) setStatusMessage("Opening Experience Studio...");
        }, 850);

        // Read decor and template from query params or sessionStorage fallback
        let initialDecor = null;
        let selectedTemplateId = "midnight-rose";
        try {
          const tParam = searchParams.get("template") || searchParams.get("templateId");
          if (tParam && (tParam === "cloud-nine" || tParam === "midnight-rose" || tParam === "kage")) {
            selectedTemplateId = tParam;
            if (isMounted) setTemplateId(tParam);
          }

          const decorParam = searchParams.get("decor");
          if (decorParam) {
            initialDecor = decodeDecorParam(decorParam);
          }
          if (!initialDecor) {
            const stored = sessionStorage.getItem("valentino_custom_decor");
            if (stored) {
              initialDecor = normalizeValentineDecor(JSON.parse(stored));
            }
          }
        } catch {
          // Gracefully fallback
        }

        const payload: Record<string, unknown> = {
          templateId: selectedTemplateId,
          templateVersion: "v1",
        };
        if (initialDecor) {
          payload.initialDecor = initialDecor;
        }

        const res = await fetch("/api/experiences", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (timer1) clearTimeout(timer1);
        if (timer2) clearTimeout(timer2);

        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error || "Failed to initialize experience");
        }

        const { publicId } = await res.json();
        if (isMounted) {
          router.replace(`/edit/${publicId}`);
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err.message || "An unexpected error occurred while setting up your canvas.");
        }
      }
    }

    initExperience();

    return () => {
      isMounted = false;
      if (timer1) clearTimeout(timer1);
      if (timer2) clearTimeout(timer2);
    };
  }, [router, searchParams]);

  return (
    <main className="relative min-h-[100dvh] flex flex-col items-center justify-center p-6 text-center bg-[#0A090C] text-[#FAF8F5] overflow-hidden font-ui">
      {/* Subtle ambient lighting */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#131118]/60 via-[#0A090C] to-[#0A090C] pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[480px] h-[480px] rounded-full bg-white/[0.02] blur-3xl pointer-events-none" />

      <div className="max-w-md w-full p-8 sm:p-10 rounded-3xl bg-[#13111A]/85 border border-white/10 shadow-2xl backdrop-blur-xl relative z-10 space-y-6">
        {error ? (
          <div className="space-y-4">
            <div className="w-14 h-14 mx-auto rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center text-2xl text-ivory-300">
              ✦
            </div>
            <h2 className="text-xl font-serif font-medium text-white">
              Something went wrong
            </h2>
            <p className="text-xs sm:text-sm text-ivory-300 font-light leading-relaxed">
              {error}
            </p>
            <div className="pt-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => window.location.reload()}
              >
                Try Again
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            {/* Elegant Studio Loader */}
            <div className="relative flex items-center justify-center w-20 h-20 mx-auto">
              <div className="absolute inset-0 rounded-full border border-white/15 animate-ping opacity-30" />
              <div className="w-14 h-14 rounded-2xl bg-[#1A1824] border border-white/20 flex items-center justify-center shadow-xl text-xl select-none text-ivory-100">
                ✦
              </div>
            </div>

            <div className="space-y-1.5">
              <h2 className="text-xl font-serif font-medium text-white tracking-wide transition-all duration-300">
                {statusMessage}
              </h2>
              <p className="text-xs text-ivory-400 font-ui">
                Setting up your private interactive experience studio
              </p>
            </div>

            {/* Concise World Capability Preview */}
            <div
              data-testid="world-capability-preview"
              className="pt-3 pb-2 px-4 rounded-2xl bg-white/[0.04] border border-white/[0.08] text-center space-y-1"
            >
              <span className="text-[10px] font-mono uppercase tracking-widest text-rose-300">
                {templateId === "cloud-nine"
                  ? "Cloud Nine Sanctuary"
                  : templateId === "kage"
                  ? "Kage Kyoto World"
                  : "Midnight Rose"}
              </span>
              <p className="text-xs text-white/70 font-ui font-light">
                {templateId === "cloud-nine"
                  ? "A dreamy pastel world with Devotion Letter · Celestial Blessing · Story Chapters"
                  : templateId === "kage"
                  ? "A Kyoto mountain temple with Japanese Mist · Intimate Letter · Secret Note"
                  : "A cinematic letter world with Love Letter · Memories · Interactive Moments"}
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default function CreateExperiencePage() {
  return (
    <Suspense
      fallback={
        <main className="relative min-h-[100dvh] flex flex-col items-center justify-center p-6 text-center bg-[#0A090C] text-[#FAF8F5] overflow-hidden">
          <div className="w-12 h-12 rounded-xl bg-white/[0.08] animate-pulse flex items-center justify-center text-xl text-ivory-300">
            ✦
          </div>
        </main>
      }
    >
      <CreateExperienceContent />
    </Suspense>
  );
}
