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
    title: "Ритуалы украшений",
    bio:
      "Лора соединяет металл с керамикой, превращая украшения в историю прикосновения. Она работает с патиной, рваной фактурой и мягким светом серебра.",
    contact: {
      label: "Связаться",
      value: "hello@winter-sparrow-eye.com",
    },
    projects: [
      {
        title: "Ritual Collar",
        description:
          "Серия колье, вдохновленная линией речного ила и следом веревки на мокрой глине.",
        price: "от 420 €",
        image:
          "https://images.unsplash.com/photo-1456327102063-fb5054efe647?auto=format&fit=crop&w=1200&q=80",
      },
      {
        title: "Silent Runes",
        description:
          "Кулоны с керамическими вставками, созданные для дневниковых ритуалов и личных оберегов.",
        price: "от 280 €",
        image:
          "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=80",
      },
    ],
  },
  "irina-vorobjeva": {
    name: "Irina Vorobjeva",
    title: "Тактильные пространства",
    bio:
      "Ирина выстраивает архитектуру из глины: модульные формы, грубая глазурь и драматичный свет внутри пространства.",
    contact: {
      label: "Связаться",
      value: "studio@winter-sparrow-eye.com",
    },
    projects: [
      {
        title: "Clay Terrain",
        description:
          "Настенные панели с рельефом, повторяющим движение песка и морских волн.",
        price: "от 680 €",
        image:
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
      },
      {
        title: "Slow Tables",
        description:
          "Столы из керамических плит с микро-трещинами, стабилизированными бронзой.",
        price: "от 1200 €",
        image:
          "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80",
      },
    ],
  },
  "anastasiia-glazkova": {
    name: "Anastasiia Glazkova",
    title: "Глазурная поэтика",
    bio:
      "Анастасия создает визуальные истории, где цвет глазури играет роль памяти. Ее проекты — это смесь живописи, керамики и света.",
    contact: {
      label: "Связаться",
      value: "projects@winter-sparrow-eye.com",
    },
    projects: [
      {
        title: "Light Vessels",
        description:
          "Световые объекты, в которых полупрозрачная глазурь работает как фильтр.",
        price: "от 540 €",
        image:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1200&q=80",
      },
      {
        title: "Glaze Letters",
        description:
          "Набор настенных панно, рассказывающих о личных архивах и письмах.",
        price: "от 360 €",
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
            fontFamily: "'Playfair Display', 'Times New Roman', serif",
            color: "rgba(255,255,255,0.95)",
          }}
        >
          Projects
        </Typography>
        <Typography
          sx={{
            fontFamily: "'Playfair Display', 'Times New Roman', serif",
            color: "rgba(255,255,255,0.6)",
          }}
        >
          Эта страница не найдена. Выберите автора ниже.
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
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "repeat(2, 1fr)" },
          gap: { xs: 4, md: 6 },
          alignItems: "center",
        }}
      >
        <Stack spacing={3} order={{ xs: 2, lg: 1 }}>
          <Typography
            sx={{
              textTransform: "uppercase",
              letterSpacing: "0.4em",
              fontSize: "0.7rem",
              fontWeight: 700,
              color: accent,
            }}
          >
            {person?.title ?? "Master Artist"}
          </Typography>
          <Typography
            variant="h1"
            sx={{
              fontFamily: "'Playfair Display', 'Times New Roman', serif",
              fontSize: { xs: "2.8rem", md: "4.4rem" },
              lineHeight: 1.05,
              color: "rgba(255,255,255,0.95)",
            }}
          >
            {displayName}
          </Typography>
          <Typography
            sx={{
              fontFamily: "'Playfair Display', 'Times New Roman', serif",
              fontStyle: "italic",
              fontSize: { xs: "1.2rem", md: "1.6rem" },
              color: "rgba(255,255,255,0.75)",
              maxWidth: 520,
              lineHeight: 1.6,
            }}
          >
            {person?.bio ?? "Персональные проекты, стоимость и контакты для связи."}
          </Typography>
          <Box sx={{ display: "flex", gap: { xs: 3, md: 6 }, flexWrap: "wrap", pt: 2 }}>
            {[
              { label: "Studio Focus", value: person?.title ?? "Personal projects" },
              { label: "Collections", value: `${projects.length} series` },
            ].map((item) => (
              <Box key={item.label}>
                <Typography
                  sx={{
                    fontSize: "0.62rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.28em",
                    fontWeight: 700,
                    color: accent,
                    mb: 0.8,
                  }}
                >
                  {item.label}
                </Typography>
                <Typography sx={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.6)" }}>
                  {item.value}
                </Typography>
              </Box>
            ))}
          </Box>
        </Stack>

        <Box
          sx={{
            order: { xs: 1, lg: 2 },
            position: "relative",
            borderRadius: 4,
            overflow: "hidden",
            aspectRatio: "4 / 5",
            boxShadow: "0 28px 60px rgba(0,0,0,0.45)",
            border: "1px solid rgba(255,255,255,0.08)",
            backgroundImage: `url(${projects[0]?.image ?? "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80"})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(180deg, rgba(0,0,0,0.2), rgba(0,0,0,0.6))",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: 24,
              left: 24,
              right: 24,
              px: 3,
              py: 2.5,
              borderRadius: 3,
              backdropFilter: "blur(14px)",
              backgroundColor: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <Typography sx={{ fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: accent }}>
              Studio Highlight
            </Typography>
            <Typography sx={{ fontSize: "1.1rem", mt: 0.6, color: "rgba(255,255,255,0.9)" }}>
              {projects[0]?.title ?? "Signature collection"}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          px: { xs: 2.5, md: 4 },
          py: { xs: 6, md: 8 },
          borderRadius: 4,
          border: "1px solid rgba(255,255,255,0.06)",
          backgroundColor: "rgba(255,255,255,0.02)",
          backdropFilter: "blur(8px)",
        }}
      >
        <Stack spacing={2.5} sx={{ mb: 4 }}>
          <Typography sx={{ fontSize: "1.8rem", fontWeight: 700, color: "rgba(255,255,255,0.95)" }}>
            Curated Collections
          </Typography>
          <Typography sx={{ color: "rgba(255,255,255,0.5)", maxWidth: 480 }}>
            Signature series developed within the Winter Sparrow studio.
          </Typography>
        </Stack>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" },
            gap: 3,
          }}
        >
          {projects.map((project) => (
            <Box
              key={project.title}
              sx={{
                position: "relative",
                aspectRatio: "1 / 1",
                borderRadius: 3,
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 20px 40px rgba(0,0,0,0.35)",
                "&:hover img": { transform: "scale(1.08)" },
                "&:hover .overlay": { opacity: 1, transform: "translateY(0)" },
              }}
            >
              <Box
                component="img"
                src={project.image}
                alt={project.title}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.7s ease",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(180deg, rgba(0,0,0,0.1), rgba(0,0,0,0.55))",
                }}
              />
              <Box
                className="overlay"
                sx={{
                  position: "absolute",
                  bottom: 20,
                  left: 20,
                  right: 20,
                  px: 2.5,
                  py: 2,
                  borderRadius: 2.5,
                  backdropFilter: "blur(12px)",
                  backgroundColor: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  opacity: 0,
                  transform: "translateY(16px)",
                  transition: "all 0.5s ease",
                }}
              >
                <Typography sx={{ fontSize: "0.6rem", letterSpacing: "0.28em", textTransform: "uppercase", color: accent }}>
                  {person?.title ?? "Studio series"}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "'Playfair Display', 'Times New Roman', serif",
                    fontSize: "1.1rem",
                    mt: 0.6,
                    color: "rgba(255,255,255,0.92)",
                  }}
                >
                  {project.title}
                </Typography>
                <Typography sx={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.65)", mt: 0.6 }}>
                  {project.description}
                </Typography>
              </Box>
            </Box>
          ))}
          <Box
            sx={{
              position: "relative",
              aspectRatio: "1 / 1",
              borderRadius: 3,
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.08)",
              backgroundColor: "rgba(24,22,18,0.9)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              px: 3,
              textAlign: "center",
            }}
          >
            <Stack spacing={2}>
              <Typography sx={{ color: accent, fontSize: "0.7rem", letterSpacing: "0.28em", textTransform: "uppercase" }}>
                Ongoing
              </Typography>
              <Typography sx={{ fontFamily: "'Playfair Display', 'Times New Roman', serif", fontSize: "1.2rem" }}>
                Material Research
              </Typography>
              <Typography sx={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.6)" }}>
                Experimentation with glaze, metal, and light currently in studio.
              </Typography>
            </Stack>
          </Box>
        </Box>
      </Box>

      <Box sx={{ textAlign: "center", maxWidth: 840, mx: "auto" }}>
        <Typography sx={{ fontFamily: "'Playfair Display', 'Times New Roman', serif", fontSize: "2rem", mb: 4 }}>
          The Alchemy of Form
        </Typography>
        <Stack spacing={3} sx={{ textAlign: "left", color: "rgba(255,255,255,0.7)", lineHeight: 1.9 }}>
          <Typography>
            {person?.bio ??
              "Персональные проекты, стоимость и контакты для связи."}
          </Typography>
          <Typography>
            Каждая работа начинается с наблюдения за природной текстурой и заканчивается в мастерской, где глина или металл
            проходят границу между памятью и современностью.
          </Typography>
          <Typography>
            В студии Winter Sparrow Eye автор отвечает за целостность серий: от зарисовок и тестов глазури до финальной
            композиции света и пространства.
          </Typography>
        </Stack>
        <Divider sx={{ my: 5, opacity: 0.3 }} />
        <Typography sx={{ fontSize: "0.85rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)" }}>
          {person?.contact ? `${person.contact.label}: ${person.contact.value}` : "Свяжитесь с нами для деталей."}
        </Typography>
      </Box>

      <Box sx={{ textAlign: "center" }}>
        <Link href="/projects" style={{ textDecoration: "none" }}>
          <Typography
            sx={{
              textTransform: "uppercase",
              letterSpacing: "0.28em",
              fontSize: "0.75rem",
              color: "rgba(255,255,255,0.55)",
              "&:hover": { color: accent },
            }}
          >
            Back to projects
          </Typography>
        </Link>
      </Box>
    </Stack>
  );
}

