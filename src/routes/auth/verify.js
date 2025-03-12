const express = require("express");
const router = express.Router();
const { verifyEmail, resendCode } = require("../../controllers/auth/verify");

router.post("/verify-email", verifyEmail);
router.post("/resend-verification", resendCode);

module.exports = router;
