const mongoose = require('mongoose');

const addOnSchema = new mongoose.Schema({ name: String, price: Number }, { _id: false });

const serviceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    price: { type: Number, required: true },
    duration: { type: Number, required: true },
    image: { type: String, default: '' },
    addOns: [addOnSchema],
    benefits: [String],
    aftercare: [String],
    featured: { type: Boolean, default: false },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Service', serviceSchema);
