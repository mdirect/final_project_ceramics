"use client";

import type { PropsWithChildren } from "react";
import { Box, Container, Stack, Typography } from "@mui/material";
import { usePathname } from "next/navigation";
import { Header } from "@/src/widgets/header";
import { Footer } from "@/src/widgets/footer";

const gradientByPath: Record<string, string> = {
  "/": "linear-gradient(10deg,rgb(138, 166, 92) 0%,rgb(192, 179, 124) 100%)",
  "/we": "linear-gradient(5deg,rgb(207, 121, 68) 10%,rgb(75, 129, 176) 90%)",
  "/shop": "linear-gradient(7deg,rgb(73, 155, 128) 0%,rgb(190, 193, 81) 100%)",
  "/prestige": "linear-gradient(135deg,rgb(23, 82, 179) 0%,rgb(195, 161, 73) 100%)",
  "/projects": "linear-gradient(135deg, #8b8482 0%, #a59c98 100%)",
  "/events": "linear-gradient(135deg, #7f8a7c 0%, #97a08f 100%)",
  "/contacts": "linear-gradient(135deg, #8d8785 0%, #a49b98 100%)",
  "/policy": "linear-gradient(135deg, #7f8682 0%, #9aa19d 100%)",
  "/signin": "linear-gradient(135deg, #8a8f7f 0%, #a2a892 100%)",
  "/cart": "linear-gradient(135deg, #8a8a80 0%, #a3a39a 100%)",
};

function resolveGradient(pathname: string) {
  if (pathname.startsWith("/collections/")) {
    return "linear-gradient(135deg, #828a83 0%, #9aa39b 100%)";
  }
  if (pathname.startsWith("/products/")) {
    return "linear-gradient(135deg, #848484 0%, #9c9c9c 100%)";
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
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "4%",
            left: 0,
            right: 0,
            height: "45vh",
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
            position: "absolute",
            top: "77%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "grid",
            gridTemplateColumns: "repeat(3, auto)",
            gridAutoRows: "auto",
            columnGap: "clamp(20px, 4vw, 60px)",
            rowGap: "clamp(18px, 3vw, 48px)",
            alignItems: "center",
            opacity: 0.22,
          }}
        >
          <Box
            sx={{
              gridColumn: "1 / 2",
              gridRow: "1 / 2",
              width: "clamp(120px, 12vw, 200px)",
              height: "clamp(120px, 12vw, 200px)",
              borderRadius: "50%",
              backgroundColor: "text.primary",
            }}
          />
          <Box
            sx={{
              gridColumn: "2 / 3",
              gridRow: "1 / 2",
              width: "clamp(220px, 18vw, 320px)",
              height: "clamp(64px, 7vw, 110px)",
              borderRadius: "999px",
              backgroundColor: "text.primary",
            }}
          />
          <Box
            sx={{
              gridColumn: "3 / 4",
              gridRow: "1 / 2",
              width: "clamp(220px, 18vw, 320px)",
              height: "clamp(64px, 7vw, 110px)",
              borderRadius: "999px",
              backgroundColor: "text.primary",
            }}
          />
          <Box
            sx={{
              gridColumn: "1 / 2",
              gridRow: "2 / 3",
              width: "clamp(120px, 12vw, 200px)",
              height: "clamp(120px, 12vw, 200px)",
              borderRadius: "50%",
              backgroundColor: "text.primary",
            }}
          />
          <Box
            sx={{
              gridColumn: "2 / 3",
              gridRow: "2 / 3",
              width: "clamp(120px, 12vw, 200px)",
              height: "clamp(120px, 12vw, 200px)",
              borderRadius: "50%",
              backgroundColor: "text.primary",
            }}
          />
          <Box
            sx={{
              gridColumn: "3 / 4",
              gridRow: "2 / 3",
              width: "clamp(120px, 12vw, 200px)",
              height: "clamp(120px, 12vw, 200px)",
              borderRadius: "50%",
              backgroundColor: "text.primary",
            }}
          />
          <Box
            sx={{
              gridColumn: "2 / 3",
              gridRow: "3 / 4",
              width: "clamp(140px, 13vw, 200px)",
              height: "clamp(140px, 13vw, 200px)",
              borderRadius: "50%",
              backgroundColor: "text.primary",
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

