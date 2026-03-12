import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import { Home } from './pages/Home';
import { Stocks } from './pages/Stocks';
import { PortfolioDetail } from './pages/PortfolioDetail';
import { StockDetail } from './pages/StockDetail';
import NotFound from './pages/NotFound';
import { Navigation } from './components/navigation/Navigation';

const queryClient = new QueryClient();

const isPortfolioStockDetailRoute = (pathname: string) =>
  /^\/portfolio(?:\/[^/]+)?\/stock\/[^/]+$/.test(pathname);

const AppShell = () => {
  const location = useLocation();
  const hideNavigation = isPortfolioStockDetailRoute(location.pathname);

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
