const { tracksModel } = require("../models");

/**
 * Obtener lista de la db
 * @param {*} req
 * @param {*} res
 */
const getItems = async (req, res) => {
  const data = await tracksModel.find({});
  res.send({ data });
};

/**
 * Obtener un registro en especifico
 * @param {*} req
 * @param {*} res
 */
const getItem = async (req, res) => {
  const { params } = req;
  const data = await tracksModel.findOne({ _id: params.id });
  res.send({ data });
};

/**
 * Insertar un registro en especifico
 * @param {*} req
 * @param {*} res
 */
const createItem = async (req, res) => {
  const { body } = req;
  const data = await tracksModel.create(body);
  res.send({ data });
};

/**
 * Actualizar un registro en especifico
 * @param {*} req
 * @param {*} res
 */
const updateItem = async (req, res) => {
  const { params, body } = req;
  const data = await tracksModel.updateOne({ _id: params.id }, body);
  res.send({
    msg: `El tracks con id: ${params.id}. Fue actualizado exitosamente`,
  });
};

/**
 * Borrar un registro en especifico
 * @param {*} req
 * @param {*} res
 */
const deleteItem = async (req, res) => {
  const { params } = req;
  const data = await tracksModel.deleteOne({ _id: params.id });
  res.send({
    msg: `El tracks con id: ${params.id}. Fue eliminado exitosamente`,
  });
};

module.exports = { getItems, getItem, createItem, updateItem, deleteItem };
