const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuario.controller");

router.patch("/api/v1/usuario", usuarioController.patchUsuario);

module.exports = router;