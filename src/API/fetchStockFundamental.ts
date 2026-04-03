import type {
  IndicatorNormalizedPoint,
  TickerIndicatorMeta,
} from '@/features/stocks';

interface StockFundamentalSeriesPoint {
  date: string;
  value: number;
}

interface StockFundamentalSeries {
  variable: string;
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

const STOCK_FUNDAMENTAL_API_BASE_URL =
  import.meta.env.VITE_STOCK_FUNDAMENTAL_API_BASE_URL?.trim() ?? '';
const VARIABLE_LABELS: Record<string, string> = {
  marketcap: 'Market cap',
  pb: 'P/B',
  ps1: 'P/S',
};

const buildIndicatorSeriesKey = (variable: string, index: number) =>
  `fundamental_${index + 1}_${variable.toLowerCase().replace(/[^a-z0-9]+/g, '_')}`;

const formatVariableLabel = (variable: string) =>
  VARIABLE_LABELS[variable.toLowerCase()] ?? variable;

export async function fetchStockFundamentalChartSeries(
  ticker: string,
): Promise<StockFundamentalChartSeries | null> {
  const normalizedTicker = ticker.trim().toUpperCase();

  if (!normalizedTicker) {
    return null;
  }

  const requestPath = `/stock-fundamental/${normalizedTicker}/rebased-series`;
  const requestUrl = STOCK_FUNDAMENTAL_API_BASE_URL
    ? `${STOCK_FUNDAMENTAL_API_BASE_URL}${requestPath}`
    : requestPath;
  const response = await fetch(requestUrl);

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`Failed to load rebased indicator series for ${normalizedTicker}.`);
  }

  const data = (await response.json()) as StockFundamentalRebasedResponse;
  const includedSeries = Array.isArray(data.series)
    ? data.series.filter(
        (series) =>
          series.variable &&
          Array.isArray(series.series) &&
          series.series.length > 0,
      )
    : [];

  if (includedSeries.length === 0) {
    return {
      data: [],
      indicators: [],
    };
  }

  const validDateSets = includedSeries.map(
    (series) =>
      new Set(
        series.series
          .filter(
            (point) =>
              point.date &&
              typeof point.value === 'number' &&
              Number.isFinite(point.value),
          )
          .map((point) => point.date),
      ),
  );
  const sharedDates = Array.from(validDateSets[0] ?? [])
    .filter((date) => validDateSets.every((dateSet) => dateSet.has(date)))
    .sort((left, right) => left.localeCompare(right));

  if (sharedDates.length === 0) {
    return {
      data: [],
      indicators: [],
    };
  }

  const indicators = includedSeries.map((series, index) => ({
    key: buildIndicatorSeriesKey(series.variable, index),
    label: formatVariableLabel(series.variable),
    weight: 0,
    seriesType: 'indicator' as const,
  }));
  const seriesValueMaps = includedSeries.map(
    (series) =>
      new Map(
        series.series
          .filter(
            (point) =>
              point.date &&
              typeof point.value === 'number' &&
              Number.isFinite(point.value),
          )
          .map((point) => [point.date, point.value] as const),
      ),
  );
  const normalizedSeries = sharedDates.map<IndicatorNormalizedPoint>((date) => {
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
