const express = require("express");
const app = express();
const routes = require("./routes/test.routes")

app.use(routes);

app.listen(3001, () => {
    console.log("Servidor encendido");
})