
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  plan: 'free' | 'pro' | 'elite';
  isPremium: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => void;
  signup: (email: string, password: string, name: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  canAccessPremiumStocks: () => boolean;
  purchasedPortfolios: string[];
  hasPurchasedPortfolio: (portfolioId: string) => boolean;
  togglePortfolioPurchase: (portfolioId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [purchasedPortfolios, setPurchasedPortfolios] = useState<string[]>(() => {
    const stored = localStorage.getItem('purchasedPortfolios');
    return stored ? JSON.parse(stored) : [];
  });

  const login = (email: string, password: string) => {
    // Mock login - in real app, this would call your auth API
    console.log('Mock login:', email, password);
    // For demo purposes, let's vary the plan based on email
    const plan: 'free' | 'pro' | 'elite' = email.includes('pro') ? 'pro' : email.includes('elite') ? 'elite' : 'free';
    setUser({
      id: '1',
      name: 'Demo User',
      email: email,
      plan: plan,
      isPremium: plan === 'pro' || plan === 'elite'
    });
  };

  const signup = (email: string, password: string, name: string) => {
    // Mock signup - in real app, this would call your auth API
    console.log('Mock signup:', email, password, name);
    // For demo purposes, let's vary the plan based on email
    const plan: 'free' | 'pro' | 'elite' = email.includes('pro') ? 'pro' : email.includes('elite') ? 'elite' : 'free';
    setUser({
      id: '1',
      name: name,
      email: email,
      plan: plan,
      isPremium: plan === 'pro' || plan === 'elite'
    });
  };

  const logout = () => {
    setUser(null);
  };

  const isAuthenticated = !!user;

  // For debugging purposes, allow access if the toggle is enabled
  const canAccessPremiumStocks = () => {
    if (!isAuthenticated) return false;
    
    const showPremiumStocks = localStorage.getItem('showPremiumStocks') === 'true';
    const isPremiumUser = user?.plan === 'pro' || user?.plan === 'elite';
    
    // Allow access if user is premium OR if debug toggle is enabled
    return isPremiumUser || showPremiumStocks;
  };

  const hasPurchasedPortfolio = (portfolioId: string) => {
    return purchasedPortfolios.includes(portfolioId);
  };

  const togglePortfolioPurchase = (portfolioId: string) => {
    setPurchasedPortfolios(prev => {
      const newPurchased = prev.includes(portfolioId)
        ? prev.filter(id => id !== portfolioId)
        : [...prev, portfolioId];
      localStorage.setItem('purchasedPortfolios', JSON.stringify(newPurchased));
      return newPurchased;
    });
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      signup, 
      logout, 
      isAuthenticated, 
      canAccessPremiumStocks,
      purchasedPortfolios,
      hasPurchasedPortfolio,
      togglePortfolioPurchase
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
