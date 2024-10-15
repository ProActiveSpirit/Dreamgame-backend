const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function revokeCode(storeID, controlNumber) {
  try {

    const result = await prisma.nintendoData.updateMany({
      where: { controlNumber: controlNumber, storeID: storeID },
      data: { status: 'REVOKED' }, 
    });

    if (result.count === 0) {
      throw new Error('Code not found or already revoked');
    }

    const response = {
      storeID,
      controlNumber,
      status: 0, 
      revokeResult: 'REVOKED'
    };

    return response;
  } catch (error) {
    console.error('Error revoking code:', error);
    throw error;
  }
}

module.exports = { revokeCode };