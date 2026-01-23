"use client";

import Link from "next/link";
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import { useParams, useSearchParams } from "next/navigation";
import BrushIcon from "@mui/icons-material/Brush";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import CropSquareIcon from "@mui/icons-material/CropSquare";
import VerifiedIcon from "@mui/icons-material/Verified";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useState } from "react";

export default function ProductPage() {
  const params = useParams<{ id?: string | string[] }>();
  const idValue = Array.isArray(params?.id) ? params?.id[0] : params?.id;
  const searchParams = useSearchParams();
  const collectionSlug = searchParams.get("collection");
  const accent = "#f2b90d";

  const products = [
    {
      id: "1",
      name: "The Planet Holder",
      price: "€120",
      image:
        "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1600&q=80",
      description:
        "A celestial-inspired piece with a soft metallic sheen and fine detailing.",
      materials: ["Porcelain", "Gold luster", "Hand-polished glaze"],
      size: "10 × 12 × 8 cm",
      availability: "In stock",
    },
    {
      id: "2",
      name: "Chipper",
      price: "€95",
      image:
        "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=1600&q=80",
      description:
        "Minimal form with a balanced silhouette, ideal for everyday wear.",
      materials: ["Stoneware", "Matte glaze"],
      size: "7 × 5 × 3 cm",
      availability: "Limited",
    },
    {
      id: "3",
      name: "Bones Rider",
      price: "€110",
      image:
        "https://images.unsplash.com/photo-1505852679233-d9fd70aff56d?auto=format&fit=crop&w=1600&q=80",
      description:
        "Bold texture and asymmetry, inspired by movement and contrast.",
      materials: ["Porcelain", "Oxide wash"],
      size: "9 × 6 × 4 cm",
      availability: "In stock",
    },
    {
      id: "4",
      name: "Little Mask",
      price: "€80",
      image:
        "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1600&q=80",
      description:
        "Expressive form with subtle grooves and an elegant matte finish.",
      materials: ["Stoneware", "Satin glaze"],
      size: "6 × 6 × 2 cm",
      availability: "Made to order",
    },
    {
      id: "5",
      name: "Golden Eye",
      price: "€140",
      image:
        "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1600&q=80",
      description:
        "Luminous accents and layered glazing create depth and glow.",
      materials: ["Porcelain", "Gold luster"],
      size: "8 × 8 × 4 cm",
      availability: "In stock",
    },
    {
      id: "6",
      name: "Night Bloom",
      price: "€130",
      image:
        "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?auto=format&fit=crop&w=1600&q=80",
      description:
        "Floral-inspired detailing with deep tones and delicate edges.",
      materials: ["Porcelain", "Gloss glaze"],
      size: "9 × 7 × 4 cm",
      availability: "In stock",
    },
    {
      id: "7",
      name: "Shell",
      price: "€90",
      image:
        "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1600&q=80",
      description:
        "Layered texture with soft curvature reminiscent of shoreline forms.",
      materials: ["Stoneware", "Pearl glaze"],
      size: "7 × 7 × 3 cm",
      availability: "Limited",
    },
    {
      id: "8",
      name: "Bird Echo",
      price: "€150",
      image:
        "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=1600&q=80",
      description:
        "Graceful profile with intricate surface work and airy proportions.",
      materials: ["Porcelain", "Crystal glaze"],
      size: "11 × 8 × 5 cm",
      availability: "In stock",
    },
  ];

  const product = products.find((item) => item.id === idValue);
  const fallback = {
    id: idValue ?? "unknown",
    name: `Product ${idValue ?? "—"}`,
    price: "€—",
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1600&q=80",
    description: "Gallery, description, materials, and availability.",
    materials: ["Porcelain"],
    size: "—",
    availability: "Check availability",
  };
  const view = product ?? fallback;
  const related = products.filter((item) => item.id !== view.id).slice(0, 6);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const galleryImages = [
    view.image,
    "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1505852679233-d9fd70aff56d?auto=format&fit=crop&w=1600&q=80",
  ];
  const activeSrc = galleryImages[Math.min(activeImage, galleryImages.length - 1)];

  return (
    <Stack spacing={6}>
      <Stack direction="row" spacing={1} sx={{ color: "rgba(255,255,255,0.5)" }}>
        <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Typography sx={{ fontSize: "0.85rem", "&:hover": { color: accent } }}>Home</Typography>
        </Link>
        <Typography sx={{ fontSize: "0.85rem" }}>/</Typography>
        <Link
          href={collectionSlug ? `/collections/${collectionSlug}` : "/shop"}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Typography sx={{ fontSize: "0.85rem", "&:hover": { color: accent } }}>
            {collectionSlug ?? "Collections"}
          </Typography>
        </Link>
        <Typography sx={{ fontSize: "0.85rem" }}>/</Typography>
        <Typography sx={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.9)" }}>
          {view.name}
        </Typography>
      </Stack>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "7fr 5fr" },
          gap: { xs: 4, lg: 6 },
          alignItems: "start",
        }}
      >
        <Stack spacing={3} direction={{ xs: "column-reverse", lg: "row" }}>
          <Stack direction={{ xs: "row", lg: "column" }} spacing={2}>
            {galleryImages.map((src, index) => (
              <Box
                key={`${view.id}-thumb-${index}`}
                onClick={() => setActiveImage(index)}
                sx={{
                  width: { xs: 72, lg: 96 },
                  height: { xs: 72, lg: 96 },
                  borderRadius: 2,
                  overflow: "hidden",
                  border:
                    index === activeImage
                      ? `2px solid ${accent}`
                      : "1px solid rgba(255,255,255,0.1)",
                  cursor: "pointer",
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    backgroundImage: `url(${src})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    filter: index === activeImage ? "none" : "grayscale(0.5)",
                  }}
                />
              </Box>
            ))}
          </Stack>
          <Box
            sx={{
              flex: 1,
              borderRadius: 3,
              overflow: "hidden",
              aspectRatio: "4 / 5",
              position: "relative",
              backgroundColor: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                backgroundImage: `url(${activeSrc})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                transition: "transform 0.7s ease",
                "&:hover": { transform: "scale(1.06)" },
              }}
            />
            <Box
              sx={{
                position: "absolute",
                bottom: 16,
                left: 16,
                px: 2,
                py: 0.7,
                borderRadius: 999,
                backgroundColor: "rgba(0,0,0,0.35)",
                border: "1px solid rgba(255,255,255,0.1)",
                fontSize: "0.7rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.8)",
              }}
            >
              Hover to zoom
            </Box>
          </Box>
        </Stack>

        <Box
          sx={{
            borderRadius: 3,
            p: { xs: 3, md: 4 },
            backgroundColor: "rgba(34, 30, 16, 0.6)",
            border: "1px solid rgba(255,255,255,0.1)",
            backdropFilter: "blur(20px)",
            position: "sticky",
            top: 96,
          }}
        >
          <Stack spacing={3}>
            <Box>
              <Typography
                sx={{
                  textTransform: "uppercase",
                  letterSpacing: "0.2em",
                  fontSize: "0.7rem",
                  color: accent,
                  fontWeight: 700,
                }}
              >
                Limited Collection
              </Typography>
              <Typography sx={{ fontSize: "2rem", fontWeight: 700, mt: 1 }}>
                {view.name}
              </Typography>
              <Stack direction="row" spacing={2} alignItems="baseline" sx={{ mt: 1 }}>
                <Typography sx={{ fontSize: "1.7rem", color: accent, fontWeight: 300 }}>
                  {view.price}
                </Typography>
                <Typography sx={{ color: "rgba(255,255,255,0.35)", textDecoration: "line-through" }}>
                  €165
                </Typography>
              </Stack>
            </Box>

            <Box>
              <Typography
                sx={{
                  textTransform: "uppercase",
                  letterSpacing: "0.18em",
                  fontSize: "0.7rem",
                  color: "rgba(255,255,255,0.55)",
                  borderBottom: "1px solid rgba(255,255,255,0.1)",
                  pb: 1,
                  mb: 2,
                }}
              >
                Characteristics
              </Typography>
              <Stack spacing={1.5}>
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <BrushIcon sx={{ color: accent, fontSize: 18 }} />
                  <Typography sx={{ color: "rgba(255,255,255,0.8)", fontSize: "0.9rem" }}>
                    Hand-thrown stoneware
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <LocalFloristIcon sx={{ color: accent, fontSize: 18 }} />
                  <Typography sx={{ color: "rgba(255,255,255,0.8)", fontSize: "0.9rem" }}>
                    24k Gold Luster accents
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <CropSquareIcon sx={{ color: accent, fontSize: 18 }} />
                  <Typography sx={{ color: "rgba(255,255,255,0.8)", fontSize: "0.9rem" }}>
                    Dimensions: {view.size}
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <VerifiedIcon sx={{ color: accent, fontSize: 18 }} />
                  <Typography sx={{ color: "rgba(255,255,255,0.8)", fontSize: "0.9rem" }}>
                    Includes Certificate of Authenticity
                  </Typography>
                </Stack>
              </Stack>
            </Box>

            <Stack spacing={1.5}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    borderRadius: 2,
                    border: "1px solid rgba(255,255,255,0.1)",
                    backgroundColor: "rgba(255,255,255,0.05)",
                  }}
                >
                  <IconButton
                    onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                    sx={{ color: "rgba(255,255,255,0.7)" }}
                  >
                    <RemoveIcon />
                  </IconButton>
                  <Typography sx={{ width: 32, textAlign: "center", fontWeight: 700 }}>
                    {quantity}
                  </Typography>
                  <IconButton
                    onClick={() => setQuantity((value) => value + 1)}
                    sx={{ color: "rgba(255,255,255,0.7)" }}
                  >
                    <AddIcon />
                  </IconButton>
                </Box>
                <Button
                  fullWidth
                  sx={{
                    height: 48,
                    backgroundColor: accent,
                    color: "rgba(18,21,26,0.9)",
                    fontWeight: 800,
                    "&:hover": { backgroundColor: "#f6c423" },
                  }}
                >
                  Add to Cart
                </Button>
              </Stack>
              <Button
                variant="outlined"
                startIcon={<FavoriteBorderIcon sx={{ color: accent }} />}
                sx={{
                  borderColor: "rgba(255,255,255,0.12)",
                  color: "rgba(255,255,255,0.8)",
                  "&:hover": { borderColor: "rgba(255,255,255,0.3)" },
                }}
              >
                Add to Wishlist
              </Button>
            </Stack>

            <Stack direction="row" spacing={2} alignItems="center" sx={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem" }}>
              <Typography>Free Global Shipping</Typography>
              <Box sx={{ width: 4, height: 4, borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.2)" }} />
              <Typography>30-Day Returns</Typography>
            </Stack>
          </Stack>
        </Box>
      </Box>

      <Box>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography sx={{ fontSize: "1.4rem", fontWeight: 700 }}>Recommended for You</Typography>
          <Stack direction="row" spacing={1}>
            <IconButton
              sx={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "rgba(255,255,255,0.7)",
                "&:hover": { backgroundColor: "rgba(255,255,255,0.08)" },
              }}
            >
              <ChevronLeftIcon />
            </IconButton>
            <IconButton
              sx={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "rgba(255,255,255,0.7)",
                "&:hover": { backgroundColor: "rgba(255,255,255,0.08)" },
              }}
            >
              <ChevronRightIcon />
            </IconButton>
          </Stack>
        </Stack>
        <Box
          sx={{
            display: "grid",
            gridAutoFlow: "column",
            gridAutoColumns: { xs: "70%", sm: "45%", md: "23%" },
            gap: 3,
            overflowX: "auto",
            pb: 2,
          }}
        >
          {related.map((item) => (
            <Link
              key={item.id}
              href={
                collectionSlug
                  ? `/products/${item.id}?collection=${collectionSlug}`
                  : `/products/${item.id}`
              }
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Box sx={{ minWidth: 240 }}>
                <Box
                  sx={{
                    aspectRatio: "1 / 1",
                    borderRadius: 3,
                    overflow: "hidden",
                    backgroundColor: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      height: "100%",
                      backgroundImage: `url(${item.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      transition: "transform 0.5s ease",
                      "&:hover": { transform: "scale(1.05)" },
                    }}
                  />
                </Box>
                <Typography sx={{ mt: 1.5, fontWeight: 700 }}>{item.name}</Typography>
                <Typography sx={{ color: accent, fontWeight: 600 }}>{item.price}</Typography>
              </Box>
            </Link>
          ))}
        </Box>
      </Box>
    </Stack>
  );
}

