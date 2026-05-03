import { Component, Suspense, lazy, type ReactNode } from 'react';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navigation } from '@/components/navigation/Navigation';
import { AuthProvider } from '@/features/auth';
import { isPortfolioStockDetailPath } from '@/features/stocks';

const Home = lazy(() => import('@/pages/Home').then((module) => ({ default: module.Home })));
const NotFound = lazy(() => import('@/pages/NotFound'));
const PortfolioDetail = lazy(() =>
  import('@/pages/PortfolioDetail').then((module) => ({ default: module.PortfolioDetail })),
);
const StockDetail = lazy(() =>
  import('@/pages/StockDetail').then((module) => ({ default: module.StockDetail })),
);
const Stocks = lazy(() => import('@/pages/Stocks').then((module) => ({ default: module.Stocks })));

// Keep one React Query client for the lifetime of the SPA.
const queryClient = new QueryClient();

interface AppErrorBoundaryState {
  hasError: boolean;
}

class AppErrorBoundary extends Component<{ children: ReactNode }, AppErrorBoundaryState> {
  readonly state = { hasError: false };

  static getDerivedStateFromError(): AppErrorBoundaryState {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-background px-4 text-foreground">
          <div className="w-full max-w-md rounded-[28px] border border-white/15 bg-[var(--card-bg)] px-6 py-7 text-center shadow-[0_24px_60px_rgba(0,0,0,0.35)]">
            <p className="text-[11px] uppercase tracking-[0.16em] text-[var(--accent)]">
              Smooth Path Investing
            </p>
            <h1 className="mt-3 text-2xl font-semibold text-white">Something went wrong</h1>
            <p className="mt-3 text-sm leading-6 text-[var(--muted-text)]">
              The app hit an unexpected issue. Reloading usually restores the session.
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-6 inline-flex h-11 items-center justify-center rounded-md border border-[var(--accent)] bg-[var(--accent)] px-5 text-sm font-semibold text-black transition-colors hover:bg-[var(--accent-light)]"
            >
              Reload app
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const RouteLoadingFallback = () => (
  <div className="flex min-h-[60vh] items-center justify-center px-4 text-foreground">
    <div className="w-full max-w-sm rounded-[28px] border border-white/15 bg-[var(--card-bg)] px-6 py-7 text-center shadow-[0_20px_48px_rgba(0,0,0,0.26)]">
      <div className="mx-auto h-10 w-10 animate-pulse rounded-full border border-[var(--accent)]/45 bg-[var(--accent)]/15" />
      <p className="mt-4 text-sm font-medium text-white">Loading SPI experience</p>
      <p className="mt-2 text-xs leading-5 text-[var(--muted-text)]">
        Preparing the latest route.
      </p>
    </div>
  </div>
);

const AppShell = () => {
  const location = useLocation();
  // Portfolio stock detail pages intentionally render full-bleed without the global nav.
  const hideNavigation = isPortfolioStockDetailPath(location.pathname);

  return (
    <div className="min-h-screen w-full bg-black overflow-x-hidden">
      {!hideNavigation && <Navigation />}
      <main className={hideNavigation ? '' : 'pt-16'}>
        <Suspense fallback={<RouteLoadingFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/stock" element={<Stocks />} />
            <Route path="/stock/:ticker" element={<StockDetail />} />
            <Route path="/stocks" element={<Stocks />} />
            <Route path="/portfolio" element={<PortfolioDetail />} />
            <Route path="/portfolio/stock/:ticker" element={<StockDetail />} />
            <Route path="/portfolio/:portfolioId" element={<PortfolioDetail />} />
            <Route path="/portfolio/:portfolioId/stock/:ticker" element={<StockDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          <AppErrorBoundary>
            <AppShell />
          </AppErrorBoundary>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
