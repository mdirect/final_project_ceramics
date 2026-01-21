"use client";

import type { PropsWithChildren } from "react";
import { usePathname } from "next/navigation";
import { Header } from "@/src/widgets/header";
import { Footer } from "@/src/widgets/footer";

const themeByPath: Record<string, string> = {
  "/": "theme-home",
  "/we": "theme-we",
  "/shop": "theme-shop",
  "/prestige": "theme-prestige",
  "/projects": "theme-projects",
  "/events": "theme-events",
  "/contacts": "theme-contacts",
  "/policy": "theme-policy",
  "/signin": "theme-signin",
  "/cart": "theme-cart",
};

function resolveThemeClass(pathname: string) {
  if (pathname.startsWith("/collections/")) {
    return "theme-collections";
  }
  if (pathname.startsWith("/products/")) {
    return "theme-products";
  }
  if (pathname.startsWith("/projects/")) {
    return "theme-projects";
  }
  return themeByPath[pathname] ?? "theme-home";
}

export function AppShell({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const themeClass = resolveThemeClass(pathname);

  return (
    <div className={`appShell ${themeClass}`}>
      <Header />
      <div className="appShellBody">
        <div className="appShellMain">{children}</div>
      </div>
      <Footer />
    </div>
  );
}

