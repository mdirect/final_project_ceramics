"use client";

import { Box, Stack, Typography } from "@mui/material";
import LauraWE from "@/public/LauraWE.jpg";
import AnastasiaWe from "@/public/AnastasiaWe.jpg";
import IrinaWE from "@/public/IrinaWE.jpg";
const accent = "#f2b90d";
const contentFont = "var(--font-playfair)";

const storyTiles = [
  {
    title: "The Earthly Bond",
    caption: "Ceramic textures meeting raw 18k gold.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC8ikk6yT4DVmpnr4Ij75HxGzEJQ8e-4PoR27TxULvXr1e0R5mLk5qYhW0jiqGmPj5vXyUx6A0kdCWqo6TbGfCftl8KW3jyo-i91N6HcfyZ3xnQMO5mqBE7NoeQb1fyuynNnU8_i08fCYUcLTs9AGqO_8H97qlZ6_LS-SM6M0cw4LwnuvVF00AtZlEZGY5G5oNpe8yZgi8RRmpLZc2iWFvbGGIyT7V5No5iPL63AV4r3faUknyQG2Hh0thP1Ec39YL-kV_aqtyssbM",
    alt: "Exotic floral arrangement with vibrant proteas and anemones",
  },
  {
    title: "The Studio",
    caption: "Light dancing on the wheel.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCF0LM4x7_NeNUWe2BYaYmrKklgpcaEj28qiRGnmDfddeM6j5xHx7ns0b-OJkNObqgL_X8ZIVXJaPEOS9BypN2211N0JcPv6y4tq27pEx-_qsOr0MspoUKA0BrvqPUlWdCH-gvF8eNUk5hoLDnqaf-VDYqcXv7MKtaBgtLD5YNAV4KVtbj1Fn5Zhb75jzuWVA_1Sw3Ngy1FXn8wo5hCmVtbivdzDC8Si6mtFLlNXTYiabmOvMol88y4vgJzChR9z9zmg0CbaCdRk2c",
    alt: "Artistic craft supplies and washi tape in a studio setting",
  },
  {
    title: "The Soul",
    caption: "A whisper of elegance.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAP8XCCdqkxAWxO0Zn21q3wNW367mZ9pKiItb1IzVsSMaa1QxQ-IKlOAgw5qvvKGroVBWlfD5sJIWW4Q-7cNKKteVq2Rc-76vEyn2cAPrYhIMzjg7QFCta1SeKHcKc8PwsF0w7t23yhW6X8-EwjbLBQHc5hfoqy27n8Axk-93BDXLt-DM6Mpm6El9aDhD6aPxqLkrc3fOKpsrdFdiTkIsGo71-7bPehGlILU4FMHKLiueIZi871LDiImvfKqJ_UCBpgnRDiZG8Wvjg",
    alt: "Close up portrait of a pensive craftsman with a beard",
  },
];

const team = [
  {
    name: "Laura Winter",
    role: "Lead Designer",
    bio:
      "A metalsmith with a background in architectural history, Elena translates the structure of historical ruins into wearable art.",
    image: LauraWE.src,
    position: "center 35%",
  },
  {
    name: "Anastasiia Glazkova",
    role: "Master Ceramist",
    bio:
      "Julian finds beauty in imperfection. His broken-edge ceramic series anchors our tactile display philosophy.",
    image: AnastasiaWe.src,
    position: "center 45%",
  },
  {
    name: "Irina Vorobeva",
    role: "Creative Director",
    bio:
      "Curating the visual narrative, Sarah ensures that every sparrow-eye detail aligns with our earth-toned aesthetic.",
    image: IrinaWE.src,
    position: "center 25%",
      },
];

