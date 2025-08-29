const notFound = (req, res) => {
  res
    .status(404)
    .send({ success: false, message: `Route ${req.originalUrl} not found` });
};

module.exports = notFound;
