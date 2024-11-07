const express = require("express");
const router = express.Router();
const {
  getUserAll
} = require("../../controllers/user/getAll");

router.post("/getAll", getUserAll);

module.exports = router;
