import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import { DevModePanel } from './components/dev/DevModePanel';
import { Home } from './pages/Home';
import { Stocks } from './pages/Stocks';
import { PortfolioDetail } from './pages/PortfolioDetail';
import { StockDetail } from './pages/StockDetail';
import NotFound from './pages/NotFound';
import { Navigation } from './components/navigation/Navigation';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen w-full bg-black overflow-x-hidden">
            <Navigation />
            <DevModePanel />
            <main className="pt-16">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/stocks" element={<Stocks />} />
                <Route path="/portfolio/:portfolioId" element={<PortfolioDetail />} />
                <Route path="/portfolio/:portfolioId/stock/:ticker" element={<StockDetail />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
