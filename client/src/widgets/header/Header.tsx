"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AppBar, Box, Container, Stack, Typography } from "@mui/material";
import { sideNav, topNav } from "@/src/shared/config/site-nav";

const activeColor = "rgba(242,185,13,0.9)";

export function Header() {
  const pathname = usePathname();
  const isActiveHref = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);
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
              const isActive = isActiveHref(item.href);
              return (
                <Box
                  component={Link}
                  href={item.href}
                  key={item.href}
                  sx={{
                    textDecoration: "none",
                    borderBottom: isActive ? `1px solid ${activeColor}` : "none",
                    paddingBottom: "2px",
                    display: "inline-flex",
                  }}
                >
                  <Typography
                    sx={{
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      opacity: isActive ? 1 : 0.7,
                      fontWeight: isActive ? 600 : 400,
                      color: isActive ? activeColor : "text.primary",
                      padding: 1,
                    }}
                  >
                    {item.label}
                  </Typography>
                </Box>
              );
            })}
          </Stack>
          <Stack direction="row" spacing={2}>
            {sideNav.map((item) => {
              const isActive = isActiveHref(item.href);
              return (
                <Box
                  component={Link}
                  href={item.href}
                  key={item.href}
                  sx={{
                    textDecoration: "none",
                    borderBottom: isActive ? `1px solid ${activeColor}` : "none",
                    paddingBottom: "2px",
                    display: "inline-flex",
                  }}
                >
                  <Typography
                    sx={{
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      opacity: isActive ? 1 : 0.7,
                      fontWeight: isActive ? 600 : 400,
                      color: isActive ? activeColor : "text.primary",
                    }}
                  >
                    {item.label}
                  </Typography>
                </Box>
              );
            })}
          </Stack>
        </Box>
      </Container>
    </AppBar>
  );
}

