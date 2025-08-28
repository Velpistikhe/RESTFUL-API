const express = require("express");
const router = express.Router();
const { getItems, postItem } = require("./item.controller");

router.get("/items", getItems);
router.post("/item", postItem);

module.exports = router;
