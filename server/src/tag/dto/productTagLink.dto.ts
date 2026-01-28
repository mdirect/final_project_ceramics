import { IsNumber } from 'class-validator';

export class ProductTagLinkDto {
  @IsNumber()
  productId: number;

  @IsNumber()
  tagId: number;
}
