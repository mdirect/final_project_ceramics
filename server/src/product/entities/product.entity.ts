export class Product {
  id: number;
  name: string;
  desc?: string | null;
  image?: string | null;
  price: number;
  materials?: string[];
  collectionId: number;
  createdAt: Date;
  updatedAt: Date;
}
