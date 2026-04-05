import type {
  IndicatorNormalizedPoint,
  TickerIndicatorMeta,
} from '@/features/stocks';
import { buildApiUrl, RUNTIME_CONFIG } from '@/lib/runtimeConfig';

interface StockFundamentalSeriesPoint {
  date: string;
  value: number;
}

interface StockFundamentalSeries {
  variable?: string;
  factor?: string;
  factor_name?: string;
  series: StockFundamentalSeriesPoint[];
}

interface StockFundamentalRebasedResponse {
  ticker: string;
  count: number;
  rebasing_basis: string;
  series: StockFundamentalSeries[];
}

export interface StockFundamentalChartSeries {
  data: IndicatorNormalizedPoint[];
  indicators: TickerIndicatorMeta[];
}

const VARIABLE_LABELS: Record<string, string> = {
  marketcap: 'Market cap',
  pb: 'P/B',
  ps1: 'P/S',
};

const buildIndicatorSeriesKey = (variable: string, index: number) =>
  `fundamental_${index + 1}_${variable.toLowerCase().replace(/[^a-z0-9]+/g, '_')}`;

const formatVariableLabel = (variable: string) =>
  VARIABLE_LABELS[variable.toLowerCase()] ?? variable;

const getSeriesLabel = (series: StockFundamentalSeries) =>
  series.variable?.trim() || series.factor?.trim() || series.factor_name?.trim() || '';

export async function fetchStockFundamentalChartSeries(
  ticker: string,
): Promise<StockFundamentalChartSeries | null> {
  const normalizedTicker = ticker.trim().toUpperCase();

  if (!normalizedTicker) {
    return null;
  }

  const requestPath = `/stock-fundamental/${normalizedTicker}/rebased-series`;
  const requestUrl = buildApiUrl(requestPath, RUNTIME_CONFIG.stockFundamentalApiBaseUrl);
  const response = await fetch(requestUrl);

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`Failed to load rebased indicator series for ${normalizedTicker}.`);
  }

  const data = (await response.json()) as StockFundamentalRebasedResponse;
  const includedSeries = Array.isArray(data.series)
    ? data.series
        .map((series) => {
          const label = getSeriesLabel(series);
          const validPoints = Array.isArray(series.series)
            ? series.series.filter(
                (point) =>
                  point.date &&
                  typeof point.value === 'number' &&
                  Number.isFinite(point.value),
              )
            : [];

          return {
            label,
            validPoints,
          };
        })
        .filter((series) => series.label)
    : [];

  if (includedSeries.length === 0) {
    return {
      data: [],
      indicators: [],
    };
  }

  const chartableSeries = includedSeries.filter((series) => series.validPoints.length > 0);

  if (chartableSeries.length === 0) {
    return {
      data: [],
      indicators: [],
    };
  }

  // The rebased-series API can now return factors from multiple source tables with different
  // date coverage, so we keep the union of dates and let the chart render sparse lines.
  const allDates = Array.from(
    new Set(chartableSeries.flatMap((series) => series.validPoints.map((point) => point.date))),
  )
    .sort((left, right) => left.localeCompare(right));

  if (allDates.length === 0) {
    return {
      data: [],
      indicators: [],
    };
  }

  const indicators = chartableSeries.map((series, index) => ({
    key: buildIndicatorSeriesKey(series.label, index),
    label: formatVariableLabel(series.label),
    weight: 0,
    seriesType: 'indicator' as const,
  }));
  const seriesValueMaps = chartableSeries.map(
    (series) =>
      new Map(
        series.validPoints.map((point) => [point.date, point.value] as const),
      ),
  );
  const normalizedSeries = allDates.map<IndicatorNormalizedPoint>((date) => {
    const row: IndicatorNormalizedPoint = { date };

    indicators.forEach((indicator, indicatorIndex) => {
      const value = seriesValueMaps[indicatorIndex]?.get(date);

      if (typeof value === 'number' && Number.isFinite(value)) {
        row[indicator.key] = Number(value.toFixed(2));
      }
    });

    return row;
  });

  return {
    data: normalizedSeries,
    indicators,
  };
}
