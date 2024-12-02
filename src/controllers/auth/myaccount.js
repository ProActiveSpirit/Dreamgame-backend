const prisma = require('../../prisma');

async function myaccount(req, res) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
    });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Failed to get user account' });
  }
}

module.exports = { myaccount };