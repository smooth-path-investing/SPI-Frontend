import React from 'react';
import { Shield, Users, Search, Smartphone, Sparkles } from 'lucide-react';
import { textContent } from '@/constants/textContent';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const StatsSection: React.FC = () => {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background/50 to-background">
      <div className="max-w-7xl mx-auto">
        <TooltipProvider delayDuration={300} skipDelayDuration={100}>
          <div className="flex flex-col items-center justify-center gap-4 text-sm text-muted-foreground animate-fade-in">
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-2 cursor-help">
                    <Shield className="w-4 h-4" />
                    <span>{textContent["home-stats-trust-backtested"]}</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-xs z-50">
                  <p>{textContent["home-stats-trust-backtested-tooltip"]}</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-2 cursor-help">
                    <Users className="w-4 h-4" />
                    <span>{textContent["home-stats-trust-portfolios"]}</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-xs z-50">
                  <p>{textContent["home-stats-trust-portfolios-tooltip"]}</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-2 cursor-help">
                    <Search className="w-4 h-4" />
                    <span>{textContent["home-trust-transparency-title"]}</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-xs z-50">
                  <p>{textContent["home-trust-transparency-tooltip"]}</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-2 cursor-help">
                    <Shield className="w-4 h-4" />
                    <span>{textContent["home-trust-upselling-title"]}</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-xs z-50">
                  <p>{textContent["home-trust-upselling-tooltip"]}</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-2 cursor-help">
                    <Smartphone className="w-4 h-4" />
                    <span>{textContent["home-trust-mobile-title"]}</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-xs z-50">
                  <p>{textContent["home-trust-mobile-tooltip"]}</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-2 cursor-help">
                    <Sparkles className="w-4 h-4" />
                    <span>{textContent["home-trust-design-title"]}</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-xs z-50">
                  <p>{textContent["home-trust-design-tooltip"]}</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="text-center">
              <span className="text-xs opacity-80">{textContent["home-stats-trust-disclaimer"]}</span>
            </div>
          </div>
        </TooltipProvider>
      </div>
    </section>
  );
};