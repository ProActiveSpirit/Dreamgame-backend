const prisma = require('../../prisma');

async function getProductAll(req, res) {
  try {
    // Modify the query to exclude users with the role of "admin"
    const product = await prisma.product.findMany({});
    res.json({ product });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Get ALL OF PRODUCT Failed' });
  }
}

module.exports = { getProductAll };