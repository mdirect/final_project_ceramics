import { Stack, Typography } from "@mui/material";
import { ProductGrid } from "@/src/widgets/product-grid";

export default function PrestigePage() {
  return (
    <Stack spacing={2} sx={{ fontFamily: "var(--font-inter)" }}>
      <Typography
        variant="h1"
        sx={{
          fontFamily: "var(--font-playfair)",
          fontSize: { xs: "2.6rem", md: "3.6rem" },
          fontWeight: 600,
          letterSpacing: "-0.02em",
          textTransform: "none",
          color: "rgba(255,255,255,0.98)",
        }}
      >
        Prestige
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Premium selection with limited pieces.
      </Typography>
      <ProductGrid title="Prestige items" />
    </Stack>
  );
}

