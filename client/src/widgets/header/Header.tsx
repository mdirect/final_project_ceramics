"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AppBar, Box, Container, Stack, Typography } from "@mui/material";
import { sideNav, topNav } from "@/src/shared/config/site-nav";
import { useState } from "react";

export function Header() {
  const pathname = usePathname();
  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={5}
      sx={{ py: 1.4 }}
    >
      <Container>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 3,
          }}
        >
          <Stack direction="row" spacing={2} flexWrap="wrap">
            {topNav.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link href={item.href} key={item.href}>
                  <Typography
                    sx={{
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      opacity: isActive ? 1 : 0.75,
                      fontWeight: isActive ? 600 : 400,
                      color: "text.primary",
                      padding: 1,
                    }}
                  >
                    {item.label}
                  </Typography>
                </Link>
              );
            })}
          </Stack>
          <Stack direction="row" spacing={2}>
            {sideNav.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link href={item.href} key={item.href}>
                <Typography
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
                </Link>
              );
            })}
          </Stack>
        </Box>
      </Container>
    </AppBar>
  );
}

