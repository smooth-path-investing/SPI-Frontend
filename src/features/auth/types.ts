import type { ReactNode } from 'react';

export type UserPlan = 'free' | 'pro' | 'elite';

export interface User {
  id: string;
  name: string;
  email: string;
  plan: UserPlan;
  isPremium: boolean;
}

export type OfferType = 'tickers' | 'hf';

export interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email: string, password: string) => void;
  onSignup: (email: string, password: string, firstName: string, lastName: string) => void;
}

export interface AuthProviderProps {
  children: ReactNode;
}

export interface AuthContextValue {
  user: User | null;
  login: (email: string, password: string) => void;
  signup: (email: string, password: string, firstName: string, lastName: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  canAccessPremiumStocks: () => boolean;
  purchasedPortfolios: string[];
  hasPurchasedPortfolio: (portfolioId: string) => boolean;
  purchaseOffer: (offerId: OfferType, portfolioId: string) => void;
  togglePortfolioPurchase: (portfolioId: string) => void;
}

export type AuthMode = 'signup' | 'login';
export type AuthErrorMap = Record<string, string>;

export interface LoginFormValues {
  email: string;
  password: string;
}

export interface SignupFormValues {
  fullName: string;
  email: string;
  password: string;
}
