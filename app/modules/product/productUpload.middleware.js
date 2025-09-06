const multer = require("multer");
const cloudStorage = require("../../config/storage");

const path = require("path");
const storage = multer.diskStorage({
  destination: (req, filename, cb) => {
    cb(null, "public/pictures/product");
  },

  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: process.env.NODE_ENV === "production" ? cloudStorage : storage,
});

const uploadMiddleware = upload.array("file", 5);

module.exports = uploadMiddleware;
