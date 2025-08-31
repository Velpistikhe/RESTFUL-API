const { body, validationResult } = require("express-validator");

const validateUser = [
  body("username").notEmpty().withMessage("Username tidak boleh kosong"),
  body("nama").notEmpty().withMessage("Nama tidak boleh kosong"),
  body("role")
    .notEmpty()
    .withMessage("Role tidak boleh kosong")
    .isIn([0, 1])
    .withMessage("Role tidak valid"),
  body("password")
    .notEmpty()
    .withMessage("Password tidak boleh kosong")
    .isLength({ min: 6 })
    .withMessage("Password minimal 8 karakter"),

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

module.exports = validateUser;
