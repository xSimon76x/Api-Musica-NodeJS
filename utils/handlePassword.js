const bcryptjs = require("bcryptjs");

/**
 * Contraseña sin encriptar: hola.01
 * @param {*} passwordPlain
 * @returns
 */

const encrypt = async (passwordPlain) => {
  const hash = await bcryptjs.hash(passwordPlain, 10); //contraseña a encriptar, y nivel de aletoriedad del hash
  // contraseña encriptada: SKFsask02.@#
  return hash;
};

/**
 * Contraseña sin encriptar, y contraseña encriptada
 * @param {*} passwordPlain
 * @param {*} hashPassword
 * @returns
 */
const compare = async (passwordPlain, hashPassword) => {
  return await bcryptjs.compare(passwordPlain, hashPassword);
};

module.exports = { encrypt, compare };
