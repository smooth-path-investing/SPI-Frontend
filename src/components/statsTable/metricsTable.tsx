import React from 'react';
import { CircleHelp } from 'lucide-react';
import { METRICS_TABLE_ROWS, type MetricDirection } from '@/constants/metricsTable';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const GOLD = '#FFD700';

const formatPercent = (value: number, precision = 2) => `${(value * 100).toFixed(precision)}%`;
const formatNumber = (value: number, precision = 2) => value.toFixed(precision);

const edgeClass = (value: number, direction: MetricDirection) => {
  const directionalEdge = direction === 'higher' ? value : -value;
  return directionalEdge >= 0 ? 'text-green-500' : 'text-red-500';
};

const directionCopy = (direction: MetricDirection) =>
  direction === 'higher' ? 'Higher is better' : 'Lower is better';

interface MetricsTableProps {
  className?: string;
}

interface MetricValueBlockProps {
  label: string;
  value: string;
  valueClassName?: string;
}

const MetricValueBlock: React.FC<MetricValueBlockProps> = ({ label, value, valueClassName = '' }) => {
  return (
    <div className="rounded-md border border-[var(--card-border)]/80 bg-black/15 px-2.5 py-2">
      <p className="text-[10px] text-[var(--muted-text)] uppercase tracking-[0.1em] mb-1">{label}</p>
      <p className={`text-sm font-semibold tabular-nums ${valueClassName}`}>{value}</p>
    </div>
  );
};

interface MetricTooltipProps {
  label: string;
  description: string;
  direction: MetricDirection;
}

const MetricTooltip: React.FC<MetricTooltipProps> = ({ label, description, direction }) => {
  return (
    <Tooltip delayDuration={140}>
      <TooltipTrigger asChild>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 text-left text-[var(--foreground)] hover:text-[var(--accent)] transition-colors"
        >
          <span>{label}</span>
          <CircleHelp className="w-3.5 h-3.5 flex-shrink-0" />
        </button>
      </TooltipTrigger>
      <TooltipContent className="max-w-xs border border-[var(--card-border)] bg-[var(--card-bg)] text-[var(--foreground)]">
        <p className="text-sm leading-relaxed">{description}</p>
        <p className="mt-2 text-xs uppercase tracking-[0.1em] text-[var(--accent)]">
          {directionCopy(direction)}
        </p>
      </TooltipContent>
    </Tooltip>
  );
};

const MetricsTable: React.FC<MetricsTableProps> = ({ className }) => {
  const rows = METRICS_TABLE_ROWS;

  return (
    <TooltipProvider delayDuration={140} skipDelayDuration={90}>
      <div
        className={`w-full min-h-0 md:min-h-[400px]
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
        <div className="md:hidden space-y-2.5">
          {rows.map(({ label, ivv, spi, isPercent, precision, tooltip, direction }) => {
            const edge = spi - ivv;
            const format = (value: number) =>
              isPercent ? formatPercent(value, precision) : formatNumber(value, precision);
            const edgeValue = `${edge > 0 ? '+' : ''}${format(edge)}`;

            return (
              <article
                key={label}
                className="rounded-lg border border-[var(--card-border)] bg-black/10 px-3 py-3.5"
              >
                <div className="mb-3">
                  <div className="text-sm font-semibold leading-tight">
                    <MetricTooltip label={label} description={tooltip} direction={direction} />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <MetricValueBlock
                    label="BEN"
                    value={format(ivv)}
                    valueClassName="text-[var(--foreground)]"
                  />
                  <MetricValueBlock
                    label="SPI"
                    value={format(spi)}
                    valueClassName="font-bold text-[var(--accent)]"
                  />
                  <MetricValueBlock label="Edge" value={edgeValue} valueClassName={edgeClass(edge, direction)} />
                </div>
              </article>
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
              {rows.map(({ label, ivv, spi, isPercent, precision, tooltip, direction }) => {
                const edge = spi - ivv;
                const format = (value: number) =>
                  isPercent ? formatPercent(value, precision) : formatNumber(value, precision);
                const edgeValue = `${edge > 0 ? '+' : ''}${format(edge)}`;

                return (
                  <tr key={label} className="group hover:bg-muted/30 transition-colors">
                    <td className="py-4 text-sm lg:text-base font-medium text-muted-foreground group-hover:text-foreground whitespace-nowrap">
                      <MetricTooltip label={label} description={tooltip} direction={direction} />
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
                        direction,
                      )}`}
                    >
                      {edgeValue}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default MetricsTable;
