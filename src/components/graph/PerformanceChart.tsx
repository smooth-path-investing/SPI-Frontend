import React, { useEffect, useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label,
  ReferenceLine,
} from 'recharts';
import type { OverallPerformanceChartProps } from '../../types';
import CustomTooltip from './tooltip';

export const OverallPerformanceChart: React.FC<OverallPerformanceChartProps> = ({
  data,
  className = '',
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <div
      className={`
        bg-[var(--card-bg)]
        border border-[var(--ring)]
        rounded-[var(--radius)]
        px-3 py-2 sm:px-6 sm:py-4
        ${className}
      `}
    >
      <ResponsiveContainer width="100%" aspect={isMobile ? 1.5 : 2}>
        <AreaChart
          data={data}
          margin={{
            top: 20,
            right: 10,
            left: 10,
            bottom: 10,
          }}
        >
          {/* Gradients */}
          <defs>
            <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.35} />
              <stop offset="95%" stopColor="var(--accent)" stopOpacity={0} />
            </linearGradient>

            <linearGradient id="benchmarkGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--muted-text)" stopOpacity={0.2} />
              <stop offset="95%" stopColor="var(--muted-text)" stopOpacity={0} />
            </linearGradient>
          </defs>

          {/* Grid */}
          <CartesianGrid
            stroke="var(--card-border)"
            strokeDasharray="3 3"
            opacity={isMobile ? 0.15 : 0.25}
          />

          {/* X Axis */}
          <XAxis
            dataKey="date"
            tickFormatter={(() => {
              let lastMonth: number | null = null;
              return (value: string) => {
                const d = new Date(value);
                const m = d.getMonth();
                if (m !== lastMonth) {
                  lastMonth = m;
                  return d.toLocaleString('default', { month: 'short' });
                }
                return '';
              };
            })()}
            tick={{ fill: 'var(--muted-text)', fontSize: 11 }}
            axisLine={{ stroke: 'var(--ring)' }}
            tickLine={{ stroke: 'var(--card-border)' }}
            angle={-45}
            textAnchor="end"
            interval={0}
          />

          {/* Y Axis */}
          <YAxis
            domain={[60, 160]}
            ticks={[60, 80, 100, 120, 140, 160]}
            tick={{ fill: 'var(--muted-text)', fontSize: 11 }}
            axisLine={{ stroke: 'var(--ring)' }}
            tickLine={{ stroke: 'var(--card-border)' }}
            width={isMobile ? 15 : 15}
          ></YAxis>

          {/* Reference Line */}
          <ReferenceLine
            y={100}
            stroke="var(--muted-text)"
            strokeDasharray="4 4"
            strokeOpacity={0.5}
          />

          {/* Tooltip */}
          <Tooltip content={<CustomTooltip />} trigger={isMobile ? 'click' : 'hover'} />

          {/* Benchmark */}
          <Area
            type="monotone"
            dataKey="ivvVal"
            stroke="var(--muted-text)"
            strokeWidth={isMobile ? 1.5 : 2}
            fill="url(#benchmarkGradient)"
            name="S&P 500"
          />

          {/* Portfolio */}
          <Area
            type="monotone"
            dataKey="spiVal"
            stroke="var(--accent)"
            strokeWidth={isMobile ? 2 : 2.5}
            fill="url(#portfolioGradient)"
            name="Portfolio"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
