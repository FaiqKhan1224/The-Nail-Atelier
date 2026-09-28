const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/auth');
const ctrl = require('../controllers/reviewController');

router.get('/', ctrl.getApprovedReviews);
router.get('/admin/all', protect, adminOnly, ctrl.adminGetAllReviews);
router.post('/', protect, ctrl.createReview);
router.put('/:id/status', protect, adminOnly, ctrl.adminUpdateReviewStatus);
router.delete('/:id', protect, adminOnly, ctrl.adminDeleteReview);

module.exports = router;
