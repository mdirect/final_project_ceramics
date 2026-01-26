import {
  IsString,
  IsNotEmpty,
  MinLength,
  Matches,
} from 'class-validator';

export class ChangePasswordDto {
  @IsString({ message: 'Текущий пароль должен быть строкой' })
  @IsNotEmpty({ message: 'Текущий пароль обязателен' })
  currentPassword: string;

  @IsString({ message: 'Новый пароль должен быть строкой' })
  @IsNotEmpty({ message: 'Новый пароль обязателен' })
  @MinLength(8, { message: 'Новый пароль должен содержать минимум 8 символов' })
  @Matches(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])/,
    {
      message:
        'Новый пароль должен содержать минимум одну цифру, одну заглавную букву, одну строчную букву и один специальный символ (@$!%*?&)',
    },
  )
  newPassword: string;
}
