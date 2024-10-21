const express = require("express");
const productRoutes = require("@routes/nintendo/productRoutes");
const reservation = require("@routes/nintendo/reservationRoutes");
const fulfillment = require("@routes/nintendo/fulfillmentRoutes");
const codeStatus = require("@routes/nintendo/codestatusRoutes");
const codeRevoke = require("@routes/nintendo/coderevokeRoutes");
const healthcheck = require("@routes/nintendo/healthcheckRoutes");
const combined = require("@routes/nintendo/combined-reservation-fulfillment-Routes");
const router = express.Router();

router.use(productRoutes);
router.use(reservation);
router.use(fulfillment);
router.use(codeStatus);
router.use(codeRevoke);
router.use(healthcheck);
router.use(combined);

module.exports = router;
