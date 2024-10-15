const express = require("express");
const router = express.Router();
const {
  getSubscriptionStatusHandler,
  cancelSubscriptionHandler,
  renewSubscriptionHandler
} = require("@controllers/nexway/subscriptionController");

router.post("/status", getSubscriptionStatusHandler);
router.put("/cancel", cancelSubscriptionHandler);
router.put("/renew", renewSubscriptionHandler);

module.exports = router;
