"use client";

import type { PropsWithChildren } from "react";
import { Box, Container, Stack, Typography } from "@mui/material";
import { usePathname } from "next/navigation";
import { Header } from "@/src/widgets/header";
import { Footer } from "@/src/widgets/footer";

const gradientStopsByPath: Record<
  string,
  { start: string; mid: string; end: string }
> = {
  "/": { start: "#0a3a52", mid: "#061b2d", end: "#0b4f63" },
  "/we": { start: "#0b3f46", mid: "#071c22", end: "#0d4b54" },
  "/shop": { start: "#0e3b2f", mid: "#071c18", end: "#0f4a3a" },
  "/prestige": { start: "#34293f", mid: "#17121d", end: "#47325a" },
  "/projects": { start: "#0b3a52", mid: "#061825", end: "#0e4057" },
  "/events": { start: "#3a3426", mid: "#1a1711", end: "#4a402e" },
  "/contacts": { start: "#2c3246", mid: "#141824", end: "#3b4260" },
  "/policy": { start: "#2b3a38", mid: "#141a19", end: "#3a4a48" },
  "/signin": { start: "#3a2a2c", mid: "#1a1314", end: "#4a3336" },
  "/cart": { start: "#2f3a2a", mid: "#151a14", end: "#3a4a34" },
};

const collectionsStops = { start: "#0b4152", mid: "#071f2a", end: "#0f5163" };
const productsStops = { start: "#10334a", mid: "#091722", end: "#0f3f5a" };
const projectsStops = { start: "#0a3850", mid: "#061725", end: "#0c465d" };

function buildLinearGradient({
  start,
  mid,
  end,
}: {
  start: string;
  mid: string;
  end: string;
}) {
  return `linear-gradient(135deg, ${start} 0%, ${mid} 45%, ${end} 100%)`;
}

function resolveGradient(pathname: string) {
  if (pathname.startsWith("/collections/")) {
    // Настраиваемый градиент для страниц коллекций
    return buildLinearGradient(collectionsStops);
  }
  if (pathname.startsWith("/products/")) {
    // Настраиваемый градиент для страниц продуктов
    return buildLinearGradient(productsStops);
  }
  if (pathname.startsWith("/projects/")) {
    // Настраиваемый градиент для страниц проектов
    return buildLinearGradient(projectsStops);
  }
  const stops = gradientStopsByPath[pathname] ?? gradientStopsByPath["/"];
  return buildLinearGradient(stops);
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
            "radial-gradient(120% 80% at 50% 100%, rgba(0, 0, 0, 0.55), transparent 60%), radial-gradient(100% 100% at 0% 0%, rgba(0, 0, 0, 0.35), transparent 50%)",
          opacity: 1,
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

