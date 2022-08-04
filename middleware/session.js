const { verifyToken } = require("../utils/handleJwt");
const { handleHttpError } = require("../utils/handleErrors");
const { usersModel } = require("../models");
const getProperties = require("../utils/handlePropertiesEngine");
const propertiesKey = getProperties();

/**
 * Validar que el usuario logeado si tenga autoriazacion
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
const authMiddleware = async (req, res, next) => {
  try {
    // const ENGINE_DB = process.env.ENGINE_DB;

    if (!req.headers.authorization) {
      handleHttpError(res, "NEED_SESSION", 401);
      return;
    }
    const token = req.headers.authorization.split(" ").pop();

    const dataToken = await verifyToken(token);

    if (!dataToken) {
      handleHttpError(res, "NOT_PAYLOAD_DATA", 401);
      return;
    }

    const query = {
      [propertiesKey.id]: dataToken[propertiesKey.id],
    };

    let user = await usersModel.findOne(query);

    // if (ENGINE_DB === "nosql") {
    //   user = await usersModel.findOne(query); //se cambia findById por findOne por que el de id es de mongo
    // } else {
    //   user = await usersModel.findOne({ where: { id: query.id } }); //se cambia findById por findOne por que el de id es de mongo
    // }

    req.user = user;

    next();
  } catch (error) {
    handleHttpError(res, "NOT_SESSION", 401);
  }
};

module.exports = authMiddleware;
