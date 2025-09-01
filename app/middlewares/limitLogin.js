const rateLimit = require("express-rate-limit");

const loginLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    message: "Terlalu banyak percobaan login. Silahkan coba lagi nanti.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = loginLimiter;
