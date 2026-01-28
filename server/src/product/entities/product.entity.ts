export class Product {
  name: string;
  desc?: string | null;
  finish?: string | null;
  important?: string | null;
  material?: string | null;
  image?: string | null;
  images?: string[] | null;
  price: number;
  collectionId: number;
  createdAt: Date;
  updatedAt: Date;
}
