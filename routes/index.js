const express = require("express");
const router = express.Router();
const fs = require("fs");

const PATH_ROUTES = __dirname; // ruta absoluta de donde se encuentra este archivo
const removeExtension = (fileName) => {
  return fileName.split(".").shift();
};

fs.readdirSync(PATH_ROUTES).filter((file) => {
  const name = removeExtension(file); //llega index o tracks
  if (name !== "index") {
    console.log(`Cargando ruta ${name}`);
    router.use(`/${name}`, require(`./${file}`)); // https://localhost:/3000/api/tracks
  }
}); // leer el directorio de path, para devolver un array

module.exports = router;
