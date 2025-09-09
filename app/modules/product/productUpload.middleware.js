const multer = require("multer");
const cloudStorage = require("../../config/storage");

const upload = multer({
  storage: cloudStorage,
});

const uploadMiddleware = upload.fields([{ name: "file", maxCount: 5 }]);

module.exports = uploadMiddleware;
