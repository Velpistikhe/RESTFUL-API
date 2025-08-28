const errorHandler = (err, req, res, next) => {
  const isProduction = process.env.NODE_ENV === "production";

  console.error(err);

  res.status(err.status || 500).json({
    success: false,
    message: !isProduction ? err.message : "Internal Server Error",
    stack: isProduction ? null : err.stack,
  });
};

module.exports = errorHandler;
