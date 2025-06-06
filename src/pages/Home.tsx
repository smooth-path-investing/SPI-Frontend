
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { StockGraphPlaceholder } from '../components/ui/stock-graph-placeholder';
import { PERFORMANCE_METRICS } from '../constants';

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent">
            Smarter Stock Picks
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            AI-powered investment strategies backed by rigorous backtesting. 
            Transparent methodology, superior performance, designed for everyone.
          </p>
          <Link to="/stocks">
            <Button size="lg" className="text-lg px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
              Explore Our Picks
            </Button>
          </Link>
        </div>
      </section>

      {/* Performance Snapshot */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Proven Performance</h2>
            <p className="text-xl text-gray-400">Our track record speaks for itself</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <StockGraphPlaceholder height="h-80" className="shadow-2xl" />
            </div>
            
            <div className="space-y-6">
              {PERFORMANCE_METRICS.map((metric, index) => (
                <div key={index} className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">{metric.label}</span>
                    <div className="text-right">
                      <div className="text-2xl font-bold">{metric.value}</div>
                      <div className={`text-sm ${metric.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                        {metric.change}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Methodology Preview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Our Methodology</h2>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gray-900 p-8 rounded-lg border border-gray-700">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-semibold mb-4">Factor Models</h3>
              <p className="text-gray-400">Multi-factor quantitative analysis of fundamentals, technicals, and sentiment</p>
            </div>
            <div className="bg-gray-900 p-8 rounded-lg border border-gray-700">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-semibold mb-4">AI Signals</h3>
              <p className="text-gray-400">Machine learning algorithms processing vast market datasets</p>
            </div>
            <div className="bg-gray-900 p-8 rounded-lg border border-gray-700">
              <div className="text-4xl mb-4">📈</div>
              <h3 className="text-xl font-semibold mb-4">Backtested Rules</h3>
              <p className="text-gray-400">Rigorously tested investment rules with 10+ years of validation</p>
            </div>
          </div>
          <Link to="/approach">
            <Button variant="outline" size="lg" className="border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white">
              Learn More About Our Approach
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};
