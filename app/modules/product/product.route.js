const express = require("express");
const { getProducts, createProduct } = require("./product.controller");
const verifyToken = require("../../middlewares/verifyToken");
const validateProduct = require("./product.middleware");
const router = express.Router();

router.get("/", getProducts);
router.post("/", verifyToken, validateProduct, createProduct);

module.exports = router;
