const express = require("express");

const nexwayRoutes = require("../routes/nexway");
const nintendoRoutes = require("../routes/nintendo");
const epayRoutes = require("../routes/epay");

const router = express.Router();

// Use the combined routes from the index.js file
router.use("/nexway", nexwayRoutes);
router.use("/nintendo", nintendoRoutes);
router.use("/epay", epayRoutes);

module.exports = router;