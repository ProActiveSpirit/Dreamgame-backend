"use strict";

var express = require("express");
var router = express.Router();
var _require = require("../../controllers/nexway/subscriptionController"),
  getSubscriptionStatusHandler = _require.getSubscriptionStatusHandler,
  cancelSubscriptionHandler = _require.cancelSubscriptionHandler,
  renewSubscriptionHandler = _require.renewSubscriptionHandler;
router.post("/subscription/status", getSubscriptionStatusHandler);
router.put("/subscription/cancel", cancelSubscriptionHandler);
router.put("/subscription/renew", renewSubscriptionHandler);
module.exports = router;