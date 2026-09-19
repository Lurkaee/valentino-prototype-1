export default function NotFound() {
  return (
    <main
      data-testid="not-found-container"
      className="flex min-h-[100dvh] flex-col items-center justify-center p-6 text-center bg-[#0B0B12] text-slate-100"
    >
      <div className="max-w-md w-full p-8 rounded-2xl bg-white/[0.03] border border-white/10 shadow-2xl backdrop-blur-sm">
        <div className="text-4xl mb-4">🔍</div>
        <h1 className="text-xl font-serif font-medium text-white mb-2">
          Valentine Not Found
        </h1>
        <p className="text-sm text-slate-400 mb-6 leading-relaxed">
          This link may be invalid, or the experience has not been published yet.
        </p>
        <a
          href="/create"
          className="inline-block px-5 py-2.5 text-xs font-medium uppercase tracking-wider rounded-xl bg-rose-600 hover:bg-rose-500 text-white transition-colors shadow-lg shadow-rose-950/40"
        >
          Create Your Own Valentine
        </a>
      </div>
    </main>
  );
}
