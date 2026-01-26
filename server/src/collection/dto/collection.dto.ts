import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CollectionDto {
  @IsNotEmpty({ message: 'Заголовок обязателен' })
  @IsString({ message: 'Заголовок должен быть строкой' })
  title: string;

  @IsOptional()
  @IsString({ message: 'Описание должно быть строкой' })
  description?: string | null;

  @IsOptional()
  @IsString({ message: 'Изображение должно быть строкой' })
  image?: string | null;
}
