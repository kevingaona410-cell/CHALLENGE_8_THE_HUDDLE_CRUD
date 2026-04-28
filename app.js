// Importacion de las librerias de node
const express = require("express");
const { engine } = require("express-handlebars"); 
const path = require("path");

const app = express();
const PORT = 3000;

// Importación de rutas
const topicRoutes = require("./source/routes/topic_routes");

// Configuración de Handlebars
app.engine("hbs", engine({
    extname: ".hbs",
    defaultLayout: false
}));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname,"source", "views"));

// Middleware para archivos estáticos y parsing
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

// Uso de rutas
app.use("/", topicRoutes);

// Inicio del servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
