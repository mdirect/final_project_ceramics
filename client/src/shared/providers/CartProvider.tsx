"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PropsWithChildren,
} from "react";
import { apiFetch } from "@/src/shared/api/http";
import { cartApi } from "@/src/entities/cart/api";
import type { CartItem, CartProduct, CartState } from "@/src/entities/cart/model/types";
import { useAuth } from "@/src/shared/providers/AuthProvider";

type CartContextValue = CartState & {
  isLoading: boolean;
  error: string | null;
  addItem: (product: CartProduct, quantity?: number) => Promise<boolean>;
  updateQuantity: (productId: number, quantity: number) => Promise<void>;
  removeItem: (productId: number) => Promise<void>;
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);
const GUEST_STORAGE_KEY = "guest_cart";

const normalizePrice = (value: number | string) => {
  const numeric = Number(value);
  return Number.isNaN(numeric) ? 0 : numeric;
};

const calculateTotals = (items: CartItem[]): CartState => {
  const total = items.reduce(
    (sum, item) => sum + normalizePrice(item.product.price) * item.quantity,
    0
  );
  return {
    items,
    total,
    count: items.reduce((sum, item) => sum + item.quantity, 0),
  };
};

const readGuestCart = (): CartItem[] => {
  if (typeof window === "undefined") {
    return [];
  }
  try {
    const raw = window.localStorage.getItem(GUEST_STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw) as CartItem[] | undefined;
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const writeGuestCart = (items: CartItem[]) => {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(GUEST_STORAGE_KEY, JSON.stringify(items));
};

export function CartProvider({ children }: PropsWithChildren) {
  const { user, isLoading: authLoading } = useAuth();
  const [state, setState] = useState<CartState>({ items: [], total: 0, count: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const previousUserId = useRef<number | null>(null);

  const setGuestState = useCallback((items: CartItem[]) => {
    writeGuestCart(items);
    setState(calculateTotals(items));
  }, []);

  const refreshCart = useCallback(async () => {
    if (!user) {
      const items = readGuestCart();
      setState(calculateTotals(items));
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const result = await apiFetch<CartState>(cartApi.get);
      setState(calculateTotals(result.items ?? []));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load cart.");
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  const mergeGuestCartToServer = useCallback(async () => {
    const guestItems = readGuestCart();
    if (guestItems.length === 0 || !user) {
      return;
    }
    for (const item of guestItems) {
      try {
        await apiFetch(cartApi.add, {
          method: "POST",
          body: JSON.stringify({ productId: item.productId, quantity: item.quantity }),
        });
      } catch {
        // ignore individual failures to allow the rest
      }
    }
    writeGuestCart([]);
  }, [user]);

  useEffect(() => {
    if (authLoading) {
      return;
    }

    if (user) {
      const hasNewLogin = previousUserId.current === null;
      previousUserId.current = user.id;
      if (hasNewLogin) {
        void (async () => {
          await mergeGuestCartToServer();
          await refreshCart();
        })();
        return;
      }
      void refreshCart();
      return;
    }

    previousUserId.current = null;
    const items = readGuestCart();
    setState(calculateTotals(items));
  }, [user, authLoading, mergeGuestCartToServer, refreshCart]);

  const addItem = useCallback(
    async (product: CartProduct, quantity = 1) => {
      if (quantity <= 0) {
        return false;
      }
      if (!user) {
        const items = readGuestCart();
        const existing = items.find((item) => item.productId === product.id);
        if (existing) {
          existing.quantity += quantity;
        } else {
          items.push({ productId: product.id, quantity, product });
        }
        setGuestState([...items]);
        return true;
      }
      setIsLoading(true);
      setError(null);
      try {
        await apiFetch(cartApi.add, {
          method: "POST",
          body: JSON.stringify({ productId: product.id, quantity }),
        });
        await refreshCart();
        return true;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unable to add item.");
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [refreshCart, setGuestState, user]
  );

  const updateQuantity = useCallback(
    async (productId: number, quantity: number) => {
      if (quantity <= 0) {
        await removeItem(productId);
        return;
      }
      if (!user) {
        const items = readGuestCart().map((item) =>
          item.productId === productId ? { ...item, quantity } : item
        );
        setGuestState(items);
        return;
      }
      setIsLoading(true);
      setError(null);
      try {
        await apiFetch(cartApi.update(productId), {
          method: "PATCH",
          body: JSON.stringify({ quantity }),
        });
        await refreshCart();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unable to update quantity.");
      } finally {
        setIsLoading(false);
      }
    },
    [refreshCart, setGuestState, user]
  );

  const removeItem = useCallback(
    async (productId: number) => {
      if (!user) {
        const items = readGuestCart().filter((item) => item.productId !== productId);
        setGuestState(items);
        return;
      }
      setIsLoading(true);
      setError(null);
      try {
        await apiFetch(cartApi.remove(productId), { method: "DELETE" });
        await refreshCart();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unable to remove item.");
      } finally {
        setIsLoading(false);
      }
    },
    [refreshCart, setGuestState, user]
  );

  const clearCart = useCallback(async () => {
    if (!user) {
      setGuestState([]);
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      await apiFetch(cartApi.clear, { method: "DELETE" });
      await refreshCart();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to clear cart.");
    } finally {
      setIsLoading(false);
    }
  }, [refreshCart, setGuestState, user]);

  const value = useMemo(
    () => ({
      ...state,
      isLoading,
      error,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      refreshCart,
    }),
    [state, isLoading, error, addItem, updateQuantity, removeItem, clearCart, refreshCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider");
  }
  return ctx;
}
