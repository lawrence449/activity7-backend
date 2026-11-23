// Run with: npm run setup-db
// Creates the table (schema.sql) and adds the starting records once (seed.sql).
require("dotenv").config();
const fs = require("fs");
const path = require("path");
const pool = require("./db");

(async () => {
  try {
    await pool.query(fs.readFileSync(path.join(__dirname, "schema.sql"), "utf8"));
    await pool.query(fs.readFileSync(path.join(__dirname, "seed.sql"), "utf8"));
    const result = await pool.query("SELECT COUNT(*) AS total FROM records");
    console.log(`Database ready. The records table has ${result.rows[0].total} record(s).`);
  } catch (error) {
    console.error("Database setup failed:", error.message);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
})();
