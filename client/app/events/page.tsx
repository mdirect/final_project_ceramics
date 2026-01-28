import { Box, Button, Stack, Typography } from "@mui/material";

const events = [
  {
    label: "March 12 — 15, 2024",
    title: "Vernissage of the Void",
    description:
      'An exclusive showcase of our "Winter Silence" ceramic collection. Exploring the tactile nature of emptiness and shadow in our London atelier.',
    location: "Tate Modern Annex, London",
    action: "Details",
    icon: "calendar_today",
  },
  {
    label: "Featured Event",
    title: "Paris Design Week",
    description:
      "Winter Sparrow Eye joins the 'Matière Première' exhibition. A dialogue between raw minerals and refined jewelry craftsmanship.",
    location: "Le Marais, Rue de Turenne, Paris",
    action: "Register Attendance",
    icon: "stars",
    featured: true,
  },
  {
    label: "April 20, 2024",
    title: "The Artisans Market",
    description:
      "A curated gathering of independent creators. We will be offering a limited run of studio seconds and experimental prototypes.",
    location: "The Old Truman Brewery, London",
    action: "Details",
    icon: "local_mall",
  },
  {
    label: "May 05, 2024",
    title: "Workshop: The Sparrow's Eye",
    description:
      'An intimate workshop on the philosophy of "Quiet Craft". Learn our unique methods of ceramic texturing and gold leaf application.',
    location: "Winter Sparrow Eye Studio, Kent",
    action: "Join Waitlist",
    icon: "palette",
  },
  {
    label: "June 18, 2024",
    title: "Kyoto Craft Biennale",
    description:
      "Representing modern British craftsmanship in the heart of Japan's ancient ceramic capital. A celebration of cross-cultural artistry.",
    location: "Kyoto International Exhibition Hall",
    action: "Learn More",
    icon: "public",
  },
];

const primaryColor = "rgba(242,185,13,0.95)";

export default function EventsPage() {
  return (
    <Stack
      spacing={5}
      sx={{ py: { xs: 4, md: 8 }, position: "relative", fontFamily: "var(--font-inter)" }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "15%",
          right: "20%",
          width: 120,
          height: 120,
          borderRadius: "50%",
          backgroundColor: "rgba(255,255,255,0.06)",
          opacity: 0.2,
          pointerEvents: "none",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: 40,
          left: 20,
          width: 180,
          height: 50,
          backgroundColor: "rgba(255,255,255,0.05)",
          opacity: 0.15,
          pointerEvents: "none",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "30%",
          width: 80,
          height: 80,
          borderRadius: "50%",
          backgroundColor: "rgba(255,255,255,0.05)",
          opacity: 0.15,
          pointerEvents: "none",
        }}
      />

      <Stack spacing={1} sx={{ maxWidth: 840 }}>
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "3rem", md: "5rem" },
            fontWeight: 700,
            letterSpacing: "-0.02em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.96)",
            fontFamily: "var(--font-playfair)",
          }}
        >
          Events
        </Typography>
        <Typography
          sx={{
            color: "rgba(255,255,255,0.45)",
            textTransform: "uppercase",
            letterSpacing: "0.22em",
            fontSize: "0.75rem",
            fontWeight: 600,
          }}
        >
          Exhibitions, markets, and upcoming participation.
        </Typography>
      </Stack>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" },
          gap: 3,
          alignItems: "stretch",
        }}
      >
        {events.map((event) => (
          <Box
            key={event.title}
            sx={{
              minHeight: 360,
              p: 4,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              borderRadius: 3,
              backgroundColor: event.featured
                ? "rgba(255,255,255,0.06)"
                : "rgba(255,255,255,0.03)",
              border: event.featured
                ? `1px solid rgba(242,185,13,0.3)`
                : "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(16px)",
              transition: "all 0.35s ease",
              "&:hover": {
                transform: "translateY(-4px)",
                backgroundColor: "rgba(255,255,255,0.06)",
                borderColor: "rgba(242,185,13,0.3)",
              },
            }}
          >
            <Stack spacing={2}>
              <Stack direction="row" spacing={1.2} alignItems="center">
                <Box
                  component="span"
                  sx={{
                    color: primaryColor,
                    fontSize: "1rem",
                    fontFamily: "'Material Symbols Outlined'",
                  }}
                >
                  {event.icon}
                </Box>
                <Typography
                  sx={{
                    color: primaryColor,
                    textTransform: "uppercase",
                    letterSpacing: "0.2em",
                    fontSize: "0.65rem",
                    fontWeight: 700,
                  }}
                >
                  {event.label}
                </Typography>
              </Stack>
              <Typography
                sx={{
                  fontFamily: "'Playfair Display', serif",
                  fontStyle: "italic",
                  fontSize: "1.75rem",
                  color: "rgba(255,255,255,0.96)",
                }}
              >
                {event.title}
              </Typography>
              <Typography sx={{ color: "rgba(255,255,255,0.55)", fontSize: "0.9rem" }}>
                {event.description}
              </Typography>
            </Stack>

            <Stack spacing={1.5} sx={{ mt: 4 }}>
              <Typography
                sx={{
                  color: "rgba(255,255,255,0.35)",
                  textTransform: "uppercase",
                  letterSpacing: "0.22em",
                  fontSize: "0.6rem",
                  fontWeight: 700,
                }}
              >
                Location
              </Typography>
              <Typography sx={{ color: "rgba(255,255,255,0.9)" }}>
                {event.location}
              </Typography>
              {event.featured ? (
                <Button
                  variant="contained"
                  sx={{
                    mt: 1,
                    alignSelf: "flex-start",
                    textTransform: "uppercase",
                    letterSpacing: "0.22em",
                    fontSize: "0.7rem",
                    px: 3,
                    py: 1.2,
                    borderRadius: 1,
                    backgroundColor: primaryColor,
                    color: "rgba(26,24,18,0.95)",
                    "&:hover": { backgroundColor: "white" },
                  }}
                >
                  {event.action}
                </Button>
              ) : (
                <Button
                  variant="text"
                  sx={{
                    mt: 1,
                    alignSelf: "flex-start",
                    color: primaryColor,
                    textTransform: "uppercase",
                    letterSpacing: "0.2em",
                    fontSize: "0.65rem",
                    px: 0,
                    "&:hover": { backgroundColor: "transparent", color: "white" },
                  }}
                >
                  {event.action}
                </Button>
              )}
            </Stack>
          </Box>
        ))}
      </Box>

      <Typography
        sx={{
          color: "rgba(255,255,255,0.4)",
          textTransform: "uppercase",
          letterSpacing: "0.3em",
          fontSize: "0.6rem",
        }}
      >
        WSE Jewellery • Ceramic collections and projects
      </Typography>
    </Stack>
  );
}

