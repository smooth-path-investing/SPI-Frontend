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
  'h-full bg-[var(--card-bg)] p-6 sm:p-7 rounded-[var(--radius)] border border-[var(--card-border)] transition-all duration-300 hover:border-[var(--accent)]/70 hover:shadow-[0_10px_30px_rgba(0,0,0,0.24)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/60';

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
          <div className="flex items-center justify-center">
            <Icon className="w-8 h-8 text-[var(--accent)] mr-3 shrink-0" aria-hidden="true" />
            <h3 className="text-lg sm:text-xl font-semibold text-[var(--foreground)]">
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
