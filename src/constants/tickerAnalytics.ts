import type { StockData, StockPricePoint } from '@/features/stocks/types';
import type {
  CumulativeReturnComparisonPoint,
  IndicatorNormalizedPoint,
  TickerAnalytics,
  TickerIndicatorMeta,
} from '@/features/stocks/analytics/types';

const getTickerSeed = (ticker: string) =>
  ticker.split('').reduce((sum, char, index) => sum + char.charCodeAt(0) * (index + 1), 0);

const toIndicatorKey = (index: number) => `indicator_${index + 1}`;

const normalizeWeights = (rawWeights: number[]) => {
  const total = rawWeights.reduce((sum, weight) => sum + weight, 0);
  const normalized = rawWeights.map((weight) => Math.round((weight / total) * 100));
  const difference = 100 - normalized.reduce((sum, weight) => sum + weight, 0);

  if (normalized.length > 0) {
    normalized[normalized.length - 1] += difference;
  }

  return normalized;
};

const buildIndicatorWeights = (stock: StockData, seed: number): TickerIndicatorMeta[] => {
  const rawWeights = stock.factors.map((_, index) => {
    const rankingBias = (stock.factors.length - index) * 20;
    const seedBias = ((seed + index * 17) % 8) + 4;
    return rankingBias + seedBias;
  });

  const weights = normalizeWeights(rawWeights);

  return stock.factors.map((factor, index) => ({
    key: toIndicatorKey(index),
    label: factor,
    weight: weights[index] ?? 0,
    seriesType: 'indicator',
  }));
};

const buildBenchmarkLevel = (seed: number, index: number, totalPoints: number) => {
  const progress = index / Math.max(totalPoints - 1, 1);
  const baseDrift = 1 + (0.08 + (seed % 9) * 0.004) * progress;
  const wave =
    Math.sin((index + (seed % 7)) / 5.1) * 0.018 +
    Math.cos((index + (seed % 11)) / 7.6) * 0.009;

  return 100 * Math.max(baseDrift + wave, 0.72);
};

const buildCumulativeReturns = (
  priceSeries: StockPricePoint[],
  seed: number,
): CumulativeReturnComparisonPoint[] => {
  if (priceSeries.length === 0) {
    return [];
  }

  const startingPrice = priceSeries[0]?.close ?? 1;
  const benchmarkStart = buildBenchmarkLevel(seed, 0, priceSeries.length);

  return priceSeries.map((point, index) => {
    const benchmarkLevel = buildBenchmarkLevel(seed, index, priceSeries.length);

    return {
      date: point.date,
      stockCum: Number((((point.close / startingPrice) - 1) * 100).toFixed(2)),
      ivvCum: Number((((benchmarkLevel / benchmarkStart) - 1) * 100).toFixed(2)),
    };
  });
};

const buildNormalizedIndicatorSeries = (
  priceSeries: StockPricePoint[],
  indicators: TickerIndicatorMeta[],
  seed: number,
): IndicatorNormalizedPoint[] => {
  if (priceSeries.length === 0) {
    return [];
  }

  const rawSeriesByIndicator = indicators.map((indicator, index) =>
    priceSeries.map((_, pointIndex) => {
      const progress = pointIndex / Math.max(priceSeries.length - 1, 1);
      const weightInfluence = indicator.weight / 100;
      const baseDrift = 1 + (0.05 + weightInfluence * 0.22 + index * 0.014) * progress;
      const wave =
        Math.sin((pointIndex + seed * 0.03 + index * 2.1) / (4.4 + index * 0.65)) *
          (0.022 + weightInfluence * 0.03) +
        Math.cos((pointIndex + seed * 0.01 + index * 1.3) / (7.1 + index * 0.5)) * 0.011;

      return Math.max(baseDrift + wave, 0.65);
    }),
  );

  return priceSeries.map((point, pointIndex) => {
    const row: IndicatorNormalizedPoint = { date: point.date };

    indicators.forEach((indicator, indicatorIndex) => {
      const startingValue = rawSeriesByIndicator[indicatorIndex]?.[0] ?? 1;
      const currentValue = rawSeriesByIndicator[indicatorIndex]?.[pointIndex] ?? startingValue;
      row[indicator.key] = Number(((currentValue / startingValue) * 100).toFixed(2));
    });

    return row;
  });
};

export const getTickerAnalytics = (
  stock: StockData,
  priceSeries: StockPricePoint[],
): TickerAnalytics => {
  const seed = getTickerSeed(stock.ticker);
  const indicators = buildIndicatorWeights(stock, seed);

  return {
    cumulativeReturns: buildCumulativeReturns(priceSeries, seed),
    indicatorWeights: indicators.map((indicator) => ({
      key: indicator.key,
      indicator: indicator.label,
      weight: indicator.weight,
    })),
    normalizedIndicatorSeries: buildNormalizedIndicatorSeries(priceSeries, indicators, seed),
    indicators,
  };
};
