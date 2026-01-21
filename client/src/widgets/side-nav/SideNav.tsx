"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Stack, Typography } from "@mui/material";
import { sideNav } from "@/src/shared/config/site-nav";

export function SideNav() {
  const pathname = usePathname();

  return (
    <Stack spacing={1} alignItems="flex-end">
      {sideNav.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Typography
            key={item.href}
            component={Link}
            href={item.href}
            sx={{
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              opacity: isActive ? 1 : 0.75,
              fontWeight: isActive ? 600 : 400,
              color: "text.primary",
            }}
          >
            {item.label}
          </Typography>
        );
      })}
    </Stack>
  );
}

