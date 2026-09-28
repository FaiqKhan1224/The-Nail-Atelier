const Appointment = require('../models/Appointment');
const Service = require('../models/Service');
const BusinessSettings = require('../models/BusinessSettings');
const asyncHandler = require('../utils/asyncHandler');

function generateSlots(openHour, closeHour, durationMinutes) {
  const slots = [];
  let totalMinutes = openHour * 60;
  const endMinutes = closeHour * 60;
  while (totalMinutes + durationMinutes <= endMinutes) {
    const h = Math.floor(totalMinutes / 60);
    const m = totalMinutes % 60;
    slots.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`);
    totalMinutes += 30; // 30-minute grid
  }
  return slots;
}

async function getOrCreateSettings() {
  let settings = await BusinessSettings.findOne();
  if (!settings) settings = await BusinessSettings.create({});
  return settings;
}

exports.getAvailableSlots = asyncHandler(async (req, res) => {
  const { serviceId, date } = req.query;
  if (!serviceId || !date) return res.status(400).json({ message: 'serviceId and date are required' });

  const service = await Service.findById(serviceId);
  if (!service) return res.status(404).json({ message: 'Service not found' });

  const settings = await getOrCreateSettings();
  const allSlots = generateSlots(settings.openHour, settings.closeHour, service.duration);
  const existing = await Appointment.find({ date, status: { $ne: 'cancelled' } });
  const bookedTimes = new Set(existing.map((a) => a.time));
  const available = allSlots.filter((slot) => !bookedTimes.has(slot));

  res.json({ date, slots: available });
});

exports.createAppointment = asyncHandler(async (req, res) => {
  const { serviceId, date, time, addOns = [], notes = '' } = req.body;
  if (!serviceId || !date || !time) {
    return res.status(400).json({ message: 'serviceId, date, and time are required' });
  }

  const service = await Service.findById(serviceId);
  if (!service || !service.published) {
    return res.status(400).json({ message: 'Selected service is not available' });
  }

  const conflict = await Appointment.findOne({ date, time, status: { $ne: 'cancelled' } });
  if (conflict) {
    return res.status(409).json({ message: 'That time slot was just taken. Please choose another.' });
  }

  const addOnsTotal = (addOns || []).reduce((sum, a) => sum + (Number(a.price) || 0), 0);

  const appointment = await Appointment.create({
    customer: req.user._id,
    service: service._id,
    addOns,
    date,
    time,
    notes,
    totalPrice: service.price + addOnsTotal,
    status: 'pending',
  });

  res.status(201).json(appointment);
});

exports.getMyAppointments = asyncHandler(async (req, res) => {
  const appointments = await Appointment.find({ customer: req.user._id })
    .populate('service', 'name price duration image')
    .sort({ date: -1, time: -1 });
  res.json(appointments);
});

exports.cancelMyAppointment = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findOne({ _id: req.params.id, customer: req.user._id });
  if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
  if (appointment.status === 'completed') {
    return res.status(400).json({ message: 'Completed appointments cannot be cancelled' });
  }
  appointment.status = 'cancelled';
  await appointment.save();
  res.json(appointment);
});

exports.adminGetAllAppointments = asyncHandler(async (req, res) => {
  const appointments = await Appointment.find()
    .populate('customer', 'name email phone')
    .populate('service', 'name price duration')
    .sort({ date: -1, time: -1 });
  res.json(appointments);
});

exports.adminUpdateAppointmentStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  if (!['pending', 'confirmed', 'completed', 'cancelled'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }
  const appointment = await Appointment.findByIdAndUpdate(req.params.id, { status }, { new: true });
  if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
  res.json(appointment);
});
