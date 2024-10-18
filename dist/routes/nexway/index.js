"use strict";

var express = require("express");
var authRoutes = require("./authRoutes");
var catalogRoutes = require("./catalogRoutes");
var orderRoutes = require("./orderRoutes");
var subscriptionRoutes = require("./subscriptionRoutes");
var crossSellRoutes = require("./crossSellRoutes");
var router = express.Router();
router.use('/auth', authRoutes);
router.use('/catalog', catalogRoutes);
router.use('/order', orderRoutes);
router.use('/subscription', subscriptionRoutes);
router.use('/cross-sell', crossSellRoutes);
module.exports = router;