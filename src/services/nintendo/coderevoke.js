const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function revokeCode(storeID, controlNumber) {
  try {
    let status = 0 ;
    let revokeResult = 'REVOKED';
    const result = await prisma.code.findMany({
      where: { controlNumber: controlNumber}
    });

    if (result.count === 0) {
      status = 1;
      revokeResult = 'IRREVOCABLE';
    }
    
    const response = {
      storeID,
      controlNumber,
      status: status, 
      revokeResult: revokeResult
    };

    return response;
  } catch (error) {
    console.error('Error revoking code:', error);
    throw error;
  }
}

module.exports = { revokeCode };