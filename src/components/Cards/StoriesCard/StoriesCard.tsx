import type { FC } from 'react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface StoriesCardProps {
  index: number;
  title: string;
  description: string;
  className?: string;
}

const cardClassName =
  'group relative h-full min-h-[200px] sm:min-h-[220px] overflow-hidden rounded-[var(--radius)] border border-[var(--card-border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(0,0,0,0.18))] p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent)]/70 hover:shadow-[0_18px_36px_rgba(0,0,0,0.26)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/60';

const tooltipClassName =
  'max-w-sm sm:max-w-md border-2 border-[var(--accent)]/80 bg-[var(--card-bg)] px-4 py-3 text-[15px] sm:text-base leading-relaxed text-[var(--foreground)] shadow-[0_0_0_1px_rgba(234,179,8,0.25)]';

export const StoriesCard: FC<StoriesCardProps> = ({
  index,
  title,
  description,
  className,
}) => {
  return (
    <Tooltip delayDuration={100}>
      <TooltipTrigger asChild>
        <button type="button" className={cn(cardClassName, 'w-full cursor-help text-left', className)}>
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/[0.07] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100" />

          <div className="relative flex h-full flex-col justify-between">
            <div className="flex items-center justify-between gap-4">
              <span className="text-[11px] uppercase tracking-[0.14em] text-[var(--muted-text)]">
                Research {String(index + 1).padStart(2, '0')}
              </span>
              <span className="h-px flex-1 bg-gradient-to-r from-[var(--accent)]/35 to-transparent" />
            </div>

            <div className="py-7 sm:py-8">
              <h3 className="max-w-[24rem] text-left text-xl sm:text-2xl lg:text-[1.9rem] font-semibold leading-[1.15] text-[var(--accent)] text-balance">
                {title}
              </h3>
            </div>

            <div className="flex items-center justify-between gap-3 text-xs sm:text-sm text-[var(--muted-text)]">
              <span>Hover to preview summary</span>
              <span className="text-[var(--accent)] transition-transform duration-300 group-hover:translate-x-1 group-focus-visible:translate-x-1">
                →
              </span>
            </div>
          </div>
        </button>
      </TooltipTrigger>
      <TooltipContent className={tooltipClassName} side="top" sideOffset={10}>
        <p className="mb-1.5 text-xs uppercase tracking-[0.12em] text-[var(--accent)]">
          {title}
        </p>
        <p>{description}</p>
      </TooltipContent>
    </Tooltip>
  );
};
