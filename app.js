require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dbConnectNoSQL = require("./config/mongo");
const morganBody = require("morgan-body");
const loggerStream = require("./utils/handleLogger");
const { dbConnectMySQL } = require("./config/mysql");

const swaggerUI = require("swagger-ui-express");
const openApiConfiguration = require("./docs/swagger");

const ENGINE_DB = process.env.ENGINE_DB;
const NODE_ENV = process.env.NODE_ENV || "deveploment";

const app = express();

app.use(cors());

app.use(
  "/documentation",
  swaggerUI.serve,
  swaggerUI.setup(openApiConfiguration)
);
app.use(express.json());
app.use(express.static("storage"));

morganBody(app, {
  noColors: true,
  stream: loggerStream,
  skip: function (req, res) {
    return res.statusCode < 400;
  },
});
const port = process.env.PORT || 3000;

app.use("/api", require("./routes"));

//En este caso, evitamos que cuando la libreria de "SuperTest", se quiera ocupar.
//No pueda llegar a "chocar" con que el puerto 3000 ya esta siendo ocupado, ya que esta libreria,
//levantara el proyecto para realizar pruebas.
if (NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`http://localhost:${port}`);
  });
}

ENGINE_DB === "nosql" ? dbConnectNoSQL() : dbConnectMySQL();

module.exports = app;
