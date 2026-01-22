export class CreateProductDto {
  name: string;
  desc?: string | null;
  image?: string | null;
  price: number;
  collectionId: number;
}
