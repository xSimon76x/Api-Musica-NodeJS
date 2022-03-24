const { storageModel } = require("../models");
const PUBLIC_URL = process.env.PUBLIC_URL;
/**
 * Obtener lista de la db
 * @param {*} req
 * @param {*} res
 */
const getItems = async (req, res) => {
  const data = await storageModel.find({});
  res.send({ data });
};

/**
 * Obtener un registro en especifico
 * @param {*} req
 * @param {*} res
 */
const getItem = (req, res) => {};

/**
 * Insertar un registro en especifico
 * @param {*} req
 * @param {*} res
 */
const createItem = async (req, res) => {
  const { body, file } = req;
  const fileData = {
    filename: file.filename,
    url: `${PUBLIC_URL}/${file.filename}`,
  };
  const data = await storageModel.create(fileData);
  res.send({ data });
};

/**
 * Actualizar un registro en especifico
 * @param {*} req
 * @param {*} res
 */
const updateItem = (req, res) => {};

/**
 * Borrar un registro en especifico
 * @param {*} req
 * @param {*} res
 */
const deleteItem = (req, res) => {};

module.exports = { getItems, getItem, createItem, updateItem, deleteItem };
