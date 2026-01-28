import Link from "next/link";
import { Box, Divider, Stack, Typography } from "@mui/material";

type Project = {
  title: string;
  description: string;
  price: string;
  image: string;
};

type PersonProjects = {
  name: string;
  title: string;
  bio: string;
  contact: { label: string; value: string };
  projects: Project[];
};

const personProjects: Record<string, PersonProjects> = {
  "laura-winter": {
    name: "Laura Winter",
    title: "Jewelry Rituals",
    bio:
      "Laura connects metal with ceramics, turning jewelry into a story of touch. She works with patina, raw textures, and the soft glow of silver.",
    contact: {
      label: "Contact",
      value: "hello@winter-sparrow-eye.com",
    },
    projects: [
      {
        title: "Ritual Collar",
        description:
          "A necklace series inspired by river silt lines and rope traces on wet clay.",
        price: "from €420",
        image:
          "https://images.unsplash.com/photo-1456327102063-fb5054efe647?auto=format&fit=crop&w=1200&q=80",
      },
      {
        title: "Silent Runes",
        description:
          "Pendants with ceramic inserts made for journal rituals and personal talismans.",
        price: "from €280",
        image:
          "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=80",
      },
    ],
  },
  "irina-vorobjeva": {
    name: "Irina Vorobjeva",
    title: "Tactile Spaces",
    bio:
      "Irina builds architecture from clay: modular forms, rough glaze, and dramatic light within space.",
    contact: {
      label: "Contact",
      value: "studio@winter-sparrow-eye.com",
    },
    projects: [
      {
        title: "Clay Terrain",
        description:
          "Wall panels with reliefs that echo the movement of sand and sea waves.",
        price: "from €680",
        image:
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
      },
      {
        title: "Slow Tables",
        description:
          "Tables made from ceramic slabs with micro-cracks stabilized by bronze.",
        price: "from €1200",
        image:
          "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80",
      },
    ],
  },
  "anastasiia-glazkova": {
    name: "Anastasiia Glazkova",
    title: "Glaze Poetics",
    bio:
      "Anastasiia creates visual stories where glaze color becomes memory. Her projects blend painting, ceramics, and light.",
    contact: {
      label: "Contact",
      value: "projects@winter-sparrow-eye.com",
    },
    projects: [
      {
        title: "Light Vessels",
        description:
          "Light objects where semi‑transparent glaze acts like a filter.",
        price: "from €540",
        image:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1200&q=80",
      },
      {
        title: "Glaze Letters",
        description:
          "A series of wall panels that tell stories of personal archives and letters.",
        price: "from €360",
        image:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&q=80",
      },
    ],
  },
};

const accent = "#f2b90d";

type ProjectsPersonPageProps = {
  params: Promise<{
    person: string;
  }>;
};

