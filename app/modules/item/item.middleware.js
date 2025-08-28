const { body, validationResult } = require("express-validator");

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

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Data tidak lengkap",
        errors: errors.array().map((err) => ({
          field: err.param,
          message: err.msg,
        })),
      });
    }
    next();
  },
];

module.exports = validateItem;
