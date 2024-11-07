const express = require("express");
const getAll = require("./getAll");
const verifyUser = require("./verifyUser");
const router = express.Router();

router.use(getAll);
router.use(verifyUser);

module.exports = router;
