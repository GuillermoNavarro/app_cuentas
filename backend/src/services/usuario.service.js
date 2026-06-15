const pool = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

const login = async (email, password) => {
    const [usuario] = await pool.promise().query("SELECT * FROM usuario WHERE email = ?", [email]);
    if(usuario.length === 0){
        throw new Error("INVALID_CREDENTIALS");
    }
    const flag = await bcrypt.compare(password, usuario[0].password);
    if(!flag){
        throw new Error("INVALID_CREDENTIALS");
    };
    const payload = {
        id_usuario: usuario[0].id_usuario,
        id_hogar: usuario[0].id_hogar,
        nombre: usuario[0].nombre,
        cambiar_pass: usuario[0].cambiar_pass
    };
    const token = jwt.sign(payload, process.env.CLAVE_JWT, { expiresIn: "1h" });

    return token;

};

module.exports = {
    cambioPass,
    login
};
