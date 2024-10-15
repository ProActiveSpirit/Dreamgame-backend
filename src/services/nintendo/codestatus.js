const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkCodeStatus(storeID, controlNumber) {
  try {
    const transactionID = "C12345_T1574995942312"; 
    const codeStatus = "REVOKED"; 
    const redeemedDateAt = "20202001T090000Z"; 
    const revokedDateAt = "20202005T180000Z"; 

    const response = {
      storeID,
      controlNumber,
      status: 0, 
      codeStatus,
      transactionID,
      redeemedDateAt,
      revokedDateAt
    };

    return response;
  } catch (error) {
    console.error('Error checking code status:', error);
    throw error;
  }
}

module.exports = { checkCodeStatus };