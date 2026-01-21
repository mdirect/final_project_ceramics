import { Box, Button, Card, CardContent, Stack, Typography } from "@mui/material";

type CollectionPageProps = {
  params: {
    slug: string;
  };
};

const mockItems = [
  { id: "1", name: "The Planet Holder", price: "€120" },
  { id: "2", name: "Chipper", price: "€95" },
  { id: "3", name: "Bones Rider", price: "€110" },
  { id: "4", name: "Little Mask", price: "€80" },
  { id: "5", name: "Golden Eye", price: "€140" },
  { id: "6", name: "Night Bloom", price: "€130" },
  { id: "7", name: "Shell", price: "€90" },
  { id: "8", name: "Bird Echo", price: "€150" },
];

export default function CollectionPage({ params }: CollectionPageProps) {
  const title = params?.slug?.replace(/-/g, " ") ?? "Collection";

  return (
    
    <Stack spacing={3}>
      <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 2 }}>
        <Box>
          <Typography variant="h1">{title}</Typography>
          <Typography variant="body2" color="text.secondary">
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
          <Card
            key={item.id}
            sx={{
              borderRadius: 2,
              overflow: "hidden",
              background: "rgba(255,255,255,0.08)",
            }}
          >
            <Box
              sx={{
                position: "relative",
                pt: "95%",
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(0,0,0,0.2))",
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
        ))}
      </Box>
    </Stack>
  );
}
