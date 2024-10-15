const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function reservation(storeID, transactionID, codeAcquisition) {
  let reservations = [];

  try {
    for (const { sku, qty } of codeAcquisition) {

      const isAvailable = Math.random() > 0.5;

      if (isAvailable) {
        // Simulate a successful reservation
        reservations.push({ sku, status: 0, errorCode: '' });
      } else {
        // Simulate a failed reservation with an error code
        reservations.push({ sku, status: 1, errorCode: 'E4007' });
      }
    }

    return {
      storeID,
      transactionID,
      status: reservations.every(r => r.status === 0) ? 0 : 2,
      reservations,
    };
  } catch (error) {
    console.error('Error processing reservation:', error);
    throw error;
  }
}

module.exports = { reservation };