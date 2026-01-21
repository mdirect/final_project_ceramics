type ProjectsPersonPageProps = {
  params: {
    person: string;
  };
};

export default function ProjectsPersonPage({
  params,
}: ProjectsPersonPageProps) {
  return (
    <main className="page">
      <h1>Projects: {params.person.replace(/-/g, " ")}</h1>
      <p>Personal projects, pricing, and contact details.</p>
    </main>
  );
}

