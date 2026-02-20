import React from 'react';
import { Search, Settings, Shield, Smartphone, Users, type LucideIcon } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ScrollSection } from '../animations/scrollSection';
import { FOOTER_STATS, type FooterStatIconKey } from '@/constants/footerStats';

const footerStatIconMap: Record<FooterStatIconKey, LucideIcon> = {
  settings: Settings,
  shield: Shield,
  users: Users,
  search: Search,
  smartphone: Smartphone,
};

export const StatsSection: React.FC = () => {
  return (
    <ScrollSection
      className="
        relative
        overflow-visible
        py-16
        px-4 sm:px-6 lg:px-8
        bg-[var(--background)]
        text-[var(--foreground)]
      "
      triggerClass="stats-content"
    >
      <div className="max-w-7xl mx-auto stats-content">
        <TooltipProvider delayDuration={300} skipDelayDuration={100}>
          <div className="flex flex-col items-center gap-8">
            {/* Pills */}
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              {FOOTER_STATS.map((stat, index) => {
                const Icon = footerStatIconMap[stat.icon];
                return (
                <Tooltip key={index}>
                  <TooltipTrigger asChild>
                    <div
                      className="
                        flex items-center gap-2
                        cursor-help
                        px-5 py-2.5
                        border border-[var(--card-border)]
                        rounded-full
                        bg-[var(--card-bg)]
                        transition-all duration-300
                        hover:border-[var(--accent)]
                        hover:shadow-[0_0_15px_var(--accent)]
                        hover:scale-105
                      "
                    >
                      <div className="flex-shrink-0 flex items-center justify-center">
                        <Icon className="w-4 h-4 text-[var(--accent)]" />
                      </div>

                      <span className="font-medium text-sm tracking-wide">{stat.title}</span>
                    </div>
                  </TooltipTrigger>

                  <TooltipContent
                    side="top"
                    className="
                      max-w-xs
                      z-[9999]
                      bg-[var(--card-bg)]
                      border border-[var(--card-border)]
                      text-[var(--muted-text)]
                      rounded-[var(--radius)]
                      shadow-xl
                    "
                  >
                    <p className="text-sm leading-relaxed">{stat.description}</p>
                  </TooltipContent>
                </Tooltip>
                );
              })}
            </div>

            {/* Disclaimer */}
            <div className="text-center">
              <span className="text-xs text-[var(--muted-text)] opacity-80">
                * Past performance does not guarantee future results *
              </span>
            </div>
          </div>
        </TooltipProvider>
      </div>
    </ScrollSection>
  );
};
