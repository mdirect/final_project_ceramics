"use client";

import Link from "next/link";
import { Box, Card, CardContent, Chip, IconButton, Stack, Typography } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useMemo, useState } from "react";
import { collections } from "@/src/shared/config/collections";

const collectionMeta: Record<
  string,
  { image: string; tone: string; accent: string; description: string; category: string }
> = {
  hands: {
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1600&q=80",
    tone: "rgba(35, 42, 40, 0.72)",
    accent: "#e6d3bf",
    description: "Warm, tactile pieces inspired by gesture and craft.",
    category: "jewelry",
  },
  bearlings: {
    image:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1600&q=80",
    tone: "rgba(24, 38, 58, 0.7)",
    accent: "#cbd8e6",
    description: "Playful silhouettes with gentle, rounded forms.",
    category: "jewelry",
  },
  "dear-deer": {
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1600&q=80",
    tone: "rgba(28, 46, 34, 0.7)",
    accent: "#d3e4c8",
    description: "Forest tones with soft, elegant contours.",
    category: "jewelry",
  },
  lotus: {
    image:
      "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=1600&q=80",
    tone: "rgba(34, 26, 48, 0.72)",
    accent: "#e9d4ff",
    description: "Bloom-inspired ceramics with calm symmetry.",
    category: "ceramics",
  },
  microworld: {
    image:
      "https://images.unsplash.com/photo-1505852679233-d9fd70aff56d?auto=format&fit=crop&w=1600&q=80",
    tone: "rgba(18, 44, 48, 0.72)",
    accent: "#bfe9e6",
    description: "Miniature landscapes and tiny living scenes.",
    category: "ceramics",
  },
  "sci-fi": {
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1600&q=80",
    tone: "rgba(16, 26, 42, 0.74)",
    accent: "#b6d3ff",
    description: "Futuristic textures with metallic glints.",
    category: "ceramics",
  },
  "masks-and-faces": {
    image:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1600&q=80",
    tone: "rgba(36, 36, 36, 0.7)",
    accent: "#e3dfd6",
    description: "Portrait-inspired forms with expressive lines.",
    category: "jewelry",
  },
  floral: {
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1600&q=80",
    tone: "rgba(54, 34, 40, 0.72)",
    accent: "#ffd5e1",
    description: "Petal shapes and soft botanical motifs.",
    category: "jewelry",
  },
  baroque: {
    image:
      "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=1600&q=80",
    tone: "rgba(40, 30, 20, 0.74)",
    accent: "#f1d3a2",
    description: "Ornate textures and dramatic silhouettes.",
    category: "limited",
  },
  "man-and-ball": {
    image:
      "https://images.unsplash.com/photo-1505852679233-d9fd70aff56d?auto=format&fit=crop&w=1600&q=80",
    tone: "rgba(42, 30, 26, 0.74)",
    accent: "#f2cbb9",
    description: "Sculptural balance between weight and poise.",
    category: "limited",
  },
  "out-of-collections": {
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1600&q=80",
    tone: "rgba(28, 28, 28, 0.74)",
    accent: "#d6d6d6",
    description: "Experimental pieces that break the mold.",
    category: "limited",
  },
};

const collectionFilters = [
  { label: "All Objects", value: "all" },
  { label: "Jewelry", value: "jewelry" },
  { label: "Ceramics", value: "ceramics" },
  { label: "Limited Edition", value: "limited" },
];

