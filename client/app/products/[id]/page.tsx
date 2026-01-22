"use client";

import Link from "next/link";
import { Box, Button, Card, CardContent, Chip, Stack, Typography } from "@mui/material";
import { useParams, useSearchParams } from "next/navigation";

export default function ProductPage() {
  const params = useParams<{ id?: string | string[] }>();
  const idValue = Array.isArray(params?.id) ? params?.id[0] : params?.id;
  const searchParams = useSearchParams();
  const collectionSlug = searchParams.get("collection");
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
  const related = products.filter((item) => item.id !== view.id).slice(0, 4);

  return (
    <Stack spacing={3}>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" gap={2}>
        <Stack spacing={1}>
          <Typography variant="h1">{view.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            {view.price}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1.5}>
          <Link
            href={collectionSlug ? `/collections/${collectionSlug}` : "/shop"}
            style={{ textDecoration: "none" }}
          >
            <Button
              size="small"
              variant="outlined"
              sx={{
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                borderColor: "rgba(255,255,255,0.7)",
                color: "rgba(255,255,255,0.9)",
              }}
            >
              Back to collection
            </Button>
          </Link>
          <Button
            variant="contained"
            size="small"
            sx={{
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              backgroundColor: "rgba(255,255,255,0.85)",
              color: "rgba(0,0,0,0.82)",
              "&:hover": { backgroundColor: "rgba(255,255,255,1)" },
            }}
          >
            Add to cart
          </Button>
        </Stack>
      </Stack>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1.1fr 1fr" },
          gap: 3,
        }}
      >
        <Stack spacing={2}>
          <Box
            sx={{
              borderRadius: 2,
              overflow: "hidden",
              minHeight: 320,
              backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.45) 100%), url(${view.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <Stack direction="row" spacing={2}>
            {[view.image, view.image, view.image].map((src, index) => (
              <Box
                key={`${view.name}-thumb-${index}`}
                sx={{
                  flex: 1,
                  borderRadius: 2,
                  overflow: "hidden",
                  minHeight: 90,
                  backgroundImage: `url(${src})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              />
            ))}
          </Stack>
        </Stack>

        <Stack spacing={2}>
          <Stack spacing={1}>
            <Typography variant="h6">Description</Typography>
            <Typography variant="body2" color="text.secondary">
              {view.description}
            </Typography>
          </Stack>

          <Stack direction="row" spacing={1} flexWrap="wrap">
            {view.materials.map((material) => (
              <Chip
                key={material}
                label={material}
                size="small"
                sx={{
                  backgroundColor: "rgba(255,255,255,0.16)",
                  color: "rgba(255,255,255,0.9)",
                  borderColor: "rgba(255,255,255,0.3)",
                }}
                variant="outlined"
              />
            ))}
          </Stack>

          <Stack spacing={1}>
            <Typography variant="h6">Details</Typography>
            <Typography variant="body2" color="text.secondary">
              Size: {view.size}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Availability: {view.availability}
            </Typography>
          </Stack>
        </Stack>
      </Box>

      <Stack spacing={2}>
        <Typography variant="h6">Related pieces</Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(4, 1fr)" },
            gap: 2,
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
              <Card
                sx={{
                  borderRadius: 2,
                  overflow: "hidden",
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 14px 26px rgba(0,0,0,0.18)",
                  },
                }}
              >
                <Box
                  sx={{
                    pt: "80%",
                    backgroundImage: `url(${item.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                <CardContent>
                  <Typography sx={{ textTransform: "uppercase", letterSpacing: "0.08em" }}>
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.price}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          ))}
        </Box>
      </Stack>
    </Stack>
  );
}

