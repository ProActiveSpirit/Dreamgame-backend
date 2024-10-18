"use strict";

var express = require("express");
var nexwayRoutes = require("../routes/nexway");
var nintendoRoutes = require("../routes/nintendo");
var epayRoutes = require("../routes/epay");
var router = express.Router();

// Use the combined routes from the index.js file
router.use("/nexway", nexwayRoutes);
router.use("/nintendo", nintendoRoutes);
router.use("/epay", epayRoutes);
module.exports = router;