export default function ShopPage() {
  const pageSize = 8;
  const [page, setPage] = useState(1);
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredCollections = useMemo(() => {
    if (activeFilter === "all") {
      return collections;
    }
    return collections.filter((collection) => {
      const meta = collectionMeta[collection.slug];
      return (meta?.category ?? "other") === activeFilter;
    });
  }, [activeFilter]);

  const pageCount = Math.max(1, Math.ceil(filteredCollections.length / pageSize));
  const clampedPage = Math.min(page, pageCount);

  const pageCollections = useMemo(() => {
    const start = (clampedPage - 1) * pageSize;
    return filteredCollections.slice(start, start + pageSize);
  }, [clampedPage, filteredCollections]);
  const placeholders = Math.max(0, pageSize - pageCollections.length);

  useEffect(() => {
    setPage(1);
  }, [activeFilter]);

  return (
    <Stack spacing={3}>
      <Stack spacing={2} alignItems="center" textAlign="center">
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
            px: 2,
            py: 1.2,
            borderRadius: 999,
            border: "1px solid rgba(255,255,255,0.28)",
            backgroundColor: "rgba(255,255,255,0.1)",
            backdropFilter: "blur(10px)",
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1.5} sx={{ flexWrap: "wrap" }}>
            <Typography
              sx={{
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                fontSize: "0.9rem",
                color: "rgba(255,255,255,0.7)",
                fontWeight: 700,
              }}
            >
              Filters
            </Typography>
            <Box sx={{ width: "1px", height: 16, backgroundColor: "rgba(255,255,255,0.35)" }} />
            {collectionFilters.map((filter) => (
              <Chip
                key={filter.value}
                label={filter.label}
                size="medium"
                onClick={() => setActiveFilter(filter.value)}
                variant={activeFilter === filter.value ? "filled" : "outlined"}
                sx={{
                  borderColor: "rgba(255,255,255,0.35)",
                  color: "rgba(255,255,255,0.9)",
                  fontWeight: 700,
                  backgroundColor:
                    activeFilter === filter.value ? "rgba(255,255,255,0.28)" : "transparent",
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.22)",
                    fontSize: ".9rem",
                  },
                }}
              />
            ))}
          </Stack>
        </Box>

        <Typography variant="h1" sx={{ fontWeight: 500 }}>
          Collections
        </Typography>

        <Typography
          color="rgb(58, 64, 48)"
          sx={{ fontWeight: 400, fontSize: "1.1rem", fontStyle: "italic" }}
        >
          Choose a collection to explore its curated items
        </Typography>
      </Stack>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(4, 1fr)",
          },
          gap: 2,
        }}
      >
        {pageCollections.map((collection) => {
          const meta = collectionMeta[collection.slug] ?? {
            image: "/collections/out-of-collections.svg",
            tone: "rgba(20, 20, 20, 0.7)",
            accent: "#e6e6e6",
            description: "Curated ceramics with a distinct personality.",
          };

          return (
          <Box key={collection.slug}>
            <Link href={`/collections/${collection.slug}`} style={{ textDecoration: "none" }}>
              <Card
                sx={{
                  borderRadius: 2,
                  overflow: "hidden",
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: "0 18px 32px rgba(0,0,0,0.2)",
                  },
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    pt: "95%",
                    backgroundImage: `url(${meta.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    flexShrink: 0,
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                      gap: 1.5,
                      p: 2.5,
                      background: `linear-gradient(180deg, rgba(0,0,0,0) 0%, ${meta.tone} 85%)`,
                    }}
                  >
                    <Typography
                      sx={{
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        color: "common.white",
                      }}
                    >
                      {collection.label}
                    </Typography>
                  </Box>
                </Box>

                <CardContent sx={{ minHeight: { xs: 72, md: 86 } }}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {meta.description}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Box>
          );
        })}
        {Array.from({ length: placeholders }).map((_, index) => (
          <Box key={`placeholder-${index}`}>
            <Card
              sx={{
                borderRadius: 2,
                overflow: "hidden",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                visibility: "hidden",
              }}
            >
              <Box sx={{ position: "relative", pt: "95%", flexShrink: 0 }} />
              <CardContent sx={{ minHeight: { xs: 72, md: 86 } }}>
                <Typography variant="body2">Placeholder</Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>

      <Box sx={{ height: { xs: 16, md: 14 } }} />

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        spacing={2}
        sx={{ mt: 4 }}
      >
        <IconButton
          onClick={() => setPage((current) => Math.max(1, current - 1))}
          disabled={clampedPage === 1}
          sx={{
            border: "2px solid rgba(255,255,255,0.35)",
            color: "rgba(255,255,255,0.8)",
            backgroundColor: "rgba(255,255,255,0.08)",
            "&:hover": { backgroundColor: "rgba(255,255,255,0.16)" },
          }}
        >
          <ArrowBackIosNewIcon fontSize="medium" />
        </IconButton>

        <Typography
          sx={{
            letterSpacing: "0.2em",
            fontSize: "0.85rem",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.8)",
          }}
        >
          {String(clampedPage).padStart(2, "0")} / {String(pageCount).padStart(2, "0")}
        </Typography>

        <IconButton
          onClick={() => setPage((current) => Math.min(pageCount, current + 1))}
          disabled={clampedPage === pageCount}
          sx={{
            border: "2px solid rgba(255,255,255,0.35)",
            color: "rgba(255,255,255,0.8)",
            backgroundColor: "rgba(255,255,255,0.08)",
            "&:hover": { backgroundColor: "rgba(255,255,255,0.16)" },
          }}
        >
          <ArrowForwardIosIcon fontSize="medium" />
        </IconButton>
      </Stack>
    </Stack>
  );
}