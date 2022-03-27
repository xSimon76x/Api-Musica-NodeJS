const express = require("express");
const router = express.Router();
const uploadMiddleware = require("../utils/handleStorage");
const {
  createItem,
  getItems,
  deleteItem,
  getItem,
} = require("../controllers/storage");
const { validatorGetItem } = require("../validators/storage");
// http://localhost:3001:/api/storage

/**
 *Crear un item
 */
router.post("/", uploadMiddleware.single("myfile"), createItem);
/**
 * Obtener todos los items
 */
router.get("/", getItems);
/**
 * Borrar un item en especifico
 */
router.delete("/:id", validatorGetItem, deleteItem);

/**
 * Obtener un item en especifico
 */
router.get("/:id", validatorGetItem, getItem);

module.exports = router;
