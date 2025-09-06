const { body, validationResult } = require("express-validator");
const handleValidation = require("../../middlewares/validationHandler");

const validateItem = [
  body("barcode").notEmpty().withMessage("Barcode tidak boleh kosong"),
  body("nama").notEmpty().withMessage("Nama tidak boleh kosong"),
  body("jenis").notEmpty().withMessage("Jenis tidak boleh kosong"),
  body("berat")
    .notEmpty()
    .withMessage("Berat tidak boleh kosong")
    .isFloat({ gt: 0 })
    .withMessage("Berat harus berupa angka dan lebih dari 0"),
  body("satuan").notEmpty().withMessage("Satuan tidak boleh kosong"),
  body("perusahaan").notEmpty().withMessage("Perusahaan tidak boleh kosong"),
  body("harga")
    .notEmpty()
    .withMessage("Harga tidak boleh kosong")
    .isFloat({ gt: 0 })
    .withMessage("Harga harus berupa angka dan lebih dari 0"),

  handleValidation,
];

module.exports = validateItem;
