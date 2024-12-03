const express = require("express");
const listProduct = require("./getAll");
const router = express.Router();

router.use(listProduct);

module.exports = router;
