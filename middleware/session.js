const { verifyToken } = require("../utils/handleJwt");
const { handleHttpError } = require("../utils/handleErrors");
const { usersModel } = require("../models");

/**
 * Validar que el usuario logeado si tenga autoriazacion
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
const authMiddleware = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      handleHttpError(res, "NEED_SESSION", 401);
      return;
    }
    const token = req.headers.authorization.split(" ").pop();

    const dataToken = await verifyToken(token);

    if (!dataToken._id) {
      handleHttpError(res, "ERROR_ID_TOKEN", 401);
      return;
    }

    const user = await usersModel.findById(dataToken._id);

    req.user = user;

    next();
  } catch (error) {
    handleHttpError(res, "NOT_SESSION", 401);
  }
};

module.exports = authMiddleware;
