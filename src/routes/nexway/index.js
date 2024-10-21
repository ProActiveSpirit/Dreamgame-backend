const express = require("express");

const authRoutes = require("@routes/nexway/authRoutes");
const catalogRoutes = require("@routes/nexway/catalogRoutes");
const orderRoutes = require("@routes/nexway/orderRoutes");
const subscriptionRoutes = require("@routes/nexway/subscriptionRoutes");
const crossSellRoutes = require("@routes/nexway/crossSellRoutes");

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/catalog', catalogRoutes);
router.use('/order', orderRoutes);
router.use('/subscription', subscriptionRoutes);
router.use('/cross-sell',crossSellRoutes);

module.exports = router;