export default function Home() {
  return (
    <Stack spacing={5}>
      <Box component="section" sx={{ py: { xs: 6, md: 1}, textAlign: "center" }}>
        <Typography
          sx={{
            fontFamily: "var(--font-playfair)",
            fontStyle: "italic",
            color: accent,
            fontSize: { xs: "1rem", md: "1.2rem" },
            mb: 1,
          }}
        >
          Our Philosophy
        </Typography>
        <Typography
          sx={{
            fontFamily: "var(--font-playfair)",
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
            color: "rgba(255,255,255,0.92)",
            lineHeight: 1.9,
            fontFamily: contentFont,
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
            gridTemplateColumns: { xs: "1fr", md: "repeat(12, 1fr)" },
            gap: { xs: 3, md: 4 },
            px: { xs: 2, md: 3 },
            maxWidth: 1280,
            mx: "auto",
          }}
        >
          <Box
            sx={{
              gridColumn: { xs: "1 / -1", md: "span 7" },
              position: "relative",
              overflow: "hidden",
              borderRadius: 4,
              boxShadow: "0 24px 60px rgba(0,0,0,0.3)",
              "&:hover .story-image": { transform: "scale(1.05)" },
            }}
          >
            <Box
              component="img"
              src={storyTiles[0].image}
              alt={storyTiles[0].alt}
              className="story-image"
              sx={{
                width: "100%",
                height: { xs: 360, md: 600 },
                objectFit: "cover",
                transition: "transform 0.7s ease",
                display: "block",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(0deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.25) 55%, transparent 100%)",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                p: { xs: 3, md: 4 },
                zIndex: 1,
              }}
            >
              <Typography
                sx={{
                  color: accent,
                  fontFamily: "var(--font-playfair)",
                  fontStyle: "italic",
                  fontSize: "0.9rem",
                  mb: 0.5,
                }}
              >
                {storyTiles[0].title}
              </Typography>
              <Typography
                sx={{
                  color: "rgba(255,255,255,0.95)",
                  fontSize: "1rem",
                  fontWeight: 300,
                  fontFamily: contentFont,
                }}
              >
                {storyTiles[0].caption}
              </Typography>
              <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
                <Box
                  component="button"
                  type="button"
                  sx={{
                    backgroundColor: "rgba(255,255,255,0.12)",
                    border: "1px solid rgba(255,255,255,0.25)",
                    color: "white",
                    borderRadius: "999px",
                    px: 2,
                    py: 1,
                    fontSize: "0.75rem",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    backdropFilter: "blur(8px)",
                    "&:hover": { backgroundColor: "rgba(255,255,255,0.22)" },
                  }}
                >
                  View
                </Box>
                <Box
                  component="button"
                  type="button"
                  sx={{
                    backgroundColor: "rgba(255,255,255,0.12)",
                    border: "1px solid rgba(255,255,255,0.25)",
                    color: "white",
                    borderRadius: "999px",
                    px: 2,
                    py: 1,
                    fontSize: "0.75rem",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    backdropFilter: "blur(8px)",
                    "&:hover": { backgroundColor: "rgba(255,255,255,0.22)" },
                  }}
                >
                  More
                </Box>
              </Stack>
            </Box>
          </Box>

          <Box
            sx={{
              gridColumn: { xs: "1 / -1", md: "span 5" },
              display: "grid",
              gridTemplateRows: { xs: "auto", md: "repeat(2, 1fr)" },
              gap: { xs: 3, md: 4 },
              minHeight: { md: 600 },
            }}
          >
            {storyTiles.slice(1).map((tile) => (
              <Box
                key={tile.title}
                sx={{
                  position: "relative",
                  overflow: "hidden",
                  borderRadius: 4,
                  boxShadow: "0 18px 40px rgba(0,0,0,0.25)",
                  "&:hover .story-image": { transform: "scale(1.05)" },
                }}
              >
                <Box
                  component="img"
                  src={tile.image}
                  alt={tile.alt}
                  className="story-image"
                  sx={{
                    width: "100%",
                    height: { xs: 260, md: "100%" },
                    objectFit: "cover",
                    transition: "transform 0.7s ease",
                    display: "block",
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(0,0,0,0.2)",
                    opacity: 0,
                    transition: "opacity 0.4s ease",
                    "&:hover": { opacity: 1 },
                  }}
                />
                <Box sx={{ position: "absolute", bottom: 24, left: 24, zIndex: 1 }}>
                  <Typography sx={{ color: "white", fontFamily: "var(--font-playfair)" }}>
                    {tile.title}
                  </Typography>
                  <Typography
                    sx={{
                      color: "rgba(255,255,255,0.8)",
                      fontSize: "0.7rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.2em",
                      fontFamily: contentFont,
                    }}
                  >
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
              fontFamily: "var(--font-playfair)",
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
                  width: "100%",
                  aspectRatio: "1 / 1",
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    overflow: "hidden",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      inset: 0,
                      backgroundImage: `url(${member.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: member.position ?? "center",
                      filter: "blur(11px) brightness(0.35)",
                      transform: "scale(1.15)",
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={member.image}
                    alt={member.name}
                    sx={{
                      position: "relative",
                      zIndex: 1,
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      transition: "filter 0.5s ease",
                      "&:hover": { filter: "grayscale(0)" },
                    }}
                  />
                </Box>
              </Box>
              <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
                <Typography
                  sx={{
                    color: "rgba(255,255,255,0.98)",
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    fontFamily: "var(--font-playfair)",
                  }}
                >
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
                <Typography
                  sx={{
                    color: "rgba(255,255,255,0.9)",
                    fontSize: "0.9rem",
                    mt: 1.5,
                    fontFamily: contentFont,
                  }}
                >
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
