const express = require('express');
const { VerificationController } = require('../controllers');
const { auth, guest } = require('../middlewares');

const router = express.Router();


router.put('/email/validate', auth, VerificationController.verify_email);
router.post('/email/send', auth, VerificationController.send_verification_email);
router.put('/password/reset', guest, VerificationController.reset_user_password);
router.post('/password/send', guest, VerificationController.send_password_reset_email);

module.exports = router 