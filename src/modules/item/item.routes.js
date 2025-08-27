const express = require("express");
const router = express.Router();
const { getItems } = require("./item.controller");

router.get("/items", getItems);

module.exports = router;
