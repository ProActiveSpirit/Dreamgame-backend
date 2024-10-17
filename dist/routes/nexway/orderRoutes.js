"use strict";

var express = require("express");
var router = express.Router();
var _require = require("@controllers/nexway/orderController"),
  getOrderHandler = _require.getOrderHandler,
  getOrderDownloadInfoHandler = _require.getOrderDownloadInfoHandler,
  updateDownloadTimeHandler = _require.updateDownloadTimeHandler;
router.get("/:orderId", getOrderHandler);
router.get("/:orderId/download", getOrderDownloadInfoHandler);
router.put("/download", updateDownloadTimeHandler);
module.exports = router;