"use strict";

var express = require("express");
var router = express.Router();
var _require = require("@controllers/epay/productController"),
  getProductList = _require.getProductList;
router.get("/products", getProductList);
module.exports = router;