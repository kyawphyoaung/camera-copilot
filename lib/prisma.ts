// /lib/prisma.ts
import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';

const prismaClientSingleton = () => {
  // Instantiate PrismaClient and extend it with Accelerate
  return new PrismaClient().$extends(withAccelerate());
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

// Ensure the prisma instance is created only once in development
const prisma = globalThis.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma;
}
