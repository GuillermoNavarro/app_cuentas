const previstoService = require("../services/previsto.service");

const postPrevistos = async (req, res) => {
    try{
        const {detalle, fechaInicio, fechaFin, importe, tipo, id_hogar} = req.body;

        if (tipo != "gasto" && tipo != "ingreso") {
            return res.status(400).json({error: "El tipo debe ser ingreso o gasto"});
        }

        const previsto = await previstoService.crearPrevisto(detalle, fechaInicio, fechaFin, importe, tipo, id_hogar);
        res.status(200).json(previsto);

    }catch (err) {
        console.error("Error al crear previsto", err);
        res.status(500).json({error: "Error interno del servidor"});
    }
}

module.exports = {
    postPrevistos
};