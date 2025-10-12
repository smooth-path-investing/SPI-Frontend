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
  valueClassName = 'font-semibold'
}) => {
  return (
    <div className={`flex justify-between py-3 ${hasBorder ? 'border-b border-border' : ''}`}>
      <span className="text-muted-foreground">{label}</span>
      {typeof value === 'string' ? (
        <span className={valueClassName}>{value}</span>
      ) : (
        value
      )}
    </div>
  );
};
