const {
  getSubscriptionStatus,
  cancelSubscription,
  renewSubscription
} = require("../../services/nexway/subscriptionManagement");

const hostURL = "https://api.nexway.store";
const secret = process.env.CLIENT_SECRET;

async function getSubscriptionStatusHandler(req, res) {
  try {
    const { partnerOrderNumber, subscriptionId } = req.body;
    console.log("req.body", req.body);
    const status = await getSubscriptionStatus(
      hostURL,
      partnerOrderNumber,
      subscriptionId,
      secret
    );
    res.json(status);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function cancelSubscriptionHandler(req, res) {
  try {
    const { partnerOrderNumber, subscriptionId } = req.body;
    const response = await cancelSubscription(
      hostURL,
      partnerOrderNumber,
      subscriptionId,
      secret
    );
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function renewSubscriptionHandler(req, res) {
  try {
    const { partnerOrderNumber, subscriptionId } = req.body;
    const response = await renewSubscription(
      hostURL,
      partnerOrderNumber,
      subscriptionId,
      secret
    );
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getSubscriptionStatusHandler,
  cancelSubscriptionHandler,
  renewSubscriptionHandler
};
