import { Stack, Typography } from "@mui/material";

export default function Home() {
  return (
    <Stack spacing={2}>
      <Typography variant="h1">WINTER SPARROW EYE</Typography>
      <Typography>WSE jewellery store, collections, and projects.</Typography>
      <Stack spacing={1}>
        <Typography variant="h2">Brand</Typography>
        <Typography variant="body2" color="text.secondary">
          Ceramic jewellery and objects with collections, events, and custom
          projects.
        </Typography>
      </Stack>
    </Stack>
  );
}
