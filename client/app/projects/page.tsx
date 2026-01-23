"use client";

import Link from "next/link";
import { Box, Stack, Typography } from "@mui/material";

const accent = "#f2b90d";

const founders = [
  {
    label: "Laura Winter",
    slug: "laura-winter",
    role: "Master Goldsmith",
    quote:
      "\"Gold is simply sunlight captured in the earth. I just give it a voice.\"",
    cta: "Explore Jewelry",
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1000&q=80",
  },
  {
    label: "Irina Vorobjeva",
    slug: "irina-vorobjeva",
    role: "Ceramic Artisan",
    quote:
      "\"The clay knows its shape before I do. My hands are just the medium.\"",
    cta: "Explore Ceramics",
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1000&q=80",
  },
  {
    label: "Anastasiia Glazkova",
    slug: "anastasiia-glazkova",
    role: "Joint Project",
    quote:
      "A limited fusion series where raw porcelain meets forged 24k gold leaf.",
    cta: "View Series",
    image:
      "https://images.unsplash.com/photo-1487412912498-0447578fcca8?auto=format&fit=crop&w=1000&q=80",
  },
];

export default function ProjectsPage() {
  return (
    <Stack spacing={6}>
      <Box sx={{ textAlign: "center", pt: { xs: 2, md: 4 } }}>
        <Typography
          sx={{
            textTransform: "uppercase",
            letterSpacing: "0.3em",
            fontSize: "0.7rem",
            fontWeight: 700,
            color: accent,
            mb: 2,
          }}
        >
          Creative Direction
        </Typography>
        <Typography
          variant="h1"
          sx={{
            textTransform: "none",
            letterSpacing: "-0.02em",
            fontWeight: 700,
            fontSize: { xs: "2.4rem", md: "3.8rem" },
            color: "rgba(255,255,255,0.95)",
          }}
        >
          Living Concept: Our Visionaries
        </Typography>
        <Typography
          sx={{
            mt: 2,
            color: "rgba(255,255,255,0.65)",
            maxWidth: 760,
            mx: "auto",
            fontSize: { xs: "1rem", md: "1.1rem" },
            lineHeight: 1.9,
          }}
        >
          A dialogue between earth and metal. Discover the two minds bridging the
          gap between ancient craft and modern silhouette.
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: { xs: 3, md: 6 },
          borderBottom: "1px solid rgba(255,255,255,0.12)",
          pb: 3,
          maxWidth: 960,
          mx: "auto",
        }}
      >
        {[
          { label: "The Founders", active: true },
          { label: "Creative Process", active: false },
          { label: "Collaborations", active: false },
        ].map((tab) => (
          <Box
            key={tab.label}
            sx={{
              textAlign: "center",
              borderBottom: tab.active ? `2px solid ${accent}` : "2px solid transparent",
              pb: 2,
              px: 1,
              color: tab.active ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.45)",
              textTransform: "uppercase",
              letterSpacing: "0.18em",
              fontSize: "0.75rem",
              fontWeight: 700,
            }}
          >
            {tab.label}
          </Box>
        ))}
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
          gap: { xs: 3, md: 4 },
          maxWidth: 1200,
          mx: "auto",
          width: "100%",
        }}
      >
        {founders.map((person) => (
          <Link
            key={person.slug}
            href={`/projects/${person.slug}`}
            style={{ display: "block", textDecoration: "none" }}
          >
            <Box
              sx={{
                position: "relative",
                borderRadius: 3,
                overflow: "hidden",
                aspectRatio: "3 / 4",
                backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.25) 50%, transparent 100%), url(${person.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                border: "1px solid rgba(255,255,255,0.12)",
                transition: "transform 0.5s ease, box-shadow 0.5s ease",
                "&:hover": {
                  transform: "scale(1.02)",
                  boxShadow: "0 22px 40px rgba(242,185,13,0.2)",
                },
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  border: "2px solid transparent",
                  transition: "border 0.3s ease",
                  "&:hover": { borderColor: "rgba(242,185,13,0.4)" },
                  pointerEvents: "none",
                }}
              />
              <Box sx={{ position: "absolute", bottom: 0, left: 0, p: 3 }}>
                <Typography
                  sx={{
                    color: accent,
                    textTransform: "uppercase",
                    letterSpacing: "0.2em",
                    fontSize: "0.65rem",
                    fontWeight: 700,
                  }}
                >
                  {person.role}
                </Typography>
                <Typography
                  sx={{
                    color: "rgba(255,255,255,0.95)",
                    fontSize: "1.6rem",
                    fontWeight: 700,
                    mt: 0.5,
                  }}
                >
                  {person.label}
                </Typography>
                <Typography
                  sx={{
                    color: "rgba(255,255,255,0.7)",
                    fontSize: "0.85rem",
                    mt: 1,
                    mb: 2,
                  }}
                >
                  {person.quote}
                </Typography>
                <Typography
                  sx={{
                    color: accent,
                    textTransform: "uppercase",
                    letterSpacing: "0.18em",
                    fontSize: "0.7rem",
                    fontWeight: 700,
                  }}
                >
                  {person.cta} →
                </Typography>
              </Box>
            </Box>
          </Link>
        ))}
      </Box>
    </Stack>
  );
}

