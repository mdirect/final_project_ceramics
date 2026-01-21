type ProductGridProps = {
  title?: string;
};

export function ProductGrid({ title }: ProductGridProps) {
  return (
    <section className="pageSection">
      <h2>{title ?? "Products"}</h2>
      <p>Grid placeholder for product cards.</p>
    </section>
  );
}

