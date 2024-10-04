const express = require("express");
const router = express.Router();
const {
  getProductFeedHandler,
  getOperatingSystemsHandler
} = require("../../controllers/nexway/catalogController");

router.get("/catalog/product-feed", getProductFeedHandler);
router.get("/catalog/os-list", getOperatingSystemsHandler);

module.exports = router;
