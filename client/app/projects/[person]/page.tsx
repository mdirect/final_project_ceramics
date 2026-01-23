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

  if (!person) {
    return (
      <Stack spacing={4} textAlign="center">
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
            fontFamily: "Georgia, 'Times New Roman', serif",
            color: "rgba(0,0,0,0.6)",
          }}
        >
          Эта страница не найдена. Выберите автора ниже.
        </Typography>
        <Stack spacing={1} alignItems="center">
          {Object.entries(personProjects).map(([personSlug, info]) => (
            <Link key={personSlug} href={`/projects/${personSlug}`} style={{ textDecoration: "none" }}>
              <Typography sx={{ textTransform: "uppercase", letterSpacing: "0.16em" }}>
                {info.name}
              </Typography>
            </Link>
          ))}
        </Stack>
      </Stack>
    );
  }

  return (
    <Stack spacing={5}>
      <Stack spacing={1.5} textAlign="center">
        <Typography
          variant="h1"
          sx={{
            textTransform: "none",
            letterSpacing: "0.02em",
            fontWeight: 500,
            fontFamily: "Georgia, 'Times New Roman', serif",
          }}
        >
          {displayName}
        </Typography>
        <Typography
          sx={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontStyle: "italic",
            color: "rgba(0,0,0,0.6)",
          }}
        >
          {person?.title ?? "Personal projects"}
        </Typography>
      </Stack>

      <Stack spacing={2} alignItems="center" textAlign="center">
        <Typography
          sx={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: "1rem",
            color: "rgba(0,0,0,0.7)",
            maxWidth: 760,
            lineHeight: 1.9,
          }}
        >
          {person?.bio ??
            "Персональные проекты, стоимость и контакты для связи."}
        </Typography>
        <Typography sx={{ fontSize: "0.92rem", color: "rgba(0,0,0,0.6)" }}>
          {person?.contact ? `${person.contact.label}: ${person.contact.value}` : "Свяжитесь с нами для деталей."}
        </Typography>
      </Stack>

      <Divider sx={{ opacity: 0.4 }} />

      <Stack spacing={4}>
        {projects.map((project, index) => (
          <Stack
            key={project.title}
            direction={{ xs: "column", md: index % 2 === 0 ? "row" : "row-reverse" }}
            spacing={3}
            alignItems="stretch"
          >
            <Box
              sx={{
                flex: 1,
                minHeight: { xs: 240, md: 320 },
                borderRadius: 3,
                overflow: "hidden",
                backgroundImage: `url(${project.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                boxShadow: "0 16px 35px rgba(0,0,0,0.15)",
              }}
            />
            <Stack spacing={1.5} sx={{ flex: 1 }}>
              <Typography
                sx={{
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  fontSize: "1.35rem",
                  letterSpacing: "0.02em",
                }}
              >
                {project.title}
              </Typography>
              <Typography sx={{ color: "rgba(0,0,0,0.65)", lineHeight: 1.8 }}>
                {project.description}
              </Typography>
              <Typography sx={{ fontWeight: 600, letterSpacing: "0.08em" }}>
                {project.price}
              </Typography>
              <Typography sx={{ fontSize: "0.9rem", color: "rgba(0,0,0,0.55)" }}>
                Фото/видео и текст доступны для редактирования администратором.
              </Typography>
            </Stack>
          </Stack>
        ))}
      </Stack>

      <Box sx={{ textAlign: "center" }}>
        <Link href="/projects" style={{ textDecoration: "none" }}>
          <Typography
            sx={{
              textTransform: "uppercase",
              letterSpacing: "0.18em",
              fontSize: "0.95rem",
              color: "rgba(0, 0, 0, 0.63)",
            }}
          >
            Back to projects
          </Typography>
        </Link>
      </Box>
    </Stack>
  );
}

