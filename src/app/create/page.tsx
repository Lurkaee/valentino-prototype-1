"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { normalizeValentineDecor } from "@/types/decor";

export default function CreateExperiencePage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function initExperience() {
      try {
        let initialDecor: ReturnType<typeof normalizeValentineDecor> | undefined;

        const queryDecor = new URLSearchParams(window.location.search).get("decor");
        if (queryDecor) {
          try {
            initialDecor = normalizeValentineDecor(JSON.parse(queryDecor));
          } catch {
            initialDecor = undefined;
          }
        }

        if (!initialDecor) {
          try {
            const storedDecor = sessionStorage.getItem("valentino:initial-decor");
            if (storedDecor) {
              initialDecor = normalizeValentineDecor(JSON.parse(storedDecor));
            }
          } catch {
            initialDecor = undefined;
          }
        }

        const res = await fetch("/api/experiences", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(initialDecor ? { initialDecor } : {}),
        });

        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error || "Failed to initialize experience");
        }

        const { publicId } = await res.json();

        try {
          sessionStorage.removeItem("valentino:initial-decor");
        } catch {
          // Ignore storage cleanup failures.
        }

        if (isMounted) {
          router.replace(`/edit/${publicId}`);
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err.message || "An unexpected error occurred");
        }
      }
    }

    initExperience();

    return () => {
      isMounted = false;
    };
  }, [router]);

  return (
    <main className="flex min-h-[100dvh] flex-col items-center justify-center p-6 text-center bg-[#0B0B12] text-slate-100">
      <div className="max-w-sm w-full space-y-6 p-8 rounded-2xl bg-white/[0.03] border border-white/10 shadow-2xl backdrop-blur-sm">
        {error ? (
          <div className="space-y-4">
            <div className="text-3xl text-rose-500">⚠️</div>
            <h2 className="text-lg font-medium text-white">Something went wrong</h2>
            <p className="text-xs text-rose-300">{error}</p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="px-4 py-2 text-xs font-medium rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="inline-block animate-pulse text-4xl">💌</div>
            <h2 className="text-lg font-serif font-medium text-white">
              Preparing your Valentine canvas...
            </h2>
            <p className="text-xs text-white/50">Setting up a private space</p>
          </div>
        )}
      </div>
    </main>
  );
}
