import { IsString, IsNotEmpty } from 'class-validator';

export class CatalogDto {
  @IsNotEmpty({ message: 'Файл обязателен' })
  @IsString({ message: 'Файл должен быть строкой' })
  file: string;
}
