const express = require("express");
const login = require("./login");
const register = require("./register");
const myaccount = require("./myaccount");
const verify = require("./verify");
const router = express.Router();

router.use(login);
router.use(register);
router.use(myaccount);
router.use(verify);

module.exports = router;
