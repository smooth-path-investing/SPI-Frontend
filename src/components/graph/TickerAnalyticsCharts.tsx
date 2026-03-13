import React from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type {
  CumulativeReturnComparisonPoint,
  IndicatorNormalizedPoint,
  IndicatorWeightPoint,
  TickerIndicatorMeta,
} from '@/features/stocks';
import {
  ChartTooltipShell,
  formatChartLongDate,
  formatChartShortDate,
} from '@/features/stocks';
import { INDICATOR_LINE_COLORS } from '@/constants/chartColors';

interface BaseTooltipEntry {
  color?: string;
  dataKey?: string;
  name?: string;
  value?: number;
}

interface BaseTooltipProps {
  active?: boolean;
  payload?: BaseTooltipEntry[];
  label?: string;
}

interface CumulativeReturnsChartProps {
  data: CumulativeReturnComparisonPoint[];
  className?: string;
}

interface IndicatorWeightsChartProps {
  data: IndicatorWeightPoint[];
  className?: string;
}

interface NormalizedIndicatorChartProps {
  data: IndicatorNormalizedPoint[];
  indicators: TickerIndicatorMeta[];
  className?: string;
}

const EmptyTooltip: React.FC = () => null;

const CumulativeTooltip: React.FC<BaseTooltipProps> = ({ active, payload, label }) => {
  if (!active || !payload?.length || !label) {
    return null;
  }

  return (
    <ChartTooltipShell>
      <p className="mb-2 text-[10px] uppercase tracking-[0.1em] text-[var(--muted-text)]">
        {formatChartLongDate(label)}
      </p>
      <div className="space-y-1.5">
        {payload.map((entry) => (
          <div key={entry.dataKey} className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: entry.color ?? '#FFFFFF' }}
              />
              <span className="text-xs text-[var(--muted-text)]">{entry.name}</span>
            </div>
            <span className="text-sm font-semibold tabular-nums text-[var(--foreground)]">
              {(entry.value ?? 0) >= 0 ? '+' : ''}
              {(entry.value ?? 0).toFixed(2)}%
            </span>
          </div>
        ))}
      </div>
    </ChartTooltipShell>
  );
};

const NormalizedTooltip: React.FC<
  BaseTooltipProps & { indicators: TickerIndicatorMeta[] }
