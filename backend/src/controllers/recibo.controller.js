const reciboService = require("../services/recibo.service");

const getRecibos = async (req, res) => {
    try{
        const id_hogar = req.params.id_hogar;

        const recibos = await reciboService.obtenerTodos(id_hogar);

        res.json(recibos);
    }catch (err) {
        console.error("Error al obtener recibos", err);
        res.status(500).json({error: "Error interno del servidor"});
    }
};

module.exports = {
    getRecibos
};