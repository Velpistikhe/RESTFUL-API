const errorHandler = (err, req, res, next) => {
  const isProduction = process.env.NODE_ENV === "production";

  res.status(err.status || 500).json({
    success: false,
    message: !isProduction ? err.message : "Internal Server Error",
    stack: isProduction ? null : err.stack,
  });
};

module.exports = errorHandler;
