"use client";

import Link from "next/link";
import { Box, Button, Card, CardContent, Stack, Typography } from "@mui/material";
import { useParams } from "next/navigation";
import { collections } from "@/src/shared/config/collections";

const mockItems = [
  {
    id: "1",
    name: "The Planet Holder",
    price: "€120",
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "2",
    name: "Chipper",
    price: "€95",
    image:
      "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "3",
    name: "Bones Rider",
    price: "€110",
    image:
      "https://images.unsplash.com/photo-1505852679233-d9fd70aff56d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "4",
    name: "Little Mask",
    price: "€80",
    image:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "5",
    name: "Golden Eye",
    price: "€140",
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "6",
    name: "Night Bloom",
    price: "€130",
    image:
      "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "7",
    name: "Shell",
    price: "€90",
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "8",
    name: "Bird Echo",
    price: "€150",
    image:
      "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=1200&q=80",
  },
];

export default function CollectionPage() {
  const params = useParams<{ slug?: string | string[] }>();
  const slugValue = Array.isArray(params?.slug) ? params?.slug[0] : params?.slug;
  const formatTitle = (value?: string) =>
    value
      ? value
          .replace(/-/g, " ")
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")
      : "Collection";

  const matched = collections.find((collection) => collection.slug === slugValue);
  const title = matched?.label ?? formatTitle(slugValue);

  return (
    
    <Stack spacing={3}>
      <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 2 }}>
        <Box>
          <Typography variant="h1">{title}</Typography>
          <Typography  color="rgb(49, 53, 42)" sx={{fontWeight: 400, fontSize: "1.3rem"}}>
            Collection items
          </Typography>
        </Box>
        <Button
          href="/shop"
          size="small"
          variant="outlined"
          sx={{
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            borderColor: "rgba(255,255,255,0.7)",
            color: "rgba(255,255,255,0.9)"
          }}
        >
          All collections
        </Button>
      </Box>

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
        {mockItems.map((item) => (
          <Link
            key={item.id}
            href={`/products/${item.id}?collection=${slugValue ?? ""}`}
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
                  position: "relative",
                  pt: "95%",
                  backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.55) 100%), url(${item.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <CardContent>
                <Typography
                  sx={{
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                  }}
                >
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
  );
}
