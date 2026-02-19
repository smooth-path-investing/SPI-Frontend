import type { FC } from 'react';
import type { LucideIcon } from 'lucide-react';

interface MethodologyCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const cardClassName =
  'bg-[var(--card-bg)] border border-[var(--card-border)] p-6 sm:p-8 lg:p-12 rounded-[var(--radius)] transition-all duration-300 transform hover:scale-105 hover:border-[var(--card-hover)] hover:shadow-[0_0_30px_var(--card-hover)]';

const iconClassName = 'w-10 h-10 sm:w-12 sm:h-12 text-[var(--accent)]';

export const MethodologyCard: FC<MethodologyCardProps> = ({ icon: Icon, title, description }) => {
  return (
    <div className={cardClassName}>
      <div className="flex justify-center mb-4 sm:mb-6">
        <Icon className={iconClassName} aria-hidden="true" />
      </div>

      <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-3 sm:mb-6 text-center">{title}</h3>

      <p className="text-[var(--muted-text)] text-sm sm:text-base lg:text-lg leading-relaxed">
        {description}
      </p>
    </div>
  );
};
