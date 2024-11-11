const express = require("express");
const login = require("./login");
const register = require("./register");
const myaccount = require("./myaccount");
const verify = require("./verify");
const ipcheck = require("./ipcheck");
const router = express.Router();

router.use(login);
router.use(register);
router.use(myaccount);
router.use(verify);
router.use(ipcheck);

module.exports = router;
