const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const geoip = require('geoip-lite');

async function Ipcheck(req, res) {
  try {
    // Retrieve the user's IP address
    const userIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    // Lookup the geolocation information for the IP address
    const geo = geoip.lookup(userIp);

    // Respond with the IP and region information
    res.json({ userIp, region: geo ? `${geo.region} - ${geo.country}` : 'Unknown' });
  } catch (error) {
    console.error('IP Check Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

module.exports = { Ipcheck };