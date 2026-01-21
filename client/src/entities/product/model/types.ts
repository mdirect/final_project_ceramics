export type ProductAvailability = "available" | "unavailable";

export type Product = {
  id: string;
  name: string;
  price: number;
  description?: string;
  materials?: string[];
  tags?: string[];
  images?: string[];
  availability: ProductAvailability;
  collectionSlug?: string;
};

