const router = require("express").Router();
const pool = require("../db");

const STATUSES = ["Pending", "In progress", "Completed"];
const COLUMNS = "id, title, category, description, status";
const TEXT_RULES = [
  ["title", "Title", 3, 80],
  ["category", "Category", 2, 40],
  ["description", "Description", 5, 300]
];

// The id in the address must be a positive whole number.
function parseId(value) {
  if (!/^[1-9]\d*$/.test(value)) return null;
  const id = Number(value);
  return id <= 2147483647 ? id : null;
}

// Checks the four editable fields. Returns { values } or { message }. Any client-sent id is ignored.
function validate(body) {
  const source = body && typeof body === "object" && !Array.isArray(body) ? body : {};
  const values = {};
  for (const [key, label, min, max] of TEXT_RULES) {
    if (typeof source[key] !== "string") return { message: `${label} is required and must be text.` };
    const text = source[key].trim();
    if (text.length < min || text.length > max) return { message: `${label} must have ${min} to ${max} characters.` };
    values[key] = text;
  }
  if (typeof source.status !== "string") return { message: "Status is required and must be text." };
  const status = source.status.trim();
  if (!STATUSES.includes(status)) return { message: "Status must be Pending, In progress or Completed." };
  values.status = status;
  return { values };
}

const badId = res => res.status(400).json({ message: "ID must be a positive whole number." });
const notFound = res => res.status(404).json({ message: "Record not found." });

// GET all
router.get("/", async (req, res, next) => {
  try {
    const result = await pool.query(`SELECT ${COLUMNS} FROM records ORDER BY id`);
    res.status(200).json(result.rows);
  } catch (error) { next(error); }
});

// GET one
router.get("/:id", async (req, res, next) => {
  try {
    const id = parseId(req.params.id);
    if (id === null) return badId(res);
    const result = await pool.query(`SELECT ${COLUMNS} FROM records WHERE id = $1`, [id]);
    if (result.rowCount === 0) return notFound(res);
    res.status(200).json(result.rows[0]);
  } catch (error) { next(error); }
});

// POST create
router.post("/", async (req, res, next) => {
  try {
    const { values, message } = validate(req.body);
    if (message) return res.status(400).json({ message });
    const result = await pool.query(
      `INSERT INTO records (title, category, description, status) VALUES ($1, $2, $3, $4) RETURNING ${COLUMNS}`,
      [values.title, values.category, values.description, values.status]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) { next(error); }
});

// PUT update (replaces all four fields; never creates a missing record)
router.put("/:id", async (req, res, next) => {
  try {
    const id = parseId(req.params.id);
    if (id === null) return badId(res);
    const { values, message } = validate(req.body);
    if (message) return res.status(400).json({ message });
    const result = await pool.query(
      `UPDATE records SET title = $1, category = $2, description = $3, status = $4 WHERE id = $5 RETURNING ${COLUMNS}`,
      [values.title, values.category, values.description, values.status, id]
    );
    if (result.rowCount === 0) return notFound(res);
    res.status(200).json(result.rows[0]);
  } catch (error) { next(error); }
});

// DELETE
router.delete("/:id", async (req, res, next) => {
  try {
    const id = parseId(req.params.id);
    if (id === null) return badId(res);
    const result = await pool.query("DELETE FROM records WHERE id = $1 RETURNING id", [id]);
    if (result.rowCount === 0) return notFound(res);
    res.status(200).json({ message: "Record deleted." });
  } catch (error) { next(error); }
});

module.exports = router;
