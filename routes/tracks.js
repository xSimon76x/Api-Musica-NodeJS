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
const authMiddleware = require("../middleware/session");
const checkRol = require("../middleware/rol");
const router = express.Router();

//TODO https://localhost/tracks GET,POST,PUT,DELETE

router.post(
  "/",
  authMiddleware,
  checkRol(["admin"]),
  validatorCreateItem,
  createItem
);
router.get("/", authMiddleware, getItems);

router.get("/:id", authMiddleware, validatorGetItem, getItem);

router.put(
  "/:id",
  authMiddleware,
  validatorGetItem,
  validatorCreateItem,
  updateItem
);
router.delete("/:id", authMiddleware, validatorGetItem, deleteItem);

module.exports = router;
