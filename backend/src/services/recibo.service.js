const pool = require("../config/db");

const obtenerTodos = async (id_hogar, mes, anio) => {
    
    const primerDia = new Date(anio, mes - 1, 1);
    const ultimoDia = new Date(anio, mes, 0);

    const [filas] = await pool.promise().query("SELECT * FROM recibo WHERE id_hogar = ? AND fecha BETWEEN ? AND ? ORDER BY fecha ASC", [id_hogar, primerDia.toISOString().split('T')[0], ultimoDia.toISOString().split('T')[0]]);
    return filas;
};

const crearRecibo = async (id_previsto, id_hogar, fecha, importe, tipo, detalle) => {
    const id_previsto_corregido = id_previsto || null;
    
    const [registro] = await pool.promise().query("INSERT INTO recibo(id_previsto, id_hogar, fecha, importe, tipo, detalle) VALUES (?,?,?,?,?,?)", [id_previsto_corregido, id_hogar, fecha, importe, tipo, detalle]);
    return registro;
}

const modificarEstado = async (id_recibo, id_hogar) => {
        
    const [registro] = await pool.promise().query("UPDATE recibo SET estado = !estado WHERE id_recibo = ? AND id_hogar = ?", [id_recibo, id_hogar]);
    return registro.affectedRows > 0;
}

const modificarImporte = async (id_recibo, id_hogar, importe) => {
        
    const [registro] = await pool.promise().query("UPDATE recibo SET importe = ? WHERE id_recibo = ? AND id_hogar = ?", [importe, id_recibo, id_hogar]);
    return registro.affectedRows > 0;
}

const modificarRecibo = async (id_recibo, fecha, importe, tipo, detalle, id_hogar) => {
    const [registro] = await pool.promise().query("UPDATE recibo SET fecha = ?, importe = ?, tipo = ?, detalle = ? WHERE id_recibo = ? AND id_hogar = ?", [fecha, importe, tipo, detalle, id_recibo,  id_hogar]);
    return registro.affectedRows > 0;

}

const borrarRecibo = async (id_recibo, id_hogar) => {
    const [registro] = await pool.promise().query("DELETE FROM recibo WHERE id_recibo = ? AND id_hogar = ?", [id_recibo, id_hogar]);
    return registro.affectedRows > 0;
}

const resumenAnual = async (id_hogar, fecha) => {
    const fechaInicio = new Date(fecha);
    const fechaFin = new Date(fecha);
    fechaInicio.setMonth(fechaInicio.getMonth() - 3);
    fechaFin.setMonth(fechaFin.getMonth() + 9);
    fechaFin.setDate(0)
    const query = `
        SELECT 
            DATE_FORMAT(fecha, '%Y-%m') as mes, 
            SUM(IF(tipo='gasto',importe,0)) as gasto, 
            SUM(IF(tipo='ingreso',importe,0)) as ingreso 
        FROM recibo 
        WHERE id_hogar = ? AND fecha between ? and ?
        GROUP BY mes;
    `;

    const [registro] = await pool.promise().query(query, [id_hogar, fechaInicio.toISOString().split('T')[0], fechaFin.toISOString().split('T')[0]]);
    return registro;
}



module.exports = {
    obtenerTodos,
    crearRecibo,
    modificarEstado,
    modificarRecibo,
    borrarRecibo,
    resumenAnual,
    modificarImporte
};