import { METRICS_TABLE_ROWS } from '@/constants/metricsTable';
import React from 'react';

const GOLD = '#FFD700';

const edgeClass = (value: number) => (value >= 0 ? 'text-green-500' : 'text-red-500');

const formatPercent = (value: number, precision = 2) => `${(value * 100).toFixed(precision)}%`;
const formatNumber = (value: number, precision = 2) => value.toFixed(precision);

interface MetricsTableProps {
  className?: string;
}

const MetricsTable: React.FC<MetricsTableProps> = ({ className }) => {
  const rows = METRICS_TABLE_ROWS;

  return (
    <div
      className={`w-full min-h-[280px] sm:min-h-[340px] md:min-h-[400px]
    bg-[var(--card-bg)]
    rounded-[var(--radius)]
    border border-[var(--card-border)]
    transition-all duration-300
    hover:border-[var(--accent)]/70
    hover:shadow-[0_10px_28px_rgba(0,0,0,0.22)]
    p-4 sm:p-6
    flex flex-col
    shadow-lg ${className ?? ''}`}
    >
      {/* Mobile layout */}
      <div className="md:hidden space-y-3">
        {rows.map(({ label, ivv, spi, isPercent, precision }) => {
          const edge = spi - ivv;
          const format = (val: number) =>
            isPercent ? formatPercent(val, precision) : formatNumber(val, precision);

          return (
            <div
              key={label}
              className="rounded-lg border border-[var(--card-border)] bg-black/10 px-3 py-3"
            >
              <p className="text-sm font-semibold text-[var(--foreground)] mb-2">{label}</p>
              <div className="grid grid-cols-3 gap-2 text-xs tabular-nums">
                <div>
                  <p className="text-[var(--muted-text)] uppercase tracking-wide mb-1">BEN</p>
                  <p className="font-semibold text-[var(--foreground)]">{format(ivv)}</p>
                </div>
                <div>
                  <p className="text-[var(--muted-text)] uppercase tracking-wide mb-1">SPI</p>
                  <p className="font-bold" style={{ color: GOLD }}>
                    {format(spi)}
                  </p>
                </div>
                <div>
                  <p className="text-[var(--muted-text)] uppercase tracking-wide mb-1">Edge</p>
                  <p className={`font-semibold ${edgeClass(edge)}`}>
                    {edge > 0 && isPercent ? '+' : ''}
                    {format(edge)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop / tablet layout */}
      <div className="hidden md:block flex-1 overflow-x-auto">
        <table className="w-full min-w-[560px] h-full border-collapse">
          <thead>
            <tr className="border-b border-border text-muted-foreground text-xs font-semibold tracking-wider uppercase">
              <th className="text-left pb-4 font-bold w-1/2">Key Metrics</th>
              <th className="text-right pb-4 px-2">BEN</th>
              <th className="text-right pb-4 px-2">SPI</th>
              <th className="text-right pb-4 pl-2">Edge</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-border/50">
            {rows.map(({ label, ivv, spi, isPercent, precision }) => {
              const edge = spi - ivv;
              const format = (val: number) =>
                isPercent ? formatPercent(val, precision) : formatNumber(val, precision);

              return (
                <tr key={label} className="group hover:bg-muted/30 transition-colors">
                  <td className="py-4 text-sm lg:text-base font-medium text-muted-foreground group-hover:text-foreground whitespace-nowrap">
                    {label}
                  </td>
                  <td className="text-right py-4 px-2 tabular-nums text-sm lg:text-base font-semibold">
                    {format(ivv)}
                  </td>
                  <td
                    className="text-right py-4 px-2 tabular-nums text-base lg:text-lg font-bold"
                    style={{ color: GOLD }}
                  >
                    {format(spi)}
                  </td>
                  <td
                    className={`text-right py-4 pl-2 tabular-nums text-sm lg:text-base font-bold ${edgeClass(
                      edge,
                    )}`}
                  >
                    {edge > 0 && isPercent ? '+' : ''}
                    {format(edge)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MetricsTable;
