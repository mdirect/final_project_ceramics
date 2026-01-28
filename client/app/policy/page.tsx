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
    <Stack spacing={2} sx={{ fontFamily: "var(--font-inter)" }}>
      <Typography
        variant="h1"
        sx={{
          fontFamily: "var(--font-playfair)",
          fontSize: { xs: "2.4rem", md: "3.4rem" },
          fontWeight: 600,
          letterSpacing: "-0.02em",
          textTransform: "none",
          color: "rgba(255,255,255,0.98)",
        }}
      >
        Policy & Delivery Terms
      </Typography>
      <Stack spacing={1}>
        {sections.map((title) => (
          <Typography key={title}>{title}</Typography>
        ))}
      </Stack>
    </Stack>
  );
}

