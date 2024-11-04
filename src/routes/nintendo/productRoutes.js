const express = require("express");
const router = express.Router();
const {
  getProductList,
  getProductSync
} = require("../../controllers/nintendo/productController");

router.get("/products", getProductList);
router.get("/productsync" , getProductSync);

module.exports = router;
