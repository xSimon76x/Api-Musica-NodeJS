const express = require("express");
const router = express.Router();
const uploadMiddleware = require("../utils/handleStorage");
const { createItem } = require("../controllers/storage");
// http://localhost:3001:/api/storage

/**
 *
 */

router.post("/", uploadMiddleware.single("myfile"), createItem);
module.exports = router;
