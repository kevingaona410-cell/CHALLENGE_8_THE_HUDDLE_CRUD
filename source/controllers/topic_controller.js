
// traemos el modelo de Topic para interactuar con la base de datos
const TopicModel = require("../models/topic_model");

// controlador que maneja la lógica de los topics
const topicController = {
    
    // Obtener todos los temas y renderizar la vista principal
    getAllTopics: async (req, res) => {
        try {
            const topics = await TopicModel.findAll();
            res.render("index", { topics });
        } catch (error) {
            console.error("Error al obtener los temas:", error);
            res.status(500).send("Error interno del servidor");
        }
    },

    // Crear un nuevo tema
    createTopic: async (req, res) => {
        try {
            const { title } = req.body;
            if (title) {
                await TopicModel.create(title);
            }
            res.redirect("/");
        } catch (error) {
            console.error("Error al crear el tema:", error);
            res.status(500).send("Error al crear el tema");
        }
    },

    // Votar por un tema
    voteTopic: async (req, res) => {
        try {
            const { id } = req.params;
            await TopicModel.addVote(id);
            if (req.headers['accept'] === 'application/json') {
                return res.json({ success: true });
            }
            res.redirect("/");
        } catch (error) {
            console.error("Error al votar:", error);
            res.status(500).send("Error al procesar el voto");
        }
    },

    // Actualizar tema
    updateTopic: async (req, res) => {
        try {
            const { id } = req.params;
            const { title } = req.body;
            await TopicModel.update(id, title);
            res.redirect("/");
        } catch (error) {
            console.error("Error al actualizar el tema:", error);
            res.status(500).send("Error al actualizar");
        }
    },

    // Eliminar un tema
    deleteTopic: async (req, res) => {
        try {
            const { id } = req.params;
            await TopicModel.delete(id);
            res.redirect("/");
        } catch (error) {
            console.error("Error al eliminar el tema:", error);
            res.status(500).send("Error al eliminar el tema");
        }
    },

    // Agregar un link a un tema
    addLink: async (req, res) => {
        try {
            const { id } = req.params;
            const { link } = req.body;
            if (link) {
                await TopicModel.addLink(id, link);
            }
            res.redirect("/");
        } catch (error) {
            console.error("Error al agregar el link", error);
            res.status(500).send("Error al procesar el link");
        }
    },

    // Votar por un link
    voteLink: async (req, res) => {
        try {
            const { linkId } = req.params;
            await TopicModel.addLinkVote(linkId);
            if (req.headers['accept'] === 'application/json') {
                return res.json({ success: true });
            }
            res.redirect("/");
        } catch (error) {
            console.error("Error al votar link:", error);
            res.status(500).send("Error al votar link");
        }
    },

    // Actualizar link
    updateLink: async (req, res) => {
        try {
            const { linkId } = req.params;
            const { url } = req.body;
            await TopicModel.updateLink(linkId, url);
            res.redirect("/");
        } catch (error) {
            console.error("Error al actualizar el link", error);
            res.status(500).send("Error al actualizar link");
        }
    },

    // Eliminar un link
    deleteLink: async (req, res) => {
        try {
            const { linkId } = req.params;
            await TopicModel.deleteLink(linkId);
            res.redirect("/");
        } catch (error) {
            console.error("Error al eliminar el link", error);
            res.status(500).send("Error al eliminar el link");
        }
    }
};


// Exportamos el controlador para que pueda ser utilizado en las rutas
module.exports = topicController;
