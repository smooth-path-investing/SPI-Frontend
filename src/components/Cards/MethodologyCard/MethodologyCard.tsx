import type { FC } from 'react';
import type { LucideIcon } from 'lucide-react';

interface MethodologyCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const cardClassName =
  'group relative h-full overflow-hidden rounded-[28px] border border-white/25 bg-gradient-to-b from-[var(--card-bg)] to-black/35 p-6 shadow-[0_14px_32px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[var(--accent)]/70 hover:shadow-[0_22px_42px_rgba(0,0,0,0.24)] sm:p-8 lg:p-10';

const iconClassName = 'w-10 h-10 sm:w-12 sm:h-12 text-[var(--accent)]';

export const MethodologyCard: FC<MethodologyCardProps> = ({ icon: Icon, title, description }) => {
  return (
    <div className={cardClassName}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(250,204,21,0.12),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.04),transparent_44%)] opacity-80 transition-opacity duration-300 group-hover:opacity-100"
      />
      <div className="relative flex justify-center mb-4 sm:mb-6">
        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 transition-all duration-300 group-hover:scale-105 group-hover:border-[var(--accent)]/50 group-hover:bg-[var(--accent)]/14 sm:h-16 sm:w-16">
          <Icon className={iconClassName} aria-hidden="true" />
        </div>
      </div>

      <h3 className="relative mb-3 text-center text-lg font-semibold tracking-tight text-[var(--foreground)] transition-colors duration-300 group-hover:text-[var(--accent-light)] sm:mb-6 sm:text-xl lg:text-2xl">
        {title}
      </h3>

      <p className="relative text-center text-sm leading-relaxed text-[var(--muted-text)] sm:text-base lg:text-lg">
        {description}
      </p>
    </div>
  );
};
