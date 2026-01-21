import { Stack, Typography } from "@mui/material";

export default function EventsPage() {
  return (
    <Stack spacing={2}>
      <Typography variant="h1">Events</Typography>
      <Typography variant="body2" color="text.secondary">
        Exhibitions, markets, and upcoming participation.
      </Typography>
    </Stack>
  );
}

