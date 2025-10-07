// /prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  // Clean up previous data in the correct order of dependency
  console.log('Cleaning up existing data (if any)...');

  console.log('Seeding new data...');
  
  // Create Cameras
  const sonyA6400 = await prisma.camera.create({
    data: {
      brand: 'Sony',
      model: 'a6400',
      imageUrl: 'https://images.unsplash.com/photo-1599599922538-9b6b73a4b6c7?q=80&w=1974&auto=format&fit=crop',
      referencePriceUSD: 899,
    },
  });

  const sonyZVE10 = await prisma.camera.create({
    data: {
      brand: 'Sony',
      model: 'ZV-E10',
      imageUrl: 'https://images.unsplash.com/photo-1627993076899-2de6d7e4c2a3?q=80&w=2070&auto=format&fit=crop',
      referencePriceUSD: 699,
    },
  });

  // Create Lenses
  const sigma1850 = await prisma.lens.create({
    data: {
      brand: 'Sigma',
      name: '18-50mm F2.8 DC DN',
      focalLengthMin: 18,
      focalLengthMax: 50,
      apertureMin: 2.8,
      apertureMax: 22,
      mountType: 'E',
      lensType: 'DC DN',
      imageUrl: 'https://images.unsplash.com/photo-1594993417618-433e5077d7a9?q=80&w=1964&auto=format&fit=crop'
    },
  });

  // Create Price Entries for Sony a6400
  await prisma.priceEntry.createMany({
    data: [
      {
        cameraId: sonyA6400.id,
        price: 3300000,
        shopName: 'Camera Shop A',
        date: new Date('2025-09-01'),
      },
      {
        cameraId: sonyA6400.id,
        price: 3250000,
        shopName: 'Camera Shop B',
        date: new Date('2025-09-15'),
        isSecondHand: true,
        shutterCount: 5500,
        condition: 95
      },
      {
        cameraId: sonyA6400.id,
        price: 3400000,
        shopName: 'Camera Shop A',
        date: new Date('2025-10-05'),
      },
    ],
  });

  // Create Price Entries for Sony ZV-E10
  await prisma.priceEntry.createMany({
    data: [
      {
        cameraId: sonyZVE10.id,
        price: 2800000,
        shopName: 'Online Store C',
        date: new Date('2025-09-10'),
      },
      {
        cameraId: sonyZVE10.id,
        price: 2850000,
        shopName: 'Camera Shop B',
        date: new Date('2025-10-02'),
      },
    ],
  });

  // Create Price Entries for Sigma 18-50mm
  await prisma.priceEntry.createMany({
    data: [
      {
        lensId: sigma1850.id,
        price: 1500000,
        shopName: 'Lens World',
        date: new Date('2025-09-20'),
      },
      {
        lensId: sigma1850.id,
        price: 1550000,
        shopName: 'Camera Shop A',
        date: new Date('2025-10-06'),
      },
    ],
  });

  console.log('Seeding finished.');
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
