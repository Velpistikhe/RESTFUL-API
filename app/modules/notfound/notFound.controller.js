const notFound = (req, res) => {
  res.status(404).send({ success: false, message: `Request not found` });
};

module.exports = notFound;
