"use strict";

var express = require('express');
var router = express.Router();
var _require = require('@controllers/nintendo/healthCheckController'),
  healthCheckController = _require.healthCheckController;
router.get('/healthcheck', healthCheckController);
module.exports = router;