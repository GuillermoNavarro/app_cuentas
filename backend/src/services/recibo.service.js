const pool = require("../config/db");

const obtenerTodos = async (id_hogar) => {
    const [filas] = await pool.promise().query("SELECT * FROM recibo WHERE id_hogar = ?", [id_hogar]);
    return filas;
};

const crearRecibo = async (id_previsto, id_hogar, fecha, importe, tipo, detalle) => {
    const id_previsto_corregido = id_previsto || null;
    
    const [registro] = await pool.promise().query("INSERT INTO recibo(id_previsto, id_hogar, fecha, importe, tipo, detalle) VALUES (?,?,?,?,?,?)", [id_previsto_corregido, id_hogar, fecha, importe, tipo, detalle]);
    return registro;
}

const modificarEstado = async (id_recibo) => {
        
    const [registro] = await pool.promise().query("UPDATE recibo SET estado = !estado WHERE id_recibo = ?", [id_recibo]);
    return registro;
}

const modificarRecibo = async (id_recibo, fecha, importe, tipo, detalle) => {
    const [registro] = await pool.promise().query("UPDATE recibo SET fecha = ?, importe = ?, tipo = ?, detalle = ? WHERE id_recibo = ?", [fecha, importe, tipo, detalle, id_recibo]);
    return registro;

}

const borrarRecibo = async (id_recibo) => {
    const [registro] = await pool.promise().query("DELETE FROM recibo WHERE id_recibo = ?", [id_recibo]);
    return registro.affectedRows > 0;
}



module.exports = {
    obtenerTodos,
    crearRecibo,
    modificarEstado,
    modificarRecibo,
    borrarRecibo
};