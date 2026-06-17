const usuarioService = require("../services/usuario.service");

const patchUsuario = async (req, res) => {
    try{
        const {passAntigua, passNueva} = req.body;
        
        const token = await usuarioService.cambioPass(passAntigua, passNueva, req.usuario);
        
        res.status(200).json(token);
    
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
            return res.status(403).json({error: "Email o Constraseña incorrectos"});
        }
        console.error("Error al logarse", err);
        res.status(500).json({error: "Error interno del servidor"});
    }
};

module.exports = {
    patchUsuario,
    postLogin
};