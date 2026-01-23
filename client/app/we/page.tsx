"use client";

import { Box, Stack, Typography } from "@mui/material";

const accent = "#f2b90d";

const storyTiles = [
  {
    title: "01. The Earthly Bond",
    caption: "Ceramic textures meeting raw 18k gold.",
    image:
      "https://images.unsplash.com/photo-1457089328109-e5d9bd499191?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "The Studio",
    caption: "Light dancing on the wheel.",
    image:
      "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=900&q=80",
    offset: 40,
  },
  {
    title: "The Soul",
    caption: "A whisper of elegance.",
    image:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80",
    offset: -40,
  },
];

const team = [
  {
    name: "Elena Vance",
    role: "Lead Designer",
    bio:
      "A metalsmith with a background in architectural history, Elena translates the structure of historical ruins into wearable art.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Julian Thorne",
    role: "Master Ceramist",
    bio:
      "Julian finds beauty in imperfection. His broken-edge ceramic series anchors our tactile display philosophy.",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Sarah Chen",
    role: "Creative Director",
    bio:
      "Curating the visual narrative, Sarah ensures that every sparrow-eye detail aligns with our earth-toned aesthetic.",
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80",
  },
];

export default function WePage() {
  return (
    <Stack spacing={8}>
      <Box component="section" sx={{ py: { xs: 6, md: 10 }, textAlign: "center" }}>
        <Typography
          sx={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontStyle: "italic",
            color: accent,
            fontSize: { xs: "1rem", md: "1.2rem" },
            mb: 2,
          }}
        >
          Our Philosophy
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: "2.6rem", md: "4.2rem" },
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: "rgba(255,255,255,0.98)",
          }}
        >
          The Vision of
          <Box component="span" sx={{ color: accent, display: "block" }}>
            Quiet Craft.
          </Box>
        </Typography>
        <Typography
          sx={{
            mt: 3,
            maxWidth: 760,
            mx: "auto",
            fontSize: { xs: "1rem", md: "1.1rem" },
            color: "rgba(255,255,255,0.85)",
            lineHeight: 1.9,
          }}
        >
          Born from the silence of winter and the keen eye of the sparrow, our studio
          merges the raw textures of earth with the refined elegance of gold. Every
          piece is a dialogue between the hand and the medium.
        </Typography>
      </Box>

      <Box component="section" sx={{ py: { xs: 2, md: 4 } }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "1.1fr 1fr" },
            gap: { xs: 3, lg: 5 },
            alignItems: "center",
          }}
        >
          <Box>
            <Box
              sx={{
                width: "100%",
                aspectRatio: "4 / 5",
                borderRadius: 3,
                overflow: "hidden",
                backgroundImage: `url(${storyTiles[0].image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                boxShadow: "0 24px 50px rgba(0,0,0,0.25)",
                border: "1px solid rgba(255,255,255,0.08)",
                transition: "transform 0.7s ease",
                "&:hover": { transform: "scale(1.02)" },
              }}
            />
            <Box sx={{ mt: 2 }}>
              <Typography
                sx={{
                  color: accent,
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  fontStyle: "italic",
                }}
              >
                {storyTiles[0].title}
              </Typography>
              <Typography sx={{ color: "rgba(255,255,255,0.72)", fontSize: "0.85rem" }}>
                {storyTiles[0].caption}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 3 }}>
            {storyTiles.slice(1).map((tile) => (
              <Box key={tile.title} sx={{ transform: `translateY(${tile.offset ?? 0}px)` }}>
                <Box
                  sx={{
                    width: "100%",
                    aspectRatio: "3 / 4",
                    borderRadius: 3,
                    overflow: "hidden",
                    backgroundImage: `url(${tile.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    boxShadow: "0 18px 40px rgba(0,0,0,0.25)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    transition: "transform 0.7s ease",
                    "&:hover": { transform: "translateY(-6px)" },
                  }}
                />
                <Box sx={{ mt: 2 }}>
                  <Typography sx={{ color: "rgba(255,255,255,0.95)", fontWeight: 500 }}>
                    {tile.title}
                  </Typography>
                  <Typography sx={{ color: "rgba(255,255,255,0.7)", fontSize: "0.8rem" }}>
                    {tile.caption}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      <Box component="section" sx={{ pt: { xs: 6, md: 10 }, pb: 3 }}>
        <Box sx={{ borderTop: "1px solid rgba(255,255,255,0.1)", pt: 4 }}>
          <Typography
            sx={{
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontStyle: "italic",
              fontSize: { xs: "1.8rem", md: "2.3rem" },
              color: "rgba(255,255,255,0.98)",
            }}
          >
            The Hands Behind the Craft
          </Typography>
        </Box>
      </Box>

      <Box component="section" sx={{ pb: { xs: 6, md: 10 } }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
            gap: { xs: 4, md: 6 },
          }}
        >
          {team.map((member) => (
            <Box key={member.name} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box
                sx={{
                  borderRadius: "50%",
                  border: "2px solid rgba(242,185,13,0.25)",
                  p: 1.2,
                  overflow: "hidden",
                  width: "100%",
                  aspectRatio: "1 / 1",
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    backgroundImage: `url(${member.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    filter: "grayscale(1)",
                    transition: "filter 0.5s ease",
                    "&:hover": { filter: "grayscale(0)" },
                  }}
                />
              </Box>
              <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
                <Typography sx={{ color: "rgba(255,255,255,0.98)", fontSize: "1.1rem", fontWeight: 600 }}>
                  {member.name}
                </Typography>
                <Typography
                  sx={{
                    color: accent,
                    textTransform: "uppercase",
                    letterSpacing: "0.18em",
                    fontSize: "0.72rem",
                    mt: 0.5,
                  }}
                >
                  {member.role}
                </Typography>
                <Typography sx={{ color: "rgba(255,255,255,0.82)", fontSize: "0.9rem", mt: 1.5 }}>
                  {member.bio}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Stack>
  );
}

