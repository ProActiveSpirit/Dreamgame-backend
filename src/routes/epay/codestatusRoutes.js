const express = require('express');
const router = express.Router();
const { codeStatusController } = require('../../controllers/epay/codeStatusController');

router.post('/codestatus', codeStatusController);

module.exports = router;