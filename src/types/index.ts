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

export interface User {
  id: string;
  name: string;
  email: string;
  plan: 'free' | 'pro' | 'elite';
  isPremium: boolean;
}

export interface ITeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  portfolio: {
    description: string;
    achievements: string[];
    experience: string[];
    websites: {
      label: string;
      url: string;
    }[];
  };
}

export interface PerformanceChartProps {
  height?: string;
  className?: string;
}

export interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email: string, password: string) => void;
  onSignup: (email: string, password: string, firstName: string, lastName: string) => void;
}
