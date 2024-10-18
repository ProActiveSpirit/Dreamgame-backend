const express = require('express');
const router = express.Router();
const { fulfillmentController } = require('../../controllers/epay/fulfillmentController');

router.post('/fulfillment', fulfillmentController);

module.exports = router;