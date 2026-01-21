import { FilterPanel } from "@/src/widgets/filter-panel";
import { ProductGrid } from "@/src/widgets/product-grid";

type CollectionPageProps = {
  params: {
    slug: string;
  };
};

export default function CollectionPage({ params }: CollectionPageProps) {
  return (
    <main className="page">
      <h1>Collection: {params.slug.replace(/-/g, " ")}</h1>
      <FilterPanel />
      <ProductGrid title="Collection items" />
    </main>
  );
}

