
// Importacion de la base de datos para realizar las operaciones CRUD
const db = require("../config/database");

// Modelo de Topic para interactuar con la base de datos
const TopicModel = {

    // Obtener todos los temas con sus links
    findAll: () => {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT t.*, l.id as link_id, l.url, l.votes as link_votes 
                FROM topics t 
                LEFT JOIN links l ON t.id = l.topic_id
                ORDER BY t.votes DESC
            `;
            // Ejecutar la consulta para obtener los temas y sus links
            db.all(query, [], (err, rows) => {
                if (err) return reject(err);
                
                // Agrupar links por topic
                const topicsMap = {};
                rows.forEach(row => {
                    if (!topicsMap[row.id]) {
                        topicsMap[row.id] = { 
                            id: row.id, 
                            title: row.title, 
                            votes: row.votes, 
                            links: [] 
                        };
                    }
                    // Si el tema tiene un link asociado, agregarlo al array de links del tema
                    if (row.link_id) {
                        topicsMap[row.id].links.push({
                            id: row.link_id,
                            url: row.url,
                            votes: row.link_votes
                        });
                    }
                });
                // Devolver un array de temas con sus links
                resolve(Object.values(topicsMap));
            });
        });
    },

    // Crear un nuevo tema
    create: (title) => {
        return new Promise((resolve, reject) => {
            db.run("INSERT INTO topics (title) VALUES (?)", [title], function(err) {
                if (err) reject(err);
                else resolve(this.lastID);
            });
        });
    },

    // Agregar un voto a un tema
    addVote: (id) => {
        return new Promise((resolve, reject) => {
            db.run("UPDATE topics SET votes = votes + 1 WHERE id = ?", [id], (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
    },

    // Eliminar un tema 
    delete: (id) => {
        return new Promise((resolve, reject) => {
            db.run("DELETE FROM topics WHERE id = ?", [id], (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
    },

    // Agregar un link a un tema
    addLink: (topicId, url) => {
        return new Promise((resolve, reject) => {
            db.run("INSERT INTO links (topic_id, url) VALUES (?, ?)", [topicId, url], (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
    },

    // Eliminar un link de un tema
    deleteLink: (linkId) => {
        return new Promise((resolve, reject) => {
            db.run("DELETE FROM links WHERE id = ?", [linkId], (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
    }
};

// Exportamos el modelo para que pueda ser utilizado en el controlador
module.exports = TopicModel;