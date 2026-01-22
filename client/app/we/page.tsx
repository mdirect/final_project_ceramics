import Link from "next/link";
import { Box, Button, Stack, Typography } from "@mui/material";

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
    name: "Elena V.",
    role: "Lead Metalsmith",
    image:
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Julian K.",
    role: "Master Ceramist",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Mara S.",
    role: "Creative Director",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=80",
  },
];

export default function WePage() {
  return (
    <Stack spacing={6}>
      <Box sx={{ textAlign: "center", pt: { xs: 2, md: 4 } }}>
        <Typography
          sx={{
            textTransform: "uppercase",
            letterSpacing: "0.24em",
            fontSize: "0.7rem",
            color: "rgba(0,0,0,0.45)",
            mb: 1,
          }}
        >
          Back to gallery
        </Typography>
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

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1.1fr 0.9fr" },
          gap: { xs: 4, md: 6 },
          alignItems: "start",
        }}
      >
        <Stack spacing={2}>
          <Typography
            sx={{
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontStyle: "italic",
              fontSize: "1.1rem",
              color: "rgba(0,0,0,0.6)",
            }}
          >
            {heroCopy.lead}
          </Typography>
          {heroCopy.paragraphs.map((text) => (
            <Typography key={text} variant="body2" color="text.secondary" sx={{ lineHeight: 1.8 }}>
              {text}
            </Typography>
          ))}
        </Stack>
        <Box
          sx={{
            borderRadius: 2,
            overflow: "hidden",
            minHeight: { xs: 240, md: 360 },
            backgroundImage:
              "url(https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </Box>

      <Box
        sx={{
          width: "100%",
          minHeight: { xs: 240, md: 320 },
          borderRadius: 2,
          backgroundImage:
            "url(https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1600&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

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

