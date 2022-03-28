const express = require("express");
const { matchedData } = require("express-validator");
const router = express.Router();
const {
  validatorRegisterItem,
  validatorLoginItem,
} = require("../validators/auth");
const { encrypt, compare } = require("../utils/handlePassword");
const { usersModel } = require("../models/");

/**
 * Crear un registro
 */
//http://localhost:3001/api/auth/login
//http://localhost:3001/api/auth/register
router.post("/register", validatorRegisterItem, async (req, res) => {
  req = matchedData(req);
  //contraseña encriptada
  const password = await encrypt(req.password);
  //sobreescribir contraseña ingresada por la encriptada
  const body = { ...req, password };
  //create e ingresar el usuario con la password encrypt al MongoDB
  const data = await usersModel.create(body);
  //data.set("password", undefined, {strict: false}) //para evitar que la contraseña se guarde
  res.send({ data });
});

module.exports = router;
