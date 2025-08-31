const express = require("express");
const router = express.Router();
const { postUser } = require("./auth.controller");
const validateUser = require("./auth.middleware");

router.post("/", validateUser, postUser);

module.exports = router;
