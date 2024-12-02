const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Handle graceful shutdown to close Prisma connection
process.on('SIGINT', async () => {
  console.log('Shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('Shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});

module.exports = prisma;