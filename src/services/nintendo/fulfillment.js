const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function processFulfillment(storeID, transactionID) {
  let fulfillments = [];

  try {
    // Simulate fetching and processing fulfillment data from the database
    // Replace this with actual database queries and logic
    // This is a placeholder logic with random statuses for demonstration
    const skus = ['HACPABCD', 'HACPCDEF']; // Example SKUs

    for (const sku of skus) {
      const fulfillment = {
        sku,
        codes: [
          {
            controlNumber: 'ABCD-A10123-000101',
            downloadNumber: 'ABCDEFGHIJKLM123',
            status: Math.random() > 0.5 ? 0 : 1,
          },
          {
            status: Math.random() > 0.5 ? 0 : 1,
            errorCode: 'E2345',
          }
        ],
      };

      fulfillment.status = fulfillment.codes.every(code => code.status === 0) ? 0 : 2;
      if (fulfillment.status !== 0) {
        fulfillment.errorCode = 'E4951';
      }

      fulfillments.push(fulfillment);
    }

    const overallStatus = fulfillments.every(f => f.status === 0) ? 0 : 2;

    return {
      storeID,
      transactionID,
      status: overallStatus,
      errorCode: overallStatus !== 0 ? 'E4951' : undefined,
      fulfillments,
    };

  } catch (error) {
    console.error('Error processing fulfillment:', error);
    throw error;
  }
}

module.exports = { processFulfillment };