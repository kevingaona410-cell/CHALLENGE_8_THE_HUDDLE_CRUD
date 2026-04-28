const db = require("../config/database");

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
                    if (row.link_id) {
                        topicsMap[row.id].links.push({
                            id: row.link_id,
                            url: row.url,
                            votes: row.link_votes
                        });
                    }
                });
                resolve(Object.values(topicsMap));
            });
        });
    },

    create: (title) => {
        return new Promise((resolve, reject) => {
            db.run("INSERT INTO topics (title) VALUES (?)", [title], function(err) {
                if (err) reject(err);
                else resolve(this.lastID);
            });
        });
    },

    addVote: (id) => {
        return new Promise((resolve, reject) => {
            db.run("UPDATE topics SET votes = votes + 1 WHERE id = ?", [id], (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
    },

    delete: (id) => {
        return new Promise((resolve, reject) => {
            db.run("DELETE FROM topics WHERE id = ?", [id], (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
    },

    addLink: (topicId, url) => {
        return new Promise((resolve, reject) => {
            db.run("INSERT INTO links (topic_id, url) VALUES (?, ?)", [topicId, url], (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
    },

    deleteLink: (linkId) => {
        return new Promise((resolve, reject) => {
            db.run("DELETE FROM links WHERE id = ?", [linkId], (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
    }
};

module.exports = TopicModel;