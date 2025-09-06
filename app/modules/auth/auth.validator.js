const { body } = require("express-validator");
const handleAuthValidation = require("./auth.middleware");

const validateUser = [
  body("username").notEmpty().withMessage("Username tidak boleh kosong"),
  body("nama").notEmpty().withMessage("Nama tidak boleh kosong"),
  body("password")
    .notEmpty()
    .withMessage("Password tidak boleh kosong")
    .isLength({ min: 8 })
    .withMessage("Password minimal 8 karakter"),

  handleAuthValidation,
];

const validateLogin = [
  body("username").notEmpty().withMessage("Username tidak boleh kosong"),
  body("password")
    .notEmpty()
    .withMessage("Password tidak boleh kosong")
    .isLength({ min: 8 })
    .withMessage("Password minimal 8 karakter"),

  handleAuthValidation,
];

module.exports = { validateUser, validateLogin };
