const pool = require("../config/db");
const { crearRecibo } = require("./recibo.service");

const crearPrevisto = async (detalle, fechaInicio, fechaFin, importe, tipo, id_hogar) => {
    const [registro] = await pool.promise().query("INSERT INTO previsto(detalle, fecha_inicio, fecha_fin, importe, tipo, id_hogar) VALUES (?,?,?,?,?,?)", [detalle, fechaInicio, fechaFin, importe, tipo, id_hogar]);
    if(registro.affectedRows>0){
        let fechaActual = new Date(fechaInicio);
        const fecha = new Date(fechaFin);
        const id_previsto = registro.insertId;
        while (fechaActual < fecha){
            await crearRecibo(id_previsto, id_hogar, fechaActual.toISOString().split('T')[0], importe, tipo, detalle);
            fechaActual.setMonth(fechaActual.getMonth() +1);   
        }
    }
    
    return registro;
}

const obtenerPrevisto = async (id_previsto) => {
    const [registro] = await pool.promise().query("SELECT * FROM previsto WHERE id_previsto = ?", [id_previsto]);
    return registro;
}

const modificarPrevisto = async (id_previsto, detalle, fechaInicio, fechaFin, importe, tipo, id_hogar) => {
    const [recibo] = await pool.promise().query("SELECT min(fecha) AS primera_fecha FROM recibo WHERE id_previsto = ? AND estado = false", [id_previsto]);
    let fechaActual;
    if(recibo[0].primera_fecha === null){
        fechaActual = new Date(fechaInicio);
    }else{
        fechaActual = fechaInicio >= recibo[0].primera_fecha ? new Date(fechaInicio) : new Date(recibo[0].primera_fecha) ;
    }
    
    const [previsto] = await pool.promise().query("UPDATE previsto SET detalle = ?, fecha_inicio = ?, fecha_fin = ?, importe = ?, tipo = ? WHERE id_previsto = ?", [detalle, fechaInicio, fechaFin, importe, tipo, id_previsto]);
    const [registro] = await pool.promise().query("DELETE FROM recibo WHERE id_previsto = ? AND estado = false AND fecha >= ?", [id_previsto, fechaInicio]);
   
    const fecha = new Date(fechaFin);
    while (fechaActual < fecha){
        await crearRecibo(id_previsto, id_hogar, fechaActual.toISOString().split('T')[0], importe, tipo, detalle);
        fechaActual.setMonth(fechaActual.getMonth() +1);   
    }
    return previsto.affectedRows > 0;
}

const borrarPrevisto = async (id_previsto) => {
    const [recibo] = await pool.promise().query("SELECT max(fecha) AS fin_fecha FROM recibo WHERE id_previsto = ? AND estado = true", [id_previsto]);
    if(recibo[0].fin_fecha === null){
        const [previsto] = await pool.promise().query("DELETE FROM previsto WHERE id_previsto = ?", [id_previsto]);
        return previsto.affectedRows > 0;
    }
    const [previsto] = await pool.promise().query("UPDATE previsto SET fecha_fin = ? WHERE id_previsto = ?", [recibo[0].fin_fecha, id_previsto]);
    const [registro] = await pool.promise().query("DELETE FROM recibo WHERE id_previsto = ? AND estado = false", [id_previsto]);
    return previsto.affectedRows > 0;
}

module.exports = {
    crearPrevisto,
    obtenerPrevisto,
    modificarPrevisto,
    borrarPrevisto
};