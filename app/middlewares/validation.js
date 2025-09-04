const { validationResult } = require("express-validator");

const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  const path = req.path;
  console.log(errors);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message:
        path !== "/"
          ? "Login Gagal"
          : "Registrasi gagal silahkan cek data anda.",
      errors: errors.array().map((err) => ({
        field: err.param,
        message: err.msg,
      })),
    });
  }

  next();
};

module.exports = handleValidation;
