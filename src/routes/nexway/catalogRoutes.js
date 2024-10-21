const express = require("express");
const router = express.Router();
const {
  getProductFeedHandler,
  getOperatingSystemsHandler
} = require("@controllers/nexway/catalogController");

router.get("/product-feed", getProductFeedHandler);
router.get("/os-list", getOperatingSystemsHandler);

module.exports = router;
