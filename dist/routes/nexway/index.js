"use strict";

var express = require("express");
var authRoutes = require("./authRoutes");
var catalogRoutes = require("./catalogRoutes");
var orderRoutes = require("./orderRoutes");
var subscriptionRoutes = require("./subscriptionRoutes");
var crossSellRoutes = require("./crossSellRoutes");
var router = express.Router();
router.use(authRoutes);
router.use(catalogRoutes);
router.use(orderRoutes);
router.use(subscriptionRoutes);
router.use(crossSellRoutes);
module.exports = router;