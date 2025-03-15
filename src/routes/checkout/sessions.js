const express = require("express");
const router = express.Router();
const { sessions } = require("../../controllers/checkout/sessions");

router.post("/sessions", sessions);

module.exports = router;