> = ({ active, payload, label, indicators }) => {
  if (!active || !payload?.length || !label) {
    return null;
  }

  const sortedEntries = indicators
    .map((indicator) => {
      const matchingPayload = payload.find((entry) => entry.dataKey === indicator.key);
      return {
        color: matchingPayload?.color ?? '#FFFFFF',
        label: indicator.label,
        value: matchingPayload?.value ?? 0,
      };
    })
    .filter((entry) => typeof entry.value === 'number');

  return (
    <ChartTooltipShell>
      <p className="mb-2 text-[10px] uppercase tracking-[0.1em] text-[var(--muted-text)]">
        {formatChartLongDate(label)}
      </p>
      <div className="space-y-1.5">
        {sortedEntries.map((entry) => (
          <div key={entry.label} className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-xs text-[var(--muted-text)]">{entry.label}</span>
            </div>
            <span className="text-sm font-semibold tabular-nums text-[var(--foreground)]">
              {entry.value.toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </ChartTooltipShell>
  );
};

export const CumulativeReturnsChart: React.FC<CumulativeReturnsChartProps> = ({
  data,
  className = '',
}) => {
  if (data.length === 0) {
    return null;
  }

  const values = data.flatMap((row) => [row.stockCum, row.ivvCum]);
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  const padding = Math.max((maxValue - minValue) * 0.16, 1.5);

  return (
    <div className={`h-[280px] sm:h-[320px] w-full ${className}`}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 18, right: 14, left: -8, bottom: 6 }}>
          <CartesianGrid
            vertical={false}
            stroke="rgba(255,255,255,0.08)"
            strokeDasharray="3 6"
          />
          <XAxis
            dataKey="date"
            tickFormatter={formatChartShortDate}
            minTickGap={30}
            tick={{ fill: '#FFFFFF', fontSize: 11 }}
            axisLine={{ stroke: '#FFFFFF', strokeOpacity: 0.45 }}
            tickLine={false}
          />
          <YAxis
            tickFormatter={(value: number) => `${value.toFixed(0)}%`}
            tick={{ fill: '#FFFFFF', fontSize: 11 }}
            axisLine={{ stroke: '#FFFFFF', strokeOpacity: 0.45 }}
            tickLine={false}
            width={64}
            domain={[minValue - padding, maxValue + padding]}
            tickCount={5}
          />
          <Tooltip
            cursor={{ stroke: 'rgba(250,204,21,0.18)', strokeDasharray: '4 8' }}
            content={<CumulativeTooltip />}
          />
          <ReferenceLine
            y={0}
            stroke="rgba(255,255,255,0.2)"
            strokeDasharray="5 5"
            ifOverflow="extendDomain"
          />
          <Line
            type="monotoneX"
            dataKey="stockCum"
            name="Stock"
            stroke="#FFFFFF"
            strokeWidth={2.8}
            dot={false}
            activeDot={{ r: 4.5, fill: 'var(--background)', stroke: '#FFFFFF', strokeWidth: 2 }}
            isAnimationActive={false}
          />
          <Line
            type="monotoneX"
            dataKey="ivvCum"
            name="IVV"
            stroke="var(--accent)"
            strokeWidth={2.4}
            dot={false}
            activeDot={{
              r: 4.5,
              fill: 'var(--background)',
              stroke: 'var(--accent)',
              strokeWidth: 2,
            }}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export const IndicatorWeightsChart: React.FC<IndicatorWeightsChartProps> = ({
  data,
  className = '',
}) => {
  if (data.length === 0) {
    return null;
  }

  return (
    <div
      className={`relative h-[280px] sm:h-[320px] w-full after:pointer-events-none after:absolute after:left-0 after:right-0 after:bottom-8 sm:after:bottom-9 after:h-px after:bg-white/45 after:content-[''] ${className}`}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 12, right: 16, left: -8, bottom: 6 }}
          barCategoryGap={16}
        >
          <CartesianGrid
            horizontal={false}
            stroke="rgba(255,255,255,0.08)"
            strokeDasharray="3 6"
          />
          <XAxis
            type="number"
            tickFormatter={(value: number) => `${value.toFixed(0)}%`}
            tick={{ fill: '#FFFFFF', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            domain={[0, 100]}
            tickCount={5}
          />
          <YAxis
            type="category"
            dataKey="key"
            tick={false}
            axisLine={{ stroke: '#FFFFFF', strokeOpacity: 0.45 }}
            tickLine={false}
            width={64}
          />
          <Tooltip
            cursor={{ fill: 'rgba(250,204,21,0.08)' }}
            content={<EmptyTooltip />}
          />
          <Bar dataKey="weight" fill="var(--accent)" radius={[0, 8, 8, 0]} barSize={26}>
            <LabelList
              dataKey="weight"
              position="insideRight"
              formatter={(value: number) => `${value.toFixed(0)}%`}
              style={{ fill: '#0B0F19', fontSize: 11, fontWeight: 700 }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div
        className="pointer-events-none absolute right-0 top-3 bottom-8 sm:bottom-9 w-[140px] sm:w-[190px]"
      >
        <div
          className="grid h-full min-w-0"
          style={{ gridTemplateRows: `repeat(${data.length}, minmax(0, 1fr))` }}
        >
          {data.map((item) => (
            <div
              key={item.key}
              className="flex items-center text-xs leading-tight text-white sm:text-sm"
            >
              {item.indicator}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const NormalizedIndicatorChart: React.FC<NormalizedIndicatorChartProps> = ({
  data,
  indicators,
  className = '',
}) => {
  if (data.length === 0 || indicators.length === 0) {
    return null;
  }

  const values = data.flatMap((row) =>
    indicators.map((indicator) => Number(row[indicator.key] ?? 100)),
  );
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  const padding = Math.max((maxValue - minValue) * 0.16, 2.5);

  return (
    <div className={`h-[280px] sm:h-[320px] w-full ${className}`}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 18, right: 14, left: -8, bottom: 6 }}>
          <CartesianGrid
            vertical={false}
            stroke="rgba(255,255,255,0.08)"
            strokeDasharray="3 6"
          />
          <XAxis
            dataKey="date"
            tickFormatter={formatChartShortDate}
            minTickGap={30}
            tick={{ fill: '#FFFFFF', fontSize: 11 }}
            axisLine={{ stroke: '#FFFFFF', strokeOpacity: 0.45 }}
            tickLine={false}
          />
          <YAxis
            tickFormatter={(value: number) => value.toFixed(0)}
            tick={{ fill: '#FFFFFF', fontSize: 11 }}
            axisLine={{ stroke: '#FFFFFF', strokeOpacity: 0.45 }}
            tickLine={false}
            width={64}
            domain={[minValue - padding, maxValue + padding]}
            tickCount={5}
          />
          <Tooltip
            cursor={{ stroke: 'rgba(250,204,21,0.18)', strokeDasharray: '4 8' }}
            content={<NormalizedTooltip indicators={indicators} />}
          />
          <ReferenceLine
            y={100}
            stroke="rgba(255,255,255,0.2)"
            strokeDasharray="5 5"
            ifOverflow="extendDomain"
          />
          {indicators.map((indicator, index) => (
            <Line
              key={indicator.key}
              type="monotoneX"
              dataKey={indicator.key}
              name={indicator.label}
              stroke={INDICATOR_LINE_COLORS[index % INDICATOR_LINE_COLORS.length]}
              strokeWidth={index === 0 ? 2.8 : 2.4}
              dot={false}
              activeDot={{
                r: 4.5,
                fill: 'var(--background)',
                stroke: INDICATOR_LINE_COLORS[index % INDICATOR_LINE_COLORS.length],
                strokeWidth: 2,
              }}
              isAnimationActive={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
