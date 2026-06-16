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

const obtenerPrevisto = async (id_previsto ,id_hogar) => {
    const [registro] = await pool.promise().query("SELECT * FROM previsto WHERE id_previsto = ? AND id_hogar = ?", [id_previsto, id_hogar]);
    return registro;
}

const modificarPrevisto = async (id_previsto, detalle, fechaInicio, fechaFin, importe, tipo, id_hogar) => {
    const [recibo] = await pool.promise().query("SELECT min(fecha) AS primera_fecha FROM recibo WHERE id_previsto = ? AND estado = false AND id_hogar = ?", [id_previsto, id_hogar]);
    let fechaActual;
    const fecha_fin = new Date(fechaFin);
    const fecha_inicio = new Date(fechaInicio);
    if(recibo[0].primera_fecha === null){
        fechaActual = new Date(fechaInicio);
    }else{
        const fechaUsuario = new Date (recibo[0].primera_fecha);
        fechaActual = fecha_inicio >= fechaUsuario ? fecha_inicio : fechaUsuario ;
    }
    
    const [previsto] = await pool.promise().query("UPDATE previsto SET detalle = ?, fecha_fin = ?, importe = ?, tipo = ? WHERE id_previsto = ? AND id_hogar = ?", [detalle, fecha_fin.toISOString().split('T')[0], importe, tipo, id_previsto, id_hogar]);
    if(previsto.affectedRows === 0){
        return false;
    }
    const [registro] = await pool.promise().query("DELETE FROM recibo WHERE id_previsto = ? AND estado = false AND fecha >= ? AND id_hogar = ?", [id_previsto, fechaInicio, id_hogar]);
   
    const fecha = new Date(fechaFin);
    while (fechaActual < fecha){
        await crearRecibo(id_previsto, id_hogar, fechaActual.toISOString().split('T')[0], importe, tipo, detalle);
        fechaActual.setMonth(fechaActual.getMonth() +1);   
    }
    return previsto.affectedRows > 0;
};

const borrarPrevisto = async (id_previsto, id_hogar) => {
    const [recibo] = await pool.promise().query("SELECT max(fecha) AS fin_fecha FROM recibo WHERE id_previsto = ? AND estado = true AND id_hogar = ?", [id_previsto, id_hogar]);
    if(recibo[0].fin_fecha === null){
        const [previsto] = await pool.promise().query("DELETE FROM previsto WHERE id_previsto = ? AND id_hogar = ?", [id_previsto, id_hogar]);
        return previsto.affectedRows > 0;
    }
    const [previsto] = await pool.promise().query("UPDATE previsto SET fecha_fin = ? WHERE id_previsto = ? AND id_hogar = ?", [recibo[0].fin_fecha, id_previsto, id_hogar]);
    if(previsto.affectedRows === 0){
        return false;
    }
    const [registro] = await pool.promise().query("DELETE FROM recibo WHERE id_previsto = ? AND estado = false AND id_hogar = ?", [id_previsto, id_hogar]);
    return previsto.affectedRows > 0;
};

module.exports = {
    crearPrevisto,
    obtenerPrevisto,
    modificarPrevisto,
    borrarPrevisto
};