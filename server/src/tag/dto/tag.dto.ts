import { Filter } from '@prisma/client';
import { IsString, IsEnum } from 'class-validator';

export class TagDto {
  @IsEnum(Filter)
  filter: Filter;

  @IsString()
  tag: string;
}
