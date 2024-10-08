"use strict";

var express = require("express");
var router = express.Router();
var _require = require("../../controllers/nexway/crossSellController"),
  getCrossUpSellHandler = _require.getCrossUpSellHandler;
router.get("/cross-sell/:productId", getCrossUpSellHandler);
module.exports = router;