import {
  IsArray,
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
} from 'class-validator';

export class ProductDto {
  @IsNotEmpty({ message: 'Заголовок обязателен' })
  @IsString({ message: 'Заголовок должен быть строкой' })
  name: string;

  @IsOptional()
  @IsString({ message: 'Описание должно быть строкой' })
  desc?: string | null;

  @IsOptional()
  @IsString({ message: 'Отделка должна быть строкой' })
  finish?: string | null;

  @IsOptional()
  @IsString({ message: 'Предостережение должно быть строкой' })
  important?: string | null;

  @IsOptional()
  @IsString({ message: 'Материал должен быть строкой' })
  material?: string | null;

  @IsOptional()
  @IsString({ message: 'Изображение должно быть строкой' })
  image?: string | null;

  @IsOptional()
  @IsArray({ message: 'Изображения должны быть массивом' })
  @IsString({ each: true, message: 'Изображение должно быть строкой' })
  images?: string[] | null;

  @IsNumber()
  price: number;

  @IsNumber()
  collectionId: number;
}
