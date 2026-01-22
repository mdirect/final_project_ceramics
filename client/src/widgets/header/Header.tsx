"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AppBar, Box, Container, Menu, MenuItem, Stack, Typography } from "@mui/material";
import { sideNav, topNav } from "@/src/shared/config/site-nav";
import { useState } from "react";

export function Header() {
  const pathname = usePathname();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const shopOpen = Boolean(anchorEl);
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
              if (item.href === "/shop") {
                return (
                  <Box
                    key={item.href}
                    sx={{ position: "relative", display: "inline-block" }}
                    onMouseEnter={(e) => setAnchorEl(e.currentTarget)}
                    onMouseLeave={() => setAnchorEl(null)}
                  >
                    <Link href={item.href}>
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
                        SHOP
                      </Typography>
                    </Link>
                    <Menu
                      anchorEl={anchorEl}
                      open={shopOpen}
                      onClose={() => setAnchorEl(null)}
                      disableScrollLock
                      MenuListProps={{
                        onMouseLeave: () => setAnchorEl(null),
                      }}
                    >
                      <Link href="/shop">
                        <MenuItem onClick={() => setAnchorEl(null)}>
                          Collections
                        </MenuItem>
                      </Link>
                      <Link href="/shop/all_jewellery">
                        <MenuItem onClick={() => setAnchorEl(null)}>
                          All jewellery
                        </MenuItem>
                      </Link>
                      <Link href="/shop/art_objects">
                        <MenuItem onClick={() => setAnchorEl(null)}>
                          Art objects
                        </MenuItem>
                      </Link>
                    </Menu>
                  </Box>
                );
              }
              
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

