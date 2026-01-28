import { Stack, Typography } from "@mui/material";

export default function ContactsPage() {
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
        Contacts
      </Typography>
      <Stack spacing={1}>
        <Typography>WSE Jewellery</Typography>
        <Typography>Email: wse.jewellery@gmail.com</Typography>
        <Typography
          component="a"
          href="https://www.instagram.com/wse.jewellery?igsh=MTM4dG9uODI0cjNseA=="
          sx={{ color: "text.primary" }}
        >
          Instagram: wse.jewellery
        </Typography>
      </Stack>
      <Stack spacing={1}>
        <Typography
          variant="h2"
          sx={{
            fontFamily: "var(--font-playfair)",
            color: "rgba(255,255,255,0.95)",
          }}
        >
          Contact Us
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Contact form placeholder.
        </Typography>
      </Stack>
      <Stack spacing={1}>
        <Typography
          variant="h2"
          sx={{
            fontFamily: "var(--font-playfair)",
            color: "rgba(255,255,255,0.95)",
          }}
        >
          Catalogs
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Subscribe to catalogs and news.
        </Typography>
      </Stack>
    </Stack>
  );
}

