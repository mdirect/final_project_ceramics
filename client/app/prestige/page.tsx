import { Stack, Typography } from "@mui/material";
import { ProductGrid } from "@/src/widgets/product-grid";

export default function PrestigePage() {
  return (
    <Stack spacing={2}>
      <Typography variant="h1">Prestige</Typography>
      <Typography variant="body2" color="text.secondary">
        Premium selection with limited pieces.
      </Typography>
      <ProductGrid title="Prestige items" />
    </Stack>
  );
}

