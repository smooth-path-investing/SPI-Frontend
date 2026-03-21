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
        relative overflow-visible px-4 pt-16 pb-7 sm:px-6 sm:pt-20 sm:pb-9 lg:px-8 lg:pt-24 lg:pb-10 bg-[var(--background)] text-[var(--foreground)]
      "
    >
      <div className="max-w-7xl mx-auto stats-content">
        <TooltipProvider delayDuration={300} skipDelayDuration={100}>
          <div className="flex flex-col items-center gap-5 sm:gap-6">
            {/* Mobile cards */}
            <div className="md:hidden w-full grid grid-cols-1 gap-2.5">
              {FOOTER_STATS.map((stat, index) => {
                const Icon = footerStatIconMap[stat.icon];
                return (
                  <article
                    key={index}
                    className="
                      group relative overflow-hidden rounded-[24px] border border-white/25 bg-gradient-to-b from-[var(--card-bg)] to-black/35 px-4 py-3 shadow-[0_14px_32px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent)]/65 hover:shadow-[0_18px_38px_rgba(0,0,0,0.22)]
                    "
                  >
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(250,204,21,0.12),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.04),transparent_44%)] opacity-80 transition-opacity duration-300 group-hover:opacity-100"
                    />
                    <div className="flex items-center gap-2.5 mb-2">
                      <Icon className="h-4 w-4 flex-shrink-0 text-[var(--accent)] transition-transform duration-300 group-hover:scale-110" />
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
            <div className="hidden md:flex flex-wrap justify-center gap-3 sm:gap-4">
              {FOOTER_STATS.map((stat, index) => {
                const Icon = footerStatIconMap[stat.icon];
                return (
                  <Tooltip key={index}>
                    <TooltipTrigger asChild>
                      <div
                        className="
                          group flex cursor-help items-center gap-1.5 rounded-full border border-[var(--card-border)] bg-gradient-to-b from-[var(--card-bg)] to-black/35 px-4 py-2 shadow-[0_12px_22px_rgba(0,0,0,0.16)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--accent)] hover:shadow-[0_0_16px_rgba(250,204,21,0.18)]
                        "
                      >
                        <div className="flex-shrink-0 flex items-center justify-center">
                          <Icon className="h-3.5 w-3.5 text-[var(--accent)] transition-transform duration-300 group-hover:scale-110" />
                        </div>

                        <span className="text-xs font-medium tracking-wide">{stat.title}</span>
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
              <span className="text-[11px] text-[var(--muted-text)] opacity-80">
                * Past performance does not guarantee future results *
              </span>
            </div>
          </div>
        </TooltipProvider>
      </div>
    </section>
  );
};
