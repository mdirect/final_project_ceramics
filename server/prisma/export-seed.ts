import { PrismaClient } from '@prisma/client';
import { mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';

const prisma = new PrismaClient();

async function main() {
  const collections = await prisma.collection.findMany({
    orderBy: { id: 'asc' },
  });
  const products = await prisma.product.findMany({
    orderBy: { id: 'asc' },
    include: { collection: true },
  });

  const seedDir = join(__dirname, 'seed-data');
  mkdirSync(seedDir, { recursive: true });

  const collectionsData = collections.map((collection) => ({
    title: collection.title,
    description: collection.description,
    image: collection.image,
  }));

  const productsData = products.map((product) => ({
    name: product.name,
    desc: product.desc,
    image: product.image,
    images: product.images ?? [],
    price: Number(product.price),
    collectionTitle: product.collection.title,
  }));

  writeFileSync(
    join(seedDir, 'collections.json'),
    JSON.stringify(collectionsData, null, 2),
    'utf-8',
  );
  writeFileSync(
    join(seedDir, 'products.json'),
    JSON.stringify(productsData, null, 2),
    'utf-8',
  );

  console.log(`Exported ${collectionsData.length} collections.`);
  console.log(`Exported ${productsData.length} products.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
