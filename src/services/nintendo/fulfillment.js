const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function processFulfillment(storeID, transactionID) {

  const transaction = await prisma.transaction.findUnique({
    where: { transactionID },
    include: { fulfillments: true },
  });

  if (!transaction) {
    throw new Error(`Transaction with ID ${transactionID} not found.`);
  }

  const fulfillments = transaction.fulfillments.map(f => {
    if (f.status === 0) {
      // Generate codes for the fulfillment
      const controlNumber = generateControlNumber();
      const downloadNumber = generateDownloadNumber();
      const status = controlNumber != null && downloadNumber != null;
      const codes = Array.from({ length: f.qty }, () => ({
        controlNumber: controlNumber,
        downloadNumber: downloadNumber,
        status: 0,
      }));

      return {
        ...f,
        codes,
        status: 0
      };
    }
    else
      return f;
  });

  try {
    for (const fulfillment of fulfillments) {
      if (fulfillment.codes) {
        await prisma.fulfillment.update({
          where: { id: fulfillment.id },
          data: {
            codes: {
              create: fulfillment.codes.map(c => ({
                controlNumber: c.controlNumber,
                downloadNumber: c.downloadNumber,
                status:0
              })),
            },
            status: fulfillment.status,
          },
        });
      }
    }

    return {
      storeID,
      transactionID,
      status: 0,
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

module.exports = { processFulfillment };