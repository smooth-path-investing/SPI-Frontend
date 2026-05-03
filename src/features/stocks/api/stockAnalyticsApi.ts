import { fetchJsonOrNull, isFiniteNumber, isNonEmptyString, isRecord } from '@/lib/http';
import { buildApiUrl, RUNTIME_CONFIG } from '@/lib/runtimeConfig';
import type { IndicatorNormalizedPoint, IndicatorWeightPoint, TickerIndicatorMeta } from '../analytics/types';
import type { StockPricePoint } from '../types';
import type {
  StockAssetChartSeries,
  StockFactorBarValue,
  StockFundamentalChartSeries,
  StockFundamentalSeries,
  StockFundamentalSeriesPoint,
} from './types';

const MAX_INDICATOR_WEIGHTS = 5;

const VARIABLE_LABELS: Record<string, string> = {
  marketcap: 'Market cap',
  pb: 'P/B',
  ps1: 'P/S',
};

const normalizeTicker = (ticker: string) => ticker.trim().toUpperCase();

const buildIndicatorWeightKey = (ticker: string, factorName: string) =>
  `${ticker.toLowerCase()}-${factorName.toLowerCase()}`;

const buildIndicatorSeriesKey = (variable: string, index: number) =>
  `fundamental_${index + 1}_${variable.toLowerCase().replace(/[^a-z0-9]+/g, '_')}`;

const formatVariableLabel = (variable: string) =>
  VARIABLE_LABELS[variable.toLowerCase()] ?? variable;

const readString = (record: Record<string, unknown>, key: string) => {
  const value = record[key];

  return isNonEmptyString(value) ? value.trim() : '';
};

const parsePricePoint = (value: unknown): StockPricePoint | null => {
  if (!isRecord(value) || !isNonEmptyString(value.date) || !isFiniteNumber(value.close)) {
    return null;
  }

  return {
    date: value.date.trim(),
    close: value.close,
  };
};

const parsePricePoints = (value: unknown) =>
  Array.isArray(value) ? value.flatMap((point) => parsePricePoint(point) ?? []) : [];

const parseStockAssetChartSeries = (
  payload: unknown,
  normalizedTicker: string,
): StockAssetChartSeries => {
  if (!isRecord(payload)) {
    throw new Error(`Invalid stock asset response for ${normalizedTicker}: expected an object.`);
  }

  const tickerPoints = parsePricePoints(payload.ticker_points);
  const ivvPoints = parsePricePoints(payload.ivv_points);

  if (tickerPoints.length === 0 || ivvPoints.length === 0) {
    throw new Error(
      `Invalid stock asset response for ${normalizedTicker}: missing chart point arrays.`,
    );
  }

  return {
    ticker: readString(payload, 'ticker') || normalizedTicker,
    benchmarkTicker: 'IVV',
    interval: 'quarterly',
    asOf: readString(payload, 'as_of'),
    tickerPoints,
    ivvPoints,
  };
};

const parseFactorBar = (value: unknown): StockFactorBarValue | null => {
  if (!isRecord(value) || !isNonEmptyString(value.factor_name) || !isFiniteNumber(value.normalized_value)) {
    return null;
  }

  return {
    factorName: value.factor_name.trim(),
    normalizedValue: value.normalized_value,
  };
};

const parseFactorBars = (payload: unknown, normalizedTicker: string): StockFactorBarValue[] => {
  if (!isRecord(payload)) {
    throw new Error(`Invalid indicator weights response for ${normalizedTicker}: expected an object.`);
  }

  if (!Array.isArray(payload.bars)) {
    throw new Error(`Invalid indicator weights response for ${normalizedTicker}: missing bars array.`);
  }

  return payload.bars.flatMap((bar) => parseFactorBar(bar) ?? []);
};

const getSeriesLabel = (series: Record<string, unknown>) =>
  readString(series, 'variable') || readString(series, 'factor') || readString(series, 'factor_name');

const parseFundamentalPoint = (value: unknown): StockFundamentalSeriesPoint | null => {
  if (!isRecord(value) || !isNonEmptyString(value.date) || !isFiniteNumber(value.value)) {
    return null;
  }

  return {
    date: value.date.trim(),
    value: value.value,
  };
};

