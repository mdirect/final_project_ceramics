import Link from "next/link";
import { Stack, Typography } from "@mui/material";

const people = [
  { label: "Laura Winter", slug: "laura-winter" },
  { label: "Irina Vorobjeva", slug: "irina-vorobjeva" },
  { label: "Anastasiia Glazkova", slug: "anastasiia-glazkova" },
];

export default function ProjectsPage() {
  return (
    <Stack spacing={2}>
      <Typography variant="h1">Projects</Typography>
      <Typography variant="body2" color="text.secondary">
        Personal projects by the WSE team.
      </Typography>
      <Stack spacing={1}>
        {people.map((person) => (
          <Link key={person.slug} href={`/projects/${person.slug}`}>
            <Typography sx={{ color: "text.primary", textTransform: "uppercase" }}>
              {person.label}
            </Typography>
          </Link>
        ))}
      </Stack>
    </Stack>
  );
}

