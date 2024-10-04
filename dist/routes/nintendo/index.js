"use strict";

var express = require("express");
var authRoutes = require("./authRoutes");
var productRoutes = require("./productRoutes");
var router = express.Router();
router.use(authRoutes);
router.use(productRoutes);
module.exports = router;