import { PrismaClient } from '@prisma/client';

// const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: [
      {
        name: 'Дарья',
        email: 'test@ya.ru',
        password: 'Qwerty1!',
      },
    ],
  });
  console.log('Users seeds done');

  await prisma.collection.createMany({
    data: [
      {
        title: 'Collectiion 1',
        description: 'Collectiion 1 description',
        image: '1.png',
      },
      {
        title: 'Collectiion 2',
        description: 'Collectiion 2 description',
        image: '2.png',
      },
      {
        title: 'Collectiion 3',
        description: 'Collectiion 3 description',
        image: '3.png',
      },
      {
        title: 'Collectiion 4',
        description: 'Collectiion 4 description',
        image: '4.png',
      },
      {
        title: 'Collectiion 5',
        description: 'Collectiion 5 description',
        image: '5.png',
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
