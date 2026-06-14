const pool = require("../config/db");
const bcrypt = require("bcrypt");

const cambioPass = async (id_usuario, passAntigua, passNueva) => {
    const [usuario] = await pool.promise().query("SELECT password, cambiar_pass FROM usuario WHERE id_usuario = ?", [id_usuario]);
    const flag = await bcrypt.compare(passAntigua, usuario[0].password);
    if(!flag){
        throw new Error("INVALID_CREDENTIALS");
    };
    const newPass = await bcrypt.hash(passNueva, 10);
    const [cambio] = await pool.promise().query("UPDATE usuario SET password = ?, cambiar_pass = 0 WHERE id_usuario = ?", [newPass, id_usuario]);
    return cambio.affectedRows > 0;
  
};

module.exports = {
    cambioPass
};
