const express = require("express");
const router = express.Router();
const { getItems, postItem } = require("./item.controller");
const validateItem = require("./item.middleware");

router.get("/v1/items", getItems);
router.post("/v1/item", validateItem, postItem);

module.exports = router;
