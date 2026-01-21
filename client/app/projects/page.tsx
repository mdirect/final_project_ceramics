import Link from "next/link";

const people = [
  { label: "Laura Winter", slug: "laura-winter" },
  { label: "Irina Vorobjeva", slug: "irina-vorobjeva" },
  { label: "Anastasiia Glazkova", slug: "anastasiia-glazkova" },
];

export default function ProjectsPage() {
  return (
    <main className="page">
      <h1>Projects</h1>
      <p>Personal projects by the WSE team.</p>
      <section className="pageSection">
        {people.map((person) => (
          <Link key={person.slug} href={`/projects/${person.slug}`}>
            {person.label}
          </Link>
        ))}
      </section>
    </main>
  );
}

