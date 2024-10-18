"use strict";

var express = require('express');
var router = express.Router();
var _require = require('../../controllers/nintendo/codeStatusController'),
  codeStatusController = _require.codeStatusController;
router.post('/codestatus', codeStatusController);
module.exports = router;