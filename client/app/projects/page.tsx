"use client";

import Link from "next/link";
import { Box, Stack, Typography } from "@mui/material";

const people = [
  {
    label: "Laura Winter",
    slug: "laura-winter",
    role: "Author of tactile jewelry rituals",
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1000&q=80",
  },
  {
    label: "Irina Vorobjeva",
    slug: "irina-vorobjeva",
    role: "Ceramic installations and slow design",
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1000&q=80",
  },
  {
    label: "Anastasiia Glazkova",
    slug: "anastasiia-glazkova",
    role: "Visual narratives and glaze alchemy",
    image:
      "https://images.unsplash.com/photo-1487412912498-0447578fcca8?auto=format&fit=crop&w=1000&q=80",
  },
];

export default function ProjectsPage() {
  return (
    <Stack spacing={5}>
      <Box sx={{ textAlign: "center", pt: { xs: 1, md: 2 } }}>
        <Typography
          variant="h1"
          sx={{
            textTransform: "none",
            letterSpacing: "0.02em",
            fontWeight: 500,
            fontFamily: "Georgia, 'Times New Roman', serif",
          }}
        >
          Projects
        </Typography>
        <Typography
          sx={{
            mt: 1,
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontStyle: "italic",
            color: "rgba(0,0,0,0.55)",
          }}
        >
          Personal projects by the WSE artists
        </Typography>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
          gap: { xs: 2, md: 3 },
        }}
      >
        {people.map((person) => (
          <Link
            key={person.slug}
            href={`/projects/${person.slug}`}
            style={{ display: "block", textDecoration: "none" }}
          >
            <Box
              sx={{
                borderRadius: 3,
                overflow: "hidden",
                position: "relative",
                minHeight: { xs: 240, md: 320 },
                backgroundImage: `url(${person.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                boxShadow: "0 16px 35px rgba(0,0,0,0.12)",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 20px 45px rgba(0,0,0,0.18)",
                },
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.65) 100%)",
                  pointerEvents: "none",
                }}
              />
              <Stack
                spacing={0.5}
                sx={{
                  position: "absolute",
                  bottom: 18,
                  left: 18,
                  right: 18,
                  color: "rgba(255,255,255,0.9)",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "Georgia, 'Times New Roman', serif",
                    fontSize: "1.15rem",
                    letterSpacing: "0.04em",
                    textTransform: "none",
                  }}
                >
                  {person.label}
                </Typography>
                <Typography sx={{ fontSize: "0.85rem", opacity: 0.85 }}>
                  {person.role}
                </Typography>
              </Stack>
            </Box>
          </Link>
        ))}
      </Box>

    </Stack>
  );
}

