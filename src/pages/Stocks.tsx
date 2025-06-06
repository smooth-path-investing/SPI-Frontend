
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { StockModal } from '../components/ui/stock-modal';
import { SAMPLE_STOCKS } from '../constants';
import { IStock } from '../types';

export const Stocks: React.FC = () => {
  const [selectedStock, setSelectedStock] = useState<IStock | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleStockClick = (stock: IStock) => {
    setSelectedStock(stock);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedStock(null);
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Recommended Stocks
          </h1>
          <p className="text-xl text-gray-400">
            Our AI-powered analysis has identified these high-potential opportunities
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SAMPLE_STOCKS.map((stock, index) => (
            <Card 
              key={index} 
              className="bg-gray-900 border-gray-700 hover:border-blue-500 transition-all duration-300 cursor-pointer transform hover:scale-105"
              onClick={() => handleStockClick(stock)}
            >
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-blue-400">{stock.ticker}</h3>
                    <p className="text-gray-400 text-sm">{stock.name}</p>
                  </div>
                  {stock.price && (
                    <div className="text-right">
                      <div className="text-lg font-bold">${stock.price}</div>
                      <div className={`text-sm ${stock.changePercent && stock.changePercent > 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {stock.changePercent && (
                          `${stock.changePercent > 0 ? '+' : ''}${stock.changePercent}%`
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-semibold text-purple-400 mb-2">Key Reasons</h4>
                    <ul className="space-y-1">
                      {stock.reason.slice(0, 2).map((reason, reasonIndex) => (
                        <li key={reasonIndex} className="text-sm text-gray-300 flex items-start">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                          {reason}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-green-400 mb-2">Top Indicators</h4>
                    <div className="flex flex-wrap gap-1">
                      {stock.indicators.slice(0, 2).map((indicator, indicatorIndex) => (
                        <Badge 
                          key={indicatorIndex} 
                          variant="secondary" 
                          className="text-xs bg-green-900/30 text-green-300"
                        >
                          {indicator}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-700">
                  <p className="text-xs text-gray-500 text-center">
                    Click for detailed analysis
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Coming Soon Cards */}
          {Array.from({ length: 9 }).map((_, index) => (
            <Card key={`coming-soon-${index}`} className="bg-gray-900/50 border-gray-700 border-dashed">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4 opacity-50">📈</div>
                <h3 className="text-lg font-semibold text-gray-500 mb-2">Coming Soon</h3>
                <p className="text-sm text-gray-600">
                  More curated picks being analyzed
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center bg-blue-900/20 rounded-lg p-8 border border-blue-700/30">
          <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
          <p className="text-gray-300 mb-6">
            New stock recommendations are added weekly based on our latest analysis
          </p>
          <div className="flex justify-center space-x-4">
            <Badge className="bg-yellow-600 text-yellow-100">
              🔄 Analysis refreshed daily
            </Badge>
            <Badge className="bg-green-600 text-green-100">
              📊 New picks weekly
            </Badge>
            <Badge className="bg-purple-600 text-purple-100">
              🎯 AI-powered selection
            </Badge>
          </div>
        </div>
      </div>

      <StockModal 
        stock={selectedStock} 
        isOpen={isModalOpen} 
        onClose={closeModal} 
      />
    </div>
  );
};
