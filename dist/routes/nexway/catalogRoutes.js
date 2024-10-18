"use strict";

var express = require("express");
var router = express.Router();
var _require = require("@controllers/nexway/catalogController"),
  getProductFeedHandler = _require.getProductFeedHandler,
  getOperatingSystemsHandler = _require.getOperatingSystemsHandler;
router.get("/product-feed", getProductFeedHandler);
router.get("/os-list", getOperatingSystemsHandler);
module.exports = router;