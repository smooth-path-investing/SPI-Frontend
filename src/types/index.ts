
export interface IStock {
  ticker: string;
  name: string;
  reason: string[];
  indicators: string[];
  price?: number;
  change?: number;
  changePercent?: number;
}

export interface IPerformanceMetric {
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
}

export interface IApproachSection {
  title: string;
  description: string;
  icon: string;
  details: string[];
}

export interface INavItem {
  label: string;
  href: string;
}
