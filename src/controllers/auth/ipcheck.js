const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const geoip = require('geoip-lite');

async function Ipcheck(req, res) {
  try {
    // Retrieve the user's IP address
    const userIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    // Ensure the IP is in the correct format for geoip-lite
    if (!userIp || typeof userIp !== 'string' || userIp === '::1') {
      throw new Error('Invalid IP address');
    }

    // Lookup the geolocation information for the IP address
    const geo = geoip.lookup(userIp);
    console.log(geo);

    // Check if geo information is retrieved successfully
    if (!geo) {
      res.json({ userIp, region: "" });

      // throw new Error('Geo information not found for IP');
    }

    // Respond with the IP and region information
    res.json({ userIp, region: `${geo.region} - ${geo.country}` });

  } catch (error) {
    // Log detailed error information
    console.error('IP Check Error:', error.message, error.stack);

    // Respond with a 500 status code and error message
    res.status(400).json({ message: error });
  }
}

module.exports = { Ipcheck };