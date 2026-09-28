const GalleryItem = require('../models/GalleryItem');
const Offer = require('../models/Offer');
const Package = require('../models/Package');
const asyncHandler = require('../utils/asyncHandler');

// ---- Gallery ----
exports.getGallery = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.query.category) filter.category = req.query.category;
  res.json(await GalleryItem.find(filter).sort({ createdAt: -1 }));
});
exports.createGalleryItem = asyncHandler(async (req, res) => res.status(201).json(await GalleryItem.create(req.body)));
exports.updateGalleryItem = asyncHandler(async (req, res) => {
  const item = await GalleryItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!item) return res.status(404).json({ message: 'Gallery item not found' });
  res.json(item);
});
exports.deleteGalleryItem = asyncHandler(async (req, res) => {
  const item = await GalleryItem.findByIdAndDelete(req.params.id);
  if (!item) return res.status(404).json({ message: 'Gallery item not found' });
  res.json({ message: 'Deleted' });
});

// ---- Offers ----
exports.getActiveOffers = asyncHandler(async (req, res) => {
  const now = new Date();
  const offers = await Offer.find({ active: true, startDate: { $lte: now }, endDate: { $gte: now } }).sort({
    createdAt: -1,
  });
  res.json(offers);
});
exports.adminGetAllOffers = asyncHandler(async (req, res) => res.json(await Offer.find().sort({ createdAt: -1 })));
exports.createOffer = asyncHandler(async (req, res) => res.status(201).json(await Offer.create(req.body)));
exports.updateOffer = asyncHandler(async (req, res) => {
  const offer = await Offer.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!offer) return res.status(404).json({ message: 'Offer not found' });
  res.json(offer);
});
exports.deleteOffer = asyncHandler(async (req, res) => {
  const offer = await Offer.findByIdAndDelete(req.params.id);
  if (!offer) return res.status(404).json({ message: 'Offer not found' });
  res.json({ message: 'Deleted' });
});

// ---- Packages ----
exports.getPackages = asyncHandler(async (req, res) => res.json(await Package.find({ published: true }).sort({ createdAt: -1 })));
exports.adminGetAllPackages = asyncHandler(async (req, res) => res.json(await Package.find().sort({ createdAt: -1 })));
exports.createPackage = asyncHandler(async (req, res) => res.status(201).json(await Package.create(req.body)));
exports.updatePackage = asyncHandler(async (req, res) => {
  const pkg = await Package.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!pkg) return res.status(404).json({ message: 'Package not found' });
  res.json(pkg);
});
exports.deletePackage = asyncHandler(async (req, res) => {
  const pkg = await Package.findByIdAndDelete(req.params.id);
  if (!pkg) return res.status(404).json({ message: 'Package not found' });
  res.json({ message: 'Deleted' });
});
