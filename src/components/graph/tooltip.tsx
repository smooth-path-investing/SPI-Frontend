// src/components/graph/tooltip.tsx
import React, { useEffect, useState } from 'react';
import type { TooltipProps } from '../../types';

const CustomTooltip: React.FC<TooltipProps> = ({ active, payload }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  if (!active || !payload?.length) return null;

  const { day, spiCum, ivvCum, spiVal, ivvVal } = payload[0].payload;
  const getValueColor = (v: number) => (v >= 0 ? 'text-green-500' : 'text-red-500');

  if (isMobile) {
    return (
      <div className="bg-[var(--card-bg)]/95 backdrop-blur-md border border-[var(--card-border)] rounded-[var(--radius)] p-3 shadow-lg min-w-[180px]">
        <div className="flex justify-between items-center mb-2">
          <p className="text-[10px] font-bold text-[var(--muted-text)] uppercase">Snapshot</p>
          <p className="text-xs font-bold text-[var(--foreground)]">{day}</p>
        </div>
        <div className="flex justify-between text-[11px] font-medium">
          <span className="text-[var(--accent)]">SPI: ${spiVal.toLocaleString()}</span>
          <span className={getValueColor(spiCum)}>
            {spiCum >= 0 ? '▲' : '▼'} {Math.abs(spiCum).toFixed(2)}%
          </span>
        </div>
      </div>
    );
  }

  // Desktop tooltip
  return (
    <div className="bg-[var(--card-bg)]/95 backdrop-blur-md rounded-[var(--radius)] p-4 shadow-2xl min-w-[240px]">
      {/* Date Header */}
      <div className="flex justify-between items-center pb-2 mb-4">
        <p className="text-[10px] font-black uppercase tracking-widest text-[var(--muted-text)]">
          Snapshot
        </p>
        <p className="text-xs font-bold text-[var(--foreground)]">{day}</p>
      </div>

      <div className="space-y-5">
        {/* SPI Section */}
        <section className="relative">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1.5 h-4 rounded-full bg-[var(--accent)]" />
            <p className="text-[11px] font-bold uppercase tracking-wide text-[var(--muted-text)]">
              SPI
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 items-end">
            <div>
              <p className="text-[10px] text-[var(--muted-text)] uppercase font-medium mb-0.5">
                Investment
              </p>
              <p className="text-lg font-bold text-[var(--foreground)] tabular-nums leading-none">
                $
                {spiVal.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-[var(--muted-text)] uppercase font-medium mb-0.5">
                Return
              </p>
              <p className={`text-sm font-bold tabular-nums leading-none ${getValueColor(spiCum)}`}>
                {spiCum >= 0 ? '▲' : '▼'} {Math.abs(spiCum).toFixed(2)}%
              </p>
            </div>
          </div>
        </section>

        {/* Benchmark / S&P 500 Section */}
        <section className="relative">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1.5 h-4 rounded-full bg-[var(--muted-text)]" />
            <p className="text-[11px] font-bold uppercase tracking-wide text-[var(--muted-text)]">
              BEN
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 items-end">
            <div>
              <p className="text-[10px] text-[var(--muted-text)] uppercase font-medium mb-0.5">
                Investment
              </p>
              <p className="text-lg font-bold text-[var(--foreground)] tabular-nums leading-none">
                $
                {ivvVal.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-[var(--muted-text)] uppercase font-medium mb-0.5">
                Return
              </p>
              <p className={`text-sm font-bold tabular-nums leading-none ${getValueColor(ivvCum)}`}>
                {ivvCum >= 0 ? '▲' : '▼'} {Math.abs(ivvCum).toFixed(2)}%
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CustomTooltip;
