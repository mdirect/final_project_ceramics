import Link from "next/link";
import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import { collections } from "@/src/shared/config/collections";

const collectionMeta: Record<
  string,
  { image: string; tone: string; accent: string; description: string }
> = {
  hands: {
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1600&q=80",
    tone: "rgba(35, 42, 40, 0.72)",
    accent: "#e6d3bf",
    description: "Warm, tactile pieces inspired by gesture and craft.",
  },
  bearlings: {
    image:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1600&q=80",
    tone: "rgba(24, 38, 58, 0.7)",
    accent: "#cbd8e6",
    description: "Playful silhouettes with gentle, rounded forms.",
  },
  "dear-deer": {
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1600&q=80",
    tone: "rgba(28, 46, 34, 0.7)",
    accent: "#d3e4c8",
    description: "Forest tones with soft, elegant contours.",
  },
  lotus: {
    image:
      "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=1600&q=80",
    tone: "rgba(34, 26, 48, 0.72)",
    accent: "#e9d4ff",
    description: "Bloom-inspired ceramics with calm symmetry.",
  },
  microworld: {
    image:
      "https://images.unsplash.com/photo-1505852679233-d9fd70aff56d?auto=format&fit=crop&w=1600&q=80",
    tone: "rgba(18, 44, 48, 0.72)",
    accent: "#bfe9e6",
    description: "Miniature landscapes and tiny living scenes.",
  },
  "sci-fi": {
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1600&q=80",
    tone: "rgba(16, 26, 42, 0.74)",
    accent: "#b6d3ff",
    description: "Futuristic textures with metallic glints.",
  },
  "masks-and-faces": {
    image:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1600&q=80",
    tone: "rgba(36, 36, 36, 0.7)",
    accent: "#e3dfd6",
    description: "Portrait-inspired forms with expressive lines.",
  },
  floral: {
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1600&q=80",
    tone: "rgba(54, 34, 40, 0.72)",
    accent: "#ffd5e1",
    description: "Petal shapes and soft botanical motifs.",
  },
  baroque: {
    image:
      "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=1600&q=80",
    tone: "rgba(40, 30, 20, 0.74)",
    accent: "#f1d3a2",
    description: "Ornate textures and dramatic silhouettes.",
  },
  "man-and-ball": {
    image:
      "https://images.unsplash.com/photo-1505852679233-d9fd70aff56d?auto=format&fit=crop&w=1600&q=80",
    tone: "rgba(42, 30, 26, 0.74)",
    accent: "#f2cbb9",
    description: "Sculptural balance between weight and poise.",
  },
  "out-of-collections": {
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1600&q=80",
    tone: "rgba(28, 28, 28, 0.74)",
    accent: "#d6d6d6",
    description: "Experimental pieces that break the mold.",
  },
};

export default function ShopPage() {
  return (
    <Stack spacing={3}>
      <Typography variant="h1" sx={{textAlign:"center"}}>Collections</Typography>

      <Stack spacing={1}>
        <Typography color="rgb(58, 64, 48)" sx={{fontWeight: 400, fontSize: "1.3rem"}}>
          Choose a collection to explore its items.
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
        {collections.map((collection) => {
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

                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {meta.description}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Box>
          );
        })}
      </Box>
    </Stack>
  );
}