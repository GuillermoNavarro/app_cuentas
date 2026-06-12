const db = require("../config/db");

const pruebaConexion =(req, res) => {
    db.query("SELECT * FROM recibo", function (err, result, fields) {
    if (err) {
        console.error("Error ejecutando la consulta", err);
        return res.status(500).send("Fallo en la base de datos");
    };
    console.log(result);
    res.send(result);
  });
}

module.exports = {pruebaConexion};