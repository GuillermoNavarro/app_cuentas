const previstoService = require("../services/previsto.service");

const postPrevistos = async (req, res) => {
    try{
        const {detalle, fecha_inicio, fecha_fin, importe, tipo} = req.body;
        const id_hogar = req.usuario.id_hogar;

        if (tipo != "gasto" && tipo != "ingreso") {
            return res.status(400).json({error: "El tipo debe ser ingreso o gasto"});
        }

        const previsto = await previstoService.crearPrevisto(detalle, fecha_inicio, fecha_fin, importe, tipo, id_hogar);
        res.status(200).json(previsto);

    }catch (err) {
        console.error("Error al crear previsto", err);
        res.status(500).json({error: "Error interno del servidor"});
    }
};

const getPrevisto = async (req, res) => {
    try{
        const id_previsto = req.params.id_previsto;
        const id_hogar = req.usuario.id_hogar;
        const previsto = await previstoService.obtenerPrevisto(id_previsto, id_hogar);
        if(previsto.length === 0){
            return res.status(404).json({error: "Previsto no encontrado"});
        }
        res.json(previsto);
    }catch (err) {
        console.error("Error al obtener el previsto", err);
        res.status(500).json({error: "Error interno del servidor"});
    }
};

const putPrevisto = async (req, res) => {
    try{
        const {detalle, fecha_inicio, fecha_fin, importe, tipo} = req.body;
        const id_previsto = req.params.id_previsto;
        const id_hogar = req.usuario.id_hogar;

        if (tipo != "gasto" && tipo != "ingreso") {
            return res.status(400).json({error: "El tipo debe ser ingreso o gasto"});
        }

        const previsto = await previstoService.modificarPrevisto(id_previsto, detalle, fecha_inicio, fecha_fin, importe, tipo, id_hogar);
        if(previsto){
            res.status(200).json({
                success: previsto
            });
        }else{
            res.status(404).json({
                success: previsto
            });
        };
    }catch (err) {
        console.error("Error al modificar el previsto", err);
        res.status(500).json({error: "Error interno del servidor"});
    }
};

const deletePrevisto = async (req, res) => {
    try{
        const id_previsto = req.params.id_previsto;
        const id_hogar = req.usuario.id_hogar;
        const previsto = await previstoService.borrarPrevisto(id_previsto, id_hogar);
         if(previsto){
            res.status(200).json({
                success: previsto
            });
        }else{
            res.status(404).json({
                success: previsto
            });
        };
    }catch (err) {
        console.error("Error al borrar el previsto", err);
        res.status(500).json({error: "Error interno del servidor"});
    }
};

module.exports = {
    postPrevistos,
    getPrevisto,
    putPrevisto,
    deletePrevisto
};