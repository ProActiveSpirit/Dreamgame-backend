const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function Ipcheck(req, res) {
  try {
    // console.log("req.ip" , req.ip);
    const userIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log("userIp" , userIp)
    res.json({ userIp: userIp });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Login failed' });
  }
}

module.exports = { Ipcheck };