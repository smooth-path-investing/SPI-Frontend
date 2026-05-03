import { test } from 'node:test';
import * as assert from 'node:assert/strict';
import {
  buildCumulativeReturnsFromSeries,
  getSeriesAlignmentKey,
  mergeNormalizedSeriesWithPrice,
  REBASED_PRICE_SERIES_KEY,
} from '../src/features/stocks/utils/stockDetailChartTransforms';
import type { StockAssetChartSeries } from '../src/features/stocks/api/types';
import type { TickerIndicatorMeta } from '../src/features/stocks/analytics/types';
import type { StockPricePoint } from '../src/features/stocks/types';

const buildAssetSeries = (
  tickerPoints: StockPricePoint[],
  ivvPoints: StockPricePoint[],
): StockAssetChartSeries => ({
  ticker: 'AAPL',
  benchmarkTicker: 'IVV',
  interval: 'quarterly',
  asOf: '2025-01-01',
  tickerPoints,
  ivvPoints,
});

test('buildCumulativeReturnsFromSeries aligns ticker and benchmark by shared dates', () => {
  const result = buildCumulativeReturnsFromSeries(
    buildAssetSeries(
      [
        { date: '2025-01-01', close: 100 },
        { date: '2025-04-01', close: 125 },
        { date: '2025-07-01', close: 150 },
      ],
      [
        { date: '2025-01-01', close: 200 },
        { date: '2025-07-01', close: 250 },
      ],
    ),
  );

  assert.deepEqual(result, [
    { date: '2025-01-01', stockCum: 0, ivvCum: 0 },
    { date: '2025-07-01', stockCum: 50, ivvCum: 25 },
  ]);
});

test('buildCumulativeReturnsFromSeries avoids invalid zero rebasing bases', () => {
  const result = buildCumulativeReturnsFromSeries(
    buildAssetSeries(
      [{ date: '2025-01-01', close: 0 }],
      [{ date: '2025-01-01', close: 200 }],
    ),
  );

  assert.deepEqual(result, []);
});

test('getSeriesAlignmentKey maps ISO dates to calendar quarters', () => {
  assert.equal(getSeriesAlignmentKey('2025-01-01'), '2025-Q1');
  assert.equal(getSeriesAlignmentKey('2025-06-30'), '2025-Q2');
  assert.equal(getSeriesAlignmentKey('FY2025 Q1'), 'FY2025 Q1');
});

test('mergeNormalizedSeriesWithPrice adds a rebased price line aligned by quarter', () => {
  const indicators: TickerIndicatorMeta[] = [
    {
      key: 'marketcap',
      label: 'Market cap',
      weight: 0,
      seriesType: 'indicator',
    },
  ];
  const result = mergeNormalizedSeriesWithPrice(
    [
      { date: '2025-01-15', marketcap: 100 },
      { date: '2025-04-15', marketcap: 110 },
    ],
    indicators,
    [
      { date: '2025-01-01', close: 50 },
      { date: '2025-04-01', close: 75 },
    ],
    'AAPL',
  );

  assert.deepEqual(result.data, [
    { date: '2025-01-15', marketcap: 100, [REBASED_PRICE_SERIES_KEY]: 100 },
    { date: '2025-04-15', marketcap: 110, [REBASED_PRICE_SERIES_KEY]: 150 },
  ]);
  assert.equal(result.indicators[0].key, REBASED_PRICE_SERIES_KEY);
  assert.equal(result.indicators[0].seriesType, 'stock');
  assert.equal(result.indicators[1].key, 'marketcap');
});
