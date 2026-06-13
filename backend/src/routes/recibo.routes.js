const express = require("express");
const router = express.Router();
const reciboController = require("../controllers/recibo.controller");


router.get("/api/v1/recibos/:id_hogar", reciboController.getRecibos);

module.exports = router;