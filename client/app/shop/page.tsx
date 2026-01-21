import Link from "next/link";
import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import { collections } from "@/src/shared/config/collections";

export default function ShopPage() {
  return (
    <Stack spacing={3}>
      <Typography variant="h1" sx={{textAlign:"center"}}>Shop</Typography>

      <Stack spacing={1}>
        <Typography variant="h2">Collections</Typography>
        <Typography variant="body2" color="text.secondary">
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
        {collections.map((collection) => (
          <Box key={collection.slug}>
            <Link href={`/collections/${collection.slug}`} style={{ textDecoration: "none" }}>
              <Card
                sx={{
                  borderRadius: 2,
                  overflow: "hidden",
                  background: "rgba(255,255,255,0.08)",
                  transition: "transform 0.2s ease",
                  "&:hover": { transform: "translateY(-4px)" },
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    pt: "95%",
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(0,0,0,0.2))",
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      alignItems: "flex-end",
                      p: 2,
                    }}
                  >
                    <Typography
                      sx={{
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        color: "text.primary",
                      }}
                    >
                      {collection.label}
                    </Typography>
                  </Box>
                </Box>

                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    View items in this collection
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Box>
        ))}
      </Box>
    </Stack>
  );
}