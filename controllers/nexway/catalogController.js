const {
  getProductFeed,
  getOperatingSystems
} = require("../../services/nexway/catalogManagement");

const hostURL = "https://api.nexway.store";
const feedUrl = "http://webservices.nexway.com";
const secret = process.env.CLIENT_SECRET;

async function getProductFeedHandler(req, res) {
  try {
    const { provider, config } = req.query;
    const feed = await getProductFeed(feedUrl, provider, config, secret);
    res.json(feed);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getOperatingSystemsHandler(req, res) {
  try {
    const osList = await getOperatingSystems(hostURL, secret);
    res.json(osList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { getProductFeedHandler, getOperatingSystemsHandler };
