const { body, validationResult } = require("express-validator");

const validateProduct = [
  body("nama").notEmpty().withMessage("Nama tidak boleh kosong"),
  body("kondisi").notEmpty().withMessage("Kondisi belum dipilih"),
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

module.exports = validateProduct;
