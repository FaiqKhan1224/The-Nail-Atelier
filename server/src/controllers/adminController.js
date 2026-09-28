const Appointment = require('../models/Appointment');
const User = require('../models/User');
const asyncHandler = require('../utils/asyncHandler');

exports.getDashboardStats = asyncHandler(async (req, res) => {
  const today = new Date().toISOString().slice(0, 10);

  const [todayCount, pendingCount, confirmedCount, totalCustomers, revenueAppointments] = await Promise.all([
    Appointment.countDocuments({ date: today, status: { $ne: 'cancelled' } }),
    Appointment.countDocuments({ status: 'pending' }),
    Appointment.countDocuments({ status: 'confirmed' }),
    User.countDocuments({ role: 'customer' }),
    Appointment.find({ status: { $in: ['confirmed', 'completed'] } }).populate('service', 'name'),
  ]);

  const revenue = revenueAppointments.reduce((sum, a) => sum + (a.totalPrice || 0), 0);

  const popularMap = {};
  revenueAppointments.forEach((a) => {
    const name = a.service?.name || 'Unknown';
    popularMap[name] = (popularMap[name] || 0) + 1;
  });
  const popularServices = Object.entries(popularMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, count]) => ({ name, count }));

  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    const dayAppointments = revenueAppointments.filter((a) => a.date === key);
    days.push({
      date: key.slice(5),
      appointments: dayAppointments.length,
      revenue: dayAppointments.reduce((s, a) => s + (a.totalPrice || 0), 0),
    });
  }

  res.json({
    todayAppointments: todayCount,
    pendingBookings: pendingCount,
    confirmedBookings: confirmedCount,
    totalCustomers,
    revenue,
    popularServices,
    last7Days: days,
  });
});
