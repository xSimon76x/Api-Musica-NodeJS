const express = require("express");
const router = express.Router();

//TODO https://localhost/tracks GET,POST,PUT,DELETE

router.get("/", (req, res) => {
  const data = ["hola", "mundo"];

  res.send({ data });
});

module.exports = router;
