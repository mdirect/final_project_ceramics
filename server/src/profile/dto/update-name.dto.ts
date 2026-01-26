import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class UpdateNameDto {
  @IsString({ message: 'Имя должно быть строкой' })
  @IsNotEmpty({ message: 'Имя обязательно' })
  @MinLength(2, { message: 'Имя должно содержать минимум 2 символа' })
  name: string;
}
