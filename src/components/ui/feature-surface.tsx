import * as React from 'react';
import { cn } from '@/lib/utils';

interface FeatureSurfaceProps extends React.HTMLAttributes<HTMLDivElement> {
  contentClassName?: string;
}

const FEATURE_SURFACE_CLASS_NAME =
  'relative w-full overflow-hidden rounded-[28px] border border-white/25 bg-gradient-to-b from-[var(--card-bg)] to-black/40 shadow-[0_20px_42px_rgba(0,0,0,0.24)]';

export const FeatureSurface = React.forwardRef<HTMLDivElement, FeatureSurfaceProps>(
  ({ className, contentClassName, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(FEATURE_SURFACE_CLASS_NAME, className)} {...props}>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(250,204,21,0.14),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.05),transparent_42%)]"
        />
        <div className={cn('relative', contentClassName)}>{children}</div>
      </div>
    );
  },
);
FeatureSurface.displayName = 'FeatureSurface';

interface AccentPillProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}

export const AccentPill: React.FC<AccentPillProps> = ({ className, children, ...props }) => {
  return (
    <span
      className={cn(
        'inline-flex w-fit items-center rounded-full border border-[var(--accent)]/35 bg-[var(--accent)]/10 px-3 py-1 text-[11px] uppercase tracking-[0.12em] text-[var(--accent)]',
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
};
