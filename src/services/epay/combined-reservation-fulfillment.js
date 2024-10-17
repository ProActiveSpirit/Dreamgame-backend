const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function processCombinedReservationFulfillment(storeID, transactionID, codeAcquisition) {
  let fulfillments = [];
  let overallStatus = 0;
  let errorCode = null;

  const existingTransaction = await prisma.transaction.findUnique({
    where: {
      transactionID,
    },
  });
  
  if (existingTransaction) {
    return {
      storeID,
      transactionID,
      status: 1,
      errorCode: 'E4031'
    };
  }

  try {
    for (const { sku, qty } of codeAcquisition) {
      const records = await prisma.EpayData.findMany({
        where: {
          sku: sku
        },
      });
      if (records.length > 0) {
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

    // Save the transaction and fulfillments into the database
    if( overallStatus == 0) {
      const transactionData = await prisma.transaction.create({
        data: {
          transactionID,
          status: overallStatus,
          store: {
            connectOrCreate: {
              where: { storeID },
              create: { storeID }
            }
          },
          fulfillments: {
            create: fulfillments.map(f => ({
              sku: f.sku,
              status: f.status,
              codes: {
                create: f.codes?.map(c => ({
                  controlNumber: c.controlNumber,
                  downloadNumber: c.downloadNumber
                })) || []
              },
              // errorCode: f.errorCode || null
            }))
          }
        }
      });
    }

    return {
      storeID,
      transactionID,
      status: overallStatus,
      errorCode: errorCode || null,
      fulfillments
    };
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