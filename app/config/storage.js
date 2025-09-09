const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinary");

const cloudStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const { category } = req.query;

    return {
      folder: `e-commerce/${category || "default"}`,
      allowed_formats: ["jpg", "jpeg", "png"],
      transformation: [{ width: 800, height: 800, crop: "limit" }],
    };
  },
});

module.exports = cloudStorage;
