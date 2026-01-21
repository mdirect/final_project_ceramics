import { Stack, Typography } from "@mui/material";

type ProjectsPersonPageProps = {
  params: {
    person: string;
  };
};

export default function ProjectsPersonPage({
  params,
}: ProjectsPersonPageProps) {
  return (
    <Stack spacing={2}>
      <Typography variant="h1">
        Projects: {params.person.replace(/-/g, " ")}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Personal projects, pricing, and contact details.
      </Typography>
    </Stack>
  );
}

