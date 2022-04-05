const { encrypt, compare } = require("../utils/handlePassword");
const { usersModel } = require("../models/");
const { matchedData } = require("express-validator");
const { tokenSing, verifyToken } = require("../utils/handleJwt");
const { handleHttpError } = require("../utils/handleErrors");

/**
 * Este controlador es el encargado de registrar un usuario con su JWT
 * @param {*} req
 * @param {*} res
 */
const registerCtrl = async (req, res) => {
  try {
    req = matchedData(req);
    //contraseña encriptada
    const password = await encrypt(req.password);
    //sobreescribir contraseña ingresada por la encriptada
    const body = { ...req, password };

    //create e ingresar el usuario con la password encrypt al MongoDB
    const dataUser = await usersModel.create(body);

    dataUser.set("password", undefined, { strict: false }); //para evitar que la contraseña se guarde

    const data = {
      token: await tokenSing(dataUser),
      user: dataUser,
    };

    res.send({ data });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_CREATE_USER");
  }
};

/**
 * Este es el controlador para poder logear a un Usuario
 * @param {*} req
 * @param {*} res
 */
const loginCtrl = async (req, res) => {
  try {
    req = matchedData(req);

    const user = await usersModel.findOne({ email: req.email });
    //eliminar select para mysql
    // agregar con nosql .select("password name role email");

    if (!user) {
      handleHttpError(res, "USER_NOT_EXISTS", 404);
      return;
    }

    const hashPassword = user.get("password");

    const check = await compare(req.password, hashPassword);

    if (!check) {
      handleHttpError(res, "PASSWORD_INVALID", 401);
      return;
    }

    user.set("password", undefined, { strict: false });

    const data = {
      token: await tokenSing(user),
      user,
    };

    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_LOGIN_USER");
  }
};

module.exports = { registerCtrl, loginCtrl };
