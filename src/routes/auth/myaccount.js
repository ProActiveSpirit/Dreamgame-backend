const express = require('express');
const router = express.Router();
const { myaccount } = require('../../controllers/auth/myaccount');

router.post('/my-account', myaccount);

module.exports = router;