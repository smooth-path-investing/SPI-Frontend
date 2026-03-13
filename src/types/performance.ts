export interface PerformanceRow {
  date: string;
  day: string;
  spiCum: number;
  ivvCum: number;
  spiVal: number;
  ivvVal: number;
}

export interface OverallPerformanceChartProps {
  data: PerformanceRow[];
  height?: string;
  className?: string;
}

export interface PerformanceTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: PerformanceRow;
  }>;
}

export type TooltipProps = PerformanceTooltipProps;
