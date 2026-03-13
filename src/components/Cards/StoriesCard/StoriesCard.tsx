import type { FC } from 'react';
import { FileText, type LucideIcon } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface StoriesCardProps {
  title: string;
  description: string;
  icon?: LucideIcon;
  className?: string;
}

const cardClassName =
  'relative h-full overflow-hidden rounded-[28px] border border-[var(--card-border)] bg-gradient-to-b from-[var(--card-bg)] to-black/35 p-6 shadow-[0_14px_32px_rgba(0,0,0,0.18)] transition-all duration-300 hover:border-[var(--accent)]/70 hover:shadow-[0_18px_38px_rgba(0,0,0,0.24)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/60 sm:p-7';

const tooltipClassName =
  'max-w-sm sm:max-w-md border-2 border-[var(--accent)]/80 bg-[var(--card-bg)] px-4 py-3 text-[15px] sm:text-base leading-relaxed text-[var(--foreground)] shadow-[0_0_0_1px_rgba(234,179,8,0.25)]';

export const StoriesCard: FC<StoriesCardProps> = ({
  title,
  description,
  icon: Icon = FileText,
  className,
}) => {
  return (
    <Tooltip delayDuration={120}>
      <TooltipTrigger asChild>
        <button
          type="button"
          className={cn(cardClassName, 'flex h-full w-full cursor-help flex-col justify-center text-left', className)}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(250,204,21,0.12),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.04),transparent_44%)]"
          />
          <div className="relative flex items-center justify-center">
            <div className="mr-3 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10">
              <Icon className="h-5 w-5 text-[var(--accent)]" aria-hidden="true" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-[var(--foreground)]">
              {title}
            </h3>
          </div>
        </button>
      </TooltipTrigger>
      <TooltipContent className={tooltipClassName} side="top" sideOffset={6}>
        <p>{description}</p>
      </TooltipContent>
    </Tooltip>
  );
};
