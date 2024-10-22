const express = require('express');
const router = express.Router();
const { codeRevokeController } = require('@controllers/nintendo/coderevokeController');

router.post('/coderevoke', codeRevokeController);

module.exports = router;