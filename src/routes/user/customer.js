const express = require("express");
const router = express.Router();
const {
    getCustomer
} = require("../../controllers/user/getCustomer");

router.post("/getCustomer", getCustomer);

module.exports = router;
