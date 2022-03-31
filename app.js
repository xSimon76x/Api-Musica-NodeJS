require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dbConnect = require("./config/mongo");
const morganBody = require("morgan-body");
const loggerStream = require("./utils/handleLogger");

const app = express();

app.use(cors());

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
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
dbConnect();
