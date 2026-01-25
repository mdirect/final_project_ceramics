import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class PostDto {
  @IsNotEmpty({ message: 'Заголовок обязателен' })
  @IsString({ message: 'Заголовок должен быть строкой' })
  title: string;

  @IsNotEmpty({ message: 'Описание обязательно' })
  @IsString({ message: 'Описание должно быть строкой' })
  desc: string;

  @IsOptional()
  @IsString({ message: 'Изображение должно быть строкой' })
  image?: string | null;
}
