const express = require('express');
const router = express.Router();
const { combinedReservationFulfillmentController } = require('@controllers/epay/combinedReservationFulfillmentController');

router.post('/combined-reservation-fulfillment', combinedReservationFulfillmentController);

module.exports = router;