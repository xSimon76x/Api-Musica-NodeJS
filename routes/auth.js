const express = require("express");
const router = express.Router();
const {
  validatorRegisterItem,
  validatorLoginItem,
} = require("../validators/auth");
const { registerCtrl, loginCtrl } = require("../controllers/auth");

/**
 * Crear un registro
 */
//http://localhost:3001/api/auth/login
//http://localhost:3001/api/auth/register
router.post("/register", validatorRegisterItem, registerCtrl);
router.post("/login", validatorLoginItem, loginCtrl);

module.exports = router;
