const prisma = require('../../prisma');

async function getCustomer(req, res) {
  try {
    // Modify the query to exclude users with the role of "admin"
    const customer = await prisma.customer.findMany({});
    res.json({ customer });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Get ALL OF CUSTOMERS Failed' });
  }
}

module.exports = { getCustomer };