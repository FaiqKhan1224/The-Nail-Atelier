const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/auth');
const ctrl = require('../controllers/adminController');

router.use(protect, adminOnly);
router.get('/stats', ctrl.getDashboardStats);

module.exports = router;
