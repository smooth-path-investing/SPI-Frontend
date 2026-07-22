import { useState } from 'react';
import { RUNTIME_CONFIG, buildApiUrl } from '@/lib/runtimeConfig';

const SUGGESTIONS = ['GE', 'AAPL', 'TSLA', 'GE IBM APA COP WY'];

export default function StockMechanicPanel() {
  const [ticker, setTicker] = useState('');
  const [launchedTicker, setLaunchedTicker] = useState<string | null>(null);

  const launch = (val: string) => {
    const t = val.trim().toUpperCase();
    if (!t) return;
    setLaunchedTicker(t);
  };

  if (launchedTicker) {
    const src = buildApiUrl(
      `/api/stockmechanic?input=${encodeURIComponent(launchedTicker)}&autorun=1`,
      RUNTIME_CONFIG.stockAssetsApiBaseUrl,
    );
    return (
      <div className="flex h-full flex-col">
        <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
          <button
            className="rounded-full border border-white/15 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-[var(--muted-text)] hover:text-[var(--foreground)]"
            onClick={() => setLaunchedTicker(null)}
          >
            ← Back
          </button>
          <span className="text-sm font-medium text-[var(--foreground)]">
            Stock Mechanic — {launchedTicker}
          </span>
        </div>
        <iframe src={src} className="w-full flex-1 border-0 bg-black" title="Stock Mechanic" />
      </div>
    );
  }

  return (
    <div className="flex h-full items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        <h2 className="text-xl font-semibold text-[var(--foreground)]">Stock Mechanic</h2>
        <p className="mt-2 text-sm text-[var(--muted-text)]">
          Portfolio builder, stock performance, financials, risk metrics and quarterly returns.
        </p>

        <div className="mt-6 text-left">
          <label className="text-xs uppercase tracking-[0.12em] text-[var(--muted-text)]">
            Single Stock
          </label>
          <div className="mt-2 flex gap-2">
            <input
              className="flex-1 rounded-lg border border-white/15 bg-white/[0.04] px-3 py-2 text-sm text-[var(--foreground)] placeholder:text-[var(--muted-text)]/60 focus:border-[var(--accent)]/50 focus:outline-none"
              placeholder="GE"
              maxLength={8}
              value={ticker}
              onChange={(e) => setTicker(e.target.value.toUpperCase())}
              onKeyDown={(e) => e.key === 'Enter' && launch(ticker)}
            />
            <button
              className="rounded-lg border border-[var(--accent)] bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-black hover:bg-yellow-300"
              onClick={() => launch(ticker || 'GE')}
            >
              Open
            </button>
          </div>
          <span className="mt-1 block text-xs text-[var(--muted-text)]/70">e.g. GE</span>
        </div>

        <div className="my-5 text-xs uppercase tracking-[0.12em] text-[var(--muted-text)]/60">or</div>

        <div className="text-left">
          <label className="text-xs uppercase tracking-[0.12em] text-[var(--muted-text)]">Portfolio</label>
          <div className="mt-2 flex gap-2">
            <input
              className="flex-1 rounded-lg border border-white/15 bg-white/[0.04] px-3 py-2 text-sm text-[var(--foreground)] placeholder:text-[var(--muted-text)]/60 focus:border-[var(--accent)]/50 focus:outline-none"
              placeholder="GE IBM APA COP WY"
              value={ticker}
              onChange={(e) => setTicker(e.target.value.toUpperCase())}
              onKeyDown={(e) => e.key === 'Enter' && launch(ticker)}
            />
            <button
              className="rounded-lg border border-[var(--accent)] bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-black hover:bg-yellow-300"
              onClick={() => launch(ticker || 'GE IBM APA COP WY')}
            >
              Open
            </button>
          </div>
          <span className="mt-1 block text-xs text-[var(--muted-text)]/70">e.g. GE IBM APA COP WY</span>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              className="rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-[var(--muted-text)] transition-colors hover:border-[var(--accent)]/40 hover:text-[var(--foreground)]"
              onClick={() => launch(s)}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
