import Link from "next/link";
import { ValentinoMonogram } from "@/components/motion/ValentinoMonogram";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main
      className="relative min-h-[100dvh] flex flex-col items-center justify-center p-6 text-center bg-[#0A090C] text-[#FAF8F5] overflow-hidden font-ui"
      data-testid="not-found-page"
    >
      {/* Subtle ambient lighting */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#131118]/60 via-[#0A090C] to-[#0A090C] pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[480px] h-[480px] rounded-full bg-white/[0.02] blur-3xl pointer-events-none" />

      <div className="max-w-md w-full p-8 sm:p-10 rounded-3xl bg-[#131118] border border-white/[0.12] shadow-2xl shadow-black/90 backdrop-blur-xl relative z-10 space-y-6">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-white/[0.04] border border-white/[0.1] flex items-center justify-center shadow-lg">
          <ValentinoMonogram size={32} className="text-rose-300" />
        </div>

        <div className="space-y-2">
          <span className="text-[10px] uppercase font-mono tracking-widest text-rose-300/80 px-2.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/20">
            404 · Page Not Found
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-medium text-white tracking-tight">
            Lost in Starlight
          </h1>
          <p className="text-xs sm:text-sm text-[#FAF8F5]/70 font-light leading-relaxed">
            The page or Valentine experience you are looking for doesn&apos;t exist, has been removed, or has reached its expiration date.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link href="/" className="w-full sm:w-auto">
            <Button variant="primary" size="md" className="w-full text-xs rounded-full px-5">
              Return Home
            </Button>
          </Link>
          <Link href="/templates" className="w-full sm:w-auto">
            <Button variant="outline" size="md" className="w-full text-xs rounded-full px-5 border-white/15">
              Explore Templates
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
