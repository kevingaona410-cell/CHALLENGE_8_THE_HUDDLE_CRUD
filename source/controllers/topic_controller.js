
const TopicModel = require("../models/topic_model");

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
            res.redirect("/");
        } catch (error) {
            console.error("Error al votar:", error);
            res.status(500).send("Error al procesar el voto");
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

module.exports = topicController;
