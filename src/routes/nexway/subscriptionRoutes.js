const express = require("express");
const router = express.Router();
const {
  getSubscriptionStatusHandler,
  cancelSubscriptionHandler,
  renewSubscriptionHandler
} = require("../../controllers/nexway/subscriptionController");

router.post("/subscription/status", getSubscriptionStatusHandler);
router.put("/subscription/cancel", cancelSubscriptionHandler);
router.put("/subscription/renew", renewSubscriptionHandler);

module.exports = router;
