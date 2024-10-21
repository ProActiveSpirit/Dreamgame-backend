const express = require('express');
const router = express.Router();
const { codeStatusController } = require('../../controllers/epaycodeStatusController');

router.post('/codestatus', codeStatusController);

module.exports = router;