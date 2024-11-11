const express = require('express');
const router = express.Router();
const { Ipcheck } = require('../../controllers/auth/ipcheck');

router.post('/ipcheck', Ipcheck);

module.exports = router;