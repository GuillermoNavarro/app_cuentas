const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuario.controller");
const authMiddleware = require("../middlewares/auth.middleware");


router.patch("/api/v1/usuario", authMiddleware.verificarToken, usuarioController.patchUsuario);

router.post("/api/v1/login", usuarioController.postLogin);

module.exports = router;