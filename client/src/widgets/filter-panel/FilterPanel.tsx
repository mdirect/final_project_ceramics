import { shopFilters } from "@/src/shared/config/filters";

export function FilterPanel() {
  return (
    <section className="pageSection">
      <h2>Filters</h2>
      {shopFilters.map((group) => (
        <div key={group.title} className="pageSection">
          <strong>{group.title}</strong>
          <p>{group.options.join(", ")}</p>
        </div>
      ))}
    </section>
  );
}

