const express = require('express');
const router = express.Router();
const { reservationController } = require('../../controllers/nintendo/reservationController');

router.post('/reservation', reservationController);

module.exports = router;