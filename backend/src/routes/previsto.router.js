const express = require("express");
const router = express.Router();
const previstoControler = require("../controllers/previsto.controller");

router.post("/api/v1/previstos", previstoControler.postPrevistos);

module.exports = router;