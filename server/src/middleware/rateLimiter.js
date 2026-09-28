const rateLimit = require('express-rate-limit');

exports.aiLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 30,
  message: { message: 'Too many messages — please slow down and try again shortly.' },
  standardHeaders: true,
  legacyHeaders: false,
});

exports.authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { message: 'Too many attempts — please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});
