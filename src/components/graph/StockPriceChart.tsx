import React from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import type { StockPricePoint } from '@/constants/stockData';

interface StockPriceChartProps {
  data: StockPricePoint[];
  ticker?: string;
  className?: string;
}

interface StockChartTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    payload: StockPricePoint;
  }>;
  label?: string;
}

const formatShortDate = (date: string) =>
  new Date(`${date}T00:00:00Z`).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  });

const formatLongDate = (date: string) =>
  new Date(`${date}T00:00:00Z`).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });

const StockChartTooltip: React.FC<StockChartTooltipProps> = ({ active, payload, label }) => {
  if (!active || !payload?.length || !label) return null;

  return (
    <div className="bg-[var(--card-bg)]/95 backdrop-blur-md border border-[var(--card-border)] rounded-[var(--radius)] px-3 py-2 shadow-lg">
      <p className="text-[10px] uppercase tracking-[0.1em] text-[var(--muted-text)] mb-1">
        {formatLongDate(label)}
      </p>
      <p className="text-sm font-semibold text-[var(--foreground)] tabular-nums">
        ${payload[0].value.toFixed(2)}
      </p>
    </div>
  );
};

export const StockPriceChart: React.FC<StockPriceChartProps> = ({ data, ticker = 'stock', className = '' }) => {
  const prices = data.map((row) => row.close);
  const minValue = Math.min(...prices);
  const maxValue = Math.max(...prices);
  const padding = Math.max((maxValue - minValue) * 0.12, 1);

  const lowerBound = Number((minValue - padding).toFixed(2));
  const upperBound = Number((maxValue + padding).toFixed(2));
  const gradientId = `${ticker.toLowerCase()}-price-gradient`;

  return (
    <div className={`h-96 w-full ${className}`}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 12,
            right: 12,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.35} />
              <stop offset="95%" stopColor="var(--accent)" stopOpacity={0.04} />
            </linearGradient>
          </defs>

          <CartesianGrid stroke="var(--card-border)" strokeDasharray="3 3" opacity={0.35} />

          <XAxis
            dataKey="date"
            tickFormatter={formatShortDate}
            minTickGap={32}
            tick={{ fill: '#FFFFFF', fontSize: 11 }}
            axisLine={{ stroke: '#FFFFFF' }}
            tickLine={{ stroke: '#FFFFFF' }}
          />

          <YAxis
            tickFormatter={(value: number) => `$${value.toFixed(0)}`}
            tick={{ fill: '#FFFFFF', fontSize: 11 }}
            axisLine={{ stroke: '#FFFFFF' }}
            tickLine={{ stroke: '#FFFFFF' }}
            width={50}
            domain={[lowerBound, upperBound]}
          />

          <Tooltip content={<StockChartTooltip />} />

          <Area
            type="monotone"
            dataKey="close"
            stroke="var(--accent)"
            strokeWidth={2.5}
            fill={`url(#${gradientId})`}
            name="Close"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
