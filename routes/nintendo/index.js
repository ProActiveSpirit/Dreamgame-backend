const express = require("express");
const authRoutes = require("./authRoutes");
const productRoutes = require("./productRoutes");

const router = express.Router();

router.use(authRoutes);
router.use(productRoutes);

module.exports = router;
