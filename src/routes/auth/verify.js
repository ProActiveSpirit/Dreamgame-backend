const express = require('express');
const router = express.Router();
const { Verify } = require('../../controllers/auth/verify');

router.post('/verify', Verify);

module.exports = router;