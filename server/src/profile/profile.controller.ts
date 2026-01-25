import {
  Controller,
  Patch,
  Body,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { ProfileService } from './profile.service';
import { UpdateNameDto } from './dto/update-name.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { UserEntity } from '../auth/entities/user.entity';

@Controller('profile')
@UseGuards(JwtAuthGuard)
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Patch('name')
  @HttpCode(HttpStatus.OK)
  async updateName(
    @GetUser() user: UserEntity,
    @Body() updateNameDto: UpdateNameDto,
  ) {
    const updatedUser = await this.profileService.updateName(
      user.id,
      updateNameDto,
    );
    return {
      user: updatedUser,
      message: 'Имя успешно обновлено',
    };
  }

  @Patch('password')
  @HttpCode(HttpStatus.OK)
  async changePassword(
    @GetUser() user: UserEntity,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    return await this.profileService.changePassword(user.id, changePasswordDto);
  }

  @Delete()
  @HttpCode(HttpStatus.OK)
  async softDelete(
    @GetUser() user: UserEntity,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.profileService.softDelete(user.id);

    // Очищаем токены после деактивации аккаунта
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');

    return result;
  }
}