export default async function ProjectsPersonPage({
  params,
}: ProjectsPersonPageProps) {
  const resolvedParams = await params;
  const rawSlug = decodeURIComponent(resolvedParams?.person ?? "").trim();
  let slugSource = rawSlug;

  if (rawSlug.includes("http")) {
    try {
      const parsed = new URL(rawSlug);
      slugSource = parsed.pathname || rawSlug;
    } catch {
      slugSource = rawSlug;
    }
  }

  if (slugSource.includes("/projects/")) {
    slugSource = slugSource.split("/projects/").pop() ?? slugSource;
  }

  slugSource = slugSource.split(/[?#]/)[0]?.trim() ?? slugSource;

  const normalizedSlug = slugSource
    .toLowerCase()
    .replace(/[_\s]+/g, "-")
    .replace(/-+/g, "-");
  const nameToSlug = (name: string) =>
    name.toLowerCase().replace(/[_\s]+/g, "-").replace(/-+/g, "-");

  const person =
    personProjects[rawSlug] ??
    personProjects[normalizedSlug] ??
    Object.values(personProjects).find(
      (entry) => nameToSlug(entry.name) === normalizedSlug,
    );
  const displayName = person?.name ?? (normalizedSlug ? normalizedSlug.replace(/-/g, " ") : "Projects");
  const projects: Project[] = person?.projects ?? [];
  const entries = Object.entries(personProjects);
  const currentEntry = entries.find(([, entry]) => entry === person);
  const nextEntry =
    currentEntry && entries.length > 1
      ? entries[(entries.indexOf(currentEntry) + 1) % entries.length]
      : undefined;

  if (!person) {
    return (
      <Stack spacing={4} textAlign="center">
        <Typography
          variant="h1"
          sx={{
            textTransform: "none",
            letterSpacing: "0.02em",
            fontWeight: 500,
            fontFamily: "var(--font-playfair)",
            color: "rgba(255,255,255,0.95)",
          }}
        >
          Projects
        </Typography>
        <Typography
          sx={{
            fontFamily: "var(--font-playfair)",
            color: "rgba(255,255,255,0.6)",
          }}
        >
          This page was not found. Choose an author below.
        </Typography>
        <Stack spacing={1} alignItems="center">
          {Object.entries(personProjects).map(([personSlug, info]) => (
            <Link key={personSlug} href={`/projects/${personSlug}`} style={{ textDecoration: "none" }}>
              <Typography
                sx={{
                  textTransform: "uppercase",
                  letterSpacing: "0.16em",
                  color: "rgba(255,255,255,0.75)",
                  "&:hover": { color: accent },
                }}
              >
                {info.name}
              </Typography>
            </Link>
          ))}
        </Stack>
      </Stack>
    );
  }

  return (
    <Stack spacing={{ xs: 6, md: 10 }}>
      <Stack spacing={2}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "flex-start", md: "center" },
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Link href="/projects" style={{ textDecoration: "none" }}>
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 1,
                color: "rgba(255,255,255,0.55)",
                fontSize: "0.7rem",
                textTransform: "uppercase",
                letterSpacing: "0.24em",
                fontWeight: 700,
                "&:hover": { color: accent },
              }}
            >
              ← Back to founders
            </Box>
          </Link>
          {nextEntry && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Typography
                sx={{
                  fontSize: "0.65rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.24em",
                  color: "rgba(255,255,255,0.35)",
                }}
              >
                Next Founder
              </Typography>
              <Link href={`/projects/${nextEntry[0]}`} style={{ textDecoration: "none" }}>
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: "0.85rem",
                    color: "rgba(255,255,255,0.8)",
                    "&:hover": { color: accent },
                  }}
                >
                  {nextEntry[1].name}
                </Typography>
              </Link>
            </Box>
          )}
        </Box>
      </Stack>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", md: "flex-start" },
          gap: { xs: 6, md: 10 },
          mb: { xs: 4, md: 8 },
        }}
      >
        <Box sx={{ maxWidth: 520 }}>
          <Typography
            sx={{
              textTransform: "uppercase",
              letterSpacing: "0.3em",
              fontSize: "0.65rem",
              fontWeight: 700,
              color: accent,
              mb: 2,
            }}
          >
            {(person?.title ?? "Master Artist").toUpperCase()}
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontFamily: "var(--font-playfair)",
              fontSize: { xs: "2.4rem", md: "3.8rem" },
              color: "rgba(255,255,255,0.95)",
              mb: 3,
            }}
          >
            {displayName.toUpperCase()}
          </Typography>
          <Typography
            sx={{
              fontFamily: "var(--font-playfair)",
              fontStyle: "italic",
              fontSize: { xs: "1rem", md: "1.2rem" },
              color: "rgba(255,255,255,0.8)",
              lineHeight: 1.8,
              mb: 3,
            }}
          >
            {person?.bio ??
              "A studio portrait of form, tactility, and the quiet ritual of craft."}
          </Typography>
          <Box sx={{ display: "flex", gap: 6 }}>
            <Box>
              <Typography
                sx={{
                  fontSize: "0.66rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.28em",
                  color: accent,
                  mb: 0.5,
                }}
              >
                Studio Focus
              </Typography>
              <Typography sx={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.6)" }}>
                {person?.title ?? "Personal projects"}
              </Typography>
            </Box>
            <Box>
              <Typography
                sx={{
                  fontSize: "0.66rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.28em",
                  color: accent,
                  mb: 0.5,
                }}
              >
                Collections
              </Typography>
              <Typography sx={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.6)" }}>
                {projects.length} series
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{ mt: { xs: 2, md: 0 }, position: "relative" }}>
          <Box
            sx={{
              position: "absolute",
              inset: -16,
              borderRadius: "999px",
              backgroundColor: "rgba(242,185,13,0.2)",
              filter: "blur(40px)",
              opacity: 0,
              transition: "opacity 0.5s ease",
              ".portrait-group:hover &": { opacity: 1 },
            }}
          />
          <Box
            className="portrait-group"
            component="img"
            src={
              projects[0]?.image ??
              "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80"
            }
            alt={`${displayName} portrait`}
            sx={{
              position: "relative",
              width: { xs: 260, md: 288 },
              height: { xs: 360, md: 420 },
              objectFit: "cover",
              borderRadius: 3,
              boxShadow: "0 28px 60px rgba(0, 0, 0, 0.5)",
              filter: "grayscale(1)",
              transition: "filter 0.7s ease",
              "&:hover": { filter: "grayscale(0)" },
            }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: 16,
              left: 16,
              right: 16,
              p: 2,
              borderRadius: 2,
              backgroundColor: "rgba(44, 44, 44, 0.36)",
              border: "1px solid rgba(255,255,255,0.12)",
              backdropFilter: "blur(12px)",
            }}
          >
            <Typography
              sx={{
                fontSize: "0.75rem",
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                color: accent,
                fontWeight: 700,
                mb: 0.4,
              }}
            >
              Studio Highlight
            </Typography>
            <Typography sx={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.9)" }}>
              {projects[0]?.title ?? "Signature collection"}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          width: "100%",
          p: { xs: 3, md: 5 },
          borderRadius: 3,
          border: "1px solid rgba(255,255,255,0.08)",
          backgroundColor: "rgba(0,0,0,0.1)",
          backdropFilter: "blur(12px)",
        }}
      >
        {[
          {
            title: "Ritual Elements",
            images: [
              "https://lh3.googleusercontent.com/aida-public/AB6AXuCsXylEdheeMm45_ipVXgr2D9t4lbDCLqJ8nozfDcZF5sraT0wuB-OUTVxzgCi6Vc-74DPQ6auvuNYUb1iAJke4uyqCKN4tZZqxp0ivmrYPZNpnZF3fswKAsGK89nv3uNDDi9C-LKmy2tj_5OaHwWeAQ1wwF5XilgmvTzWIlXQ8J0OWwoCam_cTwX4PjBNOyVVAef9VseLfCZcgKiUHy7jJo8jpvb-K1zAqxLqiha4tbArnnGVjWmLpCIrhmfV21LV9m6L4ZUQe2YqU",
              "https://lh3.googleusercontent.com/aida-public/AB6AXuC3Cb_oi3yIl59mKQAouPsMhOpfBA1p1I_pPbT4Cz9agWyoqtDSIDugFJLRzE0VqOotfK7OP40-KYxr0d9ps3G8kyp-qETtp7qH4jI_8kQflcCbWREPjyTnaE8WWw3lVAJnxsDTPKPvJXOAUkk4DOZYPXPdzQ9idO6Ons4N-Z-Dh2kYG_iHXE_5xiepole7Xils_K1IqstaqAyx7n-2LFZpvWAhw72ZViUw_48Ki8W8FfJDaxlYaa-PQapLg_0xPlH2zH43gXd400-B",
              "https://lh3.googleusercontent.com/aida-public/AB6AXuCKbdzwWPB0DSd2XiIoFmcjH_JcWFbKHGLSNlYDO306rNbU81CS0MaL-wDGf49kT9VWyiS6hUY9QzW3HCTxsCamAp6cXcM33b5EXhZxhuBtvyO0YR7J_GOt18EyMbGG3xPltHVerDJJJDuXCGIG3EdOZWxz5GoBW9fSAO2xm-XDEZmxO4f_3Vi5-SJ2Ja4arIW4sB990cj-dBGGIkziclwrSXi0cGz8A3DF7_NJrxuRj2wu0u6r7lWUDBvGIXBk4jSQcB4As3rqQE46",
              "https://lh3.googleusercontent.com/aida-public/AB6AXuAYXqD8r8sutvGzRNYuqLoAJLlK1VQGqbs1X0w9WfNIPtujazNKJGhEb2e13nwp9kN8oqg3dMhcvgDoykNxpYQEdofw9LHc1c3f-bQPR64W4rV1LDXVua1luh6XD1dTzc0eR8ijAW3XMSHT8T5pVAiJD7jeUv1i8WVCkLFLriGipoC3vLjQDvkQ4qNp3ReV275tijQzVVIvXURzAfP8r-72VGE3vVaLDwpSKjYIF9-Wv7YTEkOYbHjlONgAD-iuJfHJq2NRNtFd8_bX",
            ],
            quote:
              "The Ritual Elements collection explores the intersection of raw metal and ancient forms. Each piece is hand-forged to capture a moment of transition from the molten state to a permanent, sculptural artifact. Laura Winter blends silver with oxidized textures to create a dialogue between the wearer and the elemental past.",
            metaLeft: "Materials: Silver, Patina",
            metaRight: "Series: Limited Edition",
          },
          {
            title: "Urban Relics",
            images: [
              "https://lh3.googleusercontent.com/aida-public/AB6AXuAadOutol9beFe8b46wxIkODQpHrdgnG5lOuTcJDOO9gNWXOXq5987UbUAxOA34hQjpHdTTKRQW3mWRlTFV92pgfYy7h-RgzDB6bimb6aaEJZwRinsf9M_Je-wMzUvbuxPI66pCTzSrqF-iHaHCc5iq1Tt6fL4nrSO1PsO1t9-F0yep4p8v51SAYPtRSNR5zITZ7PF4fDae4NUQLWnZ2a_fIq7YSPR6kVyCX_8CRciWY7xy6vkn7g_41Vn3DaKSs4IkRzl4eSVwPJID",
              "https://lh3.googleusercontent.com/aida-public/AB6AXuBnerBFbRydF_xWVHLknOMvmQ9RZ4BEf-moHpykn0KZ-tbZDkeCZ_zodkuu9gMFOK_5C36KBRZl3hzjzpqL-CyeEyQgTgNSpq7jLtLrRSRDpJ67kLIMOOlICti754NlRYCPLPDzsGoTNd6yAi7hUF5uNTSY8Ayt3z5qf9OR-V27uJ_N-7xsK4ZGdNTYOYgZBLFjJ3psf4zU4aWJR-n9zFtk9hTJQKXTukFYtuHcnMV78MAqjIT91gkXekUhq9MK1v_UsTwsHW02ibRJ",
              "https://lh3.googleusercontent.com/aida-public/AB6AXuBYHJdFjUa_GcmlBoLmrFDXo9V0QL3kKAezSz1toeuN2PeOXGqe71_TtRIZ6DglCN5Vz1y7-q4D6IS357rvTL0CZeC8U5JmQoL1FQKlU4fllx77bdiOwd4bOqP2nAVKV4FsV2HDdq0IhmPE-tbbHcCyMKUdZ6wtaWbYxSwqPbP57P98ilR_7DcTxnqNMnhaY9Bfmld553bJh7zLXU0G3gbcBnMzV06TXOTSg0AQofd--CZMLNG9jqoTStsWpxYCqGX5qeF2WV6Vgx49",
              "https://lh3.googleusercontent.com/aida-public/AB6AXuAwDTR5o7aXA0B0ScvfH9C6pRiA8qhMygcxFQWktzfOaHV4mI1IPqJBs0RKSPyWrxGB7hZkm-n_dY4oBWUEuOpzsAtwKk1u5Gi0QCc-p2_VaONNRSvDRZudjHq4bXzjtfPA1AJvTBBMWrQrcJxx9xhhQYmcWoJl7C3K0yhNUOqdS2e3Yy0M5_fIqSTqaCDqiqbs4iVP0KJTJuk5ewyZMzKa4_GuStXkjBapETpMEE5G2U-9nNSHI0FbV7NaJagSOwO4ASzyZFi8bqSu",
            ],
            quote:
              "Inspired by the brutalist architecture of her home city, Urban Relics finds beauty in the structural and the geometric. This series uses high-polished surfaces contrasted with deep, industrial engravings. It represents a modern armor for the contemporary soul, balancing strength with minimalist elegance.",
            metaLeft: "Materials: White Gold, Steel",
            metaRight: "Series: Core Collection",
          },
        ].map((section) => (
          <Box key={section.title} sx={{ mb: { xs: 8, md: 10 } }}>
            <Box
              sx={{
                display: "inline-flex",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 2,
                px: 3,
                py: 1.5,
                mb: 4,
              }}
            >
              <Typography
                sx={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: "0.95rem",
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  color: accent,
                }}
              >
                {section.title}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "repeat(2, 1fr)", md: "repeat(4, 1fr)" },
                gap: 2,
                mb: 4,
              }}
            >
              {section.images.map((image, index) => (
                <Box
                  key={`${section.title}-${index}`}
                  sx={{
                    aspectRatio: "4 / 5",
                    borderRadius: 2,
                    overflow: "hidden",
                    border: "1px solid rgba(255,255,255,0.08)",
                    "&:hover img": {
                      filter: "grayscale(0)",
                      transform: "scale(1)",
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={image}
                    alt={`${section.title} detail ${index + 1}`}
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      filter: "grayscale(1)",
                      transform: "scale(1.05)",
                      transition: "all 0.7s ease",
                    }}
                  />
                </Box>
              ))}
            </Box>
            <Box
              sx={{
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 2,
                p: { xs: 3, md: 4 },
                backgroundColor: "rgba(255,255,255,0.05)",
              }}
            >
              <Typography
                sx={{
                  maxWidth: 760,
                  fontFamily: "var(--font-playfair)",
                  fontStyle: "italic",
                  fontSize: { xs: "0.95rem", md: "1.1rem" },
                  lineHeight: 1.8,
                  color: "rgba(255,255,255,0.8)",
                }}
              >
                "{section.quote}"
              </Typography>
              <Box
                sx={{
                  mt: 3,
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 2,
                  fontSize: "0.62rem",
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.5)",
                }}
              >
                <Typography sx={{ fontSize: "inherit" }}>{section.metaLeft}</Typography>
                <Typography sx={{ fontSize: "inherit" }}>•</Typography>
                <Typography sx={{ fontSize: "inherit" }}>{section.metaRight}</Typography>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Stack>
  );
}

