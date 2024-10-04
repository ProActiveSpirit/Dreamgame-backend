const express = require("express");
const router = express.Router();
const {
  getOrderHandler,
  getOrderDownloadInfoHandler,
  updateDownloadTimeHandler
} = require("../../controllers/nexway/orderController");

router.get("/order/:orderId", getOrderHandler);
router.get("/order/:orderId/download", getOrderDownloadInfoHandler);
router.put("/order/download", updateDownloadTimeHandler);

module.exports = router;
