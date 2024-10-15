const express = require("express");
const authRoutes = require("./authRoutes");
const productRoutes = require("./productRoutes");
const reservation = require("./reservationRoutes");
const fulfillment = require("./fulfillmentRoutes");
const codeStatus = require("./codestatusRoutes");
const codeRevoke = require("./coderevokeRoutes");
const healthcheck = require("./healthcheckRoutes");
const combined = require("./combined-reservation-fulfillment-Routes");
const router = express.Router();

router.use("/auth",authRoutes);
router.use(productRoutes);
router.use(reservation);
router.use(fulfillment);
router.use(codeStatus);
router.use(codeRevoke);
router.use(healthcheck);
router.use(combined);

module.exports = router;
