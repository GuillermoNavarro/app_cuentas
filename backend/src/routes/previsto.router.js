const express = require("express");
const router = express.Router();
const previstoControler = require("../controllers/previsto.controller");

router.post("/api/v1/previstos", previstoControler.postPrevistos);

router.get("/api/v1/previstos/:id_previsto", previstoControler.getPrevisto);

router.put("/api/v1/previstos", previstoControler.putPrevisto);

router.delete("/api/v1/previstos/:id_previsto", previstoControler.deletePrevisto);

module.exports = router;