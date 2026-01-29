"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";
import type { FavoriteItem, FavoriteProduct, FavoritesState } from "@/src/entities/favorites/model/types";

type FavoritesContextValue = FavoritesState & {
  addFavorite: (product: FavoriteProduct) => void;
  removeFavorite: (productId: number) => void;
  toggleFavorite: (product: FavoriteProduct) => boolean;
  isFavorite: (productId: number) => boolean;
  clearFavorites: () => void;
};

const FavoritesContext = createContext<FavoritesContextValue | undefined>(undefined);
const STORAGE_KEY = "guest_favorites";

const readFavorites = (): FavoriteItem[] => {
  if (typeof window === "undefined") {
    return [];
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw) as FavoriteItem[] | undefined;
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const writeFavorites = (items: FavoriteItem[]) => {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
};

const toState = (items: FavoriteItem[]): FavoritesState => ({
  items,
  count: items.length,
});

export function FavoritesProvider({ children }: PropsWithChildren) {
  const [state, setState] = useState<FavoritesState>({ items: [], count: 0 });

  useEffect(() => {
    setState(toState(readFavorites()));
  }, []);

  const setFavorites = useCallback((items: FavoriteItem[]) => {
    writeFavorites(items);
    setState(toState(items));
  }, []);

  const addFavorite = useCallback(
    (product: FavoriteProduct) => {
      const current = readFavorites();
      if (current.some((item) => item.productId === product.id)) {
        return;
      }
      setFavorites([...current, { productId: product.id, product }]);
    },
    [setFavorites]
  );

  const removeFavorite = useCallback(
    (productId: number) => {
      const current = readFavorites().filter((item) => item.productId !== productId);
      setFavorites(current);
    },
    [setFavorites]
  );

  const favoriteIds = useMemo(() => new Set(state.items.map((item) => item.productId)), [state.items]);

  const isFavorite = useCallback(
    (productId: number) => favoriteIds.has(productId),
    [favoriteIds]
  );

  const toggleFavorite = useCallback(
    (product: FavoriteProduct) => {
      const exists = isFavorite(product.id);
      if (exists) {
        removeFavorite(product.id);
        return false;
      }
      addFavorite(product);
      return true;
    },
    [addFavorite, isFavorite, removeFavorite]
  );

  const clearFavorites = useCallback(() => {
    setFavorites([]);
  }, [setFavorites]);

  const value = useMemo(
    () => ({
      ...state,
      addFavorite,
      removeFavorite,
      toggleFavorite,
      isFavorite,
      clearFavorites,
    }),
    [state, addFavorite, removeFavorite, toggleFavorite, isFavorite, clearFavorites]
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) {
    throw new Error("useFavorites must be used within FavoritesProvider");
  }
  return ctx;
}
