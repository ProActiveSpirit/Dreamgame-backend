const express = require('express');
const router = express.Router();
const { setup2FA, verify2FA, enable2FA, disable2FA ,get2FAStatus} = require('../../controllers/auth/mfa')

router.post('/setup-2FA', setup2FA)
router.post('/verify-2FA', verify2FA)
router.post('/enable-2FA', enable2FA)
router.post('/disable-2FA', disable2FA)
router.post('/get-2fa-status', get2FAStatus)

module.exports = router
