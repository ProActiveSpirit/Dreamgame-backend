const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const geoip = require('geoip');

async function Ipcheck(req, res) {
  try {
    // console.log("req.ip" , req.ip);
    const userIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const geo = geoip.lookup(userIp);
    res.json({ userIp, region: geo ? `${geo.region} - ${geo.country}` : 'Unknown' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error });
  }
}

module.exports = { Ipcheck };