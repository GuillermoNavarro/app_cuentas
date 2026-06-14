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

module.exports = {
    patchUsuario
};