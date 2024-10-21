const express = require("express");
const router = express.Router();
const {
  getOrderHandler,
  getOrderDownloadInfoHandler,
  updateDownloadTimeHandler
} = require("../../controllers/nexway/orderController");

router.get("/:orderId", getOrderHandler);
router.get("/:orderId/download", getOrderDownloadInfoHandler);
router.put("/download", updateDownloadTimeHandler);

module.exports = router;
