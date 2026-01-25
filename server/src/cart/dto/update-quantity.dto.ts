import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class UpdateQuantityDto {
  @IsInt({ message: 'Количество должно быть числом' })
  @IsNotEmpty({ message: 'Количество обязательно' })
  @Min(1, { message: 'Количество должно быть не менее 1' })
  quantity: number;
}
