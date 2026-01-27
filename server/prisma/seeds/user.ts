import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

export async function user(prisma: PrismaClient) {
    await prisma.user.createMany({
      skipDuplicates: true,
      data: [
        {
          name: 'Админ',
          email: 'admin@ya.ru',
          password: await hash('Qwerty1!', 10),
          role: 'ADMIN',
        },
        {
          name: 'Дарья',
          email: 'test@ya.ru',
          password: await hash('Qwerty1!', 10),
        },
      ],
    });
    console.log('Users seeds done');
}
