const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuario.controller");

router.patch("/api/v1/usuario", usuarioController.patchUsuario);

router.post("/api/v1/login", usuarioController.postLogin);

module.exports = router;