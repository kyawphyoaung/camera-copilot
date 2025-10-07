// /prisma/clear-all-data.ts
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('Starting to clear all data...');

  // Delete dependent records first to avoid foreign key constraint errors
  console.log('Deleting all PriceEntry records...');
  await prisma.priceEntry.deleteMany({});

  console.log('Deleting all Account records...');
  await prisma.account.deleteMany({});

  console.log('Deleting all Session records...');
  await prisma.session.deleteMany({});

  // Now delete the "parent" records
  console.log('Deleting all Camera records...');
  await prisma.camera.deleteMany({});

  console.log('Deleting all Lens records...');
  await prisma.lens.deleteMany({});

  console.log('Deleting all User records...');
  await prisma.user.deleteMany({});
  
  console.log('Deleting all VerificationToken records...');
  await prisma.verificationToken.deleteMany({});

  console.log('All data has been cleared successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });