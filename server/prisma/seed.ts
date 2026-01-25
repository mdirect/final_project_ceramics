import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
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

  await prisma.collection.createMany({
    data: [
      {
        title: 'Hands',
        description: null,
        image: null,
      },
      {
        title: 'Bearlings',
        description: null,
        image: null,
      },
      {
        title: 'Dear Deer',
        description: null,
        image: null,
      },
      {
        title: 'Lotus',
        description: null,
        image: null,
      },
      {
        title: 'Microworld',
        description: null,
        image: null,
      },
      {
        title: 'Sci-fi',
        description: null,
        image: null,
      },
      {
        title: 'Masks and faces',
        description: null,
        image: null,
      },
      {
        title: 'Floral',
        description: null,
        image: null,
      },
      {
        title: 'Baroque',
        description: null,
        image: null,
      },
      {
        title: 'Man and ball',
        description: null,
        image: null,
      },
      {
        title: 'Out of collections',
        description: null,
        image: null,
      },
    ],
  });
  console.log('Collections seeds done');

  await prisma.product.createMany({
    data: [
      {
        collectionId: 1,
        name: 'Product 1',
        desc: 'Product 1 description',
        image: '1.png',
        price: 1000,
      },
      {
        collectionId: 1,
        name: 'Product 2',
        desc: 'Product 2 description',
        image: '2.png',
        price: 2000,
      },
      {
        collectionId: 2,
        name: 'Product 3',
        desc: 'Product 3 description',
        image: '3.png',
        price: 3000,
      },
      {
        collectionId: 2,
        name: 'Product 4',
        desc: 'Product 4 description',
        image: '4.png',
        price: 4000,
      },
      {
        collectionId: 3,
        name: 'Product 5',
        desc: 'Product 5 description',
        image: '5.png',
        price: 5000,
      },
    ],
  });
  console.log('Products seeds done');

  await prisma.event.createMany({
    data: [
      {
        title: 'Выставка ювелирных изделий',
        date: '2026-02-25T10:00:00Z',
        place: 'Галерея искусств',
        desc: 'можно купить',
        image: 'event.png',
      },
      {
        title: 'Выставка керамики',
        date: '2026-02-15T18:00:00Z',
        place: 'Галерея искусств',
        desc: 'Выставка современных керамических изделий',
        image: 'event.jpg',
        status: 'UPCOMING',
      },
      {
        title: 'Выставка керамики',
        date: '2025-02-15T18:00:00Z',
        place: 'Галерея искусств',
        desc: 'Выставка современных керамических изделий',
        status: 'PAST',
      },
    ],
  });
  console.log('Events seeds done');

  await prisma.post.createMany({
    data: [
      {
        title: 'Новая коллекция керамики',
        desc: 'Представляем новую коллекцию авторской керамики',
        image: 'post.png',
      },
    ],
  });
  console.log('Posts seeds done');

  await prisma.catalog.createMany({
    data: [
      {
        file: 'catalogs/2026-catalog.pdf',
      },
    ],
  });
  console.log('Catalogs seeds done');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
