const express = require("express");
const router = express.Router();
const reciboController = require("../controllers/recibo.controller");
const authMiddleware = require("../middlewares/auth.middleware");

/**
 * @swagger
 * /api/v1/recibos:
 *   get:
 *     summary: Obtiene todos los recibos de un hogar
 *     tags: [Recibos]
 *     security:
 *     - bearerAuth: []
 *     parameters:
 *     - in: query
 *       name: mes
 *       required: true
 *       schema:
 *         type: integer
 *       description: Numero del mes (1-12)
 *     - in: query
 *       name: anio
 *       required: true
 *       schema:
 *         type: integer
 *       description: Año a consultar (ej. 2026)
 *     responses:
 *       200:
 *         description: Lista de recibos obtenida con éxito
 *       400:
 *         description: Valor no valido en las fechas
 *       500:
 *         description: Error interno del servidor
 */
router.get("/api/v1/recibos", authMiddleware.verificarToken, authMiddleware.verificarAccesoTotal, reciboController.getRecibos);

/**
 * @swagger
 * /api/v1/resumen:
 *   get:
 *     summary: Obtiene un resumen anual
 *     tags: [Recibos]
 *     security:
 *     - bearerAuth: []
 *     parameters:
 *     - in: query
 *       name: mes
 *       required: true      
 *       schema:
 *         type: integer
 *       description: Numero del mes (1-12)
 *     - in: query
 *       name: anio
 *       required: true
 *       schema:
 *         type: integer
 *       description: Año a consultar (ej. 2026)
 *     responses:
 *       200:
 *         description: Resumen
 *       400:
 *         description: Valor no valido en las fechas
 *       500:
 *         description: Error interno del servidor
 */
router.get("/api/v1/resumen", authMiddleware.verificarToken, authMiddleware.verificarAccesoTotal, reciboController.getResumen);


/**
 * @swagger
 * /api/v1/recibos:
 *   post:
 *     summary: Crea un recibo nuevo
 *     tags: [Recibos]
 *     security:
 *     - bearerAuth: []
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

/**
 * @swagger
 * /api/v1/recibos/{id_recibo}:
 *   patch:
 *     summary: Cambia el estado del recibo
 *     tags: [Recibos]
 *     security:
 *     - bearerAuth: []
 *     parameters:
 *     - in: path
 *       name: id_recibo
 *       required: true
 *       schema:
 *         type: integer
 *       description: Id del recibo a modificar
 *     responses:
 *       200:
 *         description: Estado modificado correctamente
 *       404:
 *         description: Recibo no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.patch("/api/v1/recibos/:id_recibo", authMiddleware.verificarToken, authMiddleware.verificarAccesoTotal, reciboController.patchEstado);

/**
 * @swagger
 * /api/v1/recibos/importe/{id_recibo}:
 *   patch:
 *     summary: Cambia el importe del recibo
 *     tags: [Recibos]
 *     security:
 *     - bearerAuth: []
 *     parameters:
 *     - in: path
 *       name: id_recibo
 *       required: true
 *       schema:
 *         type: integer
 *       description: Id del recibo a modificar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               importe:
 *                 type: number
 *                 description: Importe del recibo
 *     responses:
 *       200:
 *         description: Estado modificado correctamente
 *       404:
 *         description: Recibo no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.patch("/api/v1/recibos/importe/:id_recibo", authMiddleware.verificarToken, authMiddleware.verificarAccesoTotal, reciboController.patchImporte);

/**
 * @swagger
 * /api/v1/recibos/{id_recibo}:
 *   put:
 *     summary: Crea un recibo nuevo
 *     tags: [Recibos]
 *     security:
 *     - bearerAuth: []
 *     parameters:
 *     - in: path
 *       name: id_recibo
 *       required: true
 *       schema:
 *         type: integer
 *       description: Id del recibo a modificar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
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
 *         description: Recibo modificado correctamente
 *       400:
 *         description: Valor no valido en campo tipo
 *       404:
 *         description: Recibo no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.put("/api/v1/recibos/:id_recibo", authMiddleware.verificarToken, authMiddleware.verificarAccesoTotal, reciboController.putRecibo);

/**
 * @swagger
 * /api/v1/recibos/{id_recibo}:
 *   delete:
 *     summary: Borra un recibo
 *     tags: [Recibos]
 *     security:
 *     - bearerAuth: []
 *     parameters:
 *     - in: path
 *       name: id_recibo
 *       required: true
 *       schema:
 *         type: integer
 *       description: Id del recibo a borrar
 *     responses:
 *       200:
 *         description: Estado modificado correctamente
 *       404:
 *         description: Recibo no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.delete("/api/v1/recibos/:id_recibo", authMiddleware.verificarToken, authMiddleware.verificarAccesoTotal, reciboController.deleteRecibo);

module.exports = router;