import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';
import { readFileSync } from 'fs';
import { join } from 'path';

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

  const seedDir = join(__dirname, 'seed-data');
  const collectionsPath = join(seedDir, 'collections.json');
  const productsPath = join(seedDir, 'products.json');

  const collectionsSeed = JSON.parse(
    readFileSync(collectionsPath, 'utf-8'),
  ) as Array<{ title: string; description?: string | null; image?: string | null }>;
  const productsSeed = JSON.parse(readFileSync(productsPath, 'utf-8')) as Array<{
    name: string;
    desc?: string | null;
    image?: string | null;
    images?: string[];
    price: number | string;
    collectionTitle: string;
  }>;

  const collectionIdByTitle = new Map<string, number>();
  for (const collection of collectionsSeed) {
    const created = await prisma.collection.upsert({
      where: { title: collection.title },
      create: {
        title: collection.title,
        description: collection.description ?? null,
        image: collection.image ?? null,
      },
      update: {
        description: collection.description ?? null,
        image: collection.image ?? null,
      },
    });
    collectionIdByTitle.set(created.title, created.id);
  }
  console.log('Collections seeds done');

  const productsData = productsSeed.map((product) => {
    const collectionId = collectionIdByTitle.get(product.collectionTitle);
    if (!collectionId) {
      throw new Error(`Collection not found for product: ${product.name}`);
    }
    const images = product.images ?? [];
    const image = product.image ?? images[0] ?? null;
    const price = Number(product.price);
    if (Number.isNaN(price)) {
      throw new Error(`Invalid price for product: ${product.name}`);
    }
    return {
      collectionId,
      name: product.name,
      desc: product.desc ?? null,
      image,
      images,
      price,
    };
  });

  for (const product of productsData) {
    await prisma.product.upsert({
      where: {
        collectionId_name: {
          collectionId: product.collectionId,
          name: product.name,
        },
      },
      create: product,
      update: {
        desc: product.desc ?? null,
        image: product.image ?? null,
        images: product.images ?? [],
        price: product.price,
      },
    });
  }
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
