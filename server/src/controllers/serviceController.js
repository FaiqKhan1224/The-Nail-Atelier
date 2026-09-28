const Service = require('../models/Service');
const asyncHandler = require('../utils/asyncHandler');

exports.getServices = asyncHandler(async (req, res) => {
  const filter = { published: true };
  if (req.query.category) filter.category = req.query.category;
  const services = await Service.find(filter).sort({ createdAt: -1 });
  res.json(services);
});

exports.getServiceById = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id);
  const isAdmin = req.user && req.user.role === 'admin';
  if (!service || (!service.published && !isAdmin)) {
    return res.status(404).json({ message: 'Service not found' });
  }
  res.json(service);
});

exports.adminGetAllServices = asyncHandler(async (req, res) => {
  res.json(await Service.find().sort({ createdAt: -1 }));
});

exports.createService = asyncHandler(async (req, res) => {
  const service = await Service.create(req.body);
  res.status(201).json(service);
});

exports.updateService = asyncHandler(async (req, res) => {
  const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!service) return res.status(404).json({ message: 'Service not found' });
  res.json(service);
});

exports.deleteService = asyncHandler(async (req, res) => {
  const service = await Service.findByIdAndDelete(req.params.id);
  if (!service) return res.status(404).json({ message: 'Service not found' });
  res.json({ message: 'Service deleted' });
});
