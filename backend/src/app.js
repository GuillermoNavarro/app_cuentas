const express = require("express");
const app = express();
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const routes = require("./routes/test.routes")
const reciboRoutes = require("./routes/recibo.routes")
const previstoRoutes = require("./routes/previsto.router");
const usuarioRoutes = require("./routes/usuario.routes");

const swaggerSpec = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API de Gestión de Cuentas",
            version: "1.0.0",
        },
    },
    apis: ["./src/routes/*.js"],
};

if (process.env.NODE_ENV === "development"){
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJsDoc(swaggerSpec)));
}

app.use(express.json());
app.use(routes);
app.use(reciboRoutes);
app.use(previstoRoutes);
app.use(usuarioRoutes);

app.listen(3001, () => {
    console.log("Servidor encendido en el puerto 3001");
})