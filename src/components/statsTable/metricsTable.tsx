import { derivedMetrics, performanceMetrics } from '@/constants/mertics';
import React from 'react';

const GOLD = '#FFD700';

const edgeClass = (value: number) => (value >= 0 ? 'text-green-500' : 'text-red-500');

const formatPercent = (value: number, precision = 2) => `${(value * 100).toFixed(precision)}%`;
const formatNumber = (value: number, precision = 2) => value.toFixed(precision);

interface MetricsTableProps {
  className?: string;
}

const MetricsTable: React.FC<MetricsTableProps> = ({ className }) => {
  const rows = [
    {
      label: 'Return p.a.',
      ivv: derivedMetrics.ivv.annualizedReturn,
      spi: derivedMetrics.spi.annualizedReturn,
      isPercent: true,
      precision: 0,
    },
    {
      label: 'Sharpe Ratio',
      ivv: performanceMetrics.ivv.sharpe,
      spi: performanceMetrics.spi.sharpe,
      precision: 2,
    },
    {
      label: 'Max Drawdown',
      ivv: performanceMetrics.ivv.maxDrawdown,
      spi: performanceMetrics.spi.maxDrawdown,
      isPercent: true,
      precision: 0,
    },
    {
      label: 'Gain/Loss Ratio',
      ivv: derivedMetrics.ivv.gainLossRatio,
      spi: derivedMetrics.spi.gainLossRatio,
      precision: 2,
    },
  ];

  return (
    <div
      className={`h-[400px] w-full bg-card rounded-xl border border-border p-6 flex flex-col shadow-lg ${className}`}
    >
      <div className="flex-1">
        {/* Removed table-fixed to allow natural content width */}
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
