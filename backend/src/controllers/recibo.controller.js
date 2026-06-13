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

const postRecibos = async (req, res) => {
    try{
        const id_previsto = req.body.id_previsto;
        const id_hogar = req.body.id_hogar;
        const fecha = req.body.fecha;
        const importe = req.body.importe;
        const tipo = req.body.tipo;
        const detalle = req.body.detalle;

        if (tipo != "gasto" && tipo != "ingreso") {
            return res.status(400).json({error: "El tipo debe ser ingreso o gasto"});
        }

        const recibo = await reciboService.crearRecibo(id_previsto, id_hogar, fecha, importe, tipo, detalle);
        res.status(200).json(recibo);

    }catch (err) {
        console.error("Error al crear recibo", err);
        res.status(500).json({error: "Error interno del servidor"});
    }
}

const patchEstado = async (req, res) => {
    try{
        const id_recibo = req.params.id_recibo;

        const recibo = await reciboService.modificarEstado(id_recibo);
        res.status(200).json(recibo);
    }catch (err) {
        console.error("Error al modificar el recibo", err);
        res.status(500).json({error: "Error interno del servidor"});
    }
}

const putRecibo = async (req, res) => {
    try{
        const id_recibo = req.params.id_recibo;
        const {fecha, importe, tipo, detalle} = req.body;

        if (tipo != "gasto" && tipo != "ingreso") {
            return res.status(400).json({error: "El tipo debe ser ingreso o gasto"});
        }

        const recibo = await reciboService.modificarRecibo(id_recibo, fecha, importe, tipo, detalle);
        if (recibo.affectedRows === 0){
            return res.status(404).json({error: "Recibo no encontrado"});
        }
        res.status(200).json(recibo);
    }catch (err) {
        console.error("Error al modificar el recibo", err);
        res.status(500).json({error: "Error interno del servidor"});
    }
}

const deleteRecibo = async (req, res) => {
    try{
        const id_recibo = req.params.id_recibo;

        const recibo = await reciboService.borrarRecibo(id_recibo);
         if (recibo === false){
            return res.status(404).json({error: "Recibo no encontrado"});
        }
        res.status(200).json(recibo);
    }catch (err) {
        console.error("Error al borrar el recibo", err);
        res.status(500).json({error: "Error interno del servidor"});
    }
}
    




module.exports = {
    getRecibos,
    postRecibos,
    patchEstado,
    putRecibo,
    deleteRecibo
};