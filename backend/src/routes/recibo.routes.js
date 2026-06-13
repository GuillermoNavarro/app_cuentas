const express = require("express");
const router = express.Router();
const reciboController = require("../controllers/recibo.controller");



router.get("/api/v1/recibos/:id_hogar", reciboController.getRecibos);
router.post("/api/v1/recibos/", reciboController.postRecibos);
router.patch("/api/v1/recibos/:id_recibo", reciboController.patchEstado);
router.put("/api/v1/recibos/:id_recibo", reciboController.putRecibo);
router.delete("/api/v1/recibos/:id_recibo", reciboController.deleteRecibo);

module.exports = router;