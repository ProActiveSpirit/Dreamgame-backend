const prisma = require('../../prisma');

async function checkCodeStatus(storeID, controlNumber) {
  try {
    // Fetch the record using the control number and ensure the storeID matches
    const codeRecord = await prisma.code.findUnique({
      where: {
        controlNumber: controlNumber,
      },
      include: {
        fulfillment: {
          include: {
            transaction: true,
          },
        },
      },
    }); 

    if (!codeRecord ) {
      return {
        storeID,
        controlNumber,
        status: 1, // Error status
        errorCode: 'E4951', // Example error code for "not found"
        message: 'The control number does not exist or does not belong to the specified store ID.',
      };
    }

    const transaction = codeRecord.fulfillment.transaction;
    const transactionID = transaction.transactionID;

    // Determine code status based on your business logic or database fields
    let codeStatus;
    if (transaction.status === 'REDEEMED') {
      codeStatus = 'REDEEMED';
    } else if (transaction.status === 'REVOKED') {
      codeStatus = 'REVOKED';
    } else if (transaction.status === 'INACTIVE') {
      codeStatus = 'INACTIVE';
    } else {  
      codeStatus = 'REDEEMABLE';
    }

    const redeemedDateAt = transaction.redeemedAt ? transaction.redeemedAt.toISOString() : null;
    const revokedDateAt = transaction.revokedAt ? transaction.revokedAt.toISOString() : null;

    const response = {
      storeID,
      controlNumber,
      status: 0, // Success status
      codeStatus,
      transactionID,
      redeemedDateAt,
      revokedDateAt,
    };

    return response;
  } catch (error) {
    console.error('Error checking code status:', error);
    return {
      storeID,
      controlNumber,
      status: 1, // Error status
      errorCode: 'E4952', // Example error code for server error
      message: 'An error occurred while checking the code status.',
    };
  }
}

module.exports = { checkCodeStatus };