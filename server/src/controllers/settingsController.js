const BusinessSettings = require('../models/BusinessSettings');
const asyncHandler = require('../utils/asyncHandler');

async function getOrCreateSettings() {
  let settings = await BusinessSettings.findOne();
  if (!settings) settings = await BusinessSettings.create({});
  return settings;
}

exports.getSettings = asyncHandler(async (req, res) => {
  res.json(await getOrCreateSettings());
});

exports.updateSettings = asyncHandler(async (req, res) => {
  const settings = await getOrCreateSettings();
  Object.assign(settings, req.body);
  await settings.save();
  res.json(settings);
});
