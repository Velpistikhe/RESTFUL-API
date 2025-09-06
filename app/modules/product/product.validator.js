const { body, validationResult } = require("express-validator");
const handleValidation = require("../../middlewares/validationHandler");

const validateProduct = [
  body("nama").notEmpty().withMessage("Nama tidak boleh kosong"),
  body("kondisi").notEmpty().withMessage("Kondisi belum dipilih"),
  body("harga")
    .notEmpty()
    .withMessage("Harga tidak boleh kosong")
    .isFloat({ gt: 0 })
    .withMessage("Harga harus berupa angka dan lebih dari 0"),

  handleValidation,
];

module.exports = validateProduct;
