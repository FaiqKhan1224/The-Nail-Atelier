const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/auth');
const ctrl = require('../controllers/settingsController');

router.get('/', ctrl.getSettings);
router.put('/', protect, adminOnly, ctrl.updateSettings);

module.exports = router;
