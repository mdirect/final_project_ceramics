"use client";

import { Box, Button, Chip, Divider, Stack, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { apiFetch } from "@/src/shared/api/http";

type Product = {
  id: number;
  name: string;
  desc?: string | null;
  image?: string | null;
  images?: string[] | null;
  price: number | string;
};

const accent = "#f2b90d";
const glass = {
  border: "1px solid rgba(255,255,255,0.08)",
  backgroundColor: "rgba(0,0,0,0.35)",
  backdropFilter: "blur(12px)",
};
const fallbackImage =
  "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1400&q=80";

const formatCurrency = (value: number | string) => {
  const numeric = Number(value);
  if (Number.isNaN(numeric)) {
    return String(value);
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(numeric);
};

export default function PrestigePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setIsLoading(true);
      setLoadError(null);
      try {
        const data = await apiFetch<Product[]>("/product");
        if (!cancelled) {
          setProducts(data);
        }
      } catch (error) {
        if (!cancelled) {
          setLoadError(
            error instanceof Error ? error.message : "Failed to load products.",
          );
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };
    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  const topProducts = useMemo(() => {
    const toPrice = (value: number | string) => {
      const numeric = Number(value);
      return Number.isNaN(numeric) ? 0 : numeric;
    };
    return [...products].sort((a, b) => toPrice(b.price) - toPrice(a.price)).slice(0, 3);
  }, [products]);
  const heroProduct = topProducts[0];
  const sideProducts = topProducts.slice(1, 3);
  const isReady = topProducts.length > 0;
  const placeholderCount = Math.max(0, 2 - sideProducts.length);

  return (
    <Stack spacing={6} sx={{ fontFamily: "var(--font-inter)", position: "relative" }}>
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          opacity: 0.08,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          sx={{
            fontSize: "18vw",
            fontWeight: 700,
            letterSpacing: "-0.04em",
            textTransform: "uppercase",
            color: "transparent",
            WebkitTextStroke: "1px rgba(255,255,255,0.12)",
            fontFamily: "var(--font-playfair)",
          }}
        >
          Winter Sparrow Eye
        </Typography>
      </Box>

      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "repeat(12, 1fr)" },
          gap: { xs: 4, lg: 6 },
          alignItems: "start",
        }}
      >
        <Stack spacing={5} sx={{ gridColumn: { xs: "1 / -1", lg: "span 9" } }}>
          <Stack spacing={1}>
            <Chip
              label="Prestige collection"
              sx={{
                alignSelf: "flex-start",
                textTransform: "uppercase",
                letterSpacing: "0.32em",
                fontSize: "0.78rem",
                fontWeight: 700,
                color: "rgba(255, 255, 255, 0.95)",
                backgroundColor: "rgba(182, 146, 40, 0.78)",
              }}
            />
            {isReady ? (
              <>
                <Typography
                  sx={{
                    fontFamily: "var(--font-playfair)",
                    fontSize: { xs: "3rem", md: "6rem", xl: "7rem" },
                    fontWeight: 600,
                    letterSpacing: "-0.02em",
                    color: "rgba(255,255,255,0.98)",
                    lineHeight: 1,
                  }}
                >
                  {heroProduct?.name}
                </Typography>
                <Typography
                  sx={{
                    maxWidth: 680,
                    color: "rgba(255,255,255,0.7)",
                    fontSize: { xs: "1rem", md: "1.15rem" },
                    lineHeight: 1.7,
                  }}
                >
                  {heroProduct?.desc}
                </Typography>
              </>
            ) : (
              <>
                <Box
                  sx={{
                    width: { xs: "70%", md: "60%" },
                    height: { xs: 44, md: 96 },
                    borderRadius: 2,
                    backgroundColor: "rgba(255,255,255,0.08)",
                  }}
                />
                <Box
                  sx={{
                    width: { xs: "90%", md: "70%" },
                    height: { xs: 18, md: 24 },
                    borderRadius: 999,
                    backgroundColor: "rgba(255,255,255,0.06)",
                  }}
                />
              </>
            )}
          </Stack>

          <Box
            sx={{
              position: "relative",
              width: { xs: "100%", md: 800 },
              borderRadius: 3,
              overflow: "visible",
              border: "1px solid rgba(255,255,255,0.1)",
              backgroundColor: "rgba(0,0,0,0.35)",
              boxShadow: "0 30px 60px rgba(0,0,0,0.45)",
            }}
          >
            <Box
              sx={{
                borderRadius: 3,
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.08)",
                backgroundColor: "rgba(255,255,255,0.03)",
                height: { xs: 420, md: 760 },
              }}
            >
              {isReady ? (
                <Box
                  component="img"
                  src={heroProduct?.images?.[0] ?? heroProduct?.image ?? fallbackImage}
                  alt={heroProduct?.name ?? "Prestige flagship"}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "50% 85%",
                    filter: "grayscale(0.25)",
                    transition: "filter 0.6s ease",
                    "&:hover": { filter: "grayscale(0)" },
                  }}
                />
              ) : (
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    background:
                      "linear-gradient(120deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
                  }}
                />
              )}
            </Box>
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.55) 100%)",
              }}
            />
            {isReady && (
              <Box
                sx={{
                  position: "absolute",
                  bottom: { xs: 16, md: 36 },
                  right: { xs: 16, md: 10 },
                  ...glass,
                  borderRadius: 2,
                  p: 3,
                  maxWidth: 320,
                  boxShadow: "0 18px 40px rgba(0,0,0,0.35)",
                }}
              >
                <Typography
                  sx={{
                    textTransform: "uppercase",
                    letterSpacing: "0.24em",
                    fontSize: "0.6rem",
                    color: "rgba(255,255,255,0.55)",
                    mb: 1,
                  }}
                >
                  Flagship piece
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "var(--font-playfair)",
                    fontSize: "1.6rem",
                    color: "rgba(255,255,255,0.95)",
                    mb: 1.5,
                  }}
                >
                  {heroProduct?.name}
                </Typography>
                <Typography sx={{ color: "rgba(255,255,255,0.65)", fontSize: "0.9rem" }}>
                  {heroProduct?.desc}
                </Typography>
                <Stack direction="row" justifyContent="space-between" alignItems="center" mt={2.5}>
                  <Typography sx={{ color: "rgba(255,255,255,0.9)", fontSize: "1.1rem" }}>
                    {formatCurrency(heroProduct?.price ?? 0)}
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{
                      textTransform: "uppercase",
                      letterSpacing: "0.22em",
                      fontSize: "0.6rem",
                      px: 3,
                      py: 1,
                      borderRadius: 999,
                      backgroundColor: "#111",
                      color: "rgba(255,255,255,0.9)",
                      "&:hover": { backgroundColor: "#000" },
                    }}
                  >
                    View detail
                  </Button>
                </Stack>
              </Box>
            )}
          </Box>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            
            <Button
              variant="outlined"
              sx={{
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                fontSize: "0.7rem",
                px: 4,
                py: 1.6,
                borderRadius: 999,
                color: "rgba(255,255,255,0.8)",
                backgroundColor: "rgb(151, 123, 38)",
                borderColor: "rgba(255,255,255,0.24)",
                "&:hover": { borderColor: "rgba(255,255,255,0.45)" },
              }}
            >
              View lookbook
            </Button>
          </Stack>
        </Stack>

        <Stack
          spacing={3}
          sx={{
            gridColumn: { xs: "3 / -1", lg: "span 3" },
            ml: { lg: -16 },
            position: { lg: "relative" },
            left: { lg: -110 },
          }}
        >
          {sideProducts.map((card) => (
            <Box
              key={card.id}
              sx={{
                ...glass,
                borderRadius: 2.5,
                p: 2.5,
                transition: "transform 0.4s ease, border-color 0.4s ease",
                "&:hover": {
                  transform: "translateY(-6px)",
                  borderColor: "rgba(242,185,13,0.35)",
                },
              }}
            >
              <Box
                sx={{
                  borderRadius: 2,
                  overflow: "hidden",
                  mb: 2,
                  aspectRatio: "4 / 3",
                }}
              >
                <Box
                  component="img"
                  src={card.images?.[0] ?? card.image ?? fallbackImage}
                  alt={card.name}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "50% 87%",
                    filter: "grayscale(0.3)",
                    transition: "transform 0.7s ease, filter 0.7s ease",
                    "&:hover": { transform: "scale(1.05)", filter: "grayscale(0)" },
                  }}
                />
              </Box>
              <Stack spacing={1.2}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography
                    sx={{
                      fontFamily: "var(--font-playfair)",
                      fontSize: "1.6rem",
                      color: "rgba(255,255,255,0.9)",
                    }}
                  >
                    {card.name}
                  </Typography>
                  <Chip
                    label="Prestige"
                    sx={{
                      fontSize: "0.55rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.7)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      backgroundColor: "transparent",
                    }}
                  />
                </Stack>
                <Typography sx={{ color: "rgba(255,255,255,0.6)", fontSize: "0.9rem" }}>
                  {card.desc ?? "Curated for collectors seeking rare material narratives."}
                </Typography>
                <Divider sx={{ borderColor: "rgba(255,255,255,0.08)" }} />
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography sx={{ color: "rgba(255,255,255,0.85)", fontSize: "1rem" }}>
                    {formatCurrency(card.price)}
                  </Typography>
                  <Typography
                    sx={{
                      color: accent,
                      fontSize: "0.8rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.24em",
                    }}
                  >
                    View →
                  </Typography>
                </Stack>
              </Stack>
            </Box>
          ))}
          {!isReady &&
            Array.from({ length: placeholderCount }).map((_, index) => (
              <Box
                key={`placeholder-${index}`}
                sx={{
                  ...glass,
                  borderRadius: 2.5,
                  p: 2.5,
                  minHeight: 320,
                }}
              >
                <Box
                  sx={{
                    borderRadius: 2,
                    height: 220,
                    backgroundColor: "rgba(255,255,255,0.06)",
                    mb: 2,
                  }}
                />
                <Box
                  sx={{
                    width: "70%",
                    height: 24,
                    borderRadius: 1,
                    backgroundColor: "rgba(255,255,255,0.08)",
                  }}
                />
              </Box>
            ))}
        </Stack>
      </Box>
      {isLoading && (
        <Typography sx={{ color: "rgba(255,255,255,0.6)", position: "relative", zIndex: 1 }}>
          Loading prestige selection...
        </Typography>
      )}
      {loadError && (
        <Typography sx={{ color: "rgba(248,113,113,0.85)", position: "relative", zIndex: 1 }}>
          {loadError}
        </Typography>
      )}
      {!isLoading && products.length === 0 && !loadError && (
        <Typography sx={{ color: "rgba(255,255,255,0.6)", position: "relative", zIndex: 1 }}>
          No products available yet.
        </Typography>
      )}
    </Stack>
  );
}

