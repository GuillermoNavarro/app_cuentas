const express = require("express");
const router = express.Router();
const reciboController = require("../controllers/recibo.controller");
const authMiddleware = require("../middlewares/auth.middleware");

/**
 * @swagger
 * /api/v1/recibos/{id_hogar}:
 *   get:
 *     summary: Obtiene todos los recibos de un hogar
 *     tags: [Recibos]
 *     parameters:
 *     - in: path
 *       name: id_hogar
 *       required: true
 *       schema:
 *         type: integer
 *       description: El ID del hogar
 *     responses:
 *       200:
 *         description: Lista de recibos obtenida con éxito
 *       500:
 *         description: Error interno del servidor
 */
router.get("/api/v1/recibos/:id_hogar", authMiddleware.verificarToken, authMiddleware.verificarAccesoTotal, reciboController.getRecibos);

/**
 * @swagger
 * /api/v1/recibos:
 *   post:
 *     summary: Crea un recibo nuevo
 *     tags: [Recibos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_previsto:
 *                 type: integer
 *                 description: El ID de la cuota prevista
 *               id_hogar:
 *                 type: integer
 *                 description: El ID del hogar
 *               fecha:
 *                 type: string
 *                 format: date
 *                 description: Fecha del recibo
 *               importe:
 *                 type: number
 *                 description: Importe del recibo
 *               tipo:
 *                 type: string
 *                 description: Tipo gasto/ingreso
 *               detalle:
 *                 type: string
 *                 description: Detalle del recibo 
 *     responses:
 *       200:
 *         description: Lista de recibos obtenida con éxito
 *       400:
 *         description: Valor no valido en campo tipo
 *       500:
 *         description: Error interno del servidor
 */
router.post("/api/v1/recibos", authMiddleware.verificarToken, authMiddleware.verificarAccesoTotal, reciboController.postRecibos);


router.patch("/api/v1/recibos/:id_recibo", authMiddleware.verificarToken, authMiddleware.verificarAccesoTotal, reciboController.patchEstado);
router.put("/api/v1/recibos/:id_recibo", authMiddleware.verificarToken, authMiddleware.verificarAccesoTotal, reciboController.putRecibo);
router.delete("/api/v1/recibos/:id_recibo", authMiddleware.verificarToken, authMiddleware.verificarAccesoTotal, reciboController.deleteRecibo);

module.exports = router;