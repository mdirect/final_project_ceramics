import Link from "next/link";
import { Box, Divider, Stack, Typography } from "@mui/material";

type ProjectSection = {
  title: string;
  description: string;
  images: string[];
  metaLeft?: string;
  metaRight?: string;
};

type PersonProjects = {
  name: string;
  title: string;
  bio: string;
  contact: { label: string; value: string };
  projects: ProjectSection[];
  showSupportNote?: boolean;
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
        title: "The Castle",
        description:
          "The painting you see was born from a small unfinished play. A knight is imprisoned by an enemy in a castle dungeon, there are no people there, only endless walls, windows and towers. And all the knight can do is to look at the castle landscapes day after day and see images from his past life. Fields, forests, villages. This is the main idea, but I cannot say that I depicted it literally. Instead I am more like the hero of my play, simply saw different images in the white walls of my apartment and followed them which led to the appearance of this work. Perhaps we can say that its main motive is the opposition between freedom and unfreedom. However, I do not believe that painting should be a repository of this or any other philosophical concept. No matter what idea led us to the creation of this or other painting, in the end it is the painting and not the text with its description that sands in front of the viewer. It will not hold him if it is only a statement of a ready-made postulate. It must be independent. So my painting is first of all about itself, about the images that came to my mind, continuing each other and not demanding anything more. I would also like to say a few words about ambition. I believe that an artist should be ambitious. And I'm not talking about a career, I'm talking about the fact that the works he creates should be more than just something interesting and nice that he will forget the next day. Art is not a hobby and art is not always a pleasant process. To do something good, you often have to suffer. I suffered for this work, I wanted to quit it countless times and yet here I am, writing this text. I hope that my work will inspire you, and I also hope it will inspire my fellow artists to sometimes try to jump higher than they ever could and then there will be more amazing works in the world. For collaboration and partnership inquiries, please write to my email: lauravinter5@gmail.com.",
        images: [
          "/project%20Laura/laura1.jpg",
          "/project%20Laura/laura2.jpg",
          "/project%20Laura/laura3.jpg",
          "/project%20Laura/laura4.jpg",
          "/project%20Laura/laura5.jpg",
          "/project%20Laura/laura6.jpg",
          "/project%20Laura/laura7.jpg",
          "/project%20Laura/laura8.jpg",
        ],
      },
      
    ],
  },
  "irina-vorobjeva": {
    name: "Irina Vorobeva",
    title: "Tactile Spaces",
    bio:
      "Irina builds architecture from clay: modular forms, rough glaze, and dramatic light within space.",
    showSupportNote: true,
    contact: {
      label: "Contact",
      value: "studio@winter-sparrow-eye.com",
    },
    projects: [
      {
        title: "Project 1",
        description:
          "If I were to imagine my artistic presence in the world, it would take the form of a solitary lighthouse, filled from its base to its very top with memories. Mine, others’, and those that never truly existed. They arrive with the waves, pressing themselves against the stone walls, and I gather them one by one, like grains of gold in the sand. Unanswered love letters, handwritten diaries, crumpled grocery lists, faded receipts. Here, memories of something exalted matter just as much as the sound of church bells drifting through a half-open window, while the air is heavy with the scent of oranges. A sudden dark gaze from an ancient fresco yields to the warm flank of a dog watching the salt foam approach the shore. At times, someone comes to the lighthouse and accidentally finds what they were looking for — even if they didn’t know it yet: the spout of an old porcelain teapot, the long-forgotten laughter of a stranger from the streets of Montmartre, a cinema ticket left behind as a bookmark, caught between pages marked with notes in the margins. And sometimes, there, I find what I myself have been searching for. For now, I share photographs on my profile and would be grateful for your support.",
        images: [
          "/project%20Ira/Ira1.jpg",
          "/project%20Ira/Ira2.jpg",
          "/project%20Ira/Ira3.jpg",
          "/project%20Ira/Ira4.jpg",
          "/project%20Ira/Ira5.jpg",
          "/project%20Ira/Ira6.jpg",
          "/project%20Ira/Ira7.jpg",
          "/project%20Ira/Ira8.jpg",
        ],
      },
      
    ],
  },
  "anastasiia-glazkova": {
    name: "Anastasiia Glazkova",
    title: "Glaze Poetics",
    bio:
      "Anastasiia creates visual stories where glaze color becomes memory. Her projects blend painting, ceramics, and light.",
    showSupportNote: true,
    contact: {
      label: "Contact",
      value: "projects@winter-sparrow-eye.com",
    },
    projects: [
      {
        title: "Project 1",
        description:
        "I love art more than i love making art. I am drawn to looking, to thinking, to observing what people create. But I have never been able to stay on the sidel. I always end up wanting to make something myself. My artistic way runs through a kind of roughness. Things often come out unpolished, but emotionally charged. I do not always like that, but it allows me to work directly, to focus only on what I want to put down. I am drawn to the meeting point between figuration and abstraction, because it brings in a kind of quiet, non-narrative mysticism. Art-house, if you want to call it that, but always with a character the viewer and I can both recognize. My characters are often childlike. It is easy for me to return to the past this way, and in a sense I think of children as my own nation. In acrylic and oil I often work in a simplified, almost naive way. Like roughness, it comes naturally to me because of its directness. But my real, gentle pleasure is watercolor. With it, I do not feel the need to construct something heavy. A single element or a small sketch can be enough. Here you can see some of my works. If you are interested in an art collaboration, have any questions, or simply want to talk about my or your art, please write to me at anaglazkova324@gmail.com.",
        images: [
          "/project%20Nastya/Nastya1.jpg",
          "/project%20Nastya/Nastya2.jpg",
          "/project%20Nastya/Nastya3.jpg",
          "/project%20Nastya/Nastya4.jpg",
          "/project%20Nastya/Nastya5.jpg",
          "/project%20Nastya/Nastya6.jpg",
          "/project%20Nastya/Nastya7.jpg",
          "/project%20Nastya/Nastya8.jpg",
        ],
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
    <Stack spacing={{ xs: 6, md: 5 }}>
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
                fontSize: "0.75rem",
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
                  fontSize: "0.75rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.24em",
                  color: "rgba(255, 255, 255, 0.53)",
                }}
              >
                Next Founder
              </Typography>
              <Link href={`/projects/${nextEntry[0]}`} style={{ textDecoration: "none" }}>
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: "1rem",
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

      {person?.showSupportNote && (
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 1.5,
            px: 2.5,
            py: 1.2,
            borderRadius: 999,
            border: "1px solid rgba(242,185,13,0.35)",
            backgroundColor: "rgba(242,185,13,0.12)",
            color: "rgba(255,255,255,0.9)",
            textTransform: "uppercase",
            letterSpacing: "0.24em",
            fontSize: "0.7rem",
            fontWeight: 700,
          }}
        >
          Winter Sparrow Eye supports Art and shares projects by our friends with you:
        </Box>
      )}

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", md: "flex-start" },
          gap: { xs: 6, md: 10 },
          mt: person?.showSupportNote ? { xs: 2.5, md: 3 } : 0,
          mb: { xs: 4, md: 8 },
        }}
      >
        <Box sx={{ maxWidth: 520 }}>
          <Typography
            variant="h2"
            sx={{
              fontFamily: "var(--font-playfair)",
              fontSize: "4rem",
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
            
            
          </Box>
        </Box>

        
      </Box>

      <Box
        sx={{
          width: "100%",
          p: { xs: 3, md: 5 },
          borderRadius: 4,
          border: "1px solid rgba(255,255,255,0.08)",
          backgroundColor: "rgba(0,0,0,0.1)",
          backdropFilter: "blur(12px)",
        }}
      >
        {(person?.projects ?? []).map((section) => {
          const firstImages = section.images.slice(0, 4);
          const secondImages = section.images.slice(4, 8);
          const filledSecondImages =
            secondImages.length >= 4
              ? secondImages
              : [...secondImages, ...firstImages].slice(0, 4);

          return (
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
                    fontSize: "1rem",
                    letterSpacing: "0.28em",
                    textTransform: "uppercase",
                    fontWeight: 700,
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
                {firstImages.map((image, index) => (
                  <Box
                    key={`${section.title}-first-${index}`}
                  sx={{
                    aspectRatio: "4 / 5",
                    borderRadius: 2,
                    overflow: "hidden",
                    border: "1px solid rgba(255,255,255,0.08)",
                    backgroundColor: "rgba(0,0,0,0.25)",
                    "&:hover img": {
                      filter: "grayscale(0)",
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
                      objectFit: "contain",
                        filter: "grayscale(1)",
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
                  mb: 4,
                }}
              >
                <Typography
                  sx={{
                    maxWidth: 1060,
                    fontFamily: "var(--font-playfair)",
                    fontStyle: "italic",
                    fontSize: { xs: "0.95rem", md: "1.1rem" },
                    lineHeight: 1.8,
                    color: "rgba(255,255,255,0.8)",
                  }}
                >
                "{section.description}"
                </Typography>
                
              </Box>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "repeat(2, 1fr)", md: "repeat(4, 1fr)" },
                  gap: 2,
                }}
              >
                {filledSecondImages.map((image, index) => (
                  <Box
                    key={`${section.title}-second-${index}`}
                  sx={{
                    aspectRatio: "4 / 5",
                    borderRadius: 2,
                    overflow: "hidden",
                    border: "1px solid rgba(255,255,255,0.08)",
                    backgroundColor: "rgba(0,0,0,0.25)",
                    "&:hover img": {
                      filter: "grayscale(0)",
                    },
                  }}
                  >
                    <Box
                      component="img"
                      src={image}
                      alt={`${section.title} detail ${index + 5}`}
                      sx={{
                        width: "100%",
                        height: "100%",
                      objectFit: "contain",
                        filter: "grayscale(1)",
                        transition: "all 0.7s ease",
                      }}
                    />
                  </Box>
                ))}
              </Box>
            </Box>
          );
        })}
      </Box>
    </Stack>
  );
}

