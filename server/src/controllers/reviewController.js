const Review = require('../models/Review');
const asyncHandler = require('../utils/asyncHandler');

exports.createReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  if (!rating || !comment) return res.status(400).json({ message: 'Rating and comment are required' });
  const review = await Review.create({ customer: req.user._id, rating, comment, approved: false });
  res.status(201).json(review);
});

exports.getApprovedReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({ approved: true }).populate('customer', 'name').sort({ createdAt: -1 });
  res.json(reviews);
});

exports.adminGetAllReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find().populate('customer', 'name email').sort({ createdAt: -1 });
  res.json(reviews);
});

exports.adminUpdateReviewStatus = asyncHandler(async (req, res) => {
  const review = await Review.findByIdAndUpdate(req.params.id, { approved: !!req.body.approved }, { new: true });
  if (!review) return res.status(404).json({ message: 'Review not found' });
  res.json(review);
});

exports.adminDeleteReview = asyncHandler(async (req, res) => {
  const review = await Review.findByIdAndDelete(req.params.id);
  if (!review) return res.status(404).json({ message: 'Review not found' });
  res.json({ message: 'Deleted' });
});
