import { Stack, Typography } from "@mui/material";

export default function ContactsPage() {
  return (
    <Stack spacing={2}>
      <Typography variant="h1">Contacts</Typography>
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
        <Typography variant="h2">Contact Us</Typography>
        <Typography variant="body2" color="text.secondary">
          Contact form placeholder.
        </Typography>
      </Stack>
      <Stack spacing={1}>
        <Typography variant="h2">Catalogs</Typography>
        <Typography variant="body2" color="text.secondary">
          Subscribe to catalogs and news.
        </Typography>
      </Stack>
    </Stack>
  );
}

