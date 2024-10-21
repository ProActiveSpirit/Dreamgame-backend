const express = require('express');
const router = express.Router();
const { fulfillmentController } = require('@controllers/nintendo/fulfillmentController');

router.post('/fulfillment', fulfillmentController);

module.exports = router;