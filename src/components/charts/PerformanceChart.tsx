import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

// Sample performance data showing growth over time
const performanceData = [
  { date: '2020-01', smoothPath: 100, sp500: 100, month: 'Jan 2020' },
  { date: '2020-03', smoothPath: 95, sp500: 88, month: 'Mar 2020' },
  { date: '2020-06', smoothPath: 112, sp500: 102, month: 'Jun 2020' },
  { date: '2020-09', smoothPath: 125, sp500: 108, month: 'Sep 2020' },
  { date: '2020-12', smoothPath: 142, sp500: 118, month: 'Dec 2020' },
  { date: '2021-03', smoothPath: 158, sp500: 125, month: 'Mar 2021' },
  { date: '2021-06', smoothPath: 175, sp500: 135, month: 'Jun 2021' },
  { date: '2021-09', smoothPath: 168, sp500: 132, month: 'Sep 2021' },
  { date: '2021-12', smoothPath: 195, sp500: 145, month: 'Dec 2021' },
  { date: '2022-03', smoothPath: 185, sp500: 138, month: 'Mar 2022' },
  { date: '2022-06', smoothPath: 172, sp500: 125, month: 'Jun 2022' },
  { date: '2022-09', smoothPath: 165, sp500: 118, month: 'Sep 2022' },
  { date: '2022-12', smoothPath: 178, sp500: 122, month: 'Dec 2022' },
  { date: '2023-03', smoothPath: 198, sp500: 135, month: 'Mar 2023' },
  { date: '2023-06', smoothPath: 225, sp500: 148, month: 'Jun 2023' },
  { date: '2023-09', smoothPath: 218, sp500: 142, month: 'Sep 2023' },
  { date: '2023-12', smoothPath: 245, sp500: 158, month: 'Dec 2023' },
  { date: '2024-03', smoothPath: 268, sp500: 170, month: 'Mar 2024' },
  { date: '2024-06', smoothPath: 285, sp500: 178, month: 'Jun 2024' },
  { date: '2024-09', smoothPath: 294, sp500: 185, month: 'Sep 2024' },
];

interface PerformanceChartProps {
  height?: string;
  className?: string;
}

export const PerformanceChart: React.FC<PerformanceChartProps> = ({ 
  height = "h-80", 
  className = "" 
}) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="text-foreground font-semibold mb-2">{label}</p>
          <div className="space-y-1">
            <p className="text-primary">
              Smooth Path: <span className="font-bold">{payload[0].value}%</span>
            </p>
            <p className="text-muted-foreground">
              S&P 500: <span className="font-bold">{payload[1].value}%</span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`bg-card rounded-lg border border-border p-4 ${height} ${className}`}>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground mb-2">Portfolio Performance vs S&P 500</h3>
        <p className="text-sm text-muted-foreground">Cumulative returns since January 2020 (Base: 100)</p>
      </div>
      
      <ResponsiveContainer width="100%" height="85%">
        <AreaChart data={performanceData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="smoothPathGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="sp500Gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--muted-foreground))" stopOpacity={0.2}/>
              <stop offset="95%" stopColor="hsl(var(--muted-foreground))" stopOpacity={0}/>
            </linearGradient>
          </defs>
          
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
          
          <XAxis 
            dataKey="month" 
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            axisLine={{ stroke: 'hsl(var(--border))' }}
            tickLine={{ stroke: 'hsl(var(--border))' }}
            interval="preserveStartEnd"
          />
          
          <YAxis 
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            axisLine={{ stroke: 'hsl(var(--border))' }}
            tickLine={{ stroke: 'hsl(var(--border))' }}
            domain={['dataMin - 10', 'dataMax + 10']}
          />
          
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
            dataKey="smoothPath"
            stroke="hsl(var(--primary))"
            strokeWidth={3}
            fill="url(#smoothPathGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
      
      <div className="flex justify-center space-x-6 mt-2">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-primary rounded-full"></div>
          <span className="text-sm text-foreground font-medium">Smooth Path Investing</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-0.5 bg-muted-foreground"></div>
          <span className="text-sm text-muted-foreground">S&P 500</span>
        </div>
      </div>
    </div>
  );
};