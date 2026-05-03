import { test } from 'node:test';
import * as assert from 'node:assert/strict';
import {
  buildPortfolioStockDetailPath,
  DEFAULT_PORTFOLIO_ID,
  getStockDetailBackLabel,
  getStockDetailBackPath,
  isPortfolioStockDetailPath,
  isStockInvestingPath,
  isStockPreviewDetailPath,
} from '../src/features/stocks/utils/routes';
import {
  formatChartLongDate,
  formatChartShortDate,
  formatCoverageDate,
} from '../src/features/stocks/utils/date';

test('stock route helpers classify preview and portfolio detail paths', () => {
  assert.equal(isStockPreviewDetailPath('/stock/AAPL'), true);
  assert.equal(isPortfolioStockDetailPath('/portfolio/stock/AAPL'), true);
  assert.equal(isPortfolioStockDetailPath('/portfolio/long-contrarian/stock/AAPL'), true);
  assert.equal(isPortfolioStockDetailPath('/portfolio/long-contrarian'), false);
  assert.equal(isStockInvestingPath('/portfolio/long-contrarian/stock/AAPL'), true);
});

test('stock route helpers build stable back links', () => {
  assert.equal(buildPortfolioStockDetailPath(DEFAULT_PORTFOLIO_ID, 'AAPL'), '/portfolio/stock/AAPL');
  assert.equal(
    buildPortfolioStockDetailPath('short-contrarian', 'AAPL'),
    '/portfolio/short-contrarian/stock/AAPL',
  );
  assert.equal(getStockDetailBackPath('/stock/AAPL', DEFAULT_PORTFOLIO_ID), '/stock');
  assert.equal(getStockDetailBackPath('/portfolio/stock/AAPL', DEFAULT_PORTFOLIO_ID), '/portfolio');
  assert.equal(
    getStockDetailBackPath('/portfolio/short-contrarian/stock/AAPL', 'short-contrarian'),
    '/portfolio/short-contrarian',
  );
  assert.equal(getStockDetailBackLabel('/stock/AAPL'), 'Back to Stocks');
  assert.equal(getStockDetailBackLabel('/portfolio/stock/AAPL'), 'Back to Portfolio');
});

test('date helpers format ISO labels in UTC and preserve non-ISO labels', () => {
  assert.equal(formatChartShortDate('2025-01-15'), 'Jan 15');
  assert.equal(formatChartLongDate('2025-01-15'), 'Jan 15, 2025');
  assert.equal(formatCoverageDate('2025-01-15'), 'Jan 15, 2025');
  assert.equal(formatChartLongDate('FY2025 Q1'), 'FY2025 Q1');
});
