"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { sideNav, topNav } from "@/src/shared/config/site-nav";

export function Header() {
  const pathname = usePathname();

  return (
    <header className="header">
      <nav className="topNav">
        {topNav.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={isActive ? "navItem navItemActive" : "navItem"}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
      <nav className="rightNav">
        {sideNav.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={isActive ? "navItem navItemActive" : "navItem"}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}

