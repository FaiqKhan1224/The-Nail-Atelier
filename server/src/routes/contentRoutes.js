const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/auth');
const ctrl = require('../controllers/contentController');

// Gallery
router.get('/gallery', ctrl.getGallery);
router.post('/gallery', protect, adminOnly, ctrl.createGalleryItem);
router.put('/gallery/:id', protect, adminOnly, ctrl.updateGalleryItem);
router.delete('/gallery/:id', protect, adminOnly, ctrl.deleteGalleryItem);

// Offers
router.get('/offers', ctrl.getActiveOffers);
router.get('/offers/admin/all', protect, adminOnly, ctrl.adminGetAllOffers);
router.post('/offers', protect, adminOnly, ctrl.createOffer);
router.put('/offers/:id', protect, adminOnly, ctrl.updateOffer);
router.delete('/offers/:id', protect, adminOnly, ctrl.deleteOffer);

// Bridal Packages
router.get('/packages', ctrl.getPackages);
router.get('/packages/admin/all', protect, adminOnly, ctrl.adminGetAllPackages);
router.post('/packages', protect, adminOnly, ctrl.createPackage);
router.put('/packages/:id', protect, adminOnly, ctrl.updatePackage);
router.delete('/packages/:id', protect, adminOnly, ctrl.deletePackage);

module.exports = router;
