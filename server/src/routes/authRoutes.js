const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { authLimiter } = require('../middleware/rateLimiter');
const ctrl = require('../controllers/authController');

router.post('/register', authLimiter, ctrl.register);
router.post('/login', authLimiter, ctrl.login);
router.get('/me', protect, ctrl.getMe);
router.put('/me', protect, ctrl.updateMe);
router.put('/change-password', protect, ctrl.changePassword);

module.exports = router;
