const express = require('express');
const router = express.Router();
const { healthCheckController } = require('../../controllers/epay/healthCheckController');

router.get('/healthcheck', healthCheckController);

module.exports = router;