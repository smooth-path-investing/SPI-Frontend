
import React from 'react';
import { Button } from '@/components/ui/button';
import { APPROACH_SECTIONS } from '../constants';

export const Approach: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white pt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Our Approach
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Discover how we combine cutting-edge technology with proven investment principles 
            to identify winning stocks
          </p>
        </div>

        <div className="space-y-16">
          {APPROACH_SECTIONS.map((section, index) => (
            <section key={index} className="bg-gray-900/50 rounded-lg border border-gray-700 overflow-hidden">
              <div className="p-8">
                <div className="flex items-center mb-6">
                  <div className="text-4xl mr-4">{section.icon}</div>
                  <div>
                    <h2 className="text-3xl font-bold text-blue-400">{section.title}</h2>
                    <p className="text-lg text-gray-300 mt-2">{section.description}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-purple-400">Key Features</h3>
                    <ul className="space-y-3">
                      {section.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-start">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span className="text-gray-300">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-center">
                    <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-lg p-8 border border-blue-700/30 text-center">
                      <div className="text-6xl mb-4">{section.icon}</div>
                      <Button variant="outline" className="border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white">
                        View Research Paper
                      </Button>
                      <p className="text-xs text-gray-500 mt-2">Coming Soon</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>

        <div className="mt-16 text-center bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-lg p-8 border border-gray-700">
          <h2 className="text-2xl font-bold mb-4">The Complete Picture</h2>
          <p className="text-gray-300 mb-6 max-w-3xl mx-auto">
            Our three-pillar approach creates a comprehensive view of each stock's potential. 
            By combining quantitative factors, AI-driven insights, and rigorous backtesting, 
            we identify opportunities that others miss.
          </p>
          <div className="flex justify-center space-x-4">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              See Our Performance
            </Button>
            <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
              View All Research
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
