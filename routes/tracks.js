const express = require("express");
const {
  getItems,
  getItem,
  createItem,
  deleteItem,
  updateItem,
} = require("../controllers/tracks");
const { validatorCreateItem } = require("../validators/tracks");
const router = express.Router();

//TODO https://localhost/tracks GET,POST,PUT,DELETE

router.post("/", validatorCreateItem, createItem);
router.get("/", getItems);

router.get("/:id", getItem);
router.put("/:id", updateItem);
router.delete("/:id", deleteItem);

module.exports = router;
