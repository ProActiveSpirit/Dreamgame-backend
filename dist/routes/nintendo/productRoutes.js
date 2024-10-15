"use strict";

var express = require("express");
var router = express.Router();
var _require = require("@controllers/nintendo/productController"),
  getProductList = _require.getProductList;
router.get("/products", getProductList);
module.exports = router;