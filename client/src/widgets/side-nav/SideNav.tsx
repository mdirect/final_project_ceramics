"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { sideNav } from "@/src/shared/config/site-nav";

export function SideNav() {
  const pathname = usePathname();

  return (
    <aside className="sideNav">
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
    </aside>
  );
}

