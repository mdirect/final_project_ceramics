import { IsString, IsNotEmpty, IsOptional, IsDateString, IsEnum } from 'class-validator';
import { EventStatus } from '@prisma/client';

export class EventDto {
  @IsNotEmpty({ message: 'Название мероприятия обязательно' })
  @IsString({ message: 'Название должно быть строкой' })
  title: string;

  @IsNotEmpty({ message: 'Дата мероприятия обязательна' })
  @IsDateString({}, { message: 'Некорректный формат даты' })
  date: string;

  @IsNotEmpty({ message: 'Место проведения обязательно' })
  @IsString({ message: 'Место проведения должно быть строкой' })
  place: string;

  @IsOptional()
  @IsString({ message: 'Описание должно быть строкой' })
  desc?: string | null;

  @IsOptional()
  @IsString({ message: 'Изображение должно быть строкой' })
  image?: string | null;

  @IsOptional()
  @IsEnum(EventStatus, { message: 'Статус должен быть UPCOMING или PAST' })
  status?: EventStatus;
}
