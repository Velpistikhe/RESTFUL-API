const express = require("express");
const router = express.Router();
const { getItems, postItem } = require("./item.controller");
const validateItem = require("./item.middleware");

router.get("/", getItems);
router.post("/", validateItem, postItem);

module.exports = router;
