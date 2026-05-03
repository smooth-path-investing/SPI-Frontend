/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  readJsonStorage,
  readStorageItem,
  removeStorageItem,
  writeJsonStorage,
} from '@/lib/storage';
import { getDisplayNameFromEmail, normalizeEmail } from '../validation';
import type { AuthContextValue, AuthProviderProps, OfferType, User } from '../types';

// Purchases are stored per user email so switching demo accounts preserves separate state.
type StoredValuesByUser<T extends string> = Record<string, T[]>;

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const STORAGE_KEYS = {
  user: 'spi-user',
  purchasedPortfoliosByUser: 'spi-purchased-portfolios-by-user',
  purchasedOffersByUser: 'spi-purchased-offers-by-user',
  legacyPurchasedPortfolios: 'purchasedPortfolios',
} as const;

const getUserStorageKey = (user: User | null) => user?.email.trim().toLowerCase() ?? '';

// Temporary mock plan resolution until auth/entitlements come from a backend.
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

const normalizeStoredUser = (storedUser: User | null): User | null => {
  if (!storedUser) {
    return null;
  }

  if (storedUser.name && storedUser.name !== 'Demo User') {
    return storedUser;
  }

  return {
    ...storedUser,
    name: getDisplayNameFromEmail(storedUser.email),
  };
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() =>
    normalizeStoredUser(readJsonStorage<User | null>(STORAGE_KEYS.user, null)),
  );
  const [legacyPurchasedPortfolios, setLegacyPurchasedPortfolios] = useState<string[]>(() =>
    readJsonStorage<string[]>(STORAGE_KEYS.legacyPurchasedPortfolios, []),
  );
  const [purchasedPortfoliosByUser, setPurchasedPortfoliosByUser] = useState<
    StoredValuesByUser<string>
  >(() => readJsonStorage<StoredValuesByUser<string>>(STORAGE_KEYS.purchasedPortfoliosByUser, {}));
  const [, setPurchasedOffersByUser] = useState<StoredValuesByUser<OfferType>>(() =>
    readJsonStorage<StoredValuesByUser<OfferType>>(STORAGE_KEYS.purchasedOffersByUser, {}),
  );

  const userStorageKey = getUserStorageKey(user);
  const purchasedPortfolios = userStorageKey ? purchasedPortfoliosByUser[userStorageKey] ?? [] : [];

  useEffect(() => {
    // Migrate legacy shared purchases into the newer per-user map the first time a user logs in.
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

      writeJsonStorage(STORAGE_KEYS.purchasedPortfoliosByUser, nextPurchases);
      return nextPurchases;
    });

    removeStorageItem(STORAGE_KEYS.legacyPurchasedPortfolios);
    setLegacyPurchasedPortfolios([]);
  }, [legacyPurchasedPortfolios, userStorageKey]);

  const persistUser = (nextUser: User | null) => {
    setUser(nextUser);

    if (nextUser) {
      writeJsonStorage(STORAGE_KEYS.user, nextUser);
      return;
    }

    removeStorageItem(STORAGE_KEYS.user);
  };

  const login = (email: string, _password: string) => {
    const normalizedEmail = normalizeEmail(email);

    persistUser(buildMockUser(normalizedEmail, getDisplayNameFromEmail(normalizedEmail), '1'));
  };

  const signup = (email: string, _password: string, firstName: string, lastName: string) => {
    persistUser(
      buildMockUser(
        normalizeEmail(email),
        `${firstName.trim()} ${lastName.trim()}`.trim(),
        Date.now().toString(),
      ),
    );
  };

  const logout = () => {
    persistUser(null);
  };

  const isAuthenticated = !!user;

  const canAccessPremiumStocks = () => {
    if (!isAuthenticated) {
      return false;
    }

    // Product/dev escape hatch that unlocks premium routes without changing the seeded user record.
    const showPremiumStocks = readStorageItem('showPremiumStocks') === 'true';
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

    // The current mock purchase flow records both the selected offer and the unlocked portfolio.
    setPurchasedOffersByUser((previousOffers) => {
      const nextOffers = {
        ...previousOffers,
        [userStorageKey]: dedupeValues([...(previousOffers[userStorageKey] ?? []), offerId]),
      };

      writeJsonStorage(STORAGE_KEYS.purchasedOffersByUser, nextOffers);
      return nextOffers;
    });

    setPurchasedPortfoliosByUser((previousPurchases) => {
      const nextPurchases = {
        ...previousPurchases,
        [userStorageKey]: dedupeValues([...(previousPurchases[userStorageKey] ?? []), portfolioId]),
      };

      writeJsonStorage(STORAGE_KEYS.purchasedPortfoliosByUser, nextPurchases);
      return nextPurchases;
    });

    if (legacyPurchasedPortfolios.length > 0) {
      removeStorageItem(STORAGE_KEYS.legacyPurchasedPortfolios);
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

      writeJsonStorage(STORAGE_KEYS.purchasedPortfoliosByUser, nextPurchases);
      return nextPurchases;
    });

    if (legacyPurchasedPortfolios.length > 0) {
      removeStorageItem(STORAGE_KEYS.legacyPurchasedPortfolios);
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
