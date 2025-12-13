import React from 'react';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
  Label,
} from 'recharts';
import { textContent } from '@/constants/textContent';
import { PerformanceChartProps } from '@/types';
import { performanceData } from '@/constants/graph';

interface TooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

export const PerformanceChart: React.FC<PerformanceChartProps> = ({
  height = 'h-96',
  className = '',
}) => {
  const sp500Start = performanceData[0]?.sp500 || 1;
  const spiStart = performanceData[0]?.spi || 1;

  const CustomTooltip: React.FC<TooltipProps> = ({ active, payload, label }) => {
    if (!active || !payload || !payload.length) return null;

    const d = label ? new Date(label) : null;
    const formattedLabel = d
      ? `${d.toLocaleString('default', { month: 'short' })} ${d.getDate()}, ${d.getFullYear()}`
      : '';

    const sp500Payload = payload.find((p: any) => p.dataKey === 'sp500');
    const spiPayload = payload.find((p: any) => p.dataKey === 'spi');

    const sp500Value = sp500Payload?.value ?? 0;
    const spiValue = spiPayload?.value ?? 0;

    const sp500Return = ((sp500Value - sp500Start) / sp500Start) * 100;
    const spiReturn = ((spiValue - spiStart) / spiStart) * 100;

    const getColor = (val: number) => (val >= 0 ? '#16a34a' : '#dc2626');

    return (
      <div className="bg-card border border-border rounded-lg p-2 sm:p-4 shadow-lg w-48 sm:w-56">
        <p className="text-center font-semibold text-sm sm:text-base mb-2">{formattedLabel}</p>
        <div className="space-y-1 sm:space-y-2">
          <div className="pb-1 border-b border-border">
            <p className="text-xs sm:text-sm text-muted-foreground mb-1">Portfolio (SPI)</p>
            <p className="font-bold text-sm sm:text-lg" style={{ color: getColor(spiReturn) }}>
              {spiReturn >= 0 ? '+' : ''}
              {spiReturn.toFixed(2)}%
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground">Index: {spiValue.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-xs sm:text-sm text-muted-foreground mb-1">S&P500 Index</p>
            <p className="font-bold text-sm sm:text-lg" style={{ color: getColor(sp500Return) }}>
              {sp500Return >= 0 ? '+' : ''}
              {sp500Return.toFixed(2)}%
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Index: {sp500Value.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`bg-card rounded-lg border border-border p-2 sm:p-4 ${height} ${className}`}>
      <div className="mb-2 sm:mb-4 text-center">
        <h3 className="text-sm sm:text-lg font-semibold text-foreground mb-1 sm:mb-2">
          {textContent['home-performance-chart-title']}
        </h3>
      </div>

      <ResponsiveContainer width="100%" height="85%">
        <AreaChart data={performanceData} margin={{ top: 10, right: 10, left: 10, bottom: 50 }}>
          <defs>
            <linearGradient id="smoothPathGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FFD700" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#FFD700" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="sp500Gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--muted-foreground))" stopOpacity={0.2} />
              <stop offset="95%" stopColor="hsl(var(--muted-foreground))" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />

          <XAxis
            dataKey="date"
            tickFormatter={(() => {
              let lastMonth: number | null = null;
              return (dateStr: string) => {
                const d = new Date(dateStr);
                const month = d.getMonth();
                if (month !== lastMonth) {
                  lastMonth = month;
                  return d.toLocaleString('default', { month: 'short' });
                }
                return '';
              };
            })()}
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
            axisLine={{ stroke: 'hsl(var(--border))' }}
            tickLine={{ stroke: 'hsl(var(--border))' }}
            interval={0}
            angle={-45}
            textAnchor="end"
          />

          <YAxis
            width={50}
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
            axisLine={{ stroke: 'hsl(var(--border))' }}
            tickLine={{ stroke: 'hsl(var(--border))' }}
            domain={['auto', 'auto']}
          >
            <Label
              value="Cumulative Return (%)"
              angle={-90}
              position="center"
              dx={-10}
              style={{ textAnchor: 'middle', fontSize: 10 }}
            />
          </YAxis>

          <Tooltip content={<CustomTooltip />} />

          <Area
            type="monotone"
            dataKey="sp500"
            stroke="hsl(var(--muted-foreground))"
            strokeWidth={2}
            fill="url(#sp500Gradient)"
            strokeDasharray="5 5"
          />

          <Area
            type="monotone"
            dataKey="spi"
            stroke="#FFD700"
            strokeWidth={2}
            fill="url(#smoothPathGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
