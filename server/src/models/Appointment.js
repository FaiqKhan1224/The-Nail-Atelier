const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema(
  {
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
    addOns: [{ name: String, price: Number }],
    date: { type: String, required: true }, // 'YYYY-MM-DD'
    time: { type: String, required: true }, // 'HH:mm'
    totalPrice: { type: Number, required: true },
    notes: { type: String, default: '' },
    status: { type: String, enum: ['pending', 'confirmed', 'completed', 'cancelled'], default: 'pending' },
  },
  { timestamps: true }
);

appointmentSchema.index({ date: 1, time: 1 });

module.exports = mongoose.model('Appointment', appointmentSchema);
