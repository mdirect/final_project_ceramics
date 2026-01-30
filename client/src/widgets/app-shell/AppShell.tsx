"use client";

import type { PropsWithChildren } from "react";
import { Box, Container, Stack } from "@mui/material";
import { usePathname } from "next/navigation";
import { Header } from "@/src/widgets/header";
import { Footer } from "@/src/widgets/footer";

const gradientByPath: Record<string, string> = {
  "/": "linear-gradient(170deg,rgb(71, 105, 178) 20%,rgba(247, 150, 24, 0.85) 90%)",
  "/we": "linear-gradient(170deg,rgb(71, 105, 178) 20%,rgba(247, 150, 24, 0.85) 90%)",
  "/shop": "linear-gradient(130deg,rgb(128, 71, 203) 10%,rgb(77, 128, 114) 35%,rgb(213, 153, 24) 105%)",
  "/prestige": "linear-gradient(200deg,rgb(83, 131, 207) -10%,rgba(75, 0, 224, 0.54) 60%,rgba(237, 118, 14, 0.67) 100%)",
  "/projects": "linear-gradient(55deg, #141e30 0%, #355c7d 45%, #f67280 110%)",
  "/events": "linear-gradient(145deg, #0f2027 0%, #2c5364 45%, #f7c873 100%)",
  "/contacts": "linear-gradient(145deg, #2b5876 0%, #4e4376 50%, #f8cdda 100%)",
  "/policy": "linear-gradient(145deg, #1a2a3a 0%, #3f5c7a 55%,rgb(66, 187, 114) 100%)",
  "/signin": "linear-gradient(185deg,rgba(55, 85, 119, 0.73) 0%, #4a4f87 60%,rgba(198, 88, 63, 0.77) 90%)",
  "/cart": "linear-gradient(150deg,rgba(60, 137, 114, 0.86) 0%, #3a6073 60%,rgba(242, 200, 76, 0.47) 90%)",
  "/checkout": "linear-gradient(190deg,rgba(47, 112, 93, 0.86) 0%,rgb(40, 71, 85) 60%,rgba(49, 119, 70, 0.69) 100%)",
  "/profile": "linear-gradient(145deg,rgba(48, 120, 202, 0.73) 0%,rgb(63, 69, 136) 50%,rgba(136, 74, 60, 0.77) 90%)",
};

function resolveGradient(pathname: string) {
  if (pathname.startsWith("/collections/")) {
    return "linear-gradient(95deg, #ff9a9e -5%,rgba(134, 129, 127, 0.61) 40%,rgb(249, 171, 227) 150%)";
  }
  if (pathname.startsWith("/products/")) {
    return "linear-gradient(135deg, #43cea2 0%, #185a9d 55%, #fbc7d4 100%)";
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
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
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
              opacity: 0.12,
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
            opacity: 0.12,
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
      <Container
        maxWidth="xl"
        sx={{ flex: 1, py: 4, position: "relative", zIndex: 1 }}
      >
        <Stack spacing={3}>{children}</Stack>
      </Container>
      <Box sx={{ position: "relative", zIndex: 1 }}>
        <Footer />
      </Box>
    </Box>
  );
}

