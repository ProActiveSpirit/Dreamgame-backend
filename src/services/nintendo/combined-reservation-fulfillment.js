const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function processCombinedReservationFulfillment(storeID, transactionID, codeAcquisition) {
  let fulfillments = [];
  let overallStatus = 0;
  let errorCode = null;

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
      const reservationSuccess = Math.random() > 0.3; // Simulating reservation success

      if (reservationSuccess) {
        // Fulfillment logic: Generate codes for each SKU
        let codes = [];
        for (let i = 0; i < qty; i++) {
          codes.push({
            controlNumber: generateControlNumber(),
            downloadNumber: generateDownloadNumber()
          });
        }
        fulfillments.push({
          sku,
          codes,
          status: 0
        });
      } else {
        // If reservation fails
        fulfillments.push({
          sku,
          status: 1,
          errorCode: 'E4952'
        });
        overallStatus = 1;
        errorCode = 'E4951';
      }
    }

    // If all SKUs are processed successfully, no error code is needed
    if (overallStatus === 0) {
      return {
        storeID,
        transactionID,
        status: 0,
        fulfillments
      };
    } else {
      return {
        storeID,
        transactionID,
        status: overallStatus,
        errorCode,
        fulfillments
      };
    }
  } catch (error) {
    console.error('Error processing combined reservation and fulfillment:', error);
    throw error;
  }
}

function generateControlNumber(prefix = 'eskf') {
  const randomPart = Math.floor(100000 + Math.random() * 900000); // Random 6-digit number
  const counter = Date.now(); // Use current timestamp for simplicity
  return `${prefix}-${randomPart}-${counter}`;
}

function generateDownloadNumber(length = 15) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let downloadNumber = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    downloadNumber += chars[randomIndex];
  }
  return downloadNumber;
}

module.exports = { processCombinedReservationFulfillment };