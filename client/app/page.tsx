"use client";

import { Box, Stack, Typography } from "@mui/material";
import LauraWE from "@/public/LauraWE.jpg";
import AnastasiaWe from "@/public/AnastasiaWe.jpg";
import IrinaWE from "@/public/IrinaWE.jpg";
const accent = "#f2b90d";
const contentFont = "var(--font-playfair)";

const storyTiles = [
  {
    title: "Anastasiia Glazkova",
    caption: "Ceramic textures meeting raw 18k gold.",
    image: LauraWE.src,
    alt: "Exotic floral arrangement with vibrant proteas and anemones",
  },
  {
    title: "Irina Vorobeva",
    caption: "Light dancing on the wheel.",
    image: AnastasiaWe.src,
    alt: "Artistic craft supplies and washi tape in a studio setting",
  },
  {
    title: "Laura Winter",
    caption: "A whisper of elegance.",
    image: IrinaWE.src,
    alt: "Close up portrait of a pensive craftsman with a beard",
  },
];

const team = [
  {
    name: "Anastasiia Glazkova",
    role: "Lead Designer",
    bio:
      "A metalsmith with a background in architectural history, Elena translates the structure of historical ruins into wearable art.",
    image: LauraWE.src,
    position: "center 35%",
  },
  {
    name: "Irina Vorobeva",
    role: "Master Ceramist",
    bio:
      "Julian finds beauty in imperfection. His broken-edge ceramic series anchors our tactile display philosophy.",
    image: AnastasiaWe.src,
    position: "center 45%",
  },
  {
    name: "Laura Winter",
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
      <Box component="section" sx={{ py: { xs: 6, md: 0} }}>
        <Typography
          variant="h1"
          sx={{
            textAlign: "center",
            fontFamily: "var(--font-playfair)",
            fontSize: { xs: "2.6rem", md: "3.6rem" },
            fontWeight: 600,
            letterSpacing: "-0.02em",
            fontStyle: "italic",
            color: accent,
          }}
        >
          ABOUT US
        </Typography>
        <Box
          sx={{
            mt: 3,
            maxWidth: { xs: 760, md: 1140 },
            mx: "auto",
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: { xs: 3, md: 3 },
            textAlign: "center",
            px: { xs: 3, md: 5 },
            py: { xs: 3, md: 3 },
            borderRadius: 3,
            border: "4px inset ",
            backgroundColor: "rgba(10, 12, 18, 0.38)",
            boxShadow: "0 20px 50px rgba(0, 0, 0, 0.53)",
            backdropFilter: "blur(10px)",
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: { xs: "1rem", md: "1.1rem" },
                color: "rgba(255,255,255,0.92)",
                lineHeight: 1.9,
                fontFamily: contentFont,
              }}
            >
              We are Winter Sparrow Eye, young but very ambitious jewellery house. We hope that this small article will give you a little bit of an understanding of who we are, what and why we are doing.  
            </Typography>
            <Typography
              sx={{
                mt: 3,
                fontSize: { xs: "1rem", md: "1.1rem" },
                color: "rgba(255,255,255,0.92)",
                lineHeight: 1.9,
                fontFamily: contentFont,
              }}
            >
              You see, jewellery and fashion in general is a very special medium. It not only contains all qualities of visual arts (such as painting and sculpture), it has it’s own palpitating heart which talks to it’s creator, then owner and then through owner it talks to everyone around.  
              This is the context we are working in, context we are trying to open to you and together with you.  
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={{
                fontSize: { xs: "1rem", md: "1.1rem" },
                color: "rgba(255,255,255,0.92)",
                lineHeight: 1.9,
                fontFamily: contentFont,
              }}
            >
              Ceramic is a wonderful material that shows us a way of doing it. A huge variety of forms and colors serves to all our ideas. And we have a lot of ideas. They are catched in the air, collected in our woods, found between pages of your books.   
            </Typography>
            <Typography
              sx={{
                mt: 3,
                fontSize: { xs: "1rem", md: "1.1rem" },
                color: "rgba(255,255,255,0.92)",
                lineHeight: 1.9,
                fontFamily: contentFont,
              }}
            >
              Possessed with visions, so diverse as 8 billions people living on earth and even more, we find this diversity beautiful. Our instinct and feeling are often breaking the narratives, allowing us to find freedom and true meaning of contemporary art. Not limited by any  
              borders we are making art itself into theatrical costume you wearing.   
            </Typography>
            <Typography
              sx={{
                mt: 3,
                fontSize: { xs: "1rem", md: "1.1rem" },
                color: "rgba(255,255,255,0.92)",
                lineHeight: 1.9,
                fontFamily: contentFont,
              }}
            >
              Also we can’t forget to mention our passion for words and camera . Each name for each piece has to talk together with it. Each text and description. And then they have to talk from
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box component="section" sx={{ py: { xs: 2, md: 4 } }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, minmax(0, 1fr))" },
            gap: { xs: 4, md: 6 },
            alignItems: "start",
            px: { xs: 2, md: 3 },
            maxWidth: 1300,
            mx: "auto",
            mb: { xs: 6, md: 10 },
            perspective: "1200px",
          }}
        >
          {storyTiles.map((tile, index) => {
            const offsets = [
              { xs: 0, md: 0 },
              { xs: 2, md: 4 },
              { xs: 0, md: 0 },
            ];
            const aspects = ["3 / 5", "3 / 5", "3 / 5"];
            const labels = ["01 / Origin", "02 / Shift", "03 / Depth"];

            return (
              <Box
                key={tile.title}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
                  mt: offsets[index],
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    borderRadius: 3,
                    overflow: "hidden",
                    backgroundColor: "#1a2333",
                    boxShadow: "0 24px 60px rgba(0,0,0,0.35)",
                    transition: "transform 0.4s ease, box-shadow 0.4s ease",
                    "&:hover": {
                      boxShadow: "0 34px 86px rgba(0,0,0,0.55)",
                    },
                    "&:hover .we-story-media": {
                      transform: "scale(1.06)",
                    },
                  }}
                >
                  <Box
                    className="we-story-media"
                    sx={{
                      aspectRatio: aspects[index],
                      backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 45%), url(${tile.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      transform: "scale(1)",
                      transition: "transform 0.6s ease",
                      willChange: "transform",
                    }}
                    aria-label={tile.alt}
                  />
                  <Box sx={{ position: "absolute", bottom: 0, left: 0, p: 3, width: "100%" }}>
                    
                    <Typography
                      sx={{
                        color: "rgba(255,255,255,0.95)",
                        fontSize: "1.1rem",
                        fontWeight: 600,
                        fontFamily: "var(--font-playfair)",
                      }}
                    >
                      {tile.title}
                    </Typography>
                  </Box>
                </Box>

                {index === 1 && (
                  <Box sx={{ px: 0.5 }}>
                    
                  </Box>
                )}
              </Box>
            );
          })}
        </Box>
      </Box>

      

      
    </Stack>
  );
}
