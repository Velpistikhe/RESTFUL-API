const express = require("express");
const router = express.Router();
const { register, login, logout, profile } = require("./auth.controller");
const { validateUser, validateLogin } = require("./auth.validator");
const verifyToken = require("../../middlewares/verifyToken");
const loginLimiter = require("../../middlewares/limitLogin");

router.post("/", validateUser, register);
router.post("/login", loginLimiter, validateLogin, login);
router.post("/logout", logout);
router.get("/profile", verifyToken, profile);

module.exports = router;
