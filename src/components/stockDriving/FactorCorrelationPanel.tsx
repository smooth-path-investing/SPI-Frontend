import { useState } from 'react';
import { RUNTIME_CONFIG, buildApiUrl } from '@/lib/runtimeConfig';

export default function FactorCorrelationPanel() {
  const [ticker, setTicker] = useState('AAPL');
  const [activeTicker, setActiveTicker] = useState('AAPL');

  const src = buildApiUrl(`/api/factorapp/${activeTicker}`, RUNTIME_CONFIG.stockAssetsApiBaseUrl);

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <input
          className="w-32 rounded-lg border border-white/15 bg-white/[0.04] px-3 py-1.5 text-sm text-[var(--foreground)] placeholder:text-[var(--muted-text)]/60 focus:border-[var(--accent)]/50 focus:outline-none"
          placeholder="AAPL"
          maxLength={8}
          value={ticker}
          onChange={(e) => setTicker(e.target.value.toUpperCase())}
          onKeyDown={(e) => e.key === 'Enter' && setActiveTicker(ticker.trim().toUpperCase() || 'AAPL')}
        />
        <button
          className="rounded-lg border border-[var(--accent)] bg-[var(--accent)] px-3.5 py-1.5 text-xs font-semibold text-black hover:bg-yellow-300"
          onClick={() => setActiveTicker(ticker.trim().toUpperCase() || 'AAPL')}
        >
          Open
        </button>
      </div>
      <iframe src={src} className="w-full flex-1 border-0 bg-black" title="Factor Correlation" />
    </div>
  );
}
