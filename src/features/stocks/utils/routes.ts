export const DEFAULT_PORTFOLIO_ID = 'long-contrarian';

const PORTFOLIO_STOCK_DETAIL_PATTERN = /^\/portfolio(?:\/[^/]+)?\/stock\/[^/]+$/;

export const isPortfolioStockDetailPath = (pathname: string) =>
  PORTFOLIO_STOCK_DETAIL_PATTERN.test(pathname);

export const isStockPreviewDetailPath = (pathname: string) => pathname.startsWith('/stock/');

export const isStockInvestingPath = (pathname: string) =>
  pathname === '/stock' ||
  pathname.startsWith('/stock/') ||
  pathname === '/portfolio' ||
  pathname.startsWith('/portfolio/');

export const buildPortfolioStockDetailPath = (portfolioId: string, ticker: string) =>
  portfolioId === DEFAULT_PORTFOLIO_ID
    ? `/portfolio/stock/${ticker}`
    : `/portfolio/${portfolioId}/stock/${ticker}`;

export const getStockDetailBackPath = (pathname: string, portfolioId: string) =>
  isStockPreviewDetailPath(pathname)
    ? '/stock'
    : portfolioId === DEFAULT_PORTFOLIO_ID
      ? '/portfolio'
      : `/portfolio/${portfolioId}`;

export const getStockDetailBackLabel = (pathname: string) =>
  isStockPreviewDetailPath(pathname) ? 'Back to Stocks' : 'Back to Portfolio';
