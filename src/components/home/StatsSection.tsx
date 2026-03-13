import React from 'react';
import { Search, Settings, Shield, Smartphone, Users, type LucideIcon } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
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
    <section
      className="
        relative overflow-visible py-20 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 bg-[var(--background)] text-[var(--foreground)]
      "
    >
      <div className="max-w-7xl mx-auto stats-content">
        <TooltipProvider delayDuration={300} skipDelayDuration={100}>
          <div className="flex flex-col items-center gap-6 sm:gap-8">
            {/* Mobile cards */}
            <div className="md:hidden w-full grid grid-cols-1 gap-3">
              {FOOTER_STATS.map((stat, index) => {
                const Icon = footerStatIconMap[stat.icon];
                return (
                  <article
                    key={index}
                    className="
                      relative overflow-hidden rounded-[24px] border border-[var(--card-border)] bg-gradient-to-b from-[var(--card-bg)] to-black/35 px-4 py-3.5 shadow-[0_14px_32px_rgba(0,0,0,0.18)]
                    "
                  >
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(250,204,21,0.12),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.04),transparent_44%)]"
                    />
                    <div className="flex items-center gap-2.5 mb-2">
                      <Icon className="w-4 h-4 text-[var(--accent)] flex-shrink-0" />
                      <h3 className="font-semibold text-sm tracking-wide text-[var(--foreground)]">
                        {stat.title}
                      </h3>
                    </div>
                    <p className="text-xs leading-relaxed text-[var(--muted-text)]">
                      {stat.description}
                    </p>
                  </article>
                );
              })}
            </div>

            {/* Desktop pills */}
            <div className="hidden md:flex flex-wrap justify-center gap-4 sm:gap-6">
              {FOOTER_STATS.map((stat, index) => {
                const Icon = footerStatIconMap[stat.icon];
                return (
                  <Tooltip key={index}>
                    <TooltipTrigger asChild>
                      <div
                        className="
                          flex cursor-help items-center gap-2 rounded-full border border-[var(--card-border)] bg-gradient-to-b from-[var(--card-bg)] to-black/35 px-5 py-2.5 shadow-[0_14px_26px_rgba(0,0,0,0.16)] transition-all duration-300 hover:border-[var(--accent)] hover:shadow-[0_0_18px_rgba(250,204,21,0.18)]
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
    </section>
  );
};
