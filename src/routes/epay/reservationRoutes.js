const express = require('express');
const router = express.Router();
const { reservationController } = require('@controllers/epay/reservationController');

router.post('/reservation', reservationController);

module.exports = router;