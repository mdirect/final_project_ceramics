const sections = [
  "Delivery",
  "Return Policy",
  "Terms & Conditions",
  "Privacy Policy",
  "Cookie Policy",
];

export default function PolicyPage() {
  return (
    <main className="page">
      <h1>Policy & Delivery Terms</h1>
      <section className="pageSection">
        {sections.map((title) => (
          <p key={title}>{title}</p>
        ))}
      </section>
    </main>
  );
}

