const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/auth');
const ctrl = require('../controllers/appointmentController');

router.get('/available-slots', ctrl.getAvailableSlots);
router.get('/mine', protect, ctrl.getMyAppointments);
router.get('/admin/all', protect, adminOnly, ctrl.adminGetAllAppointments);
router.post('/', protect, ctrl.createAppointment);
router.put('/:id/cancel', protect, ctrl.cancelMyAppointment);
router.put('/:id/status', protect, adminOnly, ctrl.adminUpdateAppointmentStatus);

module.exports = router;
