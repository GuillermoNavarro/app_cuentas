const usuarioService = require("../services/usuario.service");

const patchUsuario = async (req, res) => {
    try{
        const {id_usuario, passAntigua, passNueva} = req.body;

        const exito = await usuarioService.cambioPass(id_usuario, passAntigua, passNueva);
        res.status(200).json({
            success: exito,
            message: "Contraseña actualizada"
        });
    }catch(err) {
        if(err.message === "INVALID_CREDENTIALS"){
            return res.status(403).json({error: "La constraseña antigua no es correcta"});
        }
        console.error("Error al cambiar la contraseña", err);
        res.status(500).json({error: "Error interno del servidor"});
    }
};

const postLogin = async (req, res) => {
    try{
        const {email, password} = req.body;

        const token = await usuarioService.login(email, password);
        res.status(200).json(token);
    }catch(err) {
        if(err.message === "INVALID_CREDENTIALS"){
            return res.status(403).json({error: "Email o Constraseña incorrecta"});
        }
        console.error("Error al logarse", err);
        res.status(500).json({error: "Error interno del servidor"});
    }
};

module.exports = {
    patchUsuario,
    postLogin
};