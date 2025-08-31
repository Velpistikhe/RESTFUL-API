const express = require("express");
const router = express.Router();
const { register, login, logout, profile } = require("./auth.controller");
const { validateUser, validateLogin } = require("./auth.validator");
const verifyToken = require("../../middlewares/verifyToken");

router.post("/", validateUser, register);
router.post("/login", validateLogin, login);
router.post("/logout", logout);
router.post("/profile", verifyToken, profile);

module.exports = router;
