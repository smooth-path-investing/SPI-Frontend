import type { FC } from 'react';
import { Activity, Binary, BrainCircuit, Layers, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { StoryCardIconKey } from '@/constants/storyCards';

interface StoriesCardProps {
  label: string;
  title: string;
  description: string;
  icon?: StoryCardIconKey;
  className?: string;
}

const storyCardIconMap: Record<StoryCardIconKey, LucideIcon> = {
  layers: Layers,
  binary: Binary,
  'brain-circuit': BrainCircuit,
  activity: Activity,
};

const cardClassName =
  'group relative h-full overflow-hidden rounded-[28px] border border-white/25 bg-gradient-to-b from-[var(--card-bg)] to-black/35 p-6 shadow-[0_14px_32px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent)]/70 hover:shadow-[0_22px_42px_rgba(0,0,0,0.24)] sm:p-7';

export const StoriesCard: FC<StoriesCardProps> = ({
  label,
  title,
  description,
  icon = 'layers',
  className,
}) => {
  const Icon = storyCardIconMap[icon];

  return (
    <article className={cn(cardClassName, 'flex h-full flex-col text-left', className)}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(250,204,21,0.12),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.04),transparent_44%)] opacity-80 transition-opacity duration-300 group-hover:opacity-100"
      />

      <div className="relative flex items-start gap-3 sm:gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 transition-all duration-300 group-hover:scale-105 group-hover:border-[var(--accent)]/50 group-hover:bg-[var(--accent)]/14">
          <Icon className="h-5 w-5 text-[var(--accent)]" aria-hidden="true" />
        </div>

        <div className="min-w-0 flex-1 space-y-2">
          <span className="inline-flex rounded-full border border-[var(--accent)]/35 bg-[var(--accent)]/10 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.14em] text-[var(--accent)]">
            {label}
          </span>
          <h3 className="text-lg font-semibold tracking-tight text-[var(--foreground)] transition-colors duration-300 group-hover:text-[var(--accent-light)] sm:text-xl">
            {title}
          </h3>
        </div>
      </div>

      <p className="relative mt-4 text-sm leading-relaxed text-[var(--muted-text)] sm:mt-5 sm:text-base sm:leading-7">
        {description}
      </p>
    </article>
  );
};
