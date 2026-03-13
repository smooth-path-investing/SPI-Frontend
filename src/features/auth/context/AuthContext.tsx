/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useState } from 'react';
import type { AuthContextValue, AuthProviderProps, OfferType, User } from '../types';

type StoredValuesByUser<T extends string> = Record<string, T[]>;

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const STORAGE_KEYS = {
  user: 'spi-user',
  purchasedPortfoliosByUser: 'spi-purchased-portfolios-by-user',
  purchasedOffersByUser: 'spi-purchased-offers-by-user',
  legacyPurchasedPortfolios: 'purchasedPortfolios',
} as const;

const readStorage = <T,>(key: string, fallback: T): T => {
  try {
    const storedValue = localStorage.getItem(key);
    return storedValue ? (JSON.parse(storedValue) as T) : fallback;
  } catch {
    return fallback;
  }
};

const writeStorage = <T,>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getUserStorageKey = (user: User | null) => user?.email.trim().toLowerCase() ?? '';

const resolvePlanFromEmail = (email: string): User['plan'] => {
  if (email.includes('pro')) {
    return 'pro';
  }
  if (email.includes('elite')) {
    return 'elite';
  }
  return 'free';
};

const buildMockUser = (email: string, name: string, id: string): User => {
  const plan = resolvePlanFromEmail(email);

  return {
    id,
    name,
    email,
    plan,
    isPremium: plan === 'pro' || plan === 'elite',
  };
};

const dedupeValues = <T extends string>(values: T[]) => Array.from(new Set(values));

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() =>
    readStorage<User | null>(STORAGE_KEYS.user, null),
  );
  const [legacyPurchasedPortfolios, setLegacyPurchasedPortfolios] = useState<string[]>(() =>
    readStorage<string[]>(STORAGE_KEYS.legacyPurchasedPortfolios, []),
  );
  const [purchasedPortfoliosByUser, setPurchasedPortfoliosByUser] = useState<
    StoredValuesByUser<string>
  >(() => readStorage<StoredValuesByUser<string>>(STORAGE_KEYS.purchasedPortfoliosByUser, {}));
  const [, setPurchasedOffersByUser] = useState<StoredValuesByUser<OfferType>>(() =>
    readStorage<StoredValuesByUser<OfferType>>(STORAGE_KEYS.purchasedOffersByUser, {}),
  );

  const userStorageKey = getUserStorageKey(user);
  const purchasedPortfolios = userStorageKey ? purchasedPortfoliosByUser[userStorageKey] ?? [] : [];

  useEffect(() => {
    if (!userStorageKey || legacyPurchasedPortfolios.length === 0) {
      return;
    }

    setPurchasedPortfoliosByUser((previousPurchases) => {
      if ((previousPurchases[userStorageKey] ?? []).length > 0) {
        return previousPurchases;
      }

      const nextPurchases = {
        ...previousPurchases,
        [userStorageKey]: dedupeValues(legacyPurchasedPortfolios),
      };

      writeStorage(STORAGE_KEYS.purchasedPortfoliosByUser, nextPurchases);
      return nextPurchases;
    });

    localStorage.removeItem(STORAGE_KEYS.legacyPurchasedPortfolios);
    setLegacyPurchasedPortfolios([]);
  }, [legacyPurchasedPortfolios, userStorageKey]);

  const persistUser = (nextUser: User | null) => {
    setUser(nextUser);

    if (nextUser) {
      writeStorage(STORAGE_KEYS.user, nextUser);
      return;
    }

    localStorage.removeItem(STORAGE_KEYS.user);
  };

  const login = (email: string, _password: string) => {
    persistUser(buildMockUser(email, 'Demo User', '1'));
  };

  const signup = (email: string, _password: string, firstName: string, lastName: string) => {
    persistUser(buildMockUser(email, `${firstName} ${lastName}`, Date.now().toString()));
  };

  const logout = () => {
    persistUser(null);
  };

  const isAuthenticated = !!user;

  const canAccessPremiumStocks = () => {
    if (!isAuthenticated) {
      return false;
    }

    const showPremiumStocks = localStorage.getItem('showPremiumStocks') === 'true';
    const isPremiumUser = user?.plan === 'pro' || user?.plan === 'elite';

    return isPremiumUser || showPremiumStocks;
  };

  const hasPurchasedPortfolio = (portfolioId: string) => {
    return purchasedPortfolios.includes(portfolioId);
  };

  const purchaseOffer = (offerId: OfferType, portfolioId: string) => {
    if (!userStorageKey) {
      return;
    }

    setPurchasedOffersByUser((previousOffers) => {
      const nextOffers = {
        ...previousOffers,
        [userStorageKey]: dedupeValues([...(previousOffers[userStorageKey] ?? []), offerId]),
      };

      writeStorage(STORAGE_KEYS.purchasedOffersByUser, nextOffers);
      return nextOffers;
    });

    setPurchasedPortfoliosByUser((previousPurchases) => {
      const nextPurchases = {
        ...previousPurchases,
        [userStorageKey]: dedupeValues([...(previousPurchases[userStorageKey] ?? []), portfolioId]),
      };

      writeStorage(STORAGE_KEYS.purchasedPortfoliosByUser, nextPurchases);
      return nextPurchases;
    });

    if (legacyPurchasedPortfolios.length > 0) {
      localStorage.removeItem(STORAGE_KEYS.legacyPurchasedPortfolios);
      setLegacyPurchasedPortfolios([]);
    }
  };

  const togglePortfolioPurchase = (portfolioId: string) => {
    if (!userStorageKey) {
      return;
    }

    setPurchasedPortfoliosByUser((previousPurchases) => {
      const currentUserPurchases = previousPurchases[userStorageKey] ?? [];
      const nextUserPurchases = currentUserPurchases.includes(portfolioId)
        ? currentUserPurchases.filter((id) => id !== portfolioId)
        : [...currentUserPurchases, portfolioId];
      const nextPurchases = {
        ...previousPurchases,
        [userStorageKey]: nextUserPurchases,
      };

      if (nextUserPurchases.length === 0) {
        delete nextPurchases[userStorageKey];
      }

      writeStorage(STORAGE_KEYS.purchasedPortfoliosByUser, nextPurchases);
      return nextPurchases;
    });

    if (legacyPurchasedPortfolios.length > 0) {
      localStorage.removeItem(STORAGE_KEYS.legacyPurchasedPortfolios);
      setLegacyPurchasedPortfolios([]);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        isAuthenticated,
        canAccessPremiumStocks,
        purchasedPortfolios,
        hasPurchasedPortfolio,
        purchaseOffer,
        togglePortfolioPurchase,
      }}
    >
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
