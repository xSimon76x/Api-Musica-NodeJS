const { matchedData } = require("express-validator");
const { tracksModel } = require("../models");
const { handleHttpError } = require("../utils/handleErrors");

/**
 * Obtener lista de la db
 * @param {*} req
 * @param {*} res
 */
const getItems = async (req, res) => {
  try {
    const data = await tracksModel.find({});
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_LIST_ITEMS");
  }
};

/**
 * Obtener un registro en especifico
 * @param {*} req
 * @param {*} res
 */
const getItem = async (req, res) => {
  try {
    req = matchedData(req);
    const { id } = req;
    const data = await tracksModel.findById(id);
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_GET_ITEM");
  }
};

/**
 * Insertar un registro en especifico
 * @param {*} req
 * @param {*} res
 */
const createItem = async (req, res) => {
  // matchedData() = "Sirve para limpiar y evitar posibles campos que se ingresen por POST, y no esten definidos en el modelo, esos campos los evita y no los ingresa"
  try {
    const bodyClean = matchedData(req);
    const data = await tracksModel.create(bodyClean);
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_CREATE_ITEM");
  }
};

/**
 * Actualizar un registro en especifico
 * @param {*} req
 * @param {*} res
 */
const updateItem = async (req, res) => {
  try {
    const { id, ...body } = matchedData(req);
    const data = await tracksModel.findByIdAndUpdate(id, body);
    res.send({
      msg: `El tracks con id: ${id}. Fue actualizado exitosamente`,
    });
  } catch (error) {
    handleHttpError(res, "ERROR_UPDATE_ITEM");
  }
};

/**
 * Borrar un registro en especifico
 * @param {*} req
 * @param {*} res
 */
const deleteItem = async (req, res) => {
  try {
    const { id } = matchedData(req);

    const data = await tracksModel.delete({ _id: id });
    res.send(
      { data },
      {
        msg: `El tracks con id: ${id}. Fue eliminado exitosamente`,
      }
    );
  } catch (error) {
    handleHttpError(res, "ERROR_DELETE_ITEM");
  }
};

module.exports = { getItems, getItem, createItem, updateItem, deleteItem };
