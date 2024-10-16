const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function processFulfillment(storeID, transactionID) {
  let fulfillments = [];

  try {
    const record = await prisma.transaction.findMany({});
    console.log("allRecord" , record);
    // const record = await prisma.transaction.findUnique({
    //   where: {
    //     transactionID: transactionID
    //   },
    // });
    
    console.log("fulfillment record" , record);
    const skus = record.sku // Example SKUs

    for (const sku of skus) {
      const controlNumber = generateControlNumber()
      const downloadNumber = generateDownloadNumber()
      const codes = [
        {
          controlNumber: controlNumber,
          downloadNumber: downloadNumber,
          status: 0,
        },
        // {
        //   status: Math.random() > 0.5 ? 0 : 1,
        //   errorCode: 'E2345',
        // }
      ];

      prisma.skuNumber.create({
        storeID,
        sku:sku,
        controlNumber:controlNumber,
        downloadNumber:downloadNumber
      })

      const skuStatus = codes.every(code => code.status === 0) ? 0 : 2;
      let errorCode;
      if (skuStatus !== 0) {
        errorCode = 'E4951';  // Set SKU level error code if needed
      }

      fulfillments.push({
        sku,
        codes: codes.filter(code => code.status === 0 || code.errorCode), // Include only valid code entries
        status: skuStatus,
        errorCode: errorCode
      });
    }

    const overallStatus = fulfillments.every(f => f.status === 0) ? 0 : 2;

    const response = {
      storeID,
      transactionID,
      status: overallStatus,
      fulfillments: fulfillments.filter(f => f.status !== 0), // Include only non-zero status fulfillments
    };

    if (overallStatus !== 0) {
      response.errorCode = 'E4951'; // Set overall error code if not all are successful
    }

    return response;

  } catch (error) {
    console.error('Error processing fulfillment:', error);
    throw error;
  }
}

function generateControlNumber(prefix = 'ABCD') {
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

module.exports = { processFulfillment };