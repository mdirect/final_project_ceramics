"use client";

import Link from "next/link";
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useState } from "react";

const heroCopy = {
  title: "The Visionaries",
  subtitle: "Winter Sparrow Eye",
  lead:
    "In the quiet space between the earth's weight and the sparrow's light, we find the resonance of Winter Sparrow Eye.",
  paragraphs: [
    "Winter Sparrow Eye emerged from a shared obsession with tactile honesty. As three creators coming from different disciplines—jewelry design, sculptural ceramics, and fine art—we sought to merge our worlds into a singular aesthetic language.",
    "Our philosophy is rooted in the wabi-sabi appreciation of imperfection. Each piece of jewelry we forge and every ceramic vessel we craft carries the intention mark of the human hand. We do not strive for industrial perfection; we strive for emotional weight.",
    "Our values are simple: sustainability through longevity, beauty through raw materiality, and a commitment to the slow movement of craftsmanship. We create for those who find poetry in the cracks of a glaze and the oxidation of sterling silver.",
  ],
};

const team = [
  {
    name: "Serg",
    role: "Lead Metalsmith",
    image:
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Alex",
    role: "Master Ceramist",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Tati",
    role: "Creative Director",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=80",
  },
];

const producerGallery = [
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1800&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1800&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1800&q=80",
];

export default function WePage() {
  const [galleryIndex, setGalleryIndex] = useState(0);
  const nextSlide = () =>
    setGalleryIndex((current) => (current + 1) % producerGallery.length);
  const prevSlide = () =>
    setGalleryIndex((current) =>
      current === 0 ? producerGallery.length - 1 : current - 1,
    );

  return (
    <Stack spacing={6}>
      <Box sx={{ textAlign: "center", pt: { xs: 2, md: 4 } }}>
        
        <Typography
          variant="h1"
          sx={{
            textTransform: "none",
            letterSpacing: "0.02em",
            fontWeight: 500,
            fontFamily: "Georgia, 'Times New Roman', serif",
          }}
        >
          {heroCopy.title}
        </Typography>
        <Typography
          sx={{
            mt: 1,
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontStyle: "italic",
            color: "rgba(0,0,0,0.5)",
          }}
        >
          {heroCopy.subtitle}
        </Typography>
      </Box>

      <Stack spacing={2} alignItems="center" textAlign="center">
        <Typography
          sx={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontStyle: "italic",
            fontSize: "1.2rem",
            color: "rgba(0,0,0,0.6)",
            maxWidth: 720,
            textShadow: "0 0 1px rgba(0,0,0,0.2)",
          }}
        >
          {heroCopy.lead}
        </Typography>
        {heroCopy.paragraphs.map((text) => (
          <Typography
            key={text}
            sx={{
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontSize: "0.98rem",
              color: "rgba(0,0,0,0.6)",
              lineHeight: 1.9,
              maxWidth: 760,
              textShadow: "0 0 1px rgba(0,0,0,0.2)",
            }}
          >
            {text}
          </Typography>
        ))}
      </Stack>

      <Box
        sx={{
          width: "100%",
          minHeight: { xs: 320, md: 820 },
          borderRadius: 2,
          overflow: "hidden",
          position: "relative",
          backgroundImage: `url(${producerGallery[galleryIndex]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        onWheel={(event) => {
          if (event.deltaY > 0) {
            nextSlide();
          } else if (event.deltaY < 0) {
            prevSlide();
          }
        }}
      >
        <IconButton
          onClick={prevSlide}
          sx={{
            position: "absolute",
            left: 16,
            top: "50%",
            transform: "translateY(-50%)",
            backgroundColor: "rgba(255,255,255,0.7)",
            "&:hover": { backgroundColor: "rgba(255,255,255,0.9)" },
          }}
        >
          <ArrowBackIosNewIcon fontSize="small" />
        </IconButton>
        <IconButton
          onClick={nextSlide}
          sx={{
            position: "absolute",
            right: 16,
            top: "50%",
            transform: "translateY(-50%)",
            backgroundColor: "rgba(255,255,255,0.7)",
            "&:hover": { backgroundColor: "rgba(255,255,255,0.9)" },
          }}
        >
          <ArrowForwardIosIcon fontSize="small" />
        </IconButton>
      </Box>

      <Stack spacing={3}>
        <Box sx={{ textAlign: "center" }}>
          <Typography
            sx={{
              textTransform: "uppercase",
              letterSpacing: "0.22em",
              fontSize: "0.7rem",
              color: "rgba(0,0,0,0.45)",
            }}
          >
            Our studio
          </Typography>
          <Typography
            variant="h2"
            sx={{
              textTransform: "none",
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontWeight: 500,
            }}
          >
            Meet the team
          </Typography>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" },
            gap: 3,
          }}
        >
          {team.map((member) => (
            <Box key={member.name} sx={{ textAlign: "center" }}>
              <Box
                sx={{
                  borderRadius: 2,
                  overflow: "hidden",
                  backgroundImage: `url(${member.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  pt: "120%",
                  mb: 1.5,
                }}
              />
              <Typography sx={{ fontWeight: 600 }}>{member.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {member.role}
              </Typography>
            </Box>
          ))}
        </Box>
      </Stack>

      <Box sx={{ textAlign: "center", py: { xs: 2, md: 4 } }}>
        <Typography
          sx={{
            textTransform: "uppercase",
            letterSpacing: "0.24em",
            fontSize: "0.7rem",
            color: "rgba(0,0,0,0.45)",
          }}
        >
          Join our journey
        </Typography>
        <Typography
          variant="h2"
          sx={{
            textTransform: "none",
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontWeight: 500,
            mb: 2,
          }}
        >
          Let's craft something meaningful together.
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="center" flexWrap="wrap">
          <Link href="/shop" style={{ textDecoration: "none" }}>
            <Button
              variant="outlined"
              sx={{ textTransform: "uppercase", letterSpacing: "0.08em" }}
            >
              Explore collection
            </Button>
          </Link>
          <Link href="/contacts" style={{ textDecoration: "none" }}>
            <Button variant="text" sx={{ textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Visit studio
            </Button>
          </Link>
        </Stack>
      </Box>
    </Stack>
  );
}

