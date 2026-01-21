import { Stack, Typography } from "@mui/material";

export default function CartPage() {
  return (
    <Stack spacing={2}>
      <Typography variant="h1">Cart</Typography>
      <Typography variant="body2" color="text.secondary">
        Delivery calculation and checkout summary.
      </Typography>
    </Stack>
  );
}

