"use strict";

var express = require("express");
var productRoutes = require("./productRoutes");
var router = express.Router();
router.use(productRoutes);
module.exports = router;