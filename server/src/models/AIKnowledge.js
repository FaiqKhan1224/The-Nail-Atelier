const mongoose = require('mongoose');

const aiKnowledgeSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
    category: { type: String, default: 'General FAQ' },
    keywords: [String],
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('AIKnowledge', aiKnowledgeSchema);
