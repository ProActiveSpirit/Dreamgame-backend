const express = require("express");
const router = express.Router();
const {
  getProductAll,
} = require("../../controllers/product/getAll");

router.get("/getAll", getProductAll);                                 

module.exports = router;