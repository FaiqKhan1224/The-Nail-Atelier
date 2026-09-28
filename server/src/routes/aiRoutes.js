const express = require('express');
const router = express.Router();
const { protect, adminOnly, optionalAuth } = require('../middleware/auth');
const { aiLimiter } = require('../middleware/rateLimiter');
const ctrl = require('../controllers/aiController');

router.get('/config', ctrl.getConfig);
router.post('/chat', aiLimiter, optionalAuth, ctrl.chat);

router.get('/knowledge', protect, adminOnly, ctrl.adminGetKnowledge);
router.post('/knowledge', protect, adminOnly, ctrl.createKnowledge);
router.put('/knowledge/:id', protect, adminOnly, ctrl.updateKnowledge);
router.delete('/knowledge/:id', protect, adminOnly, ctrl.deleteKnowledge);

module.exports = router;
