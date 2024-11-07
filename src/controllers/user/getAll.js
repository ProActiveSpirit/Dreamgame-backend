const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getUserAll(req, res) {
  try {
    // Modify the query to exclude users with the role of "admin"
    const users = await prisma.user.findMany({
      where: {
        role: {
          not: 'Admin',
        },
      },
    });
    console.log("users", users);
    res.json({ users });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Get ALL OF USERS Failed' });
  }
}

module.exports = { getUserAll };