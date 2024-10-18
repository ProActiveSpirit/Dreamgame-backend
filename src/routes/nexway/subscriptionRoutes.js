const express = require("express");
const router = express.Router();
const {
  getSubscriptionStatusHandler,
  cancelSubscriptionHandler,
  renewSubscriptionHandler
} = require("@controllers/nexway/subscriptionController");

router.post("/status", getSubscriptionStatusHandler);
router.post("/cancel", cancelSubscriptionHandler);
router.post("/renew", renewSubscriptionHandler);

module.exports = router;
