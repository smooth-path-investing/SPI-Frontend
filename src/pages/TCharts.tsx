import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload || !payload.length) return null;

  return (
    <div
      style={{
        background: 'rgba(0,0,0,0.85)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '8px',
        padding: '10px 14px',
        fontSize: '12px',
        color: 'var(--foreground, #fff)',
      }}
    >
      <p style={{ marginBottom: 6, color: 'rgba(255,255,255,0.5)', fontSize: 11 }}>{label}</p>
      {payload.map((entry: any) => (
        <p key={entry.name} style={{ color: entry.color, margin: '2px 0' }}>
          {entry.name}:{' '}
          <strong>
            {typeof entry.value === 'number' ? entry.value.toLocaleString() : entry.value}
          </strong>
        </p>
      ))}
    </div>
  );
};

const AdvancedFactorChart = ({ title, factorName, data }: any) => {
  return (
    <div
      style={{
        borderRadius: '12px',
        border: '1px solid rgba(255,255,255,0.08)',
        padding: '24px',
        background: 'rgba(255,255,255,0.03)',
        backdropFilter: 'blur(4px)',
      }}
    >
      <p
        style={{
          fontSize: 10,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: 'var(--accent, #c9a84c)',
          marginBottom: 6,
          opacity: 0.9,
        }}
      >
        Advanced Chart
      </p>
      <h2
        style={{
          fontSize: 22,
          fontWeight: 600,
          letterSpacing: '-0.01em',
          color: 'var(--foreground, #fff)',
          marginBottom: 4,
        }}
      >
        {title}
      </h2>
      <p
        style={{
          fontSize: 13,
          color: 'var(--muted-text, rgba(255,255,255,0.45))',
          marginBottom: 24,
        }}
      >
        GOOGL vs {factorName}
      </p>

      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={data}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255,255,255,0.06)"
            vertical={false}
          />

          <XAxis
            dataKey="date"
            tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 11 }}
            axisLine={{ stroke: 'rgba(255,255,255,0.08)' }}
            tickLine={false}
            interval={Math.floor(data.length / 8) || 0}
          />

          <YAxis
            yAxisId="left"
            tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => v.toLocaleString()}
            width={55}
          />

          <YAxis
            yAxisId="right"
            orientation="right"
            tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) =>
              Math.abs(v) >= 1_000_000_000
                ? (v / 1_000_000_000).toFixed(1) + 'B'
                : Math.abs(v) >= 1_000_000
                ? (v / 1_000_000).toFixed(1) + 'M'
                : v.toLocaleString()
            }
            width={60}
          />

          <Tooltip content={<CustomTooltip />} />

          <Legend
            wrapperStyle={{
              fontSize: 12,
              color: 'rgba(255,255,255,0.5)',
              paddingTop: 16,
            }}
          />

          <Line
            yAxisId="left"
            type="monotone"
            dataKey="googl"
            stroke="var(--accent, #c9a84c)"
            strokeWidth={2}
            dot={false}
            name="GOOGL"
          />

          <Line
            yAxisId="right"
            type="monotone"
            dataKey="factor"
            stroke="rgba(255,255,255,0.75)"
            strokeWidth={2}
            dot={false}
            name={factorName}
            strokeDasharray="6 3"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

const Tcharts = ({ excelData = [] }: any) => {
  const [charts, setCharts] = useState<any>({
    chart1: [],
    chart2: [],
    chart3: [],
    chart4: [],
    chart5: [],
  });

  useEffect(() => {
    if (!Array.isArray(excelData) || excelData.length === 0) return;

    const chart1 = excelData.map((row: any) => ({
      date: row.Time,
      googl: Number(row.GOOGL),
      factor: Number(row.USACOR),
    }));
    const chart2 = excelData.map((row: any) => ({
      date: row.Time,
      googl: Number(row.GOOGL),
      factor: Number(row.IWO),
    }));
    const chart3 = excelData.map((row: any) => ({
      date: row.Time,
      googl: Number(row.GOOGL),
      factor: Number(row.USARSY),
    }));
    const chart4 = excelData.map((row: any) => ({
      date: row.Time,
      googl: Number(row.GOOGL),
      factor: Number(row.receivables),
    }));
    const chart5 = excelData.map((row: any) => ({
      date: row.Time,
      googl: Number(row.GOOGL),
      factor: Number(row.ebitdamargin),
    }));

    setCharts({ chart1, chart2, chart3, chart4, chart5 });
  }, [excelData]);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--background, #0d0d0d)',
        color: 'var(--foreground, #fff)',
        padding: '40px 24px',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto 40px' }}>
        <p
          style={{
            fontSize: 10,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'var(--accent, #c9a84c)',
            opacity: 0.9,
            marginBottom: 8,
          }}
        >
          Advanced Analysis
        </p>
        <h1 style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em' }}>
          Advanced Charts
        </h1>
        <p
          style={{
            fontSize: 14,
            color: 'var(--muted-text, rgba(255,255,255,0.45))',
            marginTop: 6,
          }}
        >
          GOOGL compared against key macro and fundamental indicators
        </p>
      </div>

      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(520px, 1fr))',
          gap: 24,
        }}
      >
        <AdvancedFactorChart title="GOOGL vs USACOR" factorName="USACOR" data={charts.chart1} />
        <AdvancedFactorChart title="GOOGL vs IWO" factorName="IWO" data={charts.chart2} />
        <AdvancedFactorChart title="GOOGL vs USARSY" factorName="USARSY" data={charts.chart3} />
        <AdvancedFactorChart title="GOOGL vs Receivables" factorName="Receivables" data={charts.chart4} />
        <AdvancedFactorChart title="GOOGL vs EBITDA Margin" factorName="EBITDA Margin" data={charts.chart5} />
      </div>
    </div>
  );
};

export default Tcharts;