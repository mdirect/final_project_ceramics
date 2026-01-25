"use client";

import type { PropsWithChildren } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { appTheme } from "@/src/shared/config/theme";
import { AuthProvider } from "@/src/shared/providers/AuthProvider";

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
  );
}

