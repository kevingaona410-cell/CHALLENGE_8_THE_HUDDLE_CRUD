
// Configuración de la base de datos SQLite
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Definir la ruta del archivo de la base de datos
const dbPath = path.resolve(__dirname, "database.sqlite");

// Inicializar la conexión a la base de datos
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error al abrir la base de datos:", err.message);
  } else {
    console.log("Conectado a la base de datos SQLite.");
    initializeTables();
  }
});

// Función para crear las tablas si no existen
function initializeTables() {
  db.serialize(() => {
    // Tabla de Temas (Topics)
    db.run(`
      CREATE TABLE IF NOT EXISTS topics (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        votes INTEGER DEFAULT 0
      )
    `);

    // Tabla de Enlaces (Links)
    db.run(`
      CREATE TABLE IF NOT EXISTS links (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        topic_id INTEGER,
        url TEXT NOT NULL,
        votes INTEGER DEFAULT 0,
        FOREIGN KEY (topic_id) REFERENCES topics (id) ON DELETE CASCADE
      )
    `);
  });
}

// Exportamos la conexión a la base de datos para que pueda ser utilizada en los modelos
module.exports = db;
