"use strict";

var express = require("express");
var router = express.Router();
var _require = require("../../controllers/nintendo/authController"),
  getTokenHandler = _require.getTokenHandler,
  invalidateTokenHandler = _require.invalidateTokenHandler;
router.post("/token", getTokenHandler);
router.post("/invalidate", invalidateTokenHandler);
module.exports = router;