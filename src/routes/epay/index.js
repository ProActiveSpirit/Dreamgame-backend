const express = require("express");
const productRoutes = require("@routes/epay/productRoutes");
const reservation = require("@routes/epay/reservationRoutes");
const fulfillment = require("@routes/epay/fulfillmentRoutes");
const codeStatus = require("@routes/epay/codestatusRoutes");
const codeRevoke = require("@routes/epay/coderevokeRoutes");
const healthcheck = require("@routes/epay/healthcheckRoutes");
const combined = require("@routes/epay/combined-reservation-fulfillment-Routes");
const router = express.Router();

router.use(productRoutes);
router.use(reservation);
router.use(fulfillment);
router.use(codeStatus);
router.use(codeRevoke);
router.use(healthcheck);
router.use(combined);

module.exports = router;
