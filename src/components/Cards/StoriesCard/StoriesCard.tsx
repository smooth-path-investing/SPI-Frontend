import type { FC } from 'react';
import { ExternalLink, FileText, type LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface StoriesCardProps {
  title: string;
  description: string;
  actionLabel?: string;
  disabled?: boolean;
  href?: string;
  onActionClick?: () => void;
  icon?: LucideIcon;
  className?: string;
}

const cardClassName =
  'h-full bg-[var(--card-bg)] p-6 sm:p-7 rounded-[var(--radius)] border border-[var(--card-border)] transition-all duration-300 hover:border-[var(--accent)]/70 hover:shadow-[0_10px_30px_rgba(0,0,0,0.24)]';

const actionButtonClassName =
  'w-full border-[var(--card-border)] bg-transparent text-[var(--foreground)] hover:border-[var(--card-hover)] hover:bg-[var(--card-bg)] hover:text-[var(--foreground)]';

export const StoriesCard: FC<StoriesCardProps> = ({
  title,
  description,
  actionLabel = 'View Document',
  disabled = true,
  href,
  onActionClick,
  icon: Icon = FileText,
  className,
}) => {
  const actionContent = (
    <>
      <ExternalLink className="w-4 h-4 mr-2" />
      {actionLabel}
    </>
  );

  return (
    <div className={cn(cardClassName, 'flex flex-col', className)}>
      <div className="flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-[var(--accent)] mr-3" aria-hidden="true" />
        <h3 className="text-lg sm:text-xl font-semibold text-[var(--foreground)]">{title}</h3>
      </div>

      <p className="text-[var(--muted-text)] mb-5 text-center leading-relaxed">{description}</p>

      {href && !disabled ? (
        <Button asChild variant="outline" className={cn(actionButtonClassName, 'mt-auto')}>
          <a href={href} target="_blank" rel="noreferrer noopener">
            {actionContent}
          </a>
        </Button>
      ) : (
        <Button
          type="button"
          variant="outline"
          className={cn(actionButtonClassName, 'mt-auto')}
          disabled={disabled}
          onClick={!disabled ? onActionClick : undefined}
        >
          {actionContent}
        </Button>
      )}
    </div>
  );
};
