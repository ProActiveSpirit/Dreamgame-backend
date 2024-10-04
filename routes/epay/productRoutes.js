const express = require("express");
const router = express.Router();
const { getProductList } = require("../../controllers/epay/productController");

router.get("/products", getProductList);

module.exports = router;
