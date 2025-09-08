const express = require("express");
const {
  getProducts,
  getProduct,
  createProduct,
  deleteProduct,
} = require("./product.controller");
const verifyToken = require("../../middlewares/verifyToken");
const validateProduct = require("./product.validator");
const uploadMiddleware = require("./productUpload.middleware");
const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProduct);
router.post("/", verifyToken, uploadMiddleware, validateProduct, createProduct);
router.delete("/:id", verifyToken, deleteProduct);

module.exports = router;
