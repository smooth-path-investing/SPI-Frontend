import React from 'react';

interface MetricRowProps {
  label: string;
  value: string | React.ReactNode;
  hasBorder?: boolean;
  valueClassName?: string;
}

export const MetricRow: React.FC<MetricRowProps> = ({
  label,
  value,
  hasBorder = true,
  valueClassName = 'font-semibold text-[var(--foreground)]'
}) => {
  return (
    <div className={`flex justify-between py-3 ${hasBorder ? 'border-b border-[var(--card-border)]' : ''}`}>
      <span className="text-[var(--muted-text)]">{label}</span>
      {typeof value === 'string' ? (
        <span className={valueClassName}>{value}</span>
      ) : (
        value
      )}
    </div>
  );
};
