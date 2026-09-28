const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    includes: [String],
    image: { type: String, default: '' },
    popular: { type: Boolean, default: false },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Package', packageSchema);
