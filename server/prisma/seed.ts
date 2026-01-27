import { PrismaClient } from '@prisma/client';
import { tag } from './seeds/tag';
import { user } from './seeds/user';

const prisma = new PrismaClient();

async function main() {
  await user(prisma);
  await tag(prisma);

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

  await prisma.productTagLink.createMany({
    data: [
      { productId: 1, tagId: 1 },
      { productId: 1, tagId: 6 },
      { productId: 1, tagId: 12 },
      { productId: 1, tagId: 15 },
      { productId: 1, tagId: 19 },
      { productId: 2, tagId: 5 },
      { productId: 2, tagId: 7 },
      { productId: 2, tagId: 13 },
      { productId: 2, tagId: 17 },
      { productId: 2, tagId: 21 },
      { productId: 2, tagId: 23 },
    ],
  });
  console.log('Link tag and product seeds done');

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

  await prisma.worker.createMany({
    data: [
      {
        name: 'Иван Петров',
        image: 'https://example.com/ivan.jpg',
        desc: 'Опытный керамист с 15-летним стажем. Специализируется на декоративной керамике.',
      },
      {
        name: 'Мария Сидорова',
        image: 'https://example.com/maria.jpg',
        desc: 'Художница по керамике. Создает уникальные изделия ручной работы.',
      },
      {
        name: 'Александр Иванов',
        image: 'https://example.com/alexander.jpg',
        desc: 'Мастер по изготовлению кухонной керамики и посуды.',
      },
      {
        name: 'Анна Морозова',
        image: 'https://example.com/anna.jpg',
        desc: 'Специалист по глазировке и обжигу керамических изделий.',
      },
    ],
  });
  console.log('Workers seeds done');

  await prisma.project.createMany({
    data: [
      {
        workerId: 1,
        title: 'Керамическая ваза "Восток"',
        desc: 'Большая декоративная ваза с восточными мотивами. Высота 45 см.',
      },
      {
        workerId: 1,
        title: 'Набор тарелок "Классика"',
        desc: 'Набор из 6 тарелок для сервировки стола. Диаметр 25 см.',
      },
      {
        workerId: 2,
        title: 'Скульптура "Танец"',
        desc: 'Абстрактная керамическая скульптура. Высота 60 см.',
      },
      {
        workerId: 2,
        title: 'Кашпо "Кактус"',
        desc: 'Кашпо в форме кактуса для комнатных растений.',
      },
      {
        workerId: 3,
        title: 'Кофейный сервиз',
        desc: 'Полный кофейный сервиз на 6 персон с подносом.',
      },
      {
        workerId: 3,
        title: 'Миски ручной работы',
        desc: 'Набор из 4 глубоких мисок для супов и салатов.',
      },
      {
        workerId: 4,
        title: 'Коллекция глазированной посуды',
        desc: 'Серия посуды с различными видами глазировки.',
      },
    ],
  });
  console.log('Projects seeds done');

  await prisma.projectPic.createMany({
    data: [
      {
        projectId: 1,
        image: 'https://example.com/vase1.jpg',
      },
      {
        projectId: 1,
        image: 'https://example.com/vase2.jpg',
      },
      {
        projectId: 1,
        image: 'https://example.com/vase3.jpg',
      },
      {
        projectId: 2,
        image: 'https://example.com/plates1.jpg',
      },
      {
        projectId: 2,
        image: 'https://example.com/plates2.jpg',
      },
      {
        projectId: 3,
        image: 'https://example.com/sculpture1.jpg',
      },
      {
        projectId: 3,
        image: 'https://example.com/sculpture2.jpg',
      },
      {
        projectId: 4,
        image: 'https://example.com/kashpo1.jpg',
      },
      {
        projectId: 5,
        image: 'https://example.com/coffee-set1.jpg',
      },
      {
        projectId: 5,
        image: 'https://example.com/coffee-set2.jpg',
      },
      {
        projectId: 6,
        image: 'https://example.com/bowls1.jpg',
      },
      {
        projectId: 7,
        image: 'https://example.com/glazed1.jpg',
      },
      {
        projectId: 7,
        image: 'https://example.com/glazed2.jpg',
      },
      {
        projectId: 7,
        image: 'https://example.com/glazed3.jpg',
      },
    ],
  });
  console.log('ProjectPics seeds done');
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
