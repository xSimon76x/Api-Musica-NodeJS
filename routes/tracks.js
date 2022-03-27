const express = require("express");
const {
  getItems,
  getItem,
  createItem,
  deleteItem,
  updateItem,
} = require("../controllers/tracks");
const {
  validatorCreateItem,
  validatorGetItem,
} = require("../validators/tracks");
const customHeader = require("../middleware/customHeader");
const router = express.Router();

//TODO https://localhost/tracks GET,POST,PUT,DELETE

router.post("/", validatorCreateItem, createItem);
router.get("/", getItems);

router.get("/:id", validatorGetItem, getItem);
router.put("/:id", validatorGetItem, validatorCreateItem, updateItem);
router.delete("/:id", validatorGetItem, deleteItem);

module.exports = router;
