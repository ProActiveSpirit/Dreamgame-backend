const express = require("express");
const getAll = require("./getAll");
const verifyUser = require("./verifyUser");
const getCustomer = require("./customer");
const router = express.Router();

router.use(getAll);
router.use(verifyUser);
router.use(getCustomer);

module.exports = router;
