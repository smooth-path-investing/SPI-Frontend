import type { FC } from 'react';
import type { LucideIcon } from 'lucide-react';

interface MethodologyCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const cardClassName =
  'h-full bg-[var(--card-bg)] border border-[var(--card-border)] p-6 sm:p-8 lg:p-10 rounded-[var(--radius)] transition-all duration-300 hover:border-[var(--accent)]/70 hover:shadow-[0_10px_26px_rgba(0,0,0,0.2)]';

const iconClassName = 'w-10 h-10 sm:w-12 sm:h-12 text-[var(--accent)]';

export const MethodologyCard: FC<MethodologyCardProps> = ({ icon: Icon, title, description }) => {
  return (
    <div className={cardClassName}>
      <div className="flex justify-center mb-4 sm:mb-6">
        <Icon className={iconClassName} aria-hidden="true" />
      </div>

      <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-3 sm:mb-6 text-center">{title}</h3>

      <p className="text-[var(--muted-text)] text-sm sm:text-base lg:text-lg leading-relaxed text-center">
        {description}
      </p>
    </div>
  );
};
