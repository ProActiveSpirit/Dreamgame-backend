const express = require('express');
const router = express.Router();
const { codeRevokeController } = require('../../controllers/epay/coderevokeController');

router.post('/coderevoke', codeRevokeController);

module.exports = router;