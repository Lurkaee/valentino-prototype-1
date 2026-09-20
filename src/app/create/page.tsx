"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

export default function CreateExperiencePage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState("Preparing something special...");

  useEffect(() => {
    let isMounted = true;

    async function initExperience() {
      try {
        const timer1 = setTimeout(() => {
          if (isMounted) setStatusMessage("Folding the letter...");
        }, 400);

        const timer2 = setTimeout(() => {
          if (isMounted) setStatusMessage("Adding the final little touch...");
        }, 850);

        const res = await fetch("/api/experiences", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        clearTimeout(timer1);
        clearTimeout(timer2);

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
    };
  }, [router]);

  return (
    <main className="relative min-h-[100dvh] flex flex-col items-center justify-center p-6 text-center bg-[#12030A] text-[#FAF8F5] overflow-hidden">
      {/* Sunset ambient glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-rose-950/40 via-[#1F0412] to-[#12030A] pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-rose-500/15 blur-3xl pointer-events-none" />

      <div className="max-w-md w-full p-8 sm:p-10 rounded-3xl bg-[#1D0613]/80 border border-rose-500/25 shadow-2xl backdrop-blur-xl relative z-10 space-y-6">
        {error ? (
          <div className="space-y-4">
            <div className="w-14 h-14 mx-auto rounded-full bg-rose-950/60 border border-rose-800/40 flex items-center justify-center text-2xl">
              🥀
            </div>
            <h2 className="text-xl font-serif font-medium text-white">
              Something went wrong
            </h2>
            <p className="text-xs sm:text-sm text-rose-300/90 font-light leading-relaxed">
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
            {/* Small Glowing Heart Seal */}
            <div className="relative flex items-center justify-center w-20 h-20 mx-auto">
              {/* Outer pulsing ring */}
              <div className="absolute inset-0 rounded-full bg-rose-500/25 animate-ping opacity-40" />
              {/* Center wax seal button style */}
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-rose-600 via-rose-700 to-[#7A1428] border border-rose-400/80 flex items-center justify-center shadow-xl shadow-rose-950/80 text-2xl select-none">
                💌
              </div>
            </div>

            <div className="space-y-1.5">
              <h2 className="text-xl font-serif font-medium text-white tracking-wide transition-all duration-300">
                {statusMessage}
              </h2>
              <p className="text-xs text-[#FAF8F5]/60 font-sans">
                Setting up your private, encrypted writing studio
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
