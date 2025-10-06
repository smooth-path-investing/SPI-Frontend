import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { textContent } from '@/constants/textContent';

// Performance data from June 2017 to March 2021
const performanceData = [
  { date: '2017-06', smoothPath: 101.61, sp500: 100.67, month: 'Jun 2017' },
  { date: '2017-07', smoothPath: 105.53, sp500: 102.76, month: 'Jul 2017' },
  { date: '2017-08', smoothPath: 106.34, sp500: 103.04, month: 'Aug 2017' },
  { date: '2017-09', smoothPath: 110.43, sp500: 105.14, month: 'Sep 2017' },
  { date: '2017-10', smoothPath: 107.81, sp500: 107.59, month: 'Oct 2017' },
  { date: '2017-11', smoothPath: 112.22, sp500: 110.95, month: 'Nov 2017' },
  { date: '2017-12', smoothPath: 116.28, sp500: 112.29, month: 'Dec 2017' },
  { date: '2018-01', smoothPath: 123.62, sp500: 118.68, month: 'Jan 2018' },
  { date: '2018-02', smoothPath: 119.83, sp500: 114.16, month: 'Feb 2018' },
  { date: '2018-03', smoothPath: 116.86, sp500: 111.35, month: 'Mar 2018' },
  { date: '2018-04', smoothPath: 119.55, sp500: 111.74, month: 'Apr 2018' },
  { date: '2018-05', smoothPath: 116.33, sp500: 114.43, month: 'May 2018' },
  { date: '2018-06', smoothPath: 120.37, sp500: 115.10, month: 'Jun 2018' },
  { date: '2018-07', smoothPath: 121.62, sp500: 119.42, month: 'Jul 2018' },
  { date: '2018-08', smoothPath: 130.36, sp500: 123.28, month: 'Aug 2018' },
  { date: '2018-09', smoothPath: 128.65, sp500: 123.94, month: 'Sep 2018' },
  { date: '2018-10', smoothPath: 123.04, sp500: 115.48, month: 'Oct 2018' },
  { date: '2018-11', smoothPath: 123.17, sp500: 117.70, month: 'Nov 2018' },
  { date: '2018-12', smoothPath: 111.42, sp500: 107.27, month: 'Dec 2018' },
  { date: '2019-01', smoothPath: 118.03, sp500: 115.77, month: 'Jan 2019' },
  { date: '2019-02', smoothPath: 124.89, sp500: 119.51, month: 'Feb 2019' },
  { date: '2019-03', smoothPath: 128.67, sp500: 121.80, month: 'Mar 2019' },
  { date: '2019-04', smoothPath: 130.27, sp500: 126.67, month: 'Apr 2019' },
  { date: '2019-05', smoothPath: 120.36, sp500: 118.69, month: 'May 2019' },
  { date: '2019-06', smoothPath: 126.83, sp500: 126.93, month: 'Jun 2019' },
  { date: '2019-07', smoothPath: 135.71, sp500: 128.86, month: 'Jul 2019' },
  { date: '2019-08', smoothPath: 133.73, sp500: 126.73, month: 'Aug 2019' },
  { date: '2019-09', smoothPath: 136.65, sp500: 129.20, month: 'Sep 2019' },
  { date: '2019-10', smoothPath: 136.91, sp500: 131.99, month: 'Oct 2019' },
  { date: '2019-11', smoothPath: 145.03, sp500: 136.79, month: 'Nov 2019' },
  { date: '2019-12', smoothPath: 151.40, sp500: 140.79, month: 'Dec 2019' },
  { date: '2020-01', smoothPath: 145.62, sp500: 140.79, month: 'Jan 2020' },
  { date: '2020-02', smoothPath: 136.85, sp500: 128.89, month: 'Feb 2020' },
  { date: '2020-03', smoothPath: 130.32, sp500: 113.24, month: 'Mar 2020' },
  { date: '2020-04', smoothPath: 144.50, sp500: 127.60, month: 'Apr 2020' },
  { date: '2020-05', smoothPath: 175.52, sp500: 133.75, month: 'May 2020' },
  { date: '2020-06', smoothPath: 185.22, sp500: 136.28, month: 'Jun 2020' },
  { date: '2020-07', smoothPath: 191.22, sp500: 144.26, month: 'Jul 2020' },
  { date: '2020-08', smoothPath: 204.07, sp500: 154.36, month: 'Aug 2020' },
  { date: '2020-09', smoothPath: 194.54, sp500: 148.57, month: 'Sep 2020' },
  { date: '2020-10', smoothPath: 188.77, sp500: 144.84, month: 'Oct 2020' },
  { date: '2020-11', smoothPath: 219.35, sp500: 160.62, month: 'Nov 2020' },
  { date: '2020-12', smoothPath: 223.78, sp500: 166.69, month: 'Dec 2020' },
  { date: '2021-01', smoothPath: 227.80, sp500: 164.97, month: 'Jan 2021' },
  { date: '2021-02', smoothPath: 243.89, sp500: 169.53, month: 'Feb 2021' },
  { date: '2021-03', smoothPath: 265.05, sp500: 177.24, month: 'Mar 2021' },
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
      // payload[0] is sp500 (first Area), payload[1] is smoothPath (second Area)
      const sp500Value = payload[0].value;
      const smoothPathValue = payload[1].value;
      const smoothPathReturnNum = (smoothPathValue - 100) / 100 * 100;
      const sp500ReturnNum = (sp500Value - 100) / 100 * 100;
      const smoothPathReturn = smoothPathReturnNum.toFixed(2);
      const sp500Return = sp500ReturnNum.toFixed(2);
      const smoothPathDollar = (smoothPathValue * 100).toFixed(0);
      const sp500Dollar = (sp500Value * 100).toFixed(0);
      
      return (
        <div className="bg-card border border-border rounded-lg p-4 shadow-lg">
          <p className="text-foreground font-semibold mb-3 text-center">{label}</p>
          <div className="space-y-2">
            <div className="pb-2 border-b border-border">
              <p className="text-xs text-muted-foreground mb-1">{textContent["home-performance-chart-legend-smooth-path"]}</p>
              <p className="font-bold text-lg" style={{ color: '#FFD700' }}>
                {smoothPathReturnNum >= 0 ? '+' : ''}{smoothPathReturn}%
              </p>
              <p className="text-xs text-muted-foreground">${smoothPathDollar}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">{textContent["home-performance-chart-legend-sp500"]}</p>
              <p className="text-muted-foreground font-bold text-lg">
                {sp500ReturnNum >= 0 ? '+' : ''}{sp500Return}%
              </p>
              <p className="text-xs text-muted-foreground">${sp500Dollar}</p>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`bg-card rounded-lg border border-border p-4 ${height} ${className}`}>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground mb-2">{textContent["home-performance-chart-title"]}</h3>
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">{textContent["home-performance-chart-subtitle"]}</p>
          <div className="flex space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#FFD700' }}></div>
              <span className="text-sm font-medium" style={{ color: '#FFD700' }}>{textContent["home-performance-chart-legend-smooth-path"]}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-0.5 bg-muted-foreground"></div>
              <span className="text-sm text-muted-foreground">{textContent["home-performance-chart-legend-sp500"]}</span>
            </div>
          </div>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height="85%">
        <AreaChart data={performanceData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="smoothPathGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FFD700" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#FFD700" stopOpacity={0}/>
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
            angle={-45}
            textAnchor="end"
            height={80}
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
            stroke="#FFD700"
            strokeWidth={3}
            fill="url(#smoothPathGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};