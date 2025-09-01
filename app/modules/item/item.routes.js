const express = require("express");
const router = express.Router();
const { getItems, postItem } = require("./item.controller");
const validateItem = require("./item.middleware");
const verifyToken = require("../../middlewares/verifyToken");

router.get("/", verifyToken, getItems);
router.post("/", verifyToken, validateItem, postItem);

module.exports = router;
