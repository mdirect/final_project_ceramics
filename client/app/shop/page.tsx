import Link from "next/link";
import { collections } from "@/src/shared/config/collections";
import { FilterPanel } from "@/src/widgets/filter-panel";
import { ProductGrid } from "@/src/widgets/product-grid";

export default function ShopPage() {
  return (
    <main className="page">
      <h1>Shop</h1>
      <FilterPanel />
      <section className="pageSection">
        <h2>Collections</h2>
        {collections.map((collection) => (
          <Link key={collection.slug} href={`/collections/${collection.slug}`}>
            {collection.label}
          </Link>
        ))}
      </section>
      <ProductGrid title="Collections and products" />
    </main>
  );
}

