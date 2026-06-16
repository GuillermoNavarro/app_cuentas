const reciboService = require("../services/recibo.service");

function esNumero(valor) {
    return typeof valor === 'number' && !Number.isNaN(valor);
}

const getRecibos = async (req, res) => {
    try{
        const { mes, anio } = req.query;
        const mesNum = parseInt(mes);
        const anioNum =parseInt(anio);
        if(!esNumero(mesNum) || !esNumero(anioNum) || mesNum < 1 || mesNum > 12){
            return res.status(400).json({error: "Error valor no valido"});
        }

        const id_hogar = req.usuario.id_hogar;

        const recibos = await reciboService.obtenerTodos(id_hogar, mes, anio);

        res.json(recibos);
    }catch (err) {
        console.error("Error al obtener recibos", err);
        res.status(500).json({error: "Error interno del servidor"});
    }
};

const postRecibos = async (req, res) => {
    try{
        const id_previsto = req.body.id_previsto;
        const id_hogar = req.usuario.id_hogar;
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
        const id_hogar = req.usuario.id_hogar;

        const recibo = await reciboService.modificarEstado(id_recibo, id_hogar);
        if(recibo){
            res.status(200).json({ mensaje: "Estado modificado correctamente" });
        }else{
            res.status(404).json({error: "Recibo no encontrado"});
        }
    }catch (err) {
        console.error("Error al modificar el recibo", err);
        res.status(500).json({error: "Error interno del servidor"});
    }
}

const putRecibo = async (req, res) => {
    try{
        const id_recibo = req.params.id_recibo;
        const {fecha, importe, tipo, detalle} = req.body;
        const id_hogar = req.usuario.id_hogar;

        if (tipo != "gasto" && tipo != "ingreso") {
            return res.status(400).json({error: "El tipo debe ser ingreso o gasto"});
        }

        const recibo = await reciboService.modificarRecibo(id_recibo, fecha, importe, tipo, detalle, id_hogar);
        if(recibo){
            res.status(200).json({ mensaje: "Recibo modificado correctamente" });
        }else{
            res.status(404).json({error: "Recibo no encontrado"});
        }
    }catch (err) {
        console.error("Error al modificar el recibo", err);
        res.status(500).json({error: "Error interno del servidor"});
    }
}

const deleteRecibo = async (req, res) => {
    try{
        const id_recibo = req.params.id_recibo;
        const id_hogar = req.usuario.id_hogar;

        const recibo = await reciboService.borrarRecibo(id_recibo, id_hogar);
        if(recibo){
            res.status(200).json({ mensaje: "Recibo borrado correctamente" });
        }else{
            res.status(404).json({error: "Recibo no encontrado"});
        }
    }catch (err) {
        console.error("Error al borrar el recibo", err);
        res.status(500).json({error: "Error interno del servidor"});
    }
}

const getResumen = async (req, res) => {
    try{
        const { mes, anio } = req.query;
        const mesNum = parseInt(mes);
        const anioNum =parseInt(anio);
        if(!esNumero(mesNum) || !esNumero(anioNum) || mesNum < 1 || mesNum > 12){
            return res.status(400).json({error: "Error valor no valido"});
        }

        const id_hogar = req.usuario.id_hogar;

        const fecha = new Date (anio, mes - 1, 1);

        const recibos = await reciboService.resumenAnual(id_hogar, fecha);

        res.json(recibos);
    }catch (err) {
        console.error("Error al obtener recibos", err);
        res.status(500).json({error: "Error interno del servidor"});
    }
};
    




module.exports = {
    getRecibos,
    postRecibos,
    patchEstado,
    putRecibo,
    deleteRecibo,
    getResumen
};