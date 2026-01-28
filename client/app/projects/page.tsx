"use client";

import Link from "next/link";
import { Box, Stack, Typography } from "@mui/material";
import Ira from "@/public/Ira.jpg";
import Laura from "@/public/Laura.jpg";
import Nastya from "@/public/Nastya.jpg";
const accent = "#f2b90d";

const founders = [
  {
    label: "Laura Winter",
    slug: "laura-winter",
    role: "Master Goldsmith",
    quote:
      "\"Gold is simply sunlight captured in the earth. I just give it a voice.\"",
    cta: "Explore more",
    image: Laura.src,
  },
  {
    label: "Irina Vorobjeva",
    slug: "irina-vorobjeva",
    role: "Ceramic Artisan",
    quote:
      "\"The clay knows its shape before I do. My hands are just the medium.\"",
    cta: "Explore more",
    image: Ira.src,
  },
  {
    label: "Anastasiia Glazkova",
    slug: "anastasiia-glazkova",
    role: "Joint Project",
    quote:
      "A limited fusion series where raw porcelain meets forged 24k gold leaf.",
    cta: "Explore more",
    image: Nastya.src,
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
            fontFamily: "var(--font-playfair)",
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
      

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "minmax(0, 1fr)", md: "repeat(3, 350px)" },
            justifyContent: "center",
            justifyItems: "stretch",
            gap: { xs: 3, md: 4 },
            width: "100%",
            maxWidth: 1300,
            marginBottom: 6,
          }}
        >
          {founders.map((person) => (
            <Link
              key={person.slug}
              href={`/projects/${person.slug}`}
              style={{ display: "block", textDecoration: "none", width: "100%" }}
            >
              <Box
                sx={{
                  position: "relative",
                  borderRadius: 3,
                  overflow: "hidden",
                  aspectRatio: "3 / 4",
                  width: "100%",
                  border: "1px solid rgba(255,255,255,0.12)",
                  transition: "box-shadow 0.5s ease",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    inset: 0,
                    backgroundImage: `linear-gradient(-5deg, rgba(0,0,0,0.8) 0%, rgba(0, 0, 0, 0.27) 60%, transparent 100%), url(${person.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    transition: "transform 0.5s ease",
                    transform: "scale(1)",
                    transformOrigin: "center",
                    zIndex: 0,
                  },
                  "&:hover": {
                    boxShadow: "0 12px 40px rgba(163, 162, 163, 0.46)",
                  },
                  "&:hover::before": {
                    transform: "scale(1.04)",
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
              <Box sx={{ position: "absolute", bottom: 0, left: 0, p: 3, zIndex: 1 }}>
                <Typography
                  sx={{
                    color: accent,
                    textTransform: "uppercase",
                    letterSpacing: "0.2em",
                    fontSize: "0.75rem",
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
                    fontFamily: "var(--font-playfair)",
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
      </Box>
    </Stack>
  );
}

