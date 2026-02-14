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
      className=" w-full
    h-[300px] sm:h-[350px] md:h-[400px]
    bg-[var(--card-bg)] 
    rounded-[var(--radius)] 
    border border-[var(--card-border)]
    transition-all duration-300
    transform hover:scale-105
    hover:border-[var(--card-hover)]
    hover:shadow-[0_0_30px_var(--card-hover)]
    p-4 sm:p-6 
    flex flex-col 
    shadow-lg"
    >
      <div className="flex-1">
        <table className="w-full h-full border-collapse">
          <thead>
            <tr className="border-b border-border text-muted-foreground text-s font-semibold tracking-wider uppercase">
              {/* Allocate 50% width to the labels to prevent wrapping */}
              <th className="text-left pb-4 font-bold w-1/2">Key Metrics</th>
              {/* <th className="text-left pb-4 font-bold w-1/2">Key Metrics</th> */}
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
                  {/* whitespace-nowrap ensures text stays on one line */}
                  <td className="py-4 text-sm md:text-base font-medium text-muted-foreground group-hover:text-foreground whitespace-nowrap">
                    {label}
                  </td>
                  <td className="text-right py-4 px-2 tabular-nums text-sm md:text-base font-semibold">
                    {format(ivv)}
                  </td>
                  <td
                    className="text-right py-4 px-2 tabular-nums text-base md:text-lg font-bold"
                    style={{ color: GOLD }}
                  >
                    {format(spi)}
                  </td>
                  <td
                    className={`text-right py-4 pl-2 tabular-nums text-sm md:text-base font-bold ${edgeClass(
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
