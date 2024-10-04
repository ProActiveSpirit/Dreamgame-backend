"use strict";

var express = require("express");
var router = express.Router();
var _require = require("../../controllers/nexway/authController"),
  getTokenHandler = _require.getTokenHandler,
  invalidateTokenHandler = _require.invalidateTokenHandler;
router.post("/auth/token", getTokenHandler);
router.post("/auth/invalidate", invalidateTokenHandler);
module.exports = router;