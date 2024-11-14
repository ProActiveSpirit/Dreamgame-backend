const express = require("express");
const router = express.Router();
const { getProductList } = require("../../controllers/nexway/productController");

router.get("/products", getProductList);

module.exports = router;
