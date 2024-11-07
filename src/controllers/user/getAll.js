const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getUserAll(req, res) {
  try {
    const users = await prisma.user.findMany({});
    const usersWithoutAdmin = users.slice(1);

    res.json({ users: usersWithoutAdmin });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Get ALL of USERS failed' });
  }
}

module.exports = { getUserAll };