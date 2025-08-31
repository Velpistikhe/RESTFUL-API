const express = require("express");
const router = express.Router();
const { register, login, logout } = require("./auth.controller");
const { validateUser, validateLogin } = require("./auth.validator");

router.post("/", validateUser, register);
router.post("/login", validateLogin, login);
router.post("/logout", logout);

module.exports = router;
