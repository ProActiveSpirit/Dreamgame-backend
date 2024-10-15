const express = require("express");
const router = express.Router();
const {
  getTokenHandler,
  invalidateTokenHandler
} = require("@controllers/nintendo/authController");

router.post("/token", getTokenHandler);
router.post("/invalidate", invalidateTokenHandler);

module.exports = router;
