import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-[100dvh] flex-col items-center justify-center p-6 text-center bg-[#0B0B12] text-slate-100">
      <div className="max-w-md w-full space-y-8 p-8 rounded-2xl bg-white/[0.03] border border-white/10 shadow-2xl backdrop-blur-sm">
        <div className="space-y-3">
          <div className="inline-block text-4xl mb-2">💌</div>
          <h1 className="text-3xl sm:text-4xl font-serif font-medium tracking-wide text-white">
            Valentino
          </h1>
          <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
            Create an intimate, personal digital Valentine experience for someone you love.
          </p>
        </div>

        <div className="pt-4">
          <Link
            href="/create"
            className="inline-flex w-full items-center justify-center px-6 py-3.5 text-base font-medium rounded-xl text-white bg-rose-600 hover:bg-rose-500 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-rose-900/40"
          >
            Create Your Valentine
          </Link>
        </div>

        <p className="text-xs text-white/40">
          No sign-up required. Your partner only sees the finished experience.
        </p>
      </div>
    </main>
  );
}
