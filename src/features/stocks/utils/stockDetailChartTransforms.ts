import type { StockAssetChartSeries } from '../api/types';
import type {
  CumulativeReturnComparisonPoint,
  IndicatorNormalizedPoint,
  TickerIndicatorMeta,
} from '../analytics/types';
import type { StockPricePoint } from '../types';

export const REBASED_PRICE_SERIES_KEY = 'stock_price';

const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

export const buildCumulativeReturnsFromSeries = (
  stockAssetSeries: StockAssetChartSeries | null,
): CumulativeReturnComparisonPoint[] => {
  if (!stockAssetSeries) {
    return [];
  }

  const tickerPriceByDate = new Map(
    stockAssetSeries.tickerPoints.map((point) => [point.date, point.close]),
  );
  const ivvPriceByDate = new Map(
    stockAssetSeries.ivvPoints.map((point) => [point.date, point.close]),
  );
  const sharedDates = Array.from(
    new Set(
      stockAssetSeries.tickerPoints
        .map((point) => point.date)
        .filter((date) => ivvPriceByDate.has(date)),
    ),
  ).sort((left, right) => left.localeCompare(right));

  if (sharedDates.length === 0) {
    return [];
  }

  const startingTickerPrice = tickerPriceByDate.get(sharedDates[0]);
  const startingIvvPrice = ivvPriceByDate.get(sharedDates[0]);

  if (
    startingTickerPrice == null ||
    startingIvvPrice == null ||
    startingTickerPrice === 0 ||
    startingIvvPrice === 0
  ) {
    return [];
  }

  return sharedDates.map((date) => ({
    date,
    stockCum: Number(
      ((((tickerPriceByDate.get(date) ?? startingTickerPrice) / startingTickerPrice) - 1) * 100).toFixed(2),
    ),
    ivvCum: Number(
      ((((ivvPriceByDate.get(date) ?? startingIvvPrice) / startingIvvPrice) - 1) * 100).toFixed(2),
    ),
  }));
};

export const getSeriesAlignmentKey = (date: string): string => {
  const normalizedDate = date.trim();

  if (!ISO_DATE_PATTERN.test(normalizedDate)) {
    return normalizedDate;
  }

  const parsedDate = new Date(`${normalizedDate}T00:00:00Z`);

  if (Number.isNaN(parsedDate.getTime())) {
    return normalizedDate;
  }

  const quarter = Math.floor(parsedDate.getUTCMonth() / 3) + 1;

  return `${parsedDate.getUTCFullYear()}-Q${quarter}`;
};

export const mergeNormalizedSeriesWithPrice = (
  normalizedSeries: IndicatorNormalizedPoint[],
  indicators: TickerIndicatorMeta[],
  priceSeries: StockPricePoint[],
  tickerSymbol: string,
): {
  data: IndicatorNormalizedPoint[];
  indicators: TickerIndicatorMeta[];
} => {
  if (normalizedSeries.length === 0 || indicators.length === 0 || priceSeries.length === 0) {
    return {
      data: normalizedSeries,
      indicators,
    };
  }

  const exactPriceByDate = new Map<string, number>();
  const alignedPriceByPeriod = new Map<string, number>();

  priceSeries.forEach((point) => {
    if (!point.date || typeof point.close !== 'number' || !Number.isFinite(point.close) || point.close <= 0) {
      return;
    }

    exactPriceByDate.set(point.date, point.close);
    alignedPriceByPeriod.set(getSeriesAlignmentKey(point.date), point.close);
  });

  const matchedRows = normalizedSeries.flatMap((row) => {
    const exactPrice = exactPriceByDate.get(row.date);
    const alignedPrice = alignedPriceByPeriod.get(getSeriesAlignmentKey(row.date));
    const close = exactPrice ?? alignedPrice;

    if (typeof close !== 'number' || !Number.isFinite(close) || close <= 0) {
      return [];
    }

    return [
      {
        close,
        row,
      },
    ];
  });

  const rebasingBasis = matchedRows[0]?.close;

  if (typeof rebasingBasis !== 'number' || !Number.isFinite(rebasingBasis) || rebasingBasis <= 0) {
    return {
      data: normalizedSeries,
      indicators,
    };
  }

  const mergedData = matchedRows.map(({ close, row }) => ({
    ...row,
    [REBASED_PRICE_SERIES_KEY]: Number(((close / rebasingBasis) * 100).toFixed(2)),
  }));

  if (mergedData.length === 0) {
    return {
      data: normalizedSeries,
      indicators,
    };
  }

  return {
    data: mergedData,
    indicators: [
      {
        key: REBASED_PRICE_SERIES_KEY,
        label: `${tickerSymbol} price`,
        weight: 0,
        seriesType: 'stock',
      },
      ...indicators.filter((indicator) => indicator.key !== REBASED_PRICE_SERIES_KEY),
    ],
  };
};
