import { Stack, Typography } from "@mui/material";

const sections = [
  "Delivery",
  "Return Policy",
  "Terms & Conditions",
  "Privacy Policy",
  "Cookie Policy",
];

export default function PolicyPage() {
  return (
    <Stack spacing={2}>
      <Typography variant="h1">Policy & Delivery Terms</Typography>
      <Stack spacing={1}>
        {sections.map((title) => (
          <Typography key={title}>{title}</Typography>
        ))}
      </Stack>
    </Stack>
  );
}

