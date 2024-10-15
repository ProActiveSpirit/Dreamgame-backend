"use strict";

var express = require("express");
var router = express.Router();
var _require = require("@controllers/nexway/orderController"),
  getOrderHandler = _require.getOrderHandler,
  getOrderDownloadInfoHandler = _require.getOrderDownloadInfoHandler,
  updateDownloadTimeHandler = _require.updateDownloadTimeHandler;
router.get("/order/:orderId", getOrderHandler);
router.get("/order/:orderId/download", getOrderDownloadInfoHandler);
router.put("/order/download", updateDownloadTimeHandler);
module.exports = router;