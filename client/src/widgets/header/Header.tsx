"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { AppBar, Box, Button, Container, Stack, Typography } from "@mui/material";
import { getSideNav, topNav } from "@/src/shared/config/site-nav";
import { useAuth } from "@/src/shared/providers/AuthProvider";
import { useCart } from "@/src/shared/providers/CartProvider";

const activeColor = "rgba(242,185,13,0.9)";

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoading, logout } = useAuth();
  const { items } = useCart();
  const badgeCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );
  const isAuthed = Boolean(user) && !isLoading;
  const sideNav = getSideNav(isAuthed);
  const isActiveHref = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const closeTimerRef = useRef<number | null>(null);
  const hoverBlockUntilRef = useRef<number>(0);

  const handleLogout = async () => {
    await logout();
    router.push("/signin");
  };

  const openProfileMenu = () => {
    if (Date.now() < hoverBlockUntilRef.current) {
      return;
    }
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setIsProfileMenuOpen(true);
  };

  const closeProfileMenu = () => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
    }
    closeTimerRef.current = window.setTimeout(() => {
      setIsProfileMenuOpen(false);
      closeTimerRef.current = null;
    }, 250);
  };

  useEffect(() => {
    if (isAuthed) {
      setIsProfileMenuOpen(false);
      hoverBlockUntilRef.current = Date.now() + 800;
    }
    return () => {
      if (closeTimerRef.current) {
        window.clearTimeout(closeTimerRef.current);
      }
    };
  }, [isAuthed]);
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
          <Stack direction="row" spacing={2} flexWrap="wrap" alignItems="center">
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
                      lineHeight: 1,
                    }}
                  >
                    {item.label}
                  </Typography>
                </Box>
              );
            })}
          </Stack>
          <Stack direction="row" spacing={2} alignItems="center">
            {sideNav.map((item) => {
              if (item.href === "/profile" && isAuthed) {
                return (
                  <Box
                    key={item.href}
                    sx={{
                      position: "relative",
                      display: "inline-flex",
                      alignItems: "center",
                    }}
                    onMouseEnter={openProfileMenu}
                    onMouseLeave={closeProfileMenu}
                  >
                    <Box
                      component={Link}
                      href={item.href}
                      sx={{
                        textDecoration: "none",
                        borderBottom: isActiveHref(item.href)
                          ? `1px solid ${activeColor}`
                          : "none",
                        paddingBottom: "2px",
                        display: "inline-flex",
                      }}
                    >
                      <Typography
                        sx={{
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                          opacity: isActiveHref(item.href) ? 1 : 0.7,
                          fontWeight: isActiveHref(item.href) ? 600 : 400,
                          color: isActiveHref(item.href)
                            ? activeColor
                            : "text.primary",
                          padding: 1,
                          lineHeight: 1,
                        }}
                      >
                        {item.label}
                      </Typography>
                    </Box>
                    <Box
                      className="profile-menu"
                      sx={{
                        position: "absolute",
                        right: 0,
                        top: "100%",
                        mt: 0.5,
                        opacity: isProfileMenuOpen ? 1 : 0,
                        transform: isProfileMenuOpen
                          ? "translateY(4px)"
                          : "translateY(8px)",
                        transition: "all 150ms ease",
                        pointerEvents: isProfileMenuOpen ? "auto" : "none",
                        backgroundColor: "rgba(17,17,17,0.95)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        borderRadius: 2,
                        boxShadow: "0 12px 28px rgba(0,0,0,0.35)",
                        px: 1,
                        py: 0.75,
                        zIndex: 10,
                      }}
                      onMouseEnter={openProfileMenu}
                      onMouseLeave={closeProfileMenu}
                    >
                      <Button
                        variant="text"
                        onClick={handleLogout}
                        sx={{
                          textTransform: "none",
                          fontSize: "0.8rem",
                          letterSpacing: "0.06em",
                          color: "#f3d37a",
                          minWidth: "auto",
                          px: 1,
                          "&:hover": {
                            backgroundColor: "rgba(243,211,122,0.14)",
                          },
                        }}
                      >
                        Logout
                      </Button>
                    </Box>
                  </Box>
                );
              }

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
                    position: "relative",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      opacity: isActive ? 1 : 0.7,
                      fontWeight: isActive ? 600 : 400,
                      color: isActive ? activeColor : "text.primary",
                      padding: 1,
                      lineHeight: 1,
                    }}
                  >
                    {item.label}
                  </Typography>
                  {item.href === "/cart" && badgeCount > 0 && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: -3,
                        right: -6,
                        minWidth: 18,
                        height: 18,
                        px: 0.5,
                        borderRadius: "999px",
                        backgroundColor: activeColor,
                        color: "rgba(10,12,16,0.9)",
                        fontSize: "0.65rem",
                        fontWeight: 700,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {badgeCount}
                    </Box>
                  )}
                </Box>
              );
            })}
          </Stack>
        </Box>
      </Container>
    </AppBar>
  );
}

