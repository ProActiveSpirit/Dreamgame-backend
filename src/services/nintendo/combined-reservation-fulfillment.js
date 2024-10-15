const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function processCombinedReservationFulfillment(storeID, transactionID, codeAcquisition) {
  let fulfillments = [];
  let overallStatus = 0;
  let errorCode = null;

  try {
    for (const { sku, qty } of codeAcquisition) {
      // Simulate reservation and fulfillment logic
      // Replace this with actual logic and database interactions

      // Example logic: Check if SKUs can be reserved
      const reservationSuccess = Math.random() > 0.3; // Simulating reservation success

      if (reservationSuccess) {
        // Fulfillment logic: Generate codes for each SKU
        let codes = [];
        for (let i = 0; i < qty; i++) {
          codes.push({
            controlNumber: `${sku}-${Math.floor(Math.random() * 1000000)}`,
            downloadNumber: `ABCDEFGHIJKLM${Math.floor(Math.random() * 1000)}`
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

module.exports = { processCombinedReservationFulfillment };