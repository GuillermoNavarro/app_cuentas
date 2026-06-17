const express = require("express");
const router = express.Router();
const previstoControler = require("../controllers/previsto.controller");
const authMiddleware = require("../middlewares/auth.middleware");

/**
 * @swagger
 * /api/v1/previstos:
 *   post:
 *     summary: Crea un previsto nuevo
 *     tags: [Previstos]
 *     security:
 *     - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               detalle:
 *                 type: string
 *                 description: Detalle del previsto 
 *               fecha_inicio:
 *                 type: string
 *                 format: date
 *                 description: Fecha de inicio del previsto
 *               fecha_fin:
 *                 type: string
 *                 format: date
 *                 description: Fecha final del previsto
 *               importe:
 *                 type: number
 *                 description: Importe del previsto
 *               tipo:
 *                 type: string
 *                 description: Tipo gasto/ingreso
 *     responses:
 *       200:
 *         description: Previsto creado con exito
 *       400:
 *         description: Valor no valido en campo tipo
 *       500:
 *         description: Error interno del servidor
 */
router.post("/api/v1/previstos", authMiddleware.verificarToken, authMiddleware.verificarAccesoTotal, previstoControler.postPrevistos);

/**
 * @swagger
 * /api/v1/previstos/{id_previsto}:
 *   get:
 *     summary: Obtine un previsto por id
 *     tags: [Previstos]
 *     security:
 *     - bearerAuth: []
 *     parameters:
 *     - in: path
 *       name: id_previsto
 *       required: true
 *       schema:
 *         type: integer
 *       description: Id del previsto a ver
 *     responses:
 *       200:
 *         description: Devuevle el previsto
 *       404:
 *         description: Previsto no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get("/api/v1/previstos/:id_previsto", authMiddleware.verificarToken, authMiddleware.verificarAccesoTotal, previstoControler.getPrevisto);

/**
 * @swagger
 * /api/v1/previstos/{id_previsto}:
 *   put:
 *     summary: Modifica un previsto
 *     tags: [Previstos]
 *     security:
 *     - bearerAuth: []
 *     parameters:
 *     - in: path
 *       name: id_previsto
 *       required: true
 *       schema:
 *         type: integer
 *       description: Id del previsto a modificar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               detalle:
 *                 type: string
 *                 description: Detalle del previsto 
 *               fecha_inicio:
 *                 type: string
 *                 format: date
 *                 description: Fecha de inicio del previsto
 *               fecha_fin:
 *                 type: string
 *                 format: date
 *                 description: Fecha final del previsto
 *               importe:
 *                 type: number
 *                 description: Importe del previsto
 *               tipo:
 *                 type: string
 *                 description: Tipo gasto/ingreso
 *     responses:
 *       200:
 *         description: Previsto modificado con exito
 *       400:
 *         description: Valor no valido en campo tipo
 *       404:
 *         description: Previsto no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.put("/api/v1/previstos/:id_previsto", authMiddleware.verificarToken, authMiddleware.verificarAccesoTotal, previstoControler.putPrevisto);

/**
 * @swagger
 * /api/v1/previstos/{id_previsto}:
 *   delete:
 *     summary: Borra un previsto por id
 *     tags: [Previstos]
 *     security:
 *     - bearerAuth: []
 *     parameters:
 *     - in: path
 *       name: id_previsto
 *       required: true
 *       schema:
 *         type: integer
 *       description: Id del previsto a ver
 *     responses:
 *       200:
 *         description: Previsto borrado correctamente
 *       404:
 *         description: Previsto no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.delete("/api/v1/previstos/:id_previsto", authMiddleware.verificarToken, authMiddleware.verificarAccesoTotal, previstoControler.deletePrevisto);

module.exports = router;