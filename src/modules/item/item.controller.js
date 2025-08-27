const getItems = async (req, res, next) => {
  try {
    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
};

module.exports = { getItems };
