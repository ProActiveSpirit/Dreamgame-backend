const express = require('express');
const router = express.Router();
const { codeStatusController } = require('../../controllers/nintendo/codestatusController');

router.post('/codestatus', codeStatusController);

module.exports = router;