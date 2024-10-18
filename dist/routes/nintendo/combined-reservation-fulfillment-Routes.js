"use strict";

var express = require('express');
var router = express.Router();
var _require = require('@controllers/nintendo/combinedReservationFulfillmentController'),
  combinedReservationFulfillmentController = _require.combinedReservationFulfillmentController;
router.post('/combined-reservation-fulfillment', combinedReservationFulfillmentController);
module.exports = router;