const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function reservation(storeID, transactionID, codeAcquisition) {
  let reservations = [];
  let successCount = 0;
  let skus = [];

  try {
    for (const { sku, qty } of codeAcquisition) {
      const first = await prisma.nintendoData.findFirst({});
      const record = await prisma.nintendoData.findMany({
        where: {
          product_code_txt: {
            has: sku,
          },
          eshop_removed_b: false,
        },
      });

      if (record.length > 0) {
        successCount++;
        reservations.push({ sku, status: 0 });
      } else {
        reservations.push({ sku, status: 1, errorCode: 'E4007' });
      }

      skus.push(sku);
    }

    let overallStatus;
    if (reservations.every(r => r.status === 0)) {
      overallStatus = 0; // Successful completion
      prisma.transaction.create({
        transactionID: transactionID,
        sku: skus,
      })
    } else if (reservations.every(r => r.status === 1)) {
      overallStatus = 1; // Abnormal termination
    } else {
      overallStatus = 2; // Partially successful completion
    }

    const response = {
      storeID,
      transactionID,
      status: overallStatus,
      reservations,
    };

    if (overallStatus !== 0) {
      response.errorCode = 'E4951'; // Set an appropriate error code based on the scenario
    }

    return response;

  } catch (error) {
    console.error('Error processing reservation:', error);
    throw error;
  }
}

module.exports = { reservation };