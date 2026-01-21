import { Stack, Typography } from "@mui/material";

export default function SignInPage() {
  return (
    <Stack spacing={2}>
      <Typography variant="h1">Sign in</Typography>
      <Typography variant="body2" color="text.secondary">
        Account access and order history.
      </Typography>
    </Stack>
  );
}

