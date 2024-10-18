"use strict";

var express = require('express');
var router = express.Router();
var _require = require('../../controllers/nintendo/fulfillmentController'),
  fulfillmentController = _require.fulfillmentController;
router.post('/fulfillment', fulfillmentController);
module.exports = router;