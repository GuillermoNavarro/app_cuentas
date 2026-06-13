const pool = require("../config/db");

const obtenerTodos = async (id_hogar) => {
    const [filas] = await pool.promise().query("SELECT * FROM recibo WHERE id_hogar = ?", [id_hogar]);
    return filas;
};

const crearRecibo = async (id_previsto, id_hogar, fecha, importe, tipo, detalle) => {
    id_previsto_corregido = id_previsto || null;
    if (tipo != "GASTO" || tipo != "INGRESO") {
        return;
    }
    const [registro] = await pool.promise().query("INSERT INTO recibo(id_previsto, id_hogar, fecha, importe, tipo, detalle")

}

module.exports = {
    obtenerTodos
};