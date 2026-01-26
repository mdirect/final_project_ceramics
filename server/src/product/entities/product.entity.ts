export class Product {
  name: string;
  desc?: string | null;
  image?: string | null;
  images?: string[] | null;
  price: number;
  materials?: string[];
  collectionId: number;
  createdAt: Date;
  updatedAt: Date;
}
