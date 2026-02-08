import React from 'react';
import { Shield, Users, Search, Smartphone, Settings } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ScrollSection } from '../animations/scrollSection';


const footerStats = [
  {
    title: 'Dynamic Management',
    description:
      'Ramy Sukarieh trades the exact same stock recommendations with his own capital and instantly relays every move via our AI, Ras.',
    icon: <Settings className="w-4 h-4" />,
  },
  {
    title: 'Risk-aligned Strategy',
    description:
      'We only use hyper-liquid universes (S&P 500, IWM, …) and cap tracking error to a pre-set band (6–12%).',
    icon: <Shield className="w-4 h-4" />,
  },
  {
    title: 'Independence & Acceptance',
    description:
      'Proprietary SigGA model built in-house. Once we’re in, we stay in — and double down when the market gives us the chance.',
    icon: <Users className="w-4 h-4" />,
  },
  {
    title: 'Full Transparency',
    description:
      'Methodology, live positions, performance, and the original academic papers (downloadable on the Approach page).',
    icon: <Search className="w-4 h-4" />,
  },
  {
    title: 'No Upselling',
    description:
      'Research + experience matter. Clear plan pricing, zero hidden costs, no nonsense — ever.',
    icon: <Shield className="w-4 h-4" />,
  },
  {
    title: 'Mobile First',
    description:
      'Designed from day one to be fast and beautiful on your phone — no zooming, no clutter.',
    icon: <Smartphone className="w-4 h-4" />,
  },
];

export const StatsSection: React.FC = () => {
  return (
    <ScrollSection
      className="relative overflow-visible py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background/50 to-background"
      triggerClass="stats-content"
    >
      <div className="max-w-7xl mx-auto stats-content">
        <TooltipProvider delayDuration={300} skipDelayDuration={100}>
          <div className="flex flex-col items-center gap-6">
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              {footerStats.map((stat, index) => (
                <Tooltip key={index}>
                  <TooltipTrigger asChild>
                    <div className="flex items-center gap-2 cursor-help px-4 py-2 border rounded-full hover:bg-muted transition-colors">
                      <div className="flex-shrink-0 flex items-center justify-center">
                        {stat.icon}
                      </div>
                      <div className="text-center sm:text-left">
                        <span className="font-medium text-sm">{stat.title}</span>
                      </div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="max-w-xs z-[9999]">
                    <p>{stat.description}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
            <div className="text-center mt-4">
              <span className="text-xs opacity-80">
                * Past performance does not guarantee future results
              </span>
            </div>
          </div>
        </TooltipProvider>
      </div>
    </ScrollSection>
  );
};
