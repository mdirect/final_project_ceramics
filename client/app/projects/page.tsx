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
    label: "Anastasiia Glazkova",
    slug: "anastasiia-glazkova",
    role: "Joint Project",
    quote:
      "A limited fusion series where raw porcelain meets forged 24k gold leaf.",
    cta: "Explore more",
    image: Nastya.src,
  },
  {
    label: "Irina Vorobeva",
    slug: "irina-vorobjeva",
    role: "Ceramic Artisan",
    quote:
      "\"The clay knows its shape before I do. My hands are just the medium.\"",
    cta: "Explore more",
    image: Ira.src,
  },
];

export default function ProjectsPage() {
  return (
    <Stack spacing={6}>
      <Box sx={{ textAlign: "center", pt: { xs: 2, md: 4 } }}>
        
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
          Projects
        </Typography>
        
      </Box>
      

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "minmax(0, 1fr)", md: "repeat(3, 430px)" },
            justifyContent: "center",
            justifyItems: "stretch",
            gap: { xs: 3, md: 4 },
            width: "100%",
            maxWidth: 1450,
            marginBottom: 6,
            marginTop: 6,
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
                    color: "rgba(255,255,255,0.95)",
                    fontSize: "1.6rem",
                    fontWeight: 700,
                    mt: 0.5,
                    fontFamily: "var(--font-playfair)",
                  }}
                >
                  {person.label}
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

