const prisma = require('../../prisma');

async function reservation(storeID, transactionID, codeAcquisition) {
  let reservations = [];
  let skus = [];

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
      const record = await prisma.EpayData.findMany({
        where: {
          sku: sku,
          },
      });

      if (record.length > 0) {
        reservations.push({ sku, status: 0,qty:qty  });
      } else {
        reservations.push({ sku, status: 1, errorCode: 'E4007',qty:qty  });
      }

      skus.push(sku);
    }

    let overallStatus;
    if (reservations.every(r => r.status === 0)) {
      overallStatus = 0; // Successful completion
      await prisma.transaction.create({
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
            create: reservations.map(r => ({
              sku: r.sku,
              qty: r.qty,
              status: r.status,
              // errorCode: r.errorCode || null
            }))
          }
        }
      });
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