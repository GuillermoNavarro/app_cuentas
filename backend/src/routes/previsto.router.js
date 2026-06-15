const express = require("express");
const router = express.Router();
const previstoControler = require("../controllers/previsto.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/api/v1/previstos", authMiddleware.verificarToken, authMiddleware.verificarAccesoTotal, previstoControler.postPrevistos);

router.get("/api/v1/previstos/:id_previsto", authMiddleware.verificarToken, authMiddleware.verificarAccesoTotal, previstoControler.getPrevisto);

router.put("/api/v1/previstos", authMiddleware.verificarToken, authMiddleware.verificarAccesoTotal, previstoControler.putPrevisto);

router.delete("/api/v1/previstos/:id_previsto", authMiddleware.verificarToken, authMiddleware.verificarAccesoTotal, previstoControler.deletePrevisto);

module.exports = router;