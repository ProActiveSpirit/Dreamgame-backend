"use strict";

var express = require('express');
var router = express.Router();
var _require = require('@controllers/nintendo/codeRevokeController'),
  codeRevokeController = _require.codeRevokeController;
router.post('/coderevoke', codeRevokeController);
module.exports = router;