import React from 'react';
import type { TooltipProps } from '../../types';

const CustomTooltip: React.FC<TooltipProps> = ({ active, payload }) => {
  if (!active || !payload?.length) return null;

  const { day, spiCum, ivvCum, spiVal, ivvVal } = payload[0].payload;

  const getValueColor = (v: number) => (v >= 0 ? 'text-green-500' : 'text-red-500');

  return (
    <div className="bg-black/95 backdrop-blur-md border border-white/10 rounded-xl p-4 shadow-2xl min-w-[240px]">
      {/* Date Header */}
      <div className="flex justify-between items-center border-b border-white/10 pb-2 mb-4">
        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Snapshot</p>
        <p className="text-xs font-bold text-zinc-200">{day}</p>
      </div>

      <div className="space-y-5">
        {/* Portfolio / SPI Section */}
        <section className="relative">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1.5 h-4 rounded-full bg-[#FFD700]" />
            <p className="text-[11px] font-bold uppercase tracking-wide text-zinc-300">
              Portfolio (SPI)
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 items-end">
            <div>
              <p className="text-[10px] text-zinc-500 uppercase font-medium mb-0.5">Investment</p>
              <p className="text-lg font-bold text-white tabular-nums leading-none">
                $
                {spiVal.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-zinc-500 uppercase font-medium mb-0.5">Return</p>
              <p className={`text-sm font-bold tabular-nums leading-none ${getValueColor(spiCum)}`}>
                {spiCum >= 0 ? '▲' : '▼'} {Math.abs(spiCum).toFixed(2)}%
              </p>
            </div>
          </div>
        </section>

        {/* S&P 500 Section */}
        <section className="relative">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1.5 h-4 rounded-full bg-zinc-600" />
            <p className="text-[11px] font-bold uppercase tracking-wide text-zinc-300">
              S&P 500 (BEN)
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 items-end">
            <div>
              <p className="text-[10px] text-zinc-500 uppercase font-medium mb-0.5">Investment</p>
              <p className="text-lg font-bold text-zinc-100 tabular-nums leading-none">
                $
                {ivvVal.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-zinc-500 uppercase font-medium mb-0.5">Return</p>
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
