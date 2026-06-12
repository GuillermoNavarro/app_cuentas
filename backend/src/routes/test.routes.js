const express = require("express");
const router = express.Router();
const testController = require("../controllers/test.controller");

router.get("/api/test/v1", testController.pruebaConexion);

module.exports = router;