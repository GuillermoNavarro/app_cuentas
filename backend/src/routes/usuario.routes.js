const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuario.controller");
const authMiddleware = require("../middlewares/auth.middleware");

/**
 * @swagger
 * /api/v1/usuario:
 *   patch:
 *     summary: Cambio de contraseña
 *     tags: [Usuarios]
 *     security:
 *     - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               passAntigua:
 *                 type: string
 *                 description: Contraseña antigua
 *               passNueva:
 *                 type: string
 *                 description: Contrseña nueva 
 *     responses:
 *       200:
 *         description: Contraseña actualizada
 *       403:
 *         description: La constraseña antigua no es correcta
 *       500:
 *         description: Error interno del servidor
 */
router.patch("/api/v1/usuario", authMiddleware.verificarToken, usuarioController.patchUsuario);


/**
 * @swagger
 * /api/v1/login:
 *   post:
 *     summary: Login de usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Contraseña antigua
 *               password:
 *                 type: string
 *                 description: Contrseña nueva 
 *     responses:
 *       200:
 *         description: Acceso concedido, devuelve el token
 *       403:
 *         description: Email o Constraseña incorrectos
 *       500:
 *         description: Error interno del servidor
 */
router.post("/api/v1/login", usuarioController.postLogin);

/**
 * @swagger
 * /api/v1/usuario:
 *   get:
 *     summary: Usuarios en id_hogar
 *     tags: [Usuarios]
 *     security:
 *     - bearerAuth: []
 *     responses:
 *       200:
 *         description: Contraseña actualizada
 *       403:
 *         description: La constraseña antigua no es correcta
 *       500:
 *         description: Error interno del servidor
 */
router.get("/api/v1/usuario", authMiddleware.verificarToken, authMiddleware.verificarAccesoTotal, usuarioController.getUsuario);

module.exports = router;