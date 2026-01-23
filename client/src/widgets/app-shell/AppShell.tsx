"use client";

import type { PropsWithChildren } from "react";
import { Box, Container, Stack, Typography } from "@mui/material";
import { usePathname } from "next/navigation";
import { Header } from "@/src/widgets/header";
import { Footer } from "@/src/widgets/footer";

const gradientByPath: Record<string, string> = {
  "/": "linear-gradient(135deg, #221e10 0%, #3a321d 35%, #4a4025 60%, #3a321d 80%, #221e10 100%)",
  "/we": "linear-gradient(135deg, #221e10 0%, #3a321d 35%, #4a4025 60%, #3a321d 80%, #221e10 100%)",
  "/shop": "linear-gradient(135deg, #1f1b0f 0%, #362f1b 40%, #4a4025 70%, #2c2717 100%)",
  "/prestige": "linear-gradient(135deg, #201b10 0%, #3b321d 45%, #4a4025 70%, #231f12 100%)",
  "/projects": "linear-gradient(135deg, #201b10 0%, #3a321d 45%, #4a4025 70%, #231f12 100%)",
  "/events": "linear-gradient(135deg, #201b10 0%, #3a321d 45%, #4a4025 70%, #231f12 100%)",
  "/contacts": "linear-gradient(135deg, #201b10 0%, #3a321d 45%, #4a4025 70%, #231f12 100%)",
  "/policy": "linear-gradient(135deg, #201b10 0%, #3a321d 45%, #4a4025 70%, #231f12 100%)",
  "/signin": "linear-gradient(135deg, #201b10 0%, #3a321d 45%, #4a4025 70%, #231f12 100%)",
  "/cart": "linear-gradient(135deg, #201b10 0%, #3a321d 45%, #4a4025 70%, #231f12 100%)",
};

function resolveGradient(pathname: string) {
  if (pathname.startsWith("/collections/")) {
    return gradientByPath["/shop"];
  }
  if (pathname.startsWith("/products/")) {
    return gradientByPath["/shop"];
  }
  if (pathname.startsWith("/projects/")) {
    return gradientByPath["/projects"];
  }
  return gradientByPath[pathname] ?? gradientByPath["/"];
}

export function AppShell({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const gradient = resolveGradient(pathname);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: gradient,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          background:
            "radial-gradient(circle at 15% 20%, rgba(82,70,41,0.55) 0%, rgba(34,30,16,0) 40%), radial-gradient(circle at 80% 25%, rgba(88,74,43,0.45) 0%, rgba(34,30,16,0) 45%), radial-gradient(circle at 55% 70%, rgba(70,60,35,0.45) 0%, rgba(34,30,16,0) 50%), radial-gradient(circle at 20% 80%, rgba(50,44,28,0.6) 0%, rgba(34,30,16,0) 45%)",
          mixBlendMode: "soft-light",
          opacity: 0.65,
        }}
      />
      <Box
        sx={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "45vh",
            mt: "4vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            px: 3,
          }}
        >
          <Box
            component="svg"
            viewBox="0 0 1000 250"
            preserveAspectRatio="none"
            sx={{
              width: "100%",
              height: "100%",
              opacity: 0.2,
            }}
          >
            <text
              x="0"
              y="245"
              textLength="1000"
              lengthAdjust="spacingAndGlyphs"
              style={{
                fill: "currentColor",
                fontSize: "310px",
                fontWeight: 500,
                letterSpacing: "0.02em",
                textTransform: "uppercase",
              }}
            >
              WINTER SPARROW EYE
            </text>
          </Box>
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            mt: "clamp(20px, 6vh, 80px)",
            opacity: 0.22,
          }}
        >
          <Box
            component="img"
            src="/Group%201%20(2).png"
            alt=""
            sx={{
              width: "min(600px, 70vw)",
              height: "auto",
            }}
          />
        </Box>
      </Box>
      <Header />
      <Container sx={{ flex: 1, py: 4, position: "relative", zIndex: 1 }}>
        <Stack spacing={3}>{children}</Stack>
      </Container>
      <Box sx={{ position: "relative", zIndex: 1 }}>
        <Footer />
      </Box>
    </Box>
  );
}

