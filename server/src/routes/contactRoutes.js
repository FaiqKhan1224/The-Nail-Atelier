const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/auth');
const ctrl = require('../controllers/contactController');

router.post('/', ctrl.createMessage);
router.get('/admin/all', protect, adminOnly, ctrl.adminGetMessages);
router.put('/:id/status', protect, adminOnly, ctrl.adminUpdateMessageStatus);
router.delete('/:id', protect, adminOnly, ctrl.adminDeleteMessage);

module.exports = router;
