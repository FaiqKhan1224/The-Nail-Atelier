const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const asyncHandler = require('../utils/asyncHandler');

const publicUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  phone: user.phone,
});

exports.register = asyncHandler(async (req, res) => {
  const { name, email, password, phone } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email, and password are required' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters' });
  }
  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) return res.status(400).json({ message: 'An account with this email already exists' });

  const user = await User.create({ name, email, password, phone });
  res.status(201).json({ token: generateToken(user._id), user: publicUser(user) });
});

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: (email || '').toLowerCase() });
  if (!user || !(await user.comparePassword(password || ''))) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  res.json({ token: generateToken(user._id), user: publicUser(user) });
});

exports.getMe = asyncHandler(async (req, res) => {
  res.json({ user: publicUser(req.user) });
});

exports.updateMe = asyncHandler(async (req, res) => {
  const { name, phone } = req.body;
  if (name) req.user.name = name;
  if (phone !== undefined) req.user.phone = phone;
  await req.user.save();
  res.json({ user: publicUser(req.user) });
});

exports.changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const user = await User.findById(req.user._id);
  if (!currentPassword || !(await user.comparePassword(currentPassword))) {
    return res.status(400).json({ message: 'Current password is incorrect' });
  }
  if (!newPassword || newPassword.length < 6) {
    return res.status(400).json({ message: 'New password must be at least 6 characters' });
  }
  user.password = newPassword;
  await user.save();
  res.json({ message: 'Password updated' });
});
