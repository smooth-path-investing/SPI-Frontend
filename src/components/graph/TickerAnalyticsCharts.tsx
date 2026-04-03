import React from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  Line,
  LineChart,
  Rectangle,
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

interface IndicatorWeightBarShapeProps {
  fill?: string;
  height?: number;
  payload?: IndicatorWeightPoint;
  width?: number;
  x?: number;
  y?: number;
}

interface IndicatorWeightLabelProps {
  height?: number;
  value?: number;
  width?: number;
  x?: number;
  y?: number;
}

interface NormalizedIndicatorChartProps {
  data: IndicatorNormalizedPoint[];
  indicators: TickerIndicatorMeta[];
  className?: string;
}

interface NormalizedSeriesLineStyle {
  stroke: string;
  strokeDasharray?: string;
  strokeWidth: number;
}

interface StyledIndicatorMeta extends TickerIndicatorMeta {
  lineStyle: NormalizedSeriesLineStyle;
}

const ANALYTICS_CHART_FRAME_CLASS =
  'min-h-0 flex-1 overflow-hidden rounded-[22px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.025),rgba(0,0,0,0.16))] p-2 sm:p-3';

const DEFAULT_AXIS_TICK = { fill: '#FFFFFF', fontSize: 11 };
const DEFAULT_AXIS_LINE = { stroke: '#FFFFFF', strokeOpacity: 0.55 };
const POSITIVE_WEIGHT_FILL = 'var(--accent)';
const NEGATIVE_WEIGHT_FILL = 'rgba(255,255,255,0.72)';

const EmptyTooltip: React.FC = () => null;

const formatSignedPercentage = (value: number, fractionDigits = 1) =>
  `${value > 0 ? '+' : ''}${value.toFixed(fractionDigits)}%`;

const NORMALIZED_INDICATOR_SERIES_STYLES: NormalizedSeriesLineStyle[] = [
  {
    stroke: '#FFFFFF',
    strokeWidth: 2.4,
  },
  {
    stroke: 'rgba(255,255,255,0.78)',
    strokeDasharray: '12 7',
    strokeWidth: 2.4,
  },
  {
    stroke: 'rgba(255,255,255,0.62)',
    strokeDasharray: '3 6',
    strokeWidth: 2.6,
  },
  {
    stroke: 'rgba(255,255,255,0.52)',
    strokeDasharray: '14 6 4 6',
    strokeWidth: 2.4,
  },
];

const getNormalizedSeriesLineStyle = (
  indicator: TickerIndicatorMeta,
  nonStockIndicatorIndex: number,
): NormalizedSeriesLineStyle =>
  indicator.seriesType === 'stock'
    ? {
        stroke: 'var(--accent)',
        strokeWidth: 2.9,
      }
    : NORMALIZED_INDICATOR_SERIES_STYLES[
        nonStockIndicatorIndex % NORMALIZED_INDICATOR_SERIES_STYLES.length
      ] ?? NORMALIZED_INDICATOR_SERIES_STYLES[0];

const buildStyledIndicators = (indicators: TickerIndicatorMeta[]): StyledIndicatorMeta[] => {
  let nonStockIndicatorIndex = 0;

  return indicators.map((indicator) => {
    const lineStyle = getNormalizedSeriesLineStyle(indicator, nonStockIndicatorIndex);

    if (indicator.seriesType !== 'stock') {
      nonStockIndicatorIndex += 1;
    }

    return {
      ...indicator,
      lineStyle,
    };
  });
};

const LineStyleSwatch: React.FC<NormalizedSeriesLineStyle> = ({
  stroke,
  strokeDasharray,
  strokeWidth,
}) => (
  <svg width="26" height="10" viewBox="0 0 26 10" aria-hidden="true" className="shrink-0">
    <line
      x1="1"
      y1="5"
      x2="25"
      y2="5"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeDasharray={strokeDasharray}
    />
  </svg>
);

const IndicatorWeightLegend: React.FC = () => (
  <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-2 px-1">
    <div className="inline-flex items-center gap-2">
      <span
        className="h-2.5 w-2.5 rounded-full"
        style={{ backgroundColor: POSITIVE_WEIGHT_FILL }}
      />
      <span className="text-[11px] text-[var(--muted-text)]">Positive driver</span>
    </div>
    <div className="inline-flex items-center gap-2">
      <span
        className="h-2.5 w-2.5 rounded-full"
        style={{ backgroundColor: NEGATIVE_WEIGHT_FILL }}
      />
      <span className="text-[11px] text-[var(--muted-text)]">Negative driver</span>
    </div>
  </div>
);

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
  BaseTooltipProps & { indicators: StyledIndicatorMeta[] }
