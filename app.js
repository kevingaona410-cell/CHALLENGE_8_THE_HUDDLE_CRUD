// Importacion de las librerias de node
const express = require("express");

const { engine } = require("express-handlebars");       // handlebars para renderizar las vistas
const path = require("path");                           // path para manejar rutas de archivos

const app = express();
const PORT = 3000;

// Importamos las rutas de topic_routes que se encargan de manejar las solicitudes relacionadas con los temas
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
