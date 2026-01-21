type ProductPageProps = {
  params: {
    id: string;
  };
};

export default function ProductPage({ params }: ProductPageProps) {
  return (
    <main className="page">
      <h1>Product {params.id}</h1>
      <p>Gallery, description, materials, and availability.</p>
    </main>
  );
}

