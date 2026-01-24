import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { hash, compare } from 'bcrypt';
import { DbService } from '../db/db.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private dbService: DbService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async register(registerDto: RegisterDto): Promise<UserEntity> {
    const { email, password, name } = registerDto;

    // Проверяем, существует ли пользователь с таким email
    const existingUser = await this.dbService.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('Пользователь с таким email уже существует');
    }

    // Хешируем пароль
    const hashedPassword = await hash(password, 10);

    // Создаем пользователя
    const user = await this.dbService.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return user;
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Находим пользователя
    const user = await this.dbService.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Неверный email или пароль');
    }

    // Проверяем пароль
    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Неверный email или пароль');
    }

    // Генерируем токены
    const tokens = this.generateTokens(user.id, user.email);

    // Возвращаем данные пользователя (без пароля) и токены
    const { password: _, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      ...tokens,
    };
  }

  generateTokens(userId: number, email: string) {
    const payload = { sub: userId, email };

    // Access токен на 1 минуту
    const accessToken = this.jwtService.sign(
      { ...payload, type: 'access' },
      {
        expiresIn: '1m',
      },
    );

    // Refresh токен на 24 часа
    const refreshToken = this.jwtService.sign(
      { ...payload, type: 'refresh' },
      {
        expiresIn: '24h',
        secret:
          this.configService.get<string>('JWT_REFRESH_SECRET') ||
          this.configService.get<string>('JWT_SECRET') ||
          'your-secret-key',
      },
    );

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async refreshTokens(userId: number, email: string) {
    const tokens = this.generateTokens(userId, email);

    // Проверяем, что пользователь существует
    const user = await this.validateUser(userId);
    if (!user) {
      throw new UnauthorizedException('Пользователь не найден');
    }

    return {
      user,
      ...tokens,
    };
  }

  async validateUser(userId: number): Promise<UserEntity | null> {
    const user = await this.dbService.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return user;
  }
}
