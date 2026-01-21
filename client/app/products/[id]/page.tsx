import { Stack, Typography } from "@mui/material";

type ProductPageProps = {
  params: {
    id: string;
  };
};

export default function ProductPage({ params }: ProductPageProps) {
  return (
    <Stack spacing={2}>
      <Typography variant="h1">Product {params.id}</Typography>
      <Typography variant="body2" color="text.secondary">
        Gallery, description, materials, and availability.
      </Typography>
    </Stack>
  );
}

