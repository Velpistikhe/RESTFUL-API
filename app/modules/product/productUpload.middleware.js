const multer = require("multer");
const storage = require("../../config/storage");

const upload = multer({ storage });

const uploadMiddleware = upload.array("file", 5);

module.exports = uploadMiddleware;
