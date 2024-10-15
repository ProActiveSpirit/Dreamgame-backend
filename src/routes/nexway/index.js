const express = require("express");

const authRoutes = require("./authRoutes");
const catalogRoutes = require("./catalogRoutes");
const orderRoutes = require("./orderRoutes");
const subscriptionRoutes = require("./subscriptionRoutes");
const crossSellRoutes = require("./crossSellRoutes");

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/catalog', catalogRoutes);
router.use('/order', orderRoutes);
router.use('/subscription', subscriptionRoutes);
router.use('/cross-sell',crossSellRoutes);

module.exports = router;