const parseFundamentalSeries = (payload: unknown, normalizedTicker: string): StockFundamentalSeries[] => {
  if (!isRecord(payload)) {
    throw new Error(`Invalid fundamental response for ${normalizedTicker}: expected an object.`);
  }

  if (!Array.isArray(payload.series)) {
    throw new Error(`Invalid fundamental response for ${normalizedTicker}: missing series array.`);
  }

  return payload.series.flatMap((series) => {
    if (!isRecord(series)) {
      return [];
    }

    const label = getSeriesLabel(series);
    const points = Array.isArray(series.series)
      ? series.series.flatMap((point) => parseFundamentalPoint(point) ?? [])
      : [];

    return label ? [{ label, points }] : [];
  });
};

export async function fetchStockAssetChartSeries(
  ticker: string,
): Promise<StockAssetChartSeries | null> {
  const normalizedTicker = normalizeTicker(ticker);

  if (!normalizedTicker) {
    return null;
  }

  const requestPath = `/stock-assets/${normalizedTicker}`;
  const requestUrl = buildApiUrl(requestPath, RUNTIME_CONFIG.stockAssetsApiBaseUrl);
  const payload = await fetchJsonOrNull(requestUrl, `stock asset data for ${normalizedTicker}`);

  return payload ? parseStockAssetChartSeries(payload, normalizedTicker) : null;
}

export async function fetchStockIndicatorWeights(
  ticker: string,
): Promise<IndicatorWeightPoint[] | null> {
  const normalizedTicker = normalizeTicker(ticker);

  if (!normalizedTicker) {
    return null;
  }

  const requestPath = `/stock-factor-coefvec/${normalizedTicker}/bar-graph`;
  const requestUrl = buildApiUrl(requestPath, RUNTIME_CONFIG.stockFactorCoefvecApiBaseUrl);
  const payload = await fetchJsonOrNull(requestUrl, `indicator weights for ${normalizedTicker}`);

  if (!payload) {
    return null;
  }

  return parseFactorBars(payload, normalizedTicker)
    .sort((left, right) => {
      const absoluteDifference =
        Math.abs(right.normalizedValue) - Math.abs(left.normalizedValue);

      if (absoluteDifference !== 0) {
        return absoluteDifference;
      }

      const normalizedDifference = right.normalizedValue - left.normalizedValue;

      if (normalizedDifference !== 0) {
        return normalizedDifference;
      }

      return left.factorName.localeCompare(right.factorName);
    })
    .slice(0, MAX_INDICATOR_WEIGHTS)
    .map((bar) => ({
      key: buildIndicatorWeightKey(normalizedTicker, bar.factorName),
      indicator: bar.factorName,
      weight: Number((bar.normalizedValue * 100).toFixed(2)),
    }));
}

export async function fetchStockFundamentalChartSeries(
  ticker: string,
): Promise<StockFundamentalChartSeries | null> {
  const normalizedTicker = normalizeTicker(ticker);

  if (!normalizedTicker) {
    return null;
  }

  const requestPath = `/stock-fundamental/${normalizedTicker}/rebased-series`;
  const requestUrl = buildApiUrl(requestPath, RUNTIME_CONFIG.stockFundamentalApiBaseUrl);
  const payload = await fetchJsonOrNull(
    requestUrl,
    `rebased indicator series for ${normalizedTicker}`,
  );

  if (!payload) {
    return null;
  }

  const chartableSeries = parseFundamentalSeries(payload, normalizedTicker).filter(
    (series) => series.points.length > 0,
  );

  if (chartableSeries.length === 0) {
    return {
      data: [],
      indicators: [],
    };
  }

  const allDates = Array.from(
    new Set(chartableSeries.flatMap((series) => series.points.map((point) => point.date))),
  ).sort((left, right) => left.localeCompare(right));

  const indicators = chartableSeries.map<TickerIndicatorMeta>((series, index) => ({
    key: buildIndicatorSeriesKey(series.label, index),
    label: formatVariableLabel(series.label),
    weight: 0,
    seriesType: 'indicator',
  }));
  const seriesValueMaps = chartableSeries.map(
    (series) => new Map(series.points.map((point) => [point.date, point.value] as const)),
  );
  const normalizedSeries = allDates.map<IndicatorNormalizedPoint>((date) => {
    const row: IndicatorNormalizedPoint = { date };

    indicators.forEach((indicator, indicatorIndex) => {
      const value = seriesValueMaps[indicatorIndex]?.get(date);

      if (isFiniteNumber(value)) {
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
