const express = require("express");
const router = express.Router();
const {
  getTokenHandler,
  invalidateTokenHandler
} = require("../../controllers/nexway/authController");

router.post("/auth/token", getTokenHandler);
router.post("/auth/invalidate", invalidateTokenHandler);

module.exports = router;
