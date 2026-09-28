const mongoose = require('mongoose');

const businessSettingsSchema = new mongoose.Schema(
  {
    name: { type: String, default: 'THE NAIL ATELIER' },
    tagline: { type: String, default: 'The Art of Beautiful Nails & Timeless Self-Care.' },
    phone: { type: String, default: '' },
    email: { type: String, default: '' },
    address: { type: String, default: '' },
    hours: { type: String, default: 'Mon–Sat: 10:00 AM – 8:00 PM, Sun: 12:00 PM – 6:00 PM' },
    openHour: { type: Number, default: 10 },
    closeHour: { type: Number, default: 20 },
    social: {
      instagram: { type: String, default: '' },
      facebook: { type: String, default: '' },
      tiktok: { type: String, default: '' },
    },
    policies: {
      cancellation: { type: String, default: '' },
      rescheduling: { type: String, default: '' },
      deposit: { type: String, default: '' },
      lateArrival: { type: String, default: '' },
      payment: { type: String, default: '' },
    },
    privacyPolicy: { type: String, default: '' },
    termsAndConditions: { type: String, default: '' },
    cancellationPolicyPage: { type: String, default: '' },
    aiConfig: {
      assistantName: { type: String, default: 'Atelier AI' },
      subtitle: { type: String, default: 'Your Beauty Concierge' },
      welcomeMessage: { type: String, default: 'Hello! ✨ Welcome to The Nail Atelier. How can I help you today?' },
      quickActions: [{ label: String, route: String }],
      fallbackMessage: {
        type: String,
        default: "I'm sorry, I'm having trouble connecting right now. You can still explore our services or contact our team directly.",
      },
      humanHandoffMessage: {
        type: String,
        default: "I'd be happy to connect you with our team so you can get the most accurate answer.",
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('BusinessSettings', businessSettingsSchema);