> = ({ active, payload, label, indicators }) => {
  if (!active || !payload?.length || !label) {
    return null;
  }

  const sortedEntries = indicators
    .flatMap((indicator) => {
      const matchingPayload = payload.find((entry) => entry.dataKey === indicator.key);
      const value = matchingPayload?.value;

      if (typeof value !== 'number' || !Number.isFinite(value)) {
        return [];
      }

      return {
        label: indicator.label,
        lineStyle: indicator.lineStyle,
        value,
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
              <LineStyleSwatch {...entry.lineStyle} />
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

const WeightTooltip: React.FC<{
  active?: boolean;
  payload?: Array<{
    value?: number;
    payload: IndicatorWeightPoint;
  }>;
}> = ({ active, payload }) => {
  const indicatorPoint = payload?.[0]?.payload;

  if (!active || !indicatorPoint) {
    return null;
  }

  return (
    <ChartTooltipShell>
      <p className="mb-2 text-[10px] uppercase tracking-[0.1em] text-[var(--muted-text)]">
        {indicatorPoint.indicator}
      </p>
      <div className="space-y-1.5">
        <div className="flex items-center justify-between gap-4">
          <span className="text-xs text-[var(--muted-text)]">Relative weight</span>
          <span className="text-sm font-semibold tabular-nums text-[var(--foreground)]">
            {formatSignedPercentage(indicatorPoint.weight)}
          </span>
        </div>
      </div>
    </ChartTooltipShell>
  );
};

const getIndicatorWeightAxisExtent = (value: number) =>
  Math.min(100, Math.ceil(value / 5) * 5 + 5);

const IndicatorWeightBarShape: React.FC<IndicatorWeightBarShapeProps> = ({
  fill,
  height = 0,
  payload,
  width = 0,
  x = 0,
  y = 0,
}) => {
  const normalizedWidth = Math.abs(width);
  const normalizedX = width >= 0 ? x : x + width;

  if (normalizedWidth <= 0 || height <= 0) {
    return null;
  }

  const isPositive = (payload?.weight ?? 0) >= 0;

  return (
    <Rectangle
      x={normalizedX}
      y={y}
      width={normalizedWidth}
      height={height}
      fill={fill}
      radius={isPositive ? [0, 6, 6, 0] : [6, 0, 0, 6]}
    />
  );
};

const IndicatorWeightLabel: React.FC<IndicatorWeightLabelProps> = ({
  height = 0,
  value,
  width = 0,
  x = 0,
  y = 0,
}) => {
  if (typeof value !== 'number' || !Number.isFinite(value) || height <= 0) {
    return null;
  }

  const normalizedWidth = Math.abs(width);
  const barLeft = width >= 0 ? x : x + width;
  const barRight = barLeft + normalizedWidth;
  const isPositive = value >= 0;
  const canFitInsideBar = normalizedWidth >= 58;
  const insidePadding = 10;
  const outsideOffset = 8;
  const labelX = canFitInsideBar
    ? isPositive
      ? barRight - insidePadding
      : barLeft + insidePadding
    : isPositive
      ? barRight + outsideOffset
      : barLeft - outsideOffset;
  const labelY = y + height / 2 + 4;
  const textAnchor = canFitInsideBar
    ? isPositive
      ? 'end'
      : 'start'
    : isPositive
      ? 'start'
      : 'end';
  const fill = canFitInsideBar ? '#0B0F19' : '#FFFFFF';

  return (
    <text
      x={labelX}
      y={labelY}
      fill={fill}
      fontSize={11}
      fontWeight={700}
      textAnchor={textAnchor}
    >
      {formatSignedPercentage(value)}
    </text>
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
            tick={DEFAULT_AXIS_TICK}
            axisLine={DEFAULT_AXIS_LINE}
            tickLine={false}
          />
          <YAxis
            tickFormatter={(value: number) => `${value.toFixed(0)}%`}
            tick={DEFAULT_AXIS_TICK}
            axisLine={DEFAULT_AXIS_LINE}
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
            stroke="var(--accent)"
            strokeWidth={2.8}
            dot={false}
            activeDot={{ r: 4.5, fill: 'var(--background)', stroke: 'var(--accent)', strokeWidth: 2 }}
            isAnimationActive={false}
          />
          <Line
            type="monotoneX"
            dataKey="ivvCum"
            name="IVV"
            stroke="#FFFFFF"
            strokeWidth={2.4}
            dot={false}
            activeDot={{
              r: 4.5,
              fill: 'var(--background)',
              stroke: '#FFFFFF',
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

  const minWeight = Math.min(...data.map((point) => point.weight));
  const maxWeight = Math.max(...data.map((point) => point.weight));
  const hasOnlyZeroWeights = minWeight === 0 && maxWeight === 0;
  const hasNegativeWeights = minWeight < 0;
  const hasPositiveWeights = maxWeight > 0;
  const axisExtent = hasOnlyZeroWeights
    ? 10
    : getIndicatorWeightAxisExtent(Math.max(Math.abs(minWeight), Math.abs(maxWeight)));
  const axisLowerBound =
    hasNegativeWeights && hasPositiveWeights
      ? -axisExtent
      : hasNegativeWeights
        ? -axisExtent
        : 0;
  const axisUpperBound =
    hasNegativeWeights && hasPositiveWeights
      ? axisExtent
      : hasPositiveWeights
        ? axisExtent
        : 0;

  return (
    <div className={`flex h-[280px] sm:h-[320px] w-full flex-col ${className}`}>
      <IndicatorWeightLegend />
      <div className={ANALYTICS_CHART_FRAME_CLASS}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 12, right: 36, left: 18, bottom: 6 }}
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
              tick={DEFAULT_AXIS_TICK}
              axisLine={DEFAULT_AXIS_LINE}
              tickLine={false}
              domain={[axisLowerBound, axisUpperBound]}
              tickCount={hasNegativeWeights && hasPositiveWeights ? 7 : 5}
            />
            <YAxis
              type="category"
              dataKey="indicator"
              tick={DEFAULT_AXIS_TICK}
              axisLine={DEFAULT_AXIS_LINE}
              tickLine={false}
              width={132}
              interval={0}
            />
            <Tooltip
              cursor={{ fill: 'rgba(250,204,21,0.08)' }}
              content={<WeightTooltip />}
            />
            <ReferenceLine
              x={0}
              stroke="rgba(255,255,255,0.2)"
              strokeDasharray="5 5"
              ifOverflow="extendDomain"
            />
            <Bar dataKey="weight" shape={<IndicatorWeightBarShape />} barSize={24}>
              {data.map((point) => (
                <Cell
                  key={point.key}
                  fill={point.weight >= 0 ? POSITIVE_WEIGHT_FILL : NEGATIVE_WEIGHT_FILL}
                />
              ))}
              <LabelList dataKey="weight" content={<IndicatorWeightLabel />} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
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

  const styledIndicators = buildStyledIndicators(indicators);
  const values = data.flatMap((row) =>
    styledIndicators.flatMap((indicator) => {
      const value = row[indicator.key];

      return typeof value === 'number' && Number.isFinite(value) ? [value] : [];
    }),
  );

  if (values.length === 0) {
    return null;
  }

  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  const padding = Math.max((maxValue - minValue) * 0.16, 2.5);

  return (
    <div className={`flex h-[280px] sm:h-[320px] w-full flex-col ${className}`}>
      <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-2 px-1">
        {styledIndicators.map((indicator) => (
          <div key={indicator.key} className="inline-flex items-center gap-2">
            <LineStyleSwatch {...indicator.lineStyle} />
            <span className="text-[11px] text-[var(--muted-text)]">{indicator.label}</span>
          </div>
        ))}
      </div>
      <div className="min-h-0 flex-1">
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
            tick={DEFAULT_AXIS_TICK}
            axisLine={DEFAULT_AXIS_LINE}
            tickLine={false}
          />
          <YAxis
            tickFormatter={(value: number) => value.toFixed(0)}
            tick={DEFAULT_AXIS_TICK}
            axisLine={DEFAULT_AXIS_LINE}
            tickLine={false}
            width={64}
            domain={[minValue - padding, maxValue + padding]}
            tickCount={5}
          />
          <Tooltip
            cursor={{ stroke: 'rgba(250,204,21,0.18)', strokeDasharray: '4 8' }}
            content={<NormalizedTooltip indicators={styledIndicators} />}
          />
          <ReferenceLine
            y={100}
            stroke="rgba(255,255,255,0.2)"
            strokeDasharray="5 5"
            ifOverflow="extendDomain"
          />
          {styledIndicators.map((indicator) => (
            <Line
              key={indicator.key}
              type="monotoneX"
              dataKey={indicator.key}
              name={indicator.label}
              stroke={indicator.lineStyle.stroke}
              strokeWidth={indicator.lineStyle.strokeWidth}
              strokeDasharray={indicator.lineStyle.strokeDasharray}
              dot={false}
              activeDot={{
                r: 4.5,
                fill: 'var(--background)',
                stroke: indicator.lineStyle.stroke,
                strokeWidth: 2,
              }}
              isAnimationActive={false}
            />
          ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
