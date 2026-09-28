const express = require('express');
const router = express.Router();
const { protect, adminOnly, optionalAuth } = require('../middleware/auth');
const ctrl = require('../controllers/serviceController');

router.get('/', ctrl.getServices);
router.get('/admin/all', protect, adminOnly, ctrl.adminGetAllServices);
router.get('/:id', optionalAuth, ctrl.getServiceById);
router.post('/', protect, adminOnly, ctrl.createService);
router.put('/:id', protect, adminOnly, ctrl.updateService);
router.delete('/:id', protect, adminOnly, ctrl.deleteService);

module.exports = router;
