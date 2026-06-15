const jwt = require("jsonwebtoken");

const verificarToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
  
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({error: "Acceso no permitido"});
    }

    const token = authHeader.split(" ")[1];
    try{
        const payloadVerificado = jwt.verify(token, process.env.CLAVE_JWT);
        req.usuario = payloadVerificado
        next();

    }catch(err) {
        console.error("Error de token", err);
        res.status(401).json({error: "Acceso no permitido"});
    }
};

const verificarAccesoTotal = async (req, res, next) => {
    const cambio_pass = req.usuario.cambiar_pass;
    if(cambio_pass === 1) {
        return res.status(409).json({error: "Contraseña provisional"});
    }
    next();
}

module.exports = {
    verificarToken,
    verificarAccesoTotal
};