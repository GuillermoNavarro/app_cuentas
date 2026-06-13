const express = require("express");
const app = express();
const routes = require("./routes/test.routes")
const reciboRoutes = require("./routes/recibo.routes")

app.use(routes);
app.use(reciboRoutes);

app.listen(3001, () => {
    console.log("Servidor encendido en el puerto 3001");
})