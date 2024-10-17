const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function reservation(storeID, transactionID, codeAcquisition) {
  let reservations = [];
  let skus = [];

  try {
    for (const { sku, qty } of codeAcquisition) {
      const record = await prisma.nintendoData.findMany({
        where: {
          product_code_txt: {
            has: sku,
          },
          eshop_removed_b: false,
        },
      });

      if (record.length > 0) {
        reservations.push({ sku, status: 0 });
      } else {
        reservations.push({ sku, status: 1, errorCode: 'E4007' });
      }

      skus.push(sku);
    }

    let overallStatus;
    if (reservations.every(r => r.status === 0)) {
      overallStatus = 0; // Successful completion
      await prisma.transaction.create({
        data: {
          storeID: storeID,
          transactionID: transactionID,
          sku: skus,
          // status: 'REDEEMABLE',  // Example status
          // redeemedDateAt: null,  // Example redeemed date
          // revokedDateAt: null,  // Example revoked date (null if not revoked)
        }
      });
      const transactionss = await prisma.transaction.findMany({});
      console.log("transactionss" , transactionss);
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