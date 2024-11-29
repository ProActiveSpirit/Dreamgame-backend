const express = require("express");
const salesorder = require("./salesOrder");
const purchaseOrder = require("./purchaseOrder");
const router = express.Router();

router.use(salesorder);
router.use(purchaseOrder);

module.exports = router;
