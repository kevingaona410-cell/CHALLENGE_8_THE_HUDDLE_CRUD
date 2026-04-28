// Importacion de las librerias de node
const express = require("express");
const router = express.Router();

// Importamos el controlador de topics para manejar la lógica de las rutas
const topicController = require("../controllers/topic_controller");

// Rutas de los topics para cada funcion CRUD
router.get("/", topicController.getAllTopics);
router.post("/", topicController.createTopic);
router.post("/topics/:id/vote", topicController.voteTopic);
router.post("/topics/:id/delete", topicController.deleteTopic);

// Rutas para manejar los links asociados a cada topic
router.post("/topics/:id/links", topicController.addLink);
router.post("/topics/:id/links/:linkId/delete", topicController.deleteLink);

// Exportamos el router para que pueda ser utilizado en app.js
module.exports = router;