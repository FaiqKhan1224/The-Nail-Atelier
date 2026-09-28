const ContactMessage = require('../models/ContactMessage');
const asyncHandler = require('../utils/asyncHandler');

exports.createMessage = asyncHandler(async (req, res) => {
  const { name, email, phone, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Name, email, and message are required' });
  }
  const msg = await ContactMessage.create({ name, email, phone, message });
  res.status(201).json(msg);
});

exports.adminGetMessages = asyncHandler(async (req, res) => res.json(await ContactMessage.find().sort({ createdAt: -1 })));

exports.adminUpdateMessageStatus = asyncHandler(async (req, res) => {
  const msg = await ContactMessage.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
  if (!msg) return res.status(404).json({ message: 'Not found' });
  res.json(msg);
});

exports.adminDeleteMessage = asyncHandler(async (req, res) => {
  const msg = await ContactMessage.findByIdAndDelete(req.params.id);
  if (!msg) return res.status(404).json({ message: 'Not found' });
  res.json({ message: 'Deleted' });
});
