const express = require("express");
const router = express.Router();
const { register } = require("./auth.controller");
const validateUser = require("./auth.middleware");

router.post("/", validateUser, register);

module.exports = router;
