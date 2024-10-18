"use strict";

var express = require('express');
var router = express.Router();
var _require = require('../../controllers/nintendo/reservationController'),
  reservationController = _require.reservationController;
router.post('/reservation', reservationController);
module.exports = router;