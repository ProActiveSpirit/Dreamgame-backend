const express = require('express');
const router = express.Router();
const { codeRevokeController } = require('@controllers/nintendo/codeRevokeController');

router.post('/coderevoke', codeRevokeController);

module.exports = router;