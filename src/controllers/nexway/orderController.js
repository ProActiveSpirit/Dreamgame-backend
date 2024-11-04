const {
  getOrder,
  getOrderDownloadInfo,
  updateDownloadTime
} = require("../../services/nexway/orderManagement");

const hostURL = "https://api.nexway.store"; // or use the staging URL
const secret = process.env.CLIENT_SECRET;

async function getOrderHandler(req, res) {
  try {
    const { orderId } = req.params;
    const order = await getOrder(hostURL, orderId, secret);
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getOrderDownloadInfoHandler(req, res) {
  try {
    const { orderId } = req.params;
    const downloadInfo = await getOrderDownloadInfo(hostURL, orderId, secret);
    res.json(downloadInfo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateDownloadTimeHandler(req, res) {
  try {
    const { partnerOrderNumber, value } = req.body;
    const response = await updateDownloadTime(
      hostURL,
      partnerOrderNumber,
      value,
      secret
    );
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getOrderHandler,
  getOrderDownloadInfoHandler,
  updateDownloadTimeHandler
};
