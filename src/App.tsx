import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navigation } from '@/components/navigation/Navigation';
import { AuthProvider } from '@/features/auth';
import { isPortfolioStockDetailPath } from '@/features/stocks';
import { Home } from '@/pages/Home';
import NotFound from '@/pages/NotFound';
import { PortfolioDetail } from '@/pages/PortfolioDetail';
import { StockDetail } from '@/pages/StockDetail';
import { Stocks } from '@/pages/Stocks';

// Keep one React Query client for the lifetime of the SPA.
const queryClient = new QueryClient();

const AppShell = () => {
  const location = useLocation();
  // Portfolio stock detail pages intentionally render full-bleed without the global nav.
  const hideNavigation = isPortfolioStockDetailPath(location.pathname);

  return (
    <div className="min-h-screen w-full bg-black overflow-x-hidden">
      {!hideNavigation && <Navigation />}
      {/* <DevModePanel /> */}
      <main className={hideNavigation ? '' : 'pt-16'}>
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
          <AppShell />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
