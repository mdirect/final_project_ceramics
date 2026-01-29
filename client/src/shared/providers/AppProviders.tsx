"use client";

import type { PropsWithChildren } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { appTheme } from "@/src/shared/config/theme";
import { AuthProvider } from "@/src/shared/providers/AuthProvider";
import { CartProvider } from "@/src/shared/providers/CartProvider";
import { FavoritesProvider } from "@/src/shared/providers/FavoritesProvider";

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <AuthProvider>
        <CartProvider>
          <FavoritesProvider>{children}</FavoritesProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

