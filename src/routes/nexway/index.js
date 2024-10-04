const express = require("express");

const authRoutes = require("./authRoutes");
const catalogRoutes = require("./catalogRoutes");
const orderRoutes = require("./orderRoutes");
const subscriptionRoutes = require("./subscriptionRoutes");
const crossSellRoutes = require("./crossSellRoutes");

const router = express.Router();

router.use(authRoutes);
router.use(catalogRoutes);
router.use(orderRoutes);
router.use(subscriptionRoutes);
router.use(crossSellRoutes);

module.exports = router;
