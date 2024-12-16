const express = require("express");
const router = express.Router();
const {
  getCustomer,
  createCustomer,
} = require("../../controllers/user/customer");

router.post("/getCustomer", getCustomer);
router.post("/createCustomer", createCustomer);

module.exports = router;
