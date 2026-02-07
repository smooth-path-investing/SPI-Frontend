export interface INavItem {
  label: string;
  href: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  plan: 'free' | 'pro' | 'elite';
  isPremium: boolean;
}

export interface OverallPerformanceChartProps {
  data: PerformanceRow[];
  height?: string;
  className?: string;
}

export interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email: string, password: string) => void;
  onSignup: (email: string, password: string, firstName: string, lastName: string) => void;
}

export interface PerformanceRow {
  date: string;
  day: string;
  spiCum: number;
  ivvCum: number;
  spiVal: number;
  ivvVal: number;
}

export interface TooltipProps {
  active?: boolean;
  payload?: {
    payload: PerformanceRow;
  }[];
}
