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
    handleHttpError(res, "ERROR_GET_ITEMS");
  }
};

/**
 * Obtener un registro en especifico
 * @param {*} req
 * @param {*} res
 */
const getItem = async (req, res) => {
  try {
    const { params } = req;
    const data = await tracksModel.findOne({ _id: params.id });
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
  try {
    const { body } = req;
    const data = await tracksModel.create(body);
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
    const { params, body } = req;
    const data = await tracksModel.updateOne({ _id: params.id }, body);
    res.send({
      msg: `El tracks con id: ${params.id}. Fue actualizado exitosamente`,
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
    const { params } = req;
    const data = await tracksModel.deleteOne({ _id: params.id });
    res.send({
      msg: `El tracks con id: ${params.id}. Fue eliminado exitosamente`,
    });
  } catch (error) {
    handleHttpError(res, "ERROR_DELETE_ITEM");
  }
};

module.exports = { getItems, getItem, createItem, updateItem, deleteItem };
