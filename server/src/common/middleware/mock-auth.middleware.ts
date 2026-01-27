import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class MockAuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Mock пользователь с ADMIN ролью для тестирования
    req.user = {
      id: 1,
      role: 'ADMIN',
      email: 'test@ya.ru',
    };
    next();
  }
}
