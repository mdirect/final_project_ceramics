import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { hash, compare } from 'bcrypt';
import { DbService } from '../db/db.service';
import { UpdateNameDto } from './dto/update-name.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UserEntity } from '../auth/entities/user.entity';

@Injectable()
export class ProfileService {
  constructor(private readonly dbService: DbService) {}

  async updateName(userId: number, updateNameDto: UpdateNameDto): Promise<UserEntity> {
    const user = await this.dbService.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('Аккаунт деактивирован');
    }

    const updatedUser = await this.dbService.user.update({
      where: { id: userId },
      data: {
        name: updateNameDto.name,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return updatedUser;
  }

  async changePassword(
    userId: number,
    changePasswordDto: ChangePasswordDto,
  ): Promise<{ message: string }> {
    const user = await this.dbService.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('Аккаунт деактивирован');
    }

    // Проверяем текущий пароль
    const isCurrentPasswordValid = await compare(
      changePasswordDto.currentPassword,
      user.password,
    );

    if (!isCurrentPasswordValid) {
      throw new UnauthorizedException('Неверный текущий пароль');
    }

    // Проверяем, что новый пароль отличается от текущего
    const isSamePassword = await compare(
      changePasswordDto.newPassword,
      user.password,
    );

    if (isSamePassword) {
      throw new UnauthorizedException(
        'Новый пароль должен отличаться от текущего',
      );
    }

    // Хешируем новый пароль
    const hashedNewPassword = await hash(changePasswordDto.newPassword, 10);

    // Обновляем пароль
    await this.dbService.user.update({
      where: { id: userId },
      data: {
        password: hashedNewPassword,
      },
    });

    return { message: 'Пароль успешно изменен' };
  }

  async softDelete(userId: number): Promise<{ message: string }> {
    const user = await this.dbService.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('Аккаунт уже деактивирован');
    }

    // Мягкое удаление - устанавливаем isActive в false
    await this.dbService.user.update({
      where: { id: userId },
      data: {
        isActive: false,
      },
    });

    return { message: 'Аккаунт успешно деактивирован' };
  }
}
