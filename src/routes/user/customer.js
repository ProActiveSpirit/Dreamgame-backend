const express = require("express");
const router = express.Router();
const {
  getCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} = require("../../controllers/user/customer");

router.post("/getCustomer", getCustomer);
router.post("/createCustomer", createCustomer);
router.post("/updateCustomer", updateCustomer);
router.post("/deleteCustomer", deleteCustomer);

module.exports = router;
