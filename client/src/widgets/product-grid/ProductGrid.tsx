import { Box, Typography } from "@mui/material";

type ProductGridProps = {
  title?: string;
};

export function ProductGrid({ title }: ProductGridProps) {
  return (
    <Box>
      <Typography variant="h2">{title ?? "Products"}</Typography>
      <Typography variant="body2" color="text.secondary">
        Grid placeholder for product cards.
      </Typography>
    </Box>
  );
}

