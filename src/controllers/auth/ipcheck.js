const prisma = require('../../prisma');

async function Ipcheck(req, res) {
  try {
    const userIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    res.json({ userIp: userIp });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Login failed' });
  }
}

module.exports = { Ipcheck };