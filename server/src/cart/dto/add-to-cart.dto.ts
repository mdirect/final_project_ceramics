import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class AddToCartDto {
  @IsInt({ message: 'ID товара должен быть числом' })
  @IsNotEmpty({ message: 'ID товара обязателен' })
  productId: number;

  @IsInt({ message: 'Количество должно быть числом' })
  @Min(1, { message: 'Количество должно быть не менее 1' })
  quantity: number;
}
