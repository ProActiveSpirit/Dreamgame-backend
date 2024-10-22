const express = require("express");
const router = express.Router();
const {
  getProductList
} = require("@controllers/nintendo/productController");

router.get("/products", getProductList);

module.exports = router;
