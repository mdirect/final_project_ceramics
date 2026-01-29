import Link from "next/link";
import { Box, Container, IconButton, Stack, Typography } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import InstagramIcon from "@mui/icons-material/Instagram";
import PhoneIcon from "@mui/icons-material/Phone";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

const accent = "#f2b90d";

export function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: { xs: 4, md: 5 },
        py: { xs: 4, md: 3 },
        borderTop: "1px solid rgba(255,255,255,0.08)",
        background:
          "linear-gradient(120deg, rgba(8,12,20,0.85) 0%, rgba(20,16,28,0.85) 45%, rgba(24,14,10,0.85) 100%)",
        backdropFilter: "blur(10px)",
      }}
    >
      <Container>
        <Stack spacing={2}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={{ xs: 3, md: 6 }}
            justifyContent="space-between"
          >
            <Box>
              <Typography
                sx={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: "1.2rem",
                  color: "rgba(255,255,255,0.95)",
                }}
              >
                Winter Sparrow Eye
              </Typography>
              <Typography sx={{ color: "rgba(255,255,255,0.6)", mt: 1 }}>
                WSE Jewellery • Ceramic collections and projects
              </Typography>
              <Typography
                sx={{
                  color: accent,
                  textTransform: "uppercase",
                  letterSpacing: "0.22em",
                  fontSize: "0.65rem",
                  mt: 2,
                }}
              >
                Crafted in Vienna
              </Typography>
            </Box>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={{ xs: 3, sm: 6 }}>
              <Stack spacing={1}>
                <Typography
                  sx={{
                    textTransform: "uppercase",
                    letterSpacing: "0.24em",
                    fontSize: "0.65rem",
                    color: "rgba(255,255,255,0.5)",
                  }}
                >
                  Explore
                </Typography>
                {[
                  { label: "Shop", href: "/shop" },
                  { label: "Projects", href: "/projects" },
                  { label: "Events", href: "/events" },
                ].map((item) => (
                  <Link key={item.href} href={item.href} style={{ textDecoration: "none" }}>
                    <Typography
                      sx={{
                        color: "rgba(255,255,255,0.75)",
                        "&:hover": { color: accent },
                      }}
                    >
                      {item.label}
                    </Typography>
                  </Link>
                ))}
              </Stack>

              <Stack spacing={1.5}>
                <Typography
                  sx={{
                    textTransform: "uppercase",
                    letterSpacing: "0.24em",
                    fontSize: "0.65rem",
                    color: "rgba(255,255,255,0.5)",
                  }}
                >
                  Direct
                </Typography>
                <Stack spacing={0.6}>
                  <Typography sx={{ color: "rgba(255,255,255,0.75)" }}>
                    06817274330
                  </Typography>
                  <Typography
                    component="a"
                    href="mailto:wse.jewellery@gmail.com"
                    sx={{
                      color: "rgba(255,255,255,0.75)",
                      textDecoration: "none",
                      "&:hover": { color: accent },
                    }}
                  >
                    wse.jewellery@gmail.com
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1}>
                  <IconButton
                    component="a"
                    href="https://www.instagram.com/wse.jewellery?igsh=MTM4dG9uODI0cjNseA=="
                    target="_blank"
                    rel="noreferrer"
                    sx={{
                      color: "rgba(255,255,255,0.7)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      "&:hover": { color: accent, borderColor: "rgba(242,185,13,0.6)" },
                    }}
                  >
                    <InstagramIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    component="a"
                    href="https://wa.me/436817274330"
                    target="_blank"
                    rel="noreferrer"
                    sx={{
                      color: "rgba(255,255,255,0.7)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      "&:hover": { color: accent, borderColor: "rgba(242,185,13,0.6)" },
                    }}
                  >
                    <WhatsAppIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    component="a"
                    href="mailto:wse.jewellery@gmail.com"
                    sx={{
                      color: "rgba(255,255,255,0.7)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      "&:hover": { color: accent, borderColor: "rgba(242,185,13,0.6)" },
                    }}
                  >
                    <EmailIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    component="a"
                    href="tel:06817274330"
                    sx={{
                      color: "rgba(255,255,255,0.7)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      "&:hover": { color: accent, borderColor: "rgba(242,185,13,0.6)" },
                    }}
                  >
                    <PhoneIcon fontSize="small" />
                  </IconButton>
                </Stack>
              </Stack>
            </Stack>
          </Stack>

          <Box
            sx={{
              pt: 2.5,
              borderTop: "1px solid rgba(255,255,255,0.08)",
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: { xs: "flex-start", md: "center" },
              justifyContent: "space-between",
              gap: 1.5,
            }}
          >
            <Typography sx={{ color: "rgba(255,255,255,0.5)", fontSize: "0.75rem" }}>
              © {new Date().getFullYear()} Winter Sparrow Eye. All rights reserved.
            </Typography>
            <Typography
              sx={{
                color: "rgba(255,255,255,0.5)",
                fontSize: "0.75rem",
                textTransform: "uppercase",
                letterSpacing: "0.2em",
              }}
            >
              Handmade • Limited • Ceramic
            </Typography>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}

