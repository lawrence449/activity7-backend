// Creates one shared database connection pool for the whole app.
const { Pool } = require("pg");

const url = process.env.DATABASE_URL || "";
const isLocal = /@(localhost|127\.0\.0\.1)/.test(url);

const pool = new Pool({
  connectionString: url || undefined,
  // Hosted databases (Render) need SSL; a database on your own computer does not.
  ssl: url && !isLocal ? { rejectUnauthorized: false } : false
});

pool.on("error", error => console.error("Database pool error:", error.message));

module.exports = pool;